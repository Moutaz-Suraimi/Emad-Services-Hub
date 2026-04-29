import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "إعتماد للتعقيب والخدمات العامة | خدمات حكومية متكاملة" },
      {
        name: "description",
        content:
          "إعتماد للتعقيب والخدمات العامة - خدمات حكومية متكاملة بسرعة واحترافية في المملكة العربية السعودية. تخليص معاملات، خدمات مركبات، تأشيرات وأعمال.",
      },
      { property: "og:title", content: "إعتماد للتعقيب والخدمات العامة" },
      { property: "og:description", content: "خدمات حكومية متكاملة بسرعة واحترافية" },
      { name: "twitter:title", content: "إعتماد للتعقيب والخدمات العامة" },
      { name: "twitter:description", content: "خدمات حكومية متكاملة بسرعة واحترافية" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
