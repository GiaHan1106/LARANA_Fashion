function checkUser() {
    const nameAdmin = sessionStorage.getItem("USER_LOGIN_ADMIN");
    console.log(nameAdmin);
    if (!nameAdmin) {
        window.location.href = "index.html";
    }
}
checkUser();
function showDashboard() {
    let dashboard = document.querySelector("#dashboard");
    dashboard.innerHTML = `<div class="c-dashboard">
    <h2>Dashboard</h2>
    <ul class="c_menu">
       
       <li><a href="javascript:;"><i class="fa-brands fa-pinterest"></i>
            Product Management<i class="fa-regular fa-chevron-down"></i>
            <ul class="c_subMenu">
                 <li><a href="productCate.html">Product portfolio</a></li>
                 <li><a href="productListAdmin.html">List of products</a></li>
            </ul>
        </a></li>
       <li><a href="orderListAdmin.html"><i class="fa-solid fa-cart-shopping"></i>Manage Order</a></li>
       <li><a href="userAdmin.html"><i class="fa-solid fa-user"></i>Manage User</a></li>
    </ul>
</div>`;
}
showDashboard();

function showAdmin() {
    const nameAdmin = sessionStorage.getItem("USER_LOGIN_ADMIN");
    let admin = document.querySelector("#topProfile");
    admin.innerHTML = ` <div class="c_nameAd">
    <h3>Website information</h3>
    <button onclick="logOutAdmin()" class="button2">Log Out</button>
    <div class="c_name">
        <h5>Hello! ${nameAdmin}</h5>
    </div>
</div>`;
}
function logOutAdmin() {
    sessionStorage.removeItem("USER_LOGIN_ADMIN");
    window.location.href = "index.html";
}

showAdmin();
$(function () {
    $(".c-dashboard .c_menu li:nth-child(1) a").click(function () {
        $(".c-dashboard .c_menu li .c_subMenu").slideToggle();
        $(this).find("i").toggleClass("active");
    });
});

const URL_API = `http://localhost:3000`;
async function getData(URL) {
    const promist = await fetch(URL);
    const data = await promist.json();
    return data;
}
