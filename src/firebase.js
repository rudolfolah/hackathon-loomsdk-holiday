import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, getDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyB_ZCw0h8pHxRFFYOGHhoSoLz45L9rIT-g",
  authDomain: "trivia-town-1971a.firebaseapp.com",
  projectId: "trivia-town-1971a",
  storageBucket: "trivia-town-1971a.appspot.com",
  messagingSenderId: "871234670171",
  appId: "1:871234670171:web:24ed60e38541ed204c397e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createCompanyData() {
  const companiesCollection = collection(db, "companies");
  const doc = await addDoc(companiesCollection, {
    "question-1": {
      "loomVideoId": null,
      "text": "What is the capital city of Canada?",
      "correctAnswer": "Ottawa",
      "incorrectAnswers": [
        "Toronto",
        "Vancouver",
        "Montreal",
      ],
    },
    "question-2": {
      "loomVideoId": null,
      "text": "Where is the Sea of Tranquility located?",
      "correctAnswer": "The Moon",
      "incorrectAnswers": [
        "Mars",
        "Earth",
        "Jupiter",
      ],
    },
    "question-3": {
      "loomVideoId": null,
      "text": "Question?",
      "correctAnswer": "Correct answer",
      "incorrectAnswers": [
        "Wrong",
        "Incorrect",
        "Not correct",
      ],
    },
  });
  return doc.id;
}

export async function createPlayerData(companyId) {

}

export async function getCompanyData(companyId) {
  const docRef = doc(db, "companies", companyId);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error(`company id does not exist: ${companyId}`);
  }
  return docSnapshot.data();
}