import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import { submitUser } from './Networking'

export async function checkUser(user) {
    if(!user){
        try {
          await auth().signInAnonymously();
        } catch (e) {
          switch (e.code) {
            case 'auth/operation-not-allowed':
              console.log('Enable anonymous in your firebase console.');
              break;
            default:
              console.error(e);
              break;
            }
        }
        console.log("User signed in anonymously")
    }else{
        console.log("User: " + JSON.stringify(auth().currentUser))
    }
}

export function isSignedIn(){
    if(!auth().currentUser){
        return false
    }
    else if(auth().currentUser.isAnonymous == true){
        return false
    }else if(auth().currentUser.email != null){
        return true
    }
}

export function isValidEmail(email){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(email.trim() != '' && re.test(String(email).toLowerCase())){
        return true
    }
    return false
}

export function isValidPassword(password){
    if(password.trim() != ''){
        return true
    }
    return false
}

export async function login(email, password){
    try {
        return await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
        switch(e.code){
                case 'auth/user-not-found':
                  Alert.alert("User Doesn't Exist", 'Sign up as a new user!')
                break; 
                case 'auth/invalid-email':
                    Alert.alert("Invalid Email", 'Input well-formatted email!')
                break;
            }
    }
}

export async function validateData(email, password) {
    if(!isValidEmail(email)){
        Alert.alert(
            "Invalid Email",
            "Please enter a valid email address!"
        )
        return false
    }
    if(!isValidPassword(password)){
        Alert.alert(
            "Invalid Password",
            "Please enter a password!"
        )
        return false
    }
    return true
}

export function getToday(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

export async function createAccount(email, password){
    if(!validateData(email, password)){
        return
    }

    try {
        const user = await auth().createUserWithEmailAndPassword(email, password)
        return await submitUser(user.user.uid, email, getToday())
    } catch (e) {
        switch(e.code){
            case 'auth/email-already-in-use':
                Alert.alert("Email In Use", 'An account with that email is already registered.')
                break;
        }
    }
}

export async function signout(){
    try {
        await auth().signOut();
      } catch (e) {
        console.error(e.message);
    }
}

export async function getUid(){
    try {
        return await auth().currentUser.uid
    } catch (e) {
        console.error(e.message)
    }
}