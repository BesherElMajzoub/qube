import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings, useTrackClick } from '@/lib/useApi';
import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const MAPS_URL = "https://maps.google.com/maps?q=33°25'44.0%22N%2036°15'41.2%22E";

export default function Footer() {
  const { t, dir, language } = useLanguage();
  const { data: settings } = useSettings();
  const { mutate: trackClick } = useTrackClick();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background border-t-2 border-foreground">
      <div className="container py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b-2 border-background">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/img/LOGO (7).svg"
                alt="QUBE Logo"
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <span className="text-2xl font-black tracking-tighter">QUBE</span>
            </div>
            <div
              className="w-12 h-0.5 mb-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, #149b9e, #6e408d)' }}
            />
            <p className="text-sm opacity-80 leading-relaxed">
              {t('footer.company')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t('nav.home')}</Link>
              <Link href="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t('nav.about')}</Link>
              <Link href="/products" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t('nav.products')}</Link>
              <Link href="/projects" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t('nav.projects')}</Link>
              <Link href="/contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href={settings?.phone1 ? `tel:${settings.phone1}` : "tel:+963944357001"} onClick={() => trackClick('phone')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone size={16} />
                <span>{settings?.phone1 || "+963944357001"}</span>
              </a>
              {settings?.mobile && (
                <a href={`tel:${settings.mobile}`} onClick={() => trackClick('mobile')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <Phone size={16} />
                  <span>{settings.mobile}</span>
                </a>
              )}
              <a href="tel:0118224567" onClick={() => trackClick('phone')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone size={16} />
                <span dir="ltr">011 822 4567</span>
              </a>
              <a href={settings?.email ? `mailto:${settings.email}` : "mailto:lg.hausys.syria.1@gmail.com"} onClick={() => trackClick('email')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Mail size={16} />
                <span>{settings?.email || "lg.hausys.syria.1@gmail.com"}</span>
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackClick('address')} className="flex items-start gap-2 group">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 group-hover:text-accent transition-colors" />
                <span className="opacity-80 break-words group-hover:opacity-100 transition-opacity">
                  {dir === 'rtl' ? settings?.address_ar || "سوريا" : settings?.address_en || "Syria"}
                </span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.social')}</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61580791769420" target="_blank" rel="noopener noreferrer" onClick={() => trackClick('social_facebook')} className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/qube_26/" target="_blank" rel="noopener noreferrer" onClick={() => trackClick('social_instagram')} className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onClick={() => trackClick('social_linkedin')} className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-75">
          <p>&copy; {currentYear} QUBE. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">{language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
