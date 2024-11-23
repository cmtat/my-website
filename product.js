// Extract product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if (!productId) {
  document.getElementById('product-details').innerHTML = 'No product ID found.';
} else {
  // Fetch the product details from the API
  fetch(`/api/products?id=${productId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      // Render product details
      const productDetails = document.getElementById('product-details');
      productDetails.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.images[0]?.src}" alt="${data.title}" />
        <p>${data.description}</p>
        <p>Price: $${(data.price / 100).toFixed(2)}</p>
        <div>
          <label for="variant">Choose a variant:</label>
          <select id="variant">
            ${data.variants
              .map(
                (variant) =>
                  `<option value="${variant.id}">${variant.title} - $${(
                    variant.price / 100
                  ).toFixed(2)}</option>`
              )
              .join('')}
          </select>
        </div>
        <button id="add-to-cart">Add to Cart</button>
      `;
    })
    .catch((err) => {
      console.error('Error loading product details:', err);
      document.getElementById('product-details').innerText =
        'Failed to load product details.';
    });
}
