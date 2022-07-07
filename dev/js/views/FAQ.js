let questionbtnopen = document.querySelectorAll(
  ".questions .s-question .q .fa-lock-alt"
);
let questionbtnclose = document.querySelectorAll(
  ".questions .s-question .q .fa-lock-open-alt"
);

questionbtnopen.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector("#clickingAudio").play()
    questionbtnopen.forEach((btn) => {
      btn.nextElementSibling.style.display = "none";
      btn.style.display = "inline-block";
    });

    let allQ = document.querySelectorAll(".s-question .a");
    allQ.forEach((Q) => {
      Q.classList.remove("active");
    });
    e.currentTarget.parentElement.nextSibling.classList.toggle("active");

    e.currentTarget.style.display = "none";
    e.currentTarget.nextSibling.style.display = "inline-block";
  });
});
questionbtnclose.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.currentTarget.style.display = "none";
    e.currentTarget.previousSibling.style.display = "inline-block";
    e.currentTarget.parentElement.nextSibling.classList.remove("active");
  });
});
