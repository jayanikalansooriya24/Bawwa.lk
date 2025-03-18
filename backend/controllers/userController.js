import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pet } = req.body;
    const { name, type, breed, age, gender, birthdate, medicalConditions, image } = pet; // Assuming 'pet' is an object

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password before saving (assuming password is required)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      pet: {
        name,
        type,
        breed,
        age,
        gender,
        birthdate,
        medicalConditions,
        image,
      },
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { registerUser };
