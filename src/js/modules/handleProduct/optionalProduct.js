import { createButton, createSimpleButton, createVariantsWrapper } from "./domElements.js";

const updateSelected = (product) => {
  const selectedSubVariant = Array.from(document.querySelectorAll(".optional-prod input")).filter(input=>input.checked)[0].value.replace("-"," ")
  const currentVariants = product.variants.filter(variant=>variant.title.includes(selectedSubVariant))
  const optionsDomElement = document.querySelector(".optional-products");
  optionsDomElement.innerHTML = "";
  const [variantsWrapper] = createVariantsWrapper(optionsDomElement, currentVariants, true)
  currentVariants.forEach(variant => {
    const [wrapper] = createButton({ productId: product.id, variantId: variant.id, text: variant.title.split("-")[1], hasImg: true, src: variant.image.src, variantPrice: variant.price.amount })
    variantsWrapper.appendChild(wrapper)
  })
  optionsDomElement.querySelector("input").checked = true
}

const getNewData = (data, text) => {
  const newData = data.variants.filter(variant => variant.title.includes(text))
  for (let data of newData) {
    data.auxId = text.replace(" ", "-")
    const price = data.title.split("(")[1]
    if(price)
      data.auxTitle = text + ` (${price}`
    else
      data.auxTitle = text
    data.title = data.title.split("(")[0]
  }
  return newData
}

const optionalProduct = (optionalData) => {
  const LFG = getNewData(optionalData, "LFG")
  const WOKE = getNewData(optionalData, "Woke AF")
  const BAMF = getNewData(optionalData, "BAMF")
  const BUCKEDUP = getNewData(optionalData, "Bucked Up")
  const newData = [BUCKEDUP, LFG, WOKE, BAMF]
  newData.forEach(data => {
    const domElement = document.querySelector(`.optional-prod-${data[0].auxId}`)
    const [button, wrapper] = createSimpleButton({ hasImg: false, src: "", text: data[0].auxTitle, variantId: data[0].auxId })
    button.name = "optional-products"
    domElement.appendChild(wrapper)
    button.addEventListener("change", () => {
      if (button.checked) {
        updateSelected(optionalData);
      }
    })
  })

  document.querySelector(".optional-prod").querySelector("input").checked = true
  updateSelected(optionalData);
}

export default optionalProduct;