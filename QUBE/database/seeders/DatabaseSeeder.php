<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Setting;
use App\Models\About;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::updateOrCreate(
            ['email' => 'admin@qube.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Seed Products
        $products = [
            [
                'name_en' => 'Carrara Marble',
                'name_ar' => 'رخام كاررارا',
                'description_en' => 'Premium Italian marble with elegant white and gray veining',
                'description_ar' => 'رخام إيطالي فاخر بخطوط بيضاء ورمادية أنيقة',
                'category' => 'marble',
                'price' => 150.00,
                'featured' => true,
            ],
            [
                'name_en' => 'Calacatta Gold',
                'name_ar' => 'كالاكاتا جولد',
                'description_en' => 'Luxurious marble with golden veining and white background',
                'description_ar' => 'رخام فاخر بخطوط ذهبية وخلفية بيضاء',
                'category' => 'marble',
                'price' => 180.00,
                'featured' => true,
            ],
            [
                'name_en' => 'Walnut Hardwood',
                'name_ar' => 'خشب الجوز الصلب',
                'description_en' => 'Rich walnut hardwood flooring with natural grain patterns',
                'description_ar' => 'أرضيات خشب جود صلب بنقوش طبيعية',
                'category' => 'wood',
                'price' => 120.00,
                'featured' => true,
            ],
            [
                'name_en' => 'Oak Premium',
                'name_ar' => 'البلوط الممتاز',
                'description_en' => 'Premium oak wood with beautiful natural finish',
                'description_ar' => 'خشب بلوط ممتاز بتشطيب طبيعي جميل',
                'category' => 'wood',
                'price' => 100.00,
                'featured' => true,
            ],
            [
                'name_en' => 'Engineered Quartz',
                'name_ar' => 'الكوارتز الهندسي',
                'description_en' => 'Durable engineered quartz with modern design patterns',
                'description_ar' => 'كوارتز هندسي متين بنقوش تصميم حديثة',
                'category' => 'engineered',
                'price' => 90.00,
                'featured' => true,
            ],
            [
                'name_en' => 'Porcelain Tiles',
                'name_ar' => 'بلاط البورسلين',
                'description_en' => 'High-quality porcelain tiles with contemporary designs',
                'description_ar' => 'بلاط بورسلين عالي الجودة بتصاميم معاصرة',
                'category' => 'engineered',
                'price' => 75.00,
                'featured' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['name_en' => $product['name_en']], $product);
        }

        // Seed Projects
        $projects = [
            [
                'title_en' => 'Modern Penthouse',
                'title_ar' => 'شقة فاخرة حديثة',
                'description_en' => 'Luxurious penthouse with marble surfaces and wooden accents',
                'description_ar' => 'شقة فاخرة بأسطح رخام وتفاصيل خشبية',
                'category' => 'residential',
                'featured' => true,
                'case_study_en' => 'Transformed a dated penthouse into a modern luxury space with premium materials.',
                'case_study_ar' => 'تحويل شقة فاخرة قديمة إلى مساحة حديثة فاخرة بمواد عالية الجودة.',
            ],
            [
                'title_en' => 'Corporate Office',
                'title_ar' => 'مكتب شركة',
                'description_en' => 'Contemporary office space with engineered surfaces',
                'description_ar' => 'مساحة مكتب معاصرة بأسطح هندسية',
                'category' => 'commercial',
                'featured' => true,
                'case_study_en' => 'Designed and installed premium surfaces for a corporate headquarters.',
                'case_study_ar' => 'تصميم وتركيب أسطح فاخرة لمقر شركة.',
            ],
            [
                'title_en' => 'Luxury Villa',
                'title_ar' => 'فيلا فاخرة',
                'description_en' => 'Elegant villa with marble flooring and custom finishes',
                'description_ar' => 'فيلا أنيقة بأرضيات رخام وتشطيبات مخصصة',
                'category' => 'residential',
                'featured' => true,
                'case_study_en' => 'Complete interior transformation with premium decorative materials.',
                'case_study_ar' => 'تحويل داخلي كامل بمواد ديكور فاخرة.',
            ],
            [
                'title_en' => 'Retail Store',
                'title_ar' => 'متجر بيع بالتجزئة',
                'description_en' => 'Modern retail space with polished concrete and wood surfaces',
                'description_ar' => 'مساحة بيع حديثة بأسطح خرسانة مصقولة وخشب',
                'category' => 'commercial',
                'featured' => true,
                'case_study_en' => 'Created an inviting retail environment with contemporary surface solutions.',
                'case_study_ar' => 'إنشاء بيئة بيع جذابة بحلول أسطح معاصرة.',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title_en' => $project['title_en']], $project);
        }

        // Seed Settings
        $settings = [
            'phone1' => '+966 (0) 123 456 789',
            'phone2' => '+966 (0) 123 456 790',
            'whatsapp' => '+966 (0) 123 456 789',
            'email' => 'info@qube.com',
            'address_en' => '123 Design Street, Creative City, Saudi Arabia',
            'address_ar' => '123 شارع التصميم، مدينة الإبداع، المملكة العربية السعودية',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }

        // Seed About
        About::updateOrCreate(
            ['id' => 1],
            [
                'title_en' => 'About QUBE',
                'title_ar' => 'عن كيوب',
                'description_en' => 'QUBE is a leading company specialized in decorative materials and surface solutions. We provide premium marble, wood, and engineered surfaces for residential and commercial projects.',
                'description_ar' => 'كيوب هي شركة رائدة متخصصة في المواد الديكورية وحلول الأسطح. نقدم أسطح رخام وخشب وأسطح هندسية فاخرة للمشاريع السكنية والتجارية.',
            ]
        );
    }
}
