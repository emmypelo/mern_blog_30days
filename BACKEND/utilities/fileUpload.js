import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//   cloud_name: "daecqybyd",
//   api_key: "445759316884389",
//   api_secret: "oMs-yJKAuK-9WxjBgZskJDOD1Ww",
// });

cloudinary.config({
  cloud_name: "process.env",
  api_key: "445759316884389",
  api_secret: "oMs-yJKAuK-9WxjBgZskJDOD1Ww",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    // folder: "leo-blog",
    format: "jpg",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

export default storage;
