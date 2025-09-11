import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (priceId: string) => {
  const { data: { sessionId } } = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  }).then(res => res.json());

  const stripe = await stripePromise;
  return stripe?.redirectToCheckout({ sessionId });
};