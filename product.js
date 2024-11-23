document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    document.getElementById('product-details').innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    const response = await fetch(`/api/products?id=${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');

    const product = await response.json();

    document.getElementById('product-details').innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.images[0]?.src}" alt="${product.title}">
      <p>${product.description}</p>
      <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
      <button>Add to Cart</button>
    `;
  } catch (error) {
    console.error('Error loading product details:', error);
    document.getElementById('product-details').innerHTML = `<p>Error loading product details.</p>`;
  }
});
