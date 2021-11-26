import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, addDoc, getDoc, updateDoc, query, where, getDocs
} from 'firebase/firestore';
import {keys, reverse, sortBy, sortedUniq, uniq} from "lodash";

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

export async function setCompanyQuestionLoomVideoSharedUrl(companyId, questionId, loomVideoSharedUrl) {
  const docRef = doc(db, "companies", companyId);
  return updateDoc(docRef, {
    [`${questionId}.loomVideoId`]: loomVideoSharedUrl
  });
}

export async function createPlayerData(companyId, name) {
  const playersCollection = collection(db, "players");
  const doc = await addDoc(playersCollection, {
    "companyId": companyId,
    "name": name,
    "question-1": null,
    "question-2": null,
    "question-3": null
  });
  return doc.id;
}

export async function setPlayerAnswer(playerId, questionId, answerIsCorrect) {
  const docRef = doc(db, "players", playerId);
  return updateDoc(docRef, {
    [`${questionId}`]: answerIsCorrect
  });
}

export async function getCompanyData(companyId) {
  const docRef = doc(db, "companies", companyId);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    throw new Error(`company id does not exist: ${companyId}`);
  }
  return docSnapshot.data();
}

export async function getPlayerScores(companyId) {
  const playersCollection = collection(db, "players");
  const q = query(playersCollection, where("companyId", "==", companyId));
  let results = [];
  let scores = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    let score = 0;
    for (let key of Object.keys(data)) {
      if (key.startsWith("question-") && data[key]) {
        score += 1;
      }
    }
    results.push({
      name: data.name,
      score,
    });
    scores.push(score);
  });
  scores = uniq(scores);
  scores.sort();
  scores.reverse();
  console.log(scores);
  for (let result of results) {
    result.place = scores.indexOf(result.score) + 1;
  }
  return sortBy(results, ["place", "name"]);
}