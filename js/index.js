//banner
$(function () {
    $(".s-banner .s_list").slick({
        autoplay: true,
    });
});

//filter categories
let filterCate = document.querySelector(".s-categories .row");
async function renderCate() {
    const API_PRODUCT = `${URL_API}/cate`;
    const dataProduct = await getData(API_PRODUCT);
    dataProduct.forEach((element) => {
        filterCate.innerHTML += `<div class="col-6 col-lg-3">
        <a href="product.html?idCate=${element.name}" class="s_kindProduct">
            <div class="s_img">
                <img src="${element.img}" alt="" />
            </div>
            <h3>${element.name}</h3>
        </a>
    </div>`;
    });
    console.log(dataProduct);
}
renderCate();

//ourProduct
let listTab = document.querySelectorAll(".s-ourProduct .s_bot .s_tab ul li");
let changeTab = document.querySelector(".s-ourProduct .s_bot .s_tab ul li");
let showCartProduct = document.querySelector(".s-ourProduct .s_bot .s_product .row");

listTab.forEach((tab) => {
    tab.addEventListener("click", function () {
        listTab.forEach((otherTab) => {
            otherTab.classList.remove("active");
        });
        tab.classList.add("active");
        const tabText = tab.textContent.toLowerCase();
        renderProduct(tabText, showCartProduct);
    });
});

//XU LY API
renderProduct("man", showCartProduct);
//showProduct
let listDotProduct = document.querySelectorAll(".s-showProduct .s_dot");
listDotProduct.forEach((dot) => {
    dot.addEventListener("click", function (e) {
        e.target.closest(".s_shirt").classList.toggle("active");
    });
});

//Flashsale
const saleEndDate = new Date("2023-12-17 00:00:00").getTime();
const countdown = setInterval(function () {
    const now = new Date().getTime();
    const timeRemaining = saleEndDate - now;
    if (timeRemaining <= 0) {
        clearInterval(countdown);
        document.getElementById("days").innerHTML = "20";
        document.getElementById("hours").innerHTML = "12";
        document.getElementById("minutes").innerHTML = "30";
        document.getElementById("seconds").innerHTML = "20";
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
    }
}, 1000);

//feedback
$(".s-feedBack .s_listFeed ").slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplay: true,
});
