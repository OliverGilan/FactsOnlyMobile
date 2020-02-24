import auth from '@react-native-firebase/auth'
import {production} from '../EV'

export async function fetchFacts() {
    return fetch(`${production.api}`)
      .then((response) => response.json())
      .then((responseJson) => responseJson)
      .catch((error) =>{
        console.error(error);
      })
}

export async function getUser(uid){
  var token = await auth().currentUser.getIdToken()
  try {
    return await fetch(`${production.api}` + 'user', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        uid: uid
      })
    })
      .then((response) => response.json())
  } catch (e) {
    console.error(e)
  }
}

export async function submitUser(uid, email, today){
  var token = await auth().currentUser.getIdToken()
  return fetch(`${production.api}` + 'addUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                uid: uid,
                email: email,
                date: today
            }),
        }).then(response => response)
}

export async function submitReport(fid, issue, email){
  var token = await auth().currentUser.getIdToken()
  return fetch(`${production.api}` + 'reportFact', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                fid: fid,
                issue: issue,
                email: email
            }),
        })
}

export async function checkSaved(uid, fid){
  var token = await auth().currentUser.getIdToken()
  try {
    return await fetch(`${production.api}` + 'isSaved/', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: {
        uid: uid,
        fid: fid
      }
    })
      .then((response) => response.json())
      .then((responseJson) => responseJson)
  } catch (e) {
      console.error(e)
  }
}

export async function saveFact(fid, uid) {
  var token = await auth().currentUser.getIdToken()
  try {
    return await fetch(`${production.api}` + 'saveFact', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
          fid: fid,
          uid: uid
      }),
    }).then(response => {
        console.log(response.status)
        if(response.status === 200){
            return true
        }else{
            return false
        }
    });
  } catch (e) {
    console.error(e)
  }
}

export async function unsaveFact(fid, uid) {
  var token = await auth().currentUser.getIdToken()
  try {
    return await fetch(`${production.api}` + 'unsaveFact', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
          fid: fid,
          uid: uid
      }),
    }).then(response => {
        console.log(response.statusText)
        if(response.status == 200){
            return true
        }else{
            return false
        }
    });
  } catch (e) {
    console.error(e)
  }
}

export async function getSavedFacts(uid){
  var token = await auth().currentUser.getIdToken()
  console.log("TOKEN: " + JSON.stringify(token))
  try {
    return await fetch(`${production.api}` + 'saved/', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        uid: uid
      })
    })
      .then((response) => response.json())
      .then(responseJson => responseJson)
  } catch (e) {
    console.error(e)
  }
}