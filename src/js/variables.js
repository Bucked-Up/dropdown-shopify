const storefrontAccessToken = "cf7a17ee55258cddfb9be5ef93cc96b2";
const shop = "bucked-up-offers";
const fetchUrl = `https://${shop}.myshopify.com/api/2021-07/graphql.json`;
const apiOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
};

export {apiOptions, fetchUrl}