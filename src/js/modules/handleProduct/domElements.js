const createButton = (productId, variantId, variantPrice, src, text, hasImg) => {
  const wrapper = document.createElement("div");
  let img
  if (hasImg) {
    img = document.createElement("img");
    img.src = src
    img.alt = text
    img.classList.add("img")
  }
  const label = document.createElement("label");
  const labelText = document.createElement("span");
  const labelBall = document.createElement("span");
  const button = document.createElement("input");
  const labelContent = document.createElement("span")
  wrapper.appendChild(button)
  wrapper.appendChild(label)
  if (hasImg)
    label.appendChild(img)
  label.appendChild(labelContent)
  labelContent.appendChild(labelBall)
  labelContent.appendChild(labelText)

  labelContent.classList.add("label")
  wrapper.classList.add("button-wrapper")
  labelText.classList.add("label-text")
  labelBall.classList.add("label-ball")
  label.setAttribute("for", `${variantId}`);
  label.setAttribute("role", "button");
  labelText.innerHTML = text;
  button.id = `${variantId}`;
  button.value = `${variantId}`;
  button.name = productId;
  button.setAttribute("price", variantPrice);
  button.setAttribute("label-text", text);
  button.type = "radio";
  button.setAttribute("hidden", "");

  return [wrapper, button];
};

const createVariantsWrapper = (element, values, hasImg) => {
  const variantsWrapper = document.createElement("div")
  let dropdownImg;
  if (hasImg) {
    dropdownImg = document.createElement("img")
    dropdownImg.classList.add("dropdown-img")
    dropdownImg.src = values[0].image.src
    dropdownImg.alt = values[0].title
    element.appendChild(dropdownImg)
  }

  variantsWrapper.classList.add("variants-wrapper")
  let dropdown = undefined;
  if (element.classList.contains("has-dropdown-mobile") || element.classList.contains("has-dropdown")) {
    dropdown = document.createElement("div");
    const p = document.createElement("p");
    const svg = '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"/></svg>'
    dropdown.setAttribute("role", "button");
    dropdown.classList.add("dropdown-mobile")
    p.innerHTML = values[0].title;
    dropdown.appendChild(p)
    dropdown.insertAdjacentHTML('beforeend', svg)
    element.appendChild(dropdown)
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    })
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target))
        dropdown.classList.remove("active")
    })
  }
  element.appendChild(variantsWrapper)
  return [variantsWrapper, dropdown, dropdownImg];
}


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

  // selectWrapper.appendChild(label);
  selectWrapper.appendChild(select);
  // imgWrapper.appendChild(img);
  // col.appendChild(imgWrapper);
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

export { createButton, createVariantsWrapper, createElement, createOption, updateImage, updateImageMultiple, updateSizes };
