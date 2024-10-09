# Image Gallery Generator  v0.9.1-alpha.1

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

## Usage

### Initial Setup:

This will:
1. Create the necessary gallery folder, adding the following files:
    * gallery.html
    * style.css
    * index.js
1. Create a list of the images in the given image-folder
1. Create the gallery/images folder, copying only the jpg, png and bmp images from the given image-folder

Simple setup with default values:

```Bash

npx simple-gallery-gen setup -p <your_image_folder>

```

Complete custom setup:

```Bash

npx simple-gallery-gen setup -p  path/to/your/images -n 'gallery name' -t 'gallery title' -w <width> -h <height>
```

Example:

```Bash

npx simple-gallery-gen setup -p  ~/Desktop/ -n 'Mea Galeria!' -t 'Mea Arte!' -w 200 -h 300
```

 Takes

* `-p path/to/your/images/folder/` or  `--folderPath path/to/your/images/folder/`
* `-n string` or  `--galleryName string`
* `-t string` or  `--galleryTitle string`
* `-w <number>` or `--width <number>`
* `-h <number>` or `--height <number>`


## Utilities:

>(internally used by the usage section features but can be used independently)

### Copy Images To gallery/images folder

```bash

npx simple-gallery-gen copyImages -p path/to/your/images/folder/

```

Given the original folder path:

1. This will generate the list of images from the given folder
1. Copy all the image files from the original folder to the gallery/images folder


 Takes

* `-p path/to/your/images/folder/` or  `--path path/to/your/images/folder/`


### Generate list of images

```bash

npx simple-gallery-gen createImageList -- -p path/to/your/images/folder/

```

Example:

To run after the images have been imported to the images folder

```bash
npx simple-gallery-gen createImageList -- -p ./gallery/images/
```

This will generate the list of images from the given folder
 * By default will index the gallery/images folder

 Takes

* `-p path/to/your/images/folder/` or  `--path path/to/your/images/folder/`

Example:

```bash
npx simple-gallery-gen createImageList -- -p ~/Desktop/
```


### Generate Thumbnails for the listed images


```bash

npx simple-gallery-gen createThumbnails -- -w 250 -h 250

```

[!] Important: width and height flags MUST be specified.
[!] Important: A list file must already exist, generate a list before running this command

This will take the original list created from the folder files and generate a corresponding thumbnail for each image under the gallery/images folder ```gallery/images/thumbs```

Will create the imageLibrary.json file.

Takes:
* `-w <number>` or `--width <number>`
* `-h <number>` or `--height <number>`
For the desired width and height of the thumbnails in px (do not include the 'px' just the number (int))
(it is recommended to use near/directly box values, or values that maintain the overall aspect ratio of the images)

### Generate Web files

```bash

npx simple-gallery-gen setFiles -- -n 'Gallery Name' -t 'Gallery Title'
```

Given the gallery name and gallery title:

* This will generate the web files (HTML, CSS & Js)

 Takes

* `-n string` or  `--galleryName string`
* `-t string` or  `--galleryTitle string`

[!] Important: Run this after generating the Thumbnails, so the CSS is adjusted to your desired thumbnail size else the default values will be w250 h250.
[!] Important: if no name or title is provided the default values are: name: Gallery, title: My Gallery

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
├── imageLibrary.json <<< Generated here by utility
├── .gitignore
├── src/
│   ├── image_utils.js
│   ├── data.js
│   ├── gallery_generator.js
│   └── cli.js
└── gallery/
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

##### v0.2.3:
* Added image copying function
* Thumbnail creation now creates thumbs if it doesn't exists
* minor style and spacing fixes

### v0.3.0:
* Images copying and import created
* Basic HTML, CSS and JS templates for the gallery created
* Fixed bugs:
    * double gallery added on path when importing
    * double point added on thumbnail file creation
* File index.html ranemd to gallery.html to better reflect the package functionality
* Removed delete imageIndex.json call from the copying images function, to avoid conflicts

### v0.4.0:
* Feature to add the web files added
* Commands added
* New data.js file added

## v0.9.0-alpha.1:
* One command setup feature added
* first functional version of the program
* NextUp section created in the README
* Most functions converted to async
* Documentation update on all functions
* Deleted unused files
* Deleted unused placeholder functions

### v0.9.1-alpha.1:
* Bug fix, path handling was causing the commands to generate the gallery under the incorrect directory
* Documentation update


## NextUp:

* [ ] Modal on click of image inclusion
* [ ] Options to generate the files in a different target folder
* [ ] Option to specify a Home page for the Home link of the gallery
* [ ] Update Gallery, when new images are imported, removed the need of creating a new gallery




## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## License

This project is licensed under the MIT License.# simple-gallery-generator
