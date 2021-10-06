import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import {seedDatabase} from '../seed'

const config = { apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_Auth_Domain,
projectId: process.env.REACT_APP_projectId,
storageBucket: process.env.REACT_APP_Storage_Bucket,
messagingSenderId: process.env.REACT_APP_Messaging_SenderId,
appId: process.env.REACT_APP_AppId
}



const app = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;


// seedDatabase(app)

export { app, FieldValue };