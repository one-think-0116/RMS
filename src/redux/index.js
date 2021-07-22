import React, { createContext } from 'react';
import {FirebaseConfig} from '../config';
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import {store} from './store';

import {
    signIn,
    fetchUser,
    signOut,
    deleteUser,
    checkUser,
    checkStatus
} from './actions/authactions';
import {
    authenticate
} from './actions/authenticateactions';
import { 
    fetchCalculator,
    updateCalculatorRefAdder,
    updateCalculator
} from './actions/calculatoractions';
import { 
    fetchAdders,
    updateAdders,
} from './actions/addersactions';
import { 
    fetchFormulas,
    updateFormulas,
} from './actions/formulasactions';
import { 
    fetchBattery,
    addBattery,
    updateBattery,
    deleteBattery
} from './actions/batteryactions';
import { 
    fetchCash,
    addCash,
    updateCash,
    deleteCash
} from './actions/cashactions';
import { 
    fetchFee,
    addFee,
    updateFee,
    deleteFee
} from './actions/feeactions';
import { 
    fetchGuide,
    updateGuide
} from './actions/guideactions';
import { 
    fetchModule,
    addModule,
    updateModule,
    deleteModule
} from './actions/modulesactions';
import { 
    fetchSelfGen,
    addSelfGen,
    updateSelfGen,
    deleteSelfGen
} from './actions/selfgenactions';
import { 
    fetchUsers,
    updateUsers,
    deleteUsers
} from './actions/usersactions';
import { 
    toggleSidebar
} from './actions/layoutactions';
const FirebaseContext = createContext(null);

const FirebaseProvider  = ({ children }) => {
    let firebase = {
        app: null,
        database: null,
        auth: null,
        storage: null,
    }

    if (!app.apps.length) {
        app.initializeApp(FirebaseConfig);
        firebase = {
            app: app,
            database: app.database(),
            auth: app.auth(),
            storage: app.storage(),
            authRef: app.auth(),
            googleProvider:new app.auth.GoogleAuthProvider(),
            googleCredential: (idToken) => app.auth.GoogleAuthProvider.credential(idToken),
            usersRef: app.database().ref("users"),
            singleUserRef:(uid) => app.database().ref("users/" + uid),
            calculatorsRef:app.database().ref("calculators"),
            singleCalculatorsRef:(uid) => app.database().ref("calculators/" + uid),
            addersRef:app.database().ref("adders"),
            singleAddersRef:(uid) => app.database().ref("adders/" + uid),
            feeRef:app.database().ref("fee"),
            cashRef:app.database().ref("cash"),
            batteryRef:app.database().ref("battery"),
            selfGenRef:app.database().ref("selfGen"),
            formulasRef:app.database().ref("formulas"),
            moduleRef:app.database().ref("module"),
            guideRef:app.database().ref("guide"),
            settingsRef:app.database().ref("settings"),
            api: {
                signIn: (email, password) => (dispatch) => signIn(email, password)(dispatch)(firebase), 
                fetchUser: () => (dispatch) => fetchUser()(dispatch)(firebase), 
                signOut: () => (dispatch) => signOut()(dispatch)(firebase), 
                checkStatus: () => (dispatch) => checkStatus()(dispatch)(firebase), 
                deleteUser: (uid) => (dispatch) => deleteUser(uid)(dispatch)(firebase), 
                checkUser: (uid) => (dispatch) => checkUser(uid)(dispatch)(firebase), 
                
                fetchCalculator: (uid) => (dispatch) => fetchCalculator(uid)(dispatch)(firebase), 
                updateCalculator: (uid,data) => (dispatch) => updateCalculator(uid,data)(dispatch)(firebase), 
                updateCalculatorRefAdder: (uid,data) => (dispatch) => updateCalculatorRefAdder(uid,data)(dispatch)(firebase), 
                
                fetchAdders: (uid) => (dispatch) => fetchAdders(uid)(dispatch)(firebase), 
                updateAdders: (uid,data) => (dispatch) => updateAdders(uid,data)(dispatch)(firebase),
                
                fetchFormulas: () => (dispatch) => fetchFormulas()(dispatch)(firebase), 
                updateFormulas: (data) => (dispatch) => updateFormulas(data)(dispatch)(firebase), 
                
                authenticate: (val) => (dispatch) => authenticate(val)(dispatch)(firebase), 
                
                fetchBattery: () => (dispatch) => fetchBattery()(dispatch)(firebase), 
                addBattery: (data) => (dispatch) => addBattery(data)(dispatch)(firebase), 
                updateBattery: (data) => (dispatch) => updateBattery(data)(dispatch)(firebase), 
                deleteBattery: (data) => (dispatch) => deleteBattery(data)(dispatch)(firebase),   
                
                fetchCash: () => (dispatch) => fetchCash()(dispatch)(firebase),
                addCash: (data) => (dispatch) => addCash(data)(dispatch)(firebase), 
                updateCash: (data) => (dispatch) => updateCash(data)(dispatch)(firebase), 
                deleteCash: (data) => (dispatch) => deleteCash(data)(dispatch)(firebase), 
                
                fetchFee: () => (dispatch) => fetchFee()(dispatch)(firebase),
                addFee: (data) => (dispatch) => addFee(data)(dispatch)(firebase), 
                updateFee: (data) => (dispatch) => updateFee(data)(dispatch)(firebase), 
                deleteFee: (data) => (dispatch) => deleteFee(data)(dispatch)(firebase),  
               
                fetchGuide: () => (dispatch) => fetchGuide()(dispatch)(firebase), 
                updateGuide: (data) => (dispatch) => updateGuide(data)(dispatch)(firebase), 
                
                fetchModule: () => (dispatch) => fetchModule()(dispatch)(firebase),
                addModule: (data) => (dispatch) => addModule(data)(dispatch)(firebase), 
                updateModule: (data) => (dispatch) => updateModule(data)(dispatch)(firebase), 
                deleteModule: (data) => (dispatch) => deleteModule(data)(dispatch)(firebase),   
                
                fetchSelfGen: () => (dispatch) => fetchSelfGen()(dispatch)(firebase), 
                addSelfGen: (data) => (dispatch) => addSelfGen(data)(dispatch)(firebase), 
                updateSelfGen: (data) => (dispatch) => updateSelfGen(data)(dispatch)(firebase), 
                deleteSelfGen: (data) => (dispatch) => deleteSelfGen(data)(dispatch)(firebase),   
                
                fetchUsers: () => (dispatch) => fetchUsers()(dispatch)(firebase), 
                updateUsers: (uid,data) => (dispatch) => updateUsers(uid,data)(dispatch)(firebase), 
                deleteUsers: (uid) => (dispatch) => deleteUsers(uid)(dispatch)(firebase), 
                
                toggleSidebar: () => (dispatch) => toggleSidebar()(dispatch)(firebase), 
            }
        }
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}

export {
    FirebaseContext,
    FirebaseProvider,
    store
}