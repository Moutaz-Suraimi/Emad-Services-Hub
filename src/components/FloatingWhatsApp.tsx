import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/services";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 left-6 z-30 group"
      aria-label="تواصل عبر واتساب"
    >
      {/* single soft pulse ring */}
      {!reduceMotion && (
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[var(--whatsapp)]"
        />
      )}

      {/* main button */}
      <div
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-glow"
        style={{
          background:
            "linear-gradient(135deg, var(--whatsapp) 0%, color-mix(in oklab, var(--whatsapp) 75%, black) 100%)",
        }}
      >
        <MessageCircle className="relative w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
      </div>

      {/* tooltip on hover (desktop) */}
      <span className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none shadow-soft">
        راسلنا الآن
      </span>
    </motion.a>
  );
}
