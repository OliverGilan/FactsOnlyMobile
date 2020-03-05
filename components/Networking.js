import auth from '@react-native-firebase/auth'
import Axios from 'axios'
import {link} from '../EV'

export async function fetchFacts() {
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
}