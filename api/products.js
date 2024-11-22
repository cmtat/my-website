// Fetch product details by ID
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`/api/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const { data: products } = await response.json();
        const product = products.find((item) => item.id === productId);
        renderProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Render product details
function renderProductDetails(product) {
    if (!product) {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const container = document.getElementById('product-details');
    container.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.images[0]?.src}" alt="${product.title}">
        <p>${product.description}</p>
        <div>
            <label for="color-select">Color:</label>
            <select id="color-select">
                ${product.options
                    .find(option => option.name === "Colors")
                    .values.map(value => `<option value="${value.id}">${value.title}</option>`)
                    .join('')}
            </select>
        </div>
        <div>
            <label for="size-select">Size:</label>
            <select id="size-select">
                ${product.options
                    .find(option => option.name === "Sizes")
                    .values.map(value => `<option value="${value.id}">${value.title}</option>`)
                    .join('')}
            </select>
        </div>
        <button id="add-to-cart">Add to Cart</button>
    `;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const selectedColor = document.getElementById('color-select').value;
        const selectedSize = document.getElementById('size-select').value;
        alert(`Added ${product.title} to cart (Color: ${selectedColor}, Size: ${selectedSize})`);
    });
}

// Get product ID from URL and fetch details
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
if (productId) {
    fetchProductDetails(productId);
}
