//CATEGORY
const API_LISTCATE = `${URL_API}/cate`;
const category = document.querySelector("#listCategory");

async function renderSelect(apilink, selector) {
    const data = await getData(apilink);
    data.forEach((element) => {
        selector.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    });
}
renderSelect(API_LISTCATE, category);

const API_LIST = `${URL_API}/product`;
const inputName = document.querySelector("input[name='title']");
const inputPrice = document.querySelector("input[name='price']");
const inputPriceSale = document.querySelector("input[name='priceSale']");
const imgInput = document.querySelector("input[name='picture']");
const imgGet = document.querySelector(".imgGet");
const imgGetElse = document.querySelector("input[name='imgGetElse']");
const btnAdd = document.querySelector("#create");
const btnUpdate = document.querySelector("#update");

//function chuyen hinh thanh base 64
let uploadImage = "";
imgInput.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnAdd.addEventListener("click", async function () {
    const objListPro = {
        cate: category.value,
        name: inputName.value,
        price: inputPrice.value,
        priceSale: inputPriceSale.value,
        img: uploadImage || imgGet.src,
    };

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objListPro),
    };
    const res = await fetch(`${API_LIST}`, option);
    if (res.ok) {
        alert("Save Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
});

const table = document.querySelector(".c-table tbody");
async function renderProduct() {
    const data = await getData(API_LIST);
    table.innerHTML = "";
    data.forEach((element) => {
        table.innerHTML += `    <td>${element.id}</td>
        <td><img src="${element.img}" alt=""></td>
        <td>${element.name}</td>
        <td>${element.cate}</td>
        <td>${element.price}</td>
        <td>${element.priceSale}</td>
        <td><button onclick="deleteProduct(${element.id})">Delete</button></td>
        <td><button onclick="updateProduct(${element.id})">Update</button></td>`;
    });
}
renderProduct();

async function deleteProduct(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await fetch(`${API_LIST}/${id}`, option);
    if (res.ok) {
        alert("Delete Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
}

async function updateProduct(id) {
    const data = await getData(`${API_LIST}/${id}`);
    category.value = data.cate;
    inputName.value = data.name;
    inputPrice.value = data.price;
    inputPriceSale.value = data.priceSale;
    imgGet.src = data.img;
    btnUpdate.style.display = "block";
    btnAdd.style.display = "none";
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async function () {
    const id = btnUpdate.getAttribute("data-id");
    const objProduct = {
        cate: category.value,
        name: inputName.value,
        price: inputPrice.value,
        priceSale: inputPriceSale.value,
        img: uploadImage || imgGet.src,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objProduct),
    };
    const res = await fetch(`${API_LIST}/${id}`, option);
    if (res.ok) {
        alert("Update Complete");
        renderProduct();
    } else {
        alert("Fail");
    }
});
