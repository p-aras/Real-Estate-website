import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, CreditCard, Building } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [bankDetails, setBankDetails] = useState({ name: '', accountNumber: '', routingNumber: '' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (paymentMethod === 'card') {
      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          // Here you would typically send the paymentMethod.id to your server to complete the payment
          alert('Card payment successful!');
          clearCart();
        }
      }
    } else {
      // Process bank transfer
      console.log('Bank transfer details:', bankDetails);
      // Here you would typically send the bank transfer details to your server
      alert('Bank transfer initiated. Please complete the transfer using the provided details.');
      clearCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Payment Method</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center px-4 py-2 rounded ${
              paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <CreditCard size={18} className="mr-2" />
            Credit/Debit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`flex items-center px-4 py-2 rounded ${
              paymentMethod === 'bank' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <Building size={18} className="mr-2" />
            Bank Transfer
          </button>
        </div>
      </div>

      {paymentMethod === 'card' ? (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Card Details</label>
          <CardElement className="bg-white p-3 rounded-md shadow" />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Account Holder Name</label>
            <input
              type="text"
              id="name"
              value={bankDetails.name}
              onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="routingNumber" className="block text-gray-700 font-bold mb-2">Routing Number</label>
            <input
              type="text"
              id="routingNumber"
              value={bankDetails.routingNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe && paymentMethod === 'card'}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition-colors"
      >
        Pay ${total.toLocaleString()}
      </button>
    </form>
  );
};

const Cart: React.FC = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Total: ${total.toLocaleString()}</p>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </>
      )}
    </div>
  );
};

export default Cart;