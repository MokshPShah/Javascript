let userBudget = parseInt(prompt("Enter your budget: "));
let budgetMsg = "";

if (userBudget < 10000) {
    console.log("Your Budget is too low for the trip...")
} else {
    if (userBudget === 10000) {
        budgetMsg = "Plan a short domestic trip."
    }
    else if (userBudget >= 10000 && userBudget <= 50000) {
        budgetMsg = "You can plan a long domestic trip."
    }
    else {
        budgetMsg = "International trip possible!"
    }
}

let userDestination = []

if (userBudget >= 10000) {
    let userInputDestination = parseInt(prompt("How many places do you like to visit in this trip between (3 to 5)? "));
    if (userInputDestination >= 3 && userInputDestination <= 5) {
        for (let i = 0; i < userInputDestination; i++) {
            let place = prompt(`Enter the name of place ${i + 1}: `);
            userDestination.push(place);
        }
        console.log("Your trip will include these destinations:");
        console.log(userDestination);
    } else {
        console.log("Please enter a number between 3 and 5.");
    }

    let numberOfDays = parseInt(prompt("Enter the number of days you're planning for the trip: "))
    let tripType = " "
    if (numberOfDays < 3) {
        tripType = "Weekend Getaway."
    } else if (numberOfDays >= 3 && numberOfDays <= 7) {
        tripType = "Perfect Hoilday Trip."
    } else if (numberOfDays >= 7) {
        tripType = "Extended Vacation."
    } else {
        tripType = "Invalid Input!"
    }
    console.log(tripType)

    function suggestHotel(budget, days) {
        let perDay = budget / days;
        if (perDay < 2000) {
            return "Budget Hotels."
        } else if (perDay >= 2000 && perDay <= 5000) {
            return "Mid-range Hotels."
        } else {
            return "Luxury Hotels."
        }
    }

    let hotelSuggestion = suggestHotel(userBudget, numberOfDays)

    console.log("--------- Final Travel Summary ---------")
    console.log(`Destinations: ${userDestination.join(", ")}`);
    console.log(`Total Budget: ₹${userBudget}`);
    console.log(`Days Planned: ${numberOfDays}`);
    console.log(`Trip Type: ${tripType}`);
    console.log(`Hotel Suggestion: ${hotelSuggestion}`);
    console.log(`Travel Summary: ${budgetMsg}`);
}
