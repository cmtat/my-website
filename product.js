document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const productDetails = document.getElementById('product-details');

  fetch(`/api/products?id=${productId}`)
    .then(response => response.json())
    .then(product => {
      productDetails.innerHTML = `
        <h1>${product.title}</h1>
        <img src="${product.images[0].src}" alt="${product.title}">
        <p>${product.description}</p>
        <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
      `;
    })
    .catch(error => console.error('Error fetching product details:', error));
});
