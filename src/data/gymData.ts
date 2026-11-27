import { Language } from '../utils/membership';

export type ZoneCategory = 'weights' | 'machines' | 'lower';

export interface FacilityZone {
  id: string;
  index: string;
  category: ZoneCategory;
  image: string;
  fr: {
    title: string;
    subtitle: string;
    alt: string;
    description: string;
    specs: string[];
  };
  ar: {
    title: string;
    subtitle: string;
    alt: string;
    description: string;
    specs: string[];
  };
}

export interface TransformationStory {
  id: string;
  fr: {
    name: string;
    program: string;
    timeframe: string;
    outcomeMetric: string;
    quote: string;
  };
  ar: {
    name: string;
    program: string;
    timeframe: string;
    outcomeMetric: string;
    quote: string;
  };
}

export const GYM_CONTACT = {
  brand: 'FA FITNESS',
  handle: 'fafitness.gym',
  phoneDisplay: '0771 03 91 72',
  phoneHref: 'tel:+213771039172',
  hours: {
    fr: '06:00 – 23:00 · Ouvert 7j/7',
    ar: '06:00 – 23:00 · مفتوح 7 أيام/الأسبوع',
  },
};

export const HERO_FACILITY_IMAGE = {
  src: '/assets/aistudio/oo_0060cc98.jpg',
  alt: {
    fr: 'Mur d’haltères principal de FA FITNESS GYM sous éclairage LED hexagonal',
    ar: 'القاعة الرئيسية في FA FITNESS GYM مع جدار الأوزان وإضاءة LED السداسية',
  },
};

export const FACILITY_ZONES: FacilityZone[] = [
  {
    id: 'free-weights',
    index: '01',
    category: 'weights',
    image: '/assets/aistudio/oo_0060cc98.jpg',
    fr: {
      title: 'Mur d’Haltères & Bancs Hex LED',
      subtitle: 'Poids Libres · 2,5 kg à 50 kg',
      alt: 'Enseigne FA FITNESS GYM au-dessus des râteliers d’haltères et bancs réglables',
      description:
        'Double rangée d’haltères noirs et rouges sur bancs plats et inclinables professionnels sous éclairage LED hexagonal anti-éblouissement.',
      specs: ['Gamme complète 2,5–50 kg', 'Bancs robustes réglables', 'Miroirs pleine hauteur'],
    },
    ar: {
      title: 'جدار الدمبلز والمقاعد تحت إضاءة LED',
      subtitle: 'أوزان حرة · من 2.5 إلى 50 كغ',
      alt: 'شعار FA FITNESS GYM فوق صفوف الدمبلز والمقاعد القابلة للتعديل',
      description:
        'صفان متكاملان من الدمبلز السوداء والحمراء مع مقاعد احترافية مسطحة ومائلة تحت إضاءة سداسية مريحة للعين.',
      specs: ['تدرج كامل 2.5–50 كغ', 'مقاعد احترافية ثابتة', 'مرايا بطول الجدار للتصحيح'],
    },
  },
  {
    id: 'cable-rig',
    index: '02',
    category: 'machines',
    image: '/assets/aistudio/photo_2026-11-27_21-46-01_ec2da6ad.jpg',
    fr: {
      title: 'Poulies Doubles & Station Fonctionnelle',
      subtitle: 'Hypertrophie · Biomécanique',
      alt: 'Station de poulies doubles vis-à-vis et appareils vert fluo chez FA FITNESS',
      description:
        'Double tour de poulies fluides reliées par une barre de traction multi-prises et des planches anatomiques pour isoler chaque fibre.',
      specs: ['Colonnes doubles 100 kg', 'Tractions multi-prises', 'Poignées & sangles incluses'],
    },
    ar: {
      title: 'منطقة الكوابل المزدوجة والتمارين الوظيفية',
      subtitle: 'تضخيم وعزل عضلي · دقة حركية',
      alt: 'أجهزة الكوابل المزدوجة ومعدات اللياقة ذات اللون الأخضر في FA FITNESS',
      description:
        'برجا كوابل سلسا الحركة مع جسر عقلة متعدد القبضات ولوحات تشريحية لضبط زاوية الشد العضلي بدقة.',
      specs: ['أبراج مزدوجة 100 كغ', 'جسر عقلة متعدد القبضات', 'ملحقات سحب وحبال كاملة'],
    },
  },
  {
    id: 'pro-muscle',
    index: '03',
    category: 'machines',
    image: '/assets/aistudio/photo_2026-11-27_21-46-02_2a57748d.jpg',
    fr: {
      title: 'Espace Machines Convergentes Pro Muscle',
      subtitle: 'Force · Charges Libres Guidées',
      alt: 'Mur Pro Muscle et machines à charges libres chez FA FITNESS GYM',
      description:
        'Zone dédiée Pro Muscle conçue pour la surcharge progressive avec presses convergentes, tirages dorsaux et disques olympiques.',
      specs: ['Leviers convergents fluides', 'Disques olympiques calibrés', 'Sol caoutchouc haute densité'],
    },
    ar: {
      title: 'صالة أجهزة برو مصل الاحترافية',
      subtitle: 'قوة عضلية · أوزان موجهة ثقيلة',
      alt: 'جدار برو مصل وأجهزة تحميل الأوزان الحرة في FA FITNESS GYM',
      description:
        'منطقة مخصصة للتحميل التدريجي الآمن بآلات دفع وسحب ذات مسارات حركية طبيعية وأقراص أولمبية ثقيلة.',
      specs: ['مسارات دفع متقاربة دقيقة', 'أقراص أولمبية معايرة', 'أرضيات مطاطية عالية الكثافة'],
    },
  },
  {
    id: 'barbell-rack',
    index: '04',
    category: 'weights',
    image: '/assets/aistudio/ss_60dcdf7a.jpg',
    fr: {
      title: 'Racks de Barres Droites & Barres EZ',
      subtitle: 'Bras · Épaules · Haut du Corps',
      alt: 'Râtelier de barres droites et barres EZ préchargées chez FA FITNESS',
      description:
        'Barres droites et EZ préchargées de 10 kg à 30+ kg pour enchaîner vos séries sans perdre de temps à charger des disques.',
      specs: ['Barres fixes 10–30+ kg', 'Grip chromé antidérapant', 'Transitions ultra rapides'],
    },
    ar: {
      title: 'حوامل البارات المستقيمة والبارات المعقوفة EZ',
      subtitle: 'ذراعان · أكتاف · جزء علوي',
      alt: 'رفوف البارات الجاهزة المستقيمة والمعقوفة في قاعة FA FITNESS',
      description:
        'بارات جاهزة بالأوزان من 10 كغ إلى أكثر من 30 كغ لإنهاء تمارين الذراعين والأكتاف بسرعة ودون انتظار.',
      specs: ['بارات جاهزة 10–30+ كغ', 'قبضة كروم مضادة للانزلاق', 'تبديل فوري بين المجموعات'],
    },
  },
  {
    id: 'lower-body',
    index: '05',
    category: 'lower',
    image: '/assets/aistudio/photo_2026-11-27_21-46-02__2__ed5cf5f5.jpg',
    fr: {
      title: 'Station Squat, Smith & Fessiers',
      subtitle: 'Bas du Corps · Puissance & Stabilité',
      alt: 'Cadre guidé Smith et machines jambes et fessiers sous éclairage Hex LED',
      description:
        'Cadre guidé Smith contrebalancé, postes hip-thrust et machines à levier pour développer quadriceps et fessiers en toute sécurité.',
      specs: ['Cadre Smith contrebalancé', 'Poste hip-thrust dédié', 'Disques bumper calibrés'],
    },
    ar: {
      title: 'قسم السكوات وجهاز سميث والأرداف',
      subtitle: 'الجزء السفلي · قوة وثبات',
      alt: 'جهاز سميث ومعدات تقوية الأرجل والأرداف تحت الإضاءة السداسية',
      description:
        'جهاز سميث متوازن وأجهزة تقوية الأرجل والأرداف مصممة لتحميل العضلات السفلية بأمان واستقرار تام.',
      specs: ['جهاز سميث متوازن', 'محطة متخصصة للأرداف', 'أقراص حماية مطاطية'],
    },
  },
  {
    id: 'sunlit-floor',
    index: '06',
    category: 'lower',
    image: '/assets/aistudio/t_bdc7a898.jpg',
    fr: {
      title: 'Plateau Olympique & Conditionnement',
      subtitle: 'Conditionnement · Lumière Naturelle',
      alt: 'Lumière du jour sur le plateau d’entraînement FA FITNESS avec disques rouges',
      description:
        'Dalles amortissantes haute résistance, large espacement entre les postes et ventilation optimale même aux heures de pointe.',
      specs: ['Dalles anti-chocs', 'Allées larges dégagées', 'Aération et climatisation'],
    },
    ar: {
      title: 'منصة الأوزان الأولمبية واللياقة البدنية',
      subtitle: 'لياقة بدنية · إضاءة طبيعية وتهوية',
      alt: 'أشعة الشمس على أرضية FA FITNESS مع الأقراص الحمراء وحوامل البارات',
      description:
        'مساحات مفتوحة وأرضيات ماصة للصدمات مع تهوية ممتازة تضمن راحة التمرين حتى في أوقات الذروة.',
      specs: ['أرضيات ماصة للصدمات', 'مسافات مريحة بين الأجهزة', 'تهوية وتكييف مستمر'],
    },
  },
];

export const TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 'yassine',
    fr: {
      name: 'Yassine M.',
      program: 'Pro Muscle + Suivi',
      timeframe: '16 Semaines',
      outcomeMetric: '+6,2 kg masse sèche · Développé 60 → 95 kg',
      quote:
        'Avant FA FITNESS, je changeais de salle sans méthode. Coach Hamza a corrigé ma technique dès la première semaine et les barres préchargées me permettent de boucler ma séance en 55 minutes.',
    },
    ar: {
      name: 'ياسين م.',
      program: 'برو مصل + متابعة',
      timeframe: '16 أسبوعاً',
      outcomeMetric: '+6.2 كغ كتلة عضلية · بنش 60 ← 95 كغ',
      quote:
        'قبل التحاقي بـ FA FITNESS كنت أتدرب بدون خطة واضحة. صحّح لي الكوتش حمزة وضعيات التمرين من الأسبوع الأول وأصبحت أنهي حصتي في 55 دقيقة بكفاءة عالية.',
    },
  },
  {
    id: 'sara',
    fr: {
      name: 'Sara K.',
      program: 'Recomposition & Poulies',
      timeframe: '12 Semaines',
      outcomeMetric: '-7,5 kg masse grasse · Rythme régulier 4x/sem.',
      quote:
        'J’hésitais face aux poids libres au début. La salle est propre, bien espacée et Coach Hamza m’a accompagnée jusqu’à ce que je sois totalement autonome sur chaque machine.',
    },
    ar: {
      name: 'سارة ك.',
      program: 'تنشيف ولياقة بالكوابل',
      timeframe: '12 أسبوعاً',
      outcomeMetric: '-7.5 كغ دهون · انتظام 4 حصص أسبوعياً',
      quote:
        'كنت مترددة في البداية من منطقة الأوزان، لكن القاعة نظيفة ومرتبة جداً، ورافقني الكوتش حمزة في الأسابيع الأولى حتى أتقنت جميع الآلات بثقة كاملة.',
    },
  },
  {
    id: 'amine',
    fr: {
      name: 'Amine B.',
      program: 'Coaching VIP 1-on-1',
      timeframe: '10 Semaines',
      outcomeMetric: '+35 kg au soulevé de terre · Zéro douleur lombaire',
      quote:
        'Chaque machine est solide et entretenue. Le programme Pro Muscle combiné au suivi hebdomadaire m’a donné plus de résultats en 10 semaines qu’en deux ans seul.',
    },
    ar: {
      name: 'أمين ب.',
      program: 'تدريب خاص VIP',
      timeframe: '10 أسابيع',
      outcomeMetric: '+35 كغ في السحب الأرضي · بدون آلام ظهر',
      quote:
        'كل الأجهزة متينة ومصانة باستمرار. الجمع بين برنامج برو مصل والمتابعة الأسبوعية أعطاني نتائج في 10 أسابيع لم أحققها في سنتين بمفردي.',
    },
  },
];
