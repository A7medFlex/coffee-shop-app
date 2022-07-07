// getting the BossCont
let BossCont = document.querySelector(
"section.products-page .container .products-cont"
);
// the main fetching function
function getProducts() {
  let prom = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", "https://coffeshopapi.herokuapp.com/api/products/", true);
    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(Error("faild to fetch the json object"));
    };
    req.send();
  });
  prom
    .then((data) => {
      jsProdObj = data;
      jsProdObjLen = data.length;
      filteringProducts(jsProdObj);
      showProducts(jsProdObj);
    }).catch((error) => {
      console.log(error);
    });
}
getProducts();

function filteringProducts(products) {
  let searchingInput = document.querySelector(
    ".searchingBox .inputSearch input"
  );
  searchingInput.oninput = (e) => {
    if(searchingInput.value){
      document.querySelectorAll(".filtering a").forEach(el=>{
        el.remove()
      })
      let filtering = new RegExp(e.currentTarget.value, "i");

      let filteredArrayObjs = products.filter((el) => {
        return el["name"].match(filtering);
      });
      for (i = 0; i < filteredArrayObjs.length; i++) {
        let theProdLink = document.createElement("a");
        theProdLink.href = `product.html?id=${filteredArrayObjs[i].id}`;
        let linkTxt = document.createTextNode(filteredArrayObjs[i].name);
        theProdLink.appendChild(linkTxt);
    
        let theImg = document.createElement("img");
        theImg.classList.add("searchingImg");
        theImg.src = filteredArrayObjs[i].image;
        theProdLink.appendChild(theImg);
    
        document.querySelector(".filtering").appendChild(theProdLink);
      }
    }else{
      document.querySelectorAll(".filtering a").forEach(el=>{
        el.remove()
      })
    }
  };
}

// displying products in the main page
function showProducts(products) {
  for (let i = 1; i <= products.length; i++) {
    let mainProdCont = document.createElement("div");
    mainProdCont.classList.add("product");

    let prodImg = document.createElement("div");
    prodImg.classList.add("product-image");
    prodImg.style.backgroundImage = `url("${products[i].image}")`;

    let imglink = document.createElement("a");
    imglink.classList.add("imgLink");
    imglink.href = `product.html?id=${products[i].id}`;
    imglink.appendChild(prodImg);

    let prodData = document.createElement("div");
    prodData.classList.add("product-data");

    let prodTitle = document.createElement("h3");
    prodTitle.classList.add("product-title");
    let titleTxt = document.createTextNode(products[i].name);
    prodTitle.appendChild(titleTxt);
    prodData.appendChild(prodTitle);

    let prodDesc = document.createElement("div");
    prodDesc.classList.add("product-desc");
    let descTxt = document.createTextNode(products[i].description);
    prodDesc.appendChild(descTxt);
    prodData.appendChild(prodDesc);

    let prodCals = document.createElement("span");
    prodCals.classList.add("calories");
    prodCals.appendChild(document.createTextNode(products[i].calories));
    prodData.appendChild(prodCals);

    let prodLink = document.createElement("a");
    prodLink.href = `product.html?id=${products[i].id}`;
    let linkTxt = document.createTextNode("Show Details");
    prodLink.appendChild(linkTxt);
    prodData.appendChild(prodLink);

    mainProdCont.appendChild(imglink);
    mainProdCont.appendChild(prodData);

    BossCont.appendChild(mainProdCont);
  }
}



// function to show each component

function getEachProd() {
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
      showEachProd(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getEachProd();

// show eachprodfunc
let subBoss = document.querySelector("section.singleProduct .mainProdCont");

function showEachProd(product) {
  let productData = document.createElement("div");
  productData.classList.add("productData");

  let productSubData = document.createElement("div");
  productSubData.classList.add("productSubdata");
  productData.appendChild(productSubData);

  let productImg = document.createElement("div");
  productImg.classList.add("productImg");
  productImg.style.backgroundImage = `url("${product.image}")`;
  productSubData.appendChild(productImg);

  let overlay = document.createElement("div");
  overlay.classList.add("imgOverlay");

  let overlayTitle = document.createElement("div");
  overlayTitle.classList.add("overlayTitle");
  overlayTitle.appendChild(document.createTextNode(product.name));
  overlay.appendChild(overlayTitle);

  let overlayCal = document.createElement("div");
  overlayCal.classList.add("overlayCal");
  overlayCal.appendChild(document.createTextNode(product.calories));
  overlay.appendChild(overlayCal);

  let overlayDesc = document.createElement("div");
  overlayDesc.classList.add("overlayDesc");
  overlayDesc.appendChild(document.createTextNode(product.description));
  overlay.appendChild(overlayDesc);

  let overlayNut = document.createElement("div");
  overlayNut.classList.add("overlayNut");
  overlayNut.appendChild(
    document.createTextNode(`Ingredients: ${product.nutrition}`)
  );
  overlay.appendChild(overlayNut);
  let orderLink = document.createElement("a");
  orderLink.classList.add("orderLink")
  orderLink.href = `order.html?id=${product.id}`;
  let OrdlinkTxt = document.createTextNode("Order Now");
  orderLink.appendChild(OrdlinkTxt);
  overlay.appendChild(orderLink);

  productImg.appendChild(overlay);

  let spreadingBtn = document.createElement("div");
  spreadingBtn.classList.add("spreadingBtn");
  let lockIcon = document.createElement("i");
  lockIcon.classList.add("fa-lock-alt", "fal");
  spreadingBtn.appendChild(lockIcon);
  productSubData.appendChild(spreadingBtn);

  let productTitle = document.createElement("div");
  productTitle.classList.add("productTitle");
  productTitle.appendChild(document.createTextNode(product.name));
  productSubData.appendChild(productTitle);

  

  subBoss.appendChild(productData);
  CommentsPart(product);

  let animatedDivs = document.querySelectorAll(".productImg .imgOverlay div");
  let spreading = document.querySelector(".spreadingBtn");
  let mainImgShow = document.querySelector(".productSubdata .productImg");
  let mainImgTit = document.querySelector(".productTitle");
  let mainImgOverlay = document.querySelector(".productImg .imgOverlay");

  spreading.addEventListener("click", (e) => {
    animatedDivs.forEach((div) => {
      const music = document.querySelector(".clickingAudio");
      music.play();
      mainImgShow.classList.add("active");
      mainImgTit.classList.add("active");
      mainImgOverlay.classList.add("active");
      div.classList.add("active");
      e.target.style.display = "none";
      document.querySelector(".orderLink").classList.add("active")
    });
  });
  
}

function CommentsPart(product) {
  let mainCommentDiv = document.createElement("div");
  mainCommentDiv.classList.add("productComments");

  // the first section of the comment section (adding)

  let addingCommentDiv = document.createElement("div");
  addingCommentDiv.classList.add("addingPart");

  let parag = document.createElement("div");
  parag.appendChild(document.createTextNode("Our clients reviews"));
  parag.classList.add("reviewsParag");
  addingCommentDiv.appendChild(parag);

  // user input
  let mainUserDiv = document.createElement("div");
  mainUserDiv.classList.add("nameField");

  let userInput = document.createElement("input");
  userInput.type = "text";
  userInput.setAttribute("required", "required");
  mainUserDiv.appendChild(userInput);
  userInput.classList.add("authorComment");

  let userIcon = document.createElement("i");
  userIcon.classList.add("fas", "fa-user", "userIcon");
  mainUserDiv.appendChild(userIcon);

  addingCommentDiv.appendChild(mainUserDiv);

  // texteare
  let MessageDiv = document.createElement("div");
  MessageDiv.classList.add("messageField");

  let textArea = document.createElement("textarea");
  textArea.cols = "20";
  textArea.rows = "20";
  textArea.setAttribute("required", "required");
  MessageDiv.appendChild(textArea);
  addingCommentDiv.appendChild(MessageDiv);

  let MessageIcon = document.createElement("i");
  MessageIcon.classList.add("fas", "fa-envelope");
  MessageDiv.appendChild(MessageIcon);

  //commentBtn
  let messageBtn = document.createElement("button");
  messageBtn.appendChild(document.createTextNode("add"));
  messageBtn.classList.add("messageBtn");
  addingCommentDiv.appendChild(messageBtn);

  mainCommentDiv.appendChild(addingCommentDiv);
  subBoss.appendChild(mainCommentDiv);
  console.log(product);

  // the second section of comment section (showing)
  let showingCommentDiv = document.createElement("div");
  showingCommentDiv.classList.add("showingPart");

  let addingBtn = document.querySelector(".messageBtn");
  let commentUsername = document.querySelector(".authorComment");
  let commentmessage = document.querySelector(".messageField textarea");

  addingBtn.addEventListener("click", () => {
    if (commentUsername.value !== "" && commentmessage.value !== "") {
      if (document.querySelector(".errMsg")) {
        document.querySelector(".errMsg").remove();
      }
      let obj = {};
      obj.user_name = commentUsername.value;
      obj.comment = commentmessage.value;
      obj.date = new Date().toLocaleString();

      commentUsername.value = "";
      commentmessage.value = "";

      let singleComment = document.createElement("div");
      singleComment.classList.add("singleComment");

      let commentAuthor = document.createElement("div");
      commentAuthor.classList.add("commentAuthor");
      commentAuthor.appendChild(document.createTextNode(obj.user_name));

      let commentDate = document.createElement("div");
      commentDate.classList.add("commentDate");
      commentDate.appendChild(document.createTextNode(obj.date));

      let dateAndAuthor = document.createElement("div");
      dateAndAuthor.classList.add("authAndDate");
      dateAndAuthor.appendChild(commentAuthor);
      dateAndAuthor.appendChild(commentDate);
      singleComment.appendChild(dateAndAuthor);

      let commentContent = document.createElement("div");
      commentContent.classList.add("commentContent");
      commentContent.appendChild(document.createTextNode(obj.comment));
      singleComment.appendChild(commentContent);

      showingCommentDiv.appendChild(singleComment);

      // here we will add the value of the array we have to the api
      // then out of this clicking we will make a function to show
      // the comments from the api with the same outline we did here
      let search = window.location.search; //?id=2
      let queryID = search.slice(search.indexOf("=") + 1);

      fetch(
        `https://coffeshopapi.herokuapp.com/api/products/${queryID}/comments/`,
        {
          method: "POST",
          // you gottal set the header like that so we tell it we will sen
          // json object
          headers: {
            "Content-Type": "application/json",
          },
          // we gotta stringfiy our js obj to be json obj when sending to api
          body: JSON.stringify(obj),
        }
      )
        .then((respond) => {
          return true;
        })
        .catch((err) => console.log(err));
    } else {
      // error message should be put and push it to the form layout
      if (document.querySelector(".errMsg")) {
        document.querySelector(".errMsg").remove();
      }
      let errMsg = document.createElement("div");
      errMsg.appendChild(document.createTextNode("Please fill the fields."));
      errMsg.classList.add("errMsg");

      let addingPart = document.querySelector(".addingPart");
      addingPart.appendChild(errMsg);
    }
  });
  // here we will make a function to bring the comments array which
  // will has objects we add from the array we made when clicking
  let comments = product.comments;
  comments.forEach((comm) => {
    let singleComment = document.createElement("div");
    singleComment.classList.add("singleComment");

    let commentAuthor = document.createElement("div");
    commentAuthor.classList.add("commentAuthor");
    commentAuthor.appendChild(document.createTextNode(comm.user_name));

    let commentDate = document.createElement("div");
    commentDate.classList.add("commentDate");
    commentDate.appendChild(document.createTextNode(comm.time));

    let dateAndAuthor = document.createElement("div");
    dateAndAuthor.classList.add("authAndDate");
    dateAndAuthor.appendChild(commentAuthor);
    dateAndAuthor.appendChild(commentDate);
    singleComment.appendChild(dateAndAuthor);

    let commentContent = document.createElement("div");
    commentContent.classList.add("commentContent");
    commentContent.appendChild(document.createTextNode(comm.comment));
    singleComment.appendChild(commentContent);

    showingCommentDiv.appendChild(singleComment);
  });

  console.log(comments);

  mainCommentDiv.appendChild(showingCommentDiv);
  subBoss.appendChild(mainCommentDiv);
}
