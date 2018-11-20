document.getElementById("getText").addEventListener("click", getText);

function getText() {
  let city = document.getElementById("city").value || "New York";
  let unit = document.querySelector('input[name="unit"]:checked').value;
  console.log(city);
  let url = `http://api.openweathermap.org/data/2.5/weather?APPID=d68a1a43ee4c7acff893020eaa69399e&units=${unit}&q=${city}`;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      document.getElementById("output").innerHTML = `Temperature is: ${
        json.main.temp
      }`;
    })
    .catch(error => console.log(error));
}
