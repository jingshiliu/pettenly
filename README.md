# pettenly
This site is live at https://pettenly.jingshi-liu.com/


## Run Your Own Pettenly

1. Fork to your own repo or simply clone the repo to your local machine
2. You must create a folder `config` inside the `src` folder
3. Create a file named `firebase.js` inside the `config`
4. copy the following code and replace with your own firebase key
    ```javascript
    import { initializeApp } from "firebase/app";
    import {getAuth, GoogleAuthProvider} from "firebase/auth"
    import {getFirestore, collection} from "firebase/firestore"
    import {getStorage} from "firebase/storage"
    
    const firebaseConfig = {
        apiKey: "your key",
        authDomain: "yourdomain.firebaseapp.com",
        projectId: "yourproject",
        storageBucket: "yourstorage.appspot.com",
        messagingSenderId: "*******",
        appId: "secretId"
    };
    
    
    const app = initializeApp(firebaseConfig);
    
    export const auth = getAuth(app);
    
    export const googleAuthProvider = new GoogleAuthProvider();
    
    export const db = getFirestore(app)
    
    export const storage = getStorage(app)
    ```


## About This App

The idea of this app is to help user to adopt or `post` a pet. You can think of trading but helping pet find a second home 
is the main motivation. The main UI of this app is a map, and each `post` will have a preview photo displayed on the map
which provides a better sense of the geographical location. You can view the detail by clicking a `post preview` and a 
widget will pop up to show more detail. In the `post widget` you can obviously see more photo, or make an appointment 
to the current owner or the one who made the post, or see the profile of the user who made the post, or start a chat
with the user.