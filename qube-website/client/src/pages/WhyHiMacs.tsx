import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  Minus,
  Droplets,
  ShieldCheck,
  Flame,
  Shield,
  RefreshCw,
  Palette,
} from "lucide-react";

export default function WhyHiMacs() {
  const { t, dir } = useLanguage();

  const features = [
    {
      icon: Minus,
      titleKey: "hiMacs.feature1Title",
      descKey: "hiMacs.feature1Desc",
      color: "#149b9e",
    },
    {
      icon: Droplets,
      titleKey: "hiMacs.feature2Title",
      descKey: "hiMacs.feature2Desc",
      color: "#6e408d",
    },
    {
      icon: ShieldCheck,
      titleKey: "hiMacs.feature3Title",
      descKey: "hiMacs.feature3Desc",
      color: "#72bf44",
    },
    {
      icon: Flame,
      titleKey: "hiMacs.feature4Title",
      descKey: "hiMacs.feature4Desc",
      color: "#149b9e",
    },
    {
      icon: Shield,
      titleKey: "hiMacs.feature5Title",
      descKey: "hiMacs.feature5Desc",
      color: "#6e408d",
    },
    {
      icon: RefreshCw,
      titleKey: "hiMacs.feature6Title",
      descKey: "hiMacs.feature6Desc",
      color: "#72bf44",
    },
    {
      icon: Palette,
      titleKey: "hiMacs.feature7Title",
      descKey: "hiMacs.feature7Desc",
      color: "#149b9e",
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        <div
          className="absolute top-[8%] right-[6%] w-28 h-28 rounded-sm opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#6e408d", transform: "rotate(45deg)" }}
        />
        <div
          className="absolute bottom-[12%] left-[4%] w-40 h-40 rounded-full opacity-[0.06] animate-float pointer-events-none"
          style={{ background: "#149b9e" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("hiMacs.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("hiMacs.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
          <p className="body-lg text-background opacity-85 max-w-2xl leading-relaxed animate-fade-in-up delay-400">
            {t("hiMacs.description")}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-foreground bg-background hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ background: feature.color }}
                  />
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-5 border-2 border-foreground group-hover:border-accent transition-colors"
                  >
                    <Icon
                      size={28}
                      className="transition-colors duration-300"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="heading-sm text-foreground mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="body-base text-foreground opacity-80">
                    {t(feature.descKey)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Extra wide card spanning full width for the 7th feature if odd */}
          {features.length % 3 === 1 && (
            <div className="mt-8 hidden lg:block" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/img/LOGO (7).svg" alt="QUBE" className="w-10 h-10 object-contain brightness-0 invert" />
            <div className="w-12 h-0.5 bg-background/30" />
          </div>
          <h2 className="heading-lg mb-6 text-background">{t("hiMacs.ctaTitle")}</h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">{t("hiMacs.ctaDesc")}</p>
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
