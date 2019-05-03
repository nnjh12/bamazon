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
    managerAction()
});

function managerAction() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "managerAction",
                message: "What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ]
            }
        ])
        .then(answers => {
            if (answers.managerAction === "View Products for Sale") {
                viewProductsForSale()
            } else if (answers.managerAction === "View Low Inventory") {
                viewLowInventory()
            } else if (answers.managerAction === "Add to Inventory") {
                addToInventory()
            } else if (answers.managerAction === "Add New Product") {
                addNewProduct()
            } else {
                connection.end()
            }
        });
}

function viewProductsForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err
        console.log("---------- View Products for Sale ----------")
        for (var i = 0; i < res.length; i++) {
            console.log("Id_" + res[i].item_id + " | " + res[i].product_name + " ( $" + res[i].price + " ) stock Qty: " + res[i].stock_quantity)
        }
        console.log("--------------------------------------------")
        setTimeout(managerAction, 2000)
    })
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        var lowInventoryArray = []
        if (err) throw err
        console.log("------------ View Low Inventory ------------")
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("Id_" + res[i].item_id + " | " + res[i].product_name + " ( $" + res[i].price + " ) stock Qty: " + res[i].stock_quantity)
                lowInventoryArray.push(res[i].item_id)
            }
        }
        if (lowInventoryArray.length === 0) {
            console.log("No item with low inventory")
            console.log("--------------------------------------------")
            return setTimeout(managerAction, 2000)
        }
        console.log("--------------------------------------------")
        setTimeout(managerAction, 2000)
    })
}

function addToInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        var lowInventoryArray = []
        if (err) throw err
        console.log("------------ View Low Inventory ------------")
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("Id_" + res[i].item_id + " | " + res[i].product_name + " ( $" + res[i].price + " ) stock Qty: " + res[i].stock_quantity)
                lowInventoryArray.push(res[i].item_id)
            }
        }
        if (lowInventoryArray.length === 0) {
            console.log("No item with low inventory")
            console.log("--------------------------------------------")
            return setTimeout(managerAction, 2000)
        }
        console.log("--------------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "lowInventoryItem",
                    message: "Select the ID of the product you would like add to inventory.",
                    choices: function () {
                        var lowInventoryArray =[]
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].stock_quantity < 5) {
                                lowInventoryArray.push(res[i].item_id)
                            }
                        }
                        return lowInventoryArray
                    }
                },
                {
                    type: "number",
                    name: "addedQty",
                    message: "How many units would you like to add?",
                    validate: function (value) {
                        if (parseInt(value) === parseFloat(value) && value > 0) {
                            return true
                        }
                        return false
                    }
                }
            ])
            .then(answers => {
                connection.query("UPDATE products SET stock_quantity=stock_quantity+" + answers.addedQty + " WHERE item_id=" + answers.lowInventoryItem)
                connection.query("SELECT * FROM products WHERE item_id=" + answers.lowInventoryItem,function(err,res){
                    if(err) throw err
                    console.log("------- Stock Inventory was updated! -------")
                    console.log("Id_" + res[0].item_id + " | " + res[0].product_name + " ( $" + res[0].price + " ) stock Qty: " + res[0].stock_quantity)
                    console.log("--------------------------------------------")
                    setTimeout(managerAction, 2000)
                })
            })
    })
}

function addNewProduct() {
    inquirer
            .prompt([
                {
                    type: "input",
                    name: "productName",
                    message: "Product name to be added."
                },
                {
                    type: "input",
                    name: "departmentName",
                    message: "Department name of product to be added."
                },
                {
                    type: "number",
                    name: "price",
                    message: "Price of product to be added."
                },
                {
                    type: "number",
                    name: "qty",
                    message: "Qty of product to be added."
                }
            ])
            .then(answers => {
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                      product_name: answers.productName,
                      department_name: answers.departmentName,
                      price: answers.price,
                      stock_quantity: answers.qty
                    },
                    function(err, res) {
                      console.log(res.affectedRows + " product inserted!\n");
                      // Call updateProduct AFTER the INSERT completes
                      viewProductsForSale()
                    }
                  )
            })
}