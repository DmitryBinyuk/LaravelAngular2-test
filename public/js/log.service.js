System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LogService;
    return {
        setters:[],
        execute: function() {
            /// <reference path="../../../typings/browser.d.ts" />
            LogService = (function () {
                function LogService() {
                }
                LogService.prototype.write = function (logMessage) {
                    console.log(logMessage);
                };
                return LogService;
            }());
            exports_1("LogService", LogService);
        }
    }
});

//# sourceMappingURL=log.service.js.map
