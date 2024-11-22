export default async function handler(req, res) {
    const API_KEY = process.env.PRINTIFY_API_KEY; // Add API key securely
    const PRINTIFY_BASE_URL = 'https://api.printify.com/v1';

    if (req.method === 'GET') {
        try {
            // Replace `{shop_id}` with your shop ID from Printify
            const response = await fetch(`${PRINTIFY_BASE_URL}/shops/{shop_id}/products.json`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }

            const data = await response.json();
            res.status(200).json(data); // Send data to the frontend
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
