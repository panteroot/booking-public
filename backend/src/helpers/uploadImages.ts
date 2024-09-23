import cloudinary from "cloudinary";
import multer from "multer";

export const uploadImagesToCloudinary = async (
  imageFiles: Express.Multer.File[]
) => {
  const uploadPromises = imageFiles.map(async (image) => {
    // convert to base64
    const base64 = Buffer.from(image.buffer).toString("base64");

    // describes image
    let dataURI = "data:" + image.mimetype + ";base64," + base64;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  // after all images are uploaded, proceed to next process
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

export const uploadImageWithMulter = (
  imageFilename: string,
  uploadLimit: number
) => {
  //* store any file or image in memory
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, //* upto 5MB
    },
  });

  return upload.array(imageFilename, uploadLimit);
};

export const uploadImageToCloudinary = async (
  imageFile: Express.Multer.File
) => {
  const uploadPromises = async () => {
    // convert to base64
    const base64 = Buffer.from(imageFile.buffer).toString("base64");

    // describes image
    let dataURI = "data:" + imageFile.mimetype + ";base64," + base64;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  };
};
