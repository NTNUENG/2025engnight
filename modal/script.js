function closeModal() {
    const modal = document.querySelector('.modal-active');
    modalControl(modal, false);
}

window.onclick = function (event) {
    const modal = document.querySelector('.modal-active');
    if (event.target == modal) {
        modalControl(modal, false);
    }
}

function openModal(id) {
    const modal = document.querySelector('#modal-' + id);
    modalControl(modal, true);
}

function modalControl(modal, on) {
    modal.querySelector(".content").classList.toggle('show', on);
    modal.classList.toggle('transparentBg', !on);
    setTimeout(function () {
        modal.classList.toggle('modal-active', on);
        document.body.style.overflow = on ? 'hidden' : 'auto';
    }, on ? 0 : 400);

    modal.querySelector('.body').scrollTop = 0;
}