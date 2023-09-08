import { createButton, createSimpleButton, createVariantsWrapper } from "./domElements.js";

const updateSelected = (product) => {
  const optionsDomElement = document.querySelector(".optional-products");
  optionsDomElement.innerHTML = "";
  const [variantsWrapper] = createVariantsWrapper(optionsDomElement, product.variants, true)
  product.variants.forEach(variant => {
    const [wrapper] = createButton({ productId: product.id, variantId: variant.id, text: variant.title, hasImg: true, src: variant.image.src, variantPrice: variant.price.amount })
    variantsWrapper.appendChild(wrapper)
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
  document.querySelector(`.optional-prod-${optionalData[0].id}`).querySelector("input").checked = true
  updateSelected(optionalData[0]);
  selectedOptionalData.selected = optionalData[0];
  console.log(selectedOptionalData)
}

export default optionalProduct;