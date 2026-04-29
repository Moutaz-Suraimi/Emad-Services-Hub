import { motion } from "framer-motion";
import { TrendingUp, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { useServiceStats } from "@/hooks/use-whatsapp-prefs";

export function StatsPanel() {
  const stats = useServiceStats();
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <section id="stats" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-primary text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            نشاطك معنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
            <span className="text-gradient-brand">طلبات الواتساب</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            عدد الطلبات التي تم إرسالها بنجاح لكل خدمة من جهازك
          </p>
        </motion.div>

        {/* total card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto mb-8 glass rounded-3xl p-6 shadow-card text-center bg-gradient-brand text-white"
        >
          <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-90" />
          <div className="text-4xl sm:text-5xl font-extrabold mb-1">{total}</div>
          <div className="text-sm opacity-90">إجمالي الطلبات الناجحة</div>
        </motion.div>

        {/* per-service grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((s, i) => {
            const count = stats[s.id] || 0;
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass rounded-2xl p-4 shadow-soft hover:shadow-card transition-smooth"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-soft">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    count > 0
                      ? "bg-[var(--whatsapp)]/15 text-[var(--whatsapp)]"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-snug">
                  {s.title}
                </h3>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-brand transition-all"
                    style={{ width: total > 0 ? `${Math.min(100, (count / Math.max(1, total)) * 100)}%` : "0%" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {total === 0 && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            لم ترسل أي طلب بعد — اختر خدمة وابدأ الآن.
          </p>
        )}
      </div>
    </section>
  );
}
