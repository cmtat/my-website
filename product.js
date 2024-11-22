document.addEventListener("DOMContentLoaded", async () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Fetch product details
    const response = await fetch(`/api/products.js`);
    const products = await response.json();
    const product = products.data.find((item) => item.id === productId);

    if (product) {
        displayProductDetails(product);
    } else {
        document.getElementById("product-container").innerHTML = "Product not found.";
    }
});

// Function to display product details
function displayProductDetails(product) {
    const container = document.getElementById("product-container");
    container.innerHTML = `
        <h1>${product.title}</h1>
        <img src="${product.images[0].src}" alt="${product.title}" />
        <p>${product.description}</p>
        <h3>Price: $${(product.variants[0].price / 100).toFixed(2)}</h3>
        
        <label for="size">Select Size:</label>
        <select id="size">
            ${product.options
                .find((option) => option.type === "size")
                .values.map((size) => `<option value="${size.id}">${size.title}</option>`)
                .join("")}
        </select>
        
        <label for="color">Select Color:</label>
        <select id="color">
            ${product.options
                .find((option) => option.type === "color")
                .values.map((color) => `<option value="${color.id}">${color.title}</option>`)
                .join("")}
        </select>
        
        <button id="add-to-cart">Add to Cart</button>
    `;

    document.getElementById("add-to-cart").addEventListener("click", () => {
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;
        addToCart(product.id, size, color);
    });
}

// Function to handle adding to cart
function addToCart(productId, size, color) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ productId, size, color });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}
