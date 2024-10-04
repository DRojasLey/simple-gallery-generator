const { readdir, writeFile, readFileSync } = require('node:fs');
const { extname, basename, join } = require('node:path');
const sharp = require('sharp');



/**
 * create a list of all the images type files in the given directory
 * @param {string} folderPath folder containing the images
 */
const getImagesFromFolder = (folderPath) => {

    readdir(folderPath, (err, files)=>{
        if (err) throw err;

        const onlyImageFiles = files.filter(file =>{
            const fileExtension = extname(file).toLowerCase();
            return fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.bmp';
        });

        const fullPathImages = onlyImageFiles.map(file => join(folderPath, file));

        const jsonData = JSON.stringify(fullPathImages, null, 2);

        writeFile('imageIndex.json', jsonData, (err)=>{
            if (err) throw err;
            console.log('Image list saved to file imageIndex.json');
        });
    });

};
/**
 * create thumbnails for all the images in the given lists
 * @param {string} imageListFile path to the file that lists all image files
 */
const createThumbnails = (imageListFile, width, height) => {
    let images;

    /**
     *
     * @param {string} imgListFile path to the file that lists all image files
     * @returns array of names of all the image files
     */
    const readImageFile = (imgListFile) =>{
        const data = readFileSync(imgListFile, 'utf8');
        try{
            imagesList = JSON.parse(data);
        } catch (error) {
            console.error('error parsing JSON file', error)
            return
        }
        return imagesList
    }

    images = readImageFile(imageListFile)

    /**
     * create a thumbnail image from each listed image
     * @param {Array} imageArray extracted from the image list
     */
    const createThumbnailimages = async (imageArray, width, height) => {
        for (const image of imageArray) {
            const fileExtension = extname(image).toLowerCase();
            const fileName = basename(image, fileExtension);
            try {
                await sharp(image)
                    .resize(width, height, {
                        kernel: sharp.kernel.nearest,
                        fit: 'contain',
                        position: 'centre',
                        background: { r: 0, g: 0, b: 0 }
                    })
                    .toFile(`gallery/images/thumbs/thumb_${fileName}.${fileExtension}`); // Save to a specific folder
                console.log(`Thumbnail created for: ${image}`);
            } catch (error) {
                console.error(`Error creating thumbnail for ${image}:`, error);
            }
        }

    }

    createThumbnailimages(images, width, height);
};



// Placeholder for the gallery generation function
const generateGalleryFiles = () => {
    // This function will handle HTML, CSS, and JS generation
    console.log('Gallery files generated!');
  };


module.exports = {
    getImagesFromFolder,
    createThumbnails
};
