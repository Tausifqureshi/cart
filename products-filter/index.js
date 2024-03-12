
let products = {
    data: [
        {
            productsName: "Reguler White T-Shirt",
            category: "Topwear",
            price: "30",
            image: "image/bz1.png",
        },
        {
            productsName: "Beige Short Skirt",
            category: "Bottomwear",
            price: "49",
            image: "image/bz2.png",
        },
        {
            productsName: "Sporty SmartWatch",
            category: "watch",
            price: "99",
            image: "image/wa1.png",
        },
        {
            productsName: "Basic knitten Top",
            category: "Topwaer",
            price: "29",
            image: "image/bz4.png",
        },
        {
            productsName: "Black Leather Jacket",
            category: "jacket",
            price: "129",
            image: "image/jacket1.png",
        },
        {
            productsName: "Stylish Pink Trousers",
            category: "Bottomwear",
            price: "89",
            image: "image/Trousers.png",
        },
        {
            productsName: "Brown Men's Jacket",
            category: "Jacket",
            price: "189",
            image: "image/brow-jacket.png",
        },
        {
            productsName: "Comfy Gray Pants",
            category: "Bottomwear",
            price: "49",
            image: "image/comfy-gray-pants.jpg",
        },
    ],
};
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card", product. category.toLowerCase(), "hide");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    const image = document.createElement("img");
    image.setAttribute("src", product.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);

    const container = document.createElement("div");
    container.classList.add("container");

    const name = document.createElement("h5");
    name.classList.add("products-name");
    name.innerText = product.productsName;

    const price = document.createElement("h6");
    price.innerText = `$${product.price}`;
    container.appendChild(price);

    container.appendChild(name);
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

function filterProducts(value) {
    const buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        button.classList.toggle("active", value.toUpperCase() === button.innerText.toUpperCase());
    });

    const elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        const category = element.classList[1]; // Assuming category class is the second class
        if (value === 'all' || category.toLowerCase() === value.toLowerCase()) {
            element.classList.remove('hide');
        } else {
            element.classList.add('hide');
        }
    });

}

document.getElementById("search").addEventListener('click', () => {
let searchInput = document.getElementById("search-input").value;
let elements = document.querySelectorAll(".products-name");
let cards = document.querySelectorAll(".card");

elements.forEach((element, index) => {
if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
    cards[index].classList.remove("hide");
} else {
    cards[index].classList.add("hide");
}
});
});


window.onload = () => {
    products.data.forEach((product) => createProductCard(product));
    filterProducts('all');
};

























































