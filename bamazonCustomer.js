var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'top_bamazon'
});

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
    display()
});


var idArray = []

function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err
        if (res.length === 0) {
            return
        }
        console.log("--------------------------------------")
        console.log("Welcome to our toy shop!")
        console.log("Feel free to check out our products!")
        console.log("--------------------------------------")
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                console.log("[Id_" + res[i].item_id + "] " + res[i].product_name + " ( $" + res[i].price + " )")
                idArray.push(res[i].item_id)
            }
        }
        console.log("--------------------------------------")
        action()
    })
}

function action() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: ["Go to Shopping","Exit"]
            }
        ])
        .then(answers => {
            if (answers.action === "Go to Shopping") {
                shop()
            } else {
                console.log("See you again!")
                connection.end()
            }
        });
}



function shop() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "selectId",
                message: "Select the ID of the product you would like to buy.",
                choices: idArray
            },
            {
                type: "number",
                name: "buyingQty",
                message: "How many units of the product would you like to buy?",
                validate: function (value) {
                    if (parseInt(value) === parseFloat(value) && value > 0) {
                        return true
                    }
                    return false
                }
            }
        ])
        .then(answers => {
            connection.query("SELECT * FROM products where?",
                { item_id: answers.selectId },
                function (err, res) {
                    var price = res[0].price
                    var stockQty = res[0].stock_quantity
                    if (err) throw err
                    if (answers.buyingQty > stockQty) {
                        console.log("Insufficient quantity. Sorry!")
                        action()
                    } else {
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: res[0].stock_quantity - answers.buyingQty
                                },
                                {
                                    item_id: answers.selectId
                                }
                            ])

                        console.log("Total cost of your purchase is $" + answers.buyingQty * price + ".")
                        action()
                    }

                })
        });
}

// function sellProduct() {
//     console.log("Updating stock quantities...\n");
//     connection.query("UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stock_quantity: res[0].stock_quantity - answers.buyingQty
//             },
//             {
//                 item_id: answers.selectId
//             }
//         ])
// }

