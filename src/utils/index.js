import {nanoid} from "nanoid";
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {storage} from "../config/firebase.js";

export function fireStorageFilePostfix(){
    return nanoid()
}

export async function getImageFromStorage(imagePath) {
    try {
        const storageRef = ref(storage, imagePath);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Image download URL:", downloadURL);
        return downloadURL
    } catch (error) {
        console.error("Error getting image from storage:", error);
    }
}

export async function uploadFile(file, type='post'){
    if(! file){
        console.log('Hmm no file')
        return
    }
    const folder = {
        'post': 'PostImage',
        'profile': 'ProfilePhoto'
    }

    const path = `${folder[type]}/${file.name + fireStorageFilePostfix()}`
    const filesFolderRef = ref(storage, path)

    try{
        console.log("File uploading")
        await uploadBytes(filesFolderRef, file)
        console.log("File uploaded")

        return path
    }catch (e) {
        console.error(e)
    }
}