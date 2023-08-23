import { createElement, updateImage, createOption } from "./domElements.js";

const normalProduct = (product, btnIndex) => {
  const newElement = createElement();

  row[product.id].appendChild(newElement.col);

  newElement.select.id = product.id;
  // newElement.select.addEventListener("change", () => {
  //   updateImage(newElement, product.variants);
  // });
  product.variants.forEach((variant) => {
      newElement.select.appendChild(createOption(`${variant.id}`, variant.title));
  });
  // updateImage(newElement, product.variants);
  return true;
};

export default normalProduct;
