import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

const app = !getApps().length ? initializeApp(environment.firebase) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
