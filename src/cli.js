const { Command } = require('commander');
const { getImagesFromFolder } = require('./image_utils.js');

const listImages = new Command();


listImages
        .command('lsimages <folderPath>')
        .description('Create a file listing all JPG, BMP, PNG files within the given folder')
        .action((folderPath) => {
            console.log(`Processing images from folder: ${folderPath}`);
            getImagesFromFolder(folderPath);
        });

listImages.parse(process.argv);