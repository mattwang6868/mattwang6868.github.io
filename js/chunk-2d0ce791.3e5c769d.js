(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ce791"],{6034:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"modal-dialog modal-xl"},[s("div",{staticClass:"modal-content "},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("訂單詳情")]),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(a){return t.goPage()}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t.order.created?s("div",{staticClass:"m-2 text-left"},[t._v("訂單編號"+t._s(t.order.created.timestamp))]):t._e(),s("span",{staticClass:"border-bottom"}),s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.productsLength,(function(a){return s("tr",{key:a,staticClass:"border-bottom border-top"},[s("td",{staticClass:"border-0 px-0 font-weight-normal py-4 d-flex"},[s("img",{staticClass:"ml-5",staticStyle:{width:"90px",height:"90px","object-fit":"cover"},attrs:{src:t.order.products[a-1].product.imageUrl[0],alt:""}}),s("p",{staticClass:"mb-0 font-weight-bold ml-3 d-inline-block mr-auto"},[t._v(t._s(t.order.products[a-1].product.title))])]),s("td",{staticClass:"border-0 align-middle",staticStyle:{"max-width":"160px"}},[s("div",{staticClass:"input-group "},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.order.products[a-1].quantity,expression:"order.products[ i -1 ].quantity"}],staticClass:"form-control border-0 text-center my-auto shadow-none",attrs:{type:"text",placeholder:"","aria-label":"Example text with button addon","aria-describedby":"button-addon1"},domProps:{value:t.order.products[a-1].quantity},on:{input:function(s){s.target.composing||t.$set(t.order.products[a-1],"quantity",s.target.value)}}})])]),s("td",{staticClass:"border-0 align-middle"},[s("p",{staticClass:"mb-0 ml-auto"},[t._v(t._s(t.order.products[a-1].product.price))])]),s("td",{staticClass:"border-0 align-middle"},[s("p",{staticClass:"mb-0 ml-auto"},[t._v(t._s(t.order.products[a-1].quantity*t.order.products[a-1].product.price))])])])})),0)]),s("div",{staticClass:"p-4 mb-4"},[s("h4",{staticClass:"font-weight-bold mb-4 text-right"},[t._v("結 算")]),s("div",{staticClass:"d-flex justify-content-between mt-4"},[s("p",{staticClass:"mb-0 h4 font-weight-bold"},[t._v("Total")]),s("p",{staticClass:"mb-0 h4 font-weight-bold"},[t._v("NT$"+t._s(t.order.amount))])])]),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(a){return t.goPage()}}},[t._v("Close")])])])])])},o=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",[s("th",{staticClass:"border-0 text-left pl-5",attrs:{width:"400px"}},[t._v("品名")]),s("th",{staticClass:"border-0",attrs:{width:"300px"}},[t._v("數量")]),s("th",{staticClass:"border-0"},[t._v("單價")]),s("th",{staticClass:"border-0"},[t._v("小計")])])])}],r=(s("99af"),{data:function(){return{isLoading:!1,order:{mount:"",coupon:{},created:{},id:"",message:"",paid:!1,paid_at:"",paid_diff:"",payment:"",products:[],updated:{},user:{}},productsLength:"",orderId:""}},methods:{getDetail:function(t){var a=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io","/api/").concat("71a05497-9279-4af4-a348-48c8c33eca99","/ec/orders/").concat(t);this.$http.get(s).then((function(t){a.order=t.data.data,a.productsLength=t.data.data.products.length,a.isLoading=!1})).catch((function(){a.isLoading=!1,a.$bus.$emit("message:push","取得訂單詳情失敗","danger")}))},quantityUpdate:function(){},update:function(){},goPage:function(){this.$router.push("/admin/orders")}},created:function(){var t=this.$route.params.id;this.orderId=t,this.getDetail(t)}}),i=r,d=s("2877"),c=Object(d["a"])(i,e,o,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0ce791.3e5c769d.js.map