document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');

  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      productList.innerHTML = products.data.map(product => `
        <div class="product-card">
          <img src="${product.images[0].src}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
          <a href="product.html?id=${product.id}">View Details</a>
        </div>
      `).join('');
    })
    .catch(error => console.error('Error fetching products:', error));
});
