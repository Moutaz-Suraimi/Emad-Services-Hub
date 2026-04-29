import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, Check, MessageCircle, ArrowUpLeft, Share2, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import type { MainService } from "@/data/services";
import { WHATSAPP_URL, buildWhatsAppLink } from "@/data/services";
import { useTone, getSkipConfirm, incrementServiceStat } from "@/hooks/use-whatsapp-prefs";
import { WhatsAppConfirm, type ConfirmPayload } from "@/components/WhatsAppConfirm";

interface Props {
  service: MainService | null;
  onClose: () => void;
}

export function ServiceOverlay({ service, onClose }: Props) {
  const [tone, setTone] = useTone();
  const [pending, setPending] = useState<ConfirmPayload | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  const handleSubClick = (e: React.MouseEvent, payload: ConfirmPayload) => {
    if (getSkipConfirm()) {
      // skip dialog, just count and let link open
      incrementServiceStat(payload.serviceId);
      return;
    }
    e.preventDefault();
    setPending(payload);
  };

  const handleCopyShare = async (e: React.MouseEvent, payload: ConfirmPayload, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    const link = buildWhatsAppLink({
      mainTitle: payload.mainTitle,
      subTitle: payload.subTitle,
      subDescription: payload.subDescription,
      tone,
    });
    try {
      if (navigator.share) {
        await navigator.share({
          title: payload.subTitle || payload.mainTitle,
          text: `${payload.subTitle} — إعتماد للتعقيب`,
          url: link,
        });
      } else {
        await navigator.clipboard.writeText(link);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1800);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(link);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1800);
      } catch {}
    }
  };

  return (
    <>
      <AnimatePresence>
        {service && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{
              background: "oklch(0.2 0.05 230 / 0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-glow"
            >
              {/* header */}
              <div className="sticky top-0 z-20 bg-gradient-brand text-white p-5 sm:p-8 rounded-t-3xl shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 px-4 py-2 text-sm font-bold transition-smooth ring-1 ring-white/20"
                  >
                    <ArrowRight className="w-4 h-4" />
                    رجوع للخدمات
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-white/20 hover:bg-white/30 active:scale-95 p-2.5 transition-smooth ring-1 ring-white/20"
                    aria-label="إغلاق"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-white/40 shadow-soft flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-extrabold">{service.title}</h2>
                    <p className="text-white/85 mt-1 text-sm sm:text-base">{service.description}</p>
                  </div>
                </div>

                {/* tone selector */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm text-white/85 font-semibold">صيغة الرسالة:</span>
                  <div className="inline-flex p-1 bg-white/15 rounded-full">
                    {([
                      { v: "formal" as const, label: "رسمية" },
                      { v: "short" as const, label: "مختصرة" },
                    ]).map((opt) => (
                      <button
                        key={opt.v}
                        onClick={() => setTone(opt.v)}
                        className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-smooth ${
                          tone === opt.v ? "bg-white text-primary shadow-soft" : "text-white/85 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* sub-services */}
              <div className="p-5 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    الخدمات الفرعية
                  </h3>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {service.subServices.length} خدمة
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-5 bg-gradient-soft border border-border rounded-xl p-3">
                  💡 اضغط على أي خدمة لإرسال طلبك عبر واتساب، أو استخدم زر المشاركة لنسخ الرابط
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {service.subServices.map((sub, i) => {
                    const payload: ConfirmPayload = {
                      mainTitle: service.title,
                      subTitle: sub.title,
                      subDescription: sub.description,
                      serviceId: service.id,
                    };
                    const link = buildWhatsAppLink({
                      mainTitle: service.title,
                      subTitle: sub.title,
                      subDescription: sub.description,
                      tone,
                    });
                    const key = `${service.id}-${i}`;
                    const isCopied = copiedKey === key;
                    return (
                      <motion.div
                        key={sub.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i, duration: 0.25 }}
                        className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-card hover:bg-gradient-soft hover:border-primary/40 hover:shadow-card transition-smooth"
                      >
                        {/* share button — top-start (right in RTL) */}
                        <button
                          type="button"
                          onClick={(e) => handleCopyShare(e, payload, key)}
                          aria-label="مشاركة / نسخ الرابط"
                          className="absolute top-3 end-3 z-10 inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-muted hover:bg-primary hover:text-white text-muted-foreground text-xs font-bold transition-smooth ring-1 ring-border hover:ring-primary"
                          title={isCopied ? "تم النسخ" : "مشاركة الرابط"}
                        >
                          {isCopied ? (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">مشاركة</span>
                            </>
                          )}
                        </button>

                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => handleSubClick(e, payload)}
                          className="block"
                        >
                          <div className="min-w-0 pt-10 sm:pt-8">
                            <h4 className="font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary transition-smooth leading-snug mb-2 break-words">
                              {sub.title}
                            </h4>
                            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed break-words">
                              {sub.description}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--whatsapp)]">
                              <MessageCircle className="w-4 h-4" />
                              اطلب عبر واتساب
                              <ArrowUpLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-smooth" />
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-soft border border-border text-center">
                  <p className="text-foreground font-semibold mb-3 text-sm sm:text-base">
                    لم تجد ما تبحث عنه؟ تواصل معنا مباشرة
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] text-white px-6 py-3 font-bold shadow-soft hover:scale-105 transition-smooth"
                  >
                    <MessageCircle className="w-5 h-5" />
                    استشارة مجانية
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppConfirm
        payload={pending}
        tone={tone}
        onTone={setTone}
        onConfirm={(p) => {
          incrementServiceStat(p.serviceId);
          setPending(null);
        }}
        onClose={() => setPending(null)}
      />
    </>
  );
}
