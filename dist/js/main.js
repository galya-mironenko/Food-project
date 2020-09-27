// Modal

const modal = document.querySelector(".modal");
const modalOpen = document.querySelectorAll("[data-modal]");
const modalCloseBtn = document.querySelector("[data-close]");



function openModal(){
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // modal.classList.toggle("show");
    clearInterval(modalTimer);
}

function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    // modal.classList.toggle("show");
}

modalOpen.forEach( btn =>{
    btn.addEventListener("click", openModal);
});

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if(e.target === modal){
      closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if(e.code === "Escape" && modal.classList.contains("show")){
        closeModal();
    }
});

const modalTimer = setTimeout(openModal, 5000);

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
    }
}

window.addEventListener("scroll", showModalByScroll);