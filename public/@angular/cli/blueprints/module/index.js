"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var path = require("path");
var common_tags_1 = require("common-tags");
var ast_tools_1 = require("../../lib/ast-tools");
var config_1 = require("../../models/config");
var app_utils_1 = require("../../utilities/app-utils");
var resolve_module_file_1 = require("../../utilities/resolve-module-file");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var stringUtils = require('ember-cli-string-utils');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var astUtils = require('../../utilities/ast-utils');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    name: 'module',
    description: '',
    aliases: ['m'],
    availableOptions: [
        {
            name: 'spec',
            type: Boolean,
            description: 'Specifies if a spec file is generated.'
        },
        {
            name: 'flat',
            type: Boolean,
            description: 'Flag to indicate if a dir is created.'
        },
        {
            name: 'routing',
            type: Boolean,
            default: false,
            description: 'Specifies if a routing module file should be generated.'
        },
        {
            name: 'app',
            type: String,
            aliases: ['a'],
            description: 'Specifies app name to use.'
        },
        {
            name: 'module',
            type: String, aliases: ['m'],
            description: 'Specifies where the module should be imported.'
        }
    ],
    beforeInstall: function (options) {
        if (options.module) {
            var appConfig = app_utils_1.getAppFromConfig(this.options.app);
            this.pathToModule =
                resolve_module_file_1.resolveModulePath(options.module, this.project, this.project.root, appConfig);
        }
    },
    normalizeEntityName: function (entityName) {
        this.entityName = entityName;
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
        options.flat = options.flat !== undefined ?
            options.flat : config_1.CliConfig.getValue('defaults.module.flat');
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.module.spec');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            spec: options.spec,
            routing: options.routing
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (!this.options || !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.module.spec.ts') < 0; });
        }
        if (this.options && !this.options.routing) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__-routing.module.ts') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        // Return custom template variables here.
        this.dasherizedModuleName = options.dasherizedModuleName;
        return {
            __path__: function () {
                _this.generatePath = _this.dynamicPath.dir;
                if (!options.locals.flat) {
                    _this.generatePath += path.sep + options.dasherizedModuleName;
                }
                return _this.generatePath;
            }
        };
    },
    afterInstall: function (options) {
        var returns = [];
        if (!this.pathToModule) {
            var warningMessage = (_a = ["\n        Module is generated but not provided,\n        it must be provided to be used\n      "], _a.raw = ["\n        Module is generated but not provided,\n        it must be provided to be used\n      "], common_tags_1.oneLine(_a));
            this._writeStatusToUI(chalk.yellow, 'WARNING', warningMessage);
        }
        else {
            var className = stringUtils.classify(options.entity.name + "Module");
            var fileName = stringUtils.dasherize(options.entity.name + ".module");
            if (options.routing) {
                className = stringUtils.classify(options.entity.name + "RoutingModule");
                fileName = stringUtils.dasherize(options.entity.name + "-routing.module");
            }
            var fullGeneratePath = path.join(this.project.root, this.generatePath);
            var moduleDir = path.parse(this.pathToModule).dir;
            var relativeDir = path.relative(moduleDir, fullGeneratePath);
            var importPath = relativeDir ? "./" + relativeDir + "/" + fileName : "./" + fileName;
            returns.push(astUtils.addImportToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(ast_tools_1.NodeHost); }));
            this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
        }
        return Promise.all(returns);
        var _a;
    }
});
//# sourceMappingURL=index.js.map