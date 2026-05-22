import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils/cn";

export interface CardProps extends HTMLMotionProps<"div"> {
  glow?: "teal" | "gold" | "none";
}

export function Card({ className, glow = "none", ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "glass-card group relative",
        glow === "teal" && "glow-teal border-brand-teal/20",
        glow === "gold" && "glow-gold border-brand-gold/20",
        className,
      )}
      {...props}
    >
      {/* Sweeping highlight effect for card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      {props.children}
    </motion.div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-syne font-bold text-xl leading-none tracking-tight text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs text-text-slate font-mono uppercase tracking-[0.2em]",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0 relative z-10", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0 border-t border-text-muted/5 mt-auto relative z-10",
        className,
      )}
      {...props}
    />
  );
}
