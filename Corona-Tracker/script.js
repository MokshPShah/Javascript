const GLOBAL_API_URL = 'https://disease.sh/v3/covid-19/all';
const COUNTRIES_API_URL = 'https://disease.sh/v3/covid-19/countries';

const globalCases = document.getElementById("globalCases");
const globalActive = document.getElementById("globalActive");
const globalRecovered = document.getElementById("globalRecovered");
const globalDeaths = document.getElementById("globalDeaths");
const countriesTableBody = document.getElementById("countriesTableBody");
const lastFetch = document.getElementById("lastFetch");

let allCountriesData = [];

const formatNumber = (num) => num.toLocaleString();

const updateLastFetchTime = (data) => {
    lastFetch.textContent = 'Last Fetched On: ' + new Date().toLocaleString(undefined, {
        dateStyle: "medium", timeStyle: "short"
    });
}

const animateCountUp = (element, endValue) => {
    let startVal = 0;
    const duration = 1000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate))
    const increment = endValue / totalFrames;

    let currentFrame = 0;
    const counter = setInterval(() => {
        startVal += increment;
        currentFrame++;
        if (currentFrame >= totalFrames) {
            element.textContent = formatNumber(endValue);
            clearInterval(counter);
        } else {
            element.textContent = formatNumber(Math.round(startVal));
        }
    }, 1000 / frameRate)
};

function displayGlobalData(data) {
    animateCountUp(globalCases, data.cases);
    animateCountUp(globalActive, data.active);
    animateCountUp(globalRecovered, data.recovered);
    animateCountUp(globalDeaths, data.deaths);
}

function displayCountriesData(countries) {
    countriesTableBody.innerHTML = '';

    if (countries.length === 0) {
        countriesTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center p-8 text-slate-600"> No Countries Found! </td>
            </tr>
        `
        return;
    }

    countries.forEach(country => {
        const countryRowHtml = `
        <tr class="hover:bg-slate-100">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-6 w-9">
                        <img class="h-6 w-9 rounded-sm object-cover" src="${country.countryInfo.flag}" alt="${country.country} flag">
                    </div>
                    <div class="ml-4">
                        <div class="font-medium text-slate-900">${country.country}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right font-semibold text-slate-800">${formatNumber(country.cases)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-red-600">${formatNumber(country.deaths)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-green-600">${formatNumber(country.recovered)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-blue-600 font-medium">+${formatNumber(country.todayCases)}</td>
        </tr>
        `;

        countriesTableBody.innerHTML += countryRowHtml;
    });
}

async function init() {
    try {
        console.log("Fetching data from API's...");
        const [globalData, countriesData] = await Promise.all([
            fetch(GLOBAL_API_URL).then(res => res.json()),
            fetch(COUNTRIES_API_URL).then(res => res.json()).then(data => { return data })
        ])

        // allCountriesData = countriesData;
        displayGlobalData(globalData);
        displayCountriesData(countriesData);
        updateLastFetchTime();

        console.log("Data displayed successfully.");
    } catch (err) {
        console.error("Failed to fetch or display data:", err);
        countriesTableBody.innerHTML = `<tr><td colspan="5" class="text-center p-8 text-red-500">Could not load data. Please check the console or try again later.</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', init);