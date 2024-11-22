// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const { data: products } = await response.json();
        renderProductList(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Render product listing
function renderProductList(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
            <img src="${product.images[0]?.src}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="product-price">Price: $${(product.variants[0]?.price / 100).toFixed(2)}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Initialize product fetch
fetchProducts();
