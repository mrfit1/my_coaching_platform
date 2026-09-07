/**
 * Live Stripe Payment Links for Toronto Performance Coaching.
 * Prices are in CAD. Keep this file as the single source of truth for checkout links.
 */
export const PAYMENT_LINKS = {
  inPerson1: 'https://buy.stripe.com/cNi14fcJ5bUR0lBbBreAg00',
  inPerson5: 'https://buy.stripe.com/28E5kvdN9gb72tJeNDeAg03',
  inPerson10: 'https://buy.stripe.com/9B6aEP5gD6Ax0lB5d3eAg04',
  inPerson20: 'https://buy.stripe.com/6oU4grbF10c9c4j5d3eAg05',
  liveVideo1: 'https://buy.stripe.com/00w28jcJ5aQN3xNeNDeAg02',
  liveVideo8: 'https://buy.stripe.com/3cI4gr9wTgb77O36h7eAg06',
  liveVideo20: 'https://buy.stripe.com/28E7sD24rgb7ecr20ReAg07',
} as const;

export const COACHING_PRICES_CAD = {
  inPerson1: 115,
  inPerson5: 550,
  inPerson10: 1050,
  inPerson20: 1980,
  liveVideo1: 79,
  liveVideo8: 576,
  liveVideo20: 1300,
} as const;
