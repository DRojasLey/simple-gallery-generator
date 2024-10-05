# Image Gallery Generator v0.2.1

A JavaScript package to create a basic image gallery from a given folder

## Installation

```Bash

npm install simple-gallery-gen

```

### Dependencies:

* [fs](https://nodejs.org/api/fs.html)
* [commander](https://www.npmjs.com/package/commander)
* [path](https://nodejs.org/api/path.html)
* [sharp](https://sharp.pixelplumbing.com/)

## Usage (Usage is still pending):

### Initial Setup:

```Bash

npm simple-gallery-gen setup --image-folder <your_image_folder>

```
This will:
1. Create the necessary gallery folder, adding the following files:
    * gallery.html
    * style.css
    * index.js
1. Create a list of the images in the given image-folder
1. Create the gallery/images folder, copying only the jpg, png and bmp images from the given image-folder

### Generate Gallery:

```Bash

simple-gallery-gen generate

```
This will:
1. Scan the gallery/image folder, generating the initial imageIndex.json file
1. Create thumbnails for each image, updating the imageIndex.json file
1. Update the index.js file with the required logic

### Update Gallery:

```bash

simple-gallery-gen update

```

This will scan the specified image folder and update any changes if there is an already generated gallery


## Utilities:

>(internally used by the usage section features)

### Generate list of images

```bash

npm run createImageList -- -p path/to/your/images/folder/

```

This will generate the list of images from the given folder
 * By default will index the gallery/images folder

 Takes

* `-p path/to/your/images/folder/` or  `--path path/to/your/images/folder/`

Example:

```bash
 npm run createImageList -- -p ~/Desktop/
```


### Generate Thumbnails for the listed images


```bash

npm run createThumbnails -- -w 250 -h 250

```

This will take the original list created from the folder files and generate a corresponding thumbnail for each image under the gallery/images folder ```gallery/images/thumbs```

Will create the imageLibrary.json file.

Takes:
* `-w <number>` or `--width <number>`
* `-h <number>` or `--height <number>`
For the desired width and height of the thumbnails in px (do not include the 'px' just the number (int))
(it is recommended to use near/directly box values, or values that maintain the overall aspect ratio of the images)

## Features
* Image Filtering: Filters only JPG, PNG and BMP images.
* HTML Structure: Creates a basic HTML structure for the gallery.
* CSS Styling: Provides basic CSS styles for the gallery.
* JavaScript Functionality:
    * Iterates over the image list.
    * Creates thumbnails and places them in the thumbs folder.
    * Generates HTML elements for each thumbnail.
    * Displays the original image in a modal when a thumbnail is clicked.

## Project Structure

```
image-gallery-generator/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── src/
│   ├── main.js
│   ├── image_utils.js
│   ├── gallery_generator.js
│   └── cli.js
└── gallery/
    ├── index.html
    ├── style.css
    ├── index.js
    └── images/
        └── thumbs/

```
## Changelog

### v0.1.0:
* Project init
* Image folder list feature added

### v0.2.0:
* Create Thumbnails feature added
* Semver introduced
* Documentation improvements
* Image Folder List now accepts folder path as argument

##### v0.2.1:
* Documentation improvements
* Changelog introduced

##### v0.2.2:
* Added imageLibrary.json file generation
* Minor bugfixes
* Clarified documentation

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## License

This project is licensed under the MIT License.# simple-gallery-generator
