(this["webpackJsonpinbound-sales-portal"]=this["webpackJsonpinbound-sales-portal"]||[]).push([[23],{107:function(e,t,a){},108:function(e,t,a){},150:function(e,t,a){"use strict";a.r(t);var s=a(38),r=a(18),n=a.n(r),o=a(37),c=a(23),i=a(27),u=a(2),l=a(19),p=a(7),d=a(20),b=a(32),j=a(93),m=(a(107),a(86)),g=a(6);var O=function(e){var t=e.progressBar,a=e.user,s=Object(u.useState)(!1),r=Object(i.a)(s,2),O=r[0],_=r[1],y=Object(u.useState)(!1),f=Object(i.a)(y,2),h=f[0],S=f[1],w=Object(u.useState)(!1),x=Object(i.a)(w,2),F=x[0],v=x[1],P=Object(p.g)(),I=t.step,k=document.getElementById("percentage"),G="Enter your postcode";0===I&&null!==k&&(k.style.width="0%",G="Enter your postcode"),1===I&&(k.style.width="10%",G="Enter your full address"),2===I&&(k.style.width="20%",G="Choose your fuel type"),3===I&&(k.style.width="30%",G="Supply number"),4===I&&(k.style.width="40%",G="Choose your energy supplier(s)"),5===I&&(k.style.width="50%",G="Enter economy 7"),6===I&&(k.style.width="60%",G="How much energy do you use?"),7===I&&(k.style.width="65%",G="Existing debt"),8===I&&(k.style.width="70%",G="Compare section"),9===I&&(k.style.width="80%",G="Customer Details"),10===I&&(k.style.width="90%",G="Bank Details"),11===I&&(k.style.width="100%",G="Sign up successful");var A,B=function(){var e=Object(c.a)(n.a.mark((function e(){var t,s,r,i,u,p,b,j,m;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("startBreak"),t=(new Date).getFullYear(),s=(new Date).getMonth(),r=(new Date).getDate(),i=(new Date).getTime(),u="break-start-".concat(r,"-").concat(s,"-").concat(t,"-").concat(i),(p={})[u]={timeStamp:d.a.firestore.FieldValue.serverTimestamp()},e.next=10,l.c.collection("users").doc(a.uid);case 10:return b=e.sent,j=function(){var e=Object(c.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b.get().then((function(e){if(e.exists)return e.data()})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=14,j();case 14:(m=e.sent)&&l.c.collection("users").doc(a.uid).update(Object(o.a)(Object(o.a)({},m),{},{breakStart:Object(o.a)(Object(o.a)({},m.breakStart),p)})),document.getElementById("sidebar").classList.remove("active-sidebar"),_(!1),S(!h);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(c.a)(n.a.mark((function e(){var t,s,r,i,u,p,b,j,m;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("endBreak"),t=(new Date).getFullYear(),s=(new Date).getMonth(),r=(new Date).getDate(),i=(new Date).getTime(),u="break-end-".concat(r,"-").concat(s,"-").concat(t,"-").concat(i),(p={})[u]={timeStamp:d.a.firestore.FieldValue.serverTimestamp()},e.next=10,l.c.collection("users").doc(a.uid);case 10:return b=e.sent,j=function(){var e=Object(c.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b.get().then((function(e){if(e.exists)return e.data()})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=14,j();case 14:(m=e.sent)&&l.c.collection("users").doc(a.uid).update(Object(o.a)(Object(o.a)({},m),{},{breakEnd:Object(o.a)(Object(o.a)({},m.breakEnd),p)})),document.getElementById("sidebar").classList.remove("active-sidebar"),_(!1),S(!h);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(c.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.signOut().then((function(){console.log("Sign-out successful."),P.push("/"),l.c.collection("signOutLogs").add({email:E,signInTime:d.a.firestore.FieldValue.serverTimestamp()})})).catch((function(e){console.log("An error happened."),console.log(e)}));case 2:return e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=a.email,C=a.displayName,U=a.photoURL,D=document.getElementById("sign-container");return D&&(A=(D.offsetWidth-120)/2),Object(g.jsxs)(g.Fragment,{children:[O?Object(g.jsx)(b.a,{}):null,Object(g.jsx)("div",{id:"sidebar",className:"sidebar-container",children:Object(g.jsxs)("div",{className:"sidebar",children:[Object(g.jsx)("a",{className:"sidebar-btn",href:"https://sales-portal.utilityswitchboard.com/",target:"_blank",rel:"noopener",children:"Sales Portal"}),Object(g.jsx)(m.d,{className:F?"closebtn animate__animated animate__slideOutRight":"closebtn",onClick:function(){return document.getElementById("sidebar").classList.remove("active-sidebar"),v(!0),void _(!1)}}),h?Object(g.jsx)("button",{className:"sidebar-btn",onClick:function(){return B()},children:"Start break"}):Object(g.jsx)("button",{className:"sidebar-btn",onClick:function(){return z()},children:"End break"}),Object(g.jsx)("button",{className:"sidebar-btn",onClick:function(){return T()},children:"Log Out"})]})}),Object(g.jsx)("div",{className:"navbar-container",children:Object(g.jsxs)("nav",{className:"navbar",children:[Object(g.jsx)("a",{href:".",className:"navbar-logo",style:{marginRight:A},children:Object(g.jsx)("img",{src:"https://924601.smushcdn.com/2398792/wp-content/themes/twentytwentyone/assets/images/usb-logo-white.png?lossy=1&strip=1&webp=1",alt:"Logo",width:"120",loading:"lazy"})}),Object(g.jsxs)("div",{className:"progress-bar-container",children:[Object(g.jsx)("div",{id:"progress-bar",className:"progress-bar",children:Object(g.jsx)("div",{className:"percentage",id:"percentage"})}),Object(g.jsx)("p",{children:G})]}),Object(g.jsx)("div",{className:"sign-container",id:"sign-container",children:Object(g.jsxs)("div",{className:"sign-content",onClick:function(){return document.getElementById("sidebar").classList.toggle("active-sidebar"),v(!1),void _(!0)},children:[U?Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"avatar-container",children:[Object(g.jsx)("img",{src:U,alt:"Avatar",width:"35",style:{borderRadius:"50%"},loading:"lazy"}),Object(g.jsx)("div",{className:h?"status-circle break":"status-circle",id:"status"})]})}):Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"avatar-container",children:[Object(g.jsx)(j.i,{className:"user-icon"}),Object(g.jsx)("div",{className:h?"status-circle-icon break":"status-circle-icon",id:"status"})]})}),Object(g.jsxs)("p",{className:"sign",children:["Hi, ",void 0!==a?C?C.split(" ").slice(0,2).join(" "):E.replace("@utilityswitchboard.com",""):null,"!"]})]})})]})})]})};a(108);var _=function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{className:"footer-container",id:"footer-container",children:Object(g.jsx)("nav",{className:"footer",children:Object(g.jsxs)("a",{href:".",className:"footer-logo",children:[Object(g.jsx)("img",{src:"https://924601.smushcdn.com/2398792/wp-content/themes/twentytwentyone/assets/images/usb-logo-white.png?lossy=1&strip=1&webp=1",alt:"Logo",width:"200",loading:"lazy"}),Object(g.jsxs)("p",{children:[" \xa9 Copyright ",(new Date).getFullYear()," - All rights reserved"]})]})})})})},y=Object(u.lazy)((function(){return a.e(17).then(a.bind(null,151))})),f=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(7)]).then(a.bind(null,154))})),h=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(28),a.e(10)]).then(a.bind(null,137))})),S=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(11)]).then(a.bind(null,155))})),w=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(25)]).then(a.bind(null,147))})),x=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,138))})),F=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(16)]).then(a.bind(null,139))})),v=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(13)]).then(a.bind(null,140))})),P=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(14)]).then(a.bind(null,141))})),I=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(15)]).then(a.bind(null,142))})),k=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,143))})),G=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,144))})),A=Object(u.lazy)((function(){return Promise.all([a.e(0),a.e(3),a.e(27),a.e(2),a.e(22)]).then(a.bind(null,148))})),B=Object(u.lazy)((function(){return Promise.all([a.e(3),a.e(20)]).then(a.bind(null,149))})),z=Object(u.lazy)((function(){return a.e(19).then(a.bind(null,156))})),T=Object(u.lazy)((function(){return a.e(18).then(a.bind(null,146))})),E=Object(u.lazy)((function(){return a.e(24).then(a.bind(null,152))}));t.default=function(e){var t,a=e.user,r=Object(u.useState)({step:0}),p=Object(i.a)(r,2),d=p[0],j=p[1],m=Object(u.useState)(!0),C=Object(i.a)(m,2),U=C[0],D=C[1],N=Object(u.useState)({postcode:""}),L=Object(i.a)(N,2),M=L[0],V=L[1],H=Object(u.useState)({}),R=Object(i.a)(H,2),W=R[0],K=R[1],Y=Object(u.useState)({}),q=Object(i.a)(Y,2),J=q[0],Q=q[1],X=Object(u.useState)({}),Z=Object(i.a)(X,2),$=Z[0],ee=Z[1],te=Object(u.useState)({}),ae=Object(i.a)(te,2),se=ae[0],re=ae[1],ne=Object(u.useState)({}),oe=Object(i.a)(ne,2),ce=oe[0],ie=oe[1],ue=Object(u.useState)({}),le=Object(i.a)(ue,2),pe=le[0],de=le[1],be=Object(u.useState)({}),je=Object(i.a)(be,2),me=je[0],ge=je[1],Oe=Object(u.useState)({}),_e=Object(i.a)(Oe,2),ye=_e[0],fe=_e[1],he=Object(u.useState)({}),Se=Object(i.a)(he,2),we=Se[0],xe=Se[1],Fe=Object(u.useState)({}),ve=Object(i.a)(Fe,2),Pe=ve[0],Ie=ve[1],ke=Object(u.useState)(!1),Ge=Object(i.a)(ke,2),Ae=Ge[0],Be=Ge[1],ze=Object(u.useState)(!0),Te=Object(i.a)(ze,2),Ee=Te[0],Ce=Te[1],Ue=Object(u.useState)(!1),De=Object(i.a)(Ue,2),Ne=De[0],Le=De[1],Me=Object(u.useState)(!1),Ve=Object(i.a)(Me,2),He=Ve[0],Re=Ve[1],We=Object(u.useState)(!1),Ke=Object(i.a)(We,2),Ye=Ke[0],qe=Ke[1],Je=Object(u.useState)(!1),Qe=Object(i.a)(Je,2),Xe=Qe[0],Ze=Qe[1],$e=Object(u.useState)(!1),et=Object(i.a)($e,2),tt=et[0],at=et[1],st=Object(u.useState)(!1),rt=Object(i.a)(st,2),nt=rt[0],ot=rt[1],ct=Object(u.useState)(!1),it=Object(i.a)(ct,2),ut=it[0],lt=it[1],pt=Object(u.useState)(!1),dt=Object(i.a)(pt,2),bt=dt[0],jt=dt[1],mt=Object(u.useState)(!1),gt=Object(i.a)(mt,2),Ot=gt[0],_t=gt[1],yt=Object(u.useState)(!1),ft=Object(i.a)(yt,2),ht=ft[0],St=ft[1],wt=Object(u.useState)(!1),xt=Object(i.a)(wt,2),Ft=xt[0],vt=xt[1],Pt=Object(u.useState)(!1),It=Object(i.a)(Pt,2),kt=It[0],Gt=It[1],At=Object(u.useState)(!1),Bt=Object(i.a)(At,2),zt=Bt[0],Tt=Bt[1],Et=Object(u.useState)(!1),Ct=Object(i.a)(Et,2),Ut=Ct[0],Dt=Ct[1],Nt=Object(u.useState)(!1),Lt=Object(i.a)(Nt,2),Mt=Lt[0],Vt=Lt[1],Ht=Object(u.useState)(!1),Rt=Object(i.a)(Ht,2),Wt=Rt[0],Kt=Rt[1],Yt=Object(u.useState)(!1),qt=Object(i.a)(Yt,2),Jt=qt[0],Qt=qt[1],Xt=Object(u.useState)(!1),Zt=Object(i.a)(Xt,2),$t=Zt[0],ea=Zt[1],ta=function(e){V({postcode:e.toUpperCase()})},aa=function(){var e=Object(c.a)(n.a.mark((function e(t){var a,s,r,c,i,u,p,b,m,g,O,_,y,f,h,S,w,x,F,v,P,I,k,G,A,B,z,T,E,C,U,D,N,L,M,V,H,R,W,Y,q,J,X,Z,$,te,ae,ne,oe,ue,le,pe,be;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.step,s=t.customerAddres,r=t.MPANDetails,c=t.dataGas,i=t.fuel,u=t.useGas,p=t.fuel_description,b=t.supplierInformation,m=t.electricityPaymentType,g=t.gasPaymentType,O=t.economy7,_=t.usage_property_size_dual,y=t.usage_property_size_es,f=t.usage_property_size_gs,h=t.usage_gas_description,S=t.usage_gbp_description_gs,w=t.usage_kwh_description,x=t.usage_gbp_description_es,F=t.avgElec,v=t.avgGas,P=t.debt,console.log("Aqui aqui"),console.log(P),I=s.postcode,a>1&&(k=p.gas_only,G=p.elec_only,A=p.same_supplier,B=p.dual_active),N={unit_rate:17},L={unit_rate:27},e.next=9,l.c.collection("unitRates").doc("unit_rate_svt_elec");case 9:return M=e.sent,e.next=12,M.get().then((function(e){return e.exists?e.data():N})).catch((function(e){return console.log("Error getting document:",e),N}));case 12:return V=e.sent,e.next=15,l.c.collection("unitRates").doc("unit_rate_svt_gas");case 15:return H=e.sent,e.next=18,H.get().then((function(e){return e.exists?e.data():L})).catch((function(e){return console.log("Error getting document:",e),L}));case 18:R=e.sent,e.t0=a,e.next=0===e.t0?22:1===e.t0?29:2===e.t0?39:3===e.t0?51:4===e.t0?64:5===e.t0?83:6===e.t0?105:7===e.t0?107:8===e.t0?147:149;break;case 22:return console.log("Step 0"),j(Object(o.a)(Object(o.a)({},d),{},{step:1})),ta(I),Ce(!1),Le(!0),Be(!1),e.abrupt("break",150);case 29:return console.log("Step 1"),ta(I),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),j(Object(o.a)(Object(o.a)({},d),{},{step:2})),Le(!1),Re(!0),Be(!1),e.abrupt("break",150);case 39:return console.log("Step 2"),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),ee(Object(o.a)({},i)),Q(Object(o.a)({},u)),ge(Object(o.a)(Object(o.a)({},me),{},{fuel_description:p})),j(Object(o.a)(Object(o.a)({},d),{},{step:3})),Le(!1),qe(!0),Be(!1),e.abrupt("break",150);case 51:return console.log("Step 3"),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),ee(Object(o.a)({},i)),Q(Object(o.a)({},u)),de(Object(o.a)({},b)),ge(Object(o.a)(Object(o.a)({},me),{},{fuel_description:p})),j(Object(o.a)(Object(o.a)({},d),{},{step:4})),Le(!1),Ze(!0),Be(!1),e.abrupt("break",150);case 64:return console.log("Step 4"),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),ee(Object(o.a)({},i)),Q(Object(o.a)({},u)),de(Object(o.a)({},b)),E=m.electricity_payment_type_id,C=m.electricity_payment_type_method,""===E&&""===C?(delete(W=Object(o.a)({},m)).electricity_payment_type_id,delete W.electricity_payment_type_method,fe(Object(o.a)({},W)),z=W):(fe(Object(o.a)({},m)),z=m),U=g.gas_payment_type_id,D=g.gas_payment_type_method,""===U&&""===D?(delete(Y=Object(o.a)({},g)).gas_payment_type_id,delete Y.gas_payment_type_method,xe(Object(o.a)({},Y)),T=Y):(xe(Object(o.a)({},g)),T=g),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p})),j(Object(o.a)(Object(o.a)({},d),{},{step:5})),Le(!1),at(!0),Be(!1),e.abrupt("break",150);case 83:return console.log("Step 5"),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),ee(Object(o.a)({},i)),Q(Object(o.a)({},u)),de(Object(o.a)({},b)),E=m.electricity_payment_type_id,C=m.electricity_payment_type_method,""===E&&""===C?(delete(q=Object(o.a)({},m)).electricity_payment_type_id,delete q.electricity_payment_type_method,fe(Object(o.a)({},q)),z=q):(fe(Object(o.a)({},m)),z=m),U=g.gas_payment_type_id,D=g.gas_payment_type_method,""===U&&""===D?(delete(J=Object(o.a)({},g)).gas_payment_type_id,delete J.gas_payment_type_method,xe(Object(o.a)({},J)),T=J):(xe(Object(o.a)({},g)),T=g),Ie({economy7:Object(o.a)({},O)}),G&&(console.log("elec_only, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate:V.unit_rate}}))),k&&(console.log("gas_only, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate:R.unit_rate}}))),B&&(A?(console.log("Same supplier true, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate_elec:V.unit_rate,unit_rate_gas:R.unit_rate}}))):(console.log("Same supplier false, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description_elec:{elec_tariff:{unit_rate:V.unit_rate}},tariff_description_gas:{gas_tariff:{unit_rate:R.unit_rate}}})))),j(Object(o.a)(Object(o.a)({},d),{},{step:6})),Le(!1),k?lt(!0):ot(!0),Be(!1),e.abrupt("break",150);case 105:return console.log("Step 6"),e.abrupt("break",150);case 107:return console.log("Step 7"),K(Object(o.a)({},s)),re(Object(o.a)(Object(o.a)({},se),{},{MPANDetails:r})),ie(Object(o.a)(Object(o.a)({},ce),{},{dataGas:c})),ee(Object(o.a)({},i)),Q(Object(o.a)({},u)),de(Object(o.a)({},b)),E=m.electricity_payment_type_id,C=m.electricity_payment_type_method,""===E&&""===C?(delete(X=Object(o.a)({},m)).electricity_payment_type_id,delete X.electricity_payment_type_method,fe(Object(o.a)({},X)),z=X):(fe(Object(o.a)({},m)),z=m),U=g.gas_payment_type_id,D=g.gas_payment_type_method,""===U&&""===D?(delete(Z=Object(o.a)({},g)).gas_payment_type_id,delete Z.gas_payment_type_method,xe(Object(o.a)({},Z)),T=Z):(xe(Object(o.a)({},g)),T=g),Ie({economy7:Object(o.a)({},O)}),$=w.usage_kwh_entered,te=x.usage_gbp_entered,ae=y.usage_size_entered,ne=h.usage_kwh_entered,oe=S.usage_gbp_entered,ue=f.usage_size_entered,le=_.usage_size_entered,pe={usage_kwh_description:w,usage_gbp_description_es:x,usage_gas_description:h,usage_gbp_description_gs:S,usage_property_size_es:y,usage_property_size_gs:f,usage_property_size_dual:_},be=Object(o.a)({},pe),$&&(delete be.usage_gbp_description_es,delete be.usage_property_size_es,delete be.usage_property_size_dual),te&&(delete be.usage_property_size_es,delete be.usage_property_size_dual),ae&&(delete be.usage_property_size_dual,delete be.usage_property_size_gs),ne&&(delete be.usage_gbp_description_gs,delete be.usage_property_size_gs,delete be.usage_property_size_dual),oe&&(delete be.usage_property_size_gs,delete be.usage_property_size_dual),ue&&(delete be.usage_property_size_dual,delete be.usage_property_size_es),le&&(delete be.usage_property_size_es,delete be.usage_property_size_gs),G&&(console.log("elec_only, Assign Tariff description"),delete be.usage_gas_description,delete be.usage_gbp_description_gs,delete be.usage_property_size_gs,delete be.usage_property_size_dual,ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate:V.unit_rate},debt:P},be))),k&&(console.log("gas_only, Assign Tariff description"),delete be.usage_kwh_description,delete be.usage_gbp_description_es,delete be.usage_property_size_es,delete be.usage_property_size_dual,ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate:R.unit_rate},debt:P},be))),B&&(A?(console.log("Same supplier true, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description:{unit_rate_elec:V.unit_rate,unit_rate_gas:R.unit_rate},debt:P},be))):(console.log("Same supplier false, Assign Tariff description"),ge(Object(o.a)(Object(o.a)({},me),{},{customerAddres:s,useGas:u,fuel:i,supplierInformation:b,electricityPaymentType:z,gasPaymentType:T,fuel_description:p,economy7:O,tariff_description_elec:{elec_tariff:{unit_rate:V.unit_rate}},tariff_description_gas:{gas_tariff:{unit_rate:R.unit_rate}},debt:P},be)))),vt(F),Gt(v),j(Object(o.a)(Object(o.a)({},d),{},{step:8})),Le(!1),Dt(!0),Be(!1),e.abrupt("break",150);case 147:return console.log("Step 8"),e.abrupt("break",150);case 149:return e.abrupt("break",150);case 150:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return console.log(me),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(O,{progressBar:d,user:a}),Ae?Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}):null,Object(g.jsxs)(g.Fragment,{children:[Ee?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(y,{addPostCodeData:ta,progressBar:d,showScript:U,updateShowFormPostCode:Ce,updateShowFormAddres:Le,updateProgressBar:j,updateShowScript:D})}):null,Ne?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(f,{postcodeValue:M.postcode,gasInformation:ce,electricityInformation:se,progressBar:d,showScript:U,customerStep:aa,updateCustomerAddress:K,updateGasInformation:ie,updateElectricityInformation:re,updateShowFormPostCode:Ce,updateShowFormAddres:Le,updateShowOverlay:Be,updateProgressBar:j,updateShowScript:D,updateShowFomrFuelType:Re})}):null,He?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(h,{customerInformation:me,showScript:U,fuel:$,useGas:J,electricityInformation:se,gasInformation:ce,supplierInformation:pe,customerAddres:W,progressBar:d,updateCustomerInformation:ge,updateFuel:ee,updateUseGas:Q,updateElectricityInformation:re,updateGasInformation:ie,updateSupplierInformation:de,updateCustomerAddress:K,updateShowFomrFuelType:Re,updateShowFormMpanMprn:qe,updateShowFormAddres:Le,updateProgressBar:j})}):null,Ye?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(S,{customerAddres:W,electricityInformation:se,gasInformation:ce,customerInformation:me,useGas:J,fuel:$,progressBar:d,showScript:U,updateCustomerAddress:K,updateElectricityInformation:re,updateGasInformation:ie,updateCustomerInformation:ge,updateProgressBar:j,updateShowFormMpanMprn:qe,updateShowFormSupply:Ze,updateShowFomrFuelType:Re,updateShowOverlay:Be})}):null,Xe?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(w,{customerAddres:W,electricityInformation:se,gasInformation:ce,supplierInformation:pe,useGas:J,fuel:$,customerInformation:me,electricityPaymentType:ye,gasPaymentType:we,progressBar:d,showScript:U,updateCustomerAddress:K,updateShowFormMpanMprn:qe,updateShowFormSupply:Ze,updateShowE7:at,updateSupplierInformation:de,updateElectricityInformation:re,updateGasInformation:ie,updateCustomerInformation:ge,updateElectricityPaymentType:fe,updateGasPaymentType:xe,updateFuel:ee,updateProgressBar:j})}):null,tt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(x,{economy7:Pe,customerInformation:me,electricityPaymentType:ye,gasPaymentType:we,electricityInformation:se,gasInformation:ce,supplierInformation:pe,progressBar:d,showScript:U,updateEconomy7:Ie,updateCustomerInformation:ge,updateShowFormSupply:Ze,updateShowE7:at,updateElectricityPaymentType:fe,updateGasPaymentType:xe,updateProgressBar:j,updateShowOverlay:Be,updateSupplierInformation:de,updateGasInformation:ie,updateElectricityInformation:re,updateShowFormUsageKWH:ot,updateShowFormUsageGAS:lt})}):null,nt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(F,{customerInformation:me,progressBar:d,showScript:U,updateAvgElec:vt,updateCustomerInformation:ge,updateShowFormUsageKWH:ot,updateShowFormUsageGAS:lt,updateShowFormUsageGBP_es:jt,updateShowFormDebt:Tt,updateProgressBar:j,updateShowOverlay:Be,updateShowE7:at})}):null,ut?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(v,{customerInformation:me,progressBar:d,avgElec:Ft,showScript:U,updateCustomerInformation:ge,updateShowFormUsageGAS:lt,updateShowFormUsageKWH:ot,updateShowFormUsageGBP_gs:_t,updateShowFormUsageGBP_es:jt,updateShowFormUsageAVG:St,updateShowFormDebt:Tt,updateAvgGas:Gt,updateAvgElec:vt,updateProgressBar:j,updateShowOverlay:Be,updateShowE7:at})}):null,bt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(P,(t={customerInformation:me,progressBar:d,showScript:U,updateCustomerInformation:ge,updateShowFormUsageKWH:ot,updateShowFormUsageGBP_es:jt},Object(s.a)(t,"updateShowFormUsageGBP_es",jt),Object(s.a)(t,"updateShowFormUsageAVG",St),Object(s.a)(t,"updateShowFormUsageGAS",lt),Object(s.a)(t,"updateShowFormDebt",Tt),Object(s.a)(t,"updateAvgElec",vt),Object(s.a)(t,"updateProgressBar",j),t))}):null,Ot?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(I,{customerInformation:me,avgElec:Ft,progressBar:d,showScript:U,updateCustomerInformation:ge,updateShowFormUsageGAS:lt,updateShowFormUsageGBP_gs:_t,updateShowFormUsageAVG:St,updateShowFormDebt:Tt,updateAvgGas:Gt,updateProgressBar:j})}):null,ht?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(k,{customerInformation:me,avgElec:Ft,avgGas:kt,progressBar:d,showScript:U,updateCustomerInformation:ge,updateShowFormUsageAVG:St,updateShowFormUsageGBP_es:jt,updateShowFormUsageGBP_gs:_t,updateShowFormUsageGAS:lt,updateShowFormDebt:Tt,updateProgressBar:j})}):null,zt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(G,{customerInformation:me,showScript:U,progressBar:d,updateCustomerInformation:ge,updateShowFormUsageKWH:ot,updateShowFormUsageGBP_es:jt,updateShowFormUsageAVG:St,updateProgressBar:j,updateShowFormUsageGAS:lt,updateShowFormUsageGBP_gs:_t,updateShowFormDebt:Tt,updateShowFormCompare:Dt})}):null,Ut?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(A,{customerInformation:me,user:a,electricityInformation:se,gasInformation:ce,avgElec:Ft,avgGas:kt,showScript:U,progressBar:d,updateCustomerInformation:ge,updateShowOverlay:Be,updateShowFormCompare:Dt,updateShowFormUsageKWH:ot,updateShowFormUsageGBP_es:jt,updateShowFormUsageAVG:St,updateShowFormUsageGAS:lt,updateShowFormUsageGBP_gs:_t,updateShowFormDetails:Vt,updateShowFormDebt:Tt,updateProgressBar:j})}):null,Mt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(B,{customerInformation:me,progressBar:d,updateCustomerInformation:ge,updateShowFormCompare:Dt,updateShowFormDetails:Vt,updateProgressBar:j,updateShowFormBankDetails:Kt,updateShowOverlay:Be})}):null,Wt?Object(g.jsx)(u.Suspense,{fallback:Object(g.jsx)(b.a,{text:"Loading data, please wait...",spinner:!0}),children:Object(g.jsx)(z,{customerInformation:me,progressBar:d,updateCustomerInformation:ge,updateShowFormDetails:Vt,updateProgressBar:j,updateShowFormBankDetails:Kt,updateShowFormRating:Qt,updateShowOverlay:Be})}):null,Jt?Object(g.jsx)(T,{customerInformation:me,progressBar:d,updateCustomerInformation:ge,updateShowFormRating:Qt,updateShowSuccessFul:ea,updateProgressBar:j}):null,$t?Object(g.jsx)(E,{}):null]}),Object(g.jsx)(_,{})]})}}}]);
//# sourceMappingURL=23.304ac635.chunk.js.map