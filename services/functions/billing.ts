import Stripe from 'stripe'
import handler from 'util/handler'
import {calculateCost} from 'util/cost'

export const main = handler(async (event) => {
	const {storage, source} = JSON.parse(event.body)
	const amount = calculateCost(storage)
	const description = "Scratch charge"

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

	await stripe.charges.create({
		source, amount, description, currency: 'usd'
	})

	return {success: true}
})