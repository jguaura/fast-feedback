import { firebase } from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export function createUser(uid, data) {
  const userRef = doc(firestore, 'users', uid);
  setDoc(
    userRef,
    {
      uid,
      ...data
    },
    { merge: true }
  );
}
