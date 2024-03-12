let mainCrads = document.querySelector(".cards");
let renderCartData = document.querySelector(".renderDataCart");
let totalPrice = document.getElementById("totalPrice");

let calculeteTotal = [];
let arr = [];
// console.log(quantity)
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
function renderProducts(data) {
  data.forEach((item) => {
    let productMainDiv = document.createElement("div");
    productMainDiv.setAttribute("class", "box-main");

    let product = `
<div class="card">
    <img src=${item.image} alt="" class="itemImg">
    <p class="itemTitle">${item.title.slice(0, 30)}</p>
    <p class="itemDes">${item.description.slice(0, 30)}...</p>
    <p class="itemPrice">$${item.price}</p>
    <button class="addToCart">Add to Cart</button>
</div>

`;
    // let createImage = document.createElement("img");
    // createImage.src= products.image;

    // console.log(data1)

    productMainDiv.innerHTML = product;
    mainCrads.append(productMainDiv);
    productMainDiv
      .querySelector(".addToCart")
      .addEventListener("click", () => addToCart(item));
  });
  //   mainCrads.innerHTML +=product;
}

function addToCart(productitem) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  // console.log(cartData);

  const isItemExist = cartData.find((curItem) => curItem.id == productitem.id);
  if (isItemExist) {
    alert("Products Already Exist");
    return;
  }

  // alert("Products Add");
  arr.push(productitem);
  console.log(arr);
  let cartMDiv = document.createElement("div");
  cartMDiv.setAttribute("id", productitem.id);
  cartMDiv.classList.add("cartStyling");

  let products = `
<div class="cart">
 <p id="totalPrice"></p>
    <img src=${productitem.image} alt="" class="cartImg">
    <p class="cartTitle">${productitem.title.slice(0, 30)}</p>
    <p class="cartPrice">$${productitem.price}</p>
    <div class="quntit">
    <button class="cartDecre">-</button>
   <input type="text" value="1" min="1" class="input">
   <button class="cartIncre">+</button>
   </div>
   <button class="cartDelete">Delete</button>
</div>

`;

  cartMDiv.innerHTML = products;
  renderCartData.append(cartMDiv);
  // alert('Products add')
  // const cartItem = {
  //   ...productitem,
  // };
  cartData.push({ ...productitem, quantity: 1 });
  console.log(cartData);
  // cartData.push(cartItem);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  cartMDiv
    .querySelector(".cartDelete")
    .addEventListener("click", () => deleteCart(productitem.id));

  calculeteTotal.push({ price: productitem.price, quantity: 1 });
  updateTotalPrice(calculeteTotal);

  let quantity = 1; // Initialize quantity to 1 when the item is added to the cart
  // Select the quantity input and buttons within the cart div
  const quantityInput = cartMDiv.querySelector(".input");
  const incrementButton = cartMDiv.querySelector(".cartIncre");
  const decrementButton = cartMDiv.querySelector(".cartDecre");

  incrementButton.addEventListener("click", () => {
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice(calculeteTotal); // Update total price when quantity changes
  });

  decrementButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      updateTotalPrice(calculeteTotal); // Update total price when quantity changes
    }
  });
}

function deleteCart(id) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const updatedCartData = cartData.filter((item) => item.id !== id);
  localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  // const cartDiv = document.getElementById(item);
  const cartDiv = document.getElementById(id);
  cartDiv.remove();
  // updateTotalPrice()
  calculeteTotal.pop();
  updateTotalPrice(calculeteTotal);
}
function updateTotalPrice(prices) {
  // const totalPriceValue = prices.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  const totalPriceValue = prices.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `Total Price: $${totalPriceValue.toFixed(2)}`;
}



getData();





















