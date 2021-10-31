var db = require('../connection.js')





// Function  for  getuser 

exports.getUsers = (req, callback) => {
    const page = req.query.page
    const limit = req.query.limit
    const startI = (page - 1) * limit
    const endI = page * limit

    // const result = {}


    db.raw('SELECT  * FROM  sys.users').then(function (resp) {
        // console.log("**************************", resp[0])


        var result = {}

        result = resp[0].slice(startI, endI)
        callback(null, result)
    });

}

// Function  for  getUserinfoById 
exports.getUserinfoById = (req, callback) => {

    db.raw("SELECT  * FROM  sys.users WHERE id = '" + req.body.id + "'").then(function (resp) {
        // console.log("**************************", resp[0][0])

        callback(null, resp[0][0])
    });

}


// Function  for  insertUser
exports.insertUser = (req, callback) => {






    db.raw("SELECT id FROM sys.users where email = '" + req.body.email + "' AND name = '" + req.body.name + "';").then(function (resp) {

        console.log("---------------------------------------", resp[0])
        if (resp[0][0] == null) {
            db.raw("INSERT INTO sys.users (name, email, salary, `role`) VALUES('" + req.body.name + "', '" + req.body.email + "', '" + req.body.salary + "', '" + req.body.role + "');").then(function (resp) {


                callback(null, resp[0])
            });

        }else{
            db.raw("UPDATE sys.users SET name='" + req.body.name + "', email='" + req.body.email + "', salary='" + req.body.salary + "', `role`='" + req.body.role + "' WHERE id='" + resp[0][0]['id'] + "';").then(function (resp) {


                callback(null, resp[0])
            });
        

        }
        // console.log("---------------------------------------", resp[0][0]['id'])
        // callback(null, resp[0])
    });



}

// Function  for  updateUser
exports.updateUser = (req, callback) => {





    db.raw("UPDATE sys.users SET name='" + req.body.name + "', email='" + req.body.email + "', salary='" + req.body.salary + "', `role`='" + req.body.role + "' WHERE id='" + req.body.id + "';").then(function (resp) {


        callback(null, resp[0])
    });

}
