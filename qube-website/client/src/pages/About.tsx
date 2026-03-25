import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Target, Heart, Zap } from 'lucide-react';

export default function About() {
  const { t, dir } = useLanguage();

  const values = [
    { icon: Lightbulb, titleKey: 'Innovation', descKey: 'We embrace cutting-edge design and materials' },
    { icon: Target, titleKey: 'Excellence', descKey: 'Precision and quality in every project' },
    { icon: Heart, titleKey: 'Passion', descKey: 'Dedicated to transforming spaces beautifully' },
    { icon: Zap, titleKey: 'Efficiency', descKey: 'Timely delivery and professional service' },
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('about.title')}</h1>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-foreground mb-8">Our Story</h2>
            <div className="space-y-6 body-lg text-foreground leading-relaxed">
              <p>
                QUBE was founded with a simple yet powerful vision: to revolutionize how people experience their living and working spaces through premium decorative materials and innovative surface solutions.
              </p>
              <p>
                With over a decade of expertise in the design and construction industry, our team brings together architects, designers, and craftspeople who share an unwavering commitment to excellence and innovation.
              </p>
              <p>
                Today, QUBE stands as a trusted partner for discerning clients who refuse to compromise on quality, aesthetics, or functionality. From residential interiors to commercial installations, we deliver surfaces that don't just look beautiful—they transform spaces into extraordinary environments.
              </p>
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
          <h2 className="heading-lg text-foreground text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 border-2 border-foreground text-center hover:bg-accent hover:text-background transition-colors group"
                >
                  <Icon size={40} className="mx-auto mb-4 text-accent group-hover:text-background transition-colors" />
                  <h3 className="heading-sm text-foreground group-hover:text-background mb-3 transition-colors">{value.titleKey}</h3>
                  <p className="text-sm text-foreground group-hover:text-background opacity-80 transition-colors">{value.descKey}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-foreground text-center mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Al-Rashid', role: 'Founder & Creative Director' },
              { name: 'Ahmed Al-Dosari', role: 'Head of Design' },
              { name: 'Fatima Al-Otaibi', role: 'Project Manager' },
              { name: 'Mohammed Al-Saud', role: 'Technical Lead' },
            ].map((member, idx) => (
              <div 
                key={idx}
                className="border-2 border-foreground overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full aspect-square bg-foreground flex items-center justify-center">
                  <span className="text-background text-sm">[Team Photo]</span>
                </div>
                <div className="p-6 bg-background">
                  <h3 className="heading-sm text-foreground mb-2">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-foreground text-center mb-12">Why Choose QUBE?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Premium Quality', desc: 'We source only the finest materials from trusted suppliers worldwide' },
              { title: 'Expert Design', desc: 'Our team of experienced designers creates bespoke solutions for every project' },
              { title: 'Professional Installation', desc: 'Meticulous attention to detail ensures flawless execution' },
              { title: 'Sustainable Practices', desc: 'We prioritize eco-friendly materials and processes' },
              { title: 'Customer Support', desc: 'Dedicated support throughout your project journey' },
              { title: 'Proven Track Record', desc: 'Hundreds of successful projects across residential and commercial sectors' },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-6 border-2 border-foreground bg-muted"
              >
                <h3 className="heading-sm text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-foreground opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
