document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    document.getElementById('product-details').innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    const response = await fetch(`/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    const product = products.data.find(item => item.id === productId);

    if (!product) {
      document.getElementById('product-details').innerHTML = `<p>Product not found.</p>`;
      return;
    }

    document.getElementById('product-details').innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.images[0].src}" alt="${product.title}">
      <p>${product.description}</p>
      <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
      <button>Add to Cart</button>
    `;
  } catch (error) {
    document.getElementById('product-details').innerHTML = `<p>Error loading product details.</p>`;
    console.error(error);
  }
});
