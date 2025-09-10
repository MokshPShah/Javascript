const tasks = [];

class Task {
    constructor({
        title, description = '', category = '', dueDate = null, status = 'pending'
    }) {
        this.id = Task.uid();
        this.title = title;
        this.description = description;
        this.category = category;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.status = status;
        this.createdAt = new Date();
    }
    static uid() {
        Task._id = (Task._id || 0) + 1;
        return Task._id
    }

    markComplete() {
        this.status = 'completed';
    }

    isOverDue() {
        if (!this.dueDate) return false;
        const now = new Date();

        const date = new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        return this.status !== 'completed' && date < today;
    }

    getStatus() {
  if (this.status === "Completed") return "Completed";
  if (this.dueDate && this.dueDate < new Date()) return "Overdue";
  return "Pending";
}

}


showAlert = (text) => {
    const alert = document.getElementById('alert');
    alert.classList.remove('hidden');
    alert.classList.add('flex');
    document.getElementById('alertMsg').innerHTML = `${text}`
}

hideAlert = () => {
    const alert = document.getElementById('alert');
    alert.classList.remove('flex');
    alert.classList.add('hidden');
}

addTask = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let status = document.getElementById("status").value;

    if (title === "" || desc === "" || category === "" || date === "" || status === "") {
        showAlert('All fields must be filled!');
        return;
    }

    const task = new Task({
        title, description: desc, category, dueDate: date, status
    });
    tasks.push(task);
    showAlert('Task added successfully')
    console.log(task)
    renderTasks();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}

function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.getStatus() === "Completed").length;
    const pending = tasks.filter(t => t.getStatus() === "Pending").length;
    const overdue = tasks.filter(t => t.getStatus() === "Overdue").length;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;
    document.getElementById("overdueTasks").innerText = overdue;
}


renderTasks = () => {
    const container = document.getElementById('renderTasks');
    container.innerHTML = "";

    const searchText = document.getElementById('searchInput').value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const status = task.getStatus();
        const matchesTab = activeStatus === "all" || status.toLowerCase() === activeStatus.toLowerCase();

        const matchesSearch = task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText) || task.category.toLowerCase().includes(searchText)
        return matchesTab && matchesSearch;
    });
    if (filteredTasks.length === 0) {
        container.innerHTML = `
        <div class="text-center text-gray-500 font-medium py-10">
            No tasks found!
        </div>`;
    } else {
        filteredTasks.forEach(task => {
    const status = task.getStatus();
    let statusColor = "text-gray-500";
    if (status === "Completed") statusColor = "text-green-600";
    if (status === "Overdue") statusColor = "text-red-600";

    container.innerHTML += `
      <div class="flex justify-between bg-white shadow-sm p-3 rounded-md mb-2">
        <div class="w-10/12">
            <div class="text-sm text-gray-500">
                ${task.dueDate ? task.dueDate.toLocaleDateString() : '-'}
            </div>
            <div class="font-semibold text-gray-800">${task.title}</div>
            <div class="text-sm font-medium ${statusColor}">Status: ${status}</div>
            <div class="text-sm text-gray-600">${task.description || ''}</div>
            <div class="text-xs text-slate-500">${task.category || ''}</div>
        </div>
        <div class="flex items-center space-x-2">
            <div onclick="completeTask(${task.id})" class="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-[7px] py-[5px] rounded-full cursor-pointer">
                <i class="fa-solid fa-check"></i> 
            </div>
            <div onclick="deleteTask(${task.id})" class="bg-red-600 hover:bg-red-700 text-white text-base px-[7px] py-[5px] rounded-full cursor-pointer">  
                <i class="fa-solid fa-trash"></i> 
            </div>
        </div>
      </div>
    `;
});

    }
    updateDashboard();
};

completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = "Completed";
    }
    renderTasks();
}
deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id)
    if (index !== -1) {
        tasks.splice(index, 1)
    }
    renderTasks();
}

let activeStatus = "all";



changeTab = (btn) => {
    activeStatus = btn.dataset.status;

    // Update tab button styles
    document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("border-2", "border-orange-400", "bg-orange-200", "text-white");
        b.classList.add("bg-gray-200");
    });

    btn.classList.add("border-2", "border-orange-400", "bg-orange-200", "text-white");
    btn.classList.remove("bg-gray-200");

    // Refresh the task list for the selected tab
    renderTasks();
}