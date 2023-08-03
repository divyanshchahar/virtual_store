const apiEndPoints = {
  products: `${process.env.REACT_APP_AUDIENCE}products`,
  orders: `${process.env.REACT_APP_AUDIENCE}orders`,
  users: `${process.env.REACT_APP_AUDIENCE}users`,
  cart: `${process.env.REACT_APP_AUDIENCE}cart`,
  emptyCart: `${process.env.REACT_APP_AUDIENCE}emptycart`,
  login: `${process.env.REACT_APP_AUDIENCE}login`,
  logout: `${process.env.REACT_APP_AUDIENCE}logout`,
  refresh: `${process.env.REACT_APP_AUDIENCE}refreshToken`,
  signup: `${process.env.REACT_APP_AUDIENCE}signup`,
};

export default apiEndPoints;
