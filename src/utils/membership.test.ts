import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleMapsSearchUrl,
  buildNavigationTarget,
  calculatePlanPrice,
  formatDzd,
  formatRouteMetrics,
  generatePassCode,
  getAppBasePath,
  recommendProgram,
  resolveAssetUrl,
  resolvePageFromLocation,
  resolvePageFromPath,
  validateTrialBooking,
} from './membership';

test('resolvePageFromPath maps all 4 page URLs deterministically', () => {
  assert.equal(resolvePageFromPath('/'), 'home');
  assert.equal(resolvePageFromPath('/equipements'), 'facility');
  assert.equal(resolvePageFromPath('/programmes'), 'programs');
  assert.equal(resolvePageFromPath('/contacts'), 'booking');
  assert.equal(resolvePageFromPath('/pass-gratuit'), 'booking');
  assert.equal(resolvePageFromPath('/equipements/'), 'facility');
  assert.equal(resolvePageFromPath('/unknown'), 'home');
});

test('getAppBasePath and subpath helpers support GitHub Pages /fafitness/ and root /', () => {
  assert.equal(
    getAppBasePath('https://afnestaha-creator.github.io/fafitness/assets/index-abc.js'),
    '/fafitness/',
  );
  assert.equal(
    getAppBasePath('https://fafitness.vercel.app/assets/index-abc.js'),
    '/',
  );
  assert.equal(
    getAppBasePath('http://localhost:3000/src/utils/membership.ts'),
    '/',
  );

  assert.equal(
    resolveAssetUrl('/assets/aistudio/oo_0060cc98.jpg', '/fafitness/'),
    '/fafitness/assets/aistudio/oo_0060cc98.jpg',
  );
  assert.equal(
    resolveAssetUrl('/assets/aistudio/oo_0060cc98.jpg', '/'),
    '/assets/aistudio/oo_0060cc98.jpg',
  );

  assert.equal(
    resolvePageFromLocation('/fafitness/', '', '/fafitness/'),
    'home',
  );
  assert.equal(
    resolvePageFromLocation('/fafitness', '', '/fafitness/'),
    'home',
  );
  assert.equal(
    resolvePageFromLocation('/fafitness/', '#/equipements', '/fafitness/'),
    'facility',
  );
  assert.equal(
    resolvePageFromLocation('/fafitness/programmes', '', '/fafitness/'),
    'programs',
  );
  assert.equal(
    resolvePageFromLocation('/contacts', '', '/'),
    'booking',
  );

  assert.equal(buildNavigationTarget('home', '/'), '/');
  assert.equal(buildNavigationTarget('facility', '/'), '/equipements');
  assert.equal(buildNavigationTarget('home', '/fafitness/'), '/fafitness/');
  assert.equal(
    buildNavigationTarget('programs', '/fafitness/'),
    '/fafitness/#/programmes',
  );
});

test('calculatePlanPrice computes monthly, quarterly, and annual discounts accurately', () => {
  const monthly = calculatePlanPrice(4000, 'monthly');
  assert.equal(monthly.effectiveMonthly, 4000);
  assert.equal(monthly.billedTotal, 4000);
  assert.equal(monthly.savingsTotal, 0);

  const quarterly = calculatePlanPrice(4000, 'quarterly');
  assert.equal(quarterly.discountPercent, 15);
  assert.equal(quarterly.effectiveMonthly, 3400);
  assert.equal(quarterly.billedTotal, 10200);
  assert.equal(quarterly.savingsTotal, 1800);

  const annual = calculatePlanPrice(4000, 'annual');
  assert.equal(annual.discountPercent, 25);
  assert.equal(annual.effectiveMonthly, 3000);
  assert.equal(annual.billedTotal, 36000);
  assert.equal(annual.savingsTotal, 12000);
});

test('formatDzd formats currency in French and Arabic', () => {
  assert.equal(formatDzd(5500, 'fr'), '5 500 DA');
  assert.equal(formatDzd(5500, 'ar'), '5 500 دج');
});

test('recommendProgram maps coaching level and returns localized splits', () => {
  const vipFr = recommendProgram('strength', 4, 'vip', 'fr');
  assert.equal(vipFr.tierId, 'vip-coaching');
  assert.equal(vipFr.weeklySchedule.length, 4);
  assert.ok(vipFr.splitTitle.includes('Force'));

  const beginnerAr = recommendProgram('beginner', 3, 'self', 'ar');
  assert.equal(beginnerAr.tierId, 'pro-muscle');
  assert.equal(beginnerAr.weeklySchedule.length, 3);
  assert.ok(beginnerAr.splitTitle.includes('تأسيسي'));
});

test('validateTrialBooking catches invalid inputs in both FR and AR', () => {
  const invalidFr = validateTrialBooking(
    {
      fullName: 'A',
      phone: '123',
      goal: 'muscle',
      preferredTime: '',
      selectedTier: 'pro-muscle',
    },
    'fr',
  );
  assert.ok(invalidFr.fullName?.includes('nom complet'));
  assert.ok(invalidFr.phone?.includes('numéro'));

  const invalidAr = validateTrialBooking(
    {
      fullName: 'أ',
      phone: '123',
      goal: 'muscle',
      preferredTime: '',
      selectedTier: 'pro-muscle',
    },
    'ar',
  );
  assert.ok(invalidAr.fullName?.includes('الاسم الكامل'));
  assert.ok(invalidAr.phone?.includes('هاتف'));

  const valid = validateTrialBooking(
    {
      fullName: 'Karim Benali',
      phone: '0771 03 91 72',
      goal: 'muscle',
      preferredTime: '16:00 – 21:00',
      selectedTier: 'pro-muscle',
    },
    'fr',
  );
  assert.deepEqual(valid, {});
});

test('generatePassCode handles Latin and Arabic names gracefully', () => {
  assert.equal(generatePassCode('Karim Benali', '0771 03 91 72'), 'FA-KA-9172');
  assert.equal(generatePassCode('كريم بن علي', '0771 03 91 72'), 'FA-FA-9172');
});

test('buildGoogleMapsSearchUrl encodes gym address query cleanly', () => {
  const url = buildGoogleMapsSearchUrl('RQ58+255, Rue Lounis Mustapha, Jijel');
  assert.equal(
    url,
    'https://www.google.com/maps/search/?api=1&query=RQ58%2B255%2C%20Rue%20Lounis%20Mustapha%2C%20Jijel',
  );
  assert.equal(buildGoogleMapsSearchUrl('   '), 'https://www.google.com/maps');
});

test('formatRouteMetrics formats distance and duration in FR and AR', () => {
  assert.deepEqual(formatRouteMetrics(2450, 420000, 'fr'), {
    distanceText: '2.5 km',
    durationText: '7 min',
  });
  assert.deepEqual(formatRouteMetrics(750, 120000, 'ar'), {
    distanceText: '750 م',
    durationText: '2 دقيقة',
  });
  assert.equal(formatRouteMetrics(0, 1000, 'fr'), null);
  assert.equal(formatRouteMetrics(undefined, null, 'ar'), null);
});

