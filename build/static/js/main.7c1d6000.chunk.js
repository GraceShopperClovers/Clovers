(this.webpackJsonpclovers=this.webpackJsonpclovers||[]).push([[0],{60:function(e,t,r){"use strict";r.r(t);var n=r(1),c=r(29),a=r.n(c),s=r(12),o=r(2),i=r.n(o),u=r(6),l=r(7),j=r(3),d=r(0);var p=Object(j.g)((function(e){e.user;var t=e.setUser,r=e.history,n=localStorage.getItem("useremail");return Object(d.jsxs)("div",{className:"header",children:[Object(d.jsx)("span",{children:"B"}),Object(d.jsx)("span",{children:"E"}),Object(d.jsx)("span",{children:"A"}),Object(d.jsx)("span",{children:"N"}),Object(d.jsx)("span",{children:"I"}),Object(d.jsx)("span",{children:"E"}),Object(d.jsx)("span",{children:" "}),Object(d.jsx)("span",{children:"B"}),Object(d.jsx)("span",{children:"A"}),Object(d.jsx)("span",{children:"B"}),Object(d.jsx)("span",{children:"I"}),Object(d.jsx)("span",{children:"E"}),Object(d.jsx)("span",{children:"S"}),Object(d.jsx)("span",{children:" "}),Object(d.jsx)("span",{children:"E"}),Object(d.jsx)("span",{children:"M"}),Object(d.jsx)("span",{children:"P"}),Object(d.jsx)("span",{children:"O"}),Object(d.jsx)("span",{children:"R"}),Object(d.jsx)("span",{children:"I"}),Object(d.jsx)("span",{children:"U"}),Object(d.jsx)("span",{children:"M"}),Object(d.jsx)("nav",{children:n?Object(d.jsxs)("div",{className:"links",children:[Object(d.jsx)(s.b,{to:"/Home",children:"Home"}),Object(d.jsx)(s.b,{to:"/cart",children:"Cart"}),Object(d.jsx)("a",{href:"#",onClick:function(){localStorage.removeItem("token"),localStorage.removeItem("ordernum"),localStorage.removeItem("useremail"),t({}),r.push("/"),alert("Logout Successful!!!")},children:"Logout"})]}):Object(d.jsxs)("div",{children:[Object(d.jsx)(s.b,{to:"/",children:"Home"}),Object(d.jsx)(s.b,{to:"/cart",children:"Cart"}),Object(d.jsx)(s.b,{to:"/login",children:"Login"}),Object(d.jsx)(s.b,{to:"/signup",children:"Join"})]})})]})})),b=r(15),h=r(4),x=r.n(h);function O(){var e=localStorage.getItem("token");return e?{headers:{Authorization:"Bearer ".concat(e)}}:{}}function m(){return f.apply(this,arguments)}function f(){return(f=Object(u.a)(i.a.mark((function e(){var t,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get("/api/users/me",O());case 3:return t=e.sent,r=t.data,e.abrupt("return",r);case 8:return e.prev=8,e.t0=e.catch(0),console.error("checkLogin(): User is not logged on.\n",e.t0),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function v(e,t){return g.apply(this,arguments)}function g(){return(g=Object(u.a)(i.a.mark((function e(t,r){var n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.post("/api/users/login",{email:t,password:r});case 3:return n=e.sent,(c=n.data).token&&N(c.token),e.abrupt("return",c);case 9:return e.prev=9,e.t0=e.catch(0),console.error("login(): Unable to login.\n",e.t0),e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function k(e,t){return y.apply(this,arguments)}function y(){return(y=Object(u.a)(i.a.mark((function e(t,r){var n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.post("/api/users/register",{email:t,password:r});case 3:return n=e.sent,c=n.data,alert("You have been registered and logged in."),c.token&&N(c.token),e.abrupt("return",c);case 10:return e.prev=10,e.t0=e.catch(0),console.error("register(): Unable to register user.\n",e.t0),e.abrupt("return",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function N(e){localStorage.setItem("token",e)}function w(e){localStorage.setItem("ordernum",e)}function C(e){return S.apply(this,arguments)}function S(){return(S=Object(u.a)(i.a.mark((function e(t){var r,n,c,a,s,o,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=localStorage.getItem("ordernum"),e.next=3,m();case 3:if(n=e.sent,!r){e.next=21;break}return e.next=7,x.a.get("/api/orderproducts/".concat(r,"/sku/").concat(t));case 7:if(!(c=e.sent).data){e.next=15;break}return a={ordernum:r,sku:t,quantity:c.data.quantity+1},e.next=12,x.a.patch("/api/orderproducts/".concat(r),a);case 12:alert("Product quantity has been updated."),e.next=19;break;case 15:return s={ordernum:r,sku:t},e.next=18,x.a.post("/api/orderproducts",s);case 18:alert("This product has been added to your cart.");case 19:e.next=37;break;case 21:if(!n){e.next=31;break}return n.orderuserid=n.userid,e.next=25,x.a.post("api/orders",n);case 25:o=e.sent,w(o.data.ordernum),C(t),e.next=37;break;case 31:return e.next=33,x.a.post("api/orders",{orderuserid:null});case 33:u=e.sent,w(u.data.ordernum),C(t);case 37:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e){localStorage.setItem("useremail",e)}function E(e){return U.apply(this,arguments)}function U(){return(U=Object(u.a)(i.a.mark((function e(t){var r,n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get("/api/orders/user/".concat(t));case 3:return r=e.sent,n=Object(l.a)(r.data,1),c=n[0],console.log("openOrder: ",c),c&&w(c.ordernum),e.abrupt("return");case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}var P=function(e){var t=e.type,r=e.setUser,c=Object(n.useState)(""),a=Object(l.a)(c,2),s=a[0],o=a[1],j=Object(n.useState)(""),p=Object(l.a)(j,2),b=p[0],h=p[1];function x(){return(x=Object(u.a)(i.a.mark((function n(c){var a;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),s&&b){n.next=5;break}return n.abrupt("return");case 5:if(n.prev=5,"login"!==t){n.next=12;break}return n.next=9,v(s,b);case 9:n.t0=n.sent,n.next=15;break;case 12:return n.next=14,k(s,b);case 14:n.t0=n.sent;case 15:if(!(a=n.t0).user){n.next=26;break}return n.next=19,o("");case 19:return n.next=21,h("");case 21:return n.next=23,r(a.user);case 23:I(a.user.email),E(a.user.userid),e.history.push("/home");case 26:n.next=31;break;case 28:n.prev=28,n.t1=n.catch(5),console.log(n.t1);case 31:case"end":return n.stop()}}),n,null,[[5,28]])})))).apply(this,arguments)}return Object(d.jsx)("div",{className:"formBox",children:Object(d.jsxs)("form",{className:"AuthForm",onSubmit:function(e){return x.apply(this,arguments)},children:[Object(d.jsx)("h1",{className:"title",children:"login"===t?"Log In":"Register"}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(d.jsx)("input",{id:"email",value:s,type:"text",placeholder:"Type your email",onChange:function(e){return o(e.target.value)}})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(d.jsx)("input",{id:"password",value:b,type:"password",placeholder:"Type your password",onChange:function(e){return h(e.target.value)}})]}),Object(d.jsx)("button",{className:"button",type:"submit",children:"login"===t?"Login":"Register"})]})})};function q(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),r=t[0],c=t[1],a=Object(n.useState)(0),s=Object(l.a)(a,2),o=s[0],i=s[1];Object(n.useEffect)((function(){u()}),[]);var u=function(){x.a.get("/api/products").then((function(e){var t=e.data.products.rows;c(t)})).catch((function(e){return console.error("Error: ".concat(e))}))},j=r.slice(0+12*o,12*o+12);return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"prodcont",children:Object(d.jsx)(B,{products:j})}),Object(d.jsxs)("div",{className:"pageButtons",children:[o<=0?Object(d.jsx)("div",{}):Object(d.jsx)("div",{children:Object(d.jsx)("button",{className:"lastPage",onClick:function(){return i(o-1)},children:"Previous 12"})}),o>=r.length/12-1?Object(d.jsx)("div",{}):Object(d.jsx)("div",{children:Object(d.jsx)("button",{className:"nextPage",onClick:function(){return i(o+1)},children:"Next 12"})})]})]})}function B(e){return Object(d.jsx)(d.Fragment,{children:function(e){var t=e.products;if(t.length>0)return t.map((function(e,t){return Object(d.jsxs)("div",{className:"products",children:[Object(d.jsx)("img",{className:"productimage",src:e.imageurl}),Object(d.jsx)("h1",{className:"productname",children:e.productname}),Object(d.jsxs)("h2",{className:"price",children:["Price: $",e.price]}),Object(d.jsx)("h2",{className:"description",children:e.description}),Object(d.jsx)("button",{type:"button",className:"addtocart",onClick:function(){C(e.sku)},children:"Add to Cart"})]},t)}))}(e)})}function T(e){var t=e.cart,r=e.setDisplayCart,c=e.displayCart,a=0,s=Object(n.useState)(!1),o=Object(l.a)(s,2),p=o[0],b=o[1];function h(){return(h=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("ordernum"),e.next=3,x.a.patch("/api/orders/".concat(t));case 3:localStorage.removeItem("ordernum"),b(!0);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.sku,a=localStorage.getItem("ordernum"),e.next=4,x.a.delete("/api/orderproducts/".concat(a,"/sku/").concat(n));case 4:r(!c);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=Object(u.a)(i.a.mark((function e(t,n){var a,s,o,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.sku,s=t.target.value,o=localStorage.getItem("ordernum"),u={ordernum:o,sku:a,quantity:s},e.next=6,x.a.patch("/api/orderproducts/".concat(o),u);case 6:r(!c);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return!0===p?Object(d.jsx)(j.a,{to:"/checkout"}):Object(d.jsxs)("div",{children:[t.length>0?Object(d.jsxs)("div",{className:"Cartpage",children:[Object(d.jsx)("h1",{className:"title",children:"Cart"}),t.sort().map((function(e){return a+=e.productprice*e.quantity,Object(d.jsxs)("div",{className:"Cart",children:[Object(d.jsx)("div",{className:"image",children:Object(d.jsx)("img",{className:"productimage",src:e.imageurl})}),Object(d.jsxs)("div",{className:"cartProducts",children:[Object(d.jsx)("h1",{className:"productname",children:e.productname}),Object(d.jsxs)("h2",{className:"price",children:["Price: $",e.productprice]}),Object(d.jsxs)("h2",{className:"quantity",children:[" ",Object(d.jsx)("label",{children:"Quantity:  "}),Object(d.jsxs)("select",{className:"quantity",onChange:function(t){!function(e,t){m.apply(this,arguments)}(t,e)},children:[Object(d.jsx)("option",{children:e.quantity}),Object(d.jsx)("option",{children:"1"}),Object(d.jsx)("option",{children:"2"}),Object(d.jsx)("option",{children:"3"}),Object(d.jsx)("option",{children:"4"}),Object(d.jsx)("option",{children:"5"}),Object(d.jsx)("option",{children:"6"}),Object(d.jsx)("option",{children:"7"}),Object(d.jsx)("option",{children:"8"}),Object(d.jsx)("option",{children:"9"}),Object(d.jsx)("option",{children:"10"})]})]}),Object(d.jsx)("button",{onClick:function(){!function(e){O.apply(this,arguments)}(e)},children:"Remove from Cart"})]}),Object(d.jsx)("div",{className:"total",children:Object(d.jsxs)("h1",{children:["Total: $","".concat(e.productprice)*"".concat(e.quantity)]})})]},e.productname)})),Object(d.jsx)("div",{className:"orderTotal",children:Object(d.jsxs)("h1",{children:["Order Total: $",a]})}),Object(d.jsx)("div",{className:"checkout",children:Object(d.jsx)("button",{onClick:function(){!function(){h.apply(this,arguments)}()},children:"Checkout!"})})]}):Object(d.jsx)("div",{className:"emptyCart",children:Object(d.jsx)("div",{className:"emptyCart1",children:"Your Cart is Empty"})})," "]})}function A(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),r=t[0],c=t[1],a=Object(n.useState)(!0),s=Object(l.a)(a,2),o=s[0],j=s[1],p=localStorage.getItem("ordernum"),b=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("/api/orders/".concat(p));case 2:if(t=e.sent,!(n=t.data)){e.next=9;break}(a=n.products)!==r&&c(a),e.next=10;break;case 9:return e.abrupt("return");case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){p&&b()}),[o]),Object(d.jsx)("div",{id:"ShoppingCart",children:p?Object(d.jsx)(T,{cart:r,setDisplayCart:j,displayCart:o}):Object(d.jsx)("div",{className:"emptyCart",children:Object(d.jsx)("div",{className:"emptyCart1",children:"Your Cart is Empty"})})})}function L(){return Object(d.jsx)("div",{className:"checkoutPage",children:Object(d.jsx)("div",{className:"checkoutConfirmation",children:"Thank you! Your order has been confirmed."})})}var F=Object(j.g)((function(e){var t=e.user,r=e.setUser;return Object(d.jsxs)(j.d,{children:[Object(d.jsx)(j.b,{path:"/login",render:function(e){return Object(d.jsx)(P,Object(b.a)(Object(b.a)({type:"login"},e),{},{setUser:r}))}}),Object(d.jsx)(j.b,{path:"/signup",render:function(e){return Object(d.jsx)(P,Object(b.a)(Object(b.a)({type:"register"},e),{},{setUser:r}))}}),Object(d.jsx)(j.b,{path:"/home",component:q}),Object(d.jsx)(j.b,{path:"/cart",render:function(){return Object(d.jsx)(A,{user:t,setUser:r})}}),Object(d.jsx)(j.b,{path:"/checkout",component:L}),Object(d.jsx)(j.b,{path:"/",component:q})]})}));var R=function(){var e=Object(n.useState)({}),t=Object(l.a)(e,2),r=t[0],c=t[1];return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m();case 2:(t=e.sent).userid&&c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(p,{user:r,setUser:c}),Object(d.jsx)(F,{user:r,setUser:c})]})};a.a.render(Object(d.jsx)(s.a,{children:Object(d.jsx)(R,{})}),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.7c1d6000.chunk.js.map