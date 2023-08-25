import toggleLoading from "../toggleLoading.js";
import { apiOptions, fetchUrl } from "../../variables.js";
const fetchProduct = async (ids,data) => {
  toggleLoading();
  const query = `
  { 
    nodes(ids: [${ids.map((id) => `"gid://shopify/Product/${id}"`)}]) {
      ... on Product {
        availableForSale
        title
        id
        options{
          ... on ProductOption{
            id
            name
            values
          }
        }
        variants(first: 100) {
          edges{
            node{
              id
              title
              availableForSale
              selectedOptions{
                name
                value
              }
              price{
                amount
              }
              image {
                ... on Image {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  try{
    const response = await fetch(fetchUrl,
      {
        ...apiOptions,
        body: JSON.stringify({ query: query }),
      }
    );
    data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error("Error Fetching Api.")
    }
    data = await response.json();
    data = data.data.nodes;
    data.forEach((obj) => {
      obj.id = obj.id.split("/")
      obj.id = obj.id[obj.id.length - 1]
      obj.variants = obj.variants.edges.filter(edge=>edge.node.availableForSale);
      for (let key in obj.variants) obj.variants[key] = obj.variants[key].node;
    });
    toggleLoading()
    return data
  }catch(error){
    alert("Product not found.")
    console.log(error);
    return null;
  }
};

export default fetchProduct;
