import auth from '@react-native-firebase/auth'
import Axios from 'axios'
import { isSignedIn } from './Authentication'
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
    console.log(uid + " + " + email + " + " + today)
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
    .then(res => res)
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
    .then(res => res)
    .catch(err => console.log(err))
}

export async function checkSaved(uid, fid){
    var token = await auth().currentUser.getIdToken()
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

export async function getEconFacts() {
    return Axios.get(link+'economy')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function getWorldFacts() {
    return Axios.get(link+'world')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function getPoliticalFacts() {
    return Axios.get(link+'politics')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function getSportsFacts() {
    return Axios.get(link+'sports')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export async function isAdmin(){
    if(isSignedIn()){
        var token = await auth().currentUser.getIdToken()
        const headers={
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
        return await Axios.post(link+'isAdmin', {}, {headers:headers})
        .then(res => {
            if(res.status === 200){
                return true;
            }else{
                return false;
            }
        })
        .catch(err => false)
    }
}

export async function createPost(headline, body, category){
    var token = await auth().currentUser.getIdToken()
    const headers={
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    return await Axios.post(link,{
      headline: headline,
      fact: body,
      category: category
    },{headers:headers}).then(res => {
        if(res.status===200){return true}
        else{return res}
    }).catch(err => err)
}

export async function editPost(id, date, headline, body, category, sources){
    var token = await auth().currentUser.getIdToken()
    const headers={
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    return await Axios.post(link + 'editFact',{
        fact: {body: body, id: id, headline: headline, date: date, category: category, sources: sources}
    },{headers:headers}).then(res => {
        if(res.status===200){return true}
        else{return res}
    }).catch(err => err)
}

export async function deletePost(id){
    var token = await auth().currentUser.getIdToken()
    const headers={
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    return Axios.post(link+'deleteFact',
    {
        fact: {id: id}
    }, {headers: headers})
    .then(res => {
        if(res.status===200){
            return true
        }else{
            return res
        }
    }).catch(err => err)
}