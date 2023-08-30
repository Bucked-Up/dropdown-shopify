import { createMultipleOptionsDOM } from "./domElements.js";

const multipleOptionsProduct = (product) => {
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

  createMultipleOptionsDOM(row[product.id], primaryOption, secondaryOption, product, (row[product.id].classList.contains("has-img") || row[product.id].classList.contains("has-img-desktop")));

  return true;
};

export default multipleOptionsProduct;
