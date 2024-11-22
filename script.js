const productContainer = document.getElementById("product-container");
const storeId = "16553509"; // Replace with your actual Printify store ID
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key

async function fetchProducts() {
    try {
        const response = await fetch(`https://api.printify.com/v1/shops/${storeId}/products.json`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        displayProducts(data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = products
        .map(product => `
            <div class="product-card">
                <img src="${product.images[0].src}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p class="price">Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
                <a href="product.html?id=${product.id}">View Details</a>
            </div>
        `)
        .join("");
}

fetchProducts();
