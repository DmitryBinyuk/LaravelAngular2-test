"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_utils_1 = require("../../utilities/app-utils");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var stringUtils = require('ember-cli-string-utils');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
exports.default = Blueprint.extend({
    name: 'enum',
    description: '',
    aliases: ['e'],
    availableOptions: [
        {
            name: 'app',
            type: String,
            aliases: ['a'],
            description: 'Specifies app name to use.'
        }
    ],
    normalizeEntityName: function (entityName) {
        var appConfig = app_utils_1.getAppFromConfig(this.options.app);
        var dynamicPathOptions = {
            project: this.project,
            entityName: entityName,
            appConfig: appConfig,
            dryRun: this.options.dryRun
        };
        var parsedPath = dynamic_path_parser_1.dynamicPathParser(dynamicPathOptions);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        this.fileName = stringUtils.dasherize(options.entity.name);
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName
        };
    },
    fileMapTokens: function () {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                _this.generatePath = _this.dynamicPath.dir;
                return _this.generatePath;
            },
            __name__: function () {
                return _this.fileName;
            }
        };
    }
});
//# sourceMappingURL=index.js.map