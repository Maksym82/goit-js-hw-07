import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
galleryContainer.addEventListener('click', onGalleryClick);
let modalBox;
const makeGalleryItems = ({ preview, original, description }) =>
    `<li class = "gallery__item">
        <a class = gallery__link" href= "${original}">
            <img 
                class = "gallery__image"
                src = "${preview}"
                data-source = "${original}"
                alt = ${description}"
            />
        </a>
    </li>`;

const galleryList = galleryItems.map(el => makeGalleryItems(el)).join("");
galleryContainer.insertAdjacentHTML('afterbegin', galleryList);

function onGalleryClick(event) {
    event.preventDefault();
    if(event.target.nodeName !== 'IMG') {
        return;
    }
    let originalImg = event.target.dataset.source;
    modalBox = basicLightbox.create (
        `<img width = "1400" height = "900" src = "${originalImg}">`,
        {
            onShow: () => {
                document.addEventListener('keydown', onPressEsc);
            },
            onClose: () => {
                document.removeEventListener('keydown', onPressEsc);
            },
        },
    );
    modalBox.show();
}

function onPressEsc(event) {
    if (event.code === 'Escape' && modalBox != null) {
        modalBox.close();
    }
}
