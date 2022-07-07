// start of home landing section.
document.documentElement.style.setProperty("--intro-img",localStorage.getItem("introImg"));
console.log(localStorage)
liImgs = document.querySelectorAll(".images-cont li");
liImgs.forEach(img => {
    img.addEventListener("click",(e)=>{
        document.querySelector("#clicking").play()
        document.documentElement.style.setProperty("--intro-img",e.currentTarget.dataset.img);
        localStorage.setItem("introImg",e.currentTarget.dataset.img)
    })
});

// start of the intro text strok
const logo = document.querySelectorAll("#logo path")
// looping to get the stroke dasharray of each chars to make it complete
for(let i = 0 ; i< logo.length; i++){
    // we will use the length output to type it in css 
    console.log(`${i} => ${logo[i].getTotalLength()}`)
}
