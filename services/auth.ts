import {initializeApp} from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlnhroFiE9MBWLUmTmmr8jOlH7rXavEZo",
    authDomain: "dev-jiordi.firebaseapp.com",
    projectId: "dev-jiordi",
    storageBucket: "dev-jiordi.appspot.com",
    messagingSenderId: "1088649452387",
    appId: "1:1088649452387:web:200301a37f2396c38e9156",
    measurementId: "G-7TBRH8PB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Interface pour l'utilisateur authentifié
interface User {
    uid: string | null;
    email: string | null;
}

// Fonction pour s'inscrire avec un email et un mot de passe
async function firebaseSignUpWithEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {uid: user.uid, email: user.email};
    } catch (error) {
        console.error('Erreur d’inscription :', error);
        return {uid: null, email: null};
    }
}

// Fonction pour se connecter avec un email et un mot de passe
async function firebaseSignInWithEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {uid: user.uid, email: user.email};
    } catch (error) {
        console.error('Erreur de connexion :', error);
        return null;
    }
}

// Fonction pour se déconnecter
async function firebaseSignOut() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Erreur de déconnexion :', error);
    }
}

// Fonction pour écouter les changements d'état d'authentification
function firebaseOnAuthStateChanged(callback: (user: User | null) => void) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback({uid: user.uid, email: user.email});
        } else {
            callback(null);
        }
    });
}

export {firebaseSignUpWithEmailAndPassword, signInWithEmailAndPassword, firebaseSignOut, firebaseOnAuthStateChanged};