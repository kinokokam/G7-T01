const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// Replace with your actual Stripe Secret Key
const stripe = Stripe('sk_test_51QGaJLAUyOi61T2Y35llgBsdD516mRvFIYpA4JEMYzja9iwjKasWwSimmXYybXWdnuVISy5S7HoNzJr5G4wmrsK200iQkm4VZG'); // Replace with your Stripe Secret Key

const app = express();
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId } = req.body;

    try {
        // Create a PaymentIntent with amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents ($10.00)
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: { message: error.message } });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
