window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let timezone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    const icon1 = document.querySelector(".icon");
    const tomTemp = document.querySelector(".tomTemp");
    const icon2 = document.querySelector(".icon1");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/c14da42a06ef08b01a73c75c29c28ddd/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //Setting Up DOM Elements
                    const {
                        icon,
                        temperature,
                        summary
                    } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    timezone.textContent = data.timezone;
                    setIcon(icon, icon1);
                    // Tomorrow Forecast
                    tomTemp.textContent = data.hourly.summary;
                    setIcon(data.hourly.icon, icon2);

                    //Convert Temp F to C
                    let celcius = (temperature - 32) * (5 / 9);

                    //changing temperature from F to C
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }

    //Setting Skycons
    function setIcon(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        })
        const currectIcon = icon.replace(/-/g, "_").toUpperCase();
        return skycons.set(iconID, Skycons[currectIcon]);
        skycons.play();
    };

});