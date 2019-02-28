import Router from "next/router";
import {
  Header,
  Form,
  Input,
  Button,
  Segment,
  Message
} from "semantic-ui-react";

export default class CheckoutForm extends React.Component {
  state = {
    email: "",
    name: "",
    loading: false,
    errors: null
  };

  _handleSubmit = e => {
    this.props.onSubmit(this.state);
  };

  _handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    const { loading, errors } = this.state;

    return (
      <Form onSubmit={this._handleSubmit} loading={loading} error={!!errors}>
        <Message
          error
          header="Sorry"
          content="Please check your login details and try again."
        />

        <Segment>
          <Form.Field>
            <label>Name</label>
            <Input
              fluid
              name="name"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <Input
              fluid
              name="email"
              type="email"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>Address</label>
            <Input
              fluid
              name="line_1"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>City</label>
            <Input
              fluid
              name="city"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>Country</label>
            <Input
              fluid
              name="country"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>County</label>
            <Input
              fluid
              name="county"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Form.Field>
            <label>Postcode</label>
            <Input
              fluid
              name="postcode"
              type="input"
              onChange={e => this._handleChange(e)}
            />
          </Form.Field>

          <Button type="submit" color="orange">
            Pay
          </Button>
        </Segment>
      </Form>
    );
  }
}
