import { env } from "../utils/env.js";
import { saveFileToCloudinary } from "../utils/files/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/files/saveFileToUploadDir.js";

export const photoHandler = async (files) => {
  const photoUrls = [];

  for (const file of files) {
    let photoUrl;
    if (env("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(file);
    } else {
      photoUrl = await saveFileToUploadDir(file);
    }

    photoUrls.push(photoUrl);
  }

  return photoUrls;
};
