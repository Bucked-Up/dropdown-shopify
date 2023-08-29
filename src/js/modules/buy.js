import toggleButton from "./toggleButton.js";
import { fetchUrl, apiOptions } from "../variables.js";
import toggleLoading from "./toggleLoading.js";

const getVariantId = (data) =>{
  if(data.isHidden)
    return data.variants[0].id
  let variantId
  if(document.querySelector(`[multiple="${data.id}"]`)){
    const wrapper = document.getElementById(data.id)
    const [primary,secondary] = wrapper.querySelectorAll("select")
    variantId = data.variants.filter(variant=>(variant.title.includes(primary.value) && variant.title.includes(secondary.value)))[0].id
  }
  else{
    const input = Array.from(document.querySelectorAll(`[name="${data.id}"]`)).filter(el=>el.checked)[0]
    variantId = input.value;
  }
  return variantId
}

const addDiscount = async (checkoutId) =>{
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

//updates order
const buy = async (data) => {
  toggleLoading();
  if(!isKit)
    buyButton.forEach((btnArray) => {
      toggleButton(btnArray);
    });
  else
    toggleButton(buyButton)
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    return;
  }
  
  const variantId = []
  
  if(isKit){
    data.forEach(product=>{
      variantId.push(getVariantId(product))
    })
  }
  else
    variantId.push(getVariantId(data))

  const obj = variantId.map(id=>{return {"variantId": id,"quantity": 1}})
  const input = 
    {
      "input":{
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
    const responseLog = await response.json();
    if(!response.ok)
      throw new Error("Api Error.")
    if(discountCode !== ""){
      const responseDiscount = await addDiscount(responseLog.data.checkoutCreate.checkout.id)
      if(!responseDiscount.ok)
        throw new Error("Api Discount Error.")
    }
    dataLayerRedirect()
    window.location.href = responseLog.data.checkoutCreate.checkout.webUrl + `?${urlParams}`;
  } catch (error) {
    alert("There was a problem. Please try again later.");
    console.log(error);
  }
};

export default buy;
