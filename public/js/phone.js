System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Phone;
    return {
        setters:[],
        execute: function() {
            Phone = (function () {
                function Phone(name, price) {
                    this.name = name;
                    this.price = price;
                }
                return Phone;
            }());
            exports_1("Phone", Phone);
        }
    }
});

//# sourceMappingURL=phone.js.map
