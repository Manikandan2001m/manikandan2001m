const apiKey="d79eb2b5d5a55e46c17b18b428a6159c";
const weatherData = document.getElementById("weather-data");
const cityInput =document.getElementById("city-input");
const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event)=>{
  event.preventDefault();
  const cityValue=cityInput.value;
  getWeatherData(cityValue);
})

 async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("not ok")
        }

        const data = await response.json();
        console.log(data);
        document.querySelector("#weather-data").style.visibility="visible";

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
             `wind speed:${data.wind.speed}m/s`
        ];
        
        weatherData.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`
        weatherData.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherData.querySelector(".description").textContent=`${description}`;
        weatherData.querySelector(".details").innerHTML = details.map((detail)=>`
        <div>${detail}</div>
        `).join("");

        
       



    } catch (error) {
        weatherData.querySelector(".icon").innerHTML="";
        weatherData.querySelector(".temperature").textContent="";
        weatherData.querySelector(".description").textContent="An error occured!Please try again later";
        weatherData.querySelector(".details").innerHTML = "";
}
 }