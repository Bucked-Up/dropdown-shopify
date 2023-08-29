import { createButton, createWrapper } from "./domElements.js";

const normalProduct = (product, btnIndex) => {
  const [domElement, dropdownMobile] = createWrapper(row[product.id], product.variants)
  product.variants.forEach((variant) => {
    const [wrapper, button] = createButton(product.id, variant.id, variant.price.amount, variant.image.src, variant.title,row[product.id].classList.contains("has-img"))
    domElement.appendChild(wrapper)
    if (dropdownMobile)
        button.addEventListener("change", () => {
          if (button.checked)
            dropdownMobile.querySelector("p").innerHTML = button.getAttribute("label-text")
        })
  });
  domElement.querySelector("input").checked = true
  return true;
};

export default normalProduct;
