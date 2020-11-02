window.addEventListener('DOMContentLoaded', () => {

// Modal

const modal = document.querySelector(".modal");
const modalOpen = document.querySelectorAll("[data-modal]");
// const modalCloseBtn = document.querySelector("[data-close]");

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

// modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if(e.target === modal || e.target.getAttribute("data-close") == "" ){
      closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if(e.code === "Escape" && modal.classList.contains("show")){
        closeModal();
    }
});

const modalTimer = setTimeout(openModal, 50000);

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
    }
}

window.addEventListener("scroll", showModalByScroll);

// Tabs

    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

// Timer

    const deadline = "2021-01-01";

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return{
            "total" : t,
            "days" : days,
            "hours" : hours,
            "minutes" : minutes,
            "seconds" : seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // days.innerHTML = t.days;
            // hours.innerHTML = t.hours;
            // minutes.innerHTML = t.minutes;
            // seconds.innerHTML = t.seconds;

            if(t.total <= 0){
                clearInterval(timeInterval);
                days.innerHTML = "0";
                hours.innerHTML = "0";
                minutes.innerHTML = "0";
                seconds.innerHTML = "0";
            }
        }
    }

    setClock('.timer', deadline);

// Class for Cards

    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = +this.price * this.transfer;
        }

        render(){
            const element = document.createElement("div");

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.title}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
        }

        return await res.json();
    };

    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { 
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

    // Forms

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinners.svg",
        success: "Спасибо! Cкоро мы с Вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 20px auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            // const request = new XMLHttpRequest();
            // request.open("POST", "server.php");

            // request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            // request.send(json);

            // fetch("server.php", {
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify(object)
            // })

            // postData("http://localhost:3000/requests", JSON.stringify(object))
            // .then(data => data.text())
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener("load", () => {
            //     if (request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message){
        const prevModalDiolog = document.querySelector(".modal__dialog");
        prevModalDiolog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDiolog.classList.add("show");
            prevModalDiolog.classList.remove("hide");
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


// Slider 

const slides = document.querySelectorAll(".offer__slide");
const btnPrev = document.querySelector(".offer__slider-prev");
const btnNext = document.querySelector(".offer__slider-next");
const current = document.querySelector("#current");
const total = document.querySelector("#total");
let slideIndex = 1;

showSlide(slideIndex);

if(slides.length < 10){
    total.textContent = `0${slides.length}`;
}else{
    total.textContent = slides.length;
};

function showSlide(n){
    if(n > slides.length) {
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = "none");
    slides[slideIndex - 1].style.display = "block";

    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    };
}

function plusSlides(n){
    showSlide(slideIndex += n);
}

btnPrev.addEventListener("click", () => {
    plusSlides(-1);
});

btnNext.addEventListener("click", () => {
    plusSlides(1);
});

});