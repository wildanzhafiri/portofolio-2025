export function Backdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-30
        bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.55),transparent_60%)]"
      />
      <div
        className="absolute top-10 -right-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-25
        bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.5),transparent_60%)]"
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[520px] w-[520px] rounded-full blur-3xl opacity-20
        bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.45),transparent_60%)]"
      />

      <div
        className="absolute inset-0 opacity-35 dark:opacity-50
        [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)]
        bg-[size:42px_42px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(0,0,0,0.06)_55%,rgba(0,0,0,0.12)_100%)] dark:bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
