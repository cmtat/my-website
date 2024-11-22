// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const { data: products } = await response.json(); // Adjust according to your JSON structure
        renderProductList(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Render product listing
function renderProductList(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear container before adding products

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.images[0]?.src}" alt="${product.title}" style="width: 300px; height: auto;">
            <p>${product.description}</p>
            <p>Price: $${(product.variants[0]?.price / 100).toFixed(2)}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Initialize product fetch
fetchProducts();
