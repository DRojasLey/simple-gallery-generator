// this file is to add the html, css and base js files generation code
// the functions in here are to be called from the terminal using the cli.js commander program
const { htmlTemplate, cssTemplate, jsTemplate } = require('./data.js');
const path = require('path');
const fs = require('fs');


const generateHtmlFile = (filePath, title, mainTitle) => {
    const htmlContent = htmlTemplate(title, mainTitle);
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Write the HTML content to the specified file and throw error if the the creation failed
    fs.writeFile(filePath, htmlContent, (err) => {
        if (err) throw err;
        console.log(`HTML file created at: ${filePath}`);
    });
};


// Call it by: generateHtmlFile('gallery/gallery.html', 'My Image Gallery', 'Random Gallery Tittle');


const generateCssFile = (filePath, thumbSize) => {
    const cssContent = cssTemplate(thumbSize);
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Write the HTML content to the specified file and throw error if the the creation failed
    fs.writeFile(filePath, cssContent, (err) => {
        if (err) throw err;
        console.log(`CSS file created at: ${filePath}`);
    });
};

// Call it by: generateCssFile('gallery/style.css', 250);

const generateJsFile = () =>{

    const outputFilePath = path.join(__dirname, '../gallery', 'gallery.js');
    // Write the JavaScript content to a file
    fs.writeFile(outputFilePath, jsTemplate(), (err) => {
        if (err) {
            console.error('Error writing JS file:', err);
        } else {
            console.log(`JavaScript file has been created at: ${outputFilePath}`);
        }
    });
}

// Call it by: generateJsFile();

module.exports = {
    generateHtmlFile,
    generateCssFile,
    generateJsFile
};