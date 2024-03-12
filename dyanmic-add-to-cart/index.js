//ddtocart code jab ek page pe hi create cart but diffrence ya hai alag alag function nhi getData me hi share create it's not good  practice only idea knowlaging ?

let renderData = document.getElementById("renderdata");
let renderCartData = document.querySelector(".rendercartdata");
let dynamic_count = document.querySelector(".dynamic-count");
let arr = [];

let total_price = document.getElementById("total_price");
let calculeteTotal = [];

let tContainer = document.querySelector(".tContainer");

// Data get api? 
async function getData() {
  const respons = await fetch("https://fakestoreapi.com/products");
  const data = await respons.json();
  console.log(data);

  data.map((ele) => {
    // Creating Element
    let productMainDiv = document.createElement("div");
    let createImageEle = document.createElement("img");
    let cretaTitle = document.createElement("p");
    let createPriceEle = document.createElement("p");
    let btnEle = document.createElement("button");
    let btnText = document.createTextNode("Add to Cart");
    let createPriceText = document.createTextNode(`$${ele.price}`);
    let cretaTextTitle = document.createTextNode(
      `${ele.title.slice(0, 30)}...`
    );

    // Attribute Set And Appending Sinlling child
    createImageEle.setAttribute("src", ele.image);
    createImageEle.setAttribute("class", "myimage");
    productMainDiv.setAttribute("class", "box-main");
    cretaTitle.appendChild(cretaTextTitle);
    cretaTitle.setAttribute("class", "productTitle");
    createPriceEle.appendChild(createPriceText);
    createPriceEle.setAttribute("class", "price-element");
    btnEle.appendChild(btnText);
    btnEle.setAttribute("class", "btn-element");
    btnEle.addEventListener("click", () =>{
      addToCart(ele.image, ele.price, ele.title, ele.id)
      // window.location.href = 'item.html';
  });
    // Appending Element Glob div to access div;
    // document.body.appendChild(createImageEle)
    productMainDiv.appendChild(createImageEle);
    productMainDiv.appendChild(cretaTitle);
    productMainDiv.appendChild(createPriceEle);
    productMainDiv.append(btnEle);
    renderData.appendChild(productMainDiv);

    // add to cart function
    function addToCart(img, price, dec, id) {
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const isItemExist = cartData.find((curItem) => curItem.id == ele.id);
      if (isItemExist) {
        alert("Products Already Exist");
        return;
      }
      // alert("Producta Added to Cart");

      arr.push({ image: img, basprice: price, des: dec, idnum: id });
      dynamic_count.innerHTML++;
      console.log(arr);

      let cartMDiv = document.createElement("div");
      cartMDiv.setAttribute("class", "cart-styling");
      cartMDiv.setAttribute("id", id);
      let createImageEle = document.createElement("img");
      let cartTras = document.createElement("i"); //dynamic icon add cdn
      cartTras.setAttribute("class", "fa-sharp fa-solid fa-trash");

      //addtocart peclick producht add price show hoga;
      tContainer.style.display = "flex";

      createImageEle.setAttribute("src", img);
      createImageEle.setAttribute("class", "cartimage");
      let cartPriceEle = document.createElement("p");
      let cartPriceText = document.createTextNode(`$${price}`);
      cartPriceEle.setAttribute("class", "cart-price");
      cartPriceEle.append(cartPriceText);
      let createDescription = document.createElement("p");
      createDescription.setAttribute("class", "title-p");
      let createDescriptionText = document.createTextNode(dec);
      createDescription.appendChild(createDescriptionText);

      cartMDiv.append(createImageEle);
      cartMDiv.append(cartPriceEle);
      cartMDiv.append(cartTras);
      cartMDiv.append(createDescription);
      renderCartData.appendChild(cartMDiv);

      //Items Deleting addEventListener cartMdiv
      cartTras.addEventListener("click", () => deleteItem(id));
      //Items Deleting function
      localStorage.setItem("cartData", JSON.stringify(cartData));
      // window.location.reload()
     
     
      

      function deleteItem(id) {
        dynamic_count.innerHTML--;
        const cartMDiv = document.getElementById(id);
        if (cartMDiv) {
          cartMDiv.remove();
          const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
          const updatedCartData = cartData.filter((item) => item.id !== id);
          localStorage.setItem("cartData", JSON.stringify(updatedCartData));
        }

        ;
        calculeteTotal.pop(price);
        updateTotalPrice(calculeteTotal);        

      }

      const cartItem = {
        ...ele,
      };
      calculeteTotal.push(price);
      updateTotalPrice(calculeteTotal);
      cartData.push(cartItem);
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }

    function updateTotalPrice(prices) {
      const totalPriceValue = prices.reduce((total, item) => total + item, 0);
      console.log(totalPriceValue + "totalPriceValue");
      total_price.textContent = `Total Price: $${totalPriceValue.toFixed(2)}`;
      // if(total_price.value < 0){
      //   total_price.innerText ="your car is empty" ;
      // }   
    }
  });
}
getData();







