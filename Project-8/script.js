// Show Popup
setTimeout(() => {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").classList.add("flex");
    document.getElementById("modalMsg").textContent = "✨ Stay focused and consistent — small efforts today build the future you want. ✨";
}, 5000);

// Hide Popup
function hideModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal").classList.remove("flex");
}

// Slides
const qoutes = [
    "1. Consistency turns small steps into big victories.",
    "2. Discipline outlasts motivation every single time.",
    "3. Dreams grow when action replaces hesitation.",
    "4. Challenges shape strength hidden within you.",
    "5. Progress starts with one simple step.",
];

let i = 0;
document.querySelector("#qoute-para").innerHTML = qoutes[i];

autoSlideQoutes = () => {
    if (i < qoutes.length - 1) {
        i++;
    } else {
        i = 0;
    }
    document.querySelector("#qoute-para").innerHTML = qoutes[i];
};

setInterval(() => {
    autoSlideQoutes();
}, 4000);

next = () => {
    if (i < qoutes.length - 1) {
        i++;
    } else {
        i = 0;
    }
    document.querySelector("#qoute-para").innerHTML = qoutes[i];
};

prev = () => {
    if (i > 0) {
        i--;
    } else {
        i = qoutes.length - 1;
    }
    document.querySelector("#qoute-para").innerHTML = qoutes[i];
};

// Countdown Logic
const targetDate = new Date("Jan 1, 2026 00:00:00").getTime();
let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "🎉 Happy New Year!";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function startCountdown() {
    if (!countdownInterval) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}