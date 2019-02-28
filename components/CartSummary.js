import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Modal, Header } from "semantic-ui-react";
import CheckoutForm from "./CheckoutForm";

export default class extends React.Component {
  state = {
    showCheckoutForm: false
  };

  handleShowCheckoutForm = () => {
    this.setState({
      showCheckoutForm: true
    });
  };

  render() {
    const {
      handleCheckout,
      display_price: {
        with_tax: { amount, currency, formatted }
      }
    } = this.props;

    return (
      <Segment clearing size="large">
        <strong>Sub total:</strong> {formatted}
        <Modal
          trigger={
            <Button color="black" floated="right">
              Check out
            </Button>
          }
        >
          <Modal.Header>Checkout</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <CheckoutForm onSubmit={handleCheckout} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Segment>
    );
  }
}
