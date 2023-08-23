const createElement = () => {
  const col = document.createElement("div");
  col.classList.add("product");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("product__img");

  const img = document.createElement("img");

  const selectWrapper = document.createElement("div");
  selectWrapper.classList.add("product__select-wrapper");

  const label = document.createElement("label");
  label.innerHTML = "Select a Variant:&nbsp;*";

  const select = document.createElement("select");
  select.classList.add("product-select");
  select.setAttribute("custom-select", "");

  const selectedOption = document.createElement("p");
  selectedOption.classList.add("custom-select__name");

  selectWrapper.appendChild(label);
  selectWrapper.appendChild(select);
  imgWrapper.appendChild(img);
  col.appendChild(imgWrapper);
  col.appendChild(selectWrapper);

  return {
    col,
    imgWrapper,
    img,
    selectWrapper,
    label,
    select,
    selectedOption,
  };
};

const createOption = (value, text = "") => {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
};

//updates product image based on selected option
const updateImage = (element, values) => {
  element.img.src = values.filter(
    (val) => val.id == element.select.value
  )[0].image.src;
};

const updateImageMultiple = (product, title, element) => {
  for (let variant of product.variants) {
    if (variant.title.includes(title)) {
      element.img.src = variant.image.src;
      return;
    }
  }
};

//updates available shirt sizes based on stock for selected color
const updateSizes = (updateSelects, sizeSelect, colorElement, sizes, stock) => {
  sizeSelect.innerHTML = "";
  sizes.forEach((size) => {
    if (
      Object.hasOwn(stock, `[${colorElement.select.value},${size.id}]`) ||
      Object.hasOwn(stock, `[${size.id},${colorElement.select.value}]`)
    )
      sizeSelect.appendChild(createOption(size.id, size.name));
  });
  if (updateSelects) updateSelect(sizeSelect);
};

export { createElement, createOption, updateImage, updateImageMultiple, updateSizes };
