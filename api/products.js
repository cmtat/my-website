const Printify = require("printify-api");

export default async function handler(req, res) {
  try {
    // Initialize Printify client with your API key
    const client = new Printify(process.env.PRINTIFY_API_KEY);

    // Fetch products from your Printify store
    const products = await client.catalog.products.list();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
