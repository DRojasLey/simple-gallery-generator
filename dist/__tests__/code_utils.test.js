const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { optimizeImage } = require('../code_utils.js'); // Adjust the path as needed

jest.mock('fs');
jest.mock('sharp');

describe('optimizeImage', () => {
    const testImagePath = '/path/to/test/image.jpg';
    const outputDir = path.join(path.dirname(testImagePath), 'optimized');
    const outputPath = path.join(outputDir, path.basename(testImagePath));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create an optimized image with the specified quality', async () => {
        // Mock fs.mkdirSync to create a directory
        fs.mkdirSync.mockImplementation(() => {});

        // Mock sharp's jpeg and toFile to simulate optimization
        const toFileMock = jest.fn().mockResolvedValue(outputPath);
        sharp.mockReturnValue({
            jpeg: jest.fn().mockReturnValue({
                toFile: toFileMock,
            }),
        });

        const result = await optimizeImage(testImagePath, 75);

        // Verify that fs.mkdirSync was called to create the output directory
        expect(fs.mkdirSync).toHaveBeenCalledWith(outputDir, { recursive: true });

        // Verify sharp was called to process the image with specified quality
        expect(sharp).toHaveBeenCalledWith(testImagePath);
        expect(sharp().jpeg).toHaveBeenCalledWith({ quality: 75 });
        expect(toFileMock).toHaveBeenCalledWith(outputPath);

        // Check that the function returns the correct path
        expect(result).toBe(outputPath);
    });

    it('should default to quality of 80 if no quality is provided', async () => {
        fs.mkdirSync.mockImplementation(() => {});

        const toFileMock = jest.fn().mockResolvedValue(outputPath);
        sharp.mockReturnValue({
            jpeg: jest.fn().mockReturnValue({
                toFile: toFileMock,
            }),
        });

        await optimizeImage(testImagePath);

        // Check that quality defaults to 80
        expect(sharp().jpeg).toHaveBeenCalledWith({ quality: 80 });
    });

    it('should throw an error if sharp fails to process the image', async () => {
        fs.mkdirSync.mockImplementation(() => {});
        sharp.mockReturnValue({
            jpeg: jest.fn().mockReturnValue({
                toFile: jest.fn().mockRejectedValue(new Error('Sharp processing error')),
            }),
        });

        await expect(optimizeImage(testImagePath)).rejects.toThrow('Sharp processing error');
    });
});
