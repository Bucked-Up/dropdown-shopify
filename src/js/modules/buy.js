import toggleButton from "./toggleButton.js";
import { fetchUrl, apiOptions } from "../variables.js";
import toggleLoading from "./toggleLoading.js";
import { dataLayerRedirect } from "./dataLayer.js";

const toggleShake = () => {
  const body = document.querySelector("body");
  body.classList.toggle("shake");
}

const getVariantId = (data) => {
  if (data.isHidden)
    return data.variants[0].id
  let variantId
  const primaryWrapper = document.querySelector(`[primary="${data.id}"]`)
  if (primaryWrapper) {
    const secondaryWrapper = document.querySelector(`.size-${data.id}`)
    const primary = Array.from(primaryWrapper.querySelectorAll("input")).filter(el => el.checked)[0]
    const secondary = Array.from(secondaryWrapper.querySelectorAll("input")).filter(el => el.checked)[0]
    variantId = data.variants.filter(variant => (variant.title.includes(primary.value) && variant.title.includes(secondary.value)))[0].id
  }
  else {
    const input = Array.from(document.querySelectorAll(`[name="${data.id}"]`)).filter(el => el.checked)[0]
    if (!input) return false
    variantId = input.value;
  }
  return variantId
}

const addDiscount = async (checkoutId) => {
  const input = {
    "checkoutId": checkoutId,
    "discountCode": discountCode
  }
  const query = `
    mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
      checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
        checkout {
          id
          webUrl
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
  } else { console.log("Popsixcle script not found.") }
}

//updates order
const buy = async (data) => {
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    return;
  }

  const variantId = []

  if (isKit) {
    const sizes = document.querySelectorAll(".sizes-wrapper input");
    const checkSizes = (el) => el.checked;
    if (!Array.from(sizes).some(checkSizes)) {
      alert("Select your choices")
      toggleShake();
      return;
    }
    
    for (let product of data) {
      const currentVariant = getVariantId(product)
      if (!currentVariant) {
        alert("Select your choices")
        toggleShake();
        return;
      }
      variantId.push(getVariantId(product))
    }
  }
  else {
    const currentVariant = getVariantId(product)
    if (!currentVariant) {
      alert("Select your choices")
      toggleShake();
      return;
    }
    variantId.push(getVariantId(data))
  }
  toggleLoading();
  if (!isKit)
    buyButton.forEach((btnArray) => {
      toggleButton(btnArray);
    });
  else
    toggleButton(buyButton)

  const obj = variantId.map(id => { return { "variantId": id, "quantity": 1 } })
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
    const data = await response.json();
    if (!response.ok)
      throw new Error("Api Error.")
    const checkoutId = data.data.checkoutCreate.checkout.id

    if (discountCode !== "") {
      const responseDiscount = await addDiscount(checkoutId)
      if (!responseDiscount.ok)
        throw new Error("Api Discount Error.")
    }

    startPopsixle(checkoutId.split("?key=")[1]);
    const attributesResponse = await addCustomAttributes([{
      "key": "unique_checkout_id",
      "value": `${checkoutId.split("?key=")[1]}`,
    }], checkoutId)
    if (!attributesResponse.ok) throw new Error("Attributes Error.")

    dataLayerRedirect();
    window.location.href = data.data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    alert("There was a problem. Please try again later.");
    console.log(error);
  }
};

export default buy;
