document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    const productList = document.getElementById('product-list');

    productList.innerHTML = products.data
      .map(product => `
        <div class="product">
          <img src="${product.images[0]?.src}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>$${(product.variants[0].price / 100).toFixed(2)}</p>
          <a href="product.html?id=${product.id}">View Details</a>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Error loading products:', error);
  }
});
