webpackJsonp([4],{"2NXm":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("mvHQ"),c=s.n(i),n=s("cWdY"),a=s("dozW"),l=s("N/5j"),o={data:function(){return{notice:"",guide:2,week:[],tickets:0,ticketsList:[],specList:["20 - 50 人"],showSelectSpec:!1,showRegInfo:!1,teamName:"",deadline:-1,singleTime:["9:30-11:30","15:00-17:00"],tel:"",pullupdata:[]}},mounted:function(){},created:function(){this.getIndexData(),this.getNotice()},computed:{selectedInfo:function(){return this.$store.state.selectedInfo},count:function(){return 0===this.selectedInfo.selectedSpec?9:10*(this.selectedInfo.selectedSpec+1)},animation:function(){return"noticeScroll "+this.notice.length/2+"s linear 300"}},components:{"v-pullup":a.a},methods:{noOrderMonday:function(e){return("一"!==this.week[e].day||!(this.week[e].amTicket>0||this.week[e].pmTicket>0))&&("一"===this.week[e].day||void 0)},gobindphone:function(){window.location.href="getLoginPhoneInfo:///"},singleReduce:function(){if(1===this.selectedInfo.singleCount)return!1;var e=this.selectedInfo.singleCount-1;this.$store.commit("selectSingleCount",e)},singleAdd:function(){if(5===this.selectedInfo.singleCount)return!1;if(6===this.selectedInfo.selectedTime&&this.selectedInfo.singleCount===this.week[this.selectedInfo.daySltActive].amTicket)return!1;if(7===this.selectedInfo.selectedTime&&this.selectedInfo.singleCount===this.week[this.selectedInfo.daySltActive].pmTicket)return!1;var e=this.selectedInfo.singleCount+1;this.$store.commit("selectSingleCount",e)},getIndexData:function(){var e=this;Object(n.d)({}).then(function(t){c()(t);e.week=t.week,e.noOrderMonday(0)&&e.$store.commit("selectedDay",1),t.name&&e.$store.commit("addContactInfo",{contactName:t.name,contactPhone:t.phone,sex:t.sex,area:t.address,areaCode:t.areaCode,remark:t.remark}),e.judgeDeadline(e.selectedInfo.daySltActive),e.ticketsList=t.week[e.selectedInfo.daySltActive].times,e.selectedInfo.selectedTime<=1&&e.deadline<1?e.tickets=t.week[e.selectedInfo.daySltActive].amTicket:e.tickets=t.week[e.selectedInfo.daySltActive].pmTicket,e.selectType(2)})},getNotice:function(){var e=this;Object(n.e)().then(function(t){c()(t);e.notice=t.notice,e.tel=t.phone,e.$store.commit("setVisitNotice",t.content)})},selecteDay:function(e){return!(2===this.selectedInfo.ticketType&&e<=2)&&(!this.noOrderMonday(e)&&(this.judgeDeadline(e),this.$store.commit("selectedDay",e),this.$store.commit("selectTime",-1),this.ticketsList=this.week[e].times,void(this.ticketsList[0].teamRemain+this.ticketsList[1].teamRemain>0&&this.deadline<1?this.tickets=this.week[e].amTicket:this.tickets=this.week[e].pmTicket)))},selectSpec:function(e){if(this.$store.commit("selectSpec",e),this.tickets<this.count)return this.$store.commit("selectSpec",-2),!1},hideSelectSpec:function(){-2===this.selectedInfo.selectedSpec&&this.$store.commit("selectSpec",-1),this.showSelectSpec=!1},selectTime:function(e){if(2===this.selectedInfo.ticketType){if(0===this.ticketsList[e].teamRemain||e<=this.deadline)return!1;if("9:30-10:30"===this.ticketsList[e].time||"10:30-11:30"===this.ticketsList[e].time||"上午"===this.ticketsList[e].time?this.tickets=this.week[this.selectedInfo.daySltActive].amTicket:this.tickets=this.week[this.selectedInfo.daySltActive].pmTicket,this.tickets<this.count)return this.$store.commit("selectTime",-1),!1}else if(6===e){if(this.deadline>=1||0===this.week[this.selectedInfo.daySltActive].amTicket||this.selectedInfo.singleCount>this.week[this.selectedInfo.daySltActive].amTicket)return!1}else if(7===e&&(this.deadline>=4||0===this.week[this.selectedInfo.daySltActive].pmTicket||this.selectedInfo.singleCount>this.week[this.selectedInfo.daySltActive].pmTicket))return!1;this.$store.commit("selectTime",e)},selectType:function(e){2===e&&(this.noOrderMonday(3)?this.selecteDay(4):this.selecteDay(3)),this.$store.commit("ticketType",e)},submit:function(){2===this.selectedInfo.ticketType?this.selectedInfo.selectedSpec>=0&&this.selectedInfo.selectedTime>=0&&""!==this.selectedInfo.contactName?this.showRegInfo=!0:this.selectedInfo.selectedSpec<0?(this.pullupdata=["请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知","请选择进场人数"],this.$store.commit("changepullup",!0)):this.selectedInfo.selectedTime<0?(this.pullupdata=["请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知","请选择进场时间"],this.$store.commit("changepullup",!0)):""===this.selectedInfo.contactName&&(this.pullupdata=["请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知","请添加联系人信息"],this.$store.commit("changepullup",!0)):1===this.selectedInfo.ticketType&&(this.selectedInfo.selectedTime>=6&&""!==this.selectedInfo.contactName?this.showRegInfo=!0:this.selectedInfo.selectedTime<6?(this.pullupdata=["请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知","请选择进场时间"],this.$store.commit("changepullup",!0)):""===this.selectedInfo.contactName&&(this.pullupdata=["请填写真实手机号码并保持通讯畅通，如遇重大活动或临时性闭馆，预约团队另行安排参观时间并将通过手机短信告知","请添加联系人信息"],this.$store.commit("changepullup",!0)))},sureSubmit:function(){var e=this,t=0,s=0,i=0;switch(this.week[this.selectedInfo.daySltActive].day){case"一":i=1;break;case"二":i=2;break;case"三":i=3;break;case"四":i=4;break;case"五":i=5;break;case"六":i=6;break;case"日":i=7}2===this.selectedInfo.ticketType?(t=this.selectedInfo.selectedTime+1,s=4):(t=this.selectedInfo.selectedTime,s=this.selectedInfo.singleCount+4),Object(l.a)({url:"/wap/ticketWap/signUp",data:{contactName:this.selectedInfo.contactName,contactPhone:this.selectedInfo.contactPhone,dayNumber:this.selectedInfo.daySltActive,entryTime:t,guide:this.guide,teamName:this.teamName,type:this.selectedInfo.ticketType,count:s,sort:i},error:function(t){700===t.status?(e.pullupdata=["您今天已经报名过了"],e.$store.commit("changepullup",!0)):307===t.status?(e.pullupdata=["手机号验证未通过"],e.$store.commit("changepullup",!0)):701===t.status&&(e.pullupdata=["您已报名过改时间段"],e.$store.commit("changepullup",!0))}}).then(function(){e.$router.push("/enlistRecord"),e.$store.commit("showMessage",!0)}),this.showRegInfo=!1},judgeDeadline:function(e){if(0===e){var t=[],s=new Date,i=s.getTime();t.push(s.setHours(10,30,0,0)),t.push(s.setHours(11,30,0,0)),t.push(s.setHours(15,0,0,0)),t.push(s.setHours(16,0,0,0)),t.push(s.setHours(17,0,0,0)),t.push(s.setHours(18,0,0,0));for(var c=0;c<t.length;c++)i>=t[c]&&(this.deadline=c)}else this.deadline=-1}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"indexPage"},[i("div",{staticClass:"notice"},[i("div",{staticClass:"wrapper"},[i("p",{style:{animation:e.animation}},[e._v(e._s(e.notice))])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.uphone,expression:"!uphone"}],staticClass:"phonebind"},[i("div",{staticClass:"pbmain"},[i("p",[e._v("该用户还没有绑定手机号")]),i("p",[e._v("登记需要绑定手机号~")]),i("span",{on:{click:function(t){e.gobindphone()}}},[e._v("去绑定")])])]),e._v(" "),i("div",{staticClass:"top"},[i("img",{staticClass:"logo",attrs:{src:s("iQH9")}}),e._v(" "),i("p",{staticClass:"name"},[e._v("珠三角工匠精神展示馆")]),e._v(" "),i("router-link",{attrs:{to:"/enlistRecord"}},[i("span",{staticClass:"btn_1"},[e._v("报名记录")])])],1),e._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"dateSlt"},[i("p",{staticClass:"prompt"},[e._v("日期选择")]),e._v(" "),i("ul",{staticClass:"date"},e._l(e.week,function(t,s){return i("li",{class:{ban:t.amTicket<=0&&t.pmTicket<=0||2===e.selectedInfo.ticketType&&s<=2},on:{click:function(t){e.selecteDay(s)}}},[i("span",[e._v(e._s(t.day))]),e._v(" "),i("span",{class:{active:e.selectedInfo.daySltActive==s&&(t.amTicket>0||t.pmTicket>0)}},[e._v(e._s(e._f("formatDate")(t.date)))])])}))]),e._v(" "),i("div",{staticClass:"ticketType"},[i("p",{staticClass:"prompt"},[e._v("预约种类")]),e._v(" "),i("div",{staticClass:"typeSlt"},[i("span",{staticClass:"personal",class:{radioActive:1===e.selectedInfo.ticketType},on:{click:function(t){e.selectType(1)}}},[i("i",{staticClass:"radio_1"}),e._v("个人票")]),e._v(" "),i("span",{staticClass:"team",class:{radioActive:2===e.selectedInfo.ticketType},on:{click:function(t){e.selectType(2)}}},[i("i",{staticClass:"radio_1"}),e._v("团体票")])])]),e._v(" "),i("div",{staticClass:"numberSlt",class:{jintou:2===e.selectedInfo.ticketType}},[i("p",{staticClass:"prompt"},[e._v("进馆人数")]),e._v(" "),2===e.selectedInfo.ticketType?i("div",{staticClass:"clickZone",on:{click:function(t){e.showSelectSpec=!0}}},[i("span",{class:{showy:-1===e.selectedInfo.selectedSpec&&2===e.selectedInfo.ticketType}},[e._v("\n                    "+e._s(-1===e.selectedInfo.selectedSpec?"请选择参团人数":-2===e.selectedInfo.selectedSpec?"余票不足":e.specList[e.selectedInfo.selectedSpec])+"\n                ")])]):e._e(),e._v(" "),1===e.selectedInfo.ticketType?i("div",{staticClass:"singleTicket"},[i("div",{staticClass:"count"},[i("i",{staticClass:"reduce",on:{click:e.singleReduce}}),e._v(" "),i("span",[e._v(e._s(e.selectedInfo.singleCount))]),e._v(" "),i("i",{staticClass:"add",on:{click:e.singleAdd}})]),e._v(" "),i("div",{staticClass:"tips"},[e._v("(人数上限：5)")])]):e._e()]),e._v(" "),i("div",{staticClass:"selectedTime"},[i("div",{staticClass:"top"},[i("p",{staticClass:"prompt"},[e._v("选择到场时间")]),e._v(" "),2===e.selectedInfo.ticketType?i("p",{staticClass:"surplus"},[e._v("剩余票数："+e._s(e.tickets))]):e._e(),e._v(" "),1===e.selectedInfo.ticketType?i("p",{staticClass:"singleTime"},[e._v("(上午：9:30-11:30 ; 下午：15:00-17:00)")]):e._e()]),e._v(" "),2===e.selectedInfo.ticketType?i("div",{staticClass:"ticketsWrapper"},[i("ul",{staticClass:"tickets"},e._l(e.ticketsList,function(t,s){return i("li",{staticClass:"ticket",class:{period:0==t.teamRemain||s<=e.deadline,active:e.selectedInfo.selectedTime===s},on:{click:function(t){e.selectTime(s)}}},[i("p",[e._v(e._s(t.time))]),e._v(" "),i("p",[e._v("团队名额："+e._s(t.teamRemain))])])}))]):e._e(),e._v(" "),1===e.selectedInfo.ticketType&&e.week[e.selectedInfo.daySltActive]?i("div",{staticClass:"singleTicketWrapper"},[i("div",{staticClass:"am",class:{period:0===e.week[e.selectedInfo.daySltActive].amTicket||e.deadline>=1,active:6===e.selectedInfo.selectedTime},on:{click:function(t){e.selectTime(6)}}},[i("p",[e._v("上午")]),e._v(" "),i("p",[e._v("剩余"+e._s(e.week[e.selectedInfo.daySltActive].amTicket)+"张票")])]),e._v(" "),i("div",{staticClass:"pm",class:{period:0===e.week[e.selectedInfo.daySltActive].pmTicket||e.deadline>=4,active:7===e.selectedInfo.selectedTime},on:{click:function(t){e.selectTime(7)}}},[i("p",[e._v("下午")]),e._v(" "),i("p",[e._v("剩余"+e._s(e.week[e.selectedInfo.daySltActive].pmTicket)+"张票")])])]):e._e()]),e._v(" "),i("router-link",{attrs:{to:"/addInfo"}},[i("div",{staticClass:"contactsSlt jintou"},[i("p",{staticClass:"prompt"},[e._v("添加联系人信息")]),e._v(" "),i("span",{class:{showy:""===e.selectedInfo.contactName}},[e._v(e._s(""===e.selectedInfo.contactName?"请填写联系人信息":e.selectedInfo.contactName))])])])],1),e._v(" "),i("div",{staticClass:"btn_2",on:{click:e.submit}},[e._v("确认报名")]),e._v(" "),i("p",{staticClass:"tel"},[e._v("客服咨询热线："+e._s(e.tel))]),e._v(" "),i("transition",{attrs:{name:"fade"}},[e.showSelectSpec?i("div",{staticClass:"selectSpec mark",on:{touchmove:function(e){e.preventDefault()},click:function(t){return t.stopPropagation(),e.hideSelectSpec(t)}}},[i("div",{staticClass:"specWrapper"},[i("div",{staticClass:"top"},[i("p",[e._v("选择进馆人数"),i("span",{on:{click:function(t){return t.stopPropagation(),e.hideSelectSpec(t)}}},[e._v("×")])])]),e._v(" "),i("ul",{staticClass:"content"},[e._l(e.specList,function(t,s){return i("li",{staticClass:"spec",class:{active:e.selectedInfo.selectedSpec===s},on:{click:function(t){t.stopPropagation(),e.selectSpec(s)}}},[e._v(e._s(t)+"\n                    ")])}),e._v(" "),i("li",{staticClass:"tips"},[e._v("报名人数超过50人以上，请联系客服："+e._s(e.tel))])],2)])]):e._e()]),e._v(" "),i("transition",{attrs:{name:"fade"}},[e.showRegInfo?i("div",{staticClass:"regInfo mark",on:{touchmove:function(e){e.preventDefault()}}},[i("div",{staticClass:"wrapper"},[i("p",{staticClass:"top"},[e._v("核实报名信息")]),e._v(" "),i("div",{staticClass:"contacts"},[i("p",[e._v("联系人："),i("span",[e._v(e._s(e.selectedInfo.contactName||""))])]),e._v(" "),i("p",[e._v("联系电话："),i("span",[e._v(e._s(e.selectedInfo.contactPhone||""))])]),e._v(" "),i("p",[e._v("\n                        报名人数："),i("span",[e._v(e._s(2===e.selectedInfo.ticketType?e.specList[e.selectedInfo.selectedSpec]:e.selectedInfo.singleCount+" 人"))])])]),e._v(" "),i("dl",[i("dt",[e._v("进场时间：")]),e._v(" "),i("dd",[e._v("\n                        "+e._s(e.week[e.selectedInfo.daySltActive].date)+"，"+e._s(2===e.selectedInfo.ticketType?e.week[e.selectedInfo.daySltActive].times[e.selectedInfo.selectedTime].time:e.singleTime[e.selectedInfo.selectedTime-6])+"\n                    ")])]),e._v(" "),2===e.selectedInfo.ticketType?i("dl",[i("dt",[e._v("是否需要讲解员")]),e._v(" "),i("dd",[i("span",{class:{radioActive:1===e.guide},on:{click:function(t){e.guide=1}}},[i("i",{staticClass:"radio_1"}),e._v("是")]),e._v(" "),i("span",{class:{radioActive:2===e.guide},on:{click:function(t){e.guide=2}}},[i("i",{staticClass:"radio_1"}),e._v("否")])])]):e._e(),e._v(" "),2===e.selectedInfo.ticketType?i("dl",{staticClass:"company"},[i("dt",[e._v("团队或单位名称：")]),e._v(" "),i("dd",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.teamName,expression:"teamName"}],attrs:{type:"text",placeholder:"选填"},domProps:{value:e.teamName},on:{input:function(t){t.target.composing||(e.teamName=t.target.value)}}})])]):e._e(),e._v(" "),i("div",{staticClass:"confirm"},[i("span",{on:{click:function(t){e.showRegInfo=!1}}},[e._v("取消")]),e._v(" "),i("span",{staticClass:"sure",on:{click:e.sureSubmit}},[e._v("确定")])])])]):e._e()]),e._v(" "),i("v-pullup",{attrs:{options:e.pullupdata}})],1)},staticRenderFns:[]};var p=s("C7Lr")(o,d,!1,function(e){s("NqQv")},null,null);t.default=p.exports},NqQv:function(e,t){}});
//# sourceMappingURL=4.79930585fc6b76c15ce0.js.map