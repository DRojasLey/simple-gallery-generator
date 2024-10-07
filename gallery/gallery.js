// DOM declarations:

const galleryBlock = document.getElementById('gallery');
const mainTitle = document.getElementById('main-title')

const getLibaryData = async () => {
    try {
        const response = await fetch('../imageLibrary.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json() ;
        return data;

    } catch (error) {
        const errorMessage = document.createElement('h2')
        errorMessage.innerText = `imageLibrary.json not found, please import the images`;
        const header = document.querySelector('.simple-header')
        header.appendChild(errorMessage);
        console.error(`imageLibrary.json not found, please import the images`);    }

}


const createNewImage = (data) => {
    for (thumbnail in data){
        const newImgElement = document.createElement('img');
        const correctedThumbnailPath = thumbnail.replace(/^gallery\//, '');

        newImgElement.setAttribute('src',  correctedThumbnailPath)
        newImgElement.setAttribute('alt',  data[thumbnail].originalImg)
        galleryBlock.appendChild(newImgElement);
    }
};

window.addEventListener('load', ()=>{
    getLibaryData().then((data)=>{
        createNewImage(data)
    });
})