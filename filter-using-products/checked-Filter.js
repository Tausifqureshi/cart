// let productsDiv = document.querySelector(".products");
// let categoryDivList = document.querySelector(".categoryList");
// let allCate = [];
// async function getData(allCheckCat=[]) {
//   // e.preventDefault()
//   productsDiv.innerHTML = "";
//   // categoryDivList.innerHTML = "";
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data = await response.json();
//     data.forEach((item) => {
//       //dynamic label render
//       // catefory ke liye use ye if
//       if (!allCate.includes(item.category)) {
//         categoryDivList.innerHTML +=`
//        <label for="">
//        <input type="checkbox" onclick="categoryFilter()"value="${item.category}"> ${item.category}
//        </label>`;
//        allCate.push(item.category)
//       }
      
//       // filter ke liye use ye if
//       if (allCheckCat.length == 0) {
//         allCheckCat=allCate
//             }
//       if (allCheckCat.includes(item.category)) {
                 
        

//       //dyanmic products render
//       productsDiv.innerHTML += `
//      <div class="productsItems">
//       <img src=${item.image} alt="" class="image">
//       <h4 class="title">${item.title.slice(0, 30)}</h4>
//       <p class="price">$${item.price} ${item.rating.rate}</p>
//       <h4 class="category">${item.category}</h4>
  
//     </div>
//   `;
//       }
//       // <p class="itemcate">${item.description.slice(0, 30)}...</p>
//     });
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//   }
// }
// getData();

// let categoryFilter = ()=>{
// //  console.log('Checked')
// let checkInput = document.querySelectorAll("input[type='checkbox']");
// let checkData=[];
// checkInput.forEach((e)=>{
//   // console.log(checkedValue)
//   if (e.checked) {
//     //  console.log(checkedValue)
//     checkData.push(e.value)
//   }
// })
// // console.log(checkData)
// getData(checkData)




// }



const productsDiv = document.querySelector(".products");
const categoryDivList = document.querySelector(".categoryList");
let allCate = [];

// Fetch data function
async function fetchData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Render categories function
function renderCategories(categories) {
  categoryDivList.innerHTML = "";
  categories.forEach(category => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${category}" /> ${category}
    `;
    label.querySelector("input").addEventListener("change", categoryFilter);
    categoryDivList.appendChild(label);
  });
}

// Render products function
function renderProducts(data, selectedCategories) {
  productsDiv.innerHTML = "";
  data.forEach(item => {
    if (selectedCategories.includes(item.category)) {
      const productDiv = document.createElement("div");
      productDiv.classList.add("productsItems");
      productDiv.innerHTML = `
        <img src="${item.image}" alt="" class="image">
        <h4 class="title">${item.title.slice(0, 30)}</h4>
        <p class="price">$${item.price} ${item.rating.rate}</p>
        <h4 class="category">${item.category}</h4>
      `;
      productsDiv.appendChild(productDiv);
    }
  });
}

// Category filter function
function categoryFilter() {
  const checkedCheckboxes = Array.from(categoryDivList.querySelectorAll("input[type='checkbox']:checked"));
  const selectedCategories = checkedCheckboxes.map(checkbox => checkbox.value);
  getData(selectedCategories);
}

// Get data function
async function getData(selectedCategories = []) {
  productsDiv.innerHTML = ""; // Clear products
  const data = await fetchData();
  if (data) {
    data.forEach(item => {
      if (!allCate.includes(item.category)) {
        allCate.push(item.category);
      }
    });
    renderCategories(allCate);
    const categoriesToShow = selectedCategories.length > 0 ? selectedCategories : allCate;
    renderProducts(data, categoriesToShow);
  }
}

// Initial data fetch and rendering
getData();














