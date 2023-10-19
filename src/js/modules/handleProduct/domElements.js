const createDropdown = (values, hasText = false) => {
  const dropdown = document.createElement("div");
  const p = document.createElement("p");
  const svg = '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"/></svg>'
  dropdown.setAttribute("role", "button");
  dropdown.classList.add("dropdown-mobile")
  p.innerHTML = hasText && `<span class="placeholder-text">${hasText}</span>` || values[0].title || values[0];
  dropdown.appendChild(p)
  dropdown.insertAdjacentHTML('beforeend', svg)
  dropdown.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT")
      dropdown.classList.toggle("active");
  })
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) || e.target.tagName === "INPUT")
      dropdown.classList.remove("active")
  })
  return dropdown
}

const createSimpleButton = ({ hasImg, src, text, variantId }) => {
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
  labelBall.appendChild(document.createElement("span"))
  label.setAttribute("for", `${variantId}`);
  label.setAttribute("role", "button");
  labelText.innerHTML = text;
  button.id = `${variantId}`;
  button.value = `${variantId}`;
  button.type = "radio";
  button.setAttribute("hidden", "");
  return [button, wrapper, labelText]
}

const createButton = ({ productId, variantId, text, hasImg, src = "", variantPrice = "", plusPrice = undefined }) => {
  const [button, wrapper, labelText] = createSimpleButton({ hasImg: hasImg, src: src, text: text, variantId: variantId })
  button.name = productId;
  button.setAttribute("price", variantPrice);
  button.setAttribute("label-text", text);
  button.addEventListener("change",()=>{document.querySelector("body").classList.remove("shake")})
  if (plusPrice) {
    const labelPrice = document.createElement("span");
    labelPrice.classList.add("label-price")
    labelPrice.innerHTML = plusPrice
    labelText.appendChild(labelPrice)
  }

  return [wrapper, button];
};

const handleButtonDropImg = (variant, button, dropdownMobile, hasImg, dropdownImg) => {
  if (dropdownMobile)
    button.addEventListener("change", () => {
      dropdownMobile.querySelector("p").innerHTML = button.getAttribute("label-text")
    })
  if (hasImg)
    button.addEventListener("change", () => {
      dropdownImg.src = variant.image.src
      dropdownImg.alt = variant.title
    })
}

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
    const hasText = element.getAttribute("dropdown-text")
    dropdown = createDropdown(values, hasText)
    element.appendChild(dropdown)
  }
  element.appendChild(variantsWrapper)
  return [variantsWrapper, dropdown, dropdownImg];
}

const createMultipleOptionsDOM = (element, primaryOption, secondaryOption, product, hasImg) => {
  const getNewName = (value) => {
    switch (value) {
      case "Small": return "S";
      case "Medium": return "M";
      case "Large": return "L";
      case "X-Large": return "XL";
      case "2XL": return "XXL";
      default: return value;
    }
  }

  const updateSizes = (optionId, secondaryWrapper, primarySelected) => {
    const prevSelected = secondaryWrapper.querySelector(["input:checked"])
    secondaryWrapper.innerHTML = ""
    product.variants.forEach(variant => {
      const newValue = variant.selectedOptions[1].value
      if (variant.title.includes(primarySelected) && !secondaryWrapper.innerHTML.includes(newValue)) {
        const [wrapper, button] = createButton({ productId: optionId, variantId: newValue, text: getNewName(newValue), hasImg: false, plusPrice: findPlusPrice(newValue, product.variants) })
        if (prevSelected?.id === newValue) button.checked = true;
        secondaryWrapper.appendChild(wrapper)
      }
    })
  }

  const updateImageMultiple = (product, title, img) => {
    for (let variant of product.variants) {
      if (variant.title.includes(title)) {
        img.src = variant.image.src;
        return;
      }
    }
  };

  let img
  if (hasImg) {
    img = document.createElement("img")
    img.classList.add("dropdown-img")
    updateImageMultiple(product, product.variants[0].title, img)
    element.appendChild(img)
  }

  const findPlusPrice = (value, variants) => {
    for (let variant of variants) {
      if (variant.title.includes(value))
        return variant.title.split("(")[1]?.split(")")[0]
    }
  }

  const createTshirtSizesWrapper = () => {
    const variantsWrapper = document.createElement("div")
    variantsWrapper.classList.add("sizes-wrapper")
    document.querySelector(`.size-${product.id}`).appendChild(variantsWrapper)
    return variantsWrapper
  }

  const chooseBallColor = (text) => {
    switch (text) {
      case "Military Green / Black Logo": return "linear-gradient(90deg, #374409 50.77%, #000 52.13%)"
      case "Black / Blue Logo": return "linear-gradient(90deg, #000 50.77%, #1172F8 52.13%)"
      case "Heather Maroon / White Logo": return "linear-gradient(90deg, #B35366 50.77%, #F5F9FC 52.13%)"
      case "Black / Red Logo": return "linear-gradient(90deg, #29282F 52.12%, #F50202 52.13%)"
      case "Black / White Logo": return "linear-gradient(90deg, #29282F 50.77%, #F3F6F8 52.13%)"
      case "Gray / Black Logo": return "linear-gradient(90deg, #A7ADB4 50.77%, #262628 52.13%)"
      case "Light Olive / Black Logo": return "linear-gradient(90deg, #C5B4A8 50.77%, #2F2D2D 52.13%)"
      case "White / Red Logo": return "linear-gradient(90deg, #F3F6F8 52.12%, #DF0C28 52.13%)"
      case "Heather Maroon/White Logo": return "linear-gradient(90deg, #B35366 50.77%, #F5F9FC 52.13%)"
      case "Heather Orange/Black Logo": return "linear-gradient(90deg, #DA8D59 51.06%, #20282D 51.06%)"
      case "Heather Blue/ White Logo": return "linear-gradient(90deg, #305F8C 50.77%, #F5F9FC 52.13%)"
      case "Heather Gray/Black Logo": return "linear-gradient(90deg, #BEC7D5 51.06%, #20282D 51.06%)"
    }
  }

  const createPrimaryVariantWrapper = (option) => {
    const variantsWrapper = document.createElement("div")
    variantsWrapper.classList.add("variants-wrapper")
    const dropdown = createDropdown(option.values)
    const selectedText = dropdown.querySelector("p")
    element.appendChild(dropdown)
    dropdown.appendChild(variantsWrapper)
    const prevText = selectedText.innerHTML;
    const newBall = document.createElement("span")
    newBall.classList.add("label-ball")
    newBall.classList.add("test-color")
    newBall.style.background = chooseBallColor(prevText)
    selectedText.innerHTML = newBall.outerHTML + prevText
    option.values.forEach(value => {
      const [wrapper, button] = createButton({ productId: option.id, variantId: value, text: value, hasImg: false })
      variantsWrapper.appendChild(wrapper)
      const labelBall = wrapper.querySelector(".label-ball");
      labelBall.classList.add("test-color");
      labelBall.querySelector("span").style.background = chooseBallColor(wrapper.querySelector(".label-text").innerHTML)
      button.addEventListener("change", () => {
        selectedText.innerHTML = labelBall.outerHTML + button.getAttribute("label-text")
      })
    })
    const inputs = variantsWrapper.querySelectorAll("input")
    inputs[0].checked = true
    return [variantsWrapper, selectedText]
  }


  const [primaryVariantsWrapper] = createPrimaryVariantWrapper(primaryOption, true)
  const secondaryVariantsWrapper = createTshirtSizesWrapper()

  primaryVariantsWrapper.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", () => {
      if (hasImg) {
        updateImageMultiple(product, input.value, img);
      }
      updateSizes(secondaryOption.id, secondaryVariantsWrapper, input.value)
    })
  })
  updateSizes(secondaryOption.id, secondaryVariantsWrapper, primaryVariantsWrapper.querySelector("input").value)
}

export { createButton, createVariantsWrapper, createMultipleOptionsDOM, createSimpleButton, handleButtonDropImg };
