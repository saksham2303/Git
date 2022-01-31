let weather = {
    api: "47ca29395cd86200c0d8c88eabf4d279",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.api
      )
        .then((response) => {
          if (!response.ok) {
            alert("No data");
            throw new Error("No data");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      

    //   document.querySelector(".date").innerHTML = today;
      document.querySelector(".h1").innerText = "" + name+ ", " + data.sys.country;
      
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temperature").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      
    },
    search: function () {
      this.fetchWeather(document.querySelector(".searchbar").value);
    },
  };
  
// document.querySelector(".searchbutton").addEventListener("click", function () {
//   weather.search();
// });
  
document
    .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
         weather.search();
      }
    });
  
weather.fetchWeather("Jaipur");
