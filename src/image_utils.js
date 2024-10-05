const { readdir, writeFile, readFileSync, existsSync, unlinkSync } = require('node:fs');
const { extname, basename, join, resolve } = require('node:path');
const sharp = require('sharp');



/**
* create a list of all the images type files in the given directory
* @param {string} folderPath folder containing the images
* @param {boolean} absoluteFlag true=absolute path listed false=relative path
*/
const listImagesFromFolder = (folderPath, absoluteFlag) => {

    readdir(folderPath, (err, files)=>{
        if (err) throw err;

        const onlyImageFiles = files.filter(file =>{
            const fileExtension = extname(file).toLowerCase();
            return fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.bmp';
        });

        const fullPathImages = onlyImageFiles.map(file => !absoluteFlag ? join(folderPath, file): resolve(folderPath, file));

        const jsonData = JSON.stringify(fullPathImages, null, 2);

        writeFile('imageIndex.json', jsonData, (err)=>{
            if (err) throw err;
            console.log('Image list saved to file imageIndex.json');
        });
    });

};

/**
 * Will delete an existing list of images
 * @param {string} listName name of the list to delete
 * @returns undefined
 */
const deleteExistingList = (listName) => {
    const filePath = resolve(listName); // Resolve the path for safety (relative/absolute handling)
    if (!existsSync(filePath)) {
        console.log(`File ${listName} does not exist, nothing to delete.`);
        return;
    }
    try {
        unlinkSync(filePath);
        console.log(`File ${listName} deleted successfully.`);
    } catch (err) {
        console.error(`Error deleting the file ${listName}:`, err);
    }

}


const copyImagesFromFolder = (directoryPath) => {

    try {
        console.log(`Listing only images from folder: ${directoryPath}`);
        listImagesFromFolder(directoryPath, true);
        
        /* This is to put the file deletion at the end of the execution queue
         after all the images have been copied over to the target folder*/
        setTimeout(()=>{
            deleteExistingList('imageIndex.json');
        }, 0)

    } catch (error) {
        console.log(`Your path was ${directoryPath} which is not a valid path`, error)
    }

}


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
    const imageLibrary = {};

    /**
    * create a thumbnail image from each listed image & add the imageLibrary.json file
    * @param {Array} imageArray extracted from the image list
    */
    const createThumbnailimages = async (imageArray, width, height) => {
        for (const image of imageArray) {
            const fileExtension = extname(image).toLowerCase();
            const fileName = basename(image, fileExtension);
            const thumbnailPath = `gallery/images/thumbs/thumb_${fileName}${fileExtension}`;
            try {
                await sharp(image)
                .resize(width, height, {
                    kernel: sharp.kernel.nearest,
                    fit: 'contain',
                    position: 'centre',
                    background: { r: 0, g: 0, b: 0 }
                })
                .toFile(`gallery/images/thumbs/thumb_${fileName}.${fileExtension}`);

                imageLibrary[thumbnailPath] = {
                    originalImg: image
                };
                console.log(`Thumbnail created for: ${image}`);

            } catch (error) {
                console.error(`Error creating thumbnail for ${image}:`, error);
            }
        }
        writeFile('imageLibrary.json', JSON.stringify(imageLibrary, null, 2), (err) => {
            if (err) throw err;
            console.log('Thumbnails map saved to imageLibrary.json');
        });

    }

    createThumbnailimages(images, width, height);
};

// Placeholder for the gallery generation function
const generateGalleryFiles = () => {
    // This function will handle HTML, CSS, and JS generation
    console.log('Gallery files generated!');
};


module.exports = {
    listImagesFromFolder,
    createThumbnails,
    copyImagesFromFolder
};
