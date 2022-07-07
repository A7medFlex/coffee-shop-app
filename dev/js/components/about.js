let Infos = document.querySelector("section.about .infos");
let fromTop = Infos.offsetTop;
let outerHeight = Infos.offsetHeight;
let screenHeight = this.innerHeight;
window.onscroll = ()=>{
    if(window.pageYOffset > (fromTop + outerHeight - screenHeight * 2.1)){
        Infos.classList.add('active')
    }
}