import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2"
})

//Upload Gallery files
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'four-top',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const newFileName = `${file.originalname}_${Date.now().toString()}`;
      const path = `gallery/${newFileName}`
      cb(null, path)
    }
  })
})

export const uploadMiddleware = upload.array("file");

export const uploadController = (req, res) => {
  const { files } = req;
  const fileArr = [];
  for (let i = 0; i < files.length; i++) {
    fileArr.push(files[i].location)
  }
  res.json({ fileArr });
}

//Upload avatar image
const uploadA = multer({
  storage: multerS3({
    s3,
    bucket: 'four-top',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const newFileName = `${Date.now().toString()}_${file.originalname}`;
      const path = `avatar/${newFileName}`
      cb(null, path)
    }
  })
})

export const uploadAMiddleware = uploadA.single("avatar");

export const uploadAController = (req, res) => {
  const { file: { location } } = req;
  res.json({ location });
}