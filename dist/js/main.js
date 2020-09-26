// Modal

const modal = document.querySelector(".modal");
const modalOpen = document.querySelectorAll("[data-modal]");
const modalCloseBtn = document.querySelector("[data-close]");

modalOpen.forEach( btn =>{
    btn.addEventListener("click", () => {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // modal.classList.toggle("show");
    });
});

function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = " ";
    // modal.classList.toggle("show");
}

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