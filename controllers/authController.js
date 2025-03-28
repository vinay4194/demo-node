const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

//Register
exports.register = async (req, res) => {
	console.log("register", req.body);
	try {
		const { name, email, password, role } = req.body;
		const existingUser = await Users.findOne({ email });
		console.log("existing user", existingUser);
		if (existingUser) return res.status(400).json({ message: "User is already registered" });

		const hashedPass = await bcrypt.hash(password, 10);
		const User = new Users({ name, email, role, password: hashedPass });
		await User.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error });
	}
};

//login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const UserLogin = await Users.findOne({ email });
		if (!UserLogin) return res.status(400).json({ message: "Invalid credentials" });
		const isMatch = await bcrypt.compare(password, UserLogin.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
		//generate jwt
		const token = jwt.sign({ id: UserLogin._id, role: UserLogin.role }, "SECRET_KEY", { expiresIn: "1h" });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ error });
	}
};
