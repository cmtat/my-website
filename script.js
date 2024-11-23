document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();

    productList.innerHTML = products
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.images[0].src}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>$${(product.variants[0].price / 100).toFixed(2)}</p>
          <a href="product.html?id=${product.id}"><button>View Details</button></a>
        </div>
      `
      )
      .join('');
  } catch (error) {
    console.error('Error fetching products:', error);
    productList.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
  }
});
