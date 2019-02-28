import { Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import CartItemList from "../components/CartItemList";
import CartSummary from "../components/CartSummary";

import {
  getCartItems,
  removeFromCart,
  checkoutCart,
  deleteCart,
  payForOrder,
  createPaymentTransaction,
  capturePaymentTransaction,
  cancelPaymentTransaction
} from "../lib/moltin";

export default class Cart extends React.Component {
  state = {
    items: [],
    loading: true,
    completed: false
  };

  async componentDidMount() {
    const cartId = await localStorage.getItem("mcart");
    const { data, meta } = await getCartItems(cartId);

    this.setState({
      items: data,
      meta,
      cartId,
      loading: false
    });
  }

  _handleCheckout = async data => {
    const cartId = await localStorage.getItem("mcart");
    const customerId = localStorage.getItem("mcustomer");

    const { email, name, line_1, city, country, county, postcode } = data;

    const customer = customerId ? customerId : { name, email };

    const address = {
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
      line_1,
      city,
      county,
      country,
      postcode
    };

    try {
      const {
        data: { id: orderId }
      } = await checkoutCart(cartId, customer, address);
      const {
        data: { id: transactionId }
      } = await createPaymentTransaction(orderId);
      //await cancelPaymentTransaction(orderId, transactionId);
      // await capturePaymentTransaction(orderId, transactionId);
      // await deleteCart(cartId);

      this.setState({
        completed: true
      });
    } catch (e) {
      console.log(e);
    }
  };

  _handleRemoveFromCart = async itemId => {
    const { items, cartId } = this.state;
    const { data, meta } = await removeFromCart(itemId, cartId);

    this.setState({
      items: data,
      meta
    });
  };

  render() {
    const { meta, ...rest } = this.state;
    const { loading } = rest;

    return (
      <Layout title="Cart">
        <CartItemList {...rest} removeFromCart={this._handleRemoveFromCart} />
        <Divider />
        {!loading && !rest.completed && (
          <CartSummary {...meta} handleCheckout={this._handleCheckout} />
        )}
      </Layout>
    );
  }
}
