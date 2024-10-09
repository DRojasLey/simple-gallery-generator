// this file is to add the html, css and base js files generation code
// the functions in here are to be called from the terminal using the cli.js commander program
const { htmlTemplate, cssTemplate, jsTemplate } = require('./data.js');
const { copyImagesFromFolder, createThumbnails } = require('./image_utils.js');

const path = require('path');
const fs = require('fs');

/**
* Creates an HTML file for the gallery.
* @param {string} filePath - Path including the filename where the HTML file will be created.
* @param {string} [title='My Gallery'] - The title to use in the HTML document (optional, defaults to 'My Gallery').
* @param {string} [mainTitle='Gallery'] - The main title to display in the gallery (optional, defaults to 'Gallery').
* @returns {Promise<void>} - A promise that resolves when the HTML file is successfully created or rejects if an error occurs.
*/
const generateHtmlFile = async (filePath, title = 'My Gallery', mainTitle = 'Gallery') => {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        // Ensure the directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const htmlContent = htmlTemplate(title, mainTitle);
        // Write the HTML file
        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                reject(err); // Reject the promise if there is an error
                return;
            }
            console.log(`HTML file created at: ${filePath}`);
            resolve(); // Resolve the promise after the file is successfully written
        });
    });
};



// Call it by: generateHtmlFile('gallery/gallery.html', 'My Image Gallery', 'Random Gallery Tittle');

/**
 * Create the CSS file
 * @param {string} filePath - Path to the folder where the CSS file should be created
 * @param {number} [thumbSize=250] - The size of the thumbnails for the gallery (default is 250px)
 * @returns {Promise} - A promise that resolves when the CSS file is successfully created, or rejects if an error occurs
 */
const generateCssFile = async (filePath, thumbSize = 250) => {

    return new Promise((resolve, reject) => {

        const cssContent = cssTemplate(thumbSize);
        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Write the CSS content to the specified file
        fs.writeFile(filePath, cssContent, (err) => {
            if (err) {
                reject(err); // Reject the promise if there's an error
                return
            };
            console.log(`CSS file created at: ${filePath}`);
            resolve(); // Resolve when file creation is successful
        });
    });
};

// Call it by: generateCssFile('gallery/style.css', 250);

/**
 * Create the JavaScript file
 * @returns {Promise} - A promise that resolves when the JS file is successfully created, or rejects if an error occurs
 */
const generateJsFile = async () => {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(__dirname, '../gallery', 'gallery.js');
        // Ensure the directory exists
        const dir = path.dirname(outputFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Write the JavaScript content to the specified file
        fs.writeFile(outputFilePath, jsTemplate(), (err) => {
            if (err) {
                console.error('Error writing JS file:', err);
                reject(err);
                return;
            } else {
                console.log(`JavaScript file has been created at: ${outputFilePath}`);
                resolve();
            }
        });
    });
};

// Call it by: generateJsFile();

/**
 * Generates a new gallery given the parameters
 * @param {string} folderPath - Path to the folder where the CSS file should be created
 * @param {string} galleryName [title='My Gallery'] - The title to use in the HTML document (optional, defaults to 'My Gallery').
 * @param {string} galleryTitle [mainTitle='Gallery'] - The main title to display in the gallery (optional, defaults to 'Gallery').
 * @param {number} width - Width of the thumbnail
 * @param {number} height - Height of the thumbnail
 */
const createNewGallery = async (folderPath, galleryName, galleryTitle, width, height) => {
    try {
        await copyImagesFromFolder(folderPath);  // Waits for copy to finish
        await createThumbnails('imageIndex.json', width, height);  // Waits for thumbnail creation
        await generateHtmlFile('gallery/gallery.html', galleryName, galleryTitle);  // Waits for HTML generation
        await generateCssFile('gallery/style.css', width);  // Waits for CSS generation
        await generateJsFile();  // Waits for JS generation
        console.log('Gallery creation process complete!'.toUpperCase());
    } catch (error) {
        console.error('Error occurred during gallery creation:', error);
    }
};

module.exports = {
    generateHtmlFile,
    generateCssFile,
    generateJsFile,
    createNewGallery
};