const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/Users");

passport.use(
	new GoogleStrategy(
		{
			clientID: "Google id", // Note: it's clientID, not clientId
			clientSecret: "Secret",
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const userLogin = await Users.findOne({ email: profile.emails[0].value });

				if (!userLogin) {
					// Create a new user
					const newUser = new Users({
						name: profile.displayName,
						email: profile.emails[0].value,
						role: "buyer",
						provider: "google",
					});

					await newUser.save();
					return done(null, newUser);
				}

				// User already exists
				return done(null, userLogin);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await Users.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});
