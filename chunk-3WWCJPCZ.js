import{a as u}from"./chunk-KTRM3JUC.js";import"./chunk-JZVI2P5Z.js";import{Na as p,Oa as S,Pa as t,Qa as e,Va as i,Wa as s,qa as o,ua as d,v as c,ya as l}from"./chunk-FCHZOJI3.js";var v=(n,m)=>m.dateTime;function x(n,m){if(n&1&&(t(0,"tr")(1,"td"),i(2),e(),t(3,"td"),i(4),e(),t(5,"td"),i(6),e(),t(7,"td"),i(8),e()()),n&2){let a=m.$implicit;o(2),s(a.ip),o(2),s(a.os),o(2),s(a.browser),o(2),s(a.dateTime)}}var C=(()=>{class n{constructor(a){this.userService=a,this.data=[],c(5e3).subscribe(()=>this.userService.getStat().subscribe(r=>{this.data=r}))}static{this.\u0275fac=function(r){return new(r||n)(d(u))}}static{this.\u0275cmp=l({type:n,selectors:[["stat-component"]],decls:15,vars:0,consts:[[1,"wrapper","stat"],[1,"user-table"]],template:function(r,f){r&1&&(t(0,"section",0)(1,"table",1)(2,"thead")(3,"tr")(4,"th"),i(5,"IP Address"),e(),t(6,"th"),i(7,"Operating System"),e(),t(8,"th"),i(9,"Browser"),e(),t(10,"th"),i(11,"Date & Time"),e()()(),t(12,"tbody"),p(13,x,9,4,"tr",null,v),e()()()),r&2&&(o(13),S(f.data))},encapsulation:2})}}return n})();export{C as StatisticsComponent};
