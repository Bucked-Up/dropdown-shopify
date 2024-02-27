import { createButton, createSimpleButton, createVariantsWrapper, handleButtonDropImg } from "./domElements.js";

const updateSelected = (product) => {
  const optionsDomElement = document.querySelector(".optional-products");
  const hasImg = optionsDomElement.classList.contains("has-img") || optionsDomElement.classList.contains("has-img-desktop");
  optionsDomElement.innerHTML = "";
  const [variantsWrapper, dropdownMobile, dropdownImg] = createVariantsWrapper(optionsDomElement, product.variants, hasImg)
  product.variants.forEach(variant => {
    const [wrapper,button] = createButton({ productId: product.id, variantId: variant.id, text: variant.title, hasImg: true, src: variant.image.src, variantPrice: variant.price.amount })
    variantsWrapper.appendChild(wrapper)
    handleButtonDropImg(variant,button,dropdownMobile,hasImg,dropdownImg)
  })
  optionsDomElement.querySelector("input").checked = true
}

const optionalProduct = (optionalData, selectedOptionalData) => {
  optionalData.forEach(data => {
    const domElement = document.querySelector(`.optional-prod-${data.id}`)
    const [button, wrapper] = createSimpleButton({ hasImg: false, src: "", text: data.title, variantId: data.id })
    button.name = "optional-products"
    domElement.appendChild(wrapper)
    button.addEventListener("change", () => {
      if (button.checked) {
        updateSelected(data);
        selectedOptionalData.selected = data;
      }
    })
  })
  if (optionalData.length > 0) {
    document.querySelector(`.optional-prod-${optionalData[0].id}`).querySelector("input").checked = true
    updateSelected(optionalData[0]);
    selectedOptionalData.selected = optionalData[0];
  }
}

export default optionalProduct;