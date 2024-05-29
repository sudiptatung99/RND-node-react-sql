const Joi = require("joi");
const db = require("../db/db");



const validateDepartment = (user) => {
    const userSchema = Joi.object({
        department_name: Joi.string().required(),
        user_id: Joi.required(),
        status: Joi.required(),
    });
    return userSchema.validateAsync(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}

exports.GetAllDepartment = async (req, res) => {
    try {
        const department = await db.department.findAll({ include: { model: db.user, as: "user", attributes: ["name", "email"] } });
        if (department.length > 0) {
            return res.status(200).json({ message: "successful", data: department });
        } else {
            return res.status(200).json({ message: "No data found", data: department });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}
exports.CreateDepartment = async (req, res) => {
    try {
        const { error } = await validateDepartment(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const department = await db.department.create({
            department_name: req.body.department_name,
            user_id: req.body.user_id,
            status: req.body.status,
        });
        return res.status(200).json({ message: "Department created successfully", data: department });
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}
exports.UpdateDepartment = async (req, res) => {
    try {
        const { error } = await validateDepartment(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const department = await db.department.update({
            department_name: req.body.department_name,
            user_id: req.body.user_id,
            status: req.body.status,
        }, { where: { id: req.params.id } });
        return res.status(200).json({ message: "Department updated successfully", data: department });
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}