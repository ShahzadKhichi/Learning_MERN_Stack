let oldTab = document.querySelector(".data-userWeather");
const API_KEY = "168771779c71f3d64106d8a88376808a";
let userCords;
const AllTabs = document.querySelectorAll(".tab");
const grantLocation = document.querySelector(".grant-location");
const grantBtn = document.querySelector(".grant-btn");
const loadingScreen = document.querySelector(".loading-container");
const searchTab = document.querySelector(".data-searchWeather");
const weatherInfo = document.querySelector(".weather-info");
const formContainer = document.querySelector(".form-container");
const searchBtn = document.querySelector(".form-container");
const searchInput = document.querySelector("#search-input");
const notFound = document.querySelector(".not-found");
loader();
function currentTab(newTab) {
  if (oldTab != newTab) {
    oldTab.classList.remove("current-tab");
    newTab.classList.add("current-tab");
    oldTab = newTab;
    if (newTab == searchTab) {
      weatherInfo.style.top = "300%";
      loadingScreen.style.top = "300%";
      notFound.style.top = "300%";
      clearScreen();
      formContainer.classList.add("active");
    } else {
      notFound.style.top = "0%";
      loadingScreen.style.top = "0%";
      weatherInfo.style.top = "0%";
      formContainer.classList.remove("active");
      clearScreen();
      loader();
    }
  }
}
AllTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentTab(tab);
  });
});

function loader() {
  clearScreen();
  loadingScreen.classList.add("active");
  let cords = sessionStorage.getItem("userCords");
  if (cords) {
    userCords = JSON.parse(cords);
    fetchWeatherInfoCords();
  } else {
    clearScreen();
    grantLocation.classList.add("active");
  }
}
async function fetchWeatherInfoCords() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${userCords.lat}&lon=${userCords.long}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  render(data);
}
async function fetchWeatherInfoCity(city) {
  clearScreen();
  loadingScreen.classList.add("active");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    if (!data.sys) {
      throw data;
    }
    render(data);
  } catch (err) {
    // console.log(err);
    clearScreen();
    notFound.classList.add("active");
  }
}
function render(data) {
  //getting tags access
  const cityName = document.querySelector(".city-name");
  const countryFlag = document.querySelector(".country-icon");
  const description = document.querySelector(".weather-description");
  const weatherIcon = document.querySelector(".weather-icon");
  const temp = document.querySelector(".temprature");
  const windspeed = document.querySelector(".wind-speed");
  const humidity = document.querySelector(".humidity-data");
  const clouds = document.querySelector(".cloud-data");
  //setting values
  cityName.innerHTML = data?.name;
  countryFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
  description.innerText = data?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
  temp.innerHTML = `${data?.main?.temp.toFixed(2)} °C`;
  windspeed.innerHTML = `${data?.wind?.speed.toFixed(2)} m/s`;
  humidity.innerHTML = `${data?.main?.humidity.toFixed(2)} %`;
  clouds.innerHTML = `${data?.clouds?.all.toFixed(2)} %`;
  //updating screen
  clearScreen();
  weatherInfo.classList.add("active");
}
async function locationGetter() {
  if (navigator.geolocation) {
    let response = navigator.geolocation.getCurrentPosition(
      (position) => {
        userCords = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        clearScreen();
        loadingScreen.classList.add("active");
        sessionStorage.setItem("userCords", JSON.stringify(userCords));
        fetchWeatherInfoCords();
      },
      () => {
        clearScreen();
        const msg = document.querySelector(".err");
        msg.innerHTML = "Location Access Denied";
        notFound.classList.add("active");
      }
    );
  }
}
searchBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value != "") {
    fetchWeatherInfoCity(searchInput.value);
  }
});
grantBtn.addEventListener("click", locationGetter);
function clearScreen() {
  notFound.classList.remove("active");
  grantLocation.classList.remove("active");
  weatherInfo.classList.remove("active");
  loadingScreen.classList.remove("active");
}
