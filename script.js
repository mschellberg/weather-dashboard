var urlForOneDay = "https://api.openweathermap.org/data/2.5/weather"; // Current Day Weather
var urlForFiveDay = "https://api.openweathermap.org/data/2.5/forecast"; // 5 Day Forecast
var city = "Philadelphia"; // Default City
var key = "449606ca5ac43b9f2803d2e877f4f58f";
var apiKey = urlForOneDay + "?q=" + city + "&cnt=5&units=imperial&appid=" + key;


$.getJSON(apiKey, function(response) {
    var cityName = response.name;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    
// Current day Temperature Container
    $(".cityName").html(cityName);
    $(".tempPlacement").html('Temperature: ' + temperature + ' °F');
    $(".humidityPlacement").html('Humidity: ' + humidity + ' %');
    $(".windSpeedPlacement").html('Wind Speed: ' + windSpeed + ' MPH');
});

// 5-Day Forecast
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$.ajax({
  url: urlForFiveDay, //API Call
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: key,
    units: "imperial",
    cnt: "40" // Only want 5 values. You get 8 readings per day but we only need 1 reading per day 8*5 = 40 cnt
  },
  success: function(weatherData) {
    var weekDay = "";
    var prevDayNumber = -1;
    $.each(weatherData.list, function(index, val) {
        var day = new Date(val.dt_txt);
        var dayNumber = day.getDay()
        console.log(day + " " + dayNumber + " " + prevDayNumber)
        if(dayNumber != prevDayNumber) {
        
        var weekdayName = daysOfTheWeek[dayNumber];
      weekDay += "<p>"
      weekDay += "<b> " + weekdayName + "</b>: " // Day
      weekDay += val.main.temp + "&degF" // Temperature
      weekDay += "<span> | " + val.weather[0].description + "</span>"; // Description
      weekDay += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
      weekDay += "</p>" 
    }
      prevDayNumber = dayNumber;
    });
    $(".card-deck").html(weekDay);
  }
});


/*
// Search Bar
button.addEventListener("click", function(e) {
    e.preventDefault();
    if(citySearch.val() === "") {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + 'citySearch' + "&units=metric" + "&appid=449606ca5ac43b9f2803d2e877f4f58f",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
            console.log= (data.name)
            
            var show(data){
                return "<p>Current Weather: "+ data.main.temp +"</p>"
            }
            
            }
        })
        
    }
    console.log("button works!!!!");
    $.getJSON(url + citySearch + units + key, function(data) {
        console.log(data);
        data
    })
})

*/






