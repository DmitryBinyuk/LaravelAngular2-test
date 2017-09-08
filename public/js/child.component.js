System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ChildComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ChildComponent = (function () {
                function ChildComponent() {
                    this.name = "Евгений";
                    this.onChanged = new core_1.EventEmitter();
                }
                Object.defineProperty(ChildComponent.prototype, "userAge", {
                    get: function () { return this._userAge; },
                    set: function (age) {
                        this._userAge = age;
                    },
                    enumerable: true,
                    configurable: true
                });
                ChildComponent.prototype.change = function (increased) {
                    this.onChanged.emit(increased);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], ChildComponent.prototype, "userAge", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ChildComponent.prototype, "onChanged", void 0);
                ChildComponent = __decorate([
                    core_1.Component({
                        selector: 'child-comp',
                        template: "<h2>(\u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442)\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C {{name}}!</h2>\n\t\t<p>\u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F (\u0442\u044F\u043D\u0435\u043C \u0438\u0437 \u043F\u0430\u0440\u0435\u043D\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430): {{userAge}}</p>\n\t\t<button (click)=\"change(true)\">+</button>\n\t\t<button (click)=\"change(false)\">-</button>",
                        styles: ["h2, p {color:red;}"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChildComponent);
                return ChildComponent;
            }());
            exports_1("ChildComponent", ChildComponent);
        }
    }
});

//# sourceMappingURL=child.component.js.map
