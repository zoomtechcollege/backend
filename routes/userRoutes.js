import express from "express"

// import controllers
import {
    deleteUser,
    getUsers,
    loginUser,
    registerUser,
    updateUserPatch,
    updateUserPut
}
    from "../controllers/userController.js"

// import middleware
import { verifyToken, adminOnly } from "../middleware/auth.js"

const router = express.Router()

// read=router.get()
// create=router.post()
// update=router.put()
// delete=router.delete()


// public route
// הרשמה
// name, email, password
router.post("/register", registerUser)

// public route
// התחברות
router.post("/login", loginUser)

// private route
// עדכון
router.put('/:id', verifyToken, updateUserPut)

// private route
// עדכון עם patch
router.patch('/:id', verifyToken, updateUserPatch)

// private route
// מחיקה
router.delete('/:id', verifyToken, deleteUser)

// private route
// קבלת כל המשתמשים
router.get("/", verifyToken, adminOnly, getUsers)

export default router