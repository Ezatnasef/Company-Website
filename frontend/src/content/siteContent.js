import { brand } from './brand';

export const siteCopy = {
  ar: {
    nav: {
      menu: 'القائمة',
      quickLinks: [
        { key: 'contact', label: 'تواصل معنا' },
        { key: 'projects', label: 'المشاريع' },
        { key: 'admin', label: 'لوحة التحكم' },
      ],
      links: [
        {
          key: 'services',
          label: 'خدماتنا',
          children: [
            { key: 'web-applications', label: 'تطوير مواقع الويب', to: '/services/web-applications' },
            { key: 'mobile-applications', label: 'تطوير تطبيقات الهاتف', to: '/services/mobile-applications' },
          ],
        },
        { key: 'projects', label: 'مشاريعنا' },
        { key: 'about', label: 'من نحن' },
      ],
      language: 'اللغة',
      theme: 'الوضع',
      light: 'فاتح',
      dark: 'داكن',
    },
    hero: {
      eyebrow: 'بيت خبرة لتصميم وتطوير الحلول الرقمية',
      title: [
        'شركة برمجيات تساعدك على بناء تجربة',
        'رقمية ناجحة تحقق أهداف مشروعك',
      ],
      description: 'شركة برمجيات تقدم خدمات تطوير المواقع والتطبيقات المبتكرة لمساعدتك على تحقيق أهدافك وبناء حضور رقمي واضح.',
      primaryAction: 'ابدأ الآن',
      secondaryAction: 'شاهد أعمالنا',
      trustedBy: 'موثوق من شركات ومؤسسات تقود قطاعاتها',
    },
    about: {
      tag: 'من نحن',
      title: 'نحول رؤيتك إلى تجربة رقمية متقنة تحترم المستخدم وتخدم النمو.',
      description: `في ${brand.name} نبني مواقع وتطبيقات بواجهة مدروسة، أداء سريع، ومحتوى يشرح القيمة التجارية بوضوح. نهتم بما يراه العميل وما يحدث خلف الكواليس بنفس القدر.`,
      stats: [
        { key: 'projects', label: 'مشروع تم تنفيذه' },
        { key: 'workHours', label: 'ساعة عمل' },
        { key: 'coffeeCups', label: 'جلسة مراجعة' },
        { key: 'yearsExperience', label: 'سنوات خبرة' },
      ],
    },
    services: {
      tag: 'خدماتنا',
      title: 'خدمات احترافية على يد خبراء',
      subtitle: 'نرتب الخدمة والفكرة والمحتوى داخل واجهة مفهومة وسريعة وتخدم القرار التجاري.',
      panelTitle: 'نحن لا نصمم ونطور فقط... نحن نبني تجارب رقمية.',
      bulletsTitle: 'ما الذي نركز عليه داخل هذه الخدمة؟',
      serviceFallback: 'خدمة رقمية',
      details: {
        websites: {
          title: 'برمجة وتصميم المواقع الإلكترونية',
          lead: 'نحوّل موقعك إلى أصل رقمي يشرح هويتك، يبني الثقة، ويزيد التحويل.',
          body: 'نصمم صفحات واضحة، نبني هيكل محتوى ذكي، ونضبط الأداء والتهيئة التقنية حتى تكون تجربة التصفح سريعة ومقنعة من أول زيارة.',
          bullets: [
            'سرعة تحميل عالية وتجربة استخدام نظيفة.',
            'واجهة تعكس الهوية التجارية دون ازدحام بصري.',
            'بنية قابلة للتوسع وصفحات مصممة للحجز أو البيع أو التواصل.',
          ],
        },
        mobile: {
          title: 'برمجة وتصميم تطبيقات الجوال',
          lead: 'نصمم تطبيقات عملية وواضحة تقلل خطوات المستخدم وتزيد الاعتماد اليومي.',
          body: 'نبدأ من رحلة المستخدم، ثم نحولها إلى شاشات مترابطة وحالات استخدام حقيقية مع اهتمام بالأداء وسهولة التطوير لاحقًا.',
          bullets: [
            'شاشات واضحة وحالات استخدام مدروسة.',
            'تدفقات تسجيل وحجز وشراء سلسة.',
            'واجهة قابلة للتطوير مستقبلاً دون إعادة بناء كاملة.',
          ],
        },
        support: {
          title: 'الصيانة والدعم الفني',
          lead: 'لا نتعامل مع التسليم كنهاية المشروع بل كبداية مرحلة الاستقرار والتحسين.',
          body: 'نوفر صيانة تشغيلية ومتابعة للأخطاء والتحسينات المطلوبة لضمان أن يبقى الموقع أو التطبيق في أفضل حالة ممكنة.',
          bullets: [
            'مراقبة المشاكل والرد على الأعطال بسرعة.',
            'تحسينات دورية حسب الاستخدام الفعلي.',
            'مراجعة أمنية ونسخ احتياطية وتحديثات منتظمة.',
          ],
        },
        marketing: {
          title: 'التسويق الرقمي',
          lead: 'نربط المنتج الرقمي بالوصول الصحيح والمحتوى المناسب.',
          body: 'من تهيئة الصفحات إلى تحسين الرسائل الإعلانية، نساعدك على بناء حضور رقمي مقنع يقود إلى نتائج قابلة للقياس.',
          bullets: [
            'صياغة رسائل واضحة لكل مرحلة في القمع التسويقي.',
            'تحسين صفحات الهبوط ومعدلات التحويل.',
            'تناسق بين الهوية، المحتوى، والإعلانات.',
          ],
        },
        ai: {
          title: 'الذكاء الاصطناعي',
          lead: 'نستخدم الذكاء الاصطناعي عندما يضيف اختصارًا حقيقيًا أو دقة أعلى للقرار.',
          body: 'نساعدك في دمج مساعدات ذكية، أتمتة إجراءات، أو تحسين تحليل البيانات بطريقة عملية تخدم التشغيل اليومي.',
          bullets: [
            'أتمتة مهام متكررة تقلل الوقت والتكلفة.',
            'تحسين تجربة الدعم أو التوصيات أو التصنيف.',
            'دمج واقعي داخل المنتج بدل إضافات شكلية بلا أثر.',
          ],
        },
      },
    },
    projects: {
      tag: 'أعمالنا',
      title: 'أهم أعمالنا في برمجة وتصميم المواقع والتطبيقات',
      subtitle: 'اطلع بنفسك على بعض من أهم مشاريعنا وإنجازاتنا.',
      tabs: {
        app: 'تطبيقات الموبايل',
        web: 'تطوير مواقع الويب',
      },
      previous: 'السابق',
      next: 'التالي',
      detailsHeading: 'لمحة سريعة',
      appScreens: ['الرئيسية', 'القوائم', 'الحجوزات', 'الملف الشخصي'],
      webScreens: ['الرئيسية', 'الخدمات', 'المباريات', 'الاتحادات'],
    },
    testimonials: {
      tag: 'آراء العملاء',
      title: ['هل رأيت هذا المستوى من رضا', 'العملاء من قبل؟'],
      subtitle: 'لا نأخذ كلامنا كأمر مسلم به، هذا ما يقوله عملاؤنا عنا.',
      watch: 'شاهد',
      quote: 'اقتباس',
      audio: 'صوت',
      transcript: 'هذا العميل أشاد بسرعة التنفيذ ووضوح التواصل وجودة التجربة النهائية.',
      audioNote: 'تم تجهيز نسخة صوتية من الشهادة ويمكن إضافتها عند توفر الملف.',
    },
    features: {
      tag: 'ما يميزنا',
      title: 'أهم ما يميز خدماتنا',
      subtitle: 'لسنا مجرد جهة تنفيذ؛ نبني مسارًا واضحًا من الفكرة حتى الإطلاق ثم نكمل معك بعد التسليم.',
      previous: 'السابق',
      next: 'التالي',
      items: [
        {
          icon: '</>',
          title: 'حلول تتجاوز الأكواد البرمجية',
          description: 'لا نكتب الكود فقط، بل نبني منطقًا يخدم الفكرة التجارية ويجعل المنتج أكثر قابلية للاستخدام والتوسع.',
        },
        {
          icon: 'AI',
          title: 'مواكبة أحدث الاتجاهات الرقمية',
          description: 'نختار التقنية المناسبة حسب المشروع بدلاً من مطاردة الموضة التقنية بلا قيمة تشغيلية.',
        },
        {
          icon: '24/7',
          title: 'دعم فني سريع ومتميز',
          description: 'متابعة عملية لما بعد الإطلاق حتى لا يتحول التسليم إلى نقطة انقطاع مع العميل.',
        },
        {
          icon: 'OPS',
          title: 'خطوات تنفيذ المشروع الواضحة',
          description: 'تفصيل المراحل قبل التنفيذ حتى تكون الصورة واضحة منذ البداية للعميل والفريق.',
        },
        {
          icon: 'QA',
          title: 'الالتزام بمعايير الجودة العالية',
          description: 'نهتم بالتجربة، الأداء، وضبط التفاصيل الصغيرة التي تصنع الفرق في الانطباع العام.',
        },
      ],
    },
    process: {
      tag: 'مراحل التنفيذ',
      title: 'مراحل تنفيذ مشروعك',
      subtitle: 'أنت على بعد 7 خطوات فقط من إطلاق مشروع أحلامك، والخطوة السابعة تتضمن تشغيل مشروعك بسلاسة.',
      tabs: {
        engineering: 'البرمجة',
        marketing: 'التسويق الرقمي',
      },
      previous: 'السابق',
      next: 'التالي',
      tracks: {
        engineering: [
          {
            number: '01.',
            icon: '◌',
            title: 'دراسة وتحليل',
            description: 'نبدأ بفهم احتياج المشروع، الجمهور المستهدف، ونحدد أفضل حلول التنفيذ التقنية والوظيفية قبل أي تصميم أو برمجة.',
          },
          {
            number: '02.',
            icon: '▣',
            title: 'هيكلة المتطلبات',
            description: 'نرتب الشاشات والخصائص والأولويات داخل وثيقة تنفيذ واضحة تعطي صورة دقيقة للنطاق والزمن.',
          },
          {
            number: '03.',
            icon: '✦',
            title: 'تصميم الواجهة والتجربة',
            description: 'نرسم تجربة الاستخدام بشكل عملي ومقنع قبل نقلها إلى تطوير فعلي.',
          },
          {
            number: '04.',
            icon: '{}',
            title: 'البرمجة والتكامل',
            description: 'نحوّل التصميم إلى منتج حي مع ربط الأنظمة، النماذج، ولوحات الإدارة المطلوبة.',
          },
          {
            number: '05.',
            icon: '✓',
            title: 'الاختبار وضبط الجودة',
            description: 'نراجع السيناريوهات الأساسية، الأداء، وسهولة الاستخدام قبل الإطلاق.',
          },
          {
            number: '06.',
            icon: '⇪',
            title: 'الإطلاق',
            description: 'نجهز بيئة النشر ونضمن أن الإطلاق يتم بسلاسة مع إعدادات صحيحة وقابلة للمراقبة.',
          },
          {
            number: '07.',
            icon: '∞',
            title: 'الدعم والتحسين',
            description: 'نستمر بالمراجعة والتحسين بعد الإطلاق لضمان استقرار المنتج ونموه.',
          },
        ],
        marketing: [
          {
            number: '01.',
            icon: '◌',
            title: 'فهم السوق',
            description: 'نحدد الجمهور والرسائل الأساسية والفرص التسويقية قبل أي حملة.',
          },
          {
            number: '02.',
            icon: '✎',
            title: 'بناء الرسائل',
            description: 'نصيغ عرضًا تسويقيًا واضحًا ورسائل تناسب كل منصة وكل شريحة مستهدفة.',
          },
          {
            number: '03.',
            icon: '◫',
            title: 'تهيئة صفحات الهبوط',
            description: 'نجهز الصفحات التي تستقبل الزيارات وتحوّلها إلى طلبات أو مبيعات أو تواصل.',
          },
          {
            number: '04.',
            icon: '◎',
            title: 'إطلاق الحملات',
            description: 'ننطلق بحملات قابلة للقياس مع تقسيم مناسب واختبارات مستمرة.',
          },
          {
            number: '05.',
            icon: '↻',
            title: 'التحسين المستمر',
            description: 'نراقب النتائج ونحسن الاستهداف والرسائل والصفحات للوصول لأفضل عائد.',
          },
        ],
      },
    },
    contact: {
      tag: 'تواصل معنا',
      title: 'ابدأ قصة نجاحك الرقمية',
      subtitle: 'إذا كانت لديك فكرة مشروع أو ترغب في تطوير تجربة رقمية أفضل، فهذه أفضل نقطة للبدء.',
      info: [
        { label: 'البريد الإلكتروني', value: brand.contactEmail },
        { label: 'الهاتف', value: '+966 5X XXX XXXX' },
        { label: 'الموقع', value: 'المملكة العربية السعودية' },
      ],
      formTitle: 'أرسل تفاصيل مشروعك',
      fields: {
        name: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        service: 'الخدمة المطلوبة',
        description: 'وصف المشروع',
      },
      placeholders: {
        name: 'أدخل اسمك الكامل',
        phone: '+966 5X XXX XXXX',
        email: 'name@example.com',
        service: 'اختر الخدمة',
        description: 'اشرح لنا فكرة مشروعك أو التحدي الذي تريد حله',
      },
      services: [
        'برمجة وتصميم المواقع الإلكترونية',
        'برمجة وتصميم تطبيقات الجوال',
        'التسويق الرقمي',
        'الذكاء الاصطناعي',
        'الصيانة والدعم الفني',
      ],
      submit: 'إرسال الطلب',
      sending: 'جارٍ الإرسال...',
      fillAll: 'يرجى تعبئة جميع الحقول.',
      fallbackError: 'حدث خطأ، حاول مجددًا.',
    },
    footer: {
      description: 'شركة برمجيات تبني مواقع وتطبيقات وواجهات رقمية مدروسة تساعدك على النمو بثبات ووضوح.',
      linksTitle: 'روابط سريعة',
      legalTitle: 'قانوني',
      links: ['من نحن', 'مشاريعنا', 'آراء العملاء', 'تواصل معنا'],
      legal: ['سياسة الخصوصية', 'الشروط والأحكام'],
      copyright: `جميع الحقوق محفوظة 2026 © ${brand.name}`,
    },
  },
  en: {
    nav: {
      menu: 'Menu',
      quickLinks: [
        { key: 'contact', label: 'Contact' },
        { key: 'projects', label: 'Projects' },
        { key: 'admin', label: 'Admin' },
      ],
      links: [
        {
          key: 'services',
          label: 'Services',
          children: [
            { key: 'web-applications', label: 'Website development', to: '/services/web-applications' },
            { key: 'mobile-applications', label: 'Mobile app development', to: '/services/mobile-applications' },
          ],
        },
        { key: 'projects', label: 'Projects' },
        { key: 'about', label: 'About' },
      ],
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    hero: {
      eyebrow: 'Software house for premium digital products',
      title: [
        'A software house that helps you build',
        'a digital experience that moves your project forward',
      ],
      description: 'We design and develop websites and apps with sharper positioning, cleaner journeys, and stronger conversion paths.',
      primaryAction: 'Start now',
      secondaryAction: 'View our work',
      trustedBy: 'Trusted by brands and institutions across multiple sectors',
    },
    about: {
      tag: 'About us',
      title: 'We turn your vision into a polished digital experience that respects users and drives growth.',
      description: `At ${brand.name}, we build websites and apps with thoughtful interfaces, strong performance, and messaging that makes your business value obvious from the first screen.`,
      stats: [
        { key: 'projects', label: 'Completed projects' },
        { key: 'workHours', label: 'Work hours' },
        { key: 'coffeeCups', label: 'Review sessions' },
        { key: 'yearsExperience', label: 'Years of experience' },
      ],
    },
    services: {
      tag: 'Services',
      title: 'Professional services led by experts',
      subtitle: 'We align service, idea, and interface into a fast, understandable, conversion-ready experience.',
      panelTitle: 'We do more than design and build... we shape digital experiences.',
      bulletsTitle: 'What we focus on in this service',
      serviceFallback: 'Digital service',
      details: {
        websites: {
          title: 'Website design and development',
          lead: 'We turn your website into a digital asset that explains your value, builds trust, and improves conversion.',
          body: 'We craft page structures, content hierarchy, and technical performance so the browsing experience feels polished and persuasive from the first visit.',
          bullets: [
            'Fast loading and clean user journeys.',
            'A visual system that reflects the brand without clutter.',
            'A scalable structure ready for booking, sales, or inbound leads.',
          ],
        },
        mobile: {
          title: 'Mobile app design and development',
          lead: 'We design practical mobile products that reduce friction and increase repeated use.',
          body: 'We start from real user journeys, then shape them into connected screens and operational flows with long-term maintainability in mind.',
          bullets: [
            'Clear screens and intentional states.',
            'Smooth booking, purchase, and onboarding flows.',
            'A product foundation ready for future iterations.',
          ],
        },
        support: {
          title: 'Maintenance and technical support',
          lead: 'We treat delivery as the start of a stability and improvement phase, not the finish line.',
          body: 'We provide maintenance, issue handling, and ongoing refinements to keep the website or app reliable and production-ready.',
          bullets: [
            'Fast handling of issues and operational bugs.',
            'Continuous refinements based on real usage.',
            'Backups, updates, and practical security reviews.',
          ],
        },
        marketing: {
          title: 'Digital marketing',
          lead: 'We connect the product to the right reach and the right message.',
          body: 'From landing pages to campaign messaging, we help you build a digital presence that is coherent, measurable, and easier to scale.',
          bullets: [
            'Sharper messaging across the funnel.',
            'Better landing pages and stronger conversion rates.',
            'Consistent identity across brand, content, and campaigns.',
          ],
        },
        ai: {
          title: 'Artificial intelligence',
          lead: 'We use AI where it creates real leverage, not noise.',
          body: 'We help you integrate smart assistants, automations, or decision-support capabilities that improve operations and customer experience.',
          bullets: [
            'Automation for repetitive work and lower operational cost.',
            'Smarter support, recommendation, or classification flows.',
            'Practical product integration instead of cosmetic add-ons.',
          ],
        },
      },
    },
    projects: {
      tag: 'Projects',
      title: 'Selected work in website and app design and development',
      subtitle: 'A closer look at a few of our strongest digital launches.',
      tabs: {
        app: 'Mobile apps',
        web: 'Websites',
      },
      previous: 'Previous',
      next: 'Next',
      detailsHeading: 'Snapshot',
      appScreens: ['Home', 'Lists', 'Booking', 'Profile'],
      webScreens: ['Home', 'Services', 'Matches', 'Partners'],
    },
    testimonials: {
      tag: 'Testimonials',
      title: ['Have you seen this level of client', 'satisfaction before?'],
      subtitle: 'Do not take our word for it. This is how clients describe working with us.',
      watch: 'Watch',
      quote: 'Quote',
      audio: 'Audio',
      transcript: 'This client highlighted execution speed, clarity in communication, and the final product quality.',
      audioNote: 'An audio version can be added once a source file is available.',
    },
    features: {
      tag: 'Why us',
      title: 'What makes our service stand out',
      subtitle: 'We are not just a delivery team. We build a clear path from idea to launch and stay involved after release.',
      previous: 'Previous',
      next: 'Next',
      items: [
        {
          icon: '</>',
          title: 'Solutions beyond code',
          description: 'We build the business logic and user flow behind the code so the product can perform, not just exist.',
        },
        {
          icon: 'AI',
          title: 'Current digital thinking',
          description: 'We choose tools and patterns that fit the project instead of following trends for the sake of trends.',
        },
        {
          icon: '24/7',
          title: 'Fast technical support',
          description: 'Post-launch follow-through is part of the service, not an afterthought.',
        },
        {
          icon: 'OPS',
          title: 'Clear delivery stages',
          description: 'We define the stages early so expectations, scope, and momentum stay aligned.',
        },
        {
          icon: 'QA',
          title: 'High quality standards',
          description: 'We care about performance, usability, and the subtle details that shape trust.',
        },
      ],
    },
    process: {
      tag: 'Process',
      title: 'Project execution stages',
      subtitle: 'You are only a few steps away from launching your next digital experience with clarity.',
      tabs: {
        engineering: 'Engineering',
        marketing: 'Digital marketing',
      },
      previous: 'Previous',
      next: 'Next',
      tracks: {
        engineering: [
          {
            number: '01.',
            icon: '◌',
            title: 'Discovery and analysis',
            description: 'We begin by understanding the project, audience, and operational goals before design or code starts.',
          },
          {
            number: '02.',
            icon: '▣',
            title: 'Requirements structure',
            description: 'We define screens, capabilities, and priorities inside a clear implementation document.',
          },
          {
            number: '03.',
            icon: '✦',
            title: 'UX and interface design',
            description: 'We turn the concept into an interface that feels intentional and easy to navigate.',
          },
          {
            number: '04.',
            icon: '{}',
            title: 'Build and integrations',
            description: 'We develop the product and connect the services, dashboards, and workflows it depends on.',
          },
          {
            number: '05.',
            icon: '✓',
            title: 'Testing and QA',
            description: 'We review core scenarios, performance, and polish before release.',
          },
          {
            number: '06.',
            icon: '⇪',
            title: 'Launch',
            description: 'We prepare the release environment and ship with stable production settings.',
          },
          {
            number: '07.',
            icon: '∞',
            title: 'Support and refinement',
            description: 'We continue monitoring and refining the product after launch.',
          },
        ],
        marketing: [
          {
            number: '01.',
            icon: '◌',
            title: 'Market understanding',
            description: 'We define audience, message, and market opportunity before building campaigns.',
          },
          {
            number: '02.',
            icon: '✎',
            title: 'Message architecture',
            description: 'We shape the offer and the language for each platform and segment.',
          },
          {
            number: '03.',
            icon: '◫',
            title: 'Landing page setup',
            description: 'We prepare landing pages that can absorb traffic and turn it into action.',
          },
          {
            number: '04.',
            icon: '◎',
            title: 'Campaign launch',
            description: 'We launch measurable campaigns with segmentation and iterative testing.',
          },
          {
            number: '05.',
            icon: '↻',
            title: 'Continuous optimization',
            description: 'We improve targeting, creative direction, and page performance based on data.',
          },
        ],
      },
    },
    contact: {
      tag: 'Contact',
      title: 'Start your next digital success story',
      subtitle: 'If you have a project idea or want to improve an existing digital experience, this is the right starting point.',
      info: [
        { label: 'Email', value: brand.contactEmail },
        { label: 'Phone', value: '+966 5X XXX XXXX' },
        { label: 'Location', value: 'Saudi Arabia' },
      ],
      formTitle: 'Send your project brief',
      fields: {
        name: 'Full name',
        phone: 'Phone',
        email: 'Email',
        service: 'Service',
        description: 'Project brief',
      },
      placeholders: {
        name: 'Enter your full name',
        phone: '+966 5X XXX XXXX',
        email: 'name@example.com',
        service: 'Choose a service',
        description: 'Tell us about the project idea or the problem you want to solve',
      },
      services: [
        'Website design and development',
        'Mobile app design and development',
        'Digital marketing',
        'Artificial intelligence',
        'Maintenance and technical support',
      ],
      submit: 'Send request',
      sending: 'Sending...',
      fillAll: 'Please fill in all fields.',
      fallbackError: 'Something went wrong. Please try again.',
    },
    footer: {
      description: 'A software house that builds websites, apps, and digital interfaces with clarity, taste, and business intent.',
      linksTitle: 'Quick links',
      legalTitle: 'Legal',
      links: ['About', 'Projects', 'Testimonials', 'Contact'],
      legal: ['Privacy policy', 'Terms and conditions'],
      copyright: `All rights reserved 2026 © ${brand.name}`,
    },
  },
};

export const serviceTitleMap = {
  'برمجة وتصميم المواقع الإلكترونية': 'websites',
  'برمجة وتصميم تطبيقات الجوال': 'mobile',
  'الصيانة والدعم الفني': 'support',
  'التسويق الرقمي': 'marketing',
  'الذكاء الاصطناعي': 'ai',
  'الأمن والحماية الرقمية': 'websites',
};

export const projectMeta = {
  'آل ساري للسيارات': {
    ar: {
      title: 'آل ساري للسيارات',
      description: 'منصة رقمية لعرض السيارات الجديدة والمستعملة مع تجربة استخدام بسيطة وواضحة.',
      caption: 'واجهة تبرز المنتجات وتختصر خطوات التواصل والطلب.',
    },
    en: {
      title: 'Al Sari Cars',
      description: 'A digital platform for showcasing new and used cars with a clean, easy buying journey.',
      caption: 'An interface that highlights inventory and shortens the lead path.',
    },
    accent: 'teal',
  },
  'اسبتالية': {
    ar: {
      title: 'اسبتالية',
      description: 'منصة خدمات صحية إلكترونية بواجهة عصرية تركّز على الحجز والوصول السريع للمعلومة.',
      caption: 'تجربة منظمة للمحتوى الطبي والحجز والخدمات.',
    },
    en: {
      title: 'Espitaliaa',
      description: 'A healthcare platform with a modern interface built around appointment booking and quick access to information.',
      caption: 'A structured experience for medical content, booking, and services.',
    },
    accent: 'aqua',
  },
  'غزال لإدارة المواقف': {
    ar: {
      title: 'غزال لإدارة مواقف السيارات',
      description: 'نظام ذكي لإدارة المواقف والحجز والدفع عبر تجربة موبايل واضحة وسريعة.',
      caption: 'تجربة تطبيق تعتمد على اختصار الخطوات والوضوح البصري.',
    },
    en: {
      title: 'Ghazal Parking',
      description: 'A smart parking management app built around booking, live status, and fast payment flows.',
      caption: 'A mobile-first experience focused on speed and visual clarity.',
    },
    accent: 'blue',
  },
  'رابل الزراعية': {
    ar: {
      title: 'رابل الزراعية',
      description: 'موقع تجاري يعرض المنتجات الزراعية والخدمات بطريقة مرتبة تدعم الثقة وسهولة التصفح.',
      caption: 'تنظيم واضح للمحتوى التجاري والمنتجات.',
    },
    en: {
      title: 'Rabl Agriculture',
      description: 'A commercial website that presents agricultural products and services with stronger trust and smoother browsing.',
      caption: 'A clearer structure for products and commercial content.',
    },
    accent: 'sand',
  },
  'منصور للذبائح': {
    ar: {
      title: 'منصور للذبائح',
      description: 'تطبيق يسهّل الطلب والتوصيل مع تجربة مريحة وسريعة لرحلة الشراء كاملة.',
      caption: 'رحلة استخدام تركّز على الوضوح والسرعة في الطلب.',
    },
    en: {
      title: 'Mansour Meat',
      description: 'An app built to simplify ordering and delivery with a fast, comfortable purchasing journey.',
      caption: 'A user flow centered on speed and low-friction ordering.',
    },
    accent: 'rose',
  },
  'نادي أبها الرياضي': {
    ar: {
      title: 'نادي أبها الرياضي',
      description: 'موقع رسمي يعرض الأخبار والمباريات والتذاكر والاتحادات في واجهة مميزة للنادي.',
      caption: 'واجهة ويب تعكس الهوية البصرية وتدعم تحديث المحتوى باستمرار.',
    },
    en: {
      title: 'Abha Club',
      description: 'An official website for news, matches, tickets, and club content built around a strong sports identity.',
      caption: 'A web interface that reflects the club brand and supports ongoing content updates.',
    },
    accent: 'crimson',
  },
};

export const testimonialMeta = {
  'أ. سلطان الفيفي': {
    ar: { name: 'أ. سلطان الفيفي', role: 'المؤسس والمدير التنفيذي لمنصة 93 سيارة' },
    en: { name: 'Mr. Sultan Al-Fifi', role: 'Founder and CEO, 93 Sayara' },
  },
  'أ. محمد عراقي': {
    ar: { name: 'أ. محمد عراقي', role: 'مسؤول تسويق شركة رابل الزراعية' },
    en: { name: 'Mr. Mohammed Iraqi', role: 'Marketing Lead, Rabl Agriculture' },
  },
  'أ. محمد الكثيري': {
    ar: { name: 'أ. محمد الكثيري', role: 'المدير التنفيذي لشركة الكثيري' },
    en: { name: 'Mr. Mohammed Al-Katheeri', role: 'CEO, Al Katheeri Company' },
  },
  'أ. عبد العزيز النصيري': {
    ar: { name: 'أ. عبد العزيز النصيري', role: 'المدير التنفيذي والشريك المؤسس لمنصة بلاتين' },
    en: { name: 'Mr. Abdulaziz Al-Nusairi', role: 'CEO and Co-Founder, Platin' },
  },
  'أ. أحمد مفرح': {
    ar: { name: 'أ. أحمد مفرح', role: 'مدير التسويق في شركة الخليج للسيارات' },
    en: { name: 'Mr. Ahmed Mofreh', role: 'Marketing Manager, Gulf Cars' },
  },
};

export const clientNameMap = {
  'كود كار للسيارات': { ar: 'كود كار', en: 'Code Car' },
  'الكثيري للسيارات': { ar: 'الكثيري للسيارات', en: 'Al Katheeri Cars' },
  'المطيري للسيارات': { ar: 'المطيري للسيارات', en: 'Al Mutairi Cars' },
  'صالح للسيارات': { ar: 'صالح للسيارات', en: 'Saleh Cars' },
  'هامات العقارية': { ar: 'هامات العقارية', en: 'Hamat Real Estate' },
  'مجمع الأسرة الخليجي الطبي': { ar: 'مجمع الأسرة الخليجي الطبي', en: 'Gulf Family Medical Center' },
  'منصة بلاتين': { ar: 'بلاتين', en: 'Platin' },
  'كشفية': { ar: 'كشفية', en: 'Cashfia' },
  'منصور للذبائح': { ar: 'منصور للذبائح', en: 'Mansour Meat' },
  'اسبتالية': { ar: 'اسبتالية', en: 'Espitaliaa' },
  'ظل الجزيرة': { ar: 'ظل الجزيرة', en: 'Thil Aljazeera' },
  'آل ساري للسيارات': { ar: 'آل ساري', en: 'Al Sari' },
  'دورك': { ar: 'دورك', en: 'Dorak' },
  'تفنيد': { ar: 'تفنيد', en: 'Tafneed' },
  'رابل الزراعية': { ar: 'رابل الزراعية', en: 'Rabl Agriculture' },
  'اكسلنس للتدريب': { ar: 'اكسلنس', en: 'Excellence Training' },
  'نادي أبها الرياضي': { ar: 'نادي أبها الرياضي', en: 'Abha Club' },
  'غزال للمواقف': { ar: 'غزال للمواقف', en: 'Ghazal Parking' },
};

export const localizeService = (service, locale) => {
  const key = serviceTitleMap[service.title] || 'websites';
  const base = siteCopy[locale].services.details[key];

  return {
    key,
    title: base?.title || service.title,
    lead: base?.lead || service.description,
    body: base?.body || service.description,
    bullets: base?.bullets || [service.description],
  };
};

export const localizeProject = (project, locale) => {
  const base = projectMeta[project.title]?.[locale];

  return {
    title: base?.title || project.title,
    description: base?.description || project.description,
    caption: base?.caption || project.description,
    accent: projectMeta[project.title]?.accent || 'teal',
  };
};

export const localizeTestimonial = (item, locale) => {
  const base = testimonialMeta[item.name]?.[locale];

  return {
    name: base?.name || item.name,
    role: base?.role || item.role,
  };
};

export const localizeClient = (name, locale) => clientNameMap[name]?.[locale] || name;
