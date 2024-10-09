/**
 * get gallery html template
 * @param {string} title - title for the title html element
 * @param {*} mainTitle - main title display in the top of the gallerty page
 * @returns html contents to add into a new gallery.html file
 */
const htmlTemplate = (title, mainTitle) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>${title}</title>
</head>
<body>
  <header class="simple-header">
    <nav class="navigationBlock" id="navigation">
      <ul class="navigation">
        <li><a href="./gallery.html">HOME</a></li>
        <li><a href="./gallery.html">GALLERY</a></li>
      </ul>
    </nav>
    <h1 class="main-title" id="main-title">${mainTitle}</h1>
  </header>

  <section class="simple-gallery" id="simple-gallery">
    <div class="gallery" id="gallery">
    </div>

  </section>
  <footer>
    <div class="created-with">Generated with <span class="simple-gallery-link"><a href="https://github.com/DRojasLey/simple-gallery-generator">simple-gallery-gen</a></span></div>
  </footer>
  <script src="gallery.js"></script>
</body>
</html>
`
};

/**
 * get gallery css content
 * @param {number} thumbSize - thumbnail size selected during gallery creation
 * @returns - CSS template for the gallery
 */
const cssTemplate = (thumbSize) => {
    return `
    body {
  background-color: #1d1d1d;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${thumbSize}px, 1fr));
  gap: 10px;
  justify-items: center;
  margin: auto;
  max-width: calc(3 * ${thumbSize}px + 2 * 10px);
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: bisque;
}

ul {
  list-style: none;
  padding: 0;
}

.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.main-title {
  text-align: center;
  font-size: 500%;
  color: bisque;
}

/* Image thumbnails with varying heights */
.thumbnail {
  cursor: pointer;
  width: ${thumbSize}px;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal img {
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.created-with {
  font-style: italic;
  color: rgb(222, 11, 11);
  position: fixed;
  bottom: 0px;
  right: 0px;
}

.simple-gallery-link {
  color: white;
}

    `
}

/**
 * get Js template for the gallery
 * @returns - javascript template for the gallery
 */
const jsTemplate = () => `
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
        const data = await response.json();
        return data;

    } catch (error) {
        const errorMessage = document.createElement('h2')
        errorMessage.innerText = \`imageLibrary.json not found, please import the images\`;
        const header = document.querySelector('.simple-header')
        header.appendChild(errorMessage);
        console.error(\`imageLibrary.json not found, please import the images\`);
    }
}

/**
 * adds all the listed images into the page
 * @param {object} data fetched from the library file
 */
const createNewImage = (data) => {
    for (thumbnail in data) {
        const newImgElement = document.createElement('img');
        const correctedThumbnailPath = thumbnail.replace(/^gallery\\//, ''); // this removes double "gallery" word from the image path

        newImgElement.setAttribute('src', correctedThumbnailPath);
        newImgElement.setAttribute('alt', data[thumbnail].originalImg);
        galleryBlock.appendChild(newImgElement);
    }
};

/**
 * calls the library on load and imports the images to the page
 */
window.addEventListener('load', () => {
    getLibaryData().then((data) => {
        createNewImage(data);
    });
});
`;

module.exports = {
    htmlTemplate,
    cssTemplate,
    jsTemplate
 };
