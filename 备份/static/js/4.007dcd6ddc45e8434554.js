webpackJsonp([4],{Luci:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("cWdY"),a={data:function(){return{name:"",pwd:""}},methods:{login:function(){var t=this;""!==this.name&&""!==this.pwd&&Object(s.k)({username:this.name,password:this.pwd}).then(function(){window.sessionStorage.setItem("isLogin","true"),t.$router.push("/scan")})}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loginPage"},[s("img",{staticClass:"logo",attrs:{src:n("iQH9")}}),t._v(" "),s("p",{staticClass:"title"},[t._v("珠三角工匠精神展示馆验票系统")]),t._v(" "),s("div",{staticClass:"login"},[s("div",{staticClass:"name"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",placeholder:"请输入管理员账号"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"pwd"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],attrs:{type:"text",placeholder:"请输入管理员密码"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}})]),t._v(" "),s("span",{staticClass:"btn_2",on:{click:t.login}},[t._v("登录")])])])},staticRenderFns:[]};var o=n("C7Lr")(a,i,!1,function(t){n("QOCm")},null,null);e.default=o.exports},QOCm:function(t,e){}});
//# sourceMappingURL=4.007dcd6ddc45e8434554.js.map