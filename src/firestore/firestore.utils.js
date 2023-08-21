import { initializeApp } from "firebase/app";
import {
	getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut
} from 'firebase/auth';
import { collection, writeBatch, doc, getFirestore, getDocs, query } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "trident-clothing.firebaseapp.com",
	projectId: "trident-clothing",
	storageBucket: "trident-clothing.appspot.com",
	messagingSenderId: "859171200774",
	appId: "1:859171200774:web:49952dfb9bdd7fd0938887",
	measurementId: "G-HYR6PC5L5P"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signUpWithFirebase = async (email, password) => {
	const userData = await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredials) => userCredials.user)
		.catch(error => error.code);
	return userData;
}

export const signInWithFirebase = async (email, password) => {
	const userData = await signInWithEmailAndPassword(auth, email, password)
		.then(userCredials => userCredials.user)
		.catch(error => error.code);
	return userData;
}

export const signInWithGooglePopup = async () => {
	const userData = await signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
			return user
		}).catch((error) => {
			const errorCode = error.code;
			return errorCode;
		});
	return userData;
}

export const getCollectionFromStore = async () => {
	const collectionRef = collection(db, 'catagory');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const catagoryMap = querySnapshot.docs.map((querySnapshot) => {
		const data = querySnapshot.data();
		return data;
	})
	return catagoryMap;
};

export const addCollectionToStore = async (collectionKey, datas) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db);

	datas.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	})

	await batch.commit();

	console.log('done');
}

export const signOutUser = async () => await signOut(auth);