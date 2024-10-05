import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import CreditCardForm from './CreditCardForm';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

export function PaymentForm({ cartItems, total }) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCreditCardPayment = async (cardDetails) => {
        const stripe = await stripePromise;

        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: cardDetails,
        });

        if (paymentMethod.error) {
            console.error('Error creating payment method:', paymentMethod.error);
            return;
        }

        try {
            const response = await fetch('/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.paymentMethod.id,
                    amount: total,
                    currency: 'USD',
                    // Add any other necessary payment details
                }),
            });

            if (response.ok) {
                // Payment successful, handle the response
                console.log('Payment successful');
            } else {
                // Payment failed, handle the error
                console.error('Payment failed');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const handlePayPalPayment = (data, actions) => {
        // Call your backend server to capture the payment
        fetch('/capture-paypal-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId: data.orderID }),
        })
            .then((response) => {
                if (response.ok) {
                    // Payment captured successfully
                    console.log('Payment captured:', data.orderID);
                } else {
                    // Payment capture failed
                    console.error('Payment capture failed');
                }
            })
            .catch((error) => {
                console.error('Error capturing payment:', error);
            });
    };

    return (
        <div>
            <h2>Payment Methods</h2>
            <div>
                <input
                    type="radio"
                    id="creditCard"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="creditCard">Credit Card (MasterCard, Visa)</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="paypal"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="paypal">PayPal</label>
            </div>

            {
                paymentMethod === 'creditCard' && (
                    <div>
                        <h3>Credit Card Payment</h3>
                        <CreditCardForm onSubmit={handleCreditCardPayment} />
                    </div>
                )};


            {paymentMethod === 'paypal' && (
                <div>
                    <h3>PayPal Payment</h3>
                    <PayPalScriptProvider
                        options={{
                            'client-id': 'YOUR_PAYPAL_CLIENT_ID',
                        }}
                    >
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                // Call your backend server to create the PayPal order
                                return fetch('/create-paypal-order', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ cartItems, total }),
                                })
                                    .then((response) => response.json())
                                    .then((order) => order.id)
                                    .catch((error) => {
                                        console.error('Error creating PayPal order:', error);
                                    });
                            }}
                            onApprove={handlePayPalPayment}
                        />
                    </PayPalScriptProvider>
                </div>
            )}
        </div>
    );
}

// You'll need to create a separate CreditCardForm component to collect credit card details
// and pass it to the handleCreditCardPayment function.

export default PaymentForm;