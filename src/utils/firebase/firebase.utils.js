import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} 
from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    writeBatch,
    query
}
from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAdd4P64I7_Ve8jUDaJRxXzLnjGZYeCbhM",
    authDomain: "crown-clothing-db-3209f.firebaseapp.com",
    projectId: "crown-clothing-db-3209f",
    storageBucket: "crown-clothing-db-3209f.appspot.com",
    messagingSenderId: "867384485842",
    appId: "1:867384485842:web:043c815359a2446939ca0b"
  };

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth(); //authentication memory bank for firebase and our website that keeps data track of all the authentication happened.

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const signOutUser = async () => signOut(auth);
export const firebaseDb = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firebaseDb, collectionKey);
    const batch = writeBatch(firebaseDb);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
    });
    
    await batch.commit();
    console.log('batch committed.');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(firebaseDb, 'Categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(firebaseDb,'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        }
        catch(err){
            console.log('error creating user: ', err);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email,password);
}

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);