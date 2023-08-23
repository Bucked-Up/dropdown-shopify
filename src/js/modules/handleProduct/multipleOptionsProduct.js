import { createElement, updateImageMultiple, createOption } from "./domElements.js";

const multipleOptionsProduct = (product, btnIndex) => {
  //filtrar com base no estoque de todas que tem essa opção
  const primaryOption = product.options[1];
  const secondaryOption = product.options[0];

  //filtra opção primária com base em estoque
  primaryOption.values = primaryOption.values.filter((value) => {
    for (let variant of product.variants) {
      if (
        variant.selectedOptions[1].value === value &&
        variant.availableForSale
      )
        return true;
    }
    return false;
  });

  const createDropdown = (option, primaryElement = false) => {
    const newElement = createElement();
    newElement.selectWrapper.id = product.id
    if (!primaryElement) {
      row[product.id].appendChild(newElement.col);
    } else {
      primaryElement.selectWrapper.appendChild(newElement.select);
    }
    newElement.select.id = option.id;
    option.values.forEach((value) => {
      newElement.select.appendChild(createOption(`${value}`, value));
    });
    return newElement;
  };

  const primaryElement = createDropdown(primaryOption);
  const secondaryElement = createDropdown(secondaryOption, primaryElement);

  primaryElement.col.setAttribute("multiple",product.id)

  primaryElement.select.addEventListener("change", () => {
    // updateImageMultiple(product, primaryElement.select.value, primaryElement);
    updateSizes();
  });  

  // updateImageMultiple(product, product.variants[0].title, primaryElement);

  //percorrer as variantes filtradas com base no primaryOption title que tenham secondaryOption title tb
  const updateSizes = () =>{
    const primarySelect = primaryElement.select
    const secondarySelect = secondaryElement.select
    secondarySelect.innerHTML = ""
    product.variants.forEach(variant=>{
      const newValue = variant.selectedOptions[0].value
      if(variant.title.includes(primarySelect.title) && !secondarySelect.innerHTML.includes(newValue)){
        secondarySelect.appendChild(createOption(newValue, newValue))
      }
    })
    updateSelect(secondarySelect)
  }
  return true;
};

export default multipleOptionsProduct;
