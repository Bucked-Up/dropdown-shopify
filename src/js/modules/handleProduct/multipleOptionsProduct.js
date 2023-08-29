import { updateImageMultiple, createButton } from "./domElements.js";

const multipleOptionsProduct = (product, btnIndex) => {
  //filtrar com base no estoque de todas que tem essa opção
  const primaryOption = product.options[0];
  const secondaryOption = product.options[1];
  row[product.id].setAttribute("multiple", product.id)

  //filtra opção primária com base em estoque
  primaryOption.values = primaryOption.values.filter((value) => {
    for (let variant of product.variants) {
      if (
        variant.selectedOptions[0].value === value &&
        variant.availableForSale
      )
        return true;
    }
    return false;
  });

  const createDropdown = (values) => {
    const dropdown = document.createElement("div");
    const p = document.createElement("p");
    const svg = '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"/></svg>'
    dropdown.setAttribute("role", "button");
    dropdown.classList.add("dropdown-mobile")
    p.innerHTML = values[0].title || values[0];
    dropdown.appendChild(p)
    dropdown.insertAdjacentHTML('beforeend', svg)
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    })
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target))
        dropdown.classList.remove("active")
    })
    return dropdown
  }

  const updateSizes = (optionId, secondaryWrapper, secondarySelected, primarySelected) => {
    secondaryWrapper.innerHTML = ""
    console.log(product)
    product.variants.forEach(variant => {
      const newValue = variant.selectedOptions[1].value
      if (variant.title.includes(primarySelected) && !secondaryWrapper.innerHTML.includes(newValue)) {
        const button = createButton(optionId, newValue, newValue, false)[0]
        secondaryWrapper.appendChild(button)
        button.querySelector("input").addEventListener("change", (e) => {
          if (e.target.checked)
            secondarySelected.innerHTML = e.target.getAttribute("label-text")
        })
      }
    })

    const inputs = secondaryWrapper.querySelectorAll("input")
    inputs[0].checked = true
    inputs.forEach(input => {
      input.setAttribute("is", "secondary")
    })
    secondarySelected.innerHTML = inputs[0].value
  }

  const createMultipleOptionsDOM = (element, primaryOption, secondaryOption, product, hasImg) => {
    let img
    if (hasImg) {
      img = document.createElement("img")
      img.classList.add("dropdown-img")
      updateImageMultiple(product, product.variants[0].title, img)
      element.appendChild(img)
    }

    const createVariantWrapper = (option, isPrimary = false) => {
      const variantsWrapper = document.createElement("div")
      variantsWrapper.classList.add("variants-wrapper")
      const dropdown = createDropdown(option.values)
      const selectedText = dropdown.querySelector("p")
      element.appendChild(dropdown)
      element.appendChild(variantsWrapper)
      option.values.forEach(value => {
        const [wrapper, button] = createButton(option.id, value, value, false)
        variantsWrapper.appendChild(wrapper)
        button.addEventListener("change", () => {
          if (button.checked)
            selectedText.innerHTML = button.getAttribute("label-text")
        })
      })
      const inputs = variantsWrapper.querySelectorAll("input")
      inputs[0].checked = true
      if (isPrimary) {
        inputs.forEach(input => {
          input.setAttribute("is", "primary")
        })
        return [variantsWrapper, selectedText]
      }
      inputs.forEach(input => {
        input.setAttribute("is", "secondary")
      })
      return [variantsWrapper, selectedText]
    }


    const [primaryVariantsWrapper, primarySelectedText] = createVariantWrapper(primaryOption, true)
    const [secondaryVariantsWrapper, secondarySelectedText] = createVariantWrapper(secondaryOption)

    primaryVariantsWrapper.querySelectorAll("input").forEach(input => {
      input.addEventListener("change", () => {
        if (input.checked) {
          if (hasImg) {
            updateImageMultiple(product, input.value, img);
          }
          updateSizes(secondaryOption.id, secondaryVariantsWrapper, secondarySelectedText, input.value)
        }
      })
    })
  }

  createMultipleOptionsDOM(row[product.id], primaryOption, secondaryOption, product, true);

  return true;
};

export default multipleOptionsProduct;
