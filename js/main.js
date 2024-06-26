'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    // Табы
    const tabs =  document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach (item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach ((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
            }
        });
    }
    });

    // Таймер 
    const deadline = '2024-07-16';

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            "days": days,
            'hours': hours,
            'minutes':minutes,
            'seconds': seconds,
        };
    }



    function  setClock (selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval (updateClock, 1000);

        updateClock();

        function updateClock () {
            const t = getTimeRemaining (endtime);
            days.innerHTML = t.days,
            hours.innerHTML = t.hours,
            minutes.innerHTML = t.minutes,
            seconds.innerHTML = t.seconds;
            
            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        };
    };



    setClock ('.timer', deadline);



// Modal


const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal'),
modalCloseBtn = document.querySelector('[data-close]');

function openModal () {
    modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
};

function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    clearInterval(modalTimerId);
};

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal)
});

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});


const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll () {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
};

window.addEventListener('scroll', showModalByScroll);



/// Использование классов для карточек

class MenuCard {
    constructor (src, alt, title, description, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.transfer = 90;
        this.changetoRUB();
        this.parent = document.querySelector(parentSelector);
    }
    changetoRUB() {
        this.price = this.price * this.transfer;
    }
    render() {
        const element = document.createElement('div');
        element.innerHTML = `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}</div>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>`;
                this.parent.append(element);
    }
};


new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    15,
    '.menu .container'
).render();



new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    25,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    17,
    '.menu .container'
).render();


























});