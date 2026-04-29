import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Copy, Check, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buildWhatsAppMessage, buildWhatsAppLink, type MessageTone } from "@/data/services";
import { setSkipConfirm } from "@/hooks/use-whatsapp-prefs";

export interface ConfirmPayload {
  mainTitle: string;
  subTitle?: string;
  subDescription?: string;
  serviceId: string;
}

interface Props {
  payload: ConfirmPayload | null;
  tone: MessageTone;
  onTone: (t: MessageTone) => void;
  onConfirm: (payload: ConfirmPayload) => void;
  onClose: () => void;
}

export function WhatsAppConfirm({ payload, tone, onTone, onConfirm, onClose }: Props) {
  const [dontAsk, setDontAsk] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (payload) {
      setDontAsk(false);
      setCopied(false);
    }
  }, [payload]);

  if (!payload) return null;

  const message = buildWhatsAppMessage({ ...payload, tone });
  const link = buildWhatsAppLink({ ...payload, tone });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handleConfirm = () => {
    if (dontAsk) setSkipConfirm(true);
    onConfirm(payload);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{
          background: "oklch(0.2 0.05 230 / 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", damping: 26, stiffness: 240 }}
          className="relative w-full max-w-lg bg-card rounded-t-3xl sm:rounded-3xl shadow-glow overflow-hidden"
        >
          {/* header */}
          <div className="bg-gradient-brand text-white p-5 sm:p-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg">تأكيد إرسال الطلب</h3>
                <p className="text-white/80 text-xs mt-0.5">سيتم فتح واتساب برسالة جاهزة</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="rounded-full bg-white/15 hover:bg-white/25 p-2 transition-smooth"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {/* alert */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30">
              <AlertCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                عند الضغط على إرسال، سيتم فتح تطبيق واتساب تلقائياً مع الرسالة الجاهزة أدناه — كل ما عليك هو الضغط على زر الإرسال داخل واتساب.
              </p>
            </div>

            {/* tone selector */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">صيغة الرسالة</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
                {([
                  { v: "formal", label: "رسمية", hint: "مفصّلة" },
                  { v: "short", label: "مختصرة", hint: "سريعة" },
                ] as const).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => onTone(opt.v)}
                    className={`relative py-2.5 px-3 rounded-lg text-sm font-semibold transition-smooth ${
                      tone === opt.v
                        ? "bg-card text-primary shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                    <span className="block text-[10px] font-normal opacity-70 mt-0.5">{opt.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* preview */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">معاينة الرسالة</label>
              <div className="bg-gradient-soft border border-border rounded-xl p-3 max-h-40 overflow-y-auto">
                <pre className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
                  {message}
                </pre>
              </div>
            </div>

            {/* dont ask */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontAsk}
                onChange={(e) => setDontAsk(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--whatsapp)]"
              />
              <span className="text-xs text-muted-foreground">لا تسألني مرة أخرى</span>
            </label>

            {/* actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full glass border border-border text-foreground px-5 py-3 text-sm font-bold hover:scale-[1.02] transition-smooth"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--whatsapp)]" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    نسخ الرابط
                  </>
                )}
              </button>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConfirm}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] text-white px-5 py-3 text-sm font-bold shadow-soft hover:scale-[1.02] transition-smooth"
              >
                <MessageCircle className="w-4 h-4" />
                فتح واتساب وإرسال
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
