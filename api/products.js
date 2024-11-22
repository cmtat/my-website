export default async function handler(req, res) {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const shopId = "16553509"; // Replace with your actual shop ID

    try {
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}
