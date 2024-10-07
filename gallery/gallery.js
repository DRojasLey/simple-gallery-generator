// DOM declarations:

const galleryBlock = document.getElementById('gallery');
const mainTitle = document.getElementById('main-title')

/**
 * fetches the library file
 * @returns the data object
 */
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

/**
 * adds all the listed images into the page
 * @param {object} data fetched from the library file
 */
const createNewImage = (data) => {
    for (thumbnail in data){
        const newImgElement = document.createElement('img');
        const correctedThumbnailPath = thumbnail.replace(/^gallery\//, ''); // this removes double "gallery" word from the image path

        newImgElement.setAttribute('src',  correctedThumbnailPath)
        newImgElement.setAttribute('alt',  data[thumbnail].originalImg)
        galleryBlock.appendChild(newImgElement);
    }
};

/**
 * calls the library on load and imports the images to the page
 */
window.addEventListener('load', ()=>{
    getLibaryData().then((data)=>{
        createNewImage(data)
    });
})