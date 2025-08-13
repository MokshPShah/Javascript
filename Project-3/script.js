// Place Order System with GST, Discount, and Café Report

let sum = 0,
    items = 0,
    disc = 0,
    minPrice = Infinity,
    maxPrice = -Infinity;

let choice;

do {
    console.log('1. Coffee (₹50)');
    console.log('2. Tea (₹30)');
    console.log('3. Sandwich (₹80)');
    console.log('4. Pastry (₹100)');
    console.log('0. Exit');

    choice = parseInt(prompt('Enter your choice: '));

    let price = 0;

    if (choice === 1) {
        price = 50;
        console.log("You've ordered Coffee. Price: 50");
    } else if (choice === 2) {
        price = 30;
        console.log("You've ordered Tea. Price: 30");
    } else if (choice === 3) {
        price = 80;
        console.log("You've ordered Sandwich. Price: 80");
    } else if (choice === 4) {
        price = 100;
        console.log("You've ordered Pastry. Price: 100");
    } else if (choice === 0) {
        console.log('Thank you, visit again');
        break;
    } else {
        console.log('Invalid choice');
    }

    if (price > 0) {
        sum += price;
        items++;
        if (price < minPrice) minPrice = price;
        if (price > maxPrice) maxPrice = price;
    }

} while (choice != 0);

// Apply discount
if (sum > 1000) {
    disc = sum * 0.20;
} else if (sum > 500) {
    disc = sum * 0.10;
} else {
    console.log('No discount');
}

// Billing
console.log(`\nYou've ordered ${items} items`);
console.log(`Subtotal: ₹${sum}`);
console.log(`Discount: ₹${disc}`);

let gst = (sum - disc) * 0.05;
console.log(`GST: ₹${gst.toFixed(2)}`);

let totalBill = (sum - disc) + gst;
console.log(`Your total bill is: ₹${totalBill.toFixed(2)}`);

// Café Report
if (items > 0) {
    let averagePrice = sum / items;
    console.log("\n Café Report");
    console.log(`Total Items Sold: ${items}`);
    console.log(`Highest Price Item: ₹${maxPrice}`);
    console.log(`Lowest Price Item: ₹${minPrice}`);
    console.log(`Average Price: ₹${averagePrice.toFixed(2)}`);
} else {
    console.log("\n Café Report");
    console.log("No sales made.");
}

// Change pwd

let current_password = '1234'
let user = prompt('Enter your current password: ')

let new_pass, confirm_pass

if (user === current_password) {
    new_pass = prompt('Enter your new password: ')
    confirm_pass = prompt('Confirm your new password: ')

    if (new_pass === confirm_pass) {
        current_password = new_pass
        console.log('New password set successfully')
    } else {
        console.log('New password and confirmation password do not match')
    }
} else {
    console.log("Your current password doesn't match")
}