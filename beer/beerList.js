function getBeers(x) {
  if (x === "next") {
    page++;
    resetList();
  }
  if (x === "prev") {
    if (!(page === 1)) {
      page--;
    }
    resetList();
  }
  if (x === "limit") {
    perPage = document.getElementById("beer-list__item-limit").value;
    resetList();
  }
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
    .then(res => res.json())
    .then(json => {
      json.forEach(beer => {
        document.getElementById("beer-list__results").innerHTML += `
              <ul class="beer">
                  <li class="beer-name">${beer.name}</li>
                  <ul class="beer-info">
                    <li class="beer-image"><img class="beer-img" src="${
                      beer.image_url
                    }" /></li>
                    <li class="beer-description">${beer.description}</li>
                  </ul>
              </ul>
              `;
      });
    })
    .catch(error => console.log(error));
}

function resetList() {
  document.getElementById("beer-list__results").innerHTML = "";
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

document
  .getElementById("beer-list__pagination-prev")
  .addEventListener("click", () => {
    let x = "prev";
    getList(x);
  });

document
  .getElementById("beer-list__pagination-next")
  .addEventListener("click", () => {
    let x = "next";
    getList(x);
  });

document
  .getElementById("beer-list__item-limit")
  .addEventListener("change", () => {
    let x = "limit";
    getList(x);
  });
