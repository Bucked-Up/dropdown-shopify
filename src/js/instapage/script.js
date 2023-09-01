const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);

//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

urlParams.set("utm_source", "");

const productsID = [8664012095794,8663850418482]; //ID of each the product
const hiddenProducts = []
const isKit = true;
const buyButtonsIds = ["#element-35"]; //IDs of each button of each product(in the order put in productID).
const discountCode = ""
const lastVariantElements = ["#test1", "#test2"] //for when last variant is moved.

//CHANGE ONLY WHAT IS SAID TO CHANGE.
const setDataLayer = (event, action, value, currency = undefined) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    step_count: "", //lp, us1, us2, us3, ds1, ty
    page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
    version_id: "", //v1-control, v2-dropdown, v2-modal
    event: event,
    action: action,
    value: value,
    currency: currency,
    transaction_id: undefined,
  });
};

const dataLayerStart = () => {
  setDataLayer((event = "pageview"), (action = "load"), (value = 0));
};

const dataLayerRedirect = () => {
  setDataLayer((event = "offerview"), (action = "viewaction"), (value = 0));
};

const buyButton = [];
const row = {};
