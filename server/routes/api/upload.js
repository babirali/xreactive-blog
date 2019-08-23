const router = require('express').Router();
const azureStorage = require('azure-storage');
const getStream = require('into-stream');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs');

const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

const azureStorageConfig = {
    accountName: "xreactive",
    accountKey: "cdx2XEfpeaP3hDYQr4AYizgQdd8h4lp8fZlJtHCztbbVZOwXsVfe0ugdNmYAA3O9tk0oUgktO0BSzmoBhureyw==",
    blobURL: "https://xreactive.blob.core.windows.net",
    containerName: "prod"
};
const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);


uploadFileToBlob = async (directoryPath, file) => {

    return new Promise((resolve, reject) => {
        const blobName = getBlobName(file.originalname);
        const stream = getStream(file.buffer);
        const streamLength = file.buffer.length;

        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    filename: blobName,
                    originalname: file.originalname,
                    size: streamLength,
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`
                });
            }
        });
    });
};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

const imageUpload = async (req, res, next) => {
    try {
        // Jimp.read(req.file.buffer).then(image => {
        //     thumbnail = image
        //         .resize(256, 256)
        //         .quality(60)
        //         .write('upload-images/lena-half-bw.png');
        // }).catch(err => {
        //     console.log(err);
        // });
        // fs.readFile('upload-images/lena-half-bw.png', function (err, data) {
        //     if (!err) {
        //         console.log('received data: ' + data.buffer);
        //         // response.writeHead(200, { 'Content-Type': 'text/html' });
        //         // response.write(data);
        //         // response.end();
        //     } else {
        //         console.log(err);
        //     }
        // });
        // const image = await uploadFileToBlob('thumbnails', thumbnail);
        const image = await uploadFileToBlob('images', req.file);
        return res.json(image);
    } catch (error) {
        next(error);
    }
};

router.post('/', singleFileUpload.single('image'), imageUpload);

router.get('/getall', (req, res, next) => {
    blobService.listBlobsSegmented(azureStorageConfig.containerName, null, (err, data) => {
        return res.json(data.entries);
    });
});

router.post('/delete', (req, res, next) => {
    blobService.deleteBlob(azureStorageConfig.containerName, req.body.name, (err, data) => {
        return res.json(data);
    });
});


module.exports = router;