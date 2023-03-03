const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

// AWS.config.loadFromPath('./config/awsConfig.json');
//need to create a aws configuration json fileError
// {
// "accessKeyId": "your aws key here",
// "secretAccessKey": "your access key here",
// "region": "us-east-1"
// }
//save it in awsConfig.json file

// const s3 = new AWS.S3();

// export const bucket = "dev-multer-s3-bucket"

const s3 = new AWS.S3({
    endpoint: "http://127.0.0.1:9000",
    accessKeyId: "S8TtTKAyuFzUCrsK",
    secretAccessKey: "EizwqIrmtSGneTKb4OBhMjjKB60WujE8",
    sslEnabled: false,
    s3ForcePathStyle: true,
});

// Set The Storage Engine to store in your localhost machine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname.toLowerCase()));
//     }
// });

// Init Upload setting the configuration of S3 aws
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my-auction',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname.toLowerCase()))
        }
    })

})



module.exports = {
    upload
}
