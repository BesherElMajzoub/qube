import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

export default function Privacy() {
  const { dir, language } = useLanguage();

  const sections = language === 'ar' ? [
    {
      title: 'المعلومات التي نجمعها',
      content: 'نجمع المعلومات التي تقدمها طوعاً من خلال نماذج الاتصال، مثل الاسم ورقم الهاتف وعنوان البريد الإلكتروني. كما نتتبع تفاعلات الزوار بصورة مجهولة لتحسين تجربة الموقع.'
    },
    {
      title: 'كيف نستخدم معلوماتك',
      content: 'نستخدم بياناتك للرد على استفساراتك، وتحسين خدماتنا، وتحليل حركة مرور الموقع لتطوير المحتوى. لن نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة دون موافقتك.'
    },
    {
      title: 'ملفات تعريف الارتباط (Cookies)',
      content: 'يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور. يمكنك إيقاف تشغيل ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.'
    },
    {
      title: 'أمان البيانات',
      content: 'نتخذ تدابير أمنية معقولة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الكشف أو التغيير أو الإتلاف.'
    },
    {
      title: 'حقوقك',
      content: 'يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك التواصل معنا عبر البريد الإلكتروني أو نموذج الاتصال.'
    },
    {
      title: 'التواصل معنا',
      content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر صفحة الاتصال.'
    },
  ] : [
    {
      title: 'Information We Collect',
      content: 'We collect information you voluntarily provide through contact forms, such as your name, phone number, and email address. We also track visitor interactions anonymously to improve the website experience.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your data to respond to your inquiries, improve our services, and analyze website traffic to develop content. We will not sell or share your personal data with third parties without your consent.'
    },
    {
      title: 'Cookies',
      content: 'Our website uses cookies to enhance user experience and analyze traffic. You can disable cookies through your browser settings.'
    },
    {
      title: 'Data Security',
      content: 'We take reasonable security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to request access to, correction, or deletion of your personal data at any time. You can contact us via email or the contact form.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us via the contact page.'
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={40} className="text-accent" />
            <h1 className="heading-xl text-background">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
          </div>
          <div className="w-20 h-1 bg-accent" />
          <p className="mt-6 body-lg text-background opacity-80 max-w-2xl">
            {language === 'ar'
              ? 'في QUBE، نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.'
              : 'At QUBE, we value your privacy and are committed to protecting your personal data.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="border-2 border-foreground p-8 hover:border-accent transition-colors">
                <h2 className="heading-sm text-foreground mb-4">
                  <span className="text-accent font-black me-3">{String(idx + 1).padStart(2, '0')}.</span>
                  {section.title}
                </h2>
                <p className="body-base text-foreground opacity-80 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 p-6 bg-muted border-2 border-foreground text-center">
            <p className="text-sm text-foreground opacity-60">
              {language === 'ar'
                ? `آخر تحديث: مارس 2026 — جميع الحقوق محفوظة © QUBE ${new Date().getFullYear()}`
                : `Last updated: March 2026 — All rights reserved © QUBE ${new Date().getFullYear()}`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
