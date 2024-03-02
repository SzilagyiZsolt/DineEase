/* -- Csak akkor fut le, ha a DOM betöltődött -- */
document.addEventListener('DOMContentLoaded', function () {
    // A függvényeket a DOM betöltődése után definiáljuk, hogy biztosan létezzenek a szükséges elemek
    function init() {

        const top3 = document.getElementById('top3restorants');
        top3.addEventListener('load', getTop3());
    };
    async function getTop3() {
        const response = await fetch('data/top-rated-restauransts.json');
        const data = await response.json(); // response.json() returns a promise
        console.log(data);
        let html = ''; // create a variable to store the HTML
        for (let index = 0; index < data.length; index++) {
            html += getRestoranteCard(data[index]);
            
        }
        top3restorants.innerHTML = html; //-- frissíti a DOM-ot, megjeleníti a kártyákat
    }
    function getRestoranteCard(restoranteData) {
        let html = `<div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
                        <div class="card rounded-4 top3card">
                            <img src="${restoranteData.image}"  class="card-img-top p-3 rounded-4" alt="${restoranteData.name}">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-between">
                                    <span class="col-5">${restoranteData.name.trim()}</span>
                                    <span class="col-4">${rate(restoranteData.rating)}</span>
                                </h5>
                                <p class="text-start">${restoranteData.description}</p>
                                <a href="#" class="p-3 d-flex justify-content-end card-link"> Viewrestaurant >></a>
                            </div>
                        </div>
                    </div>`;
        return html;
    }
    function rate(rate) {
        let stars = '';
        for (let index = 0; index < 5; index++) {
            if (index > rate-1) {
                stars += '<img src="images/star.png" alt="star" class="grey">';
                continue;
            } else {
                stars += '<img src="images/star.png" alt="star">';
            }
        }
        return stars;
    }
    init();

    }
);