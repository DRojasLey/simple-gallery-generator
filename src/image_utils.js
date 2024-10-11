const { error } = require('node:console');
const { readdir, writeFile, readFileSync, existsSync, unlinkSync } = require('node:fs');
const { extname, basename, join, resolve } = require('node:path');
const path = require('path');
const fs = require('fs');
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
        const imageIndexPath = path.resolve(process.cwd(), 'imageIndex.json');
        writeFile(imageIndexPath, jsonData, (err)=>{
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

/**
 * Copies the image files from the original location where they were listed into the gallery/images directory
 */
const copyListedImages = async () => {
    const imageIndexPath = path.resolve(process.cwd(), 'imageIndex.json');
    const destinationFolder = path.resolve(process.cwd(), 'gallery/images');

    try {
        if (!fs.existsSync(imageIndexPath)) {  // Check if the file exists
            console.log('The imageIndex.json file does not exist. Please list the images first.');
            throw new Error('imageIndex.json not found');
        }

        if (!fs.existsSync(destinationFolder)) {
            console.log(`The gallery/images folder does not exist, creating the directory`);
            fs.mkdirSync(destinationFolder, { recursive: true });
            console.log(`Success creating the target directory \n`);
        }

        const imagePaths = JSON.parse(fs.readFileSync(imageIndexPath, 'utf-8'));
        console.log(`Starting the images copy operation: \n`);

        for (const imagePath of imagePaths) {
            const fileName = path.basename(imagePath);
            const destinationPath = path.join(destinationFolder, fileName);
            await fs.promises.copyFile(imagePath, destinationPath);
            console.log(`Copied: ${fileName}`);
        }

        console.log(`All images copied successfully!`);
    } catch (err) {
        console.error('Error copying images:', err);
    }
};

/**
 * Copies images from the specified folder
 * @param {string} directoryPath - Path to the folder where the images are located
 * @returns {Promise} - A promise that resolves when the images are copied successfully or rejects if an error occurs
 */
const copyImagesFromFolder = async (directoryPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Listing only images from folder: ${directoryPath}`);
            await listImagesFromFolder(directoryPath, true);
            setTimeout(() => {
                copyListedImages();
                console.log(`Images copied from folder: ${directoryPath}`);
                resolve(); // Resolve when the process is complete
            }, 5000);
        } catch (error) {
            console.error(`Your path was ${directoryPath} which is not a valid path. A valid folder path is required`, error);
            reject(error); // Reject the promise in case of an error
        }
    });
};



/**
 * Creates thumbnails for all the images in the given list and saves the image library to a file.
 * @param {string} imageListFile - Path to the file that lists all image files
 * @param {number} width - Width of the thumbnail
 * @param {number} height - Height of the thumbnail
 * @returns {Promise} - A promise that resolves when the thumbnails are created and the image library is saved
 */
const createThumbnails = async (imageListFile, width, height) => {
    return new Promise(async (resolve, reject) => {
        const destinationFolder = path.resolve(process.cwd(), 'gallery/images/thumbs');

        // Ensure the thumbnails folder exists
        if (!fs.existsSync(destinationFolder)) {
            console.log(`The thumbs folder does not exist, creating the directory`);
            fs.mkdirSync(destinationFolder, { recursive: true });
            console.log(`Success creating the target directory`);
        }
        // Read the list of image files from the provided JSON file
        let images;
        const readImageFile = (imgListFile) => {
            const data = readFileSync(imgListFile, 'utf8');
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON file. Does the image list file exist?', error);
                reject(error);  // Reject the promise if reading or parsing fails
            }
        };
        images = readImageFile(imageListFile);
        const imageLibrary = {};
        // Create thumbnails for each image and update the image library
        const createThumbnailImages = async (imageArray, width, height) => {
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
                        .toFile(thumbnailPath);
                        const imageUpdated = path.join('images', path.basename(image));
                        const updatedThumbnailPath = path.relative('gallery', thumbnailPath);

                    imageLibrary[updatedThumbnailPath] = {
                        originalImg: imageUpdated
                    };
                    console.log(`Thumbnail created for: ${image}`);
                } catch (error) {
                    console.error(`Error creating thumbnail for ${image}:`, error);
                }
            }
            // Save the image library to a JSON file
            fs.writeFile('imageLibrary.json', JSON.stringify(imageLibrary, null, 2), (err) => {
                if (err) {
                    reject(err);  // Reject the promise if writing fails
                    return;
                }
                console.log('Thumbnails map saved to imageLibrary.json');
                resolve();  // Resolve the promise once everything is done
            });
        };
        await createThumbnailImages(images, width, height);
    });
};

module.exports = {
    listImagesFromFolder,
    createThumbnails,
    copyImagesFromFolder
};
