import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t, dir, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background border-t-2 border-foreground">
      <div className="container py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b-2 border-background">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-black mb-4">QUBE</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              {t('footer.company')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.about')}
              </Link>
              <Link href="/products" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.products')}
              </Link>
              <Link href="/projects" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.projects')}
              </Link>
              <Link href="/contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+966123456789" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone size={16} />
                <span>+966 (0) 123 456 789</span>
              </a>
              <a href="mailto:info@qube.com" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Mail size={16} />
                <span>info@qube.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="opacity-80">123 Design Street, Creative City, CC 12345</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.social')}</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background text-foreground rounded hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-75">
          <p>&copy; {currentYear} QUBE. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:opacity-100 transition-opacity">{language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</a>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.867 1.167c-1.52.92-2.529 2.314-2.529 3.808 0 1.494 1.009 2.888 2.529 3.808a9.87 9.87 0 004.871 1.167h.004c5.358 0 9.716-4.335 9.716-9.696 0-1.348-.267-2.679-.774-3.912a9.778 9.778 0 00-2.313-3.206 9.766 9.766 0 00-3.608-2.087 9.793 9.793 0 00-4.052-.888zm7.076-6.992C16.936.504 13.429 0 12.051 0 5.495 0 .16 5.335.16 11.891c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.89 0-3.176-1.237-6.167-3.48-8.477z" />
        </svg>
      </a>
    </footer>
  );
}
