//For Handling unhandled promises --- when not providing a required field
//Basically to avoid writing try catch block in every function in controllers

module.exports = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}