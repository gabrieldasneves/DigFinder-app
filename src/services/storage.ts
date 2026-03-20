import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImageToFirebase(
  imageUri: string,
  userId: string
): Promise<string> {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const timeStamp = Date.now();

    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `discoveries/${userId}/${timeStamp}_${randomString}.jpg`;

    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, blob);

    const downloadURl = await getDownloadURL(storageRef);

    return downloadURl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function uploadMultipleImages(
  imageUris: string[],
  userId: string
): Promise<string[]> {
  try {
    const uploadPromises = imageUris.map((uri) =>
      uploadImageToFirebase(uri, userId)
    );

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw error;
  }
}
