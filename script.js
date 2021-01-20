var apiKey = 'http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=449606ca5ac43b9f2803d2e877f4f58f';
var cityInput = document.querySelector("#users-searchbox");


$.getJSON(apiKey).then(function(response) {
    var city = response.name;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    console.log(city, temperature, humidity, windSpeed);


// Current day Temperature
    $(".cityTitle").html(city);
    $(".tempPlacement").html(temperature);
    $(".humidityPlacement").html(humidity);
    $(".windSpeedPlacement").html(windSpeed);
    
});

  



/*

function currentWeather (city){
    $.getJSON(apiKey, function(data){
        console.log(data);

        $("#current-city-title").val(apiKey);
        $("#temperature").innerHTML(temperature);
    })
}
*/
// Search Bar

// 5-Day Forecast




