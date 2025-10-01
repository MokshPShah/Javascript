const apiKey = "41f1d629fc93fbc5eda4b43c0285cf3a"
document.getElementById('fetchData').addEventListener("click", () => {
    const city = document.getElementById('city').value.trim();
    const lat = document.getElementById('lat').value.trim();
    const lon = document.getElementById('lon').value.trim();

    if (city && (lat || lon)) {
        alert("Please enter either a city or coordinates — not both.");
        return;
    }

    if (city) {
        fetchWeatherByCity(city)
    } else if (lat && lon) {
        fetchWeatherByCoords(lat, lon)
    } else {
        alert('Please enter either a city name OR both latitude and longitude.')
    }
})

function showLoading() {
    document.getElementById('defaultWeather').classList.add("hidden");
    document.getElementById('weatherContent').classList.add("hidden");
    document.getElementById('loadingSpinner').classList.add("hidden");
}

async function showWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    document.getElementById('weatherIcon').src = iconURL;
    document.getElementById('weatherDesc').textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

    const weatherHTML = `
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-thermometer-half"></i> Temp:</span>
          <span class="text-blue-300">${data.main.temp} °C</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-temperature-low"></i> Feels Like:</span>
          <span class="text-blue-300">${data.main.feels_like} °C</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-arrow-up"></i> Max Temp:</span>
          <span class="text-blue-300">${data.main.temp_max} °C</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-arrow-down"></i> Min Temp:</span>
          <span class="text-blue-300">${data.main.temp_min} °C</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-tint"></i> Humidity:</span>
          <span class="text-blue-300">${data.main.humidity}%</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-flag"></i> Country:</span>
          <span class="text-blue-300">${data.sys.country}</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-wind"></i> Wind:</span>
          <span class="text-blue-300">${data.wind.speed} m/s</span>
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg shadow-sm">
          <span class="font-bold"><i class="fas fa-map-marker-alt"></i> Location:</span>
          <span class="text-blue-300">${data.name}</span>
        </div>
      `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;

    document.getElementById("loadingSpinner").classList.add("hidden");
    document.getElementById("defaultWeather").classList.add("hidden");
    document.getElementById("weatherContent").classList.remove("hidden");
}

function showError() {
    document.getElementById("loadingSpinner").classList.add("hidden");
    document.getElementById("defaultWeather").classList.remove("hidden");
    document.getElementById("weatherContent").classList.add("hidden");

    alert("Something went wrong. Try again.")
}

async function fetchWeatherByCity(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        showLoading();
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json();

        showWeather(data);

    } catch (err) {
        showError();
    }
}

async function fetchWeatherByCoords(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        showLoading();
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json();

        showWeather(data);

    } catch (err) {
        showError();
    }
}