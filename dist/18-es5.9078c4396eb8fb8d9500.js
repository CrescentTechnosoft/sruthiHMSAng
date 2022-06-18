!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{UCJ2:function(e,n,o){"use strict";o.r(n),o.d(n,"CollectionsModule",function(){return M});var i=o("ofXK"),c=o("3Pt+"),r=o("tyNb"),s=o("AytR"),b=o("fXoL"),l=o("jhN1"),u=o("OlR4"),p=o("tk/3"),f=o("kmnG"),h=o("iadO"),d=o("bTqV");function m(t,e){if(1&t&&(b.Ub(0,"object",15),b.Ub(1,"p"),b.Jc(2,"Cannot View Report. You can Download report "),b.Ub(3,"a",16),b.Jc(4,"Here"),b.Tb(),b.Tb(),b.Tb()),2&t){var a=b.gc();b.oc("data",a.pdfData,b.Bc),b.Cb(3),b.oc("href",a.pdfUrl,b.Cc)}}var v,y=((v=function(){function e(a,n,o){t(this,e),this.sanitizer=a,this.common=n,this.http=o,this.hasData=!1}return a(e,[{key:"ngOnInit",value:function(){this.common.mainData.next({header:"Overall Collections",treeView:"liReport",subTreeView:"liCollectionsRep",menu:"liCollReport"});var t=new Date;this.currentDate=t,this.dateRange=new c.j({startDate:new c.h(t),endDate:new c.h(t)})}},{key:"format",value:function(t){return Object(i.x)(t,"yyyy-MM-dd","en-IN","IST")}},{key:"getData",value:function(){var t=this;this.hasData=!1;var e=this.format(this.dateRange.get("startDate").value),a=this.format(this.dateRange.get("endDate").value);this.pdfUrl="".concat(s.a.normUrl,"reports/overall-collections/").concat(e,"/").concat(a),this.subscription$=this.http.get(this.pdfUrl+"/yes",{responseType:"text"}).subscribe({next:function(e){t.pdfData=t.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64,".concat(e)),t.hasData=!0}})}},{key:"ngOnDestroy",value:function(){void 0!==this.subscription$&&this.subscription$.unsubscribe()}}]),e}()).\u0275fac=function(t){return new(t||v)(b.Ob(l.b),b.Ob(u.a),b.Ob(p.b))},v.\u0275cmp=b.Ib({type:v,selectors:[["app-overall-collection-report"]],decls:19,vars:5,consts:[[1,"container","mt-1"],[1,"background-All","p-2"],[1,"row","offset-lg-1"],[1,"col-md-3"],["color","accent","appearance","fill"],[3,"formGroup","rangePicker","max"],["matStartDate","","formControlName","startDate","readonly",""],["matEndDate","","formControlName","endDate","readonly",""],["matSuffix","",3,"for"],["picker",""],[1,"col","mt-2"],["mat-raised-button","","color","primary",3,"click"],[1,"row","mt-1"],[1,"embed-responsive","embed-responsive-16by9","col-12"],["type","application/pdf",3,"data",4,"ngIf"],["type","application/pdf",3,"data"],["download","",3,"href"]],template:function(t,e){if(1&t&&(b.Ub(0,"div",0),b.Ub(1,"div",1),b.Ub(2,"div",2),b.Ub(3,"div",3),b.Ub(4,"mat-form-field",4),b.Ub(5,"mat-label"),b.Jc(6,"Date"),b.Tb(),b.Ub(7,"mat-date-range-input",5),b.Pb(8,"input",6),b.Pb(9,"input",7),b.Tb(),b.Pb(10,"mat-datepicker-toggle",8),b.Pb(11,"mat-date-range-picker",null,9),b.Tb(),b.Tb(),b.Ub(13,"div",10),b.Ub(14,"button",11),b.cc("click",function(){return e.getData()}),b.Jc(15,"Show"),b.Tb(),b.Tb(),b.Tb(),b.Ub(16,"div",12),b.Ub(17,"div",13),b.Hc(18,m,5,2,"object",14),b.Tb(),b.Tb(),b.Tb(),b.Tb()),2&t){var a=b.wc(12);b.Cb(7),b.oc("formGroup",e.dateRange)("rangePicker",a)("max",e.currentDate),b.Cb(3),b.oc("for",a),b.Cb(8),b.oc("ngIf",e.hasData)}},directives:[f.c,f.f,h.a,c.s,c.k,h.h,c.d,c.r,c.i,h.g,h.f,f.g,h.b,d.b,i.n],styles:["div.ui-datepicker[_ngcontent-%COMP%]{font-size:15px}"]}),v),g=o("d3UM"),U=o("FKr1");function T(t,e){if(1&t&&(b.Ub(0,"mat-option",6),b.Jc(1),b.Tb()),2&t){var a=e.$implicit;b.oc("value",a),b.Cb(1),b.Kc(a)}}function w(t,e){if(1&t&&(b.Ub(0,"mat-option",6),b.Jc(1),b.Tb()),2&t){var a=e.$implicit;b.oc("value",a.number),b.Cb(1),b.Kc(a.name)}}function D(t,e){if(1&t&&(b.Ub(0,"object",13),b.Ub(1,"p"),b.Jc(2,"Cannot View Report. You can Download report "),b.Ub(3,"a",14),b.Jc(4,"Here"),b.Tb(),b.Tb(),b.Tb()),2&t){var a=b.gc();b.oc("data",a.pdfData,b.Bc),b.Cb(3),b.oc("href",a.pdfUrl,b.Cc)}}var C,k,O,J=[{path:"overall",component:y},{path:"monthly",component:(C=function(){function e(a,n,o){t(this,e),this.common=a,this.http=n,this.sanitizer=o,this.hasData=!1}return a(e,[{key:"ngOnInit",value:function(){this.common.mainData.next({header:"Monthly Collections",treeView:"liReport",subTreeView:"liCollectionsRep",menu:"liMonthlyColl"}),this.year=2021,this.month=1,this.years=[],this.months=[];for(var t=new Date,e=t.getMonth(),a=t.getFullYear();a>2021;a--)this.years.push(a);for(var n=1;n<12;n++)t.setMonth(n),this.months.push({number:n+1,name:t.toLocaleString("default",{month:"short"})});this.month=e+1}},{key:"getData",value:function(){var t=this;this.hasData=!1,this.pdfUrl="".concat(s.a.normUrl,"reports/monthly-collections/").concat(this.year,"/").concat(this.month),this.subscription=this.http.get(this.pdfUrl+"/yes",{responseType:"text"}).subscribe({next:function(e){t.pdfData=t.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64,".concat(e)),t.hasData=!0}})}},{key:"ngOnDestroy",value:function(){void 0!==this.subscription&&this.subscription.unsubscribe()}}]),e}(),C.\u0275fac=function(t){return new(t||C)(b.Ob(u.a),b.Ob(p.b),b.Ob(l.b))},C.\u0275cmp=b.Ib({type:C,selectors:[["app-monthly-collections"]],decls:25,vars:7,consts:[[1,"container","mt-1"],[1,"background-All","p-2"],[1,"row","offset-lg-1"],[1,"col-md-2"],["color","accent","appearance","fill"],[3,"value","valueChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"],[1,"col-lg-3","mt-2"],["mat-raised-button","","color","primary",3,"click"],[1,"row","mt-1"],[1,"embed-responsive","embed-responsive-16by9","col-12"],["type","application/pdf",3,"data",4,"ngIf"],["type","application/pdf",3,"data"],["download","",3,"href"]],template:function(t,e){1&t&&(b.Ub(0,"div",0),b.Ub(1,"div",1),b.Ub(2,"div",2),b.Ub(3,"div",3),b.Ub(4,"mat-form-field",4),b.Ub(5,"mat-label"),b.Jc(6,"Year"),b.Tb(),b.Ub(7,"mat-select",5),b.cc("valueChange",function(t){return e.year=t}),b.Ub(8,"mat-option",6),b.Jc(9,"2021"),b.Tb(),b.Hc(10,T,2,2,"mat-option",7),b.Tb(),b.Tb(),b.Tb(),b.Ub(11,"div",3),b.Ub(12,"mat-form-field",4),b.Ub(13,"mat-label"),b.Jc(14,"Month"),b.Tb(),b.Ub(15,"mat-select",5),b.cc("valueChange",function(t){return e.month=t}),b.Ub(16,"mat-option",6),b.Jc(17,"Jan"),b.Tb(),b.Hc(18,w,2,2,"mat-option",7),b.Tb(),b.Tb(),b.Tb(),b.Ub(19,"div",8),b.Ub(20,"button",9),b.cc("click",function(){return e.getData()}),b.Jc(21,"Show"),b.Tb(),b.Tb(),b.Tb(),b.Ub(22,"div",10),b.Ub(23,"div",11),b.Hc(24,D,5,2,"object",12),b.Tb(),b.Tb(),b.Tb(),b.Tb()),2&t&&(b.Cb(7),b.oc("value",e.year),b.Cb(1),b.oc("value",2021),b.Cb(2),b.oc("ngForOf",e.years),b.Cb(5),b.oc("value",e.month),b.Cb(1),b.oc("value",1),b.Cb(2),b.oc("ngForOf",e.months),b.Cb(6),b.oc("ngIf",e.hasData))},directives:[f.c,f.f,g.a,U.j,i.m,d.b,i.n],styles:[""]}),C)}],R=((k=function e(){t(this,e)}).\u0275fac=function(t){return new(t||k)},k.\u0275mod=b.Mb({type:k}),k.\u0275inj=b.Lb({imports:[[r.h.forChild(J)],r.h]}),k),x=o("qFsG"),M=((O=function e(){t(this,e)}).\u0275fac=function(t){return new(t||O)},O.\u0275mod=b.Mb({type:O}),O.\u0275inj=b.Lb({providers:[{provide:U.d,useValue:"en-GB"}],imports:[[i.c,c.x,R,f.e,x.c,g.b,h.e,U.i,d.c]]}),O)}}])}();