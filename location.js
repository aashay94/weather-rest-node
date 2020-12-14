const fetch = require("node-fetch");
const url = "https://api.weather.gov/points/";

function getForecast(latitude, longitude) {
    var test = fetch(url + latitude + "," + longitude)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                return response.json().then((data) => {
                    let forecastURL = data.properties.forecast;
                    return fetch(forecastURL)
                        .then(function (response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }
                            return response.json().then((data) => {
                            let forecastData =""
                                for (let i = 0; i < data.properties.periods.length; i++) {
                                        forecastData += data.properties.periods[i].name + ", " + data.properties.periods[i].startTime.slice(0, 10) + ": " + data.properties.periods[i].temperature
                                        + " " + data.properties.periods[i].temperatureUnit + ", Wind " + data.properties.periods[i].windSpeed + " " + data.properties.periods[i].windDirection
                                        + ", " + data.properties.periods[i].shortForecast+"\n";
                                }
                                return forecastData;
                            })    
                        })
                        .catch(error => {
                            console.log('There is some error' + error);
                        });
                })
            }
        )
        return test;
}

module.exports.getForecast = getForecast;