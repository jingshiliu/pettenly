import {nanoid} from "nanoid";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {auth, db, storage} from "../config/firebase.js";
import {collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, or, orderBy, query, where} from "firebase/firestore";

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

export async function getAppointments(userId){
    if(userId === undefined)
        userId = auth?.currentUser?.uid
    try {
        const appts = await getDocs(query(
            collection(db, 'appointment'),
            where('to', '==', userId),
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

export async function getPosts(userId){
    if(userId === undefined)
        userId = auth?.currentUser?.uid
    try{
        const postsSnapshot = await getDocs(query(
            collection(db, 'post'),
            where('postCreator', '==', userId),
            orderBy('createdAt', 'desc')
        ))

        return postsSnapshot.docs.map(post => ({...post.data(), id: post.id}))
    }catch (e){
        console.error(e)
    }
}

export async function deletePost(postId){
    if(postId === undefined) return

    try{
        await deleteDoc(doc(db, 'post', postId))
    }catch (err){
        console.error(err)
    }
}

export async function getUser(userId){
    if(userId === undefined)
        userId = auth?.currentUser?.uid
    try{
        const userDoc = await getDoc(doc(db, 'user', userId))
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


export async function getChatPreviews(userId){
    if(userId === undefined)
        userId = auth?.currentUser?.uid

    try{
        const chatSnapShot = await getDocs(query(
            collection(db, 'chat'),
            or(
                where('user1', '==', userId),
                where('user2', '==', userId)
            ),
            orderBy('lastUpdate', 'desc')
        ))
        return chatSnapShot.docs.map(chat => ({...chat.data(), id:chat.id}))

    }catch (e){
        console.error(e)
    }
}

/***
 *
 * @param chatId
 * @param func: func(messages) will be executed when receive an updates
 * @returns {function} unsubscribe
 */
export function subscribeToMessageUpdates(chatId, func){
    try{
        return onSnapshot(query(
            collection(db, `chat/${chatId}/messages`),
            orderBy('createdAt', 'desc')
        ), (messagesSnapshot) => {
            const messages = messagesSnapshot.docs.map(message => ({...message.data(), id: message.id}))
            func(messages)
        })
    }catch (e){
        console.error(e)
    }
}