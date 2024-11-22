const apiKey = process.env.PRINTIFY_API_KEY; // Securely references the API key from Vercel
const shopId = "16553509"; // Your shop ID

export async function fetchProduct(productId) {
    const productURL = `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`;
    try {
        const response = await fetch(productURL, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();
        return data; // Return the detailed product data
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}
