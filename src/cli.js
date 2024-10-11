#!/usr/bin/env node

const { Command } = require('commander');
const { copyImagesFromFolder, listImagesFromFolder, createThumbnails } = require('./image_utils.js');
const { generateHtmlFile, generateCssFile, generateJsFile, createNewGallery } = require('./gallery_generator.js');


const program = new Command();
let width = 0;
let height= 250;

program
        .name('simple-gallery-gen')
        .description('simple-gallery-gen utilities, provides commands for a simple HTML based gallery from a folder')
        .version('1.0.0');

program
        .command('copyImages')
        .description('Copy all JPG, BMP, PNG files within the given folder to the gallery/images/ folder')
        .option('-p, --path <folderPath>','Specify path of the folder to import images from')
        .action((options) => {
            const pathToFolder = options.path
            console.log(`Importing images from folder: ${pathToFolder}`);
            copyImagesFromFolder(pathToFolder);
        });

program
        .command('lsimages')
        .description('Create a file listing all JPG, BMP, PNG files within the given folder')
        .option('-p, --path <folderPath>','Specify path of the folder to list images from', 'gallery/images')
        .action((options) => {
            const pathToImageFolder = options.path
            console.log(`Listing images from folder: ${pathToImageFolder}`);
            listImagesFromFolder(pathToImageFolder, false);
        });


program
        .command('thumbcreate <filePath>')
        .option('-w, --width <width>', 'Specify the thumbnail width', parseInt)
        .option('-h, --height <height>', 'Specify the thumbnail height', parseInt)
        .action((filePath, options) => {
            width = options.width;
            height = options.height;

            if (!width || !height) {
                console.error('Error: width and height must be specified.');
                return;
            }

            console.log(`Processing images from file: ${filePath} with width: ${width} and height: ${height}`);
            createThumbnails(filePath, width, height);
        });

program
        .command('set-files')
        .description('Create HTML, CSS and JS files necessary for the gallery')
        .option('-n, --galleryName <galleryName>', 'Specify the name of the gallery, this will be printed as the main title')
        .option('-t, --galleryTitle <galleryTitle>', 'Specify the title of the gallery, this is the title used in the title parameter of the site' )
        .action((options) => {
            const galleryName = options.galleryName;
            const galleryTitle = options.galleryTitle;

            console.log('Processing File creation...')
            generateHtmlFile('gallery/gallery.html', galleryName, galleryTitle);
            generateCssFile('gallery/style.css', width);
            generateJsFile();
        });

program
        .command('setup')
        .description('Setup your gallery with one command,')
        .option('-p, --folderPath <folderPath>', 'Specify the folder where you want to import the images from')
        .option('-n, --galleryName <galleryName>', 'Specify the name of the gallery, this will be printed as the main title')
        .option('-t, --galleryTitle <galleryTitle>', 'Specify the title of the gallery, this is the title used in the title parameter of the site' )
        .option('-w, --width <width>', 'Specify the thumbnail width', parseInt)
        .option('-h, --height <height>', 'Specify the thumbnail height', parseInt)
        .action((options) => {
            const galleryName = options.galleryName;
            const galleryTitle = options.galleryTitle;
            const folderPath = options.folderPath
            width = options.width;
            height = options.height;
            console.log('Creating the Gallery....')
            createNewGallery(folderPath, galleryName, galleryTitle, width, height)

        });


program.parse(process.argv);
