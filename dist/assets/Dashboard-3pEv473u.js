import{e as B,i as R,j as e,u as H,b as i,B as t,r as u}from"./index-DhLjg7ZU.js";import{f as g}from"./formatDate-C7W8eSx1.js";import{p as E}from"./PaymentUsingRazorpay-CYOLMId5.js";var A={},G=R;Object.defineProperty(A,"__esModule",{value:!0});var D=A.default=void 0,U=G(B()),V=e;D=A.default=(0,U.default)((0,V.jsx)("path",{d:"M5 18h14v2H5zm4.6-2.7L5 10.7l2-1.9 2.6 2.6L17 4l2 2z"}),"FileDownloadDone");var I={},X=R;Object.defineProperty(I,"__esModule",{value:!0});var x=I.default=void 0,$=X(B()),J=e;x=I.default=(0,$.default)((0,J.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add");var P={},z=R;Object.defineProperty(P,"__esModule",{value:!0});var T=P.default=void 0,W=z(B()),Y=e;T=P.default=(0,W.default)((0,Y.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"}),"KeyboardArrowDown");const K="/assets/Investment-icon-by-back1design1-3%20(1)-DhuJfvqF.svg",L=()=>{const{dispatch:l}=H();return{paymentVerify:async j=>{try{l("loading",!0);const o=await i.post("/api/v1/payment/verification",j,{withCredentials:!0});console.log({res:o}),o.data.success&&(t.success("Payment Verification successful",{position:"bottom-center"}),l("successResponseData",JSON.stringify(o.data))),o.data.error&&t.error(o.data.error,{position:"bottom-center"})}catch(o){console.log(o),i.isAxiosError(o)?t.error(o.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}return l("loading",!1),{success:!1}}}},ne=()=>{const{dispatch:l,store:{MyDetails:a,successResponseData:j}}=H(),{paymentVerify:o}=L(),[d,c]=u.useState({topUp:"10",withDraw:"10",rechargePlan:"",rechargeNumber:"",golden:0,diamond:0,mrHistoryToggle:!1,transactionMethod:"none",plansByOperator:[]}),[r,k]=u.useState({goldenFunds:[],diamondFunds:[]}),[m,C]=u.useState({jio:[],airtel:[],vi:[],bsnl:[],mtnlDelhi:[],mtnlMumbai:[]}),h=n=>{let{name:s,value:p}=n.target;c({...d,[s]:p})},O=async()=>{try{l("loading",!0);const s=(await i.post("/api/v1/top-up",{amount:+d.topUp},{withCredentials:!0})).data;console.log({data:s});const{success:p,key:N,name:b,email:y,contact:F,order:w}=s;p?E({name:b,email:y,contact:F,order:w,key:N,callBackFunction:o}):(console.log({data:s}),t.error(s.error,{position:"bottom-center"}))}catch(n){console.log(n),i.isAxiosError(n)?t.error(n.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)},_=async()=>{try{l("loading",!0);const s=(await i.post("/api/v1/withdraw",{amount:+d.withDraw,transactionMethod:d.transactionMethod},{withCredentials:!0})).data;console.log({data:s}),s.success&&t.success("Withdrawal request sent",{position:"bottom-center"}),s.requestBalancePin&&(t.warning("Please Enter your Balance PIN"),l("balancePinModel",!0),l("balancePinFormData",JSON.stringify(s))),s.error&&t.error(s.error,{position:"bottom-center"})}catch(n){console.log(n),i.isAxiosError(n)?t.error(n.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)},M=async()=>{try{l("loading",!0);const s=(await i.post("/api/v1/recharge",{contact:d.rechargeNumber,rechargePlan:d.rechargePlan},{withCredentials:!0})).data;console.log({data:s}),s.success&&t.success("Recharge request sent",{position:"bottom-center"}),s.requestBalancePin&&(t.warning("Please Enter your Balance PIN"),l("balancePinModel",!0),l("balancePinFormData",JSON.stringify(s))),s.error&&t.error(s.error,{position:"bottom-center"})}catch(n){console.log(n),i.isAxiosError(n)?t.error(n.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)},q=async n=>{try{l("loading",!0);const s=await i.post("/api/v1/invest",{golden:+d.golden,diamond:+d.diamond,from:n},{withCredentials:!0});console.log({res:s}),s.data.requestBalancePin&&(t.warning("Please Enter your Balance PIN"),l("balancePinModel",!0),l("balancePinFormData",JSON.stringify(s.data))),s.data.error&&t.error(s.data.error,{position:"bottom-center"})}catch(s){console.log(s),i.isAxiosError(s)?t.error(s.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)};u.useEffect(()=>{if(j&&a){try{const n=JSON.parse(j);console.log({objData:n}),n.type==="invested-using-balance"&&(l("MyDetails",{...a,canBuyDiamond:n.canBuyDiamond,canBuyGolden:n.canBuyGolden,Balance:n.Balance}),t.success(" Purchased funds successfully"),v()),n.type==="invested-from-account"&&(l("MyDetails",{...a,canBuyDiamond:n.canBuyDiamond,canBuyGolden:n.canBuyGolden}),t.success(" Purchased funds successfully"),v()),n.type==="top-up"&&n.Balance&&l("MyDetails",{...a,Balance:n.Balance}),n.type==="sent-withdrawal-request"&&t.success("Withdrawal request sent successfully",{position:"bottom-center"}),n.type==="sent-recharge-request"&&t.success("Recharge request sent successfully",{position:"bottom-center"})}catch(n){console.log(n)}l("successResponseData",void 0)}},[j]);const S=async n=>{try{l("loading",!0);const{data:s}=await i.post("/api/v1/invest",{golden:+d.golden,diamond:+d.diamond,from:n},{withCredentials:!0});console.log({data:s});const{success:p,key:N,name:b,email:y,contact:F,order:w}=s;p&&await E({key:N,name:b,email:y,contact:F,order:w,callBackFunction:o}),s.error&&t.error(s.error,{position:"bottom-center"})}catch(s){console.log(s),i.isAxiosError(s)?t.error(s.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)},v=async()=>{try{l("loading",!0);const{data:n}=await i.get("/api/v1/dashboard",{withCredentials:!0});console.log("dashboard data",{data:n}),n.success&&(k(()=>({goldenFunds:n.goldenFunds,diamondFunds:n.diamondFunds})),C(()=>n.RechargePlans)),n.error&&t.error(n.error,{position:"bottom-center"})}catch(n){console.log(n),i.isAxiosError(n)?t.error(n.message,{position:"bottom-center"}):t.error("An unexpected error occurred",{position:"bottom-center"})}l("loading",!1)},f=n=>n==="jio"?m.jio||[]:n==="airtel"?m.airtel||[]:n==="bsnl"?m.bsnl||[]:n==="mtnl delhi"?m.mtnlDelhi||[]:n==="mtnl mumbai"?m.mtnlMumbai||[]:n==="vi"?m.vi||[]:[];return u.useEffect(()=>{if(d.rechargeNumber===(a==null?void 0:a.rechargeNum1.number)){const n=f(a.rechargeNum1.operator);c(s=>({...s,plansByOperator:n}))}if(d.rechargeNumber===(a==null?void 0:a.rechargeNum2.number)){const n=f(a.rechargeNum2.operator);c(s=>({...s,plansByOperator:n}))}if(d.rechargeNumber===(a==null?void 0:a.rechargeNum3.number)){const n=f(a.rechargeNum3.operator);c(s=>({...s,plansByOperator:n}))}d.rechargeNumber===""&&c(n=>({...n,plansByOperator:[]}))},[d.rechargeNumber]),u.useEffect(()=>{},[r]),u.useEffect(()=>{v()},[]),a?e.jsxs("div",{className:"dashboard",children:[e.jsxs("h1",{children:[" ",e.jsxs("span",{children:["Welcome ",a.name]})," "]}),e.jsxs("div",{className:"front",children:[e.jsxs("div",{className:"balance",children:[" Balance: ₹",a.Balance.toFixed(2)]}),e.jsxs("div",{className:"date",children:["Registration Date: ",g(a==null?void 0:a.createdAt)]})]}),e.jsxs("div",{className:"diamond-bg",children:[e.jsx("h3",{children:" 💎 Diamond Funds 💎"}),e.jsxs("div",{className:"wtb responsive",children:[r.diamondFunds.map(n=>e.jsxs("div",{className:"fund",children:[e.jsxs("div",{className:"return",children:[e.jsx(D,{className:"i"}),e.jsxs("span",{children:[" ₹",n.fund,".00"]}),e.jsxs("span",{className:"diamond-id",children:["Diamond ID: ",n.id]})]}),e.jsxs("div",{className:"date",children:[e.jsx("span",{children:"Buy At: "}),e.jsx("span",{children:g(n.buyTime)})]}),e.jsxs("div",{className:"percent",children:[e.jsxs("div",{className:"info",children:[e.jsxs("span",{className:"oma",children:[" ",n.fund]}),e.jsx("span",{className:"perti",children:(n.fund/2e3*100).toFixed(2)+"%"}),e.jsx("span",{className:"out_of",children:"2000 "})]}),e.jsx("div",{className:"level-bg",children:e.jsx("div",{style:{width:n.fund/2e3*100+"%"},className:"level"})})]}),e.jsxs("div",{className:d.mrHistoryToggle?"return-history expend":"return-history",children:[e.jsxs("div",{className:"toggle",children:[e.jsx("label",{htmlFor:"m-r-history-toggle",children:"Money Return History"}),e.jsx("input",{onChange:()=>c(s=>({...s,mrHistoryToggle:!d.mrHistoryToggle})),checked:d.mrHistoryToggle,id:"m-r-history-toggle",type:"checkbox",hidden:!0}),e.jsx(T,{className:d.mrHistoryToggle?"ir":"i"})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"ID"})]})}),e.jsx("tbody",{children:n.funding.map(s=>e.jsxs("tr",{className:s.upcoming?"upcoming":"",children:[e.jsx("td",{children:s.amount}),e.jsx("td",{children:g(s.date)}),e.jsx("td",{children:s.id})]}))})]}),e.jsxs("p",{children:["Money Expend History: ",n.expendHistory.level1.fund,"->ID:",n.expendHistory.level1.id,","," ",n.expendHistory.level2.fund,"->ID:",n.expendHistory.level2.id,", ",n.expendHistory.referral,"->Referral,",n.expendHistory.service,"->service"," "]})]}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]})),e.jsxs("div",{className:"fund total diamond",children:[e.jsx("h3",{children:"Total Diamond Funds"}),e.jsxs("div",{children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Diamond"}),e.jsx("th",{children:"X"}),e.jsx("th",{children:"Value"}),e.jsx("th",{children:"EQ"}),e.jsx("th",{children:"Total"}),e.jsx("th",{children:"Describe"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:r.diamondFunds.length}),e.jsx("td",{children:"X"}),e.jsx("td",{children:"1000"}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.diamondFunds.length*1e3}),e.jsx("td",{children:"Invested"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:r.diamondFunds.length}),e.jsx("td",{children:"X"}),e.jsx("td",{children:"2000"}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.diamondFunds.length*2e3}),e.jsx("td",{children:"Incoming"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total"}),e.jsx("td",{children:"count"}),e.jsx("td",{children:"of"}),e.jsx("td",{children:" returned "}),e.jsx("td",{children:r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)}),e.jsx("td",{children:"Returned"})]})]})]}),e.jsxs("div",{className:"percent",children:[e.jsxs("div",{className:"info",children:[e.jsxs("span",{className:"oma",children:[" ",r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)]}),e.jsxs("span",{className:"perti",children:[(r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)/(r.diamondFunds.length*2e3)*100).toFixed(2),"%"]}),e.jsxs("span",{className:"out_of",children:[r.diamondFunds.length*2e3," "]})]}),e.jsx("div",{className:"level-bg",children:e.jsx("div",{style:{width:r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)/(r.diamondFunds.length*2e3)*100+"%"},className:"level"})})]})]}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]}),e.jsxs("a",{href:"#add-fund",className:"fund-add",children:[e.jsxs("p",{children:[e.jsx("span",{children:a.canBuyDiamond.length})," Add New Diamond Fund"]}),e.jsx("div",{children:e.jsx(x,{className:"i"})}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]})]})]}),e.jsxs("div",{className:"golden-bg",children:[e.jsx("h3",{children:" 🥇 Golden Funds 🥇 "}),e.jsxs("div",{className:"wtb responsive",children:[r.goldenFunds.map(n=>e.jsxs("div",{className:"fund",children:[e.jsxs("div",{className:"return",children:[e.jsx(D,{className:"i"}),e.jsxs("span",{children:[" ₹",n.fund,".00"]}),e.jsxs("span",{className:"diamond-id",children:["Golden ID: ",n.id]})]}),e.jsxs("div",{className:"date",children:[e.jsx("span",{children:"Buy At: "}),e.jsx("span",{children:g(n.buyTime)})]}),e.jsxs("div",{className:"percent",children:[e.jsxs("div",{className:"info",children:[e.jsxs("span",{className:"oma",children:[" ",n.fund]}),e.jsxs("span",{className:"perti",children:[(n.fund/1e3*100).toFixed(2),"%"]}),e.jsx("span",{className:"out_of",children:"1000 "})]}),e.jsx("div",{className:"level-bg",children:e.jsx("div",{style:{width:n.fund/1e3*100+"%"},className:"level"})})]}),e.jsxs("div",{className:d.mrHistoryToggle?"return-history expend":"return-history",children:[e.jsxs("div",{className:"toggle",children:[e.jsx("label",{htmlFor:"m-r-history-toggle",children:"Money Return History"}),e.jsx("input",{onChange:()=>c(s=>({...s,mrHistoryToggle:!d.mrHistoryToggle})),checked:d.mrHistoryToggle,id:"m-r-history-toggle",type:"checkbox",hidden:!0}),e.jsx(T,{className:d.mrHistoryToggle?"ir":"i"})]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"ID"})]})}),e.jsx("tbody",{children:n.funding.map(s=>e.jsxs("tr",{className:s.upcoming?"upcoming":"",children:[e.jsx("td",{children:s.amount}),e.jsx("td",{children:g(s.date)}),e.jsx("td",{children:s.id})]}))})]}),e.jsxs("p",{children:["Money Expend History: ",n.expendHistory.level1.fund,"->ID:",n.expendHistory.level1.id,","," ",n.expendHistory.level2.fund,"->ID:",n.expendHistory.level2.id,", ",n.expendHistory.referral,"->Referral,",n.expendHistory.service,"->service"," "]})]}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]})),e.jsxs("div",{className:"fund total golden",children:[e.jsx("h3",{children:"Total Diamond Funds"}),e.jsxs("div",{children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Diamond"}),e.jsx("th",{children:"X"}),e.jsx("th",{children:"Value"}),e.jsx("th",{children:"EQ"}),e.jsx("th",{children:"Total"}),e.jsx("th",{children:"Describe"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:r.goldenFunds.length}),e.jsx("td",{children:"X"}),e.jsx("td",{children:"500"}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.goldenFunds.length*500}),e.jsx("td",{children:"Invested"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:r.goldenFunds.length}),e.jsx("td",{children:"X"}),e.jsx("td",{children:"1000"}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.goldenFunds.length*1e3}),e.jsx("td",{children:"Incoming"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total"}),e.jsx("td",{children:"count"}),e.jsx("td",{children:"of"}),e.jsx("td",{children:" returned "}),e.jsx("td",{children:r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)}),e.jsx("td",{children:"Returned"})]})]})]}),e.jsxs("div",{className:"percent",children:[e.jsxs("div",{className:"info",children:[e.jsxs("span",{className:"oma",children:[" ",r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)]}),e.jsxs("span",{className:"perti",children:[(r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)/(r.goldenFunds.length*1e3)*100).toFixed(2),"%"]}),e.jsxs("span",{className:"out_of",children:[r.goldenFunds.length*1e3," "]})]}),e.jsx("div",{className:"level-bg",children:e.jsx("div",{style:{width:r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)/(r.goldenFunds.length*1e3)*100+"%"},className:"level"})})]})]}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]}),e.jsxs("a",{href:"#add-fund",className:"fund-add",children:[e.jsxs("p",{children:[e.jsx("span",{children:a.canBuyGolden.length})," Add New Golden Fund"]}),e.jsx("div",{children:e.jsx(x,{className:"i"})}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]})]})]}),e.jsxs("div",{className:"fund total golden diamond",children:[e.jsx("h3",{children:" 💎 Total Diamond & Golden Funds 🥇 "}),e.jsxs("div",{children:[e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Golden"}),e.jsx("th",{children:e.jsx(x,{})}),e.jsx("th",{children:"Diamond"}),e.jsx("th",{children:"EQ"}),e.jsx("th",{children:"Total"}),e.jsx("th",{children:"Describe"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:r.goldenFunds.length*500}),e.jsx("td",{children:e.jsx(x,{})}),e.jsx("td",{children:r.diamondFunds.length*1e3}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.goldenFunds.length*500+r.diamondFunds.length*1e3}),e.jsx("td",{children:"Invested"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:r.goldenFunds.length*500*2}),e.jsx("td",{children:e.jsx(x,{})}),e.jsx("td",{children:r.diamondFunds.length*1e3*2}),e.jsx("td",{children:"="}),e.jsx("td",{children:r.goldenFunds.length*500*2+r.diamondFunds.length*1e3*2}),e.jsx("td",{children:"Incoming"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total"}),e.jsx("td",{children:"count"}),e.jsx("td",{children:"of both"}),e.jsx("td",{children:" returned "}),e.jsx("td",{children:r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)+r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)}),e.jsx("td",{children:"Returned"})]})]})]}),e.jsxs("div",{className:"percent",children:[e.jsxs("div",{className:"info",children:[e.jsxs("span",{className:"oma",children:[" ",r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)+r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)]}),e.jsxs("span",{className:"perti",children:[((r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)+r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0))/(r.goldenFunds.length*500*2+r.diamondFunds.length*1e3*2)*100).toFixed(2),"%"]}),e.jsxs("span",{className:"out_of",children:[" ",r.goldenFunds.length*500*2+r.diamondFunds.length*1e3*2," "]})]}),e.jsx("div",{className:"level-bg",children:e.jsx("div",{style:{width:(r.goldenFunds.map(n=>n.fund).reduce((n,s)=>n+s,0)+r.diamondFunds.map(n=>n.fund).reduce((n,s)=>n+s,0))/(r.goldenFunds.length*500*2+r.diamondFunds.length*1e3*2)*100+"%"},className:"level"})})]}),e.jsxs("p",{className:"note",children:[e.jsx("span",{children:"NOTE: "}),"Total Return Amount will take av. 3 months."]})]})]}),e.jsxs("div",{id:"add-fund",className:"choose-fund",children:[e.jsx("h2",{children:"Choose Funds"}),e.jsxs("div",{className:"notes",children:[e.jsxs("div",{className:"diamond note",children:[e.jsx("label",{htmlFor:"diamond",children:"Diamond : "}),e.jsxs("select",{name:"diamond",id:"diamond",value:d.diamond,onChange:h,children:[e.jsx("option",{value:"0",children:"0"}),a.canBuyDiamond.map((n,s)=>e.jsx("option",{value:n,children:n+" X"},s))]}),e.jsxs("p",{children:["Invest: ",d.diamond*1e3,"; Return:"," ",d.diamond*2e3," in under 3 months"]})]}),e.jsxs("div",{className:"golden note",children:[e.jsx("label",{htmlFor:"golden",children:"Golden : "}),e.jsxs("select",{name:"golden",id:"golden",value:d.golden,onChange:h,children:[e.jsx("option",{value:"0",children:"0"}),a.canBuyGolden.map((n,s)=>e.jsx("option",{value:n,children:n+" X"},s))]}),e.jsxs("p",{children:["Invest: ",d.golden*500,"; Return:"," ",d.golden*1e3," in under 3 months"]})]})]}),e.jsxs("p",{children:["Total Invest: ",d.diamond*1e3+d.golden*500," ","Return: ",d.golden*1e3+d.diamond*2e3," in under 3 months"]}),e.jsxs("div",{className:"btn",children:[e.jsxs("div",{className:"total-amount",children:[e.jsx("img",{src:K,alt:"icon"}),"Investable Amount"," ",d.diamond*1e3+d.golden*500]}),e.jsx("button",{onClick:()=>q("balance"),children:"Invest From Balance"}),e.jsx("button",{onClick:()=>S("account"),children:"Invest From Account"})]})]}),e.jsxs("div",{className:"responsive",children:[e.jsxs("div",{className:"border-label",children:[e.jsx("span",{children:"Primary Phone Number"}),e.jsx("p",{children:"6205085598"})]}),e.jsxs("div",{className:"border-label",children:[e.jsx("span",{children:"Primary Email ID"}),e.jsx("p",{children:"krabi6563@gmail.com"})]})]}),e.jsxs("div",{className:"responsive",children:[e.jsxs("div",{className:"border-label",children:[e.jsx("span",{children:"Top Up From Bank"}),e.jsx("input",{type:"number",placeholder:"Amount...",onChange:h,name:"topUp",id:"",value:d.topUp}),e.jsx("br",{}),e.jsx("button",{onClick:O,children:"TopUp"})]}),e.jsxs("div",{className:"border-label",children:[e.jsx("span",{children:"Withdraw on Bank"}),e.jsxs("div",{className:"d-f",children:[e.jsx("input",{type:"number",placeholder:"Amount...",onChange:h,name:"withDraw",id:"",value:d.withDraw}),e.jsxs("select",{name:"transactionMethod",id:"",value:d.transactionMethod,onChange:h,children:[e.jsx("option",{value:"none",children:"NONE"}),a.transactionMethod==="both"?e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"both",children:"TRY IN BOTH"}),e.jsx("option",{value:"upi",children:"TRY IN UPI"}),e.jsx("option",{value:"bank",children:"TRY IN BANK"})]}):"",a.transactionMethod==="bank"?e.jsx(e.Fragment,{children:e.jsx("option",{value:"bank",children:"TRY IN BANK"})}):"",a.transactionMethod==="upi"?e.jsx(e.Fragment,{children:e.jsx("option",{value:"upi",children:"TRY IN UPI"})}):""]})]}),e.jsx("br",{}),e.jsx("button",{onClick:_,children:"Withdraw"})]}),e.jsxs("div",{className:"border-label",children:[e.jsx("span",{children:"Recharge Now"}),e.jsxs("div",{className:"d-f",children:[e.jsxs("select",{onChange:h,value:d.rechargeNumber,name:"rechargeNumber",id:"rechargeNumber",children:[e.jsx("option",{value:"",children:"select contact"}),a.rechargeNum1.number?e.jsx(e.Fragment,{children:e.jsx("option",{value:a.rechargeNum1.number,children:a.rechargeNum1.number})}):"",a.rechargeNum2.number?e.jsx(e.Fragment,{children:e.jsx("option",{value:a.rechargeNum2.number,children:a.rechargeNum2.number})}):"",a.rechargeNum3.number?e.jsx(e.Fragment,{children:e.jsx("option",{value:a.rechargeNum3.number,children:a.rechargeNum3.number})}):""]}),e.jsxs("select",{value:d.rechargePlan,name:"rechargePlan",onChange:h,id:"",children:[e.jsx("option",{value:"",children:"Select a Plan"}),d.plansByOperator.map(n=>e.jsxs("option",{value:JSON.stringify(n),children:["Price ",n.price," Data ",n.data," Validity ",n.validity]}))]})]}),e.jsx("button",{onClick:M,children:"Recharge Now"})]})]})]}):""};export{ne as default};
