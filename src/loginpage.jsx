
import { async } from "@firebase/util";
import React,{useRef,useState} from "react";
import {firestore,firestoreath} from "./firebase.js";
import {addDoc, collection,doc} from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom"; 
import "./index.css";

export default function Loginpage() {


    const mauth = getAuth();
    const user = mauth.currentUser.uid
    const quary = doc(firestore,"StudentBudget/"+user)
    const [docs,loading,error]= useDocumentData(quary)
  return (
    <div>
      {loading && "loading.."}
      <table>
        <thead>
        <tr>
          <th>Budgets</th>
          <th>View</th>
        </tr>
        </thead>
        <tbody>
        
        <tr>
          <td>{docs.budgetname}</td>
          <td>link</td>
        </tr>
        
        </tbody>
      </table>

    </div>
    
  )
}
