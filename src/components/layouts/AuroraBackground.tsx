import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

type Particle = {
  id: number;
  x: number;
  y: number;
  s: number;
  o: number;
  d: number;
};

export function AuroraBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 2 + Math.random() * 4,
      o: 0.18 + Math.random() * 0.22,
      d: 10 + Math.random() * 18,
    }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setPos({ x: clamp(x, 0, 100), y: clamp(y, 0, 100) });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={ref} className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(245,158,11,0.16),transparent_62%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.10),transparent_60%),radial-gradient(circle_at_50%_88%,rgba(45,212,191,0.08),transparent_62%)] dark:bg-[radial-gradient(circle_at_22%_16%,rgba(245,158,11,0.12),transparent_62%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.08),transparent_60%),radial-gradient(circle_at_50%_88%,rgba(45,212,191,0.07),transparent_62%)]" />
      <div className="absolute -inset-[40%] opacity-55 dark:opacity-60 blur-3xl">
        <div
          className="absolute left-1/2 top-1/2 h-[680px] w-[980px] -translate-x-1/2 -translate-y-1/2 rotate-12
          bg-[conic-gradient(from_180deg_at_50%_50%,rgba(245,158,11,0.0),rgba(245,158,11,0.22),rgba(250,204,21,0.14),rgba(45,212,191,0.10),rgba(245,158,11,0.0))]
          animate-[spin_34s_linear_infinite]"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 -rotate-12
          bg-[conic-gradient(from_90deg_at_50%_50%,rgba(250,204,21,0.0),rgba(250,204,21,0.18),rgba(45,212,191,0.10),rgba(245,158,11,0.16),rgba(250,204,21,0.0))]
          animate-[spin_44s_linear_infinite_reverse]"
        />
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background: `radial-gradient(620px circle at ${pos.x}% ${pos.y}%, rgba(245,158,11,0.14), transparent 64%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(920px circle at ${pos.x}% ${pos.y}%, rgba(250,204,21,0.08), transparent 72%)`,
        }}
      />

      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-amber-200/30 dark:bg-amber-100/15"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              opacity: p.o,
              animation: `float ${p.d}s ease-in-out infinite`,
              transform: `translate3d(0,0,0)`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_0%,rgba(0,0,0,0.07)_58%,rgba(0,0,0,0.14)_100%)] dark:bg-[radial-gradient(circle_at_50%_10%,transparent_0%,rgba(0,0,0,0.38)_62%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
