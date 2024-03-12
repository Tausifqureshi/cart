// Access elements HTML
const renderData = document.querySelector("#renderdata");
const dynamicCount = document.querySelector(".dynamic-count");
const totalPrice = document.getElementById("total_price");
let quantity = 1; 
// Retrieve cart data from localStorage
let arr = JSON.parse(localStorage.getItem("cartData")) || [];

// Update total price function
function updateTotalPrice() {
  // const totalSum = arr.reduce((sum, item) => sum + item.price, 0);
  const totalSum = arr.reduce((sum, item) => sum + (item.price || 0), 0);
  totalPrice.textContent = `$Total Price:₹${totalSum.toFixed(2)}`;
  totalPrice.classList.add("removePriceTotal");
}

// Render cart items function
function renderCart() {
  dynamicCount.innerHTML = arr.length; // Update item count
  renderData.innerHTML = ""; //

  arr.forEach((item, index) => {
    const productMainDiv = document.createElement("div");
    productMainDiv.classList.add("box-main");

    //Create Image
    const createImage = document.createElement("img");
    // createImage.src = `${item.images}`;
    createImage.setAttribute('src', item.image)
    // createImage.classList.add("myimage");

    //Create Title
    const createTitle = document.createElement("p");
    createTitle.textContent = `${item.title.slice(0, 30)}`;
    createTitle.classList.add("removeTitle");

    //Create Title
    const createDescription = document.createElement("p");
    createDescription.textContent = ` ${item.description.slice(0, 32)}`;
    createDescription.classList.add("removeDescription");

    //Create Price
    const createtPrice = document.createElement("p");
    createtPrice.textContent = `$${item.price}`;
    createtPrice.classList.add("removePrice");

    //Create Button
    const removeButton = document.createElement("button");
    removeButton.textContent = `Delete`;
    removeButton.classList.add("removeButton");

    //Quantity functionality
    const createInput = document.createElement("input");
    createInput.setAttribute("value", item.quantity);
    createInput.classList.add("input");
    // createInput.disabled = true; // Disable direct input
    console.log(item.quantity)

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.classList.add("decrement-button");
    decrementButton.addEventListener("click", () => {
      if (item.quantity > 0) {
        item.quantity--;
        createInput.value = item.quantity;
        updateTotalPrice();
      }
    });

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.classList.add("increment-button");
    incrementButton.addEventListener("click", () => {
      item.quantity++;
      createInput.value = item.quantity;
      updateTotalPrice();
      window.location.reload()
    });


          // Quantity functionality
      // const decrementButton = document.createElement("button");
      // decrementButton.textContent = "-";
      // decrementButton.classList.add("decrement-button");
      // decrementButton.addEventListener("click", () => {
      //   if (item.quantity > 0) {
      //     item.quantity--;
      //     createInput.value = item.quantity;
      //     updateTotalPrice();
      //   }
      // });
  
      // const createInput = document.createElement("input");
      // createInput.setAttribute("value", item.quantity);
      // createInput.classList.add("input");
      // createInput.disabled = true; // Disable direct input
  
      // const incrementButton = document.createElement("button");
      // incrementButton.textContent = "+";
      // incrementButton.classList.add("increment-button");
      // incrementButton.addEventListener("click", () => {
      //   item.quantity++;
      //   createInput.value = item.quantity;
      //   updateTotalPrice();
      // });
    //Appending Element main div;
    productMainDiv.append(createImage,createTitle,createDescription,createtPrice,removeButton,decrementButton,createInput,incrementButton);
    renderData.append(productMainDiv);

    //Deleting AddEventListener Item;
    removeButton.addEventListener("click", () => removeItem(index));
  });
  updateTotalPrice(); // Update total price
}

// Remove item function 
function removeItem(index) {
  dynamicCount.innerHTML--;
  arr.splice(index, 1);
  localStorage.setItem("cartData", JSON.stringify(arr));
  renderCart();
}

// Initial render
renderCart();
