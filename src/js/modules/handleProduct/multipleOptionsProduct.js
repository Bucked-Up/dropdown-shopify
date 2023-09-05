import { createMultipleOptionsDOM } from "./domElements.js";

const multipleOptionsProduct = (product) => {
  //filtrar com base no estoque de todas que tem essa opção
  const primaryOption = product.options[0];
  const secondaryOption = product.options[1];
  const currentRow = row[product.id]
  currentRow.setAttribute("primary", product.id)

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

  createMultipleOptionsDOM(currentRow, primaryOption, secondaryOption, product, (currentRow.classList.contains("has-img") || currentRow.classList.contains("has-img-desktop")));

  return true;
};

export default multipleOptionsProduct;
