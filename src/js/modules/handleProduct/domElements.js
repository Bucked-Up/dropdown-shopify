const createButton = (productId, variantId, text, hasImg, src = "", variantPrice = "") => {
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
    const svg = '<svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z"/></svg>'
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

const updateImageMultiple = (product, title, img) => {
  for (let variant of product.variants) {
    if (variant.title.includes(title)) {
      img.src = variant.image.src;
      return;
    }
  }
};

export { createButton, createVariantsWrapper, updateImageMultiple };
