const { Command } = require('commander');
const { getImagesFromFolder, createThumbnails } = require('./image_utils.js');


const program = new Command();

program
        .name('simple-gallery-gen-utilities')
        .description('Utilities for simple-gallery-gen package')
        .version('0.1.0');

program
        .command('lsimages')
        .description('Create a file listing all JPG, BMP, PNG files within the given folder')
        .option('-p, --path <folderPath>','Specify path of the folder to list images from', 'gallery/images')
        .action((options) => {
            const pathToImageFolder = options.path
            console.log(`Processing images from folder: ${pathToImageFolder}`);
            getImagesFromFolder(pathToImageFolder);
        });


program
        .command('thumbcreate <filePath>')
        .option('-w, --width <width>', 'Specify the thumbnail width', parseInt)
        .option('-h, --height <height>', 'Specify the thumbnail height', parseInt)
        .action((filePath, options) => {
            const width = options.width;
            const height = options.height;

            if (!width || !height) {
                console.error('Error: width and height must be specified.');
                return;
            }

            console.log(`Processing images from file: ${filePath} with width: ${width} and height: ${height}`);
            createThumbnails(filePath, width, height);
    });

program.parse(process.argv);
