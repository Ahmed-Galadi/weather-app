import WEATHER_API_KEY from "./apiKey";

const weather = {
    apiKey : WEATHER_API_KEY,
    fetchWeaher : (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`)
        .then(response => response.json())
        .then(data => {
        //fetch and display data
            weather.displayWeather(data);
            document.querySelector(".error").innerText = ""
        })
        .catch(error => {
            //handling error of typing an undifined city
            const cityUndif = "Cannot destructure property 'country' of 'data.sys' as it is undefined";
            if(error.message = cityUndif) {
                document.querySelector(".error").innerText = `Can't Find City! enter correct city name..`
            }
        })
    },
    displayWeather : (data) => {
        const { name : city } = data;
        const { country } = data.sys;
        const { description, icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
    //display every value in its place
        document.querySelector(".city").innerText = `${city} - ${country}`;
        document.querySelector(".temperature").innerText = `${temp}°C`;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/h`;
    //remove loading class 
        document.querySelector(".weather").classList.remove("loading");
    //set the background image of the searched city
        document.querySelector("body").style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${city}")`
    },
    searchCity: () => {
        weather.fetchWeaher(document.querySelector(".search-bar").value);
    }
}

//search button click handler
document.querySelector(".search-btn").addEventListener('click', () => {
    weather.searchCity();
    document.querySelector(".search-bar").value = "";
});

//search bar on pressing enter key handler
document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        weather.searchCity();
        document.querySelector(".search-bar").value = "";
    }
    
});
