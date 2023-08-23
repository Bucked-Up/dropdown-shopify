import { createElement, updateImage, createOption } from "./domElements.js";
import toggleButton from "../toggleButton.js";

const normalProduct = (product, btnIndex) => {
  const newElement = createElement();

  row[product.id].appendChild(newElement.col);

  newElement.select.id = product.id;
  newElement.select.addEventListener("change", () => {
    updateImage(newElement, product.variants);
  });
  product.variants.forEach((variant) => {
      newElement.select.appendChild(createOption(`${variant.id}`, variant.title));
  });
  updateImage(newElement, product.variants);
  // product.variants.forEach((op) => {

  //   if (product.variants.length == 1) {
  //     newElement.selectWrapper.style.display = "none";
  //     newElement.selectedOption.innerHTML = hasStock.name;
  //     newElement.col.appendChild(newElement.selectedOption);
  //     newElement.select.appendChild(
  //       createOption(`${hasStock.id}`, hasStock.name)
  //     );
  //   } else
  // });
  toggleButton(buyButton[btnIndex]);
  return true;
};

export default normalProduct;
