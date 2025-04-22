import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,deleteUser } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const realtimeDatabase = getDatabase(app);

export const firestoreDatabase = getFirestore(app);

export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGooglePopup =async()=>{
    try{
        const result = await signInWithPopup(auth,googleAuthProvider);
        const user = result.user;
        const usersRef = doc(firestoreDatabase,'users',user.uid);
        const userDoc = await getDoc(usersRef);
        if(!userDoc.exists()){
            await setDoc(usersRef,{
                role:'reader',
                email:user.email,
                name:user.displayName || "Anonymous",
            })
        }

    }catch(e){
        console.error('error while signing in with google popup',e)
    }
}

export const createUserFromEmailAndPassword =async(email,password,name)=>{
    try{
        const result = await createUserWithEmailAndPassword(auth,email,password);
        const usersRef = doc(firestoreDatabase,'users',result.user.uid);
        const userDoc = await getDoc(usersRef);
        if(userDoc.exists()){
            throw new Error("User already exists in Firestore");
        }
        await setDoc(usersRef,{
            role:'reader',
            email:email,
            name:name,
            password:password,
        })
        localStorage.setItem('cacheEmail',email)
        return 1;
    }catch(e){
        if (e.code === 'auth/email-already-in-use') {
            console.error("Email already in use. Please use a different email.");
            return 2;
          }
          if(e.message !== "User already exists in Firestore"){
            console.error("Error while creating user or setting data",e);
            const user = auth.currentUser;
            if(user){
                await deleteUser(user)
                console.log("User deleted from Auth due to Firestore error");
            }
          }
        console.error('error while creating user with email and password',e)
        return 3;
    }
}

export const signInUserWithEmailAndPassword =async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
        if(localStorage.getItem('cacheEmail') !== email){
            localStorage.setItem('cacheEmail',email);
        }
        return 1;
    }catch(e){
        if(e.code ==='auth/invalid-credential'){
            console.error('invalid credential')
            return 4;
        }
        console.error('error while signing user with email and password',e)
        return 3;
    }
}

export const signOutUser=async()=>{
    try{
        await signOut(auth);
    }catch(e){
        console.error('error signing out user',e);
    }
}