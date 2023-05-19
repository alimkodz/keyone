(function () {
    /*MENU*/
    const menu = document.getElementById('menu');
    const menuBody = document.getElementById('menuBody');
    const menuBtn = document.getElementById('menuBtn');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('menu_open');
    });

    menuBody.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target != this) {
                const targetId = evt.target.getAttribute('href');
                const targetSection = document.getElementById(targetId);
                const targetPosition = targetSection.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 500; 
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                    if (progress < duration) window.requestAnimationFrame(step);
                }

                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }

                window.requestAnimationFrame(step);
                menu.classList.remove('menu_open');
        }
    });

    /*GALLERY*/
    const galleryImages = document.getElementById('galleryImages');
    const galNextBtn = document.getElementById('galNext');
    const galPrevBtn = document.getElementById('galPrev');

    let imageWidth = document.querySelector('.gallery__item').offsetWidth;
    let imageIndex = 1;
    let currentPos = 0;

    galNextBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        galleryImages.children[imageIndex].classList.remove('gallery__item_active');
        imageIndex++;
        currentPos -= imageWidth;
        if (imageIndex === galleryImages.children.length) {
            imageIndex = 0;
            currentPos = imageWidth; 
        }
        galleryImages.children[imageIndex].classList.add('gallery__item_active');
        galleryImages.style.transform = 'translateX(' + (currentPos) + 'px)';
    });
    galPrevBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        galleryImages.children[imageIndex].classList.remove('gallery__item_active');
        imageIndex--;
        currentPos += imageWidth;
        if (imageIndex < 0) {
            imageIndex = galleryImages.children.length - 1;
            currentPos = -imageWidth * (imageIndex - 1);
        }
        galleryImages.children[imageIndex].classList.add('gallery__item_active');
        galleryImages.style.transform = 'translateX(' + (currentPos) + 'px)';
    });

    /*REGISTRATION FORM*/
    const regFrm = document.getElementById('regFrm');
    const regFrmFields = document.getElementById('regFrmFields');
    const regFrmEmail = document.getElementById('regFrmEmail');
    const regFrmPhone = document.getElementById('regFrmPhone');
    const regFrmSubmit = document.getElementById('regFrmSubmit');
    const regFrmClose = document.getElementById('regFrmClose');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(8|\+7)\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
    const chars = '!@#$%^&*()-=_+{}\'"\\|/№;:?.,~`'.split('');

    let registrationCompleted = false;

    regFrmFields.addEventListener('focusout', function (evt) {
        if (evt.target != this) {
            if (evt.target.value.length < 2) {
                evt.target.style.borderBottomColor = 'rgba(255, 21, 35, 0.6)';
                evt.target.nextElementSibling.textContent = evt.target.placeholder + ' не может быть менее двух символов';
                evt.target.parentNode.lastElementChild.previousElementSibling.style.display = 'none'
                evt.target.parentNode.lastElementChild.style.display = 'inline'
                registrationCompleted = false;
            }
            else if (chars.some((ch) => {
                return evt.target.value.includes(ch);
            }) && evt.target != regFrmEmail && evt.target != regFrmPhone) {
                evt.target.style.borderBottomColor = 'rgba(255, 21, 35, 0.6)';
                evt.target.nextElementSibling.textContent = evt.target.placeholder + ' содержит некорректные символы';
                evt.target.parentNode.lastElementChild.previousElementSibling.style.display = 'none'
                evt.target.parentNode.lastElementChild.style.display = 'inline'
                registrationCompleted = false;
            }
            else if (evt.target == regFrmEmail && !emailRegex.test(evt.target.value)) {
                evt.target.style.borderBottomColor = 'rgba(255, 21, 35, 0.6)';
                evt.target.nextElementSibling.textContent = evt.target.placeholder + ' имеет некорректный формат';
                evt.target.parentNode.lastElementChild.previousElementSibling.style.display = 'none'
                evt.target.parentNode.lastElementChild.style.display = 'inline'
                registrationCompleted = false;
            }
            else if (evt.target == regFrmPhone && !phoneRegex.test(evt.target.value)) {
                evt.target.style.borderBottomColor = 'rgba(255, 21, 35, 0.6)';
                evt.target.nextElementSibling.textContent = evt.target.placeholder + ' имеет некорректный формат';
                evt.target.parentNode.lastElementChild.previousElementSibling.style.display = 'none'
                evt.target.parentNode.lastElementChild.style.display = 'inline'
                registrationCompleted = false;
            }
            else {
                evt.target.style.borderBottomColor = 'rgba(22, 168, 71, 0.6)';
                evt.target.nextElementSibling.textContent = '';
                evt.target.parentNode.lastElementChild.previousElementSibling.style.display = 'inline'
                evt.target.parentNode.lastElementChild.style.display = 'none'
                registrationCompleted = true;
            }
        }
    });

    regFrmSubmit.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (registrationCompleted)
            regFrm.classList.add('registration-form_completed');
        else {
            alert('некоректные данные');
        }
    });
    regFrmClose.addEventListener('click', () => {
        regFrm.classList.remove('registration-form_completed');
    });
})();