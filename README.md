# Image Gallery Generator

A JavaScript package to create a basic image gallery from a given folder

### Installation

```Bash

npm install simple-gallery-gen

```

### Dependencies:

* [fs](https://nodejs.org/api/fs.html)
* [yargs](https://www.npmjs.com/package/yargs)
* [path](https://nodejs.org/api/path.html)
* [sharp](https://sharp.pixelplumbing.com/)

### Usage

#### Initial Setup:

```Bash

simple-gallery-gen setup --image-folder <your_image_folder>

```
This will create the necessary HTML, CSS, and JavaScript files, as well as a ```thumbs``` folder for the thumbnail images.

#### Generate Gallery:

```Bash

simple-gallery-gen generate

```
This will scan the specified image folder, create thumbnails, and update the HTML file with the gallery.

#### Generate Gallery:

```bash

simple-gallery-gen update

```
This will scan the specified image folder and update any changes if there is an already generated gallery

### Features
* Image Filtering: Filters only JPG, PNG and BMP images.
* HTML Structure: Creates a basic HTML structure for the gallery.
* CSS Styling: Provides basic CSS styles for the gallery.
* JavaScript Functionality:
    * Iterates over the image list.
    * Creates thumbnails and places them in the thumbs folder.
    * Generates HTML elements for each thumbnail.
    * Displays the original image in a modal when a thumbnail is clicked.

### Project Structure

```
image-gallery-generator/
├── README.md
├── package.json
├── src/
│   ├── main.js
│   ├── image_utils.js
│   ├── gallery_generator.js
│   └── cli.js
└── gallery/
    ├── index.html
    ├── style.css
    └── index.js
    └── images/
```

### Contributing
Contributions are welcome! Please feel free to submit pull requests or issues.

### License
This project is licensed under the MIT License.# simple-gallery-generator
