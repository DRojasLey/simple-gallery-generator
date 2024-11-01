// 
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Optimizes an image by reducing its quality for web.
 * @param {string} pathToImage - Path to the original image file.
 * @param {number} [quality=80] - Quality level (1-100), default is 80 for web optimization.
 * @returns {Promise<string>} - Returns a promise that resolves to the path of the optimized image.
 */
const optimizeImage = async (pathToImage, quality = 80) => {
    const outputDir = path.join(path.dirname(pathToImage), 'optimized');
    const outputPath = path.join(outputDir, path.basename(pathToImage));

    // Ensure the output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Optimize the image
    await sharp(pathToImage)
        .jpeg({ quality })
        .toFile(outputPath);

    return outputPath;
};

module.exports = { optimizeImage };
