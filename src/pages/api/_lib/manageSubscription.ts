import { query as q } from 'faunadb';

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';


export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  //buscar o usuario no banco do fauna com o Id do customer Id
  const useRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  //salvar os dados dos subscription no faunaDB

  const subscriptionData = {
    id: subscription.id,
    userId: useRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  await fauna.query(
    q.Create(
      q.Collection('subscription'),
      { data: subscriptionData}
    )
  )
}