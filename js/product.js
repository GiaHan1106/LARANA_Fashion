let url = new URL(window.location.href);
let idcate = url.searchParams.get("idCate");
let searchKey = url.searchParams.get("keySearch");

let showProduct = document.querySelector(".s-productPage .s_showPro .s_product .row");

async function renderListProduct() {
    if (searchKey) {
        const API_PRODUCT = `${URL_API}/product?name_like=${searchKey}`;
        const dataSearchProduct = await getData(API_PRODUCT);
        renderHTMLProduct(showProduct, dataSearchProduct);
    } else if (idcate) {
        const API_PRODUCT = `${URL_API}/product?cate=${idcate}`;
        const dataSearchProduct = await getData(API_PRODUCT);
        renderHTMLProduct(showProduct, dataSearchProduct);
    } else {
        renderProduct("all", showProduct);
    }
}
renderListProduct();
//filter product
let filterCate = document.querySelectorAll("#filterCate li");
filterCate.forEach((li) => {
    li.addEventListener("click", function () {
        renderProduct(li.textContent.toLowerCase(), showProduct);
        filterCate.forEach((li2) => {
            li2.classList.remove("active");
        });
        li.classList.add("active");
    });
});

let filterPrice = document.querySelectorAll("#filterPrice li");
filterPrice.forEach((li) => {
    li.addEventListener("click", async function () {
        let min = li.getAttribute("data-min");
        let max = li.getAttribute("data-max");
        const API_PRODUCT = `${URL_API}/product`;
        const dataProduct = await getData(API_PRODUCT);
        let dataResult = dataProduct.filter((item) => item.priceSale > min && item.priceSale < max);
        renderHTMLProduct(showProduct, dataResult);
        filterPrice.forEach((li2) => {
            li2.classList.remove("active");
        });
        li.classList.add("active");
    });
});
$(".s-productPage .s_filterProduct .s_filter .s_showFilter").click(function () {
    $(this).parent().find("ul").slideToggle();
    $(this).toggleClass("active");
});
