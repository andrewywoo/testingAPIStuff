function getBeers(x) {
  if (x == "next") {
    page++;
    document.getElementById("beer-list__results").innerHTML = "";
  }
  if (x == "prev") {
    if (!(page === 1)) {
      page--;
      document.getElementById("beer-list__results").innerHTML = "";
    }
  }
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
    .then(res => res.json())
    .then(json => {
      json.forEach(beer => {
        document.getElementById("beer-list__results").innerHTML += `
              <ul class="beer">
                  <li class="beer-name">${beer.name}</li>
                  <li class="beer-description">${beer.description}</li>
              </ul>
              `;
      });
    })
    .catch(error => console.log(error));
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

let page = 1;
let perPage = 9;
getBeers();
let getList = throttle(getBeers, 500);

document.getElementById("prev").addEventListener("click", () => {
  let x = "prev";
  getList(x);
});

document.getElementById("next").addEventListener("click", () => {
  let x = "next";
  getList(x);
});
