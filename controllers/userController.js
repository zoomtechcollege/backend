import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"

const registerUser = async (req, res) => {
    try {
        // console.log(1)
        const userExist = await User.findOne({ email: req.body.email })
        // console.log(2)
        // בדיקת משתמש קיים
        // console.log(userExist)
        if (userExist) return res.status(400).json({ message: "User already exist" })

        const user = await User.create(req.body)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            token: generateToken(user)
        })
    } catch (err) {
        // console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong credentials" })
        }

        const token = generateToken(user)
        // console.log(token)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            token: token
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message })
    }
}

// put - method
const updateUserPut = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message })
    }
}

// patch - method
const updateUserPatch = async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message })
    }
}

// delete - method
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            message: "Success, user deleted!"
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message })
    }
}

const getUsers = async (req, res) => {
    try {

        const users = await User.find()

        if (!users) {
            return res.status(400).json({ message: "Restricted permission" })
        }

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error.message })
    }
}

export {
    registerUser,
    loginUser,
    updateUserPut,
    updateUserPatch,
    deleteUser,
    getUsers
}