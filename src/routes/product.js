import express from "express";
import { ProductoDao } from "../dao/ProductoDao.js";
import { authMiddleware } from "../middlewares/Auth.js";
const router = express.Router();
const productoDao = new ProductoDao();

// GET api/productos

router.get("/", async (_req, res) => {
  const products = await productoDao.getAll();
  products
    ? res.status(200).json(products)
    : res.status(400).json({ error: "producto no encontrado" });
});

// GET api/productos/:id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productoDao.getProductById(id);

  product
    ? res.status(200).json(product)
    : res.status(400).json({ error: "producto no encontrado" });
});

// POST api/productos
router.post("/", authMiddleware, async (req, res) => {
  const { body } = req;
  const newProduct = await productoDao.createProduct(body);

  newProduct
    ? res.status(200).json({ success: "producto añadido " + newProduct._id })
    : res.status(400).json({
        error: "Error",
      });
});

// PUT api/productos/:id
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const wasUpdated = await productoDao.updateProductById(id, body);

  wasUpdated
    ? res.status(200).json({ success: "producto actualizado" })
    : res.status(404).json({ error: "producto no valido." });
});

// DELETE /api/productos/id

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const wasDeleted = await productoDao.deleteProductById(id);

  wasDeleted
    ? res.status(200).json({ success: "producto eliminado" })
    : res.status(404).json({ error: "producto no encontrado" });
});

export default router;
