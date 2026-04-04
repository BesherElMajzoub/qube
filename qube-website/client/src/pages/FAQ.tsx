import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const colors = ["#149b9e", "#6e408d", "#72bf44", "#149b9e", "#6e408d", "#72bf44"];
  const accentColor = colors[index % colors.length];

  return (
    <div className="border-2 border-foreground overflow-hidden group">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 sm:p-8 bg-background hover:bg-muted transition-colors text-start"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1">
          <span
            className="text-sm font-black w-8 h-8 flex items-center justify-center flex-shrink-0 border-2 border-foreground"
            style={{ color: accentColor }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="heading-sm text-foreground text-lg sm:text-xl font-bold">
            {question}
          </h3>
        </div>
        <ChevronDown
          size={24}
          className={`text-foreground flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`faq-accordion-body ${isOpen ? "faq-accordion-body--open" : ""}`}
      >
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          <div
            className="w-12 h-0.5 mb-4"
            style={{ background: accentColor }}
          />
          <p className="body-base text-foreground opacity-85 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t, dir } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        <div
          className="absolute top-[12%] right-[5%] w-20 h-20 opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#149b9e", transform: "rotate(45deg)" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("faq.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("faq.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            {t("contact.haveQuestions")}
          </h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">
            {t("contact.haveQuestionsDesc")}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6 flex items-center gap-2 mx-auto"
            >
              {t("hero.contactBtn")}
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
