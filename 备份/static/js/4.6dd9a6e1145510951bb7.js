webpackJsonp([4],{Rc00:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("cWdY"),c={data:function(){return{showRule:!1,showRefund:!1,ticketsRecord:[],ticketActive:0,entryTime:"",visitCount:0,noData:!1,showRefundMessage:!1}},watch:{ticketsRecord:function(t){0===t.length&&(this.noData=!0)}},computed:{showMessage:function(){return this.$store.state.showMessage},visitNotice:function(){return this.$store.state.visitNotice}},created:function(){this.getTicketsRecord()},methods:{isShowMessage:function(){!0===this.showMessage&&this.$store.commit("showMessage",!1)},getTicketsRecord:function(){var t=this;Object(i.i)({}).then(function(e){0===e.length&&(t.noData=!0),t.ticketsRecord=e.list,t.getEntryTime(t.ticketActive);for(var s=0;s<t.ticketsRecord.length;s++)"已核销"===t.ticketsRecord[s].ticketState&&(t.visitCount+=1)})},selectRecord:function(t){this.ticketActive=t,this.getEntryTime(t)},getEntryTime:function(t){if(0===this.ticketsRecord.length)return!1;if(this.ticketsRecord[t].entryTime2){var e=this.ticketsRecord[t].entryTime2;this.entryTime="上午"===e?"9:30 ~ 11:30":"下午"===e?"15:00 ~ 17:00":e.split("-").join(" ~ ")}},refundTicket:function(){var t=this;"待进场"===this.ticketsRecord[this.ticketActive].ticketState&&Object(i.k)({ticketNumber:this.ticketsRecord[this.ticketActive].ticketNumber}).then(function(){t.ticketsRecord[t.ticketActive].ticketState="退票",t.showRefundMessage=!0,setTimeout(function(){t.showRefundMessage=!1},1e3)}),this.showRefund=!1}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"enlistRecord"},[i("i",{staticClass:"rule_i",on:{click:function(e){t.showRule=!t.showRule}}}),t._v(" "),i("div",{staticClass:"qrCode"},[t.ticketsRecord.length>0?i("img",{attrs:{src:t.ticketsRecord[t.ticketActive].codeUrl}}):i("img",{staticClass:"defaultImg",attrs:{src:s("iQH9")}})]),t._v(" "),t.ticketsRecord.length>0?i("div",{staticClass:"enlistInfo"},[i("p",[t._v("报名人："+t._s(t.ticketsRecord[t.ticketActive].name))]),t._v(" "),i("p",[t._v("第"+t._s(t.ticketsRecord[t.ticketActive].number)+"位游客")]),t._v(" "),i("p",[t._v("进场时间： "+t._s(t.entryTime))])]):i("div",{staticClass:"enlistInfo"},[i("p",{staticClass:"title"},[t._v("珠三角工匠精神展示馆")]),t._v(" "),i("p",{staticClass:"welcoming"},[t._v("— 欢迎您的来临 —")])]),t._v(" "),i("div",{staticClass:"topWrapper"},[i("span",{staticClass:"readNum"},[t._v("参观次数："+t._s(t.visitCount))]),t._v(" "),t.ticketsRecord.length>0?i("span",{staticClass:"queryNum"},[t._v(t._s(t.ticketsRecord[t.ticketActive].ticketNumber))]):i("span",{staticClass:"queryNum"}),t._v(" "),i("span",{staticClass:"refund",on:{click:function(e){t.showRefund=!0}}},[t._v("退票")])]),t._v(" "),i("div",{staticClass:"listWrapper"},[i("ul",{staticClass:"list"},[t._l(t.ticketsRecord,function(e,s){return i("li",{staticClass:"item",class:{stay:s===t.ticketActive},on:{click:function(e){t.selectRecord(s)}}},[t._v("\n                "+t._s(e.ticketTime)+" 丨 "+t._s(e.entryTime||"      ")+" 丨 "+t._s(e.personCount)),i("span",[t._v(t._s(e.ticketState))])])}),t._v(" "),t.noData?i("li",[i("p",{staticClass:"noRecord"},[t._v("暂无记录")])]):t._e()],2)]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.showRule?i("div",{staticClass:"mark",on:{touchmove:function(t){t.preventDefault()}}},[i("div",{staticClass:"rule"},[i("i",{staticClass:"close_i",on:{click:function(e){t.showRule=!1}}}),t._v(" "),i("p",{staticClass:"title"},[t._v("使用说明")]),t._v(" "),i("p",[t._v("1.预约码只能使用一次，且每次参观人数不得超过登记人数；如有需要，可重新预约。")]),t._v(" "),i("p",[t._v("2.如需更改时间，请至少提前一天按指引操作。")]),t._v(" "),i("p",[t._v("3.预约成功后请合理安排时间，逾期未至超过2次，将被拉入黑名单。")])])]):t._e()]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.showRefund?i("div",{staticClass:"mark",on:{touchmove:function(t){t.preventDefault()}}},[i("div",{staticClass:"sureRefund"},[i("p",[t._v("\n                    "+t._s("待进场"===t.ticketsRecord[t.ticketActive].ticketState?"您确定要退票吗？":"已核销"===t.ticketsRecord[t.ticketActive].ticketState?"该票已核销":"已过期"===t.ticketsRecord[t.ticketActive].ticketState?"该票已过期":"该票已退票"))]),t._v(" "),i("div",{staticClass:"confirm"},[i("span",{on:{click:function(e){t.showRefund=!1}}},[t._v("取消")]),t._v(" "),i("span",{staticClass:"sure",on:{click:t.refundTicket}},[t._v("确定")])])])]):t._e()]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.showMessage?i("div",{staticClass:"mark",on:{touchmove:function(t){t.preventDefault()}}},[i("div",{staticClass:"visitNotice"},[i("p",{staticClass:"title"},[t._v("参观须知")]),t._v(" "),i("p",{staticClass:"content"},[t._v(t._s(t.visitNotice))]),t._v(" "),i("span",{staticClass:"sure",on:{click:t.isShowMessage}},[t._v("确定")])])]):t._e()]),t._v(" "),i("transition",{attrs:{name:"fade"}},[!0===t.showRefundMessage?i("div",{staticClass:"success"},[t._v("退票成功")]):t._e()])],1)},staticRenderFns:[]};var a=s("C7Lr")(c,n,!1,function(t){s("aDzG")},null,null);e.default=a.exports},aDzG:function(t,e){}});
//# sourceMappingURL=4.6dd9a6e1145510951bb7.js.map