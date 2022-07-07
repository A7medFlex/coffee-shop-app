let openBtn = document.querySelectorAll(".aboutItems .aboutItem .itemImg .btn");
let clickSound = document.querySelector("#clicking")
openBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    clickSound.play()
    openBtn.forEach( btn => {
      btn.parentElement.classList.remove("active")
      btn.style.animation = "none"  
    });
    e.currentTarget.parentElement.classList.add("active")
    let allImgs = document.querySelectorAll(".aboutItem .itemOffCanvas img")
    allImgs.forEach(img=>{
      img.remove()
    })
    let currentImg = document.createElement("img")
    currentImg.src = e.currentTarget.parentElement.firstChild.src
    e.currentTarget.parentElement.nextSibling.appendChild(currentImg)
  });
});

let closingBtn = document.querySelectorAll(".aboutItem .closing");
closingBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openBtn.forEach(btn =>{
      btn.parentElement.classList.remove("active")
      btn.style.animation = "btnAnim 0.5s ease infinite"
    })
  });
});
