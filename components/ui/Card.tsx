import { type ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: Props) {
  return (
    <section className={`glass-card rounded-3xl p-4 sm:p-6 ${className}`}>
      {title ? (
        <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-solar-forest/70">
          <span className="h-1.5 w-1.5 rounded-full bg-solar-gold-deep" aria-hidden />
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
