System.register(['./phone', '@angular/core', '@angular/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var phone_1, core_1, http_1;
    var DataService;
    return {
        setters:[
            function (phone_1_1) {
                phone_1 = phone_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            DataService = (function () {
                function DataService(http) {
                    this.http = http;
                    this.data = [
                        { name: "Apple iPhone 7", price: 56000 },
                        { name: "HP Elite x3", price: 56000 },
                        { name: "Alcatel Idol S4", price: 25000 }
                    ];
                }
                DataService.prototype.getData = function () {
                    return this.http.get('js/user.json');
                    // this.logService.write("операция получения данных");
                    // return this.data;
                };
                DataService.prototype.addData = function (name, price) {
                    this.data.push(new phone_1.Phone(name, price));
                };
                DataService.prototype.getUsers = function () {
                    return this.http.get('js/user.json')
                        .map(function (resp) {
                        var usersList = resp.json().data;
                        var users = [];
                        for (var index in usersList) {
                            console.log(usersList[index]);
                            var user = usersList[index];
                            users.push({ name: user.userName, age: user.userAge });
                        }
                        return users;
                    });
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});

//# sourceMappingURL=data.service.js.map
