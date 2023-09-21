const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie = "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);

const utm_source = "";
const step_count = "";
const page_id = "";
const version_id = "";

const productsID = [8685144408370]; //ID of each the product
const hiddenProducts = []
const optionalProducts = []
const isKit = true;
const buyButtonsIds = ["#element-35"]; //IDs of each button of each product(in the order put in productID).
const discountCode = ""
const lastVariantElements = ["#test1", "#test2"] //for when last variant is moved.

//stop here.

const buyButton = [];
const row = {};
