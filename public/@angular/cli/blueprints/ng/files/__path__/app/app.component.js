"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (inlineTemplate) {
     %  >
        template;
    "\n    <h1>\n      Welcome to {{title}}!!\n    </h1><% if (routing) { %>\n    <router-outlet></router-outlet><% } %>\n  ",  % ;
}
else {
     %  >
        templateUrl;
    './app.component.html',  % ;
}
 %  >  % ;
if (inlineStyle) {
     %  >
        styles;
    [] <  % ;
}
else {
     %  >
        styleUrls;
    ['./app.component.<%= styleExt %>'] <  % ;
}
 %  >
;
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = '<%= prefix %>';
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map