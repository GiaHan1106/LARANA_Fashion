const URL_API = `https://larana.onrender.com`;
const arrayCart = localStorage.getItem("LISTCART") ? JSON.parse(localStorage.getItem("LISTCART")) : [];
async function getData(URL) {
    const promist = await fetch(URL);
    const data = await promist.json();
    return data;
}

async function renderProduct(cate, box) {
    let API_PRODUCT;
    if (cate == "all") {
        API_PRODUCT = `${URL_API}/product`;
    } else {
        API_PRODUCT = `${URL_API}/product?cate=${cate}`;
    }
    const dataProduct = await getData(API_PRODUCT);
    renderHTMLProduct(box, dataProduct);
}
function renderHTMLProduct(box, data) {
    box.innerHTML = "";
    data.forEach((pro) => {
        box.innerHTML += `<div class="col-lg-3">
                <a href="detailProduct.html?id=${pro.id}" class="s_cardProduct">
                    <div class="s_img">
                        <img src="${pro.img}" alt="" />
                    </div>
                    <div class="s_inforProduct">
                        <h2>${pro.name}</h2>
                        <h3>$ ${pro.priceSale} <span>$ ${pro.price}</span></h3>
                    </div>
                    </a>
            
            </div>`;
    });
}
function renderHeader() {
    const header = document.querySelector("#header");
    header.innerHTML = `<marquee class="s-textRun">Add to cart <span class="s_price">$120</span> for free shipping <span class="s_item">&&</span>FREE EXCHANGE - At all stores for 30 days</marquee>
    <div class="container">
        <div class="s-header">
            <div class="s_logo">
                <a href=""><img src="./img/logo/logoheader.png" alt="" /></a>
            </div>
            <div class="s_menu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="aboutUs.html">About Us</a></li>
                    <li><a href="product.html">Product</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="s_search">
                <input type="text" placeholder="Search" />
                <i class="fa-light fa-magnifying-glass"></i>
            </div>
            <div class="s_icon">
                <a href="cart.html" class="s_card">
                    <i class="fa-thin fa-cart-shopping"></i>
                    <span>1</span>

                    <p>Cart</p>
                </a>
            </div>
        </div>
    </div>`;
    let input = document.querySelector(".s-header .s_search input");
    input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            window.location.href = `product.html?keySearch=${input.value}`;
        }
    });
}
renderHeader();

function renderFooter() {
    const footer = document.querySelector("#footer");
    footer.innerHTML = ` <div class="s-footer">
    <div class="s_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <img src="./img/logo/logoheader.png" alt="" />
                        <div class="s_address">
                            <i class="fa-solid fa-location-dot"></i>
                            <p class="s_footerText">UIT School</p>
                        </div>
                        <div class="s_address">
                            <i class="fa-solid fa-envelope"></i>
                            <p class="s_footerText">19521468@gm.uit.edu.vn</p>
                        </div>
                        <div class="s_address">
                            <i class="fa-solid fa-phone"></i>
                            <p class="s_footerText">1900-1565</p>
                        </div>
                        <div class="s_icon">
                            <a href="" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <ul>
                            <li>About Us</li>
                            <li>Delivery Info</li>
                            <li>Order Tracking</li>
                            <li>My Account</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="s_childFooter">
                        <h2>NEWSLETTER</h2>
                        <h5>Enjoy our newsletter to stay updated with the latest news and special sales.</h5>
                        <form>
                            <input required type="text" placeholder="Enter your email address" />
                            <button type="submit" class="s_letterPaper">
                                <i class="fa-regular fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="s_bot">
        <h3>© LARANA Fashion. All Rights Reserved.</h3>
        <img src="./img/logo/visa.png" alt="" />
    </div>
    <div class="s_up">
        <i class="fa-sharp fa-solid fa-up-long"></i>
    </div>
</div>`;
}
renderFooter();
function countCart() {
    const qualityCart = document.querySelector(".s-header .s_card span");
    qualityCart.innerHTML = arrayCart.length;
}
countCart();
