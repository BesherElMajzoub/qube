import { useLanguage } from '@/contexts/LanguageContext';
import { FileText } from 'lucide-react';

export default function Terms() {
  const { dir, language } = useLanguage();

  const sections = language === 'ar' ? [
    {
      title: 'قبول الشروط',
      content: 'باستخدام موقعنا الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام موقعنا.'
    },
    {
      title: 'استخدام الموقع',
      content: 'يمكنك استخدام هذا الموقع للأغراض القانونية فقط. يُحظر عليك استخدام الموقع بأي طريقة تنتهك القوانين المعمول بها أو تضر بحقوق الآخرين.'
    },
    {
      title: 'الملكية الفكرية',
      content: 'جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، هي ملك لـ QUBE ومحمية بموجب قوانين حقوق الملكية الفكرية.'
    },
    {
      title: 'إخلاء المسؤولية',
      content: 'نسعى جاهدين لتقديم معلومات دقيقة، لكننا لا نضمن دقة أو اكتمال المحتوى. QUBE غير مسؤولة عن أي أضرار تنجم عن استخدام الموقع أو الاعتماد على محتواه.'
    },
    {
      title: 'روابط الأطراف الثالثة',
      content: 'قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو سياسات الخصوصية الخاصة بهذه المواقع.'
    },
    {
      title: 'تعديل الشروط',
      content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة وتحديث تاريخ آخر مراجعة. الاستمرار في استخدام الموقع يعني موافقتك على الشروط الجديدة.'
    },
    {
      title: 'القانون المطبق',
      content: 'تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية، وأي نزاع ينشأ عنها يخضع للاختصاص القضائي للمحاكم السعودية.'
    },
  ] : [
    {
      title: 'Acceptance of Terms',
      content: 'By using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our website.'
    },
    {
      title: 'Use of Site',
      content: 'You may use this site for lawful purposes only. You are prohibited from using the site in any way that violates applicable laws or infringes on the rights of others.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content on this website, including texts, images, logos, and designs, is the property of QUBE and is protected by intellectual property laws.'
    },
    {
      title: 'Disclaimer',
      content: 'We strive to provide accurate information, but we do not guarantee the accuracy or completeness of the content. QUBE is not liable for any damages arising from the use of the site or reliance on its content.'
    },
    {
      title: 'Third-Party Links',
      content: 'Our site may contain links to external websites. We are not responsible for the content or privacy policies of these sites.'
    },
    {
      title: 'Modification of Terms',
      content: 'We reserve the right to modify these terms at any time. Changes will be posted on this page and the last review date updated. Continued use of the site means your acceptance of the new terms.'
    },
    {
      title: 'Governing Law',
      content: 'These terms and conditions are governed by the laws of the Kingdom of Saudi Arabia, and any dispute arising from them is subject to the jurisdiction of Saudi courts.'
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <FileText size={40} className="text-accent" />
            <h1 className="heading-xl text-background">
              {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </h1>
          </div>
          <div className="w-20 h-1 bg-accent" />
          <p className="mt-6 body-lg text-background opacity-80 max-w-2xl">
            {language === 'ar'
              ? 'يرجى قراءة هذه الشروط بعناية قبل استخدام موقع QUBE.'
              : 'Please read these terms carefully before using the QUBE website.'}
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
