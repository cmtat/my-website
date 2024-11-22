// Function to fetch product data from your API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products'); // Fetch data from your API
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        renderProducts(products.data); // Pass the data array to render function
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to render products dynamically on the webpage
function renderProducts(products) {
    const container = document.getElementById('products-container');
    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.images[0].src}" alt="${product.title}" style="width: 300px; height: auto;">
            <p>${product.description}</p>
            <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Call the fetchProducts function to display the products
fetchProducts();
