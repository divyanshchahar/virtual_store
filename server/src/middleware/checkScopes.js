const { requiredScopes } = require("express-oauth2-jwt-bearer");

const checkCartScopes = requiredScopes("write:carts");
const checkOrdersScopes = requiredScopes("write:orders");
const checkUsersScopes = requiredScopes("write:users");

module.exports = { checkCartScopes, checkOrdersScopes, checkUsersScopes };
