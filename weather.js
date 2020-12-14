const fetch = require("node-fetch");
const location = require("./location");

function getLatLong(zipCode, url) {
    var outputLatLong="";
    var getLatLongFetch= fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +response.status);
                    return;
                }
                return response.json().then((data) => {
                    for (let i = 0; i < data.records.length; i++) {
                        if (zipCode === data.records[i].fields.zip) {
                            let latitude = data.records[i].fields.latitude;
                            let longitude = data.records[i].fields.longitude;
                            outputLatLong = location.getForecast(latitude, longitude);
                            outputLatLongResolve = outputLatLong.then((val)=> {
                                temp = "Weather forecast for " + data.records[i].fields.city + ", " + data.records[i].fields.zip+" \n" + val;
                                return temp;
                            });
                        }
                    }
                    return outputLatLongResolve;          
                });
            }
        )
        .catch(error => {
            console.log('There is some error in fetching the zipCode' + error);
        });
      return getLatLongFetch;  
}

module.exports.getLatLong = getLatLong;