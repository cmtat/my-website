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

    // Build product details HTML
    const productDetails = `
      <h2>${product.title}</h2>
      <div class="image-gallery">
        ${product.images
          .map(
            (image, index) =>
              `<img src="${image.src}" alt="${product.title} - Image ${index + 1}" class="gallery-image">`
          )
          .join('')}
      </div>
      <p>${product.description}</p>
      <p>Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
      <button>Add to Cart</button>
    `;

    document.getElementById('product-details').innerHTML = productDetails;

    // Add click-to-enlarge functionality (optional)
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach((img) => {
      img.addEventListener('click', () => {
        const enlargedImage = document.createElement('div');
        enlargedImage.classList.add('enlarged-image');
        enlargedImage.innerHTML = `<img src="${img.src}" alt="${img.alt}">
          <button class="close-button">Close</button>`;
        document.body.appendChild(enlargedImage);

        // Close functionality
        document.querySelector('.close-button').addEventListener('click', () => {
          document.body.removeChild(enlargedImage);
        });
      });
    });
  } catch (error) {
    console.error('Error loading product details:', error);
    document.getElementById('product-details').innerHTML = `<p>Error loading product details.</p>`;
  }
});
