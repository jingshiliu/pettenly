import {nanoid} from "nanoid";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {auth, db, storage} from "../config/firebase.js";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";

export function fireStorageFilePostfix(){
    return nanoid()
}

export async function getImageFromStorage(imagePath) {
    try {
        const storageRef = ref(storage, imagePath);
        return await getDownloadURL(storageRef)
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

export async function getAppointments(){
    try {
        const appts = await getDocs(query(
            collection(db, 'appointment'),
            where('to', '==', auth?.currentUser?.uid),
            orderBy('time', 'desc')
        ))

        const apptsData = []
        for(let appt of appts.docs)
            apptsData.push({
                ...appt.data(),
                id: appt.id,
                time: appt.data().time.toDate()
            })
        return apptsData
    }catch (e) {
        console.error(e)
    }
}

export async function getPosts(){
    try{
        const postsSnapshot = await getDocs(query(
            collection(db, 'post'),
            where('postCreator', '==', auth?.currentUser?.uid),
            orderBy('createdAt', 'desc')
        ))

        const postsData = []
        for(let post of postsSnapshot.docs){
            postsData.push({
                ...post.data(),
                id: post.id
            })
        }

        return postsData
    }catch (e){
        console.error(e)
    }
}

export async function getUser(){
    try{
        const userDoc = await getDoc(doc(db, 'user', auth?.currentUser?.uid))
        const userData = userDoc.data()
        const profilePhotoUrl = await getImageFromStorage(userData.image)

        return {
            ...userData,
            image: profilePhotoUrl
        }
    }catch (e){
        console.error(e)
    }
}