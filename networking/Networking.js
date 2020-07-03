import auth from "@react-native-firebase/auth";
import Axios from "axios";
import { isSignedIn } from "./Authentication";
import { API_HOST } from "react-native-dotenv";

export async function fetchFacts() {
  return Axios.get(API_HOST)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getUser(uid) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "user",
    {
      uid: uid,
    },
    { headers: headers }
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function submitUser(uid, email, today) {
  var token = await auth().currentUser.getIdToken();
  console.log(uid + " + " + email + " + " + today);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "addUser",
    {
      uid: uid,
      email: email,
      date: today,
    },
    { headers: headers }
  )
    .then((res) => res)
    .catch((err) => console.log(err));
}

export async function submitReport(fid, issue, email) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "reportFact",
    {
      fid: fid,
      email: email,
      issue: issue,
    },
    { headers: headers }
  )
    .then((res) => res)
    .catch((err) => console.log(err));
}

export async function checkSaved(uid, fid) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "isSaved",
    {
      uid: uid,
      fid: fid,
    },
    { headers: headers }
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function saveFact(fid, uid) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "saveFact",
    {
      fid: fid,
      uid: uid,
    },
    { headers: headers }
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function unsaveFact(fid, uid) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "unsaveFact",
    {
      fid: fid,
      uid: uid,
    },
    { headers: headers }
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getSavedFacts(uid) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "saved",
    {
      uid: uid,
    },
    { headers: headers }
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getEconFacts() {
  return Axios.get(API_HOST + "economy")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getWorldFacts() {
  return Axios.get(API_HOST + "world")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getPoliticalFacts() {
  return Axios.get(API_HOST + "politics")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getSportsFacts() {
  return Axios.get(API_HOST + "sports")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function isAdmin() {
  if (isSignedIn()) {
    var token = await auth().currentUser.getIdToken();
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    return await Axios.post(link + "isAdmin", {}, { headers: headers })
      .then((res) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => false);
  }
}

export async function createPost(headline, body, category, sources) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return await Axios.post(
    API_HOST,
    {
      headline: headline,
      fact: body,
      category: category,
      sources: sources,
    },
    { headers: headers }
  )
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return res;
      }
    })
    .catch((err) => err);
}

export async function editPost(id, date, headline, body, category, sources) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return await Axios.post(
    API_HOST + "editFact",
    {
      fact: {
        body: body,
        id: id,
        headline: headline,
        date: date,
        category: category,
        sources: sources,
      },
    },
    { headers: headers }
  )
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return res;
      }
    })
    .catch((err) => err);
}

export async function deletePost(id) {
  var token = await auth().currentUser.getIdToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
  return Axios.post(
    API_HOST + "deleteFact",
    {
      fact: { id: id },
    },
    { headers: headers }
  )
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return res;
      }
    })
    .catch((err) => err);
}
