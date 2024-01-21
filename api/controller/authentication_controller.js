const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode(
        {
            sub: user.id,
            iat: timestamp,
        },
        config.secret
    );
};

exports.signin = (req, res, next) => {
    const user = req.user;
    res.send({ token: tokenForUser(user), user_id: user._id });
};

exports.signup = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(422)
            .json({ error: "Please provide email and password" });
    }

    User.findOne({ email: email }, (error, existingUser) => {
        if (error) {
            return next(error);
        }
        if (existingUser) {
            return res.status(422).json({ error: "Email already in use!" });
        }

        const user = new User({
            email: email,
            password: password,
        });
        user.save((error) => {
            if (error) {
                return next(error);
            }
            res.json({ user_id: user._id, token: tokenForUser(user) });
        });
    });
};
