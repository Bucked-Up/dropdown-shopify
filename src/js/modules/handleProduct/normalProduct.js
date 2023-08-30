import { createButton, createVariantsWrapper } from "./domElements.js";

const normalProduct = (product) => {
  const hasImg = row[product.id].classList.contains("has-img") || row[product.id].classList.contains("has-img-desktop")
  const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(row[product.id], product.variants, hasImg)
  product.variants.forEach((variant,i) => {
    console.log(i)
    const [wrapper, button] = createButton(product.id, variant.id, variant.title, hasImg, variant.image.src, variant.price.amount)
    if(row[product.id].classList.contains("move-last-variant") && i == product.variants.length - 1){
      document.querySelector(`.last-variant.prod-${product.id}`).appendChild(wrapper)
    }else
      variantsWrapper.appendChild(wrapper)
    if (dropdownMobile)
      button.addEventListener("change", () => {
        if (button.checked)
          dropdownMobile.querySelector("p").innerHTML = button.getAttribute("label-text")
      })
    if (hasImg)
      button.addEventListener("change", () => {
        if (button.checked)
          dropdownImg.src = variant.image.src
          dropdownImg.alt = variant.title
      })
  });
  variantsWrapper.querySelector("input").checked = true
  return true;
};

export default normalProduct;
