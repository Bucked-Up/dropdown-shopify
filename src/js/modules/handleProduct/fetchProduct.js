import { apiOptions, fetchUrl } from "../../variables.js";
const fetchProduct = async ({ids,isHidden}) => {
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
    let data = await response.json();
    if (!response.ok) {
      throw new Error("Error Fetching Api.")
    }
    data = data.data.nodes;
    data.forEach((obj) => {
      if(isHidden)
        obj.isHidden = true
      obj.id = obj.id.split("/")
      obj.id = obj.id[obj.id.length - 1]
      obj.variants = obj.variants.edges.filter(edge=>edge.node.availableForSale);
      let minPrice = 99999;
      for (let key in obj.variants){
        obj.variants[key] = obj.variants[key].node;
        obj.variants[key].title = obj.variants[key].title.split("(")[0]
        if(obj.variants[key].price.amount < minPrice) minPrice = obj.variants[key].price.amount
      } 
      for (let key in obj.variants){
        if(obj.variants[key].price.amount > minPrice){
          const string = `(+$${(obj.variants[key].price.amount - minPrice).toFixed(2)})`
          obj.variants[key].title = obj.variants[key].title + string
        }
      }
    });
    return data
  }catch(error){
    alert("Product not found.")
    console.log(error);
    return null;
  }
};

export default fetchProduct;
