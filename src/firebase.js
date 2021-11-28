import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, addDoc, getDoc, updateDoc, query, where, getDocs, onSnapshot
} from 'firebase/firestore';
import { sortBy, uniq } from "lodash";

import { dataset } from "./dataset";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createCompanyData() {
  const companiesCollection = collection(db, "companies");
  const doc = await addDoc(companiesCollection, dataset);
  return doc.id;
}

export async function setCompanyQuestionAsTaken(companyId, questionId) {
  const docRef = doc(db, "companies", companyId);
  return updateDoc(docRef, {
    [`${questionId}.alreadyTaken`]: true
  });
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
  for (let result of results) {
    result.place = scores.indexOf(result.score) + 1;
  }
  return sortBy(results, ["place", "name"]);
}


export function realtimeGetPlayerScores(companyId, callback) {
  const playersCollection = collection(db, "players");
  const q = query(playersCollection, where("companyId", "==", companyId));

  onSnapshot(q, (querySnapshot) => {
    let results = [];
    let scores = [];
    querySnapshot.docs.forEach(doc => {
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
    for (let result of results) {
      result.place = scores.indexOf(result.score) + 1;
    }
    callback(sortBy(results, ["place", "name"]));
  });
}
