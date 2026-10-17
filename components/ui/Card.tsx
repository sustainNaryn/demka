import { type ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: Props) {
  return (
    <section className={`glass-card rounded-2xl p-4 sm:p-5 ${className}`}>
      {title ? (
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-solar-forest/80">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
