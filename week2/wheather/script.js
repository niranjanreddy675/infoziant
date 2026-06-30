const apiKey = "3ad9fcc6a23ce29905f01491e981b1c8";

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    const weatherDiv = document.getElementById("weather");

    if (city === "") {

        alert("Please enter a city name");

        return;

    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        weatherDiv.innerHTML = "<h3>Loading...</h3>";

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("City not found");

        }

        const data = await response.json();

        weatherDiv.innerHTML = `

        <div class="weather-card">

            <h2>${data.name}</h2>

            <h3>${data.main.temp} °C</h3>

            <p><b>Weather:</b> ${data.weather[0].main}</p>

            <p><b>Description:</b> ${data.weather[0].description}</p>

            <p><b>Humidity:</b> ${data.main.humidity}%</p>

            <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>

        </div>

        `;

    }

    catch (error) {

        weatherDiv.innerHTML = `

        <h3 style="color:red">

        ${error.message}

        </h3>

        `;

    }

}