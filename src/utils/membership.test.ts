import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePlanPrice,
  formatDzd,
  generatePassCode,
  recommendProgram,
  resolvePageFromPath,
  validateTrialBooking,
} from './membership';

test('resolvePageFromPath maps all 4 page URLs deterministically', () => {
  assert.equal(resolvePageFromPath('/'), 'home');
  assert.equal(resolvePageFromPath('/equipements'), 'facility');
  assert.equal(resolvePageFromPath('/programmes'), 'programs');
  assert.equal(resolvePageFromPath('/pass-gratuit'), 'booking');
  assert.equal(resolvePageFromPath('/equipements/'), 'facility');
  assert.equal(resolvePageFromPath('/unknown'), 'home');
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
