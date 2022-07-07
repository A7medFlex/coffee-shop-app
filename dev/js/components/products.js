let modal = document.querySelector(".main-products-cont .modal");

let previewImgs = document.querySelectorAll(
  ".main-products-cont .product-cont .product img"
);
let fullImg = document.querySelector(".main-products-cont .modal img");
let caption = document.querySelector(".main-products-cont .modal p");

previewImgs.forEach((ele) => {
  ele.addEventListener("click", ()=> {
    document.querySelector("#clicking").play()
    fullImg.src = ele.src;
    caption.textContent = ele.alt;
    modal.classList.add("open");
    fullImg.classList.add("open");
    
  });
});
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("modal")){
        modal.classList.remove("open")
        fullImg.classList.remove("open")
    }
})