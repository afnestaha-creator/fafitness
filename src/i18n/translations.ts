import { Language } from '../utils/membership';

export interface Translations {
  metaTitle: string;
  nav: {
    home: string;
    facility: string;
    programs: string;
    booking: string;
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
  schedule: {
    eyebrow: string;
    title: string;
    subtitle: string;
    men: {
      badge: string;
      title: string;
      sessions: { label: string; time: string; note: string }[];
      daysNote: string;
    };
    women: {
      badge: string;
      title: string;
      sessionLabel: string;
      time: string;
      sessionNote: string;
      daysLabel: string;
      days: string[];
      daysSummary: string;
    };
    ctaTitle: string;
    ctaSub: string;
    ctaButton: string;
  };
  results: {
    eyebrow: string;
    title: string;
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
    timeLabel: string;
    timeOptions: string[];
    submitCta: string;
    confirmedTag: string;
    confirmedTitlePrefix: string;
    passCodeLabel: string;
    phoneOutLabel: string;
    windowOutLabel: string;
    focusOutLabel: string;
    instructionsStart: string;
    instructionsMid: string;
    instructionsEnd: string;
    callDeskCta: string;
    bookAnotherCta: string;
    addressLabel: string;
  };
  location: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    hoursLabel: string;
    phoneLabel: string;
    directionsBtn: string;
    directionsLoading: string;
    clearRouteBtn: string;
    openInMapsBtn: string;
    routeDistanceLabel: string;
    routeDurationLabel: string;
    loadingMap: string;
    noResultsError: string;
    apiError: string;
    geoDeniedError: string;
    geoUnsupportedError: string;
    routeError: string;
    infoWindowSubtitle: string;
    userMarkerTitle: string;
    homeBannerAction: string;
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
      programs: 'Programme de Travail',
      booking: 'Contacts',
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
        '. Contactez-nous ou visitez notre salle à Jijel pour démarrer votre entraînement dès aujourd’hui.',
      primaryCta: 'Contactez-nous',
      secondaryCta: 'Programme de Travail',
      trust1: 'Horaires Hommes & Femmes',
      trust2: 'Encadrement Coach Hamza',
      imageKicker: 'Salle Principale · Éclairage Hex LED',
      imageCaption:
        'Mur complet d’haltères, machines Pro Muscle et racks sans attente.',
      metrics: [
        { value: '3 700+', label: 'Membres & Abonnés Actifs' },
        { value: '40+', label: 'Postes Pro Muscle & Poulies' },
        { value: '07:00 – 21:00', label: 'Ouvert 7 Jours / 7' },
        { value: '0771 03 91 72', label: 'Ligne Directe Coach' },
      ],
    },
    homeHub: {
      eyebrow: 'Explorer FA FITNESS',
      title: 'Tout ce Dont Vous Avez Besoin Pour Progresser',
      subtitle:
        'Découvrez nos 6 zones d’entraînement, consultez le programme de travail ou contactez-nous directement.',
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
          title: 'Programme de Travail',
          description:
            'Créneaux dédiés Hommes (matin & soir) et créneau réservé Femmes 4 jours par semaine de 13:30 à 16:00.',
          action: 'Voir les horaires',
        },
        {
          page: 'booking',
          index: '03',
          title: 'Contacts & Localisation',
          description:
            'Appelez Coach Hamza, envoyez votre demande ou localisez directement la salle à Jijel sur la carte.',
          action: 'Contactez-nous',
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
      modalCta: 'Contactez-nous',
      bannerTitle: 'Une Question ou Prêt à Vous Inscrire ?',
      bannerSub:
        'Contactez Coach Hamza directement par téléphone ou rendez-vous à l’accueil à Jijel.',
      bannerCta: 'Contactez-nous',
    },
    schedule: {
      eyebrow: 'Programme de Travail · FA FITNESS GYM',
      title: 'Horaires d’Entraînement Hommes & Femmes',
      subtitle:
        'Une organisation quotidienne claire de 07:00 à 21:00 pour permettre à chacun de s’entraîner dans les meilleures conditions.',
      men: {
        badge: 'Accès Hommes',
        title: 'Programme Hommes',
        sessions: [
          {
            label: 'Programme de Matin',
            time: '07:00 – 13:00',
            note: 'Musculation, poids libres et cardio matinal',
          },
          {
            label: 'Programme de Soir',
            time: '16:15 – 21:00',
            note: 'Force, hypertrophie et suivi en salle avec Coach Hamza',
          },
        ],
        daysNote: 'Ouvert tous les jours · 7j/7',
      },
      women: {
        badge: 'Accès Réservé aux Femmes',
        title: 'Programme Femmes',
        sessionLabel: 'Séance Après-Midi Dédiée',
        time: '13:30 – 16:00',
        sessionNote:
          'Salle 100% réservée aux femmes avec accès complet aux équipements et poids libres',
        daysLabel: 'Jours d’Ouverture Femmes',
        days: ['Samedi', 'Mardi', 'Jeudi', 'Vendredi'],
        daysSummary: '4 jours dédiés chaque semaine',
      },
      ctaTitle: 'Besoin d’Informations ou Prêt à Commencer ?',
      ctaSub:
        'Contactez Coach Hamza directement par téléphone ou envoyez votre message depuis la page Contacts.',
      ctaButton: 'Contactez-nous',
    },
    results: {
      eyebrow: 'Résultats Membres',
      title: 'Des Progrès Réels Pour Ceux Qui Passent à l’Action',
    },
    booking: {
      eyebrow: 'Contacts & Localisation',
      title: 'Contactez FA FITNESS GYM',
      subtitle:
        'Une question sur les horaires Hommes/Femmes ou les inscriptions ? Laissez vos coordonnées ou appelez Coach Hamza directement.',
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
      timeLabel: 'Créneau Souhaité',
      timeOptions: [
        'Matin Hommes (07:00 – 13:00)',
        'Femmes — Sam, Mar, Jeu, Ven (13:30 – 16:00)',
        'Soir Hommes (16:15 – 21:00)',
      ],
      submitCta: 'Contactez-nous',
      confirmedTag: 'Demande Enregistrée',
      confirmedTitlePrefix: 'Merci pour votre message,',
      passCodeLabel: 'Référence',
      phoneOutLabel: 'Téléphone',
      windowOutLabel: 'Créneau Choisi',
      focusOutLabel: 'Objectif',
      instructionsStart: 'Conservez la référence',
      instructionsMid: 'ou appelez directement le',
      instructionsEnd: 'pour échanger avec Coach Hamza.',
      callDeskCta: 'Appeler l’Accueil',
      bookAnotherCta: 'Envoyer un Autre Message',
      addressLabel: 'Adresse :',
    },
    location: {
      eyebrow: 'Nous Trouver à Jijel',
      title: 'Localisez FA FITNESS GYM Sur la Carte',
      subtitle:
        'Située Rue Lounis Mustapha à Jijel, la salle est facilement accessible en voiture ou à pied avec stationnement à proximité.',
      addressLabel: 'Adresse Exacte',
      hoursLabel: 'Horaires d’Ouverture',
      phoneLabel: 'Téléphone Accueil',
      directionsBtn: 'Itinéraire depuis ma position',
      directionsLoading: 'Calcul de l’itinéraire...',
      clearRouteBtn: 'Effacer le trajet',
      openInMapsBtn: 'Ouvrir dans Google Maps',
      routeDistanceLabel: 'Distance estimée',
      routeDurationLabel: 'Temps en voiture',
      loadingMap: 'Chargement de la carte interactive...',
      noResultsError:
        'Position exacte introuvable automatiquement pour cette adresse. Ouvrez le repère directement dans Google Maps.',
      apiError:
        'Impossible de charger la carte interactive pour le moment. Utilisez le bouton Google Maps ci-dessous.',
      geoDeniedError:
        'Autorisez la géolocalisation dans votre navigateur pour tracer l’itinéraire depuis votre position.',
      geoUnsupportedError:
        'Votre navigateur ne prend pas en charge la géolocalisation automatique.',
      routeError:
        'Impossible de calculer cet itinéraire pour le moment. Ouvrez le trajet dans Google Maps.',
      infoWindowSubtitle: 'Salle de Musculation & Coaching · Jijel',
      userMarkerTitle: 'Votre position',
      homeBannerAction: 'Voir sur la carte',
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
      programs: 'برنامج العمل',
      booking: 'تواصل معنا',
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
        '. تواصل معنا أو قم بزيارتنا في جيجل لبدء تدريباتك وتحقيق أهدافك.',
      primaryCta: 'تواصل معنا',
      secondaryCta: 'برنامج العمل',
      trust1: 'أوقات مخصصة للرجال والنساء',
      trust2: 'متابعة الكوتش حمزة',
      imageKicker: 'القاعة الرئيسية · إضاءة Hex LED',
      imageCaption:
        'جدار متكامل للأوزان الحرة، أجهزة برو مصل، وبارات بدون انتظار.',
      metrics: [
        { value: '+3,700', label: 'متابع وعضو في مجتمعنا' },
        { value: '+40', label: 'جهاز برو مصل وكوابل' },
        { value: '07:00 – 21:00', label: 'مفتوح 7 أيام في الأسبوع' },
        { value: '0771 03 91 72', label: 'الخط المباشر للكوتش' },
      ],
    },
    homeHub: {
      eyebrow: 'استكشف قاعة FA FITNESS',
      title: 'كل ما تحتاجه للوصول إلى أفضل نسخة منك',
      subtitle:
        'تعرّف على مناطق التدريب الست، اطّلع على برنامج العمل، أو تواصل معنا مباشرة.',
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
          title: 'برنامج العمل',
          description:
            'حصص الرجال صباحاً ومساءً، وفترة مخصصة للنساء أيام السبت، الثلاثاء، الخميس والجمعة من 13:30 إلى 16:00.',
          action: 'عرض برنامج العمل',
        },
        {
          page: 'booking',
          index: '03',
          title: 'تواصل معنا والموقع',
          description:
            'اتصل بالكوتش حمزة، أرسل طلبك، أو حدد موقع القاعة في جيجل بسهولة على الخريطة.',
          action: 'تواصل معنا',
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
      modalCta: 'تواصل معنا',
      bannerTitle: 'هل لديك استفسار أو ترغب في التسجيل؟',
      bannerSub:
        'تواصل مع الكوتش حمزة مباشرة عبر الهاتف أو قم بزيارتنا في القاعة بمدينة جيجل.',
      bannerCta: 'تواصل معنا',
    },
    schedule: {
      eyebrow: 'برنامج العمل · FA FITNESS GYM',
      title: 'أوقات التدريب للرجال والنساء',
      subtitle:
        'تنظيم يومي واضح للقاعة من 07:00 إلى 21:00 لضمان أفضل ظروف التدريب والخصوصية للجميع.',
      men: {
        badge: 'حصة الرجال',
        title: 'برنامج الرجال',
        sessions: [
          {
            label: 'برنامج الصباح',
            time: '07:00 – 13:00',
            note: 'كمال الأجسام، الأوزان الحرة والكارديو الصباحي',
          },
          {
            label: 'برنامج المساء',
            time: '16:15 – 21:00',
            note: 'القوة، التضخيم العضلي ومتابعة الكوتش حمزة',
          },
        ],
        daysNote: 'مفتوح طوال أيام الأسبوع · 7/7',
      },
      women: {
        badge: 'فترة خاصة بالنساء',
        title: 'برنامج النساء',
        sessionLabel: 'الحصة المخصصة للنساء',
        time: '13:30 – 16:00',
        sessionNote:
          'قاعة مخصصة بالكامل للنساء مع جميع أجهزة التمرين والأوزان الحرة',
        daysLabel: 'أيام التدريب للنساء',
        days: ['السبت', 'الثلاثاء', 'الخميس', 'الجمعة'],
        daysSummary: '4 أيام مخصصة أسبوعياً',
      },
      ctaTitle: 'هل لديك استفسار أو ترغب في الانضمام؟',
      ctaSub:
        'تواصل معنا مباشرة عبر الهاتف أو أرسل استفسارك من صفحة التواصل.',
      ctaButton: 'تواصل معنا',
    },
    results: {
      eyebrow: 'نتائج أعضائنا',
      title: 'تطور حقيقي لأعضاء التزموا بالخطة الصحيحة',
    },
    booking: {
      eyebrow: 'تواصل معنا والموقع',
      title: 'تواصل مع قاعة FA FITNESS GYM',
      subtitle:
        'هل لديك استفسار حول برنامج العمل للرجال والنساء أو التسجيل؟ أرسل بياناتك أو اتصل مباشرة بالكوتش حمزة.',
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
      timeLabel: 'الفترة المفضلة للتدريب',
      timeOptions: [
        'برنامج الصباح للرجال (07:00 – 13:00)',
        'برنامج النساء — السبت، الثلاثاء، الخميس، الجمعة (13:30 – 16:00)',
        'برنامج المساء للرجال (16:15 – 21:00)',
      ],
      submitCta: 'تواصل معنا',
      confirmedTag: 'تم استلام طلب التواصل',
      confirmedTitlePrefix: 'شكراً لتواصلك معنا،',
      passCodeLabel: 'رقم المرجع',
      phoneOutLabel: 'رقم الهاتف',
      windowOutLabel: 'الفترة المختارة',
      focusOutLabel: 'الهدف',
      instructionsStart: 'احتفظ بالمرجع',
      instructionsMid: 'أو اتصل مباشرة على الرقم',
      instructionsEnd: 'للتحدث مع الكوتش حمزة في أي وقت.',
      callDeskCta: 'اتصل بالاستقبال الآن',
      bookAnotherCta: 'إرسال طلب آخر',
      addressLabel: 'العنوان:',
    },
    location: {
      eyebrow: 'موقعنا في جيجل',
      title: 'اعثر على قاعة FA FITNESS GYM بسهولة',
      subtitle:
        'تقع القاعة في شارع لونيس مصطفى بمدينة جيجل مع سهولة الوصول بالسيارة أو سيراً على الأقدام.',
      addressLabel: 'العنوان الدقيق',
      hoursLabel: 'أوقات العمل',
      phoneLabel: 'هاتف الاستقبال',
      directionsBtn: 'الاتجاهات من موقعي',
      directionsLoading: 'جاري حساب المسار...',
      clearRouteBtn: 'إخفاء المسار',
      openInMapsBtn: 'افتح في خرائط جوجل',
      routeDistanceLabel: 'المسافة المقدرة',
      routeDurationLabel: 'المدة بالسيارة',
      loadingMap: 'جاري تحميل الخريطة التفاعلية...',
      noResultsError:
        'تعذر تحديد الإحداثيات تلقائياً. يمكنك فتح الموقع مباشرة عبر زر خرائط جوجل أدناه.',
      apiError:
        'تعذر تحميل الخريطة التفاعلية حالياً. استخدم رابط خرائط جوجل المباشر أدناه.',
      geoDeniedError:
        'يرجى تفعيل صلاحية الموقع في متصفحك لحساب المسار من مكانك الحالي.',
      geoUnsupportedError:
        'متصفحك لا يدعم تحديد الموقع الجغرافي التلقائي.',
      routeError:
        'تعذر حساب المسار الآن. يمكنك فتح الاتجاهات مباشرة في خرائط جوجل.',
      infoWindowSubtitle: 'قاعة كمال الأجسام والتدريب · جيجل',
      userMarkerTitle: 'موقعك الحالي',
      homeBannerAction: 'عرض على الخريطة',
    },
    footer: {
      rights: 'FA FITNESS GYM — رياضة · صحة · لياقة للجميع',
    },
  },
};
