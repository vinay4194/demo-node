const jwt = require("jsonwebtoken");

exports.authMiddleware = (roles) => (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		if (!token) return res.status(400).json({ message: "Invalid token" });

		//decode the token
		const decoded = jwt.verify(token, "SECRET_KEY");
		//verify roles
		if (!roles.includes(decoded.role)) return res.status(403).json({ message: "Forbidden" });
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};
