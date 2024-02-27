const step_count = "";
const page_id = "";
const version_id = "";
const urlParamsCookies = ["click_id", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const productsID = []; //ID of each the product
const hiddenProducts = [8685147062578,"8685145588018-46753449673010-46753449640242-46753449574706-46753449804082"];
const optionalProducts = [];
const buyButtonsIds = [{id: "#element-35", discountCode: "pogfb1-POGFREESHIPPING"}]; //IDs of each button of each product(in the order put in productID).
const discountCode = "pogfb2";
const lastVariantElements = []; //for when last variant is moved.

//stop here.
const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
const cookieConfig = "path=/; domain=.buckedup.com;max-age=3600";
document.cookie = `offer_id=${discountCode};${cookieConfig}`;
document.cookie = `page_id=${page_id};${cookieConfig}`;
urlParamsCookies.forEach((param) => {
  document.cookie = `${param}=${urlParams.get(param)};${cookieConfig}`;
});
localStorage.setItem("first_page", origin);

const buyButton = [];
const row = {};