import Product from "../models/Product.js"

const createProduct = async (req, res) => {
    try {
        req.body.userId = req.user._id
        const product = await Product.create(req.body)

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductsByUser = async (req, res) => {
    try {
        const { userId } = req.params

        const products = await Product.find({ userId })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId)

        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            {
                _id: req.params.productId,
                userId: req.user._id
            },
            req.body,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// delete product by id and user id
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: req.params.productId,
            userId: req.user._id
        })

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.json({ message: "Product deleted!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    createProduct,
    getProductsByUser,
    getSingleProduct,
    updateProduct,
    deleteProduct
}