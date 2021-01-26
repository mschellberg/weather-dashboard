var urlForOneDay = "https://api.openweathermap.org/data/2.5/weather"; // Current Day Weather
var urlForFiveDay = "https://api.openweathermap.org/data/2.5/forecast"; // 5 Day Forecast
var city = "Philadelphia"; // Default City
var key = "449606ca5ac43b9f2803d2e877f4f58f";
var apiKey = urlForOneDay + "?q="+city + "&units=imperial&appid=" + key;
var date = new Date().toLocaleDateString();
window.localStorage.setItem("cities", "");

// Search Bar
var button = document.querySelector(".button");

// 5-Day Forecast
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeatherReport (){
    $.getJSON(apiKey, function(response) {
        var cityName = response.name;
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
    
    // Current day Temperature Container
        $(".cityName").html(cityName + " " + date);
        $(".tempPlacement").html('Temperature: ' + temperature + ' °F');
        $(".humidityPlacement").html('Humidity: ' + humidity + ' %');
        $(".windSpeedPlacement").html('Wind Speed: ' + windSpeed + ' MPH');
    });

$.ajax({
  url: urlForFiveDay, 
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: key,
    units: "imperial",
    cnt: "40" // Only want 5 values. You get 8 readings per day bc of 3 hour 5 day forecast but we only need 1 reading per day 8*5 = 40 cnt
  },
  success: function(weatherData) {
    var weekDay = "";
    var prevDayNumber = -1;
    $.each(weatherData.list, function(index, val) {
        var day = new Date(val.dt_txt);
        var dayNumber = day.getDay()
        if(dayNumber != prevDayNumber) {
        
        var weekdayName = daysOfTheWeek[dayNumber];
      weekDay += "<p>"
      weekDay += "<b> " + weekdayName + "</b> " + "<br>" // Day
      weekDay += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" + "<br>"// Icon 
      weekDay += "Temp: " + val.main.temp + "&degF" + "<br>" + "<br>"// Temperature
      weekDay += "<span>" + "Humidity: "+ val.main.humidity + "%" + "</span>" // Humidity
      weekDay += "</p>" 
    }
      prevDayNumber = dayNumber;
    });
    $(".card-deck").html(weekDay);
  }
});
};
// Local Storage
function setPreviousCities () {
    //var previousCities = window.localStorage.getItem("cities") + "," + city;
    $("local.storage").empty();
    window.localStorage.setItem('cities', city)
    var cities = window.localStorage.getItem("cities");
        for (city of cities.split(",")){
            console.log(city)
            $(".localStorage").append("<li>"+city+"</li>")
        }
    console.log(window.localStorage.getItem("previousCities"))
}

// Search Bar
button.addEventListener('click', function(e) {
    e.preventDefault();
    city = document.querySelector(".inputValue").value;
    apiKey = urlForOneDay + "?q="+city + "&units=imperial&appid=" + key;
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city + "&units=imperial&appid=449606ca5ac43b9f2803d2e877f4f58f")
    .then(response => response.json())
    .then(data => console.log(data));
    getWeatherReport();
    setPreviousCities()
  
//.catch(err => alert('Wrong city name!'))
});
getWeatherReport();
setPreviousCities()


//userForemEl.addEventListener("submit", formSubmitHandler);




