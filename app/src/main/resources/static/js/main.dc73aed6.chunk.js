(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{257:function(e,t,a){e.exports=a(545)},262:function(e,t,a){},263:function(e,t,a){},267:function(e,t,a){},320:function(e,t,a){},324:function(e,t,a){},333:function(e,t,a){},529:function(e,t,a){},530:function(e,t,a){},535:function(e,t){},545:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(7),i=a.n(r),o=(a(262),a(20)),s=a(21),c=a(25),u=a(24),d=a(135),p=a(29),m=(a(263),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,this.props.children)}}]),a}(n.Component)),f=(a(139),a(51)),h=(a(107),a(31)),v=(a(60),a(19)),y=(a(80),a(18)),E=(a(267),a(34)),b=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={},e}return Object(s.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"header"},l.a.createElement(f.a,{className:"header-top"},l.a.createElement(h.a,{span:24},l.a.createElement("span",null,"\u6b22\u8fce, ",this.props.username),l.a.createElement(v.a,{style:{color:"#1890ff",marginLeft:10,border:"none"},onClick:function(){y.a.confirm({title:"\u786e\u8ba4\u9000\u51fa",content:"\u662f\u5426\u8981\u9000\u51fa\u5f53\u524d\u7528\u6237?",onOk:function(){localStorage.clear(),window.location.href="http://120.79.61.68"}})}},"\u9000\u51fa"))))}}]),a}(l.a.Component),g=Object(E.b)(function(e){return{menuName:e.menu.menuName,username:e.userInfo.username}})(b),w=(a(320),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"footer"},"\u6b22\u8fce\u4f7f\u7528\u6d41\u5411\u751f\u6210\u7cfb\u7edf")}}]),a}(l.a.Component)),I=(a(321),a(79)),O=[{title:"\u6d41\u5411\u751f\u6210",key:"/order"},{title:"\u5ba2\u6237\u7ba1\u7406",key:"/client"},{title:"\u7528\u6237\u7ba1\u7406",key:"/user"}],k=a(138),j={SWITCH_MENU:"SWITCH_MENU",defaultMenu:{menuName:"\u9996\u9875"},action:{switchMenu:function(e){return{type:j.SWITCH_MENU,menuName:e}}},reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j.defaultMenu,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j.SWITCH_MENU:return Object(k.a)(Object(k.a)({},e),{},{menuName:t.menuName});default:return Object(k.a)({},e)}}},S=j,C=(a(324),I.a.SubMenu),x=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={currentKey:"/order"},e.handleClick=function(t){var a=t.item,n=t.key;console.log(a),(0,e.props.dispatch)(S.action.switchMenu(a.props.title)),e.setState({currentKey:n})},e.renderMenu=function(t){return t.map(function(t){return t.children?l.a.createElement(C,{title:t.title,key:t.key},e.renderMenu(t.children)):l.a.createElement(I.a.Item,{title:t.title,key:t.key},l.a.createElement(d.b,{to:t.key},t.title))})},e}return Object(s.a)(a,[{key:"componentWillMount",value:function(){var e=O;1!==this.props.level&&(e=O.filter(function(e){return"/user"!==e.key}),2!==this.props.level&&(e=e.filter(function(e){return"/client"!==e.key})));var t=this.renderMenu(e),a=window.location.hash.replace(/#|\?.*$/g,"");this.setState({currentKey:a,menuTreeNode:t})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"logo"},l.a.createElement(h.a,{span:5},l.a.createElement("img",{src:"favicon.ico",alt:""})),l.a.createElement(h.a,{span:30},l.a.createElement("h2",null,"\u6d41\u5411\u751f\u6210\u7cfb\u7edf"))),l.a.createElement(I.a,{theme:"dark",selectedKeys:[this.state.currentKey],onClick:this.handleClick},this.state.menuTreeNode))}}]),a}(l.a.Component),N=Object(E.b)(function(e){return{username:e.userInfo.username,level:e.userInfo.level}})(x),T=(a(333),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return l.a.createElement(f.a,{className:"container"},l.a.createElement(h.a,{span:3,className:"nav-left"},l.a.createElement(N,null)),l.a.createElement(h.a,{span:21,className:"main"},l.a.createElement(g,null),l.a.createElement(f.a,{className:"content"},this.props.children),l.a.createElement(w,null)))}}]),a}(l.a.Component)),V=(a(236),a(133)),L=(a(170),a(67)),D=a(238),R=a.n(D),A=a(239),F=a.n(A),K=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"jsonp",value:function(e){return new Promise(function(t,a){R()(e.url,{param:"callback"},function(e,n){"success"===n.status?t(n):a(n.message)})})}},{key:"ajax",value:function(e){var t=localStorage.getItem("timestamp"),a=Date.now();t&&a-Number(t)>2592e5?(localStorage.clear(),window.location.href="http://120.79.61.68"):localStorage.setItem("timestamp",a.toString()),e.data&&!1!==e.data.isShowLoading&&(document.getElementById("ajaxLoading").style.display="block");return new Promise(function(t,a){F()({url:e.url,baseURL:"http://120.79.61.68",method:e.data.method,params:e.data&&"get"===e.data.method&&e.data.params||"",data:e.data&&"post"===e.data.method&&e.data.params||null}).then(function(n){e.data&&!1!==e.data.isShowLoading&&(document.getElementById("ajaxLoading").style.display="none"),200===n.status?t(n.data):a(n.data)})})}}]),e}(),M=(a(100),a(36)),U=M.a.Option,Y={formatDate:function(e){if(!e)return"";var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+"-"+t.getHours()+"-"+t.getMinutes()+"-"+t.getSeconds()},pagination:function(e,t){return{onChange:function(e){t(e)},pageSize:10,total:e.result.length,showTotal:function(){return"\u5171".concat(e.result.length,"\u6761\u6570\u636e")},showQuickJumper:!0}},getOptionList:function(e){if(!e)return[];var t=[];return e.map(function(e){t.push(l.a.createElement(U,{value:e.name,key:e.id},e.name))}),t},updateSelectedItem:function(e,t,a){a?this.setState({selectedRowKeys:e,selectedIds:a,selectedItem:t}):this.setState({selectedRowKeys:e,selectedItem:t})}},_=(a(547),a(253)),H=(a(365),a(8)),P=(a(546),a(176)),B=(a(197),a(66)),W=(a(101),a(40)),z=(a(154),a(47)),G=z.a.Item,J=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={fileList:[]},e.initFormList=function(){var t=e.props.form.getFieldDecorator,a=e.props.formList,n=[];return a&&a.length>0&&a.forEach(function(a,r){var i=a.label,o=a.field,s=a.initialValue,c=a.placeholder,u=a.width;if("INPUT"===a.type){var d=l.a.createElement(G,{label:i,key:o},t([o],{initialValue:s})(l.a.createElement(W.a,{type:"text",placeholder:c})));n.push(d)}else if("SELECT"===a.type){var p=l.a.createElement(G,{label:i,key:o},t([o],{initialValue:s})(l.a.createElement(M.a,{mode:a.mode,style:{width:u},placeholder:c,allowClear:!0},Y.getOptionList(a.list))));n.push(p)}else if("CHECKBOX"===a.type){var m=l.a.createElement(G,{label:i,key:o},t([o],{valuePropName:o,initialValue:s})(l.a.createElement(B.a,null)));n.push(m)}else if("DATE"===a.type){var f=l.a.createElement(G,{label:i,key:o},t([o])(l.a.createElement(P.a,{style:{width:145},mode:"date",placeholder:c,format:"YYYY-MM-DD"})));n.push(f)}else if("RANGE"===a.type){var h=l.a.createElement(G,{label:i,key:o},t([o])(l.a.createElement(P.a.RangePicker,{showTime:!1,placeholder:["\u8d77\u59cb\u65e5\u671f","\u7ed3\u675f\u65e5\u671f"],format:"YYYY-MM-DD"})));n.push(h)}else if("UPLOAD"===a.type){var E=l.a.createElement(G,{label:i,key:o},t([o])(l.a.createElement(_.a,{headers:{"content-type":"multipart/form-data"},multiple:!1,accept:".xls,.xlsx",beforeUpload:function(){return!1},onChange:function(t){if("done"===t.file.status)if(200===t.file.response.code){var a=t.fileList;e.setState({fileList:a})}else y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,t.file.response.msg),okText:"ok"});e.setState({fileList:t.fileList})},showUploadList:!0,fileList:e.state.fileList},l.a.createElement(v.a,null,l.a.createElement(H.a,{type:"upload"})," ",c))));n.push(E)}}),n},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement(z.a,{layout:"inline"},this.initFormList(),l.a.createElement(G,null,l.a.createElement(v.a,{type:"primary",style:{margin:"0 10px"},onClick:function(){var t=e.props.form.getFieldsValue();e.props.handleSubmit(t),e.setState({fileList:[]})}},this.props.submitButtonName),l.a.createElement(v.a,{type:"primary",onClick:function(){e.props.form.resetFields(),e.setState({fileList:[]})}},"\u91cd\u7f6e")))}}]),a}(l.a.Component),$=z.a.create({})(J),q=a(104),X=a.n(q),Q=a(15),Z=a.n(Q),ee=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).params={page:1},e.state={},e.formList=[{type:"DATE",label:"\u65e5\u671f\u8303\u56f4(\u8d77)",field:"startDate",placeholder:"\u8bf7\u9009\u62e9\u8d77\u59cb\u65e5\u671f"},{type:"DATE",label:"\u65e5\u671f\u8303\u56f4(\u6b62)",field:"endDate",placeholder:"\u8bf7\u9009\u62e9\u622a\u6b62\u65e5\u671f"},{type:"UPLOAD",label:"\u6761\u4ef6\u5217\u8868",field:"file",placeholder:"\u8bf7\u4e0a\u4f20excel\u6587\u4ef6"},{type:"SELECT",label:"\u5ba2\u6237\u7c7b\u578b",field:"clientType",placeholder:"\u9ed8\u8ba4\u65e0\u9650\u5236",width:120,mode:"multiple",initialValue:[],list:[{id:1,name:"\u96f6\u552e\u836f\u5e97"},{id:2,name:"\u6279\u53d1\u7ecf\u8425"},{id:3,name:"\u533b\u7597\u673a\u6784"}]}],e.generateOrders=function(){var t=e.params.startDate,a=e.params.endDate,n=e.params.file,r=e.params.clientType;if(t&&a&&n&&n.fileList[0]){if(t>a)return y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u8d77\u59cb\u65e5\u671f\u4e0d\u5f97\u5927\u4e8e\u622a\u6b62\u65e5\u671f\uff01"),okText:"ok"});var i=new window.FormData;t=Z()(t).format("YYYY-MM-DD"),a=Z()(a).format("YYYY-MM-DD");var o=n.fileList[0].originFileObj;i.append("startDate",t),i.append("endDate",a),i.append("file",o),i.append("clientTypes",r),i.append("userId",e.props.userId),i.append("version",e.props.version),K.ajax({url:"/order/generate",data:{params:i,method:"post"}}).then(function(t){if(200===t.code){if(t.result){var a=t.result.map(function(e,t){return e.key=t,e});e.setState({list:a,selectedRowKeys:void 0,selectedItem:void 0,pagination:Y.pagination(t,function(t){e.params.page=t,e.setState({selectedRowKeys:void 0,selectedItem:void 0})})})}}else 501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:t.message})})}else y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u7f3a\u5c11\u53c2\u6570\uff01"),okText:"ok"})},e.downloadTemplateFile=function(){var e={fileName:"\u6d41\u5411\u751f\u6210\u6761\u4ef6(\u6a21\u7248)",datas:[{sheetData:[],sheetName:"\u6761\u4ef6\u5217\u8868",sheetHeader:["\u5546\u54c1\u540d\u79f0 (\u5fc5\u586b)","\u89c4\u683c","\u751f\u4ea7\u5382\u5546","\u6279\u53f7","\u6709\u6548\u671f","\u5355\u4ef7","\u603b\u6d41\u51fa\u91cf (\u5fc5\u586b, \u4f8b:100)","\u603b\u5ba2\u6237\u6570 (\u5fc5\u586b, \u4f8b:10)"]}]};new X.a(e).saveExcel()},e.downloadResultToExcel=function(){var t=e.state.list,a={},n=[];if(t&&t.length>0)for(var l in t){var r={"\u5546\u54c1\u540d\u79f0":t[l].productName,"\u89c4\u683c":t[l].specification,"\u751f\u4ea7\u5382\u5546":t[l].manufacturer,"\u6279\u53f7":t[l].batchNumber,"\u6709\u6548\u671f":t[l].validityDate,"\u5355\u4ef7":t[l].price,"\u5ba2\u6237":t[l].clientName,"\u6570\u91cf":t[l].quantity,"\u65e5\u671f":t[l].date};n.push(r)}a.fileName="\u5546\u54c1\u6d41\u5411\u8868",a.datas=[{sheetData:n,sheetName:"\u6d41\u5411\u660e\u7ec6",sheetHeader:["\u5546\u54c1\u540d\u79f0","\u89c4\u683c","\u751f\u4ea7\u5382\u5546","\u6279\u53f7","\u6709\u6548\u671f","\u5355\u4ef7","\u5ba2\u6237","\u6570\u91cf","\u65e5\u671f"]}],new X.a(a).saveExcel()},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(L.a,null,l.a.createElement($,{formList:this.formList,handleSubmit:function(t){e.params=t,e.generateOrders()},submitButtonName:"\u751f\u6210"})),l.a.createElement(L.a,{style:{marginTop:10}},l.a.createElement(v.a,{type:"primary",icon:"download",onClick:this.downloadTemplateFile},"\u4e0b\u8f7d\u6761\u4ef6\u5217\u8868\u6a21\u7248"),l.a.createElement(v.a,{type:"primary",icon:"download",onClick:this.downloadResultToExcel},"\u4e0b\u8f7d\u7ed3\u679c")),l.a.createElement("div",{className:"content-wrap"},l.a.createElement(V.a,{columns:[{title:"\u5546\u54c1\u540d\u79f0",dataIndex:"productName"},{title:"\u89c4\u683c",dataIndex:"specification"},{title:"\u751f\u4ea7\u5382\u5546",dataIndex:"manufacturer"},{title:"\u6279\u53f7",dataIndex:"batchNumber"},{title:"\u6709\u6548\u671f",dataIndex:"validityDate"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u5ba2\u6237",dataIndex:"clientName"},{title:"\u6570\u91cf",dataIndex:"quantity"},{title:"\u65e5\u671f",dataIndex:"date"}],dataSource:this.state.list,pagination:this.state.pagination})))}}]),a}(l.a.Component),te=Object(E.b)(function(e){return{userId:e.userInfo.userId,version:e.userInfo.version}})(ee),ae=a(88),ne=(a(196),a(95)),le=(a(529),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).onRowClick=function(t,a){if("checkbox"===e.props.rowSelection){var n=e.props.selectedRowKeys,l=e.props.selectedItem,r=e.props.selectedIds;if(r){var i=r.indexOf(t.id);-1===i?(r.push(t.id),n.push(a),l.push(t)):(r.splice(i,1),l.splice(i,1),n.splice(i,1))}else r=[t.id],n=[a],l=[t];e.props.updateSelectedItem(n,l,r)}else{var o=[a],s=t;e.props.updateSelectedItem(o,s)}},e.tableInit=function(){var t=e.props.rowSelection,a={type:"radio",selectedRowKeys:e.props.selectedRowKeys,onChange:e.onSelectChange};return!1===t||null===t?t=!1:"checkbox"===t?a.type="checkbox":t="radio",l.a.createElement(V.a,Object.assign({},e.props,{bordered:!0,rowSelection:t?a:null,onRow:function(a,n){return{onClick:function(){t&&e.onRowClick(a,n)}}}}))},e}return Object(s.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,this.tableInit())}}]),a}(l.a.Component)),re={ACTION_SAVE:"user_save",ACTION_REMOVE:"user_remove",defaultUserInfo:{userId:null,username:null,level:null,version:null},action:{save:function(e){return{type:re.ACTION_SAVE,userInfo:e}},remove:function(){return{type:re.ACTION_REMOVE}}},reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re.defaultUserInfo,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case re.ACTION_SAVE:return t.userInfo||{};case re.ACTION_REMOVE:return re.defaultUserInfo;default:return e}}},ie=re,oe=z.a.Item,se=(ne.a.Group,W.a.TextArea,M.a.Option),ce=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).params={page:1,isVisible:!1},e.state={},e.formList=[{type:"UPLOAD",label:"\u5ba2\u6237\u540d\u5355",field:"file",placeholder:"\u8bf7\u4e0a\u4f20excel\u6587\u4ef6"},{type:"CHECKBOX",label:"\u8986\u76d6\u5168\u90e8",field:"override",initialValue:!1}],e.handleUpload=function(t){e.params=t;var a=e.params.override,n=e.params.file;if(n&&n.fileList[0]){var r=new window.FormData,i=n.fileList[0].originFileObj;r.append("override",a),r.append("file",i),r.append("userId",e.props.userId),r.append("version",e.props.version),K.ajax({url:"/client/batchCreate",data:{params:r,method:"post"}}).then(function(t){if(200===t.code){if(t.result){var a=t.result.map(function(e,t){return e.key=t,e});e.setState({list:a,selectedRowKeys:void 0,selectedItem:void 0,pagination:Y.pagination(t,function(t){e.params.page=t,e.setState({selectedRowKeys:void 0,selectedItem:void 0})})})}}else 501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:t.message})})}else y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u7f3a\u5c11\u53c2\u6570\uff01"),okText:"ok"})},e.listAllClients=function(){K.ajax({url:"/client/listAll",data:{params:{userId:e.props.userId,version:e.props.version},method:"get"}}).then(function(t){if(200===t.code){if(t.result){var a=t.result.map(function(e,t){return e.key=t,e});e.setState({list:a,selectedRowKeys:void 0,selectedItem:void 0,pagination:Y.pagination(t,function(t){e.params.page=t,e.setState({selectedRowKeys:void 0,selectedItem:void 0})})})}}else 501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:t.message})})},e.handleOperate=function(t){var a=e.state.selectedItem;if("list"===t)e.listAllClients(),e.setState({selectedRowKeys:void 0,selectedItem:void 0});else if("create"===t)e.setState({type:t,isVisible:!0,title:"\u521b\u5efa\u5ba2\u6237"});else if("edit"===t){if(!a)return void y.a.info({title:"\u63d0\u793a",content:"\u8bf7\u9009\u62e9\u4e00\u6761\u6570\u636e"});e.setState({type:t,isVisible:!0,title:"\u7f16\u8f91\u5ba2\u6237",clientInfo:a})}else if("delete"===t){if(!a)return void y.a.info({title:"\u63d0\u793a",content:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u5ba2\u6237"});var n=Object(ae.a)(e);y.a.confirm({title:"\u786e\u8ba4\u5220\u9664",content:"\u662f\u5426\u8981\u5220\u9664\u5f53\u524d\u9009\u4e2d\u7684\u6570\u636e\uff1f",onOk:function(){K.ajax({url:"/client/delete",data:{params:{clientId:a.clientId,userId:n.props.userId,version:n.props.version},method:"get"}}).then(function(e){200===e.code?(n.setState({isVisible:!1}),n.listAllClients()):501===e.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:e.message})})}})}},e.handleSubmit=function(){var t=e.state.type,a=e.clientForm.props.form.getFieldsValue(),n=a.clientId,r=a.clientCode,i=a.clientName,o=a.clientType;r&&i&&o?K.ajax({url:"create"===t?"/client/create":"/client/edit",data:{params:{clientId:n,clientCode:r,clientName:i,clientType:o,userId:e.props.userId,version:e.props.version},method:"post"}}).then(function(t){200===t.code?(e.clientForm.props.form.resetFields(),e.setState({isVisible:!1,selectedRowKeys:void 0,selectedItem:void 0}),e.listAllClients()):501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:t.message})}):y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u4e0d\u5f97\u6709\u7a7a\u5b57\u6bb5\uff01"),okText:"ok"})},e.downloadTemplateFile=function(){var e={fileName:"\u5ba2\u6237\u540d\u5355(\u6a21\u7248)",datas:[{sheetData:[],sheetName:"\u5ba2\u6237\u540d\u5355",sheetHeader:["\u5ba2\u6237\u4ee3\u7801 (\u5fc5\u586b)","\u5ba2\u6237\u540d\u79f0 (\u5fc5\u586b)","\u5ba2\u6237\u7c7b\u578b (\u5fc5\u586b)"]}]};new X.a(e).saveExcel()},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(L.a,null,l.a.createElement($,{formList:this.formList,handleSubmit:this.handleUpload,submitButtonName:"\u5bfc\u5165"})),l.a.createElement(L.a,{style:{marginTop:10}},l.a.createElement(v.a,{type:"primary",icon:"download",onClick:this.downloadTemplateFile},"\u4e0b\u8f7d\u5ba2\u6237\u540d\u5355\u6a21\u7248"),l.a.createElement(v.a,{type:"primary",icon:"search",style:{marginLeft:10},onClick:function(){return e.handleOperate("list")}},"\u663e\u793a\u6240\u6709\u5ba2\u6237"),l.a.createElement(v.a,{type:"primary",icon:"plus",style:{marginLeft:10},onClick:function(){return e.handleOperate("create")}},"\u521b\u5efa\u5ba2\u6237"),l.a.createElement(v.a,{type:"primary",icon:"edit",style:{marginLeft:10},onClick:function(){return e.handleOperate("edit")}},"\u7f16\u8f91\u5ba2\u6237"),l.a.createElement(v.a,{type:"primary",icon:"delete",style:{marginLeft:10},onClick:function(){return e.handleOperate("delete")}},"\u5220\u9664\u5ba2\u6237")),l.a.createElement("div",{className:"content-wrap"},l.a.createElement(le,{updateSelectedItem:Y.updateSelectedItem.bind(this),columns:[{title:"\u5ba2\u6237\u4ee3\u7801",dataIndex:"clientCode"},{title:"\u5ba2\u6237\u540d\u79f0",dataIndex:"clientName"},{title:"\u5ba2\u6237\u7c7b\u578b",dataIndex:"clientType"}],dataSource:this.state.list,pagination:this.state.pagination,selectedRowKeys:this.state.selectedRowKeys,selectedItem:this.state.selectedItem,rowSelection:"radio",rowKey:function(e){return e.id}})),l.a.createElement(y.a,{title:this.state.title,visible:this.state.isVisible,onOk:this.handleSubmit,onCancel:function(){e.clientForm.props.form.resetFields(),e.setState({isVisible:!1})},width:600},l.a.createElement(de,{type:this.state.type,clientInfo:this.state.clientInfo,wrappedComponentRef:function(t){e.clientForm=t}})))}}]),a}(l.a.Component),ue=Object(E.b)(function(e){return{userId:e.userInfo.userId,version:e.userInfo.version}})(ce),de=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.type,t=this.props.clientInfo||{},a=this.props.form.getFieldDecorator,n={labelCol:{span:5},wrapperCol:{span:15}};return l.a.createElement(z.a,{layout:"horizontal"},l.a.createElement(oe,{label:"\u5ba2\u6237ID",style:{display:"none"}},a("clientId","edit"===e?{initialValue:t.clientId}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u5ba2\u6237ID"}))),l.a.createElement(oe,Object.assign({label:"\u5ba2\u6237\u4ee3\u7801"},n),a("clientCode","edit"===e?{initialValue:t.clientCode}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u5ba2\u6237\u4ee3\u7801"}))),l.a.createElement(oe,Object.assign({label:"\u5ba2\u6237\u540d\u79f0"},n),a("clientName","edit"===e?{initialValue:t.clientName}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u5ba2\u6237\u540d\u79f0"}))),l.a.createElement(oe,Object.assign({label:"\u5ba2\u6237\u7c7b\u578b"},n),a("clientType","edit"===e?{initialValue:t.clientType}:{initialValue:void 0})(l.a.createElement(M.a,{placeholder:"\u8bf7\u9009\u62e9\u5ba2\u6237\u7c7b\u578b"},l.a.createElement(se,{value:"\u96f6\u552e\u836f\u5e97"},"\u96f6\u552e\u836f\u5e97"),l.a.createElement(se,{value:"\u6279\u53d1\u7ecf\u8425"},"\u6279\u53d1\u7ecf\u8425"),l.a.createElement(se,{value:"\u533b\u7597\u673a\u6784"},"\u533b\u7597\u673a\u6784")))))}}]),a}(l.a.Component);de=z.a.create({})(de);var pe=a(548),me=a(549),fe=(a(530),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={userId:null,username:null,password:null,level:null,version:null},e.login=function(){var t=e.state,a=t.username,n=t.password;if(!a||!n)return y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u7528\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u5f97\u4e3a\u7a7a\uff01"),okText:"ok"});K.ajax({url:"/user/authenticate",data:{params:{username:a,password:n},method:"post"}}).then(function(t){200===t.code?(e.setState({userId:t.userId,level:t.level,version:t.version}),e.props.dispatch(ie.action.save({userId:e.state.userId,username:e.state.username,level:e.state.level,version:e.state.version})),window.location.href="http://120.79.61.68"):y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,t.message),okText:"ok"})})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"login-page"},l.a.createElement("dl",{className:"login-wrapper"},l.a.createElement("dt",null,l.a.createElement("b",null,"\u6d41\u5411\u751f\u6210\u7cfb\u7edf")),l.a.createElement("dd",{className:"login-box"},l.a.createElement("div",{className:"login-tips"},l.a.createElement(l.a.Fragment,null)),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(W.a,{type:"text",name:"username",placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d",onChange:function(t){return e.setState({username:t.target.value})}})),l.a.createElement("li",null,l.a.createElement(W.a.Password,{name:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",iconRender:function(e){return e?l.a.createElement(pe.a,null):l.a.createElement(me.a,null)},onChange:function(t){return e.setState({password:t.target.value})}})),l.a.createElement("li",null,l.a.createElement("button",{onClick:this.login.bind(this)},"\u767b\u5f55"))))))}}]),a}(l.a.Component)),he=Object(E.b)()(fe),ve=(a(531),a(249)),ye=a(550),Ee=z.a.Item,be=M.a.Option,ge=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).params={page:1,isVisible:!1},e.state={},e.listAllUsers=function(){K.ajax({url:"/user/listAll",data:{params:{userId:e.props.userId,version:e.props.version},method:"get"}}).then(function(t){if(200===t.code){if(t.result){var a=t.result.map(function(e,t){return e.key=t,e});e.setState({list:a,selectedRowKeys:void 0,selectedItem:void 0,pagination:Y.pagination(t,function(t){e.params.page=t,e.setState({selectedRowKeys:void 0,selectedItem:void 0})})})}}else 501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:t.message})})},e.handleOperate=function(t){var a=e.state.selectedItem;if("list"===t)e.listAllUsers(),e.setState({selectedRowKeys:void 0,selectedItem:void 0});else if("create"===t)e.setState({type:t,isVisible:!0,title:"\u521b\u5efa\u7528\u6237"});else if("edit"===t){if(!a)return void y.a.info({title:"\u63d0\u793a",content:"\u8bf7\u9009\u62e9\u4e00\u6761\u6570\u636e"});e.setState({type:t,isVisible:!0,title:"\u7f16\u8f91\u7528\u6237",userInfo:a})}else if("delete"===t){if(!a)return void y.a.info({title:"\u63d0\u793a",content:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u7528\u6237"});var n=Object(ae.a)(e);y.a.confirm({title:"\u786e\u8ba4\u5220\u9664",content:"\u662f\u5426\u8981\u5220\u9664\u5f53\u524d\u9009\u4e2d\u7684\u6570\u636e\uff1f",onOk:function(){K.ajax({url:"/user/delete",data:{params:{userId:a.userId,operatingUserId:n.props.userId,operatingVersion:n.props.version},method:"get"}}).then(function(e){200===e.code?(n.setState({isVisible:!1}),n.listAllUsers()):501===e.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):y.a.info({title:"\u63d0\u793a",content:e.message})})}})}},e.handleSubmit=function(){var t=e.state.type,a=e.userForm.props.form.getFieldsValue(),n=a.userId,r=a.username,i=a.password,o=a.level;if(r&&i&&o>0){if(/.*[\u4e00-\u9fa5]+.*$/.test(i))return y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u4e2d\u6587\u5b57\u7b26\uff01"),okText:"ok"});K.ajax({url:"create"===t?"/user/create":"/user/edit",data:{params:{userId:n,username:r,password:i,level:o,operatingUserId:e.props.userId,operatingVersion:e.props.version},method:"post"}}).then(function(t){200===t.code?(e.userForm.props.form.resetFields(),e.setState({isVisible:!1,selectedRowKeys:void 0,selectedItem:void 0}),e.listAllUsers()):501===t.code?(localStorage.clear(),window.location.href="http://120.79.61.68"):(t.code,y.a.info({title:"\u63d0\u793a",content:t.message}))})}else y.a.warn({title:"\u63d0\u793a",content:l.a.createElement("span",null,"\u4e0d\u5f97\u6709\u7a7a\u5b57\u6bb5\uff01"),okText:"ok"})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(L.a,null,l.a.createElement(v.a,{type:"primary",icon:"search",style:{marginLeft:10},onClick:function(){return e.handleOperate("list")}},"\u663e\u793a\u6240\u6709\u7528\u6237"),l.a.createElement(v.a,{type:"primary",icon:"plus",style:{marginLeft:10},onClick:function(){return e.handleOperate("create")}},"\u521b\u5efa\u7528\u6237"),l.a.createElement(v.a,{type:"primary",icon:"edit",style:{marginLeft:10},onClick:function(){return e.handleOperate("edit")}},"\u7f16\u8f91\u7528\u6237"),l.a.createElement(v.a,{type:"primary",icon:"delete",style:{marginLeft:10},onClick:function(){return e.handleOperate("delete")}},"\u5220\u9664\u7528\u6237")),l.a.createElement("div",{className:"content-wrap"},l.a.createElement(le,{updateSelectedItem:Y.updateSelectedItem.bind(this),columns:[{title:"\u7528\u6237\u540d",dataIndex:"username"},{title:"\u5bc6\u7801",dataIndex:"password"},{title:"\u6743\u9650\u7b49\u7ea7",dataIndex:"level"}],dataSource:this.state.list,pagination:this.state.pagination,selectedRowKeys:this.state.selectedRowKeys,selectedItem:this.state.selectedItem,rowSelection:"radio",rowKey:function(e){return e.id}})),l.a.createElement(y.a,{title:this.state.title,visible:this.state.isVisible,onOk:this.handleSubmit,onCancel:function(){e.userForm.props.form.resetFields(),e.setState({isVisible:!1})},width:600},l.a.createElement(Ie,{type:this.state.type,userInfo:this.state.userInfo,wrappedComponentRef:function(t){e.userForm=t}})))}}]),a}(l.a.Component),we=Object(E.b)(function(e){return{userId:e.userInfo.userId,version:e.userInfo.version}})(ge),Ie=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.type,t=this.props.userInfo||{},a=this.props.form.getFieldDecorator,n={labelCol:{span:5},wrapperCol:{span:15}};return l.a.createElement(z.a,{layout:"horizontal"},l.a.createElement(Ee,{label:"\u7528\u6237ID",style:{display:"none"}},a("userId","edit"===e?{initialValue:t.userId}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u7528\u6237ID"}))),l.a.createElement(Ee,Object.assign({label:"\u7528\u6237\u540d"},n),a("username","edit"===e?{initialValue:t.username}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d",maxlength:"20"}))),l.a.createElement(Ee,Object.assign({label:"\u5bc6\u7801"},n),a("password","edit"===e?{initialValue:t.password}:{initialValue:void 0})(l.a.createElement(W.a,{type:"text",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801 (\u4e0d\u542b\u4e2d\u6587\u5b57\u7b26)",maxlength:"20"}))),l.a.createElement(Ee,{label:"\u6743\u9650\u7b49\u7ea7",labelCol:{span:5},wrapperCol:{span:17}},a("level","edit"===e?{initialValue:t.level}:{initialValue:void 0})(l.a.createElement(M.a,{placeholder:"\u8bf7\u9009\u62e9\u6743\u9650\u7b49\u7ea7",style:{display:"inline",float:"left",width:345,marginTop:5}},l.a.createElement(be,{value:1},"1"),l.a.createElement(be,{value:2},"2"),l.a.createElement(be,{value:3},"3"))),l.a.createElement(ve.a,{content:l.a.createElement("div",{style:{width:"200px",height:"auto",fontSize:"12px",lineHeight:"17px",color:"#757575"}},"1: \u7ba1\u7406\u5458\uff0c\u62e5\u6709\u6240\u6709\u6743\u9650 ",l.a.createElement("br",null),'2: \u5458\u5de5\uff0c\u62e5\u6709\u9664"\u7528\u6237\u7ba1\u7406"\u4e4b\u5916\u7684\u6240\u6709\u6743\u9650 ',l.a.createElement("br",null),'3: \u666e\u901a\u7528\u6237\uff0c\u53ea\u62e5\u6709"\u6d41\u5411\u751f\u6210"\u6743\u9650'),title:"\u7b49\u7ea7\u8bf4\u660e",placement:"rightTop",trigger:"hover"},l.a.createElement("div",{style:{display:"inline",float:"left",marginLeft:"10px",marginTop:"3px"}},l.a.createElement(ye.a,{style:{fontSize:"16px"}})))))}}]),a}(l.a.Component);Ie=z.a.create({})(Ie);l.a.Component;var Oe=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).updateTimestamp=function(){var e=localStorage.getItem("timestamp"),t=Date.now();e&&t-Number(e)>2592e5?(localStorage.clear(),window.location.href="http://120.79.61.68"):localStorage.setItem("timestamp",t.toString())},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return this.updateTimestamp(),l.a.createElement(d.a,null,l.a.createElement(m,null,l.a.createElement(p.d,null,l.a.createElement(p.b,{path:"/login",component:he}),l.a.createElement(p.b,{path:"/",render:function(){return e.props.username?l.a.createElement(T,null,l.a.createElement(p.d,null,l.a.createElement(p.b,{path:"/order",component:te}),e.props.level<=2?l.a.createElement(p.b,{path:"/client",component:ue}):void 0,1===e.props.level?l.a.createElement(p.b,{path:"/user",component:we}):void 0,l.a.createElement(p.a,{to:"/order"}))):l.a.createElement(p.a,{to:"/login"})}}))))}}]),a}(l.a.Component),ke=Object(E.b)(function(e){return{username:e.userInfo.username,level:e.userInfo.level}})(Oe),je=a(65),Se=a(134),Ce=a(250),xe=a(251),Ne=a.n(xe),Te=(a(544),Object(je.combineReducers)({userInfo:ie.reducer,menu:S.reducer})),Ve={key:"root",storage:Ne.a,transforms:[Object(Ce.encryptTransform)({secretKey:"my-super-secret-key",onError:function(e){}})],blacklist:["menu"]},Le=Object(Se.persistReducer)(Ve,Te),De=Object(je.createStore)(Le),Re=Object(Se.persistStore)(De),Ae=a(252);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(E.a,{store:De},l.a.createElement(Ae.PersistGate,{loading:null,persistor:Re},l.a.createElement(ke,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[257,1,2]]]);