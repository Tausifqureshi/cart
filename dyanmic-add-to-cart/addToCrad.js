// Single page pe hi create karte hai add to cart to ye code use share function alag alag create

let renderData = document.getElementById("renderdata");
let renderCartData = document.querySelector(".rendercartdata");
let dynamic_count = document.querySelector(".dynamic-count");
let arr = [];
let total_price = document.getElementById("total_price");
let calculeteTotal = [];
let tContainer = document.querySelector(".tContainer");

// Get Data API Function
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

//API se data ara products create function
function renderProducts(data) {
  data.map((products) => {
    // Creating Element
    let productMainDiv = document.createElement("div");
    let createImageEle = document.createElement("img");
    let cretaTitle = document.createElement("p");
    let createPriceEle = document.createElement("p");
    let btnEle = document.createElement("button");
    let btnText = document.createTextNode("Add to Cart");
    let createPriceText = document.createTextNode(`$${products.price}`);
    let cretaTextTitle = document.createTextNode(
      `${products.title.slice(0, 30)}...`
    );

    let createDescriptionEle = document.createElement("p");
    let createDescriptionText = document.createTextNode(products.description);

    // Attribute Set And Appending Sinlling child
    createImageEle.setAttribute("src", products.image);
    createImageEle.setAttribute("class", "myimage");
    productMainDiv.setAttribute("class", "box-main");
    cretaTitle.appendChild(cretaTextTitle);
    cretaTitle.setAttribute("class", "productTitle");
    createPriceEle.appendChild(createPriceText);
    createPriceEle.setAttribute("class", "price-element");
    // createDescriptionEle.appendChild(createDescriptionText)

    btnEle.appendChild(btnText);
    btnEle.setAttribute("class", "btn-element");

    // Appending Element Glob div to access div;
    // document.body.appendChild(createImageEle)
    productMainDiv.appendChild(createImageEle);
    productMainDiv.appendChild(cretaTitle);
    productMainDiv.appendChild(createPriceEle);
    productMainDiv.appendChild(createDescriptionEle);
    productMainDiv.append(btnEle);
    renderData.appendChild(productMainDiv);
    btnEle.addEventListener("click", () => addToCart(products));
  });
}

// Addtocaret functio
function addToCart(productitem) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const isItemExist = cartData.find((curItem) => curItem.id == productitem.id);
  if (isItemExist) {
    alert("Products Already Exist");
    return;
  }
  // alert("Producta Added to Cart");
  // arr.push({ image:img, basprice: price});
  arr.push(productitem);
  console.log(arr);

  dynamic_count.innerHTML++;
  //   console.log(arr);

  let cartMDiv = document.createElement("div");
  cartMDiv.setAttribute("class", "cart-styling");
  cartMDiv.setAttribute("id", productitem.id);
  let createImageEle = document.createElement("img");
  let cartTras = document.createElement("i"); //dynamic icon add cdn
  cartTras.setAttribute("class", "fa-sharp fa-solid fa-trash");

  //addtocart peclick producht add price show hoga;
  tContainer.style.display = "flex";

  createImageEle.setAttribute("src", productitem.image);
  createImageEle.setAttribute("class", "cartimage");
  let cartPriceEle = document.createElement("p");
  let cartPriceText = document.createTextNode(`$${productitem.price}`);
  cartPriceEle.setAttribute("class", "cart-price");
  cartPriceEle.append(cartPriceText);
  let createDescription = document.createElement("p");
  createDescription.setAttribute("class", "title-p");
  let createDescriptionText = document.createTextNode(productitem.title);
  createDescription.appendChild(createDescriptionText);

  cartMDiv.append(createImageEle);
  cartMDiv.append(cartPriceEle);
  cartMDiv.append(cartTras);
  cartMDiv.append(createDescription);
  renderCartData.appendChild(cartMDiv);

  //Items Deleting addEventListener cartMdiv
  cartTras.addEventListener("click", () => deleteItem(productitem.id));
  //Items Deleting function
  //   localStorage.setItem("cartData", JSON.stringify(cartData));
  // window.location.reload()

  calculeteTotal.push(productitem.price);
  updateTotalPrice(calculeteTotal);

  const cartItem = {
    ...productitem,
  };
  console.log(cartItem);
  cartData.push(cartItem);
  localStorage.setItem("cartData", JSON.stringify(cartData));
}

//Delete Function
function deleteItem(id) {
  dynamic_count.innerHTML--;
  const cartMDiv = document.getElementById(id);
  if (cartMDiv) {
    cartMDiv.remove();
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedCartData = cartData.filter((item) => item.id !== id);
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  }

  calculeteTotal.pop();
  updateTotalPrice(calculeteTotal);
}

// Pirce Function
function updateTotalPrice(prices) {
  const totalPriceValue = prices.reduce((total, item) => total + item, 0);
  console.log(totalPriceValue + "totalPriceValue");
  total_price.textContent = `Total Price: $${totalPriceValue.toFixed(2)}`;

  // if(total_price.value < 0){
  //   total_price.innerText ="your car is empty" ;
  // }
}

getData();
