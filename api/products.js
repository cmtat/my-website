export default async function handler(req, res) {
    const API_KEY = process.env.PRINTIFY_API_KEY; // Your API key stored securely
    const PRINTIFY_BASE_URL = 'https://api.printify.com/v1';
    const SHOP_ID = '16553509'; // Your store ID

    if (req.method === 'GET') {
        try {
            // Fetch products from the Printify API
            const response = await fetch(`${PRINTIFY_BASE_URL}/shops/${SHOP_ID}/products.json`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }

            const data = await response.json();
            res.status(200).json(data); // Return product data to the frontend
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
