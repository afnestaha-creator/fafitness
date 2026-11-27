import { Language } from '../utils/membership';

export interface Translations {
  metaTitle: string;
  nav: {
    home: string;
    facility: string;
    programs: string;
    booking: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  langSwitcher: {
    label: string;
    fr: string;
    ar: string;
  };
  hero: {
    kicker: string;
    headlinePrefix: string;
    headlineAccent: string;
    headlineSuffix: string;
    subheadlinePrefix: string;
    coachName: string;
    subheadlineSuffix: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    imageKicker: string;
    imageCaption: string;
    metrics: { value: string; label: string }[];
  };
  homeHub: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: {
      page: 'facility' | 'programs' | 'booking';
      index: string;
      title: string;
      description: string;
      action: string;
    }[];
  };
  facility: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filters: { id: 'all' | 'weights' | 'machines' | 'lower'; label: string }[];
    inspectPrefix: string;
    close: string;
    modalCta: string;
    bannerTitle: string;
    bannerSub: string;
    bannerCta: string;
  };
  planner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    goals: { id: 'muscle' | 'fat-loss' | 'strength' | 'beginner'; label: string }[];
    daysSuffix: string;
    coaching: { id: 'self' | 'guided' | 'vip'; label: string }[];
    recommendedPrefix: string;
    floorZoneLabel: string;
    milestoneLabel: string;
    applyCta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cycles: { id: 'monthly' | 'quarterly' | 'annual'; label: string }[];
    perMonth: string;
    billedLabels: { monthly: string; quarterly: string; annual: string };
    saveWord: string;
  };
  results: {
    eyebrow: string;
    title: string;
    stepsHeading: string;
    steps: { step: string; title: string; detail: string }[];
  };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directPhoneLabel: string;
    socialLabel: string;
    hoursLabel: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    goalLabel: string;
    goalOptions: { id: 'muscle' | 'fat-loss' | 'strength' | 'beginner'; label: string }[];
    tierLabel: string;
    timeLabel: string;
    timeOptions: string[];
    submitCta: string;
    confirmedTag: string;
    confirmedTitlePrefix: string;
    passCodeLabel: string;
    phoneOutLabel: string;
    windowOutLabel: string;
    focusOutLabel: string;
    tierOutLabel: string;
    instructionsStart: string;
    instructionsMid: string;
    instructionsEnd: string;
    callDeskCta: string;
    bookAnotherCta: string;
  };
  footer: {
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    metaTitle: 'FA FITNESS GYM — Musculation, Cardio & Coaching',
    nav: {
      home: 'Accueil',
      facility: 'Équipements',
      programs: 'Programmes & Tarifs',
      booking: 'Pass Gratuit',
      cta: 'Essai 3 Jours',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },
    langSwitcher: {
      label: 'Langue',
      fr: 'Français',
      ar: 'العربية',
    },
    hero: {
      kicker: 'FA FITNESS GYM · Sport · Santé · Bien-être',
      headlinePrefix: 'Construisez une Vraie Force Sous du Matériel ',
      headlineAccent: 'Pro-Grade',
      headlineSuffix: '.',
      subheadlinePrefix:
        'Entraînez-vous dans une salle propre, spacieuse et conçue pour l’hypertrophie, le conditionnement physique et la maîtrise technique avec ',
      coachName: 'Coach Hamza',
      subheadlineSuffix:
        '. Testez la salle gratuitement pendant 3 jours complets avant de vous abonner.',
      primaryCta: 'Réserver Mon Pass 3 Jours',
      secondaryCta: 'Voir Programmes & Tarifs',
      trust1: 'Sans engagement',
      trust2: 'Bilan technique offert',
      imageKicker: 'Salle Principale · Éclairage Hex LED',
      imageCaption:
        'Mur complet d’haltères, machines Pro Muscle et racks sans attente.',
      metrics: [
        { value: '3 700+', label: 'Membres & Abonnés Actifs' },
        { value: '40+', label: 'Postes Pro Muscle & Poulies' },
        { value: '06:00 – 23:00', label: 'Ouvert 7 Jours / 7' },
        { value: '0771 03 91 72', label: 'Ligne Directe Coach' },
      ],
    },
    homeHub: {
      eyebrow: 'Explorer FA FITNESS',
      title: 'Tout ce Dont Vous Avez Besoin Pour Progresser',
      subtitle:
        'Découvrez nos 6 zones d’entraînement, configurez votre programme sur mesure ou réservez immédiatement votre essai gratuit.',
      cards: [
        {
          page: 'facility',
          index: '01',
          title: 'Visiter les 6 Zones',
          description:
            'Haltères jusqu’à 50 kg, poulies doubles, machines Pro Muscle et racks olympiques sous éclairage Hex LED.',
          action: 'Voir la salle en détail',
        },
        {
          page: 'programs',
          index: '02',
          title: 'Programmes & Tarifs',
          description:
            'Planificateur sur 90 jours selon votre objectif et abonnements transparents sans frais cachés.',
          action: 'Choisir mon programme',
        },
        {
          page: 'booking',
          index: '03',
          title: 'Pass Découverte 3 Jours',
          description:
            'Obtenez votre code d’accès immédiat en 30 secondes et venez tester la salle avec Coach Hamza.',
          action: 'Activer mon pass gratuit',
        },
      ],
    },
    facility: {
      eyebrow: 'Dans les Coulisses de FA FITNESS GYM',
      title: 'Six Zones Spécialisées Conçues Pour la Performance',
      subtitle:
        'Chaque mètre carré est entretenu chaque jour : dalles amortissantes, disques calibrés, doubles poulies et espace dégagé entre les postes.',
      filters: [
        { id: 'all', label: 'Toutes les zones' },
        { id: 'weights', label: 'Poids libres' },
        { id: 'machines', label: 'Poulies & Pro Muscle' },
        { id: 'lower', label: 'Jambes & Cardio' },
      ],
      inspectPrefix: 'Inspecter',
      close: 'Fermer',
      modalCta: 'Essayer cette zone (3 jours gratuits)',
      bannerTitle: 'Prêt à Tester les Machines en Personne ?',
      bannerSub:
        'Réservez 3 jours d’accès complet et profitez d’une prise en main de 10 minutes avec Coach Hamza.',
      bannerCta: 'Réserver Mon Essai Gratuit',
    },
    planner: {
      eyebrow: 'Plan d’Action 90 Jours',
      title: 'Construisez Votre Programme Avant le Jour 1',
      subtitle:
        'Indiquez votre objectif et votre rythme hebdomadaire : nous préparons la répartition exacte et les zones de travail pour votre essai de 3 jours.',
      step1: '01. Objectif Principal',
      step2: '02. Fréquence Hebdomadaire',
      step3: '03. Niveau d’Accompagnement',
      goals: [
        { id: 'muscle', label: 'Prise de Masse' },
        { id: 'fat-loss', label: 'Sèche & Tonus' },
        { id: 'strength', label: 'Force Pure' },
        { id: 'beginner', label: 'Débutant Guidé' },
      ],
      daysSuffix: 'Jours / Sem.',
      coaching: [
        { id: 'self', label: 'Autonome' },
        { id: 'guided', label: 'Suivi Coach' },
        { id: 'vip', label: 'VIP 1-on-1' },
      ],
      recommendedPrefix: 'Formule Recommandée',
      floorZoneLabel: 'Zone Principale',
      milestoneLabel: 'Objectif 90 Jours',
      applyCta: 'Démarrer ce Programme (3 Jours Gratuits)',
    },
    pricing: {
      eyebrow: 'Tarifs Transparents',
      title: 'Des Formules Claires. Zéro Frais Cachés.',
      subtitle:
        'Chaque abonnement commence par 3 jours d’essai offerts afin que vous ne vous engagiez qu’après avoir testé la salle.',
      cycles: [
        { id: 'monthly', label: 'Mensuel' },
        { id: 'quarterly', label: 'Trimestriel · -15%' },
        { id: 'annual', label: 'Annuel · -25%' },
      ],
      perMonth: '/ mois',
      billedLabels: {
        monthly: 'Facturation mensuelle',
        quarterly: 'Facturé tous les 3 mois',
        annual: 'Facturé annuellement',
      },
      saveWord: 'Économisez',
    },
    results: {
      eyebrow: 'Résultats Membres',
      title: 'Des Progrès Réels Pour Ceux Qui Passent à l’Action',
      stepsHeading: 'Comment Fonctionne Votre Pass 3 Jours Gratuits',
      steps: [
        {
          step: '01',
          title: 'Réservez en 30 Secondes',
          detail:
            'Indiquez votre nom, numéro et créneau horaire préféré — aucune carte bancaire requise.',
        },
        {
          step: '02',
          title: 'Accueil Avec Coach Hamza',
          detail:
            'Présentez votre code à l’accueil et bénéficiez d’un tour guidé de 10 minutes sur les machines.',
        },
        {
          step: '03',
          title: 'Entraînez-Vous 3 Jours Sans Risque',
          detail:
            'Testez les poids libres, poulies et horaires de pointe pendant 3 jours avant de choisir votre formule.',
        },
      ],
    },
    booking: {
      eyebrow: 'Accès Découverte 3 Jours Offerts',
      title: 'Réservez Votre Pass Gratuit Aujourd’hui',
      subtitle:
        'Bloquez 3 jours consécutifs d’accès complet ainsi qu’une séance d’orientation avec Coach Hamza. Zéro obligation d’inscription.',
      directPhoneLabel: 'Téléphone Direct :',
      socialLabel: 'Compte Officiel :',
      hoursLabel: 'Horaires :',
      fullNameLabel: 'Nom Complet',
      fullNamePlaceholder: 'ex. Karim Benali',
      phoneLabel: 'Numéro de Téléphone',
      phonePlaceholder: 'ex. 0771 03 91 72',
      goalLabel: 'Objectif d’Entraînement',
      goalOptions: [
        { id: 'muscle', label: 'Prise de Masse & Hypertrophie' },
        { id: 'fat-loss', label: 'Perte de Poids & Conditionnement' },
        { id: 'strength', label: 'Force & Barres Olympiques' },
        { id: 'beginner', label: 'Remise en Forme Débutant' },
      ],
      tierLabel: 'Formule Souhaitée',
      timeLabel: 'Créneau Préféré Pour la 1ère Visite',
      timeOptions: [
        'Matin (06:00 – 11:00)',
        'Après-midi (11:00 – 16:00)',
        'Soirée (16:00 – 21:00)',
        'Nocturne (21:00 – 23:00)',
      ],
      submitCta: 'Activer Mon Pass 3 Jours Gratuits',
      confirmedTag: 'Pass 3 Jours Réservé',
      confirmedTitlePrefix: 'Bienvenue chez FA FITNESS,',
      passCodeLabel: 'Code Pass',
      phoneOutLabel: 'Téléphone',
      windowOutLabel: 'Créneau Choisi',
      focusOutLabel: 'Objectif',
      tierOutLabel: 'Formule Visée',
      instructionsStart: 'Présentez le code',
      instructionsMid: 'à l’accueil ou appelez le',
      instructionsEnd: 'si vous souhaitez que Coach Hamza vous attende à votre arrivée.',
      callDeskCta: 'Appeler l’Accueil',
      bookAnotherCta: 'Réserver un Autre Pass',
    },
    footer: {
      rights: 'FA FITNESS GYM — Sport · Santé · Bien-être · Pour Tous',
    },
  },
  ar: {
    metaTitle: 'FA FITNESS GYM — كمال الأجسام، الكارديو والتدريب الشخصي',
    nav: {
      home: 'الرئيسية',
      facility: 'القاعة',
      programs: 'البرامج والأسعار',
      booking: 'تجربة مجانية',
      cta: 'احجز 3 أيام مجاناً',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    langSwitcher: {
      label: 'اللغة',
      fr: 'Français',
      ar: 'العربية',
    },
    hero: {
      kicker: 'FA FITNESS GYM · رياضة · صحة · لياقة للجميع',
      headlinePrefix: 'ابنِ قوة حقيقية بأحدث معدات ',
      headlineAccent: 'برو مصل',
      headlineSuffix: '.',
      subheadlinePrefix:
        'تدرّب في قاعة نظيفة ومنظمة ومصممة لتضخيم العضلات، اللياقة البدنية، وإتقان التمارين مع ',
      coachName: 'الكوتش حمزة',
      subheadlineSuffix:
        '. جرّب القاعة مجاناً لمدة 3 أيام كاملة قبل اختيار أي اشتراك.',
      primaryCta: 'احجز 3 أيام مجانية الآن',
      secondaryCta: 'اكتشف البرامج والأسعار',
      trust1: 'بدون التزام مسبق',
      trust2: 'تقييم أولي مجاني',
      imageKicker: 'القاعة الرئيسية · إضاءة Hex LED',
      imageCaption:
        'جدار متكامل للأوزان الحرة، أجهزة برو مصل، وبارات بدون انتظار.',
      metrics: [
        { value: '+3,700', label: 'متابع وعضو في مجتمعنا' },
        { value: '+40', label: 'جهاز برو مصل وكوابل' },
        { value: '06:00 – 23:00', label: 'مفتوح 7 أيام في الأسبوع' },
        { value: '0771 03 91 72', label: 'الخط المباشر للكوتش' },
      ],
    },
    homeHub: {
      eyebrow: 'استكشف قاعة FA FITNESS',
      title: 'كل ما تحتاجه للوصول إلى أفضل نسخة منك',
      subtitle:
        'تعرّف على مناطق التدريب الست، صمّم برنامجك الأسبوعي خلال ثوانٍ، أو احجز بطاقة التجربة المجانية فوراً.',
      cards: [
        {
          page: 'facility',
          index: '01',
          title: 'جولة في 6 مناطق تدريب',
          description:
            'دمبلز حتى 50 كغ، كوابل مزدوجة، أجهزة برو مصل وبارات أولمبية تحت إضاءة احترافية.',
          action: 'تصفح القاعة والمعدات',
        },
        {
          page: 'programs',
          index: '02',
          title: 'البرامج والاشتراكات',
          description:
            'مولّد برنامج تدريبي لـ 90 يوماً حسب هدفك مع باقات واضحة بدون أي رسوم خفية.',
          action: 'صمّم برنامجك والأسعار',
        },
        {
          page: 'booking',
          index: '03',
          title: 'تذكرة تجربة 3 أيام مجاناً',
          description:
            'احصل على رمز الدخول الفوري في 30 ثانية وجرّب القاعة بإشراف الكوتش حمزة.',
          action: 'احجز تذكرتك المجانية',
        },
      ],
    },
    facility: {
      eyebrow: 'داخل قاعة FA FITNESS GYM',
      title: 'ست مناطق متخصصة مصممة للتطور المستمر',
      subtitle:
        'نهتم بكل تفصيل يومياً: أرضيات مطاطية عالية التحمل، أوزان معايرة بدقة، أجهزة كوابل مزدوجة ومساحات واسعة بين الآلات.',
      filters: [
        { id: 'all', label: 'جميع المناطق' },
        { id: 'weights', label: 'أوزان حرة' },
        { id: 'machines', label: 'آلات وكوابل' },
        { id: 'lower', label: 'أرجل ولياقة' },
      ],
      inspectPrefix: 'معاينة',
      close: 'إغلاق',
      modalCta: 'جرّب هذه المنطقة (3 أيام مجاناً)',
      bannerTitle: 'مستعد لتجربة القاعة على أرض الواقع؟',
      bannerSub:
        'احجز 3 أيام دخول كامل مجاناً مع جولة توجيهية سريعة لمدة 10 دقائق رفقة الكوتش حمزة.',
      bannerCta: 'احجز تجربتي المجانية',
    },
    planner: {
      eyebrow: 'خطة 90 يوماً المخصصة',
      title: 'اضبط جدولك الأسبوعي قبل يومك الأول',
      subtitle:
        'اختر هدفك وعدد أيام تدريبك في الأسبوع لنجهز لك التقسيم الأمثل والمنطقة الأنسب خلال فترة التجربة المجانية.',
      step1: '01. الهدف الأساسي',
      step2: '02. أيام التدريب أسبوعياً',
      step3: '03. مستوى المرافقة',
      goals: [
        { id: 'muscle', label: 'تضخيم عضلي' },
        { id: 'fat-loss', label: 'تنشيف وحرق دهون' },
        { id: 'strength', label: 'قوة بدنية' },
        { id: 'beginner', label: 'تأسيس للمبتدئين' },
      ],
      daysSuffix: 'أيام / أسبوع',
      coaching: [
        { id: 'self', label: 'تدريب حر' },
        { id: 'guided', label: 'متابعة كوتش' },
        { id: 'vip', label: 'خاص VIP' },
      ],
      recommendedPrefix: 'الباقة المقترحة',
      floorZoneLabel: 'المنطقة الأساسية',
      milestoneLabel: 'النتيجة المتوقعة (90 يوماً)',
      applyCta: 'ابدأ هذا البرنامج (3 أيام مجاناً)',
    },
    pricing: {
      eyebrow: 'باقات واضحة وشفافة',
      title: 'أسعار بسيطة بدون أي رسوم تسجيل خفية',
      subtitle:
        'كل باقة تبدأ بـ 3 أيام تجربة مجانية في القاعة حتى تقرر بعد تجربة المعدات بنفسك.',
      cycles: [
        { id: 'monthly', label: 'شهري' },
        { id: 'quarterly', label: 'ربع سنوي · وفر 15%' },
        { id: 'annual', label: 'سنوي · وفر 25%' },
      ],
      perMonth: '/ شهر',
      billedLabels: {
        monthly: 'دفع شهري مرن',
        quarterly: 'دفع كل 3 أشهر',
        annual: 'دفع سنوي',
      },
      saveWord: 'وفّر',
    },
    results: {
      eyebrow: 'نتائج أعضائنا',
      title: 'تطور حقيقي لأعضاء التزموا بالخطة الصحيحة',
      stepsHeading: 'كيف تستفيد من تجربة الـ 3 أيام المجانية',
      steps: [
        {
          step: '01',
          title: 'احجز في 30 ثانية',
          detail:
            'أدخل اسمك ورقم هاتفك والفترة المناسبة لك دون الحاجة لأي دفع مسبق.',
        },
        {
          step: '02',
          title: 'استقبال مع الكوتش حمزة',
          detail:
            'أظهر رمز التذكرة في الاستقبال واحصل على شرح عملي للآلات والوضعيات الصحيحة.',
        },
        {
          step: '03',
          title: 'تدرّب 3 أيام مجاناً بالكامل',
          detail:
            'اختبر الأوزان الحرة وأجهزة الكوابل في أوقاتك المفضلة قبل اختيار اشتراكك.',
        },
      ],
    },
    booking: {
      eyebrow: 'دعوة تجربة 3 أيام مجانية',
      title: 'احجز بطاقة التجربة المجانية اليوم',
      subtitle:
        'اضمن 3 أيام متتالية من الدخول الكامل للقاعة مع جلسة توجيه فردية مع الكوتش حمزة. بدون أي التزام.',
      directPhoneLabel: 'الهاتف المباشر:',
      socialLabel: 'الحساب الرسمي:',
      hoursLabel: 'أوقات العمل:',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: كريم بن علي',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: 'مثال: 0771 03 91 72',
      goalLabel: 'الهدف التدريبي',
      goalOptions: [
        { id: 'muscle', label: 'تضخيم وبناء العضلات' },
        { id: 'fat-loss', label: 'حرق الدهون واللياقة' },
        { id: 'strength', label: 'القوة البدنية والأوزان الحرة' },
        { id: 'beginner', label: 'برنامج تأسيسي للمبتدئين' },
      ],
      tierLabel: 'الاشتراك المهتم به',
      timeLabel: 'الوقت المفضل لأول زيارة',
      timeOptions: [
        'الصباح (06:00 – 11:00)',
        'الظهيرة (11:00 – 16:00)',
        'المساء (16:00 – 21:00)',
        'الليل (21:00 – 23:00)',
      ],
      submitCta: 'تفعيل بطاقة 3 أيام مجانية',
      confirmedTag: 'تم حجز بطاقة 3 أيام مجاناً',
      confirmedTitlePrefix: 'مرحباً بك في FA FITNESS،',
      passCodeLabel: 'رمز التذكرة',
      phoneOutLabel: 'رقم الهاتف',
      windowOutLabel: 'الفترة المختارة',
      focusOutLabel: 'الهدف',
      tierOutLabel: 'الباقة المقترحة',
      instructionsStart: 'أظهر الرمز',
      instructionsMid: 'عند الاستقبال أو اتصل على',
      instructionsEnd: 'إذا كنت تريد أن يكون الكوتش حمزة في انتظارك عند وصولك.',
      callDeskCta: 'اتصل بالاستقبال الآن',
      bookAnotherCta: 'حجز تذكرة أخرى',
    },
    footer: {
      rights: 'FA FITNESS GYM — رياضة · صحة · لياقة للجميع',
    },
  },
};
