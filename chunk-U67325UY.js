import{k as s,n as i}from"./chunk-JZVI2P5Z.js";import{M as o,R as n}from"./chunk-FCHZOJI3.js";var f=(()=>{class r{constructor(t){this.http=t}getUserIp(){return this.http.get("https://api.ipify.org?format=json")}sendUserData(t){return this.http.post(`${i.backendUrl}/user`,t)}getStat(t,e,p){return this.http.get(`${i.backendUrl}/logs?filter=${t}&ip=${e}&page=${p}`)}getLocation(t){return this.http.get(`https://ipapi.co/${t}/json/`)}static{this.\u0275fac=function(e){return new(e||r)(n(s))}}static{this.\u0275prov=o({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{f as a};
