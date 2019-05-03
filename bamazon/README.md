# bamazon

## Preview Link
1. Bamazon Customer
https://drive.google.com/file/d/1gvCcNCbtcFdxBzelCghzgk9cHKersK4i/view
1. Bamazon Manager
https://drive.google.com/file/d/1HmTgK7_dU23w-8kuLW-v-emqCc6kHfSJ/view


## Main functionality of this App
1. Bamazon Customer
    * When user enter, show all the available item.
    * Ask to user whether they shop or exit.
    * When user select to shop, ask what to buy and how many.
    * Show the total price of their purchase.
    * Update stock quantity in database.

1. Bamazon Manager
    * View Products for Sale : 
    List every available item.
    * View Low Inventory : 
    List all items with an inventory count lower than five.
    * Add to Inventory : 
    Show all items with low inventory, add stock quantity to inventory for selected product and display it with updated qty.
    * Add New Product : 
    Add a new product to sale items and display all available items including new product.

## Small tips in each process
1. Bamazon Customer
    * **Use for loop** to display all the items in database.
    * To check if user input integer in inquirer, use validate as below.
        ```
            validate: function (value) {
                if (parseInt(value) === parseFloat(value) && value > 0) {
                    return true
                }
                return false
                }
        ```

1. Bamazon Manager
    * Push low inventory items to array for checking if there is no item in low inventory.
    * Use **setTimeout** to display main menu again few seconds after finishing user's request.
    * To increase or decrease numbers in database, use SET a=a+*
        ```
        SET stock_quantity=stock_quantity+3
        ```
    * To use dynamic value in query, use string concatenation.
        ```
        connection.query("UPDATE products SET stock_quantity=stock_quantity+" + answers.addedQty
        + " WHERE item_id=" + answers.lowInventoryItem)
        ```
