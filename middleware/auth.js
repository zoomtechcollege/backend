import jwt from "jsonwebtoken"
import User from "../models/User.js"

// test token is ok 
export const verifyToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, token is missing" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password")

        next()
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token is invalid" })
    }
}

// admin access 
export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only!" })
    }
    next()
}
