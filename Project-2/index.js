// Fitness Suggestion System

let age = parseInt(prompt('Enter your age: '))
let weight = parseInt(prompt('Enter your weight (in kg):'))

let min, max

if (age >= 2 && age <= 5) {
  min = 12
  max = 20
} else if (age >= 6 && age <= 9) {
  min = 20
  max = 32
} else if (age >= 10 && age <= 12) {
  min = 32
  max = 45
} else if (age >= 13 && age <= 15) {
  min = 45
  max = 60
} else if (age >= 16 && age <= 19) {
  min = 50
  max = 70
} else if (age >= 20 && age <= 29) {
  min = 52
  max = 77
} else if (age >= 30 && age <= 39) {
  min = 53
  max = 80
} else if (age >= 40 && age <= 49) {
  min = 54
  max = 82
} else if (age >= 40 && age <= 49) {
  min = 54
  max = 80
} else if (age >= 50 && age <= 59) {
  min = 50
  max = 75
} else {
  console.log('Invalid age range')
}

if (min && max) {
  if (weight >= min && weight <= max) {
    console.log("You're fit for your age")
  } else if (weight < min) {
    console.log("You're underweight for your age. consider a healthy diet")
  } else {
    console.log("You're overweight for your age. consider a regular exercise")
  }
}

// Monthly Budget Planner

let monthly_income = parseInt(prompt('Enter your monthly income: '))

if (monthly_income > 0) {
  if (monthly_income <= 10000) {
    console.log('Spend cautiously and save more!')
  } else if (monthly_income > 10000 && monthly_income <= 30000) {
    console.log('Balanced Budget!')
  } else {
    console.log('You can consider investing.')
  }
} else {
  console.log('Enter valid income')
}

// Mobile Data Usage Alert System

let data_Usage = parseInt(prompt('Enter your monthly data usage (in GB): '))

if (data_Usage > 0) {
  if (data_Usage <= 5) {
    console.log(
      "You can use your current plan as you're a low data usage user!"
    )
  } else if (data_Usage > 5 && data_Usage <= 15) {
    console.log(
      "You can use your current plan as you're a Normal data usage user!"
    )
  } else if (data_Usage > 15) {
    console.log('Alert! You are a heavy data user. Upgrade your plan.')
  }
} else {
  console.log('Enter the valid data usage ')
}

//  Change Password Logic

let current_password = 'this_is_my_pass'
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
