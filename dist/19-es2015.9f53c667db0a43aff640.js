(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{fm87:function(t,e,a){"use strict";a.r(e),a.d(e,"ReportsModule",function(){return v});var r=a("ofXK"),o=a("tyNb"),n=a("AytR"),i=a("3Pt+"),s=a("fXoL"),c=a("jhN1"),b=a("tk/3"),p=a("OlR4"),d=a("kmnG"),l=a("iadO"),m=a("bTqV");function u(t,e){if(1&t&&(s.Ub(0,"object",15),s.Ub(1,"p"),s.Jc(2,"Cannot View Report. You can Download report "),s.Ub(3,"a",16),s.Jc(4,"Here"),s.Tb(),s.Tb(),s.Tb()),2&t){const t=s.gc();s.oc("data",t.pdfData,s.Bc),s.Cb(3),s.oc("href",t.pdfUrl,s.Cc)}}let f=(()=>{class t{constructor(t,e,a){this.sanitizer=t,this.http=e,this.common=a,this.hasData=!1}ngOnInit(){this.common.mainData.next({header:"Registrations",treeView:"liReport",subTreeView:"",menu:"liRegReport"});const t=new Date;this.currentDate=t,this.dateRange=new i.j({startDate:new i.h(t),endDate:new i.h(t)})}format(t){return Object(r.x)(t,"yyyy-MM-dd","en-IN","IST")}getData(){this.hasData=!1;const t=this.format(this.dateRange.get("startDate").value),e=this.format(this.dateRange.get("endDate").value);this.pdfUrl=`${n.a.normUrl}reports/registrations/${t}/${e}`,this.subscription$=this.http.get(this.pdfUrl+"/yes",{responseType:"text"}).subscribe({next:t=>{this.pdfData=this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${t}`),this.hasData=!0}})}ngOnDestroy(){void 0!==this.subscription$&&this.subscription$.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Ob(c.b),s.Ob(b.b),s.Ob(p.a))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-registrations"]],decls:19,vars:5,consts:[[1,"container","mt-1"],[1,"background-All","p-2"],[1,"row","offset-lg-1"],[1,"col-md-3"],["color","accent","appearance","fill"],[3,"formGroup","rangePicker","max"],["matStartDate","","formControlName","startDate","readonly",""],["matEndDate","","formControlName","endDate","readonly",""],["matSuffix","",3,"for"],["picker",""],[1,"col","mt-2"],["mat-raised-button","","color","primary",3,"click"],[1,"row","mt-1"],[1,"embed-responsive","embed-responsive-16by9","col-12"],["type","application/pdf",3,"data",4,"ngIf"],["type","application/pdf",3,"data"],["download","",3,"href"]],template:function(t,e){if(1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"div",3),s.Ub(4,"mat-form-field",4),s.Ub(5,"mat-label"),s.Jc(6,"Date"),s.Tb(),s.Ub(7,"mat-date-range-input",5),s.Pb(8,"input",6),s.Pb(9,"input",7),s.Tb(),s.Pb(10,"mat-datepicker-toggle",8),s.Pb(11,"mat-date-range-picker",null,9),s.Tb(),s.Tb(),s.Ub(13,"div",10),s.Ub(14,"button",11),s.cc("click",function(){return e.getData()}),s.Jc(15,"Show"),s.Tb(),s.Tb(),s.Tb(),s.Ub(16,"div",12),s.Ub(17,"div",13),s.Hc(18,u,5,2,"object",14),s.Tb(),s.Tb(),s.Tb(),s.Tb()),2&t){const t=s.wc(12);s.Cb(7),s.oc("formGroup",e.dateRange)("rangePicker",t)("max",e.currentDate),s.Cb(3),s.oc("for",t),s.Cb(8),s.oc("ngIf",e.hasData)}},directives:[d.c,d.f,l.a,i.s,i.k,l.h,i.d,i.r,i.i,l.g,l.f,d.g,l.b,m.b,r.n],styles:[""]}),t})();var h=a("d3UM"),g=a("FKr1");function D(t,e){if(1&t&&(s.Ub(0,"object",20),s.Ub(1,"p"),s.Jc(2,"Cannot View Report. You can Download report "),s.Ub(3,"a",21),s.Jc(4,"Here"),s.Tb(),s.Tb(),s.Tb()),2&t){const t=s.gc();s.oc("data",t.pdfData,s.Bc),s.Cb(3),s.oc("href",t.pdfUrl,s.Cc)}}const U=[{path:"registrations",component:f},{path:"ip-report",component:(()=>{class t{constructor(t,e,a){this.common=t,this.http=e,this.domSanitizer=a}ngOnInit(){this.common.mainData.next({header:"IP Reports",treeView:"liReport",subTreeView:"",menu:"liIPReport"}),this.hasData=!1;const t=new Date;this.currentDate=t,this.formGroup=new i.j({type:new i.h("admission"),startDate:new i.h(t),endDate:new i.h(t)})}format(t){return Object(r.x)(t,"y-MM-dd","en-IN","IST")}getData(){this.hasData=!1;const t=this.formGroup.get("type").value,e=this.format(this.formGroup.get("startDate").value),a=this.format(this.formGroup.get("endDate").value);this.pdfUrl=`${n.a.normUrl}reports/ip-reports/${t}/${e}/${a}`,this.subscription=this.http.get(this.pdfUrl+"/yes",{responseType:"text"}).subscribe({next:t=>{this.pdfData=this.domSanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${t}`),this.hasData=!0}})}ngOnDestroy(){void 0!==this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Ob(p.a),s.Ob(b.b),s.Ob(c.b))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-ip-reports"]],decls:29,vars:5,consts:[[1,"container","mt-1"],[1,"background-All","p-2"],[3,"formGroup"],[1,"row","offset-lg-1"],[1,"col-md-2"],["color","accent","appearance","fill"],["formControlName","type"],["value","admission"],["value","discharge"],[1,"col-md-3"],[3,"rangePicker","max"],["matStartDate","","formControlName","startDate","readonly",""],["matEndDate","","formControlName","endDate","readonly",""],["matSuffix","",3,"for"],["picker",""],[1,"col","mt-2"],["mat-raised-button","","color","primary",3,"click"],[1,"row","mt-1"],[1,"embed-responsive","embed-responsive-16by9","col-12"],["type","application/pdf",3,"data",4,"ngIf"],["type","application/pdf",3,"data"],["download","",3,"href"]],template:function(t,e){if(1&t&&(s.Ub(0,"div",0),s.Ub(1,"div",1),s.Ub(2,"form",2),s.Ub(3,"div",3),s.Ub(4,"div",4),s.Ub(5,"mat-form-field",5),s.Ub(6,"mat-label"),s.Jc(7,"Type"),s.Tb(),s.Ub(8,"mat-select",6),s.Ub(9,"mat-option",7),s.Jc(10,"IP Admission"),s.Tb(),s.Ub(11,"mat-option",8),s.Jc(12,"IP Discharge"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(13,"div",9),s.Ub(14,"mat-form-field",5),s.Ub(15,"mat-label"),s.Jc(16,"Date"),s.Tb(),s.Ub(17,"mat-date-range-input",10),s.Pb(18,"input",11),s.Pb(19,"input",12),s.Tb(),s.Pb(20,"mat-datepicker-toggle",13),s.Pb(21,"mat-date-range-picker",null,14),s.Tb(),s.Tb(),s.Ub(23,"div",15),s.Ub(24,"button",16),s.cc("click",function(){return e.getData()}),s.Jc(25,"Show"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(26,"div",17),s.Ub(27,"div",18),s.Hc(28,D,5,2,"object",19),s.Tb(),s.Tb(),s.Tb(),s.Tb()),2&t){const t=s.wc(22);s.Cb(2),s.oc("formGroup",e.formGroup),s.Cb(15),s.oc("rangePicker",t)("max",e.currentDate),s.Cb(3),s.oc("for",t),s.Cb(8),s.oc("ngIf",e.hasData)}},directives:[i.A,i.s,i.k,d.c,d.f,h.a,i.r,i.i,g.j,l.a,l.h,i.d,l.g,l.f,d.g,l.b,m.b,r.n],styles:[""]}),t})()},{path:"collections",loadChildren:()=>a.e(18).then(a.bind(null,"UCJ2")).then(t=>t.CollectionsModule)}];let T=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({imports:[[o.h.forChild(U)],o.h]}),t})();var y=a("qFsG");let v=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({providers:[{provide:g.d,useValue:"en-GB"}],imports:[[r.c,i.x,T,d.e,y.c,h.b,l.e,g.i,m.c]]}),t})()}}]);