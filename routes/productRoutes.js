import express from "express"
import { createProduct, deleteProduct, getProductsByUser, getSingleProduct, updateProduct } from "../controllers/productController.js"
import { verifyToken } from "../middleware/auth.js"
const router = express.Router()

// private route
// CREATE
router.post("/", verifyToken, createProduct)

// public route 
// READ - users products
router.get("/user/:userId", getProductsByUser)

// public route
// READ - single product
router.get("/:productId", getSingleProduct)

// private route
// UPDATE - update product
router.patch("/:productId", verifyToken, updateProduct)

// private route
// DELETE
router.delete("/:productId", verifyToken, deleteProduct)

export default router 