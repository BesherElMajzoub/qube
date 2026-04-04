<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faq;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question_en' => 'Can the surfaces be installed without seams?',
                'question_ar' => 'هل يمكن تركيب الأسطح بدون فواصل؟',
                'answer_en' => 'Yes. LG HI-MACS allows for completely seamless installation. The surfaces are bonded and finished so no joints or seams are visible.',
                'answer_ar' => 'نعم، أسطح LG Hi-Macs تُركّب قطعة واحدة بالكامل. يتم ربط الأسطح وتشطيبها بحيث لا تظهر أي وصلات أو فواصل.',
                'order' => 1,
            ],
            [
                'question_en' => 'Is the material water-resistant?',
                'question_ar' => 'هل المادة مقاومة للماء؟',
                'answer_en' => 'Absolutely — it is 100% resistant to water and moisture. This makes it ideal for kitchens, bathrooms, and any humid environment.',
                'answer_ar' => 'نعم، المادة مقاومة بنسبة 100% للماء والرطوبة، مما يجعلها مثالية للمطابخ والحمامات وأي بيئة رطبة.',
                'order' => 2,
            ],
            [
                'question_en' => 'Can I request a custom shape or design?',
                'question_ar' => 'هل يمكن تنفيذ تصميم أو شكل مخصص؟',
                'answer_en' => 'Yes. HI-MACS can be thermoformed into almost any design, curve, or form. Our team will work with you to bring your vision to life.',
                'answer_ar' => 'بالتأكيد، يمكن تشكيل Hi-Macs حراريًا لتنفيذ أي تصميم أو انحناء أو شكل. فريقنا سيعمل معك لتحقيق رؤيتك.',
                'order' => 3,
            ],
            [
                'question_en' => 'How long does a project take?',
                'question_ar' => 'ما مدة تنفيذ المشروع؟',
                'answer_en' => 'Typically between 4 and 7 working days, depending on the size and complexity of the project.',
                'answer_ar' => 'من 4 إلى 7 أيام عمل بحسب حجم المشروع وتعقيده.',
                'order' => 4,
            ],
            [
                'question_en' => 'Do you offer after-sales service?',
                'question_ar' => 'هل توفرون خدمة ما بعد البيع؟',
                'answer_en' => 'Yes. QUBE provides comprehensive after-sales support including maintenance, surface re-polishing, and professional repair services.',
                'answer_ar' => 'نعم، توفر QUBE دعمًا شاملًا بعد التنفيذ يشمل الصيانة وإعادة التلميع وخدمات الإصلاح الاحترافية.',
                'order' => 5,
            ],
            [
                'question_en' => 'What is LG HI-MACS and why choose it?',
                'question_ar' => 'ما هي LG Hi-Macs ولماذا اختيارها؟',
                'answer_en' => 'LG HI-MACS is a premium acrylic solid surface material by LG. It is non-porous, antibacterial, thermoformable, and installed without visible seams — making it the highest-quality choice for kitchens, bathrooms, and commercial spaces.',
                'answer_ar' => 'LG Hi-Macs مادة أكريليكية صلبة فاخرة من إنتاج LG. غير مسامية، مضادة للبكتيريا، قابلة للتشكيل الحراري، وتُركَّب بدون فواصل مرئية—لتكون الخيار الأعلى جودة للمطابخ والحمامات والمساحات التجارية.',
                'order' => 6,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create(array_merge($faq, ['is_active' => true]));
        }
    }
}
