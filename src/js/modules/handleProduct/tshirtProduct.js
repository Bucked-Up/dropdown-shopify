import { createElement, createOption, updateImage, updateSizes } from "./domElements.js";
import toggleButton from "../toggleButton.js";

const tshirtProduct = (data, btnIndex) => {
  const stock = data.product.stock;
  const colors = data.product.options[0].values;
  const sizes = data.product.options[1].values;
  colors.forEach((color) => {
    sizes.forEach((size) => {
      if (stock[`[${color.id},${size.id}]`] <= 0)
        delete stock[`[${color.id},${size.id}]`];
      if (stock[`[${size.id},${color.id}]`] <= 0)
        delete stock[`[${size.id},${color.id}]`];
    });
  });
  if (Object.keys(stock).length === 0) {
    return;
  }
  hasStock = true;
  const colorElement = createElement();
  colorElement.select.id = data.product.options[0].id;

  const sizeSelect = document.createElement("select");
  sizeSelect.classList.add("product-select");
  sizeSelect.id = data.product.options[1].id;
  sizeSelect.setAttribute("custom-select", "");

  colorElement.selectWrapper.appendChild(sizeSelect);
  row[data.product.id].appendChild(colorElement.col);

  for (let color of colors) {
    for (let size of sizes) {
      if (
        Object.hasOwn(stock, `[${color.id},${size.id}]`) ||
        Object.hasOwn(stock, `[${size.id},${color.id}]`)
      ) {
        colorElement.select.appendChild(createOption(color.id, color.name));
        break;
      }
    }
  }
  updateImage(colorElement, colors);
  colorElement.select.addEventListener("change", () => {
    updateImage(colorElement, colors);
  });
  colorElement.select.addEventListener("change", () => {
    updateSizes(true, sizeSelect, colorElement, sizes, stock);
  });

  updateSizes(false, sizeSelect, colorElement, sizes, stock);
  toggleButton(buyButton[btnIndex]);
  return true;
};

export default tshirtProduct;
