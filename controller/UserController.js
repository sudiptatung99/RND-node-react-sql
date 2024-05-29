const db = require("../db/db")
const Joi = require('joi');
const bcrypt = require('bcrypt');

const validateUser = (user) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        status: Joi.required(),
    });
    return userSchema.validateAsync(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}
const LoginUser = (user) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return userSchema.validateAsync(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}

exports.GetAllUser = async (req, res) => {
    try {
        const userData = await db.user.findAll({include:{model:db.department,as:"department",attributes:["id","department_name"]}});
        if (userData.length > 0) {
            return res.status(200).json({ message: "Connection successful", data: userData });
        } else {
            return res.status(200).json({ message: "No data found", data: userData });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

exports.Register = async (req, res) => {
    try {
        const { error } = await validateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const existUser = await db.user.findAll({
            where: {
                email: req.body.email,
                status: 1
            },
        });
        if (existUser.length > 0) {
            return res.status(200).json({ status: false, message: "user already exist" });
        }
        const userData = await db.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
        });
        const token = await db.user.generateToken({ id: userData.id, name: userData.name, email: userData.email });
        return res.status(200).json({ status: true, message: "user successful created", token: token, user: userData });
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

exports.Login = async (req, res) => {
    try {
        const { error } = await LoginUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const findUser = await db.user.findAll({
            where: {
                email: req.body.email,
                status: 1
            },
        });
        if (findUser.length > 0) {
            const isPassword = await bcrypt.compare(req.body.password, findUser[0].password);
            if (!isPassword) {
                return res.status(400).json({
                    message: false,
                    errorMessage: "Invalid email and password"
                })
            }
            const token = await db.user.generateToken({ id: findUser[0].id, name: findUser[0].name, email: findUser[0].email});
            return res.status(200).json({ status: true, message: "Login  successfully", token: token, user: findUser[0] });
        } else {
            return res.status(400).json({ status: false, errorMessage: "user does not exist" });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}