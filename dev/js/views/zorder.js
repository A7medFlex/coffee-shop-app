function getProd() {
  let search = window.location.search; //?id=2
  let queryID = search.slice(search.indexOf("=") + 1);
  let newProm = new Promise((resolve, reject) => {
    let myRequest = new XMLHttpRequest();
    myRequest.open(
      "GET",
      `https://coffeshopapi.herokuapp.com/api/products/${queryID}`,
      true
    );
    myRequest.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(Error(req.statusText));
      }
    };
    myRequest.onerror = () => {
      reject(Error("faild to fetch the json object"));
    };
    myRequest.send();
  });
  newProm
    .then((data) => {
      orderProd(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getProd();

function orderProd(product) {
  let mainProdOrder = document.querySelector(
    "section.orderPage .container .mainContent"
  );

  // console.log(mainProdOrder);

  let prodOrdDesc = document.createElement("div");
  prodOrdDesc.classList.add("prodOrderDesc");

  let productImgOrder = document.createElement("div");
  productImgOrder.classList.add("productImgOrder");
  productImgOrder.style.backgroundImage = `url("${product.image}")`;
  prodOrdDesc.appendChild(productImgOrder);

  let prodOrdName = document.createElement("div");
  prodOrdName.appendChild(document.createTextNode(product.name));
  prodOrdName.classList.add("prodOrdName");
  prodOrdDesc.appendChild(prodOrdName);

  mainProdOrder.appendChild(prodOrdDesc);

  let prodOrd = document.createElement("div");
  prodOrd.classList.add("prodOrd");

  let prodPrice = document.createElement("div");
  prodPrice.classList.add("prodPrice");
  let spanPrice = document.createElement("span");
  spanPrice.appendChild(document.createTextNode(product.price));
  prodPrice.appendChild(document.createTextNode("Price:"));
  prodPrice.appendChild(spanPrice);
  let dollSpan = document.createElement("span");
  dollSpan.appendChild(document.createTextNode("$"));
  prodPrice.appendChild(dollSpan);

  let mainProdCount = document.createElement("div");
  let prodCount = document.createElement("input");
  prodCount.classList.add("count");
  prodCount.type = "number";
  prodCount.id = "count";
  prodCount.value = "1";
  prodCount.min = "1";
  prodCount.max = "10";
  let countLabel = document.createElement("label");
  countLabel.for = "count";
  countLabel.appendChild(document.createTextNode("Amount:"));
  mainProdCount.appendChild(countLabel);
  mainProdCount.appendChild(prodCount);

  let totalCont = document.createElement("div");
  totalCont.classList.add("totalPrice");
  totalCont.appendChild(document.createTextNode("Total:"));
  totalCont.appendChild(document.createElement("span"));

  prodOrd.appendChild(prodPrice);
  prodOrd.appendChild(mainProdCount);
  prodOrd.appendChild(totalCont);

  mainProdOrder.appendChild(prodOrd);

  let totalSpan = document.querySelector(".totalPrice span");
  let inputNum = document.querySelector(".count");
  let normPrice = document.querySelector(".prodPrice span");
  totalSpan.textContent = `${normPrice.textContent}$`;
  inputNum.onchange = (e) => {
    totalSpan.textContent = `${e.currentTarget.value * normPrice.textContent}$`;
  };

  let userData = document.createElement("div");
  userData.classList.add("userData");

  let ordFirstName = document.createElement("input");
  ordFirstName.type = "text";
  ordFirstName.placeholder = "Firstname";
  ordFirstName.classList.add("ordFirstName");
  userData.appendChild(ordFirstName);

  let ordLastName = document.createElement("input");
  ordLastName.type = "text";
  ordLastName.placeholder = "Lastname";
  ordLastName.classList.add("ordLastName");
  userData.appendChild(ordLastName);

  let ordAddr = document.createElement("input");
  ordAddr.type = "text";
  ordAddr.placeholder = "Address";
  ordAddr.classList.add("ordAddr");
  userData.appendChild(ordAddr);

  let ordPhone = document.createElement("input");
  ordPhone.type = "text";
  ordPhone.placeholder = "Phone number";
  ordPhone.classList.add("ordPhone");
  userData.appendChild(ordPhone);

  let subBtn = document.createElement("button");
  subBtn.classList.add("subOrd");
  subBtn.textContent = "Send";
  userData.appendChild(subBtn);

  mainProdOrder.appendChild(userData);

  let orderModel = document.createElement("div");
  orderModel.classList.add("orderModel");
  let orderSent = document.createElement("div");
  orderSent.classList.add("orderSent");
  orderModel.appendChild(orderSent);
  mainProdOrder.appendChild(orderModel);

  let submitOrd = document.querySelector(".userData button");

  let inputs = document.querySelectorAll(".userData input");

  submitOrd.addEventListener("click", (e) => {
    let orderDataJS = {
      orderName: product.name,
      amount: parseInt(document.querySelector("input[type='number']").value),
      totalPrice: document.querySelector(".totalPrice span").textContent,
      clientName: `${
        document.querySelector(".userData input[placeholder='Firstname']").value
      } ${
        document.querySelector(".userData input[placeholder='Lastname']").value
      }`,
      clientAddr: document.querySelector(
        ".userData input[placeholder='Address']"
      ).value,
      clientPhone: document.querySelector(
        ".userData input[placeholder='Phone number']"
      ).value,
    };

    console.log(orderDataJS);

    inputs.forEach((input) => {
      if (input.value !== "") {
        document.querySelector(".orderSent").innerHTML = "";

        let clientNameDiv = document.createElement("div");
        clientNameDiv.appendChild(document.createTextNode(`Name:`));
        let clientNameDiv2 = document.createElement("span");
        clientNameDiv2.appendChild(
          document.createTextNode(orderDataJS.clientName)
        );
        clientNameDiv.appendChild(clientNameDiv2);
        document.querySelector(".orderSent").appendChild(clientNameDiv);

        let AddrDiv = document.createElement("div");
        AddrDiv.appendChild(document.createTextNode(`Address:`));
        let AddrDiv2 = document.createElement("span");
        AddrDiv2.appendChild(document.createTextNode(orderDataJS.clientAddr));
        AddrDiv.appendChild(AddrDiv2);
        document.querySelector(".orderSent").appendChild(AddrDiv);

        let PhoneDiv = document.createElement("div");
        PhoneDiv.appendChild(document.createTextNode(`Phone:`));
        let PhoneDiv2 = document.createElement("span");
        PhoneDiv2.appendChild(document.createTextNode(orderDataJS.clientPhone));
        PhoneDiv.appendChild(PhoneDiv2);
        document.querySelector(".orderSent").appendChild(PhoneDiv);

        let nameDiv = document.createElement("div");
        nameDiv.appendChild(document.createTextNode("Order Name:"));
        let nameDiv2 = document.createElement("span");
        nameDiv2.appendChild(document.createTextNode(orderDataJS.orderName));
        nameDiv.appendChild(nameDiv2);
        document.querySelector(".orderSent").appendChild(nameDiv);

        let amountDiv = document.createElement("div");
        amountDiv.appendChild(document.createTextNode(`Amount:`));
        let amountDiv2 = document.createElement("span");
        amountDiv2.appendChild(document.createTextNode(orderDataJS.amount));
        amountDiv.appendChild(amountDiv2);
        document.querySelector(".orderSent").appendChild(amountDiv);

        let priceDiv = document.createElement("div");
        priceDiv.appendChild(document.createTextNode(`Price:`));
        let priceDiv2 = document.createElement("span");
        priceDiv2.appendChild(document.createTextNode(orderDataJS.totalPrice));
        priceDiv.appendChild(priceDiv2);
        document.querySelector(".orderSent").appendChild(priceDiv);

        let confirmBtn = document.createElement("button");
        confirmBtn.classList.add("confirmBtn");
        confirmBtn.appendChild(document.createTextNode("Confirm"));
        document.querySelector(".orderSent").appendChild(confirmBtn);

        document.querySelector(".orderModel").classList.add("active");
        document.querySelector(".orderSent").classList.add("active");
        document.querySelector(".userData").classList.add("active");

       
      }
    });
    let confirmBtn = document.querySelector(".confirmBtn");
    confirmBtn.addEventListener("click", () => {
      document.querySelector(".orderModel").classList.remove("active");
      document.querySelector(".orderSent").classList.remove("active");
      document.querySelector(".userData").classList.remove("active");
      // console.log(inputs)
      inputs.forEach((input) => {
        input.value = "";
      });
      let succssOrd = document.createElement("div")
      succssOrd.classList.add("succssOrd")
      succssOrd.appendChild(document.createTextNode("Order Sent successfully"))
      document.querySelector(".orderPage").appendChild(succssOrd)
      succssOrd.style.animation = 'fading 15s ease forwards'

      fetch(`https://coffeshopapi.herokuapp.com/api/orders/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDataJS),
      })
        .then((respond) => {
          return true;
        })
        .catch((err) => console.log(err));
    });
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("orderModel")) {
    document.querySelector(".orderModel").classList.remove("active");
    document.querySelector(".orderSent").classList.remove("active");
    document.querySelector(".userData").classList.remove("active");
  }
});
