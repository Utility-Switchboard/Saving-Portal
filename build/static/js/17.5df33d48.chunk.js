(this["webpackJsonpinbound-sales-portal"]=this["webpackJsonpinbound-sales-portal"]||[]).push([[17],{110:function(e,t,i){},151:function(e,t,i){"use strict";i.r(t);var s=i(38),a=i(37),c=i(27),o=i(2),r=(i(110),i(87)),l=i(84),n=i(6);t.default=function(e){var t=e.addPostCodeData,i=e.progressBar,d=e.showScript,u=e.updateShowFormPostCode,m=e.updateShowFormAddres,p=e.updateProgressBar,b=e.updateShowScript,j=Object(o.useState)({postcode:""}),h=Object(c.a)(j,2),x=h[0],g=h[1];Object(o.useEffect)((function(){window.scrollTo({top:0,behavior:"smooth"})}),[]);var v=Object(o.useState)(!1),O=Object(c.a)(v,2),y=O[0],w=O[1];Object(o.useEffect)((function(){if(y){document.querySelector("#error").scrollIntoView({behavior:"smooth",block:"end",inline:"end"})}}),[y]);var R=x.postcode;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("section",{className:"postcode-header-section",children:[Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"postcode-header animate__animated animate__bounceInLeft",children:[Object(n.jsx)("h1",{children:"Utility Switchboard"}),Object(n.jsxs)("h1",{children:[Object(n.jsx)("span",{children:"Savings Portal"}),"."]})]}),Object(n.jsx)("div",{className:"postcode-script",children:Object(n.jsxs)("button",{className:"animate__animated animate__bounceInLeft",onClick:function(e){return function(e){e.preventDefault(),b(!d)}(e)},children:["Start script",Object(n.jsx)("span",{})]})})]}),Object(n.jsx)("div",{className:"postcode-img",children:Object(n.jsx)("img",{className:"animate__animated animate__zoomIn",src:"data:image/png;base64,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",alt:"Saving icon"})})]}),Object(n.jsx)("section",{className:"postcode-input-section",children:Object(n.jsxs)("div",{className:"postcode-input-container",children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("h2",{children:"Let's get started"}),Object(n.jsxs)("div",{className:"postcode-input-content",children:[Object(n.jsx)("input",{type:"text",placeholder:"Enter postcode here",name:"postcode",onChange:function(e){w(!1),g(Object(a.a)(Object(a.a)({},x),{},Object(s.a)({},e.target.name,e.target.value.replace(/[^\w\s]/gi,"").trim())))},value:R,required:!0,"data-cy":"postcode-input"}),Object(n.jsx)("button",{"data-cy":"postcode-btn",type:"button",onClick:function(e){return function(e){e.preventDefault();var s=x.postcode;if(""!==s.trim()){var c=s.replace(/ /g,""),o="";c.length<5||c.length>8?w(!0):(5===c.length&&(o=c.slice(0,2)+" "+c.slice(2,5)),6===c.length&&(o=c.slice(0,3)+" "+c.slice(3,6)),7===c.length&&(o=c.slice(0,4)+" "+c.slice(4,7)),w(!1),t(o),u(!1),m(!0),p(Object(a.a)(Object(a.a)({},i),{},{step:1})))}else w(!0)}(e)},children:"Find postcode"})]}),y?Object(n.jsx)(l.a,{message:"Please, enter a valid postcode"}):null,Object(n.jsx)("div",{className:"postcode-trustpilot",children:Object(n.jsx)("a",{href:"https://uk.trustpilot.com/review/utilityswitchboard.com",target:"_blank",rel:"noreferrer",children:Object(n.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABGCAMAAAAZ4Z3/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAHFUExURUdwTBERERumbh2rdhASERumbhQ3Kh2qdBARERumbhumbh6uexERER+uexEUExERERuocRERERunbxERERERERumbhumbhumbh+uexumbhumbhERERumbhumbhERERERERERERERERERERERERERERERERERERERERERERERER+uexERERERERERERERERERERERERERERERERERERERERERERERERERERERER6tehERERERERERER6uexERER+uexumbh6teR6uexumbhERERERERERER6teR6uex+ueyC0gBERER+uex+uex6teBERER+uex6uex+uex+uex6ueh+uewRcMAlqPgJQJQJQJRumdBicagFKIBGlexumbhERERmlbR+ue////x2mb/7//h+ncRakaxGiaPz+/QyhZQmgZP7+/kS1hxymbhOjaQ6hZwafYj+zhB6teimrd/v9/DGufPX7+TiwgLDfzEm3iuv28SOpdE+5jlS7kZrXvYTOr9bv5L7l1QKcXnPHpGPBmvD59XvKqcbp2s3r37fi0IvRtN3x6uTz7qrdyGvEn1y+lpPUuR+xfaTbxAFLIRaYZwluQQ6BUnBqlJcAAABddFJOUwAD+wQE1wIBAf38A/r8BhAtzkFHIk9Kb/6LZduGqzHtKv2JeZcWN7md0brhUAzA6TsJXPbF15DxgFlfHaIYtNDUtMXkY21AOO+L/qtwqCRy530Q3Aie/kd8y/70/S2Bn3oAAAxKSURBVGje7Fj7WxNJFr0ZYicupENMnGGG3RgCCSBvCS95DQygiIoqzj4/+pHtJACB8BYFEFB0UHZ0Vf/evbeq3xB2dN3v44cpwa+7TlfXqXNu3boNgKP5BCi/BKU+OF/NVwL370DJuaNVCldvTsE5o4Ue9t9Uzp2L6GGPooyfNxfRwyFFeVhyvlzkHlYoN86Xi8zDisB5cxE9vKMEKpRB33lyET18cA89VM6Biz5bYx4qSkC5jy7aG4Df1f6nOdkLzn6Nr9RqU/AIOSnkYmmJ1e0DPwgeRxPgtzA7fWL2MnwBvgbJFRlTaoWRD6a4h0pFOfabvaVfFmo4p9frPWXms9YBXq+IlKFn+OrQVb0NDSt6G7T6rg7eBi+MpAZqrdbcCcKX+uj3wGRz6hqIdc3NMRCKPXY7oJzdxqeQVlwqk8xWJaV+Ay0BEnV9NU1utfxeqJOkahArJSkJHrda3X0T1CvA3WElEKgIUKswqOi3gYDy8AYIPlGnVcVbmdRMtHjknnDOL/CIEiBSJl0J6oIgILDHTVodOi1jiJ/RqpckVBJTqK90nHLoKQ177zyg1OqHRDQWi/ZOSFJHDFs04vGCx0PRK4oUPvyCTephN8jFC5F2qSXhFwnz+KlLENmzvdFoAjxcLf6w309RCPhQiGi1UUSXwLf3lFN4BZTAbUJ9PODx/TWSFOJ70E8vbGpybkicguYOtmG3x64WA/xNbQh6uL7Yo5tIy2gL4kN8e+tqIS/MV/1DiuUgtmVleTmgDJZDiUC7kCcInRYK1dTdOQnRgZbKpkhnvJo2O0Q746PorDgy0NHSEIr3AiTjnVVSezw+ArHOzsa2eKilIVXdRAQbOzvHwMtpeSDRnWpo6ZgII8Wm7niLJA10x1lCpckdkU+slOVHU2SgmRtMtQQIXpFCYQy2sqawJFV6KV6uEwTBZn1XdIVhFLcGbY9mwIcmdKAyhlLYQl6E8BV9yEQQetv1az01CSVw46FSYZBSlt+9u9kDpaWGgW5aLVJlg1TV1UW0Ohita4xWHXb2xetayqQGoTGUQuKpUA3SKsMo64sP4GbpQL9stCCJq2upi9filqqFRG0KiXU0p4yUSUbquZSkuvW3j38GUXCkUadaVVJoLBiBRodabQ2SFEYFYl2SNAJ6bIlES+roRZMay8qQkIMWUg9h/MMIPjMCXjBiSz8ZS+GGaaBy68PP7/+CzziSu5OW1JAAwXsKrVHaDOHr12J2WlXEVqQ8I4U8Fq1WGENBowzqlNBuj5MWqTWu70Y08NP7f7z/q/vYc9GahDZBdNGCCVxz8+RYguUiGy2pUvTT7ozhJojYaVVL6B2ywD2DAZkANy2AQebhcgVJ9fPHT3/vxzx6Bi3KOW61INbAAz41GcSZbLRqKRH4mZxJ6LNo4Rvj4CWoCfdg1EULPSznUgWUDx8/fVi+detdj6tGddIqi4AAblq42+P1/JSqT9hNlAaAlQtiA3Fx0uoG0YBO0MLPVlbTBJThoXe33iG95TuuWrAoLdGkRav2RBrj9ehln4MWHaIIBpkkNloYUXWklkDJoSrmpuVjHlZUKJis7geQVIVy0+XiKbQ8FLINoh+DbJSgxLXrjR6KSQzthjZGK8Fptffi5CK0StRji60RzAeigEcTLbChidG6Dm1g8xClomTFUlgAGbpcPJVWTKIrNAjTZT2FLUY0Zu6kQasroSeIGnbKDFCU2RNEbxftXTwP20JMN4da6OFtLCOU4buY8PHmwR12TP9XWhioGBG1kWCkD2cOsalSyWAi2kzRxJJ2dWsrSxBSTSQYo43aCPYKgkqTsupEEEdUtdMJUIsjW8PmxwVWN8p4qY+dNpjdf8BAu/fA4SIG0AlaXujGmdoxq3cQLcr1UlXLFWTRFQVBqMdSiB8+XV1SGT5FISfaaQliLXLuaqFzaoSO205WQRms7gaUe5eghJXQ7CwqH1SUyw65TlMLN1Ad23idjXwnNvIMIVHh6YFwi3EmpsY4UCP6HWeiF9ri/CDsCLPqL5GyzkTycKjfPJjZWTQ1rjxyuQi9yWSMFdzRaFQEVtQJEB2NVychyCAPtI2Ndndfj9HeIo+TjWMRohWCpnB1fDTGIiySTCZAiCWTWBgh+URjd/dkq8gqVXx3LByOGvtw+D5JZBzMPlaF9TzsL15rm8Woh9GjYokqKf4x42c1op/feTktgRWz7o8dKhzZ8lgl5ueFmZniHxiVlZX1keXdfudZrX9J+W0fU3SNJ5qHunQIb70GO78Hv2R0Wl56jleytg8yujUQMIZ4rArC9dWFt6Vf55tfV+vzP3l9FPQ+34le4avw+mJa/9+GgR+NRs4drS/704jjjyMn2ldB6fvk88bC7+1zGtbwP/144fT24089cPkM9BJ894XohQt34fszUCiBS9MXp09v30x/Bz9M/6EIenH6MvwRnymGfgvfF0Wnp8vhT0XfPD3NaH1z8fTGaRVHGa2iKKNVBM3niVYx9OJFl1oy+1dMLSfqVsuNutWyoyfVcqJuE+W0DXfRkp2oixb2p+WiJsqyA3XROoG6aOUzRyuZ4mppb7XiamVWjhbyxWjls0u7M/apHbTSi1uHs3bURSuz8mJ7Jl2EVjq7tL5hzeyilZ7ZfvE0U4yWNnvwRi5moqwVjl5Z056glZ55rr6dNRVx0pK12UP1YFY7nRaib9VfrXefoHWsbmbTRdTKZ1+pazapXbS0mWP1WdGQT2f31L3FdNHYeqYe20k7Y2vljXo0awsBO638wsa6emhHOS2MONbklSdqbn5BYzfTsk5LR7UMDl7fyBioTstAs1uq+mRFTpsoo2WgaAMumIN52aBlooequpfVLFRXS17MYlvYf66uqkf7GbqZkU215BmOHqrr6sH+go4aanE0s3+EY7c5uiibamX0sceIzhcIXczSzuNq6WhhT51bX5u1UF0tbWtzaX5+c+MxDn6GV9i2V0y1tC3Ws/ES0ZcbeLU0v/XUVGtlm6FLzxB9vLGJV5tbaUOtjI5uPkF0h6ObplqZtW2abGl7HdFdhm7N29U6XFdzc3Oq/kP/7WiyqdZRTs2pFppTV3dNtWRtxxzDfnLq+kEmb5i4csx751SV/ebUF88puLmJa3s4rY5w9M12Jm+FfIEWy15Or1hVn/xasJlY2HptoiqirzcLNhMLz1GKOU5NzZHchbxhYj4ze7Cuo/iby6kv1zBD6SbmF2Z2VzmqcvSXpzNpy0RZy2Z2VD6Y0L0V3FNWyGsz2mOO/pPQY7y3hbw2u7Kn6rSQ/E4mq8lWyGuFjVfcCUJzR4sLmhXy+XRh8zUXipa7fjib0Wwm0rFCi55j6OruDEPNBCFrMi2ao+sHszKhZoKQtYVFXDRHSea0bCUIWvHCztwcR99sFdI8m/OQR9aL6WNVR1FmvhGtvIUP7P+LVjXHUDbWyltyXtvfJbVz6qu1WY2NtfKWnNb2d7gXe09JSEfewrSw/5ijx/Kiph+qRt7CFRZe8nl3FrIGaqVTWZv5t7qam1vdebqh8XPCnk7T2V/U1dW59SMTtafTdOY/zVcBjoIwEPxp07Tpnq1iMVpFOc+7KAJB0fji2wKFUnyAMSEkk8bp7s7MUtipyq7pLiI0tFOa3ix6qNMdndopmMyi1XFt6BuXp9zO9fz3dZutljygFdnDODjFPcu6MPdoYVrO5vjL79uqu69HC9MS78s2ZcmKPmF6WkLVthrbpGSJ4hNaXB+tLa2s753aIPBoNYdZufrD56VNPq+JQmGH2WtV4PNb8zEtRLHD7Glne4j6nhaXJcroejzYkICQVnv4udTynLnkG9FKUCday9PWJt94tjDUcpbVUi+fGxf1XrUoqVAJSpIXG5KvpwUYeNVeybRk7sKj2SK3wzEmgqOFzdo4H2hFsM6qRcwR3d+6/WWghT1kxU4JQeLH9heCJnL5jYYjBaq5nufujztaWI1LYzgCMBgTR7qnxeWjUxEK+n5qVoGBFlfnBBqdCMnLupkBj5Y6vawdWXSdtwubR0v9PK0doZrRwhbdduOqxfX9GqMcUa/xPnddHKoFBlqjo5x+mVCJ1CyhMQ0qAEyoRGo07dAvaiCYrcjIZiemVGhhgAQGYWRjVvZO6ZqGs0XA7dPovUAC3yIQRQ4lQALfIsA7ASI7IOFsTdGhiWOUTn2L9F8P7tWv1hT1q/UO9dfAEPWqNYDe+yd/vn4erX+Hn/26AywvvQAAAABJRU5ErkJggg==",alt:"Trustpilot review",loading:"lazy",width:"100"})})})]}),d?Object(n.jsx)("div",{className:"script-postcode",id:"script-postcode",children:Object(n.jsx)(r.a,{step:1})}):null]})}),Object(n.jsx)("section",{className:"postcode-panel-section",children:Object(n.jsxs)("div",{className:"postcode-panel-container",children:[Object(n.jsxs)("div",{className:"postcode-panel-content",children:[Object(n.jsx)("h1",{children:"Our Panel"}),Object(n.jsxs)("div",{className:"postcode-panel-images-content",children:[Object(n.jsxs)("div",{className:"postcode-panel-images",children:[Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/ovo-energy-logo-square.png",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/scottish-power-logo-square-300x300.jpg",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/edf-energy-logo-square-300x300.jpeg",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{className:"d-none",src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png",alt:"",loading:"lazy",width:"120"})]}),Object(n.jsxs)("div",{className:"postcode-panel-images",children:[Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/ovo-energy-logo-square.png",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/scottish-power-logo-square-300x300.jpg",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/edf-energy-logo-square-300x300.jpeg",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png",alt:"",loading:"lazy",width:"120"}),Object(n.jsx)("img",{className:"d-none",src:"https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png",alt:"",loading:"lazy",width:"120"})]})]})]}),Object(n.jsxs)("div",{className:"postcode-information",children:[Object(n.jsx)("h2",{children:"Disclaimer"}),Object(n.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"})]})]})})]})}},84:function(e,t,i){"use strict";i(85);var s=i(6);t.a=function(e){var t=e.message;return Object(s.jsx)("div",{"data-cy":"error",className:"error-container",id:"error",children:Object(s.jsx)("div",{className:"error-message",children:Object(s.jsx)("p",{className:"error-text",children:t})})})}},85:function(e,t,i){},87:function(e,t,i){"use strict";var s=i(27),a=i(2),c=(i(88),i(0)),o=i(86),r=i(6);t.a=function(e){var t,i=e.step,l=e.use,n=e.avgElec,d=e.avgGas,u=Object(a.useState)(""),m=Object(s.a)(u,2),p=m[0],b=m[1];return Object(a.useEffect)((function(){var e=document.getElementById("script-content").offsetHeight;b(e),document.getElementById("script-container").parentElement.style.maxHeight="".concat(e,"px")}),[p]),1===i&&(t=Object(r.jsx)("div",{children:Object(r.jsxs)("ol",{children:[Object(r.jsx)("li",{children:"Can you confirm your postcode to start with?"}),Object(r.jsxs)("li",{children:["We save our customers ",Object(r.jsx)("strong",{children:"over \xa3100"})," per year on ",Object(r.jsx)("strong",{children:"average 41%"})," of households (10m) are on ",Object(r.jsx)("strong",{children:"Standard Variable Tariff"})," (the worst tariff available)."]})]})})),2===i&&(t=Object(r.jsx)("div",{children:Object(r.jsx)("ol",{children:Object(r.jsxs)("li",{children:["Can you confirm your door number? ",Object(r.jsx)("strong",{children:"("}),"Reconfirm full first line of address with customer",Object(r.jsx)("strong",{children:")"}),"."]})})})),3===i&&(t=Object(r.jsx)("div",{children:Object(r.jsx)("ol",{children:Object(r.jsx)("li",{children:"Do you have both gas and electricity at the property, or only electric?"})})})),4===i&&(t=Object(r.jsx)("div",{children:Object(r.jsxs)("ol",{children:[Object(r.jsx)("li",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("li",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiisblanditiis  adipisicing  adipisicing  adipisicing  adipisicing"})]})})),5===i&&(t=Object(r.jsx)("div",{children:Object(r.jsxs)("ol",{children:[Object(r.jsx)("li",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("li",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"})]})})),6===i&&(t=Object(r.jsx)("div",{children:Object(r.jsx)("ol",{children:Object(r.jsx)("li",{children:"Do you have an Economy 7 meter?"})})})),7===i&&(t=Object(r.jsx)("div",{children:Object(r.jsxs)("ol",{children:["kwh"===l?Object(r.jsx)("li",{children:"Do you know how many KWH of electricity you use each year/month?"}):null,"gbp_es"===l?Object(r.jsx)("li",{children:"Do you know how much you pay each month for your electricity?"}):null,"gas"===l?Object(r.jsx)("li",{children:"Do you know how many KWH of gas you use each year/month?"}):null,"gbp_gs"===l?Object(r.jsx)("li",{children:"Do you know how much you pay each month for your gas?"}):null,"avg"===l?Object(r.jsxs)("li",{children:["Okay we will have to base your ",n&&!d?"electricity":null," ",d&&!n?"gas":null," ",n&&d?"electricity and gas":null," quote on your property profile\u2026"]}):null]})})),8===i&&(t=Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"EXISTING DEBT Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"})]})),9===i&&(t=Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"Compare Section Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"}),Object(r.jsx)("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!"})]})),Object(r.jsx)("div",{className:"script-container",id:"script-container",style:{maxHeight:p},children:Object(r.jsxs)("div",{className:"script-content",id:"script-content",children:[Object(r.jsxs)("div",{className:"script-header",children:[Object(r.jsx)("h3",{children:"My script"}),Object(r.jsx)(c.b.Provider,{value:{color:"#D338AE",size:"50px"},children:Object(r.jsx)(o.a,{})})]}),Object(r.jsx)(r.Fragment,{children:t})]})})}},88:function(e,t,i){}}]);
//# sourceMappingURL=17.5df33d48.chunk.js.map