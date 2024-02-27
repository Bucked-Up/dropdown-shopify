import toggleButton from "./toggleButton.js";
import { fetchUrl, apiOptions } from "../variables.js";
import toggleLoading from "./toggleLoading.js";
import { dataLayerRedirect } from "./dataLayer.js";

const getVariantId = (data) => {
  const variantId = {}
  if(data.quantity) variantId.quantity = data.quantity
  if (data.isHidden){
    variantId.id = data.variants[0].id
    return { result: variantId }
  }
  const primaryWrapper = document.querySelector(`[primary="${data.id}"]`)
  if (primaryWrapper) {
    const secondaryWrapper = document.querySelector(`.size-${data.id}`)
    const primary = Array.from(primaryWrapper.querySelectorAll("input")).filter(el => el.checked)[0]
    const secondary = Array.from(secondaryWrapper.querySelectorAll("input")).filter(el => el.checked)[0]
    if (!secondary) return { result: false, wrapper: secondaryWrapper }
    variantId.id = data.variants.filter(variant => (variant.title.includes(primary.value) && variant.title.includes(secondary.value)))[0].id
  }
  else {
    const input = Array.from(document.querySelectorAll(`[name="${data.id}"]`)).filter(el => el.checked)[0]
    if (!input) return { result: false, wrapper: document.querySelector(`.prod-${data.id}`) }
    variantId.id = input.value;
  }
  return { result: variantId }
}

const addDiscount = async (checkoutId, code) => {
  const postDiscount = async (code) => {
    const input = {
      checkoutId: checkoutId,
      discountCode: code,
    };
    const query = `
      mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
        checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
          checkout {
            id
            webUrl
          }
        }
      }
    `;
    const body = {
      query: query,
      variables: input,
    };
    const response = await fetch(fetchUrl, {
      ...apiOptions,
      body: JSON.stringify(body),
    });
    return response;
  };

  let response;
  for (let indivCode of code.split("-")) {
    response = await postDiscount(indivCode);
    if (!response.ok) return response;
  }

  return response;
};

const addCustomAttributes = async (attributes, id) => {
  const input = {
    "checkoutId": id,
    "input": {
      "customAttributes": attributes,
    }
  }
  const query = `
    mutation checkoutAttributesUpdateV2($checkoutId: ID!, $input: CheckoutAttributesUpdateV2Input!) {
      checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
        checkout {
          id
          customAttributes {
            key
            value
          }
        }
      }
    }
  `
  const body = {
    query: query,
    variables: input,
  };
  const response = await fetch(fetchUrl, {
    ...apiOptions,
    body: JSON.stringify(body),
  });
  return response
}

const startPopsixle = (id) => {
  if (typeof a10x_dl != 'undefined') {
    a10x_dl.unique_checkout_id = id;
    session_sync(a10x_dl.s_id, "unique_checkout_id", a10x_dl.unique_checkout_id);
  } else { console.warn("Popsixcle script not found.") }
}

//updates order
const buy = async (btn, data) => {
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    return;
  }

  let btnProducts = JSON.parse(btn.getAttribute("products"));
  if(btnProducts){
    data = data.filter((product)=>{
      if(Object.keys(btnProducts).includes(product.id)){
        product.quantity = btnProducts[product.id].quantity
        return true
      }
      return false
    })
  }

  const variantId = []

  let notSelected = false;
  for (let product of data) {
    const currentVariant = getVariantId(product)
    if (!currentVariant.result) {
      currentVariant.wrapper.classList.add("shake")
      notSelected = true;
      continue;
    }
    variantId.push(currentVariant.result)
  }
  if (notSelected) {
    alert("Select your choices")
    return;
  }

  toggleLoading();
  toggleButton(buyButton)

  const obj = variantId.map(variant => { return { "variantId": variant.id, "quantity": variant.quantity || +btn.getAttribute("quantity") || 1 } })
  const input =
  {
    "input": {
      "lineItems": [
        ...obj
      ]
    }
  }
    ;
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
          id
          currencyCode
        }
      }
    }
  `;
  const body = {
    query: query,
    variables: input,
  };
  try {
    const response = await fetch(fetchUrl, {
      ...apiOptions,
      body: JSON.stringify(body),
    });
    const apiData = await response.json();
    if (!response.ok)
      throw new Error("Api Error.")
    const checkoutId = apiData.data.checkoutCreate.checkout.id
    const btnDiscountCode = btn.getAttribute("discountCode")
    if (discountCode !== "" || btnDiscountCode) {
      const responseDiscount = await addDiscount(checkoutId, btnDiscountCode || discountCode)
      if (!responseDiscount.ok)
        throw new Error("Api Discount Error.")
    }

    startPopsixle(checkoutId.split("?key=")[1]);
    const attributesResponse = await addCustomAttributes([{
      "key": "unique_checkout_id",
      "value": `${checkoutId.split("?key=")[1]}`,
    }], checkoutId)
    if (!attributesResponse.ok) throw new Error("Attributes Error.")

    dataLayerRedirect(data);
    window.location.href = apiData.data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    alert("There was a problem. Please try again later.");
    console.error(error);
  }
};

export default buy;
