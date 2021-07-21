import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}


export function SubscribeButton ({ priceId }: SubscribeButtonProps) {
  async function hundleSubscribe() {
    const [session] = useSession();
    if (!session) {
      signIn('github');
      return;
    }

    //criacao da checkout session 
    try{ 
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId : sessionId});
    } catch(err) {
      alert(err.message);
    }

  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={hundleSubscribe}
    >
      Subscribe now
    </button>
  );
}