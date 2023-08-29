import { createButton, createVariantsWrapper } from "./domElements.js";

const normalProduct = (product) => {
  const hasImg = row[product.id].classList.contains("has-img")
  const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(row[product.id], product.variants, hasImg)
  product.variants.forEach((variant) => {
    const [wrapper, button] = createButton(product.id, variant.id, variant.title, hasImg, variant.image.src, variant.price.amount)
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
