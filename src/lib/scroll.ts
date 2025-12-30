import { useEffect } from 'react';

type ParallaxOpts = {
  smooth?: number; // 0..1
  rotate?: number; // deg
  distance?: number; // px
  scale?: number; // 0.0x (mis: 0.04 => 4% scaling)
  tiltX?: number; // deg
  tiltY?: number; // deg
  blur?: number; // px (subtle)
  perspective?: number; // px
};

export function useParallax<T extends HTMLElement>(ref: React.RefObject<T | null>, strength = 0.35, opts: ParallaxOpts = {}) {
  const smooth = opts.smooth ?? 0.08;
  const rotateAmount = opts.rotate ?? 0;
  const distance = opts.distance ?? 220;

  const scaleAmt = opts.scale ?? 0.02;
  const tiltXAmt = opts.tiltX ?? 2.2;
  const tiltYAmt = opts.tiltY ?? 3.2;
  const blurAmt = opts.blur ?? 0;
  const perspective = opts.perspective ?? 900;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // bikin transform lebih “premium”
    el.style.willChange = 'transform, filter';
    el.style.transformStyle = 'preserve-3d';

    let active = false;

    let currentY = 0,
      targetY = 0;
    let currentR = 0,
      targetR = 0;
    let currentS = 1,
      targetS = 1;
    let currentTX = 0,
      targetTX = 0;
    let currentTY = 0,
      targetTY = 0;
    let currentB = 0,
      targetB = 0;

    let raf = 0;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress -1..1 (pusat viewport = 0)
      const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);

      const clamped = Math.max(-1, Math.min(1, p));

      targetY = clamped * strength * distance;
      targetR = rotateAmount ? clamped * rotateAmount : 0;

      // depth feel
      targetS = 1 + (1 - Math.abs(clamped)) * scaleAmt; // lebih besar pas di tengah
      targetTX = -clamped * tiltXAmt; // tilt halus
      targetTY = clamped * tiltYAmt;

      targetB = blurAmt ? Math.abs(clamped) * blurAmt : 0;

      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;

      currentY += (targetY - currentY) * smooth;
      currentR += (targetR - currentR) * smooth;
      currentS += (targetS - currentS) * smooth;
      currentTX += (targetTX - currentTX) * smooth;
      currentTY += (targetTY - currentTY) * smooth;
      currentB += (targetB - currentB) * smooth;

      el.style.transform =
        `perspective(${perspective}px) ` +
        `translate3d(0, ${currentY.toFixed(2)}px, 0) ` +
        `rotate(${currentR.toFixed(2)}deg) ` +
        `rotateX(${currentTX.toFixed(2)}deg) ` +
        `rotateY(${currentTY.toFixed(2)}deg) ` +
        `scale(${currentS.toFixed(4)})`;

      if (blurAmt) el.style.filter = `blur(${currentB.toFixed(2)}px)`;

      // stop raf kalau sudah dekat target
      if (
        Math.abs(targetY - currentY) > 0.18 ||
        Math.abs(targetR - currentR) > 0.02 ||
        Math.abs(targetS - currentS) > 0.001 ||
        Math.abs(targetTX - currentTX) > 0.02 ||
        Math.abs(targetTY - currentTY) > 0.02 ||
        Math.abs(targetB - currentB) > 0.05
      ) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (!active) return;
      calc();
    };

    // cuma jalan kalau elemen dekat viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) calc();
      },
      { root: null, threshold: 0, rootMargin: '200px 0px' }
    );

    io.observe(el);

    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calc);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calc);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, strength, opts.smooth, opts.rotate, opts.distance, opts.scale, opts.tiltX, opts.tiltY, opts.blur, opts.perspective]);
}
