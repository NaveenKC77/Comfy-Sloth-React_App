require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51Lhs0tB1vIlpp2NLEa8QGi6omCiN6lUK45UlwtROjpYe7NzDdNEG5C6CeOyV7c3cyMCgrHbFyxkJtAMGg6Gdy1vl00QekSkjPI"
);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shippingFee, totalAmount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shippingFee + totalAmount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "aud",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
