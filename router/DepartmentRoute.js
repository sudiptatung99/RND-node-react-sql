const express = require("express");
const { GetAllDepartment, CreateDepartment, UpdateDepartment } = require("../controller/DepartmentController");
const router = express.Router();


router.get('/all-department',GetAllDepartment);
router.post('/create-department',CreateDepartment);
router.put('/update-department/:id',UpdateDepartment);
// router.delete('/delete-department/:id',Login);


module.exports = router;