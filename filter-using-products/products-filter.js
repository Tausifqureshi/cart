(async () => {
    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("searchInput");
  
    const url = "https://fakestoreapi.com/products";
    const fetchProducts = async () => {
      try {
        const res = await fetch(url);
        return await res.json();
      } catch (error) {
        return error;
      }
    };
   
    const products = await fetchProducts();
  
    const generateProducts = (product) => {
      return `<div class="product_card">	
        <div class="image_container">	
          <img	
            src="${product.image}"	
            alt=""	
          />	
        </div>	
        <div class="product_content">	
          <h2>	
           ${product.title}	
          </h2>	
          <p>	
           ${product.description.split(" ").slice(0, 20).join(" ")}	
          </p>	
          <button>${product.price} $</button>	
        </div>	
      </div>`;
    };
  
    const renderProducts = (products) => {
      productContainerEl.innerHTML = "";
      products.forEach((product) => {
        productContainerEl.innerHTML += generateProducts(product);
      });
    };

    const  filterHandler =(event)=>{
      let searchText =event.target.value.toLowerCase();
      let filteredProducts =products.filter((product)=>{
        return(
            product.title.toLowerCase().includes(searchText),
            product.description.toLowerCase().includes(searchText),
            product.peice.toLowerCase().includes(searchText)
        ) 
      })
      renderProducts(filteredProducts)
    }

    searchInputEl.addEventListener("keyup", filterHandler);
  


  
    renderProducts(products);
    //  console.log( await fetchProducts())
  })(); //async inner arrow function  function call();