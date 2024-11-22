// Global cart stored in localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch products from API
async function fetchProducts() {
    const response = await fetch('/api/products');
    const { data: products } = await response.json();
    renderProductList(products);
}

// Render product listing
function renderProductList(products) {
    const container = document.getElementById('products-container');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.images[0].src}" alt="${product.title}" width="200">
            <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
            <a href="./product.html?id=${product.id}">View Details</a>
        `;
        container.appendChild(productDiv);
    });
}

// Render product details
async function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const response = await fetch('/api/products');
    const { data: products } = await response.json();
    const product = products.find(p => p.id === productId);

    const container = document.getElementById('product-details');
    container.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.images[0].src}" alt="${product.title}" width="300">
        <p>${product.description}</p>
        <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
    `;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        addToCart(product);
    });
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Render shopping cart
function renderCart() {
    const container = document.getElementById('cart-container');
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.images[0].src}" alt="${item.title}" width="200">
            <p>Price: $${(item.variants[0].price / 100).toFixed(2)}</p>
        `;
        container.appendChild(itemDiv);
    });

    setupPayPalButton();
}

// PayPal Integration
function setupPayPalButton() {
    paypal.Buttons({
        createOrder: function (data, actions) {
            const total = cart.reduce((sum, item) => sum + (item.variants[0].price / 100), 0).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                localStorage.removeItem('cart'); // Clear cart
                window.location.href = './index.html';
            });
        }
    }).render('#paypal-button-container');
}

// Page-specific actions
if (window.location.pathname.endsWith('index.html')) {
    fetchProducts();
} else if (window.location.pathname.endsWith('product.html')) {
    renderProductDetails();
} else if (window.location.pathname.endsWith('cart.html')) {
    renderCart();
}
