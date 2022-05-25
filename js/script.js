var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var updateBTN = document.getElementById("add");
var search = document.getElementById("search");

var productId = document.getElementById("productId");
var productsList = [];
var storedData = JSON.parse(localStorage.getItem("productsList"));

if (storedData != null) {
  productsList = storedData;
  displayProduct();
}
function addProduct() {
  var id = Date.now();

  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
    id: id,
  };

  productsList.push(product);

  localStorage.setItem("productsList", JSON.stringify(productsList));
  displayProduct();
  clearForm();
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProduct() {
  var table = "";
  for (var i = 0; i < productsList.length; i++) {
    table += `<tr>
                    <td>${i + 1}</td>
                    <td> ${productsList[i].name} </td>
                    <td>${productsList[i].price} </td>
                    <td>${productsList[i].category}</td>
                    <td>${productsList[i].desc}</td>
                    <td>${productsList[i].id}</td>
                    <td><button class="btn btn-warning" 
                    onClick={handleUpdate(${productsList[i].id})}  
                    >Update</button></td>
                    <td><button class="btn btn-danger" 
                    onClick={handleDelete(${productsList[i].id})}  
                    >Deleted</button></td>
                </tr>`;
  }

  document.getElementById("myData").innerHTML = table;
}

function handleDelete(id) {
  productsList = productsList.filter((product) => product.id != id);
  localStorage.setItem("productsList", JSON.stringify(productsList));
  displayProduct();
}

function handleUpdate(id) {
  productName.value = productsList.find((product) => product.id == id).name;
  productPrice.value = productsList.find((product) => product.id == id).price;
  productCategory.value = productsList.find(
    (product) => product.id == id
  ).category;
  productDesc.value = productsList.find((product) => product.id == id).desc;
  updateBTN.innerHTML = "Update Product";
  localStorage.setItem("productsList", JSON.stringify(productsList));
  updateBTN.onclick = function () {
    handleDelete(id);
    addProduct();
    clearForm();
    updateBTN.innerHTML = "Add Product";
  };
}

function handleSearch() {
  var searchResult = productsList.filter(
    (product) =>
      product.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1
  );
  displayProduct(searchResult);
}
