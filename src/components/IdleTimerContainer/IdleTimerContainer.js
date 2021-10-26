import React, { useRef } from 'react';
// React Router
import { useHistory } from 'react-router-dom';
// Firebase
import { db, auth } from '../../firebase/firebase';
import firebase from "firebase/app";
// IdleTimer
import IdleTimer from 'react-idle-timer';
// Icons
import { IconContext } from "react-icons";
import { RiTimeLine } from 'react-icons/ri';
// Swal
import swal from '@sweetalert/with-react';

function IdleTimerContainer() {
    const IdleTimerRef = useRef(null);

    // Histoty
    const history = useHistory();

    const signOut = async () => {
        // Sign Out - Firebase
        await auth.signOut().then(() => {
            console.log('Sign-out successful.');
            // Redirect
            history.push('/');
        }).catch((error) => {
            console.log('An error happened.');
        });

        return;
    }

    const onIdle = () => {

        // Counter down timer
        let timeleft = 30;
        let counterDownTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(counterDownTimer);
            }

            // Decresae by -1
            let upTo = timeleft -= 1;

            if (upTo === 0) {

                // Signout method
                signOut();

                // Email
                const email = auth.currentUser.email;

                // Firebase
                db.collection('signOutLogs').add({
                    email,
                    signInTime: firebase.firestore.FieldValue.serverTimestamp(),
                });

                // Check modal state
                const isOpen = swal.getState().isOpen;
                // Conditional to close the modal
                if (isOpen) {
                    swal.close();
                }

                return;
            }

        }, 1000);

        swal({
            closeOnClickOutside: true,
            buttons: {
                confirm: "Yes, I'm here"
            },
            content: (
                <div className="swal-text-custom">
                    <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                        <div className="animate__animated animate__shakeX">
                            <RiTimeLine />
                        </div>
                    </IconContext.Provider>
                    <h1>Are you still there?</h1>
                </div>
            )
        }).then(respond => {
            if (respond === null || respond === true) {
                clearInterval(counterDownTimer);
                return;
            }
        });
    }

    return (
        <div>
            <IdleTimer ref={IdleTimerRef} timeout={360 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer
