import { async } from "@firebase/util";
import React,{useRef,useState} from "react";
import {firestore,firestoreath} from "./firebase.js";
import {addDoc, collection,doc} from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom"; 
import "./index.css";





//AccountCreations is the export of everyting below youll see it referanced in index.js
export default function AccountCreation(){
    // thses are used to show and hide html as the other code given wasnt working for me
    // show and show2 are booleans that need to be separte for regaster and login
    // the set show is an imported funtion that cheaes shows state
    const[show,setShow]=useState(true); 
    const [show2,setShow2]=useState(true); 
    const Auth = getAuth();
    
      
    // bit refs be posted to by the orm on submit
    const emailref = useRef();
    const passwordref = useRef();
    const emailref2= useRef();
    const passwordref2 = useRef();

    //this is just thre refeance to the collection look for test for new html in the database to see new data
    const ref = collection (firestore,"test_for_new_html");

// this is whats called on submit to acc post data
    const createAccount = async(e) =>{
        //not sure 
        e.preventDefault();
        //ormat for database
            const email = emailref.current.value;
            const  password = passwordref.current.value;
        
        
        try{
                // This function returns a credential which gives you the user's uid
                // which you could then use to create your document
                  const credential = await createUserWithEmailAndPassword(Auth, email, password);
              /*
plan for adding unique data
the collection chould be the StudentBudget  #collection#
/users  #doc#
/uniqeuserid                #collection#
/uinqueuserdata             #doc#

*/
                  const uid = credential.user.uid 
                  const docref = collection(firestore,"StudentBudget")
                  await addDoc(docref,{
                    email: credential.user.email,
                    budgetname:"defaultbudget",
                    costname:"defautexpendature",
                  });
                console.WriteLine(uid);
                // Create a new document using the uid as the document id
                // or however else you want to use this
        }catch(e){
            console.log(e);
        } 
    }
    // copy of last funtion but will be modded when i look at the auth page 
    // allso sorry nathen for the long wait its very fiddaly
    const loginuser = async(e) =>{
        e.preventDefault();
        
            const email2= emailref2.current.value;
            const password2 = passwordref2.current.value;
            console.log("email: "+emailref.current.value+"\npassword: "+passwordref.current.value);
    signInWithEmailAndPassword(Auth,email2,password2)
    .then((u) => {
        console.log("user logged in " + u)
        document.getElementById("loginlink").click();
       
       // addDoc(ref1,{foo: "bar"});
        /* how to refrance collections and documents vvv

    DocumentReference messageRef = db
    .collection("rooms").document("roomA")
    .collection("messages").document("message1");

        */
      }).catch((error) => {
    console.log(error);
});
    }
    function toggleRegister() {
        // document.body.dataset.register("data-register") = document.body.dataset.register === "true" ? "false" : "true";
        //will need to be able to track state - am i showing the register or am i not showing it?
        document.querySelector("#reg").dataset.register = document.querySelector("#reg").dataset.register === "true" ? "false" : "true";
        console.log(document.querySelector("#reg").dataset.register);
    }

    // // // //
    function togglelogin()
    {
        document.querySelector("#log").dataset.login = document.querySelector("#log").dataset.login === "true" ? "false" : "true";
    }
    return(
        <>
        <link rel="stylesheet" href="index.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="nft.jpg" />
        <meta charSet="UTF-8" />
        {/* <meta http-equiv="refresh" content="5"> take this out later */}
        <title>SPARSE</title>
        <div className="menu">
          <ul>
            <li>
              <img src=".\images\menu.png" id="menu-picture" />
            </li>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="budgetPage.html">Budget Planner</a>
            </li>
            <li>
              <a href="GoalCreator.html">Goal Creator</a>
            </li>
            <li>
              <a href="myAccount.html">My Account</a>
            </li>
            {/* <input type="text" placeholder="Search.."> */}
          </ul>
        </div>
        <div className="logotext">
          <h1>SPARSE</h1>
        </div>
        <Link hidden to={'Login'} id="loginlink"></Link>
        <div className="column-container">
          <div className="first-column" id="log" data-register="false">
            <div className="login">
              <form className="login-form" onSubmit={loginuser}>
                <label htmlFor="fname">Email:</label>
                <br />
                <input type="text" id="username" name="username" ref={emailref2}/>
                <br />
                <label htmlFor="password">Password:</label>
                <br />
                <input type="password" id="password" name="password" ref={passwordref2}/>
                <br />
                <label htmlFor="cpassword">Confirm password:</label>
                <br />
                <input type="password" id="cpassword" name="cpassword" />
                <br />
                <button className="submitter" type="submit" value="Submit">
                Login
              </button>
              </form>
              
            </div>
          </div>
          <div className="middle-column">
            {/* <div class="title">
                <h1>Welcome to Sparse</h1>
            </div> */}
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
              <br />
              diam nonummy nibh euismod tincidunt ut laoreet dolore
            </p>
            <div className="button-container">
              <button className="button-style"onClick={togglelogin}>LOGIN</button>
              <button className="button-style" onClick={toggleRegister}>
                REGISTER
              </button>
            </div>
            <div className="register" id="reg" data-register="false">
              <div className="full">
                <form className="register-form" onSubmit={createAccount}>
                  <label htmlFor="fname">Email:</label>
                  <br />
                  <input type="text" id="username" name="username" ref={emailref}/>
                  <br />
                  <label htmlFor="password">Password:</label>
                  <br />
                  <input type="password" id="password" name="password" />
                  <br />
                  <label htmlFor="cpassword">Confirm password:</label>
                  <br />
                  <input type="password" id="cpassword" name="cpassword" ref={passwordref}/>
                  <br />
                  {/* <input type="submit"> */}
                  <button className="submitter" type="submit">
                  Submit
                </button>
                </form>
                
              </div>
            </div>
          </div>
          <div className="last-column">
            {/* id="reg" data-register="false" */}
            {/* <div class="register" >
                <form class="register-form">
                    <label for="fname">Username:</label><br>
                    <input type="text" id="username" name="username"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password"><br>
                    <label for="cpassword">Confirm password:</label><br>
                    <input type="password" id="cpassword" name="cpassword"><br>
                    
                </form>
                <button class="submitter" type="submit">Register</button>
            </div>  */}
            {/* <button class="toggler-button-last-column" type="button" onclick="toggleRegister()">i toggle</button> */}
          </div>
        </div>
      </>
      
    );
}
