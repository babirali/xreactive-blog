const router = require('express').Router();
const azureStorage = require('azure-storage');
const getStream = require('into-stream');
const multer = require('multer');
const Jimp = require('jimp');
const stream = require('stream');

const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

const azureStorageConfig = {
    accountName: process.env.AZURE_ACCOUNT_NAME,
    accountKey: process.env.AZURE_ACCOUNT_KEY,
    blobURL: process.env.AZURE_BLOB_URL,
    containerName: process.env.AZURE_BLOB_CONTAINER
};
const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

uploadThumbnailToBlob = async (directoryPath, file, lenght, blobName) => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, file, lenght, err => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    filename: blobName,
                    originalname: "xreactive",
                    size: lenght,
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`
                });
            }
        });
    });
};

uploadFileToBlob = async (directoryPath, file, blobName) => {
    return new Promise((resolve, reject) => {
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

const imageUpload = async (req, res, next) => {
    try {
        const blobName = getBlobName(req.file.originalname);
        Jimp.read(req.file.buffer).then(thumbnail => {
            thumbnail.resize(Jimp.AUTO, 200);
            thumbnail.quality(1);
            thumbnail.getBuffer(Jimp.MIME_PNG, (err, d) => {
                const readStream = stream.PassThrough();
                readStream.end(d);
                uploadThumbnailToBlob('thumbnails', readStream, d.length, blobName);
            });
        }).catch(err => {
            console.log(err);
        });
        const image = await uploadFileToBlob('images', req.file, blobName);
        return res.json(image);
    } catch (error) {
        next(error);
    }
};

router.post('/', singleFileUpload.single('image'), imageUpload);

router.get('/getall', (req, res, next) => {
    // blobService.listBlobsSegmented(azureStorageConfig.containerName, null, (err, data) => {
    //     return res.json(data.entries);
    // });
    blobService.listBlobsSegmentedWithPrefix(azureStorageConfig.containerName, 'thumbnails', null, (err, data) => {
        return res.json(data.entries);
    });
});

router.post('/delete', (req, res, next) => {
    blobService.deleteBlob(azureStorageConfig.containerName, ('thumbnails' + req.body.name), (err, data) => { });
    blobService.deleteBlob(azureStorageConfig.containerName, ('images' + req.body.name), (err, data) => { });
    return res.json("sucess");
});


module.exports = router;