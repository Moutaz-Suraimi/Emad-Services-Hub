import { motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/logo.jpg";
import { services } from "@/data/services";
import { ArrowDown, ShieldCheck, Zap, Award } from "lucide-react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 bg-gradient-soft bg-gradient-hero overflow-hidden"
    >
      {/* animated grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* decorative blobs (static when reduced motion) */}
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-[var(--teal)]/25 blur-3xl"
      />
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-[var(--emerald)]/25 blur-3xl"
      />

      <div className="relative container mx-auto text-center max-w-5xl">
        {/* trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-semibold text-foreground shadow-soft"
        >
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--whatsapp)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--whatsapp)]" />
          </span>
          متاحون الآن — رد فوري عبر واتساب
        </motion.div>

        {/* orbiting logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative flex justify-center mb-10"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* rotating ring */}
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            />
            <motion.div
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-[var(--teal)]/40"
            />

            {/* orbiting service icons */}
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {services.slice(0, 5).map((s, i) => {
                const angle = (i / 5) * Math.PI * 2;
                const r = 50; // % from center
                const x = (50 + Math.cos(angle) * r).toFixed(3);
                const y = (50 + Math.sin(angle) * r).toFixed(3);
                return (
                  <motion.div
                    key={s.id}
                    animate={reduceMotion ? undefined : { rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-glow ring-2 ring-primary/20 overflow-hidden flex items-center justify-center p-1.5"
                    title={s.title}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* center logo */}
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-brand rounded-3xl blur-2xl opacity-50" />
              <img
                src={logo}
                alt="إعتماد للتعقيب والخدمات العامة"
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-glow ring-4 ring-white/60"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-[1.1]"
        >
          <span className="text-gradient-brand">إعتماد</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 font-bold bg-gradient-to-r from-[var(--teal)] via-primary to-[var(--emerald)] bg-clip-text text-transparent">
            للتعقيب والخدمات العامة
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          نتولى معاملاتك الحكومية بسرعة واحترافية — قوى، التجارة، مدد، بلدي، الجوازات
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-white px-8 py-4 text-lg font-bold shadow-glow hover:scale-105 transition-smooth"
          >
            استعرض الخدمات
            <ArrowDown className="w-5 h-5" />
          </a>
        </motion.div>

        {/* mini stats / trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: Zap, label: "إنجاز سريع", value: "خلال ساعات" },
            { icon: ShieldCheck, label: "موثوق", value: "100%" },
            { icon: Award, label: "خبرة", value: "+10 سنوات" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-3 sm:p-4 shadow-soft text-center"
            >
              <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5" />
              <div className="text-sm sm:text-base font-bold text-foreground">{s.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
