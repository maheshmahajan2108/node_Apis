
var controller = require('../Controller/controller.js')





module.exports = (app) => {
    app.post('/getUsers', function (req, res, next) {

        controller.getUsers(req, (err, resp) => {
            // console.log("*************************",resp)

            if (err) {

                res.status(500).send({
                    status: false,
                    data: [],
                    code: 500,
                    errors: [],
                    message: "Error occurred ! "
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: resp,
                    message: "success"
                })
            }
        })

    });


    app.post('/getUserinfoById', function (req, res, next) {

        controller.getUserinfoById(req, (err, resp) => {
          

            if (err) {

                res.status(500).send({
                    status: false,
                    data: [],
                    code: 500,
                    errors: [],
                    message: "Error occurred ! "
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: resp,
                    message: "Success"
                })
            }
        })

    });

    app.post('/insertUser', function (req, res, next) {

        controller.insertUser(req, (err, resp) => {
          

            if (err) {

                res.status(500).send({
                    status: false,
                    data: [],
                    code: 500,
                    errors: [],
                    message: "Error occurred ! "
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: resp,
                    message: "user inserted successfuly"
                })
            }
        })

    });

    app.post('/updateUser', function (req, res, next) {

        controller.updateUser(req, (err, resp) => {
          

            if (err) {

                res.status(500).send({
                    status: false,
                    data: [],
                    code: 500,
                    errors: [],
                    message: "Error occurred ! "
                })
            } else {
                res.status(200).send({
                    status: true,
                    data: resp,
                    message: "User successfully update"
                })
            }
        })

    });

    app.get('/adminsetting',  function (req, res, next) {

        
        res.render('main.html', { backendURL: "localhost", userName: "mahesh", title: "File Import Utility" });
    });
    
}