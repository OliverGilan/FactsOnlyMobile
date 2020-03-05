import auth from '@react-native-firebase/auth'
import Axios from 'axios'
import {link} from '../EV'

export async function fetchFacts() {
    // return fetch(`${production.api}`)
    //   .then((response) => response.json())
    //   .then((responseJson) => responseJson)
    //   .catch((error) =>{
    //     console.error(error);
    //   })
    return Axios.get(link)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function getUser(uid){
  var token = await auth().currentUser.getIdToken()
  const headers={
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
  }
//   try {
//     return await fetch(`${production.api}` + 'user', {
//       method: 'POST',
//       headers: {
//         authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         uid: uid
//       })
//     })
//       .then((response) => response.json())
//   } catch (e) {
//     console.error(e)
//   }
    return Axios.post(link+'user', {
        uid: uid
    }, {headers: headers})
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function submitUser(uid, email, today){
  var token = await auth().currentUser.getIdToken()
  const headers={
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
  }
  return Axios.post(link+"addUser", {
      uid: uid,
      email: email,
      date: today
  }, {headers:headers})
  .then(res => res.data)
  .catch(err => console.log(err))
//   return fetch(`${production.api}` + 'addUser', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 uid: uid,
//                 email: email,
//                 date: today
//             }),
//         }).then(response => response)
}

export async function submitReport(fid, issue, email){
    var token = await auth().currentUser.getIdToken()
    const headers={
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    return Axios.post(link+"reportFact", {
        fid: fid,
        email: email,
        issue: issue
    }, {headers:headers})
    .then(res => res.data)
    .catch(err => console.log(err))
//   return fetch(`${production.api}` + 'reportFact', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 fid: fid,
//                 issue: issue,
//                 email: email
//             }),
//         })
}

export async function checkSaved(uid, fid){
  var token = await auth().currentUser.getIdToken()
  console.log(fid);
  const headers={
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
    }
    return Axios.post(link+"isSaved", {
        uid: uid,
        fid: fid
    }, {headers:headers})
    .then(res => res.data)
    .catch(err => console.log(err))
//   console.log(uid)
//   try {
//     return await fetch(`${production.api}` + 'isSaved/', {
//       method: 'POST',
//       headers: {
//         authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         uid: uid,
//         fid: fid
//       })
//     })
//       .then((response) => response.json())
//       .then((responseJson) => console.log(responseJson))
//   } catch (e) {
//       console.error(e)
//   }
}

export async function saveFact(fid, uid) {
    var token = await auth().currentUser.getIdToken()
    const headers={
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    return Axios.post(link+"saveFact", {
        fid: fid,
        uid: uid
    }, {headers:headers})
    .then(res => res.data)
    .catch(err => console.log(err))
//   try {
//     return await fetch(`${production.api}` + 'saveFact', {
//       method: 'POST',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//           fid: fid,
//           uid: uid
//       }),
//     }).then(response => {
//         console.log(response.status)
//         if(response.status === 200){
//             return true
//         }else{
//             return false
//         }
//     });
//   } catch (e) {
//     console.error(e)
//   }
}

export async function unsaveFact(fid, uid) {
  var token = await auth().currentUser.getIdToken()
  const headers={
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
  }
  return Axios.post(link+"unsaveFact", {
      fid: fid,
      uid: uid
  }, {headers:headers})
  .then(res => res.data)
  .catch(err => console.log(err))
//   try {
//     return await fetch(`${production.api}` + 'unsaveFact', {
//       method: 'POST',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//           fid: fid,
//           uid: uid
//       }),
//     }).then(response => {
//         console.log(response.statusText)
//         if(response.status == 200){
//             return true
//         }else{
//             return false
//         }
//     });
//   } catch (e) {
//     console.error(e)
//   }
}

export async function getSavedFacts(uid){
  var token = await auth().currentUser.getIdToken()
  var token = await auth().currentUser.getIdToken()
  const headers={
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
  }
  return Axios.post(link+"saved", {
      uid: uid
  }, {headers:headers})
  .then(res => res.data)
  .catch(err => console.log(err))
//   console.log("TOKEN: " + JSON.stringify(token))
//   try {
//     return await fetch(`${production.api}` + 'saved/', {
//       method: 'POST',
//       headers: {
//         authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         uid: uid
//       })
//     })
//       .then((response) => response.json())
//       .then(responseJson => responseJson)
//   } catch (e) {
//     console.error(e)
//   }
}