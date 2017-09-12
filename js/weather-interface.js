var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

// start code
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      let sunriseUnix = body.sys.sunrise;
      let sunsetUnix = body.sys.sunset;
      let sunrise = moment.unix(sunriseUnix).format('hh:mm a');
      let sunset = moment.unix(sunsetUnix).format('hh:mm a');
      $('#showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('#showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('#showSunrise').text(`The Sunrise today in ${city} is ${sunrise}.`);
      $('#showSunset').text(`The Sunset today in ${city} is ${sunset}.`);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});






//     $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`).then(function(response) {
//       let sunriseUnix = response.sys.sunrise;
//       let sunsetUnix = response.sys.sunset;
//
//       let sunrise = moment.unix(sunriseUnix).format('hh:mm a');
//       let sunset = moment.unix(sunsetUnix).format('hh:mm a');
//
//       $('#showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('#showTemp').text(`The current temperature is ${response.main.temp.toFixed(0)} degrees Farenheit.`);
//       $('#showSunrise').text(`The Sunrise today in ${city} is ${sunrise}.`);
//       $('#showSunset').text(`The Sunset today in ${city} is ${sunset}.`);
//     }).fail(function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
//
//     });
//   });
// });

// AJAX apiKey
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     // debugger;
//     let city = $('#location').val();
//     $('#location').val("");
//     console.log(city);
//     $.ajax({
//       url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da2fec2009d72c8dd21ed03e0419a232`,
//       type: 'GET',
//       data: {
//         format: 'json'
//       },
//       success: function(response) {
//         $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//         $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
//       },
//       error: function() {
//         $('#errors').text("There was an error processing your request. Please try again.")
//       }
//     });
//   });
// });
