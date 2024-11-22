const productDetails = document.getElementById("product-details");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const storeId = "16553509"; // Replace with your actual Printify store ID
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key

async function fetchProductDetails() {
    try {
        const response = await fetch(`https://api.printify.com/v1/shops/${storeId}/products/${productId}.json`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function displayProductDetails(product) {
    const variants = product.variants
        .map(variant => `<option value="${variant.id}">${variant.title} - $${(variant.price / 100).toFixed(2)}</option>`)
        .join("");
    
    productDetails.innerHTML = `
        <div class="product-card">
            <img src="${product.images[0].src}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <select id="variant-selector">${variants}</select>
            <button onclick="addToCart()">Add to Cart</button>
        </div>
    `;
}

function addToCart() {
    alert("Add to Cart functionality coming soon!");
}

fetchProductDetails();
