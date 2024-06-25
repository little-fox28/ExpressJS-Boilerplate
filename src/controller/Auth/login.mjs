import {validationResult} from "express-validator";
import {FoundUser} from "../User/userController.mjs";

function Login(req, res, next) {
    const aMinute = 60000;
    const error = validationResult(req);
    const {email, password} = req.body;
    const foundUser = FoundUser({email, password})

    if (!error.isEmpty()) {
        return res.status(400).json({"message": error})
    }

    if (!foundUser) {
        return res.status(400).json({"message": "User not found!"})
    }

    res.cookie("loggedIn", "true", {maxAge: aMinute, signed: true, secure: true, httpOnly: true})


    return res.status(200).json("Logged in");
}

export default Login;