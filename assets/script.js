$(document).ready(function () {
    // personal API key for OpenWeather 
    const apiKey = 'b756e5aa291f3d2dcd5b230b03a8d666';
    // variables for left container
    const search = $('#search')
    const cityInput = $('#city-input');
    const submitBtn = $('#submitBtn');
    // var to store searched cities
    let pastCities = [];
    const clearBtn = $('#clearBtn')
    // variables for right container
    const currentCity = $('#city');
    const dateEl = $('#date');
    const weatherEl = $('#weather');
    const temperatureEL = $('#temperature');
    const humidityEl = $('#humidity');
    const windEl = $('#wind-speed');
    // my many consts for 5 day forecast
    const fiveDayDate1 = $('#fiveDayDate1');
    const fiveDayImg1 = $('#fiveDayImg1');
    const fiveDayTemp1 =$('#fiveDayTemp1');
    const fiveDayHum1 = $('#fiveDayHum1');
    const fiveDayWind1 = $('#fiveDayWind1');

    const fiveDayDate2 = $('#fiveDayDate2');
    const fiveDayImg2 = $('#fiveDayImg2');
    const fiveDayTemp2 =$('#fiveDayTemp2');
    const fiveDayHum2 = $('#fiveDayHum2');
    const fiveDayWind2 = $('#fiveDayWind2');

    const fiveDayDate3 = $('#fiveDayDate3');
    const fiveDayImg3 = $('#fiveDayImg3');
    const fiveDayTemp3 =$('#fiveDayTemp3');
    const fiveDayHum3 = $('#fiveDayHum3');
    const fiveDayWind3 = $('#fiveDayWind3');

    const fiveDayDate4 = $('#fiveDayDate4');
    const fiveDayImg4 = $('#fiveDayImg4');
    const fiveDayTemp4 =$('#fiveDayTemp4');
    const fiveDayHum4 = $('#fiveDayHum4');
    const fiveDayWind4 = $('#fiveDayWind4');

    const fiveDayDate5 = $('#fiveDayDate5');
    const fiveDayImg5 = $('#fiveDayImg5');
    const fiveDayTemp5 =$('#fiveDayTemp5');
    const fiveDayHum5 = $('#fiveDayHum5');
    const fiveDayWind5 = $('#fiveDayWind5');
    // using moment js to grab todays date
    const currentDate = moment().format('L');
    
    dateEl.text(currentDate);
    // api call

    submitBtn.click(function (event) {
        event.preventDefault(); // Prevent form submission
        const cityInputVal = cityInput.val();
        getWeather(cityInputVal); // Call getWeather with the input city name
    });

    function getWeather(cityName) {
        fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
            .then(function (response){
            return response.json()
        }).then(function (data){
            const lat = data[0].lat;
            const lon = data[0].lon;
            fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`).then(function (response){
                return response.json()
            }).then(function (data){
                console.log(data)
                currentCity.text(data.name)
                temperatureEL.text(data.main.temp)
                windEl.text(data.wind.speed)
                weatherEl.attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                humidityEl.text(data.main.humidity)
                if (!pastCities.includes(cityName)) {
                    pastCities.push(cityName);
                    localStorage.setItem("city", JSON.stringify(pastCities));
                }
                displayCities();
                console.log(pastCities);
            })
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`).then(function (response) {
                return response.json()
            }).then(function(data) {
                let fiveDayArray = [];
                for (var i = 5; i < data.list.length; i+=8) {
                    fiveDayArray.push(data.list[i])
                }
                console.log(fiveDayArray);
                fiveDayDate1.text(fiveDayArray[0].dt_txt)
                fiveDayImg1.attr('src', `https://openweathermap.org/img/wn/${fiveDayArray[0].weather[0].icon}@2x.png`)
                fiveDayTemp1.text(fiveDayArray[0].main.temp)
                fiveDayHum1.text(fiveDayArray[0].main.humidity)
                fiveDayWind1.text(fiveDayArray[0].wind.speed)

                fiveDayDate2.text(fiveDayArray[1].dt_txt)
                fiveDayImg2.attr('src', `https://openweathermap.org/img/wn/${fiveDayArray[1].weather[0].icon}@2x.png`)
                fiveDayTemp2.text(fiveDayArray[1].main.temp)
                fiveDayHum2.text(fiveDayArray[1].main.humidity)
                fiveDayWind2.text(fiveDayArray[1].wind.speed)

                fiveDayDate3.text(fiveDayArray[2].dt_txt)
                fiveDayImg3.attr('src', `https://openweathermap.org/img/wn/${fiveDayArray[2].weather[0].icon}@2x.png`)
                fiveDayTemp3.text(fiveDayArray[2].main.temp)
                fiveDayHum3.text(fiveDayArray[2].main.humidity)
                fiveDayWind3.text(fiveDayArray[2].wind.speed)

                fiveDayDate4.text(fiveDayArray[3].dt_txt)
                fiveDayImg4.attr('src', `https://openweathermap.org/img/wn/${fiveDayArray[3].weather[0].icon}@2x.png`)
                fiveDayTemp4.text(fiveDayArray[3].main.temp)
                fiveDayHum4.text(fiveDayArray[3].main.humidity)
                fiveDayWind4.text(fiveDayArray[3].wind.speed)
                
                fiveDayDate5.text(fiveDayArray[4].dt_txt)
                fiveDayImg5.attr('src', `https://openweathermap.org/img/wn/${fiveDayArray[4].weather[0].icon}@2x.png`)
                fiveDayTemp5.text(fiveDayArray[4].main.temp)
                fiveDayHum5.text(fiveDayArray[4].main.humidity)
                fiveDayWind5.text(fiveDayArray[4].wind.speed)
            })
        })
    };
    
    // function to use local storage to create previous search buttons
    function createCityButton(cityName) {
        const button = $(`<button class="btn btn-secondary my-2 mb-2 col-6 saved-city">${cityName}</button>`);
        button.click(function (event) {
            event.preventDefault();
            const clickedCityName = $(this).text();
            getWeather(clickedCityName);
        });
        return button;
    }

    function displayCities() {
        if (localStorage.getItem("city")) {
            pastCities = JSON.parse(localStorage.getItem("city"));
        }
        const cityList = $("#previous-searches");
        cityList.empty();
        for (let i = 0; i < pastCities.length; i++) {
            const cityName = pastCities[i];
            const button = createCityButton(cityName);
            cityList.append(button);
        }
    }

    displayCities();
    // logic for my clear history button, removes all cities from localstorage
    clearBtn.click(function() {
        pastCities = [];
        localStorage.removeItem("city");
        $("#previous-cities").empty();
    });
});


