import { gateway as MoltinGateway } from "@moltin/sdk";

const clientId =
  process.env.MOLTIN_CLIENT_ID || "Ozx1VBYbX3Bi1tnx5lsUMch4ZPPkB8YvLdoocQFiH8";

const Moltin = MoltinGateway({
  client_id: clientId,
  client_secret: "C60CCoMnYUkMCMHuHjumgNpypJwRGK1sV6q972PB21"
});

export const getProducts = () =>
  Moltin.Products.With(["main_image", "files", "variations"])
    // .Filter({ eq: { parent: null } })
    .All();

export const getProductById = id =>
  Moltin.Products.With(["main_image", "files"]).Get(id);

export const addToCart = (cartId, productId, quantity) =>
  Moltin.Cart(cartId).AddProduct(productId, quantity);

export const getCartItems = id => Moltin.Cart(id).Items();
export const deleteCart = id => Moltin.Cart(id).Delete();

export const removeFromCart = (productId, cartId) =>
  Moltin.Cart(cartId).RemoveItem(productId);

export const checkoutCart = (cartId, customer, billing) =>
  Moltin.Cart(cartId).Checkout(customer, billing);

export const createPaymentTransaction = orderId =>
  Moltin.Orders.Payment(orderId, {
    gateway: "manual",
    method: "authorize"
  });

export const capturePaymentTransaction = (orderId, transactionId) =>
  Moltin.Transactions.Capture({
    order: orderId,
    transaction: transactionId
  });

export const cancelPaymentTransaction = (orderId, transactionId) =>
  Moltin.Transactions.Refund({
    order: orderId,
    transaction: transactionId
  });

export const register = async ({ email, password, ...rest }) => {
  const {
    data: { name, id }
  } = await Moltin.Customers.Create({
    email,
    password,
    type: "customer",
    ...rest
  });

  const { token } = await login({ email, password });

  return {
    id,
    name,
    email,
    token
  };
};

export const login = async ({ email, password }) => {
  const {
    data: { customer_id: id, token }
  } = await Moltin.Customers.Token(email, password);

  return {
    id,
    token
  };
};

export const getOrders = token => Moltin.Orders.With("items").All(token);
