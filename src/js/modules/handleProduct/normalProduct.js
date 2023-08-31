import { createButton, createVariantsWrapper } from "./domElements.js";

const checkIfLastVariantHasStock = (variant, button, wrapper) => {
  if (!variant.availableForSale) {
    button.toggleAttribute("disabled")
    wrapper.classList.add("no-stock-filter")
    lastVariantElements.forEach(id => {
      document.querySelector(id).classList.add("no-stock-filter")
    })
  }
}

const normalProduct = (product) => {
  const currentRow = row[product.id]
  const hasImg = currentRow.classList.contains("has-img") || currentRow.classList.contains("has-img-desktop")
  const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(currentRow, product.variants, hasImg)
  product.variants.forEach((variant) => {
    const [wrapper, button] = createButton(product.id, variant.id, variant.title, hasImg, variant.image.src, variant.price.amount)

    if (currentRow.classList.contains("move-last-variant") && variant["last-variant"]) {
      document.querySelector(`.last-variant.prod-${product.id}`).appendChild(wrapper)
      checkIfLastVariantHasStock(variant, button, wrapper)
    } else
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
  if (!currentRow.hasAttribute("dropdown-text"))
    variantsWrapper.querySelector("input").checked = true
  return true;
};

export default normalProduct;
