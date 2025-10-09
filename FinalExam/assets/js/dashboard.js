document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const welcomeUser = document.getElementById("welcomeUser");
    const expenseList = document.getElementById("expenseList");
    const expenseForm = document.getElementById("expenseForm");
    const filterCategory = document.getElementById("filterCategory");
    const sortDate = document.getElementById("sortDate");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    welcomeUser.textContent = `Hi, ${currentUser.username}`;

    const storageKey = `expenses_${currentUser.email}`;
    let expenses = JSON.parse(localStorage.getItem(storageKey)) || [];

    const budgetForm = document.getElementById("budgetForm");
    const budgetAmountInput = document.getElementById("budgetAmount");
    const budgetInfo = document.getElementById("budgetInfo");

    let budget = parseFloat(localStorage.getItem(`budget_${currentUser.email}`)) || 0;

    function saveBudget() {
        localStorage.setItem(`budget_${currentUser.email}`, budget);
    }

    function updateBudgetDisplay() {
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remaining = budget - totalSpent;

        budgetInfo.innerHTML = `
      <strong>Budget:</strong> ₹${budget.toFixed(2)}<br>
      <strong>Spent:</strong> ₹${totalSpent.toFixed(2)}<br>
      <strong>Remaining:</strong> <span class="${remaining < 0 ? 'text-red-600' : 'text-green-600'}">₹${remaining.toFixed(2)}</span>
    `;

        if (remaining < 0) {
            budgetInfo.innerHTML += `<p class="text-red-600 font-semibold mt-2">You have exceeded your budget!</p>`;
        }
    }

    budgetAmountInput.value = budget > 0 ? budget : "";
    updateBudgetDisplay();

    budgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newBudget = parseFloat(budgetAmountInput.value);
        if (isNaN(newBudget) || newBudget < 0) {
            alert("Please enter a valid budget amount.");
            return;
        }
        budget = newBudget;
        saveBudget();
        updateBudgetDisplay();
    });

    function saveExpenses() {
        localStorage.setItem(storageKey, JSON.stringify(expenses));
    }

    function renderExpenses() {
        let filtered = [...expenses];

        if (filterCategory.value) {
            filtered = filtered.filter(exp => exp.category === filterCategory.value);
        }

        if (sortDate.value === "asc") {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        expenseList.innerHTML = "";

        if (filtered.length === 0) {
            expenseList.innerHTML = "<p class='text-gray-500'>No expenses found.</p>";
            updateBudgetDisplay();
            return;
        }

        filtered.forEach((expense, index) => {
            const li = document.createElement("li");
            li.className = "border-b pb-4 flex justify-between items-start";

            li.innerHTML = `
        <div>
          <h3 class="text-lg font-semibold">${expense.name}</h3>
          <p class="text-sm text-gray-600">${expense.category} | ₹${expense.amount} | ${expense.date}</p>
        </div>
        <div class="space-x-2">
          <button onclick="editExpense(${index})"
            class="text-sm text-blue-600 hover:underline">Edit</button>
          <button onclick="deleteExpense(${index})"
            class="text-sm text-red-600 hover:underline">Delete</button>
        </div>
      `;
            expenseList.appendChild(li);
        });

        updateBudgetDisplay();
    }

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("expenseName").value.trim();
        const amount = parseFloat(document.getElementById("expenseAmount").value);
        const date = document.getElementById("expenseDate").value;
        const category = document.getElementById("expenseCategory").value;

        if (!name || !amount || !date || !category) {
            alert("All fields are required.");
            return;
        }

        expenses.push({ name, amount, date, category });
        saveExpenses();
        renderExpenses();
        expenseForm.reset();
    });

    window.editExpense = function (index) {
        const expense = expenses[index];
        document.getElementById("expenseName").value = expense.name;
        document.getElementById("expenseAmount").value = expense.amount;
        document.getElementById("expenseDate").value = expense.date;
        document.getElementById("expenseCategory").value = expense.category;

        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    window.deleteExpense = function (index) {
        if (confirm("Are you sure you want to delete this expense?")) {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
    };

    filterCategory.addEventListener("change", renderExpenses);
    sortDate.addEventListener("change", renderExpenses);

    renderExpenses();
})

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
