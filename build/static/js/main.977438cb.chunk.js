(this["webpackJsonpinbound-sales-portal"]=this["webpackJsonpinbound-sales-portal"]||[]).push([[4],{19:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return l}));var a=n(18),c=n.n(a),s=n(23),r=n(20),i=(n(55),n(83),r.a.initializeApp({apiKey:"AIzaSyC1Njy7v6xO6x7K-8PAT2T1MRSmq1EI9iQ",authDomain:"saving-portal.firebaseapp.com",projectId:"saving-portal",storageBucket:"saving-portal.appspot.com",messagingSenderId:"887413800693",appId:"1:887413800693:web:c87729e29b05f388150fbc",measurementId:"G-ECBVMRGYMC"}).firestore()),o=r.a.auth(),u=new r.a.auth.GoogleAuthProvider;r.a.firestore().enablePersistence().catch((function(e){("failed-precondition"===e.code||"unimplemented"===e.code)&&console.log(e)}));var l=function(){var e=Object(s.a)(c.a.mark((function e(t){var n,a,s,r,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.collection("users").doc(t.uid),e.next=3,n.get();case 3:if(e.sent.exists){e.next=16;break}return a=t.displayName,s=t.email,r=new Date,o=a||s,e.prev=8,e.next=11,n.set({displayName:o,email:s,createdAt:r,breakStart:{},breakEnd:{}});case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(8),console.log("Error Creating User",e.t0.message);case 16:return e.abrupt("return",n);case 17:case"end":return e.stop()}}),e,null,[[8,13]])})));return function(t){return e.apply(this,arguments)}}()},32:function(e,t,n){"use strict";n(2),n(80);var a=n(6);t.a=function(e){var t=e.text,n=e.spinner;return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{className:"overlay",children:Object(a.jsxs)("div",{className:"content",children:[n?Object(a.jsxs)("div",{className:"sk-chase",children:[Object(a.jsx)("div",{className:"sk-chase-dot"}),Object(a.jsx)("div",{className:"sk-chase-dot"}),Object(a.jsx)("div",{className:"sk-chase-dot"}),Object(a.jsx)("div",{className:"sk-chase-dot"}),Object(a.jsx)("div",{className:"sk-chase-dot"}),Object(a.jsx)("div",{className:"sk-chase-dot"})]}):null,Object(a.jsx)("div",{className:"overlay-message-container",children:Object(a.jsx)("h1",{className:"overlay-message",children:t})})]})})})}},54:function(e,t,n){},80:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),s=n(33),r=n.n(s),i=n(29),o=(n(54),n(37)),u=n(18),l=n.n(u),j=n(23),d=n(27),b=n(7),h=n(19),p=n(20),O=n(43),f=n(0),m=n(49),x=n(28),v=n.n(x),g=n(6);var k=function(){var e=Object(a.useRef)(null),t=Object(b.g)(),n=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.signOut().then((function(){console.log("Sign-out successful."),t.push("/")})).catch((function(e){console.log("An error happened.")}));case 2:return e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsx)("div",{children:Object(g.jsx)(O.a,{ref:e,timeout:36e4,onIdle:function(){var e=30,t=setInterval((function(){if(e<=0&&clearInterval(t),0===(e-=1)){n();var a=h.a.currentUser.email;return h.c.collection("signOutLogs").add({email:a,signInTime:p.a.firestore.FieldValue.serverTimestamp()}),void(v.a.getState().isOpen&&v.a.close())}}),1e3);v()({closeOnClickOutside:!0,buttons:{confirm:"Yes, I'm here"},content:Object(g.jsxs)("div",{className:"swal-text-custom",children:[Object(g.jsx)(f.b.Provider,{value:{color:"#D338AE",size:"50px"},children:Object(g.jsx)("div",{className:"animate__animated animate__shakeX",children:Object(g.jsx)(m.a,{})})}),Object(g.jsx)("h1",{children:"Are you still there?"})]})}).then((function(e){null!==e&&!0!==e||clearInterval(t)}))}})})},N=n(32),y=Object(a.lazy)((function(){return Promise.all([n.e(26),n.e(23)]).then(n.bind(null,150))})),I=Object(a.lazy)((function(){return n.e(21).then(n.bind(null,153))}));var w=function(){var e=Object(a.useState)(!1),t=Object(d.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(!0),r=Object(d.a)(s,2),i=r[0],u=r[1],p=Object(a.useState)(null),O=Object(d.a)(p,2),f=O[0],m=O[1];return Object(a.useEffect)((function(){Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.onAuthStateChanged((function(e){e?(Object(h.b)(e),u(!1),m(e),c(!0)):(c(!1),u(!1))}));case 2:case"end":return e.stop()}}),e)})))()}),[]),i?Object(g.jsx)(N.a,{text:"Checking the session...",spinner:!0}):Object(g.jsx)(b.d,{children:Object(g.jsx)(a.Suspense,{fallback:Object(g.jsx)(N.a,{text:"Loading data, please wait...",spinner:!0}),children:n?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(b.b,{path:"/home",render:function(e){return Object(g.jsx)(y,Object(o.a)({user:f},e))}}),Object(g.jsx)(k,{}),Object(g.jsx)(b.a,{to:"/home"})]}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(b.b,{exact:!0,path:"/",component:I}),Object(g.jsx)(b.a,{to:"/"})]})})})},S=function(e){e&&e instanceof Function&&n.e(29).then(n.bind(null,136)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};n(81);r.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(i.a,{children:Object(g.jsx)(w,{})})}),document.getElementById("root")),S()}},[[82,5,6]]]);
//# sourceMappingURL=main.977438cb.chunk.js.map