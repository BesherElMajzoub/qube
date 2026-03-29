import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Target, Heart, Zap } from 'lucide-react';
import { useAbout } from '@/lib/useApi';

export default function About() {
  const { t, dir, language } = useLanguage();
  const { data: about } = useAbout();

  const values = [
    { icon: Lightbulb, titleKey: 'about.innovation' as const, descKey: 'about.innovationDesc' as const },
    { icon: Target, titleKey: 'about.excellence' as const, descKey: 'about.excellenceDesc' as const },
    { icon: Heart, titleKey: 'about.passion' as const, descKey: 'about.passionDesc' as const },
    { icon: Zap, titleKey: 'about.efficiency' as const, descKey: 'about.efficiencyDesc' as const },
  ];

  const whyItems = [
    { titleKey: 'about.premiumQuality' as const, descKey: 'about.premiumQualityDesc' as const },
    { titleKey: 'about.expertDesign' as const, descKey: 'about.expertDesignDesc' as const },
    { titleKey: 'about.professionalInstall' as const, descKey: 'about.professionalInstallDesc' as const },
    { titleKey: 'about.sustainable' as const, descKey: 'about.sustainableDesc' as const },
    { titleKey: 'about.support' as const, descKey: 'about.supportDesc' as const },
    { titleKey: 'about.trackRecord' as const, descKey: 'about.trackRecordDesc' as const },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('about.title')}</h1>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Company Story with image */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className={language === 'ar' ? 'order-2' : 'order-1'}>
              <h2 className="heading-lg text-foreground mb-8">{t('about.ourStory')}</h2>
              <div className="space-y-6 body-lg text-foreground leading-relaxed">
                {about ? (
                  <>
                    <p>{language === 'ar' ? about.description_ar : about.description_en}</p>
                  </>
                ) : (
                  <>
                    <p>{t('about.storyP1')}</p>
                    <p>{t('about.storyP2')}</p>
                    <p>{t('about.storyP3')}</p>
                  </>
                )}
              </div>
            </div>
            {/* Image */}
            <div className={language === 'ar' ? 'order-1' : 'order-2'}>
              <div className="relative w-full aspect-[4/3] border-2 border-foreground overflow-hidden group">
                <img
                  src="public\img\Gemini_Generated_Image_556hhn556hhn556h.png"
                  alt="QUBE showroom - premium surfaces"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="p-8 border-2 border-foreground bg-background">
              <h3 className="heading-md text-foreground mb-6">{t('about.vision')}</h3>
              <p className="body-base text-foreground leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 border-2 border-foreground bg-background">
              <h3 className="heading-md text-foreground mb-6">{t('about.mission')}</h3>
              <p className="body-base text-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-foreground text-center mb-12">{t('about.coreValues')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border-2 border-foreground text-center hover:bg-accent hover:text-background transition-colors group"
                >
                  <Icon size={40} className="mx-auto mb-4 text-accent group-hover:text-background transition-colors" />
                  <h3 className="heading-sm text-foreground group-hover:text-background mb-3 transition-colors">{t(value.titleKey)}</h3>
                  <p className="text-sm text-foreground group-hover:text-background opacity-80 transition-colors">{t(value.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-foreground text-center mb-12">{t('about.whyChoose')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 border-2 border-foreground bg-background hover:border-accent transition-colors"
              >
                <h3 className="heading-sm text-foreground mb-3">{t(item.titleKey)}</h3>
                <p className="text-sm text-foreground opacity-80">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
