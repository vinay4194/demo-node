const swaggerJsDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "User authentication module",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:8000",
				description: "Development server",
			},
		],
	},
	apis: ["./routes/authRoutes.js"],
};

module.exports = swaggerJsDoc(options);
