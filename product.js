document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    document.getElementById('product-details').innerHTML = `<p>Product not found.</p>`;
    return;
  }

  try {
    // Fetch all products
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();

    // Find the specific product by ID
    const product = products.data.find((p) => p.id === productId);

    if (!product) {
      document.getElementById('product-details').innerHTML = `<p>Product not found.</p>`;
      return;
    }

    // Build product details
    const productDetails = `
      <h2>${product.title}</h2>
      <div class="main-image">
        <img src="${product.images[0].src}" alt="${product.title}">
      </div>
      <div class="image-gallery">
        ${product.images
          .map(
            (image) =>
              `<img src="${image.src}" alt="${product.title}" class="gallery-image">`
          )
          .join('')}
      </div>
      <p>${product.description}</p>
      <p class="price">Price: $${(product.variants[0].price / 100).toFixed(2)}</p>
      <div class="options">
        <button>Add to Cart</button>
      </div>
    `;

    document.getElementById('product-details').innerHTML = productDetails;

    // Add click-to-main-image functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const mainImage = document.querySelector('.main-image img');

    galleryImages.forEach((img) => {
      img.addEventListener('click', () => {
        mainImage.src = img.src;
      });
    });
  } catch (error) {
    console.error('Error loading product details:', error);
    document.getElementById('product-details').innerHTML = `<p>Error loading product details.</p>`;
  }
});
