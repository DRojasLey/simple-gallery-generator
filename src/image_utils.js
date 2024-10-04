const fs = require('node:fs');
const path = require('node:path');

const getImagesFromFolder = (folderPath) => {

    fs.readdir(folderPath, (err, files)=>{
        if (err) throw err;

        const onlyImageFiles = files.filter(file =>{
            const fileExtension = path.extname(file).toLowerCase();
            return fileExtension === '.jpg' || fileExtension === '.png' || fileExtension === '.bmp';
        });

        const jsonData = JSON.stringify(onlyImageFiles, null, 2);

        fs.writeFile('imageIndex.json', jsonData, (err)=>{
            if (err) throw err;
            console.log('Image list saved to file imageIndex.json');
        });
    });

};



// Placeholder for the gallery generation function
const generateGalleryFiles = () => {
    // This function will handle HTML, CSS, and JS generation
    console.log('Gallery files generated!');
  };



module.exports = {
    getImagesFromFolder
};