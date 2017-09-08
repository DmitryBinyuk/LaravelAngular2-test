"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_utils_1 = require("../../utilities/app-utils");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var config_1 = require("../../models/config");
var stringUtils = require('ember-cli-string-utils');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    name: 'class',
    description: '',
    aliases: ['cl'],
    availableOptions: [
        {
            name: 'spec',
            type: Boolean,
            description: 'Specifies if a spec file is generated.'
        },
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
            entityName: entityName.split('.')[0],
            appConfig: appConfig,
            dryRun: this.options.dryRun
        };
        var parsedPath = dynamic_path_parser_1.dynamicPathParser(dynamicPathOptions);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        var rawName = options.args[1];
        var nameParts = rawName.split('.')
            .filter(function (part) { return part.length !== 0; });
        var classType = nameParts[1];
        this.fileName = stringUtils.dasherize(options.entity.name);
        if (classType) {
            this.fileName += '.' + classType.toLowerCase();
        }
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.class.spec');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.spec.ts') < 0; });
        }
        return fileList;
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