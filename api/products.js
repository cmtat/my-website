const apiKey = process.env.PRINTIFY_API_KEY; // Securely references the API key from Vercel
const shopId = "16553509"; // Your shop ID
const baseURL = `https://api.printify.com/v1/shops/${shopId}/products.json`;

export async function fetchProducts() {
    try {
        const response = await fetch(baseURL, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();
        return data.data; // Return the array of products
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
