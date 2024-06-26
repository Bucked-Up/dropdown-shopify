# DEPRECATED, use cart-shopify with noCart:true instead.

## How to put into instapage

### 1. Place this code into html/css head, change primary and secondary as needed.

```
<style>
  :root{
    --primary: #0038FF;
    --secondary: #E3F5FF;
    --text-color: black;
  }
  /* if dropdowns, put the id of each dropdown html block. */
  #element-,#element-{
    max-height: 2.9456rem !important;
  }
</style>
<script>
  const getCdnStyle = () =>{
    const cdnStyle = document.createElement("link");
    cdnStyle.rel = "stylesheet";
    const currentTime = Math.floor(+new Date() / (60 * 60 * 1000))
    cdnStyle.href = `https://cdn.jsdelivr.net/gh/Bucked-Up/dropdown-shopify@2/src/scss/style.css?t=${currentTime}`
    document.head.appendChild(cdnStyle)
  }
  getCdnStyle();
</script>
```

### 2. Place this code into a html block, where you want the product to be (one for each product) (change the 999 for the product id)

```
<div class="products-list prod-999">

</div>
```

### 2.0 If tshirt, place this one as well

```
<div class="products-list size-999">

</div>
```

### 2.1. The div can have the following classes:

1. has-dropdown: will be a dropdown

2. has-dropdown-mobile: will be dropdown only on mobile

3. has-img: will show image above the buttons or dropdown

4. has-img-desktop: will show image only on desktop

5. no-name-mobile: will remove the name from the button on mobile

6. move-last-variant: will move the last variant to a separete html block

```
<div class="last-variant prod-999">

</div>
```

### 2.2. The div can have the following attributes:

1. dropdown-text: there wont be a selected variant from the start.

### 2.3. If you have optional products, place the following html blocks:

```
<div class="products-list optional-prod-999">

</div>
```

```
<div class="products-list optional-products has-img">

</div>
```

### 3. Place this code and change as necessary into html/css footer

```
<script>
  const step_count = "";
  const page_id = "";
  const version_id = "";

  const productsID = [999,999]; //ID of each the product
  const hiddenProducts = [999,999]
  const optionalProducts = []
  const buyButtonsIds = ["#element-"]; //IDs of each button of each product(in the order put in productID).
  const discountCode = ""
  const lastVariantElements = [] //for when last variant is moved.

  //stop here.
  const urlParams = new URLSearchParams(window.location.search);
  const origin = window.location.pathname.replace("/", "").replace("/", "");
  const getTopLevelDomain = () => {
    const fullDomain = window.location.hostname;
    const domainRegex = /\.([a-z]{2,})\.([a-z]{2,})$/;
    const match = fullDomain.match(domainRegex);
    if (match) {
        return `.${match[1]}.${match[2]}`;
    } else {
        return fullDomain;
    }
	};
  const cookieConfig = `path=/; domain=${getTopLevelDomain()};max-age=3600`;
  document.cookie = `offer_id=${discountCode};${cookieConfig}`;
  document.cookie = `page_id=${page_id};${cookieConfig}`;
  urlParams.forEach((value, key) => {
    document.cookie = `${key}=${value};${cookieConfig}`;
  });
  localStorage.setItem("first_page", origin);

  const buyButton = [];
  const row = {};

  const getCdnScript = () =>{
    const cdnScript = document.createElement("script");
    cdnScript.type = "module";
    const currentTime = Math.floor(+new Date() / (60 * 60 * 1000))
    cdnScript.src = `https://cdn.jsdelivr.net/gh/Bucked-Up/dropdown-shopify@2/src/js/scripts.js?t=${currentTime}`
    document.body.appendChild(cdnScript)
  }
  getCdnScript();
</script>
```

You can add how much you want from the product depending on the button, the discountCode and the products you want from the specific button.
(the quantity in the "products" takes priority)
Ex:

```
const buyButtonsIds = ["#element-1",{id: "#element-2", quantity: 2, discountCode: "code", products: '{"991": {"quantity": 1},"992": {"quantity": 2}}'}]
```

You can specify whitch variant of the product like so: "productID-variantID". Ex:

```
["999-875",998]
```

## How to compile scss

### either install the compiler from the sass website, or install the vscode extension live sass compiler.
