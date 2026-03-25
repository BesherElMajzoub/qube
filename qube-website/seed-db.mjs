import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { products, projects, locations } from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

async function seedDatabase() {
  if (!DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    console.log('Seeding database...');

    // Seed Products
    const productData = [
      {
        name: 'Carrara Marble',
        nameAr: 'رخام كاررارا',
        description: 'Premium Italian marble with elegant white and gray veining',
        descriptionAr: 'رخام إيطالي فاخر بخطوط بيضاء وزهرية أنيقة',
        category: 'marble',
        imageUrl: null,
        price: 150.00,
        featured: 1,
      },
      {
        name: 'Calacatta Gold',
        nameAr: 'كالاكاتا جولد',
        description: 'Luxurious marble with golden veining and white background',
        descriptionAr: 'رخام فاخر بخطوط ذهبية وخلفية بيضاء',
        category: 'marble',
        imageUrl: null,
        price: 180.00,
        featured: 1,
      },
      {
        name: 'Walnut Hardwood',
        nameAr: 'خشب الجوز الصلب',
        description: 'Rich walnut hardwood flooring with natural grain patterns',
        descriptionAr: 'أرضيات خشب جوز صلب بنقوش طبيعية',
        category: 'wood',
        imageUrl: null,
        price: 120.00,
        featured: 1,
      },
      {
        name: 'Oak Premium',
        nameAr: 'البلوط الممتاز',
        description: 'Premium oak wood with beautiful natural finish',
        descriptionAr: 'خشب بلوط ممتاز بتشطيب طبيعي جميل',
        category: 'wood',
        imageUrl: null,
        price: 100.00,
        featured: 1,
      },
      {
        name: 'Engineered Quartz',
        nameAr: 'الكوارتز الهندسي',
        description: 'Durable engineered quartz with modern design patterns',
        descriptionAr: 'كوارتز هندسي متين بنقوش تصميم حديثة',
        category: 'engineered',
        imageUrl: null,
        price: 90.00,
        featured: 1,
      },
      {
        name: 'Porcelain Tiles',
        nameAr: 'بلاط البورسلين',
        description: 'High-quality porcelain tiles with contemporary designs',
        descriptionAr: 'بلاط بورسلين عالي الجودة بتصاميم معاصرة',
        category: 'engineered',
        imageUrl: null,
        price: 75.00,
        featured: 1,
      },
    ];

    for (const product of productData) {
      await db.insert(products).values(product);
    }
    console.log('✓ Products seeded');

    // Seed Projects
    const projectData = [
      {
        title: 'Modern Penthouse',
        titleAr: 'شقة فاخرة حديثة',
        description: 'Luxurious penthouse with marble surfaces and wooden accents',
        descriptionAr: 'شقة فاخرة بأسطح رخام وتفاصيل خشبية',
        category: 'residential',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Transformed a dated penthouse into a modern luxury space with premium materials.',
        caseStudyAr: 'تحويل شقة فاخرة قديمة إلى مساحة حديثة فاخرة بمواد عالية الجودة.',
        featured: 1,
      },
      {
        title: 'Corporate Office',
        titleAr: 'مكتب شركة',
        description: 'Contemporary office space with engineered surfaces',
        descriptionAr: 'مساحة مكتب معاصرة بأسطح هندسية',
        category: 'commercial',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Designed and installed premium surfaces for a corporate headquarters.',
        caseStudyAr: 'تصميم وتركيب أسطح فاخرة لمقر شركة.',
        featured: 1,
      },
      {
        title: 'Luxury Villa',
        titleAr: 'فيلا فاخرة',
        description: 'Elegant villa with marble flooring and custom finishes',
        descriptionAr: 'فيلا أنيقة بأرضيات رخام وتشطيبات مخصصة',
        category: 'residential',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Complete interior transformation with premium decorative materials.',
        caseStudyAr: 'تحويل داخلي كامل بمواد ديكور فاخرة.',
        featured: 1,
      },
      {
        title: 'Retail Store',
        titleAr: 'متجر بيع بالتجزئة',
        description: 'Modern retail space with polished concrete and wood surfaces',
        descriptionAr: 'مساحة بيع حديثة بأسطح خرسانة مصقولة وخشب',
        category: 'commercial',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Created an inviting retail environment with contemporary surface solutions.',
        caseStudyAr: 'إنشاء بيئة بيع جذابة بحلول أسطح معاصرة.',
        featured: 1,
      },
      {
        title: 'Restaurant Design',
        titleAr: 'تصميم مطعم',
        description: 'Upscale restaurant with marble and wood accents',
        descriptionAr: 'مطعم فاخر بتفاصيل رخام وخشب',
        category: 'commercial',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Designed premium surfaces for a fine dining establishment.',
        caseStudyAr: 'تصميم أسطح فاخرة لمطعم فاخر.',
        featured: 1,
      },
      {
        title: 'Residential Apartment',
        titleAr: 'شقة سكنية',
        description: 'Contemporary apartment with engineered surfaces',
        descriptionAr: 'شقة معاصرة بأسطح هندسية',
        category: 'residential',
        beforeImageUrl: null,
        afterImageUrl: null,
        caseStudy: 'Modern apartment renovation with high-quality surface materials.',
        caseStudyAr: 'تجديد شقة حديثة بمواد أسطح عالية الجودة.',
        featured: 1,
      },
    ];

    for (const project of projectData) {
      await db.insert(projects).values(project);
    }
    console.log('✓ Projects seeded');

    // Seed Locations
    const locationData = [
      {
        name: 'Main Headquarters',
        nameAr: 'المقر الرئيسي',
        address: '123 Design Street, Creative City, CC 12345',
        addressAr: '123 شارع التصميم، مدينة الإبداع، CC 12345',
        phone: '+966 (0) 123 456 789',
        email: 'info@qube.com',
        latitude: 24.7136,
        longitude: 46.6753,
        isHeadquarters: 1,
      },
      {
        name: 'Northern Branch',
        nameAr: 'الفرع الشمالي',
        address: '456 Modern Ave, Design District, CD 54321',
        addressAr: '456 شارع الحداثة، حي التصميم، CD 54321',
        phone: '+966 (0) 123 456 790',
        email: 'north@qube.com',
        latitude: 24.8566,
        longitude: 46.7313,
        isHeadquarters: 0,
      },
      {
        name: 'Southern Branch',
        nameAr: 'الفرع الجنوبي',
        address: '789 Premium Blvd, Luxury Zone, LZ 98765',
        addressAr: '789 شارع البريميوم، منطقة الفخامة، LZ 98765',
        phone: '+966 (0) 123 456 791',
        email: 'south@qube.com',
        latitude: 24.6500,
        longitude: 46.7500,
        isHeadquarters: 0,
      },
    ];

    for (const location of locationData) {
      await db.insert(locations).values(location);
    }
    console.log('✓ Locations seeded');

    console.log('✓ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedDatabase();
