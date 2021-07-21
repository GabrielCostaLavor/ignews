import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRYPE_PUBLIC_API_KEY);

  return stripeJs;
}