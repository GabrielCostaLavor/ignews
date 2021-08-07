import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';
import styles from './styles.module.scss';

export function SubscribeButton () {
  const [session] = useSession();
  const router = useRouter();

  async function hundleSubscribe() {
 
    if (!session) {
      signIn('github');
      return;
    }

    if(session.activeSubscription) {
      router.push('/posts');
      return;
    }

    //criacao da checkout session 
    try{ 
      const response = await api.post('/subscribe')

      const {sessionId} = response.data;

      console.log (response.data);

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId: sessionId.id })
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