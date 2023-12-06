//chooseSize
document.querySelectorAll(".s_chooseSize li").forEach((li) => {
    li.addEventListener("click", function () {
        document.querySelectorAll(".s_chooseSize li").forEach((size) => {
            size.classList.remove("active");
        });
        li.classList.add("active");
        let getSize = li.getAttribute("data-size");
        document.querySelector(".s_inforPro h5 span").innerHTML = getSize;
    });
});
// //Quality
const clickQuality = document.querySelectorAll(".s_qualityAndAddCart i");
let quality = document.querySelector(".s_qualityAndAddCart .s_number").innerHTML;
clickQuality.forEach((element) => {
    element.addEventListener("click", function () {
        let type = element.getAttribute("data-type");
        if (type == "plus") {
            quality++;
        } else {
            if (quality > 1) {
                quality--;
            }
        }
        document.querySelector(".s_qualityAndAddCart .s_number").innerHTML = quality;
    });
});
//TypeReturnProduct
$(function () {
    $(".s-policyReturn .s_policy .s_tab .s_changeTab").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $id = $(this).attr("data-type");
        $($id).addClass("active");
        $($id).siblings().removeClass("active");
    });
    $(".s-detailPro .s_detail .c-button-5").click(async function () {
        $chooseSize = $(".s-detailPro .s_detail .s_inforPro .s_size span").text();
        $chooseQuanlity = $(".s_qualityAndAddCart .s_number").text();
        if ($chooseSize == "") {
            alert("Not select size");
        } else {
            const API_PRODUCT = `${URL_API}/product/${id}`;
            const data = await getData(API_PRODUCT);
            $(".s-detailPro .s_cart").addClass("active");
            $(".s-detailPro .s_cart .s_left img").attr("src", data.img);
            $(".s-detailPro .s_cart .s_right h2").text(data.name);
            $(".s-detailPro .s_cart .s_right h3").text("$" + data.priceSale);
            $(".s-detailPro .s_cart .s_right h5 span").text($chooseSize);
            $(".s-detailProduct .s_right .s_size").text($chooseSize);
            setTimeout(() => {
                $(".s-detailPro .s_cart").removeClass("active");
            }, 2000);

            const objCart = {
                detail: data,
                choice: {
                    size: $chooseSize,
                    quanlity: $chooseQuanlity,
                },
                id: arrayCart.length,
            };
            const findProduct = arrayCart.findIndex((item) => {
                if (item.detail.id == id && item.choice.size == $chooseSize) {
                    return item;
                }
            });
            if (findProduct >= 0) {
                if (arrayCart[findProduct].choice.size == $chooseSize) {
                    arrayCart[findProduct].choice.quanlity = parseInt(arrayCart[findProduct].choice.quanlity) + parseInt($chooseQuanlity);
                } else {
                    arrayCart.push(objCart);
                }
            } else {
                arrayCart.push(objCart);
            }
            localStorage.setItem("LISTCART", JSON.stringify(arrayCart));
            countCart();
        }
    });
});
//fetch API Show product
//get id
const detailImg = document.querySelector(".s-detailPro .s_detail .s_img img");
const detailName = document.querySelector(".s-detailPro .s_detail .s_inforPro .s_title");
const detailPriceSave = document.querySelector(".s-detailPro .s_detail .s_priceSale");
const detailPrice = document.querySelector(".s-detailPro .s_detail .s_price");
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
async function renderDetail() {
    const API_PRODUCT = `${URL_API}/product/${id}`;
    const data = await getData(API_PRODUCT);
    detailImg.src = data.img;
    detailName.innerHTML = data.name;
    detailPriceSave.innerHTML = data.priceSale + "$";
    detailPrice.innerHTML = data.price + " $";
}
renderDetail();
