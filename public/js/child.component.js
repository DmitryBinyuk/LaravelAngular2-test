System.register(['@angular/core', './data.service'], function(exports_1, context_1) {
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
    var core_1, data_service_1;
    var ChildComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            ChildComponent = (function () {
                function ChildComponent(dataService) {
                    this.dataService = dataService;
                    this.items = [];
                    this.count = 1;
                    this.name = "Евгений";
                    this.onChanged = new core_1.EventEmitter();
                    this.users = [];
                    this.visibility = true;
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
                //onInit and Co
                ChildComponent.prototype.ngOnInit = function () {
                    // this.items = this.dataService.getData();
                    var _this = this;
                    // this.dataService.getData().subscribe((data: Response) => this.user=data.json());
                    this.dataService.getUsers().subscribe(function (data) { return _this.users = data; });
                };
                ChildComponent.prototype.ngOnChanges = function (changes) {
                    this.log("OnChanges");
                    for (var propName in changes) {
                        var chng = changes[propName];
                        var cur = JSON.stringify(chng.currentValue);
                        var prev = JSON.stringify(chng.previousValue);
                        this.log("child: " + propName + ": currentValue = " + cur + ", previousValue = " + prev);
                    }
                };
                ChildComponent.prototype.ngDoCheck = function () {
                    this.log("ngDoCheck");
                };
                ChildComponent.prototype.ngAfterViewInit = function () {
                    this.log("ngAfterViewInit");
                };
                ChildComponent.prototype.ngAfterViewChecked = function () {
                    this.log("ngAfterViewChecked");
                };
                ChildComponent.prototype.ngAfterContentInit = function () {
                    this.log("ngAfterContentInit");
                };
                ChildComponent.prototype.ngAfterContentChecked = function () {
                    this.log("ngAfterContentChecked");
                };
                ChildComponent.prototype.log = function (msg) {
                    console.log(this.count + ". " + msg);
                    this.count++;
                };
                // переключаем переменную
                ChildComponent.prototype.toggle = function () {
                    this.visibility = !this.visibility;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ChildComponent.prototype, "name", void 0);
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
                        template: "<h2>(\u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442)\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C {{name}}!</h2>\n\t\t<p>\u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F (\u0442\u044F\u043D\u0435\u043C \u0438\u0437 \u043F\u0430\u0440\u0435\u043D\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430): {{userAge}}</p>\n\t\t<button (click)=\"change(true)\">+</button>\n\t\t<button (click)=\"change(false)\">-</button><br>\n        <input type=\"text\" [(ngModel)]=\"name\">\n        <input type=\"number\" [(ngModel)]=\"age\"><br>\n        <p #userName>{{name}}</p><br>\n        <p [ngStyle]=\"{'color':'yellow'}\">{{userName.textContent}}</p><br>\n\n        <p [ngClass]=\"{invisible: visibility}\">VISIBILITY</p><button (click)=\"toggle()\">Toggle VISIBILITY</button><br>\n\n        <p *ngIf=\"1==1\">VISIBILITY (IF)</p>\n        \n        <div [ngClass]=\"{verdanaFont:true}\">\n            <h1>Hello Angular 2</h1>\n            <p [ngClass]=\"{verdanaFont:false, segoePrintFont:true}\">\n                Angular 2 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043C\u043E\u0434\u0443\u043B\u044C\u043D\u0443\u044E \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0443 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\n            </p>\n        </div>\n    <h3> \u0421\u0435\u0440\u0432\u0438\u0441\u044B: </h3>\n    <!--<div>-->\n        <!--<p>\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: {{user?.name}}</p>-->\n        <!--<p>\u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: {{user?.age}}</p>-->\n    <!--</div>-->\n    <ul>\n        <li *ngFor=\"let user of users\">\n            <p>\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: {{user.name}}</p>\n            <p>\u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: {{user.age}}</p>\n        </li>\n    </ul>",
                        styles: ["h2, p {color:red;}\n        .verdanaFont{font-size:13px; font-family:Verdana;}\n        .segoePrintFont{font-size:14px; font-family:\"Segoe Print\";}\n        .invisible{display:none;}"],
                        providers: [data_service_1.DataService] //, LogService]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], ChildComponent);
                return ChildComponent;
            }());
            exports_1("ChildComponent", ChildComponent);
        }
    }
});

//# sourceMappingURL=child.component.js.map
