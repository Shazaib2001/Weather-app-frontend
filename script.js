let user = "";

const loginContainer = document.getElementById("login-form");
const registrationContainer = document.getElementById("registration-form");
const weatherContainer = document.getElementById("weather-form");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const navbar = document.getElementById("nav");
const usernameSpan = document.getElementById("user");

// when page loads first only display login form
registrationContainer.style.display = "none";
weatherContainer.style.display = "none";
navbar.style.display = "none";

//request variables
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//move to registration form
loginBtn.addEventListener("click", () => {
  registrationContainer.style.display = "none";
  loginContainer.style.display = "";
});

// login
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const form = event.target;

    const username = document.getElementById("login-username");
    const password = document.getElementById("login-password");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      redirect: "follow",
    };

    fetch(form.action, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        user = data;

        loginContainer.style.display = "none";
        navbar.style.display = "";
        weatherContainer.style.display = "";
        usernameSpan.textContent = user.user.username;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("response").textContent =
          "An error occurred. Please try again.";
      });
  });

// move to login form
registerBtn.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registrationContainer.style.display = "";
});

// register
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const form = event.target;

    const username = document.getElementById("register-username");
    const password = document.getElementById("register-password");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      redirect: "follow",
    };

    fetch(form.action, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        user = data;

        loginContainer.style.display = "";
        registrationContainer.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("response").textContent =
          "An error occurred. Please try again.";
      });
  });

// logout
logoutBtn.addEventListener("click", () => {
  loginContainer.style.display = "";
  navbar.style.display = "none";
  weatherContainer.style.display = "none";
  user = "";
});

const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const imageElement = document.getElementById("icon");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const timer = document.getElementById("timer");
let countdown = 15;

function updateCountdown() {
  countdown--;
  if (countdown <= 0) {
    countdown = 15;
    const location = locationInput.value;
    if (location) {
      fetchWeather(location);
    }
  }
  timer.textContent = `Next update in ${countdown} seconds`;
}

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
    setInterval(updateCountdown, 1000); // Update countdown every second
  }
});
function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      imageElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
