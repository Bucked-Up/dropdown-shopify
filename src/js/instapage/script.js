const step_count = "";
const page_id = "";
const version_id = "";

const productsID = []; //ID of each the product
const hiddenProducts = [8685147062578,"8685145588018-46753449673010-46753449640242-46753449574706-46753449804082"];
const optionalProducts = [];
const buyButtonsIds = [{id: "#element-35", discountCode: "pogfb1-POGFREESHIPPING"}]; //IDs of each button of each product(in the order put in productID).
const discountCode = "pogfb2";
const lastVariantElements = []; //for when last variant is moved.

//stop here.
const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
const getTopLevelDomain = () => {
  const fullDomain = window.location.hostname;
  const domainRegex = /\.([a-z]{2,})\.([a-z]{2,})$/;
  const match = fullDomain.match(domainRegex);
  if (match) {
      return `.${match[1]}.${match[2]}`;
  } else {
      return fullDomain;
  }
};
const cookieConfig = `path=/; domain=${getTopLevelDomain()};max-age=3600`;
document.cookie = `offer_id=${discountCode};${cookieConfig}`;
document.cookie = `page_id=${page_id};${cookieConfig}`;
urlParams.forEach((value, key) => {
  document.cookie = `${key}=${value};${cookieConfig}`;
});
localStorage.setItem("first_page", origin);

const buyButton = [];
const row = {};