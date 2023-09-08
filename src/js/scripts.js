import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import toggleLoading from "./modules/toggleLoading.js";
import buy from "./modules/buy.js";
import optionalProduct from "./modules/handleProduct/optionalProduct.js";
import { dataLayerStart } from "./modules/dataLayer.js";

buyButtonsIds.forEach((ids) => {
  let buttons = [];
  if (!isKit) {
    ids.forEach((id) => {
      buttons.push(document.querySelector(id));
    });
    buyButton.push(buttons);
  }
  else
    buyButton.push(document.querySelector(ids))
});

productsID.forEach((id) => {
  row[id] = document.querySelector(`.products-list.prod-${id}`);
});

const main = async () => {
  toggleLoading();
  dataLayerStart();
  const data = await fetchProduct({ ids: productsID, isHidden: false });
  const hiddenProductsData = await fetchProduct({ ids: hiddenProducts, isHidden: true })
  data.push(...hiddenProductsData)
  const optionalData = await fetchProduct({ ids: optionalProducts, isHidden: false }) 
  let selectedOptionalData = {selected: undefined};
  const noStock = (el) => !el.availableForSale;
  if (data.some(noStock) || optionalData.some(noStock)) {
    alert("Product not found.");
    window.location.href = "https://buckedup.com";
    return;
  }
  optionalProduct(optionalData,selectedOptionalData);
  data.filter(product => !product.isHidden).forEach((product, i) => {
    if (product.options.length > 1) {
      multipleOptionsProduct(product, i);
      return;
    }
    normalProduct(product);
  });
  if (!isKit)
    buyButton.forEach((btnArray) => {
      btnArray.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!btn.hasAttribute("disabled"))
            buy(data[buyButton.indexOf(btnArray)]);
        });
      });
    });
  else
    buyButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.hasAttribute("disabled")){
          if(selectedOptionalData.selected)
            data.push(selectedOptionalData.selected)
          buy(data);
        }
      });
    });
  toggleLoading();
}

main();
