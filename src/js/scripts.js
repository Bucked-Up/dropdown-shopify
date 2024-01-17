import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import toggleLoading from "./modules/toggleLoading.js";
import buy from "./modules/buy.js";
import optionalProduct from "./modules/handleProduct/optionalProduct.js";
import { dataLayerStart } from "./modules/dataLayer.js";

const setQuantity = (id) => {
  const isString = typeof (id) === "string"
  const button = document.querySelector(isString ? id : id.id)
  if (!isString){
    id.quantity && button.setAttribute("quantity", id.quantity)
    id.products && button.setAttribute("products", id.products)
    id.discountCode && button.setAttribute("discountCode", id.discountCode)
  }
  return button
}

buyButtonsIds.forEach((ids) => {
  buyButton.push(setQuantity(ids))
});

productsID.forEach((id) => {
  if(typeof(id) == "string") id = id.split("-")[0]
  row[id] = document.querySelector(`.products-list.prod-${id}`);
});

const main = async () => {
  toggleLoading();
  const data = await fetchProduct({ ids: productsID, isHidden: false });
  const hiddenProductsData = await fetchProduct({ ids: hiddenProducts, isHidden: true })
  data.push(...hiddenProductsData)
  dataLayerStart(data);
  let optionalData = [];
  let selectedOptionalData;
  if (optionalProducts.length > 0) {
    optionalData = await fetchProduct({ ids: optionalProducts, isHidden: false })
    selectedOptionalData = { selected: undefined };
  }
  const noStock = (el) =>{
    return !el.availableForSale;
  } 
  if (data.some(noStock) || optionalData.some(noStock)) {
    alert("Product not found.");
    window.location.href = "https://buckedup.com";
    return;
  }
  if (optionalProducts.length > 0) {
    optionalProduct(optionalData, selectedOptionalData);
  }
  data.filter(product => !product.isHidden).forEach((product, i) => {
    if (product.options.length > 1) {
      multipleOptionsProduct(product, i);
      return;
    }
    normalProduct(product);
  });
  buyButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.hasAttribute("disabled")) {
        if (selectedOptionalData && selectedOptionalData.selected)
          data.push(selectedOptionalData.selected)
        buy(btn, data);
      }
    });
  });
  toggleLoading();
}

main();
