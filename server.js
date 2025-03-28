const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./Swagger");
const passport = require("passport");
require("./config/passport");

const app = express();
app.use(express.json());
app.use(cors());

//healthcheck
app.get("/", (req, res) => {
	res.send("Node app is running!");
});

//swagger routes
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//Routes

app.use(
	session({
		secret: "SECRET_TOKEN", // Store a secret in your .env
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	})
);
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

// db connection
mongoose
	.connect("mongodb+srv://vinay-123:FCjsfI9v5H2rZDq5@cluster0.avn9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
		family: 4,
		ssl: true,
		tls: true,
		tlsAllowInvalidCertificates: false,
		tlsAllowInvalidHostnames: false,
	})
	.then(() => {
		console.log("DB connection success");
	})
	.catch((err) => {
		console.log("Error on db connection", err);
	});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log("app running on port: " + PORT);
});
