export type Language = 'fr' | 'ar';

export type PageId = 'home' | 'facility' | 'programs' | 'booking';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  facility: '/equipements',
  programs: '/programmes',
  booking: '/pass-gratuit',
};

export function resolvePageFromPath(pathname: string): PageId {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/equipements') return 'facility';
  if (normalized === '/programmes') return 'programs';
  if (normalized === '/pass-gratuit') return 'booking';
  return 'home';
}

export type BillingCycle = 'monthly' | 'quarterly' | 'annual';

export type TrainingGoal = 'muscle' | 'fat-loss' | 'strength' | 'beginner';

export type CoachingLevel = 'self' | 'guided' | 'vip';

export type MembershipTierId = 'essential' | 'pro-muscle' | 'vip-coaching';

export interface MembershipTierCopy {
  id: MembershipTierId;
  baseMonthlyPrice: number;
  popular?: boolean;
  fr: {
    name: string;
    tagline: string;
    summary: string;
    features: string[];
    ctaLabel: string;
  };
  ar: {
    name: string;
    tagline: string;
    summary: string;
    features: string[];
    ctaLabel: string;
  };
}

export interface PriceBreakdown {
  cycle: BillingCycle;
  discountPercent: number;
  effectiveMonthly: number;
  billedTotal: number;
  savingsTotal: number;
}

export interface ProgramRecommendation {
  tierId: MembershipTierId;
  tierName: string;
  splitTitle: string;
  weeklySchedule: string[];
  focusZone: string;
  expectedOutcome: string;
}

export interface TrialBookingInput {
  fullName: string;
  phone: string;
  goal: TrainingGoal;
  preferredTime: string;
  selectedTier: MembershipTierId;
}

export interface TrialBookingErrors {
  fullName?: string;
  phone?: string;
  preferredTime?: string;
}

export const MEMBERSHIP_TIERS: MembershipTierCopy[] = [
  {
    id: 'essential',
    baseMonthlyPrice: 3500,
    fr: {
      name: 'Accès Essentiel',
      tagline: 'Accès Libre · Tous les Horaires',
      summary:
        'Accès illimité aux poids libres, machines guidées Pro Muscle, poulies doubles et espace cardio.',
      features: [
        'Accès complet 06:00 – 23:00, 7j/7',
        'Zone poids libres Pro Muscle & barres olympiques',
        'Station poulies doubles & espace fonctionnel',
        'Vestiaires et douches entretenus quotidiennement',
      ],
      ctaLabel: 'Choisir Accès Essentiel',
    },
    ar: {
      name: 'الاشتراك الأساسي',
      tagline: 'دخول حر · طوال الأسبوع',
      summary:
        'دخول غير محدود لقاعة الأوزان الحرة، أجهزة برو مصل، الكوابل المزدوجة ومنطقة الكارديو.',
      features: [
        'دخول كامل من 06:00 إلى 23:00 طوال أيام الأسبوع',
        'منطقة الأوزان الحرة والبارات الأولمبية',
        'أجهزة السحب المزدوجة والتمارين الوظيفية',
        'غرف تغيير الملابس وحمامات نظيفة يومياً',
      ],
      ctaLabel: 'اختر الاشتراك الأساسي',
    },
  },
  {
    id: 'pro-muscle',
    baseMonthlyPrice: 5500,
    popular: true,
    fr: {
      name: 'Pro Muscle + Suivi',
      tagline: 'Le Plus Choisi · Résultats Encadrés',
      summary:
        'Tout l’accès Essentiel plus un programme d’hypertrophie personnalisé et un bilan technique toutes les 2 semaines.',
      features: [
        'Tout le contenu de l’Accès Essentiel',
        'Programme 4 ou 5 jours adapté à votre morphologie',
        'Bilan bi-mensuel des charges et mensurations',
        'Plan nutritionnel et objectifs protéines inclus',
      ],
      ctaLabel: 'Réserver Pass Pro Muscle',
    },
    ar: {
      name: 'برو مصل + متابعة',
      tagline: 'الأكثر طلباً · نتائج مضمونة',
      summary:
        'كل مزايا الاشتراك الأساسي مع برنامج تدريبي مخصص وتقييم دوري للأداء كل أسبوعين.',
      features: [
        'جميع مزايا الاشتراك الأساسي الكامل',
        'برنامج تدريبي مخصص 4 أو 5 أيام أسبوعياً',
        'تقييم الأوزان والقياسات كل أسبوعين',
        'دليل التغذية وحساب البروتين اليومي مشمول',
      ],
      ctaLabel: 'احجز باقة برو مصل',
    },
  },
  {
    id: 'vip-coaching',
    baseMonthlyPrice: 11000,
    fr: {
      name: 'Coaching VIP 1-on-1',
      tagline: 'Coach Hamza · Suivi Direct',
      summary:
        'Séances privées avec Coach Hamza pour accélérer votre prise de masse, perte de poids ou force maximale.',
      features: [
        '12 séances privées 1-on-1 par mois',
        'Correction posturale et parade en temps réel',
        'Ajustements nutritionnels chaque semaine',
        'Créneaux prioritaires aux heures de pointe',
      ],
      ctaLabel: 'Demander Suivi VIP',
    },
    ar: {
      name: 'تدريب خاص VIP',
      tagline: 'الكوتش حمزة · مرافقة شخصية',
      summary:
        'حصص تدريب فردية مع الكوتش حمزة لتحقيق أقصى تطور في الكتلة العضلية أو التنشيف.',
      features: [
        '12 حصة تدريب فردية شهرياً مع الكوتش',
        'تصحيح الأداء ومرافقة مباشرة في الأوزان الثقيلة',
        'تعديل أسبوعي للنظام الغذائي والنتائج',
        'أولوية الحجز خلال أوقات الذروة المسائية',
      ],
      ctaLabel: 'احجز استشارة VIP',
    },
  },
];

const CYCLE_META: Record<BillingCycle, { months: number; discount: number }> = {
  monthly: { months: 1, discount: 0 },
  quarterly: { months: 3, discount: 15 },
  annual: { months: 12, discount: 25 },
};

export function calculatePlanPrice(
  baseMonthlyPrice: number,
  cycle: BillingCycle,
): PriceBreakdown {
  const safeBase = Math.max(0, Math.round(baseMonthlyPrice));
  const { months, discount } = CYCLE_META[cycle];
  const effectiveMonthly = Math.round(safeBase * (1 - discount / 100));
  const billedTotal = effectiveMonthly * months;
  const fullTotal = safeBase * months;
  const savingsTotal = Math.max(0, fullTotal - billedTotal);

  return {
    cycle,
    discountPercent: discount,
    effectiveMonthly,
    billedTotal,
    savingsTotal,
  };
}

export function formatDzd(amount: number, lang: Language = 'fr'): string {
  const formatted = Math.round(amount).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ');
  return lang === 'ar' ? `${formatted} دج` : `${formatted} DA`;
}

export function recommendProgram(
  goal: TrainingGoal,
  daysPerWeek: 3 | 4 | 5,
  coaching: CoachingLevel,
  lang: Language = 'fr',
): ProgramRecommendation {
  const tierId: MembershipTierId =
    coaching === 'vip'
      ? 'vip-coaching'
      : coaching === 'guided' || goal === 'beginner'
        ? 'pro-muscle'
        : 'essential';

  const tier =
    MEMBERSHIP_TIERS.find((t) => t.id === tierId) ?? MEMBERSHIP_TIERS[1];
  const tierName = tier[lang].name;

  if (lang === 'ar') {
    if (goal === 'muscle') {
      const schedule =
        daysPerWeek === 3
          ? ['الإثنين: دفع وصدر وأكتاف', 'الأربعاء: سحب وظهر وذراعين', 'الجمعة: أرجل وبطن']
          : daysPerWeek === 4
            ? [
                'الإثنين: علوي قوة وتضخيم',
                'الثلاثاء: أرجل أمامية وبطة',
                'الخميس: صدر وأكتاف وذراعين',
                'السبت: ظهر وسلسلة خلفية',
              ]
            : [
                'الإثنين: صدر وترايسبس',
                'الثلاثاء: ظهر وبايسبس',
                'الأربعاء: أرجل وأرداف',
                'الجمعة: أكتاف وذراعين',
                'السبت: خلفيات الأرجل والبطن',
              ];
      return {
        tierId,
        tierName,
        splitTitle: `برنامج ${daysPerWeek} أيام لتضخيم العضلات`,
        weeklySchedule: schedule,
        focusZone: 'منطقة الأوزان الحرة برو مصل والكوابل المزدوجة',
        expectedOutcome: 'زيادة 3 إلى 5 كغ كتلة عضلية صافية خلال 12 أسبوعاً',
      };
    }

    if (goal === 'fat-loss') {
      const schedule =
        daysPerWeek === 3
          ? [
              'الإثنين: دائرة شاملة + حرق عالي',
              'الأربعاء: علوي قوة + فواصل كارديو',
              'الجمعة: سفلي ولياقة + بطن',
            ]
          : daysPerWeek === 4
            ? [
                'الإثنين: سوبر سيت علوي',
                'الثلاثاء: أرجل وحرق دهون',
                'الخميس: دوائر الكوابل الوظيفية',
                'السبت: لياقة بدنية شاملة',
              ]
            : [
                'الإثنين: سوبر سيت علوي',
                'الثلاثاء: سفلي و HIIT',
                'الأربعاء: بطن وكارديو متوسط',
                'الجمعة: دائرة كوابل وظيفية',
                'السبت: تنشيف شامل للجسم',
              ];
      return {
        tierId,
        tierName,
        splitTitle: `برنامج ${daysPerWeek} أيام للتنشيف ونحت الجسم`,
        weeklySchedule: schedule,
        focusZone: 'منطقة الكوابل المزدوجة والتمارين الحركية',
        expectedOutcome: 'خفض نسبة الدهون 4–7% مع الحفاظ على القوة العضلية',
      };
    }

    if (goal === 'strength') {
      const schedule =
        daysPerWeek === 3
          ? [
              'الإثنين: سكوات وضغط أساسي',
              'الأربعاء: ديدليفت وسحب أفقي',
              'الجمعة: ضغط كتف وتمارين مساعدة',
            ]
          : daysPerWeek === 4
            ? [
                'الإثنين: سكوات وتقوية الأرجل',
                'الثلاثاء: بنش برس وظهر علوي',
                'الخميس: سحب أرضي وخلفيات',
                'السبت: ضغط علوي وذراعين',
              ]
            : [
                'الإثنين: أرجل أوزان ثقيلة',
                'الثلاثاء: علوي أوزان ثقيلة',
                'الخميس: ظهر وسلسلة خلفية',
                'الجمعة: حجم تدريبي علوي',
                'السبت: نقاط الضعف والتوازن',
              ];
      return {
        tierId,
        tierName,
        splitTitle: `بروتوكول ${daysPerWeek} أيام للقوة القصوى والبارات`,
        weeklySchedule: schedule,
        focusZone: 'جهاز سميث وركن البارات الأولمبية',
        expectedOutcome: 'تطور 20 إلى 35% في الأوزان الأساسية خلال 90 يوماً',
      };
    }

    const schedule =
      daysPerWeek === 3
        ? [
            'الإثنين: أساسيات الجسم الكامل',
            'الأربعاء: إتقان الآلات والكوابل',
            'الجمعة: توازن الجذع والقوة',
          ]
        : daysPerWeek === 4
          ? [
              'الإثنين: أساسيات الجزء العلوي',
              'الثلاثاء: ميكانيكا الجزء السفلي',
              'الخميس: تقوية الظهر والوضعية',
              'السبت: مرونة ولياقة خفيفة',
            ]
          : [
              'الإثنين: حركات الدفع الأساسية',
              'الثلاثاء: أساسيات الأرجل',
              'الأربعاء: كارديو وتقوية البطن',
              'الجمعة: حركات السحب والظهر',
              'السبت: مراجعة شاملة للأداء',
            ];
    return {
      tierId,
      tierName,
      splitTitle: `برنامج ${daysPerWeek} أيام تأسيسي بإشراف الكوتش`,
      weeklySchedule: schedule,
      focusZone: 'الآلات الموجهة ومنطقة التقييم الأولي',
      expectedOutcome: 'إتقان الأداء الصحيح ورفع الطاقة البدنية خلال 30 يوماً',
    };
  }

  // French (default)
  if (goal === 'muscle') {
    const schedule =
      daysPerWeek === 3
        ? ['Lun : Poussée, Pectoraux & Épaules', 'Mer : Tirage, Dos & Bras', 'Ven : Jambes & Gainage']
        : daysPerWeek === 4
          ? [
              'Lun : Haut du Corps Force',
              'Mar : Quadriceps & Mollets',
              'Jeu : Pectoraux, Épaules & Bras',
              'Sam : Dos & Chaîne Postérieure',
            ]
          : [
              'Lun : Pectoraux & Triceps',
              'Mar : Dos & Biceps',
              'Mer : Quadriceps & Fessiers',
              'Ven : Épaules & Bras',
              'Sam : Ischios & Gainage',
            ];
    return {
      tierId,
      tierName,
      splitTitle: `Split Hypertrophie Pro Muscle · ${daysPerWeek} Jours`,
      weeklySchedule: schedule,
      focusZone: 'Poids Libres Pro Muscle & Poulies Doubles',
      expectedOutcome: '+3 à 5 kg de densité musculaire sur 12 semaines régulières',
    };
  }

  if (goal === 'fat-loss') {
    const schedule =
      daysPerWeek === 3
        ? [
            'Lun : Circuit Full-Body & Métabolique',
            'Mer : Force Haut du Corps + Intervalles',
            'Ven : Bas du Corps & Cardio Gainage',
          ]
        : daysPerWeek === 4
          ? [
              'Lun : Supersets Haut du Corps',
              'Mar : Jambes & Conditionnement',
              'Jeu : Circuits Câbles Fonctionnels',
              'Sam : Full-Body Athlétique',
            ]
          : [
              'Lun : Supersets Haut',
              'Mar : Bas du Corps & HIIT',
              'Mer : Gainage & Cardio Zone 2',
              'Ven : Circuit Poulies',
              'Sam : Brûlage Full-Body',
            ];
    return {
      tierId,
      tierName,
      splitTitle: `Recomposition & Sèche · ${daysPerWeek} Jours`,
      weeklySchedule: schedule,
      focusZone: 'Zone Poulies Doubles & Circuits Guidés',
      expectedOutcome: 'Réduction durable de 4 à 7% de masse grasse en gardant la force',
    };
  }

  if (goal === 'strength') {
    const schedule =
      daysPerWeek === 3
        ? [
            'Lun : Squat & Développé Polyarticulaire',
            'Mer : Soulevé de Terre & Tirage Horizontal',
            'Ven : Développé Militaire & Accessoires',
          ]
        : daysPerWeek === 4
          ? [
              'Lun : Squat & Renforcement Quadriceps',
              'Mar : Développé Couché & Haut du Dos',
              'Jeu : Soulevé de Terre & Fessiers',
              'Sam : Force Épaules & Bras',
            ]
          : [
              'Lun : Bas du Corps Lourd',
              'Mar : Haut du Corps Lourd',
              'Jeu : Chaîne Postérieure',
              'Ven : Volume Haut du Corps',
              'Sam : Points Faibles & Stabilité',
            ];
    return {
      tierId,
      tierName,
      splitTitle: `Protocole Force & Barres Olympiques · ${daysPerWeek} Jours`,
      weeklySchedule: schedule,
      focusZone: 'Station Smith, Racks & Barres Olympiques',
      expectedOutcome: '+20 à 35% de progression sur vos charges clés en 90 jours',
    };
  }

  const schedule =
    daysPerWeek === 3
      ? [
          'Lun : Fondations Full-Body Guidées',
          'Mer : Technique Machines & Poulies',
          'Ven : Stabilité du Tronc & Force',
        ]
      : daysPerWeek === 4
        ? [
            'Lun : Fondations Haut du Corps',
            'Mar : Mécanique Bas du Corps',
            'Jeu : Posture Dos & Poulies',
            'Sam : Mobilité & Cardio Doux',
          ]
        : [
            'Lun : Poussée Guidée',
            'Mar : Bases Jambes',
            'Mer : Cardio & Gainage',
            'Ven : Tirage & Posture',
            'Sam : Bilan Full-Body',
          ];
  return {
    tierId,
    tierName,
    splitTitle: `Programme Débutant Encadré · ${daysPerWeek} Jours`,
    weeklySchedule: schedule,
    focusZone: 'Machines Convergentes & Zone d’Évaluation',
    expectedOutcome: 'Maîtrise technique complète et regain d’énergie dès 30 jours',
  };
}

export function validateTrialBooking(
  input: TrialBookingInput,
  lang: Language = 'fr',
): TrialBookingErrors {
  const errors: TrialBookingErrors = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'ar'
        ? 'يرجى إدخال الاسم الكامل (حرفان على الأقل).'
        : 'Veuillez saisir votre nom complet (au moins 2 caractères).';
  }

  const digitsOnly = (input.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    errors.phone =
      lang === 'ar'
        ? 'أدخل رقم هاتف صحيح (8 إلى 15 رقماً، مثل 0771 03 91 72).'
        : 'Entrez un numéro valide (8 à 15 chiffres, ex. 0771 03 91 72).';
  }

  if (!input.preferredTime || input.preferredTime.trim().length === 0) {
    errors.preferredTime =
      lang === 'ar'
        ? 'اختر الفترة الزمنية المفضلة للزيارة.'
        : 'Sélectionnez un créneau horaire pour votre visite.';
  }

  return errors;
}

export function generatePassCode(name: string, phone: string): string {
  const cleanName =
    name
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 2) || 'FA';
  const digits = phone.replace(/\D/g, '');
  const tail = digits.slice(-4).padStart(4, '0');
  return `FA-${cleanName}-${tail}`;
}
