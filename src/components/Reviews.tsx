import { motion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { reviews } from "@/data/services";

export function Reviews() {
  // duplicate for seamless marquee
  const loop = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-semibold mb-4">
            شهادات حقيقية
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gradient-brand">آراء عملائنا</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ثقة عملائنا هي أساس نجاحنا — اقرأ ماذا يقولون عن خدماتنا
          </p>
        </motion.div>

        {/* Mobile: auto-scrolling marquee */}
        <div className="sm:hidden relative" dir="ltr">
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-marquee-mobile hover:[animation-play-state:paused] active:[animation-play-state:paused] w-max">
              {loop.map((r, i) => (
                <div key={i} dir="rtl" className="w-[280px] flex-shrink-0">
                  <ReviewCard {...r} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground" dir="rtl">
            <span className="inline-block w-6 h-1 rounded-full bg-primary/40" />
            <span>المس لإيقاف الحركة</span>
            <span className="inline-block w-6 h-1 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* Tablet: auto-scrolling marquee */}
        <div className="hidden sm:block md:hidden relative" dir="ltr">
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] w-max">
              {loop.map((r, i) => (
                <div key={i} dir="rtl" className="w-[320px] flex-shrink-0">
                  <ReviewCard {...r} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: auto-scrolling marquee */}
        <div className="hidden md:block relative" dir="ltr">
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] w-max">
              {loop.map((r, i) => (
                <div key={i} dir="rtl" className="w-[340px] lg:w-[380px] flex-shrink-0">
                  <ReviewCard {...r} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-marquee-mobile {
          animation: marquee 18s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-marquee-mobile { animation: none; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

function ReviewCard({
  name,
  rating,
  text,
  verified,
  className = "",
}: {
  name: string;
  rating: number;
  text: string;
  verified: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative glass rounded-3xl p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition-smooth ${className}`}
    >
      <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/15" />

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-[var(--accent)] text-[var(--accent)]" : "text-muted"
            }`}
          />
        ))}
      </div>

      <p className="text-foreground/90 leading-relaxed mb-6 text-sm sm:text-base">
        "{text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/60">
        <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground text-sm">{name}</span>
            {verified && <BadgeCheck className="w-4 h-4 text-[var(--teal)] fill-[var(--teal)]/20" />}
          </div>
          <span className="text-xs text-muted-foreground">عميل موثّق</span>
        </div>
      </div>
    </div>
  );
}
