function forms(){
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


}

module.exports = forms;