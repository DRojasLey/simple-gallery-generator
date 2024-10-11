#!/usr/bin/env node

const { Command } = require('commander');
const { copyImagesFromFolder, listImagesFromFolder, createThumbnails } = require('./image_utils.js');
const { generateHtmlFile, generateCssFile, generateJsFile, createNewGallery } = require('./gallery_generator.js');

const helpMessages = {
    programDescription: `Simple-gallery-gen, provides commands for a simple HTML based gallery from a given folder

    Example:

        npx simple-gallery-gen setup -p  path/to/your/images -n "gallery name" -t "gallery title" -w <width> -h <height>

        Options:

            -p, --folderPath <path/to/your/images/folder/>
            -n, --galleryName <string>
            -t, --galleryTitle <string>
            -w, --width <number>
            -h, --height <number>
`
,
    copyImagesDescription:`Copy all JPG, BMP, PNG files within the given folder to the gallery/images/ folder

        Options:

            -p, --path <path/to/your/images/folder/>
            `,
    lsimagesDescription:`Create a file listing all JPG, BMP, PNG files within the given folder

        Options:

            -p , --path <path/to/your/images/folder/>
            `,
    thumbcreateDescription:`Will create thumbnails of the images listed on the imageIndex.json file, therefore this must be run after a list has been created

        Options:

            -w, --width <number>
            -h, --height <number>

        Usage:

            npx simple-gallery-gen thumbcreate <path/to/the/imageIndex.json> -w <number> -h <number>

            [!] Important: width and height flags MUST be specified.
            [!] Important: A list file must already exist, generate a list before running this command

            This will take the original list created from the folder files and generate a corresponding thumbnail for each image under the gallery/images folder gallery/images/thumbs

            Will create the imageLibrary.json file.
            `,
    setFilesDescription:`Create HTML, CSS and JS files necessary for the gallery

        Options
            -n, --galleryName <string>
            -t, --galleryTitle <string>
        `,
    setupDescription:`Setup your gallery with one command

        Options:

            -p, --folderPath <path/to/your/images/folder/>
            -n, --galleryName <string>
            -t, --galleryTitle <string>
            -w, --width <number>
            -h, --height <number>
    `
}

const program = new Command();
let width = 0;
let height= 250;

program
        .name('simple-gallery-gen')
        .description(helpMessages.programDescription)
        .version('1.0.1');

program
        .command('copyImages')
        .description(helpMessages.copyImagesDescription)
        .option('-p, --path <folderPath>','Specify path of the folder to import images from')
        .action((options) => {
            const pathToFolder = options.path
            console.log(`Importing images from folder: ${pathToFolder}`);
            copyImagesFromFolder(pathToFolder);
        });

program
        .command('lsimages')
        .description(helpMessages.lsimagesDescription)
        .option('-p, --path <folderPath>','Specify path of the folder to list images from', 'gallery/images')
        .action((options) => {
            const pathToImageFolder = options.path
            console.log(`Listing images from folder: ${pathToImageFolder}`);
            listImagesFromFolder(pathToImageFolder, false);
        });


program
        .command('thumbcreate <filePath>')
        .description(helpMessages.thumbcreateDescription)
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
        .description(helpMessages.setFilesDescription)
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
        .description(helpMessages.setupDescription)
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
