(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e840659"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination"},[e("li",{staticClass:"page-item",class:{disabled:1===t.pages.current_page}},[e("a",{staticClass:"page-link  text-dark",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.updatePage(t.pages.current_page-1)}}},[t._v("Previous")])]),t._l(t.pages.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.pages.current_page===a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.updatePage(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:t.pages.current_page===t.pages.total_pages}},[e("a",{staticClass:"page-link text-dark",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.updatePage(t.pages.current_page+1)}}},[t._v("Next")])])],2)])])},i=[],n={name:"Pagination",props:["pages"],data:function(){return{}},methods:{updatePage:function(t){this.$emit("update",t)}}},r=n,d=e("2877"),l=Object(d["a"])(r,s,i,!1,null,null,null);a["a"]=l.exports},efd9:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("div",{staticClass:"mt-5 row justify-content-center"},[e("div",{staticClass:"col-md-8"},[e("table",{staticClass:"table"},[t._m(0),t.orders.length?e("tbody",t._l(t.orders,(function(a,s){return e("tr",{key:s},[e("td",{staticClass:"align-middle"},[t._v(" "+t._s(a.created.datetime)+" ")]),e("td",{staticClass:"align-middle"},[t._v(" "+t._s(a.payment)+" ")]),e("td",t._l(a.products,(function(a,s){return e("ul",{key:s,staticClass:"list-unstyled"},[e("li",[t._v(" "+t._s(a.product.title)+" ")])])})),0),e("td",t._l(a.products,(function(a,s){return e("ul",{key:s,staticClass:"list-unstyled"},[e("li",[t._v(t._s(a.quantity)+t._s(a.product.unit))])])})),0),e("td",{staticClass:"align-middle"},[t._v(" "+t._s(t._f("money")(Math.round(a.amount)))+" ")]),e("td",{staticClass:"align-middle"},[a.paid?e("span",[t._v("已付款")]):e("strong",[t._v("未付款")])]),e("td",{staticClass:"align-middle"},[e("div",{staticClass:"btn-group btn-group-sm"},[e("button",{staticClass:"btn btn-outline-primary",attrs:{disabled:a.paid},on:{click:function(e){return e.preventDefault(),t.getDetailed(a.id)}}},[t._v("選擇")])])])])})),0):t._e()]),e("Pagination",{attrs:{pages:t.pagination},on:{update:t.getOrders}}),e("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}})],1)])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{width:"200px"}},[t._v("購買時間")]),e("th",{attrs:{width:"200px"}},[t._v("購買方式")]),e("th",{attrs:{width:"250px"}},[t._v("商品名稱")]),e("th",{attrs:{width:"180px"}},[t._v("數量")]),e("th",{attrs:{width:"120px"}},[t._v("應付金額")]),e("th",{attrs:{width:"200px"}},[t._v("付款狀態")]),e("th",{attrs:{width:"200px"}},[t._v("訂單詳情")])])])}],n=(e("99af"),e("1799")),r={components:{Pagination:n["a"]},data:function(){return{isLoading:!1,pagination:{},orders:[],order:{created:{},products:[]},orderId:"",status:{loadingItem:""}}},methods:{getOrders:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io","/api/").concat("71a05497-9279-4af4-a348-48c8c33eca99","/ec/orders?page=").concat(a);this.$http.get(e).then((function(a){t.orders=a.data.data,t.pagination=a.data.meta.pagination,t.isLoading=!1})).catch((function(){t.isLoading=!1,t.$bus.$emit("message:push","取得訂單列表失敗","danger")}))},getDetailed:function(t){this.$router.push("/admin/order/".concat(t))}},created:function(){this.getOrders()}},d=r,l=e("2877"),c=Object(l["a"])(d,s,i,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-7e840659.6a923920.js.map