import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import buy from "./modules/buy.js";

let globalData = [];

const main = async () =>{
  globalData = await fetchProduct({ ids: productsID, isHidden: false });
  const hiddenProductsData = await fetchProduct({ ids: hiddenProducts, isHidden: true })
  globalData.push(...hiddenProductsData)
  const noStock = (el) => !el.availableForSale;
  if (globalData.some(noStock)) {
    alert("Product not found.");
    window.location.href = "https://buckedup.com";
    return;
  }
  globalData.filter(product => !product.isHidden).forEach((product, i) => {
    if (product.options.length > 1) {
      multipleOptionsProduct(product, i);
      return;
    }
    normalProduct(product, i);
  });
  if (!isKit)
    buyButton.forEach((btnArray) => {
      btnArray.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!btn.hasAttribute("disabled"))
            buy(globalData[buyButton.indexOf(btnArray)]);
        });
      });
    });
  else
    buyButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.hasAttribute("disabled"))
          buy(globalData);
      });
    });
}

dataLayerStart();
main();
