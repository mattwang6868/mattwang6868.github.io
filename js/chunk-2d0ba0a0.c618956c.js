(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ba0a0"],{3607:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),s("div",{staticClass:"m-5 row  justify-content-center"},[s("form",{staticClass:"col-md-6 ",on:{submit:function(a){return a.preventDefault(),t.payOrder(a)}}},[s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.order.products,(function(a,e){return s("tr",{key:e},[s("td",{staticClass:"align-middle"},[t._v(" "+t._s(a.product.title)+" ")]),s("td",{staticClass:"align-middle"},[t._v(" "+t._s(a.quantity)+" / "+t._s(a.product.unit)+" ")]),s("td",{staticClass:"align-middle"},[t._v(" NT$"+t._s(t._f("money")(a.product.price))+" ")])])})),0),s("tfoot",[s("tr",[s("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v(" 總計 ")]),s("td",{staticClass:"text-right"},[t._v(" NT$ "+t._s(t._f("money")(Math.round(t.order.amount)))+" ")])])])]),s("table",{staticClass:"table"},[s("tbody",[s("tr",[s("th",{attrs:{width:"100"}},[t._v(" Email ")]),s("td",[t._v(t._s(t.order.user.email))])]),s("tr",[s("th",[t._v("姓名")]),s("td",[t._v(t._s(t.order.user.name))])]),s("tr",[s("th",[t._v("收件人電話")]),s("td",[t._v(t._s(t.order.user.tel))])]),s("tr",[s("th",[t._v("收件人地址")]),s("td",[t._v(t._s(t.order.user.address))])]),s("tr",[s("th",[t._v("付款狀態")]),s("td",[t.order.paid?s("span",{staticClass:"text-success"},[t._v("付款完成")]):s("span",[t._v("尚未付款")])])])])]),!1===t.order.paid?s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-danger"},[t._v(" 確認付款去 ")])]):t._e()])])],1)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("th",{attrs:{width:"200px"}},[t._v("品名")]),s("th",{attrs:{width:"200px"}},[t._v("數量")]),s("th",{attrs:{width:"200px"}},[t._v("單價")])])}],i=(s("99af"),{data:function(){return{isLoading:!1,order:{user:{}},orderId:""}},methods:{getDetail:function(t){var a=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io","/api/").concat("71a05497-9279-4af4-a348-48c8c33eca99","/ec/orders/").concat(t);this.$http.get(s).then((function(t){a.order=t.data.data,a.isLoading=!1}))},payOrder:function(){var t=this;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io","/api/").concat("71a05497-9279-4af4-a348-48c8c33eca99","/ec/orders/").concat(this.orderId,"/paying");this.$http.post(a).then((function(a){a.data.data.paid&&(t.getDetail(t.orderId),t.$router.push("/checkoutsuccess/".concat(t.orderId)),t.isLoading=!1)})).catch((function(){t.$router.push("/checkoutsuccess/".concat(t.orderId)),t.isLoading=!1}))}},created:function(){var t=this.$route.params.id;console.log(t),this.orderId=t,this.getDetail(t)}}),o=i,c=s("2877"),d=Object(c["a"])(o,e,r,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0ba0a0.c618956c.js.map