import React, { useEffect, useState } from 'react';
// React Router
import { useHistory } from 'react-router-dom';
// Firebase
import { db, auth } from '../../firebase/firebase';
import firebase from "firebase/app";
// Components
import Overlay from '../Overlay/Overlay';
// Icons
import { FaRegUser } from "react-icons/fa";
// CSS
import './Navbar.css';
// Icons
import { IoMdCloseCircleOutline } from "react-icons/io";

function Navbar({ progressBar, user }) {

    /**-- STATES --*/
    const [overlay, updateOverlay] = useState(false);

    // ActiveBreak
    const [activeBreak, updateActiveBreak] = useState(false);

    // Close button effect
    const [btnCloseAnimation, setBtnCloseAnimation] = useState(false);

    // Histoty
    const history = useHistory();

    // Initial state 
    const step = progressBar.step;
    const percentage = document.getElementById('percentage');
    let step_text = 'Enter your postcode';
    if (step === 0) {
        if (percentage !== null) {
            percentage.style.width = '0%';
            step_text = 'Enter your postcode';
        }
    }
    // Step 1
    if (step === 1) {
        percentage.style.width = '10%';
        step_text = 'Enter your full address';
    }
    // Step 2
    if (step === 2) {
        percentage.style.width = '20%';
        step_text = 'Choose your fuel type';
    }
    // Step 3
    if (step === 3) {
        percentage.style.width = '30%';
        step_text = 'Supply number';
    }
    // Step 4
    if (step === 4) {
        percentage.style.width = '40%';
        step_text = 'Choose your energy supplier(s)';
    }
    // Step 5
    if (step === 5) {
        percentage.style.width = '50%';
        step_text = 'Enter economy 7';
    }

    // Step 6
    if (step === 6) {
        percentage.style.width = '60%';
        step_text = 'How much energy do you use?';
    }

    // Step 7
    if (step === 7) {
        percentage.style.width = '65%';
        step_text = 'Existing debt';
    }

    // Step 8
    if (step === 8) {
        percentage.style.width = '70%';
        step_text = 'Compare section';
    }

    // Step 9
    if (step === 9) {
        percentage.style.width = '80%';
        step_text = 'Customer Details';
    }

    // Step 10
    if (step === 10) {
        percentage.style.width = '90%';
        step_text = 'Bank Details';
    }

    // Step 11
    if (step === 11) {
        percentage.style.width = '100%';
        step_text = 'Sign up successful';
    }

    /**-- FUNCTIONS --*/

    // activeSidebar
    const activeSidebar = () => {
        // Active Sidebar 
        let sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle('active-sidebar');

        // setBtnCloseAnimation
        setBtnCloseAnimation(false);

        // Show Overlay
        updateOverlay(true);
    }

    // closeSidebar
    const closeSidebar = () => {
        // Close Sidebar 
        let sidebar = document.getElementById("sidebar");
        sidebar.classList.remove('active-sidebar');

        // setBtnCloseAnimation
        setBtnCloseAnimation(true);

        // Hide Overlay
        updateOverlay(false);
    }

    // startBreak
    const startBreak = async () => {
        console.log('startBreak');
        // Get year
        let year = new Date().getFullYear();
        // Get month
        let month = new Date().getMonth();
        // Get date
        let date = new Date().getDate();
        // Get time in milliseconds
        let milliseconds = new Date().getTime();
        // Break ID
        let breakId = `break-start-${date}-${month}-${year}-${milliseconds}`;

        // Break data object
        let breakData = {};

        // Create new object key
        breakData[breakId] = { timeStamp: firebase.firestore.FieldValue.serverTimestamp() };

        // Document ref
        let docRef = await db.collection("users").doc(user.uid);

        // Fetching userData data
        const getUserData = async () => docRef.get().then((doc) => {
            // If userData exist
            if (doc.exists) {
                return doc.data();
            }

            return;
        });

        // Assign getUserData
        let userData = await getUserData();

        // Validation
        if (userData) {
            // Update user in firebase
            db.collection("users").doc(user.uid).update({
                // Save a copy of the actual data
                ...userData,
                // Add into the breakStart object
                breakStart: {
                    // Save a copy of the actual data
                    ...userData.breakStart,
                    // Add new field
                    ...breakData
                }
            });
        }

        // Close Sidebar 
        let sidebar = document.getElementById("sidebar");
        sidebar.classList.remove('active-sidebar');

        // Hide Overlay
        updateOverlay(false);
        // Uodate activeBreak
        updateActiveBreak(!activeBreak);
    }

    // endBreak
    const endBreak = async () => {
        console.log('endBreak');
        // Get year
        let year = new Date().getFullYear();
        // Get month
        let month = new Date().getMonth();
        // Get date
        let date = new Date().getDate();
        // Get time in milliseconds
        let milliseconds = new Date().getTime();
        // Break ID
        let breakId = `break-end-${date}-${month}-${year}-${milliseconds}`;

        // Break data object
        let breakData = {};

        // Create new object key
        breakData[breakId] = { timeStamp: firebase.firestore.FieldValue.serverTimestamp() };

        // Document ref
        let docRef = await db.collection("users").doc(user.uid);

        // Fetching userData data
        const getUserData = async () => docRef.get().then((doc) => {
            // If userData exist
            if (doc.exists) {
                return doc.data();
            }

            return;
        });

        // Assign getUserData
        let userData = await getUserData();

        // Validation
        if (userData) {
            // Update user in firebase
            db.collection("users").doc(user.uid).update({
                // Save a copy of the actual data
                ...userData,
                // Add into the breakEnd object
                breakEnd: {
                    // Save a copy of the actual data
                    ...userData.breakEnd,
                    // Add new field
                    ...breakData
                }
            });
        }

        // Close Sidebar 
        let sidebar = document.getElementById("sidebar");
        sidebar.classList.remove('active-sidebar');

        // Hide Overlay
        updateOverlay(false);
        // Uodate activeBreak
        updateActiveBreak(!activeBreak);
    }

    // signOut
    const signOut = async () => {
        // Sign Out - Firebase
        await auth.signOut().then(() => {
            console.log('Sign-out successful.');
            // Redirect
            history.push('/');
            // Firebase
            db.collection('signOutLogs').add({
                email,
                signInTime: firebase.firestore.FieldValue.serverTimestamp()
            });
        }).catch((error) => {
            console.log('An error happened.');
            console.log(error);
        });

        return;
    }

    // User information
    const email = user.email;
    const name = user.displayName;
    const photoURL = user.photoURL;

    // customMargin
    let customMargin;

    // signContainer
    let signContainer = document.getElementById('sign-container');

    if (signContainer) {
        customMargin = ((signContainer.offsetWidth - 120) / 2);
    }

    return (
        <>
            {/* Overlay */}
            {overlay ?
                <Overlay />
                :
                null
            }

            {/* Sidebar */}
            <div id="sidebar" className="sidebar-container">
                <div className="sidebar">
                    {/* <button className="closebtn" onClick={() => closeSidebar()}><i className="far fa-times-circle"></i></button> */}
                    <a className="sidebar-btn" href="https://sales-portal.utilityswitchboard.com/" target="_blank" rel="noopener">Sales Portal</a>
                    <IoMdCloseCircleOutline className={btnCloseAnimation ? "closebtn animate__animated animate__slideOutRight" : 'closebtn'} onClick={() => closeSidebar()} />

                    {activeBreak ?
                        (
                            <button className="sidebar-btn" onClick={() => startBreak()}>
                                Start break
                            </button>
                        )
                        :
                        (
                            <button className="sidebar-btn" onClick={() => endBreak()}>
                                End break
                            </button>
                        )
                    }

                    <button className="sidebar-btn" onClick={() => signOut()}>
                        Log Out
                    </button>
                </div>
            </div>

            {/* Navbar */}
            <div className="navbar-container">
                <nav className="navbar">
                    <a href="." className="navbar-logo" style={{marginRight: customMargin}}>
                        <img src="https://924601.smushcdn.com/2398792/wp-content/themes/twentytwentyone/assets/images/usb-logo-white.png?lossy=1&strip=1&webp=1" alt="Logo" width="120" loading="lazy" />
                    </a>

                    <div className="progress-bar-container">
                        <div id="progress-bar" className="progress-bar">
                            <div className="percentage" id="percentage"></div>
                        </div>
                        <p>{step_text}</p>
                    </div>

                    <div className="sign-container" id="sign-container" >
                        <div className="sign-content" onClick={() => activeSidebar()}>
                            {
                                photoURL ?
                                    (
                                        <>
                                            <div className="avatar-container">
                                                <img src={photoURL} alt="Avatar" width="35" style={{ borderRadius: "50%" }} loading="lazy" />
                                                <div className={activeBreak ? 'status-circle break' : 'status-circle'} id="status"></div>
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div className="avatar-container">
                                                <FaRegUser className="user-icon" />
                                                <div className={activeBreak ? 'status-circle-icon break' : 'status-circle-icon'} id="status"></div>
                                            </div>
                                        </>
                                    )
                            }
                            <p className="sign">Hi, {user !== undefined ? name ? name.split(' ').slice(0, 2).join(' ') : email.replace('@utilityswitchboard.com', '') : null}!</p>
                            {/* <p className="sign">Hi, {user.displayName}!</p> */}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar;
