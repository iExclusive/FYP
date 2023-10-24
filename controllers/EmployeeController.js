const Employee = require('../models/Employee')

//show the list of employees
const index = (req, res, next)=>{
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

//show single employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured when trying to show employees.'
        })
    })

}

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name, 
        designation: req.body.designation, 
        email: req.body.email,
        phone: req.body.phone, 
        age: req.body.age
    })
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured when adding employee'
        })
    })
}

//update an employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name, 
        designation: req.body.designation, 
        email: req.body.email,
        phone: req.body.phone, 
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error occured when trying to update employee'
        })
    })
}

//delete an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message: 'Employee deleted.'
        })
    })
    .catch (error => {
        res.json({
            message: 'Error happened when trying to delete an employee'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}
