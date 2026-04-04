import { useLanguage } from '@/contexts/LanguageContext';
import { useSubmitContact, useSettings, useTrackClick } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const MAPS_URL = "https://maps.google.com/maps?q=33°25'44.0%22N%2036°15'41.2%22E";
const MAPS_EMBED = "https://maps.google.com/maps?q=33%C2%B025'44.0%22N%2036%C2%B015'41.2%22E&output=embed&z=16";

const PROJECT_TYPES_EN = ['Kitchen', 'Bathroom', 'Commercial Counter', 'Reception Desk', 'Vanity Unit', 'Other'];
const PROJECT_TYPES_AR = ['مطبخ', 'حمام', 'كونتر تجاري', 'مكتب استقبال', 'وحدة Vanity', 'أخرى'];

export default function Contact() {
  const { t, dir, language } = useLanguage();
  const { data: settings } = useSettings();
  const { mutate: trackClick } = useTrackClick();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    projectType: '',
    measurements: '',
    preferredColor: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitMutation = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        message: formData.message || (language === 'ar' ? 'طلب عرض سعر' : 'Quote request'),
        projectType: formData.projectType || undefined,
        measurements: formData.measurements || undefined,
        preferredColor: formData.preferredColor || undefined,
      });
      toast.success(
        language === 'ar'
          ? 'تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.'
          : 'Request sent successfully! We will contact you within 24 hours.'
      );
      setFormData({ name: '', phone: '', email: '', message: '', projectType: '', measurements: '', preferredColor: '' });
    } catch (error: any) {
      toast.error(
        language === 'ar'
          ? 'فشل إرسال الطلب. الرجاء المحاولة مرة أخرى.'
          : 'Failed to send request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '963123456789';
  const projectTypes = language === 'ar' ? PROJECT_TYPES_AR : PROJECT_TYPES_EN;

  const inputClass =
    'w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors';
  const labelClass = 'block text-sm font-bold text-foreground mb-2';

  return (
    <div className="w-full" dir={dir}>
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('contact.title')}</h1>
          <div className="w-20 h-1 bg-accent"></div>
          <p className="mt-6 body-lg text-background opacity-80 max-w-xl">
            {t('contact.haveQuestionsDesc')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Quote Request Form */}
            <div>
              <h2 className="heading-md text-foreground mb-2">{t('contact.sendMessage')}</h2>
              <p className="text-sm text-foreground opacity-60 mb-8">
                {language === 'ar' ? '* الحقول الإلزامية' : '* Required fields'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="+963 (0) 9XX XXX XXX"
                    dir="ltr"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="your.email@example.com"
                    dir="ltr"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className={labelClass}>
                    {t('contact.projectType')}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">{t('contact.projectTypePlaceholder')}</option>
                    {projectTypes.map((pt, i) => (
                      <option key={i} value={PROJECT_TYPES_EN[i]}>{pt}</option>
                    ))}
                  </select>
                </div>

                {/* Measurements */}
                <div>
                  <label htmlFor="measurements" className={labelClass}>
                    {t('contact.measurements')}
                  </label>
                  <input
                    type="text"
                    id="measurements"
                    name="measurements"
                    value={formData.measurements}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('contact.measurementsPlaceholder')}
                  />
                </div>

                {/* Preferred Color */}
                <div>
                  <label htmlFor="preferredColor" className={labelClass}>
                    {t('contact.preferredColor')}
                  </label>
                  <input
                    type="text"
                    id="preferredColor"
                    name="preferredColor"
                    value={formData.preferredColor}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('contact.colorPlaceholder')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder={language === 'ar' ? 'أي تفاصيل إضافية عن مشروعك...' : 'Any additional details about your project...'}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-background hover:bg-accent/90 font-bold text-lg py-4 transition-all duration-300 hover:shadow-lg"
                >
                  {isLoading
                    ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...')
                    : t('contact.send')}
                </Button>

                {/* Trust note */}
                <div className="flex items-center gap-2 pt-2">
                  <CheckCircle size={16} className="text-accent flex-shrink-0" />
                  <p className="text-xs text-foreground opacity-60">
                    {language === 'ar'
                      ? 'سنرد على طلبك خلال 24 ساعة من أيام العمل'
                      : 'We will respond to your request within 24 business hours'}
                  </p>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="heading-md text-foreground mb-8">{t('contact.contactInfo')}</h2>

              <div className="space-y-6">
                {/* Main Contact Info */}
                <div className="p-6 border-2 border-foreground bg-muted">
                  <h3 className="heading-sm text-foreground mb-6">{t('contact.getInTouch')}</h3>

                  <div className="space-y-4">
                    {(settings?.phone1 || settings?.mobile) && (
                      <a
                        href={`tel:${settings?.phone1 || settings?.mobile}`}
                        onClick={() => trackClick('phone')}
                        className="flex items-start gap-4 group hover:text-accent transition-colors"
                      >
                        <Phone size={24} className="text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-foreground">{t('contact.phone')}</p>
                          <p className="text-foreground opacity-80" dir="ltr">{settings?.phone1 || settings?.mobile}</p>
                          {settings?.mobile && settings?.phone1 && (
                            <p className="text-foreground opacity-80" dir="ltr">{settings.mobile}</p>
                          )}
                        </div>
                      </a>
                    )}

                    <a
                      href="tel:0118224567"
                      onClick={() => trackClick('phone')}
                      className="flex items-start gap-4 group hover:text-accent transition-colors"
                    >
                      <Phone size={24} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground">{language === 'ar' ? 'الهاتف الأرضي' : 'Landline'}</p>
                        <p className="text-foreground opacity-80" dir="ltr">011 822 4567</p>
                      </div>
                    </a>

                    {settings?.email && (
                      <a
                        href={`mailto:${settings.email}`}
                        onClick={() => trackClick('email')}
                        className="flex items-start gap-4 group hover:text-accent transition-colors"
                      >
                        <Mail size={24} className="text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-foreground">{t('contact.email')}</p>
                          <p className="text-foreground opacity-80" dir="ltr">{settings.email}</p>
                        </div>
                      </a>
                    )}

                    <div className="flex items-start gap-4">
                      <Clock size={24} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground">{t('contact.hours')}</p>
                        <p className="text-foreground opacity-80">{t('contact.businessHours')}</p>
                        <p className="text-foreground opacity-80">{t('contact.weekendClosed')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="p-6 border-2 border-foreground bg-muted">
                  <h3 className="heading-sm text-foreground mb-4">{t('contact.ourLocation')}</h3>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('address')}
                    className="flex items-start gap-3 group hover:text-accent transition-colors"
                  >
                    <MapPin size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground opacity-80 group-hover:opacity-100">
                      {dir === 'rtl' ? (settings?.address_ar || 'سوريا') : (settings?.address_en || 'Syria')}
                    </p>
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <div className="p-8 border-2 border-[#25d366] bg-[#25d366]/5 relative overflow-hidden group rounded-xl mt-8">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#25d366]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#25d366] text-white p-3 rounded-xl shadow-md rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.867 1.167c-1.52.92-2.529 2.314-2.529 3.808 0 1.494 1.009 2.888 2.529 3.808a9.87 9.87 0 004.871 1.167h.004c5.358 0 9.716-4.335 9.716-9.696 0-1.348-.267-2.679-.774-3.912a9.778 9.778 0 00-2.313-3.206 9.766 9.766 0 00-3.608-2.087 9.793 9.793 0 00-4.052-.888zm7.076-6.992C16.936.504 13.429 0 12.051 0 5.495 0 .16 5.335.16 11.891c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.89 0-3.176-1.237-6.167-3.48-8.477z" />
                        </svg>
                      </div>
                      <h3 className="heading-sm text-foreground">
                        {language === 'ar' ? 'دردش معنا على واتساب' : 'Chat via WhatsApp'}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-foreground font-medium opacity-80 mb-6 leading-relaxed">
                      {language === 'ar'
                        ? 'مستشارونا جاهزون للرد على جميع استفساراتك وتقديم استشارة مجانية لمشروعك في أي وقت.'
                        : 'Our consultants are ready to answer all your questions and provide a free consultation for your project anytime.'}
                    </p>

                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('whatsapp_contact_box')}
                      className="inline-flex items-center justify-center w-full gap-2 bg-[#25d366] text-white px-6 py-4 font-bold rounded-lg shadow-lg shadow-[#25d366]/20 hover:bg-[#1ebe5d] hover:-translate-y-1 hover:shadow-[#25d366]/40 transition-all duration-300"
                    >
                      <span className="text-lg mx-auto">{language === 'ar' ? 'ابدأ المحادثة الآن' : 'Start Conversation Now'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-muted border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-md text-foreground text-center mb-8">{t('contact.findUs')}</h2>
          <div className="w-full border-2 border-foreground overflow-hidden contact-map-container">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="450"
              className="block border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QUBE Location"
            />
          </div>
          <div className="text-center mt-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('maps_link')}
              className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
            >
              <MapPin size={16} />
              {language === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-background border-t-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            {t('contact.haveQuestions')}
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('contact.haveQuestionsDesc')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6"
          >
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('whatsapp_cta')}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.867 1.167c-1.52.92-2.529 2.314-2.529 3.808 0 1.494 1.009 2.888 2.529 3.808a9.87 9.87 0 004.871 1.167h.004c5.358 0 9.716-4.335 9.716-9.696 0-1.348-.267-2.679-.774-3.912a9.778 9.778 0 00-2.313-3.206 9.766 9.766 0 00-3.608-2.087 9.793 9.793 0 00-4.052-.888zm7.076-6.992C16.936.504 13.429 0 12.051 0 5.495 0 .16 5.335.16 11.891c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.89 0-3.176-1.237-6.167-3.48-8.477z" />
              </svg>
              {t('contact.chatWhatsapp')}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
