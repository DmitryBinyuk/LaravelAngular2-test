"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var path = require("path");
var common_tags_1 = require("common-tags");
var ast_tools_1 = require("../../lib/ast-tools");
var config_1 = require("../../models/config");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var app_utils_1 = require("../../utilities/app-utils");
var resolve_module_file_1 = require("../../utilities/resolve-module-file");
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    name: 'service',
    description: '',
    aliases: ['s'],
    availableOptions: [
        {
            name: 'flat',
            type: Boolean,
            description: 'Flag to indicate if a dir is created.'
        },
        {
            name: 'spec',
            type: Boolean,
            description: 'Specifies if a spec file is generated.'
        },
        {
            name: 'module',
            type: String, aliases: ['m'],
            description: 'Specifies where the service should be provided.'
        },
        {
            name: 'app',
            type: String,
            aliases: ['a'],
            description: 'Specifies app name to use.'
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
            options.flat : config_1.CliConfig.getValue('defaults.service.flat');
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.service.spec');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.service.spec.ts') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                var dir = _this.dynamicPath.dir;
                if (!options.locals.flat) {
                    dir += path.sep + options.dasherizedModuleName;
                }
                _this.generatePath = dir;
                return dir;
            }
        };
    },
    afterInstall: function (options) {
        var returns = [];
        if (!this.pathToModule) {
            var warningMessage = (_a = ["\n        Service is generated but not provided,\n        it must be provided to be used\n      "], _a.raw = ["\n        Service is generated but not provided,\n        it must be provided to be used\n      "], common_tags_1.oneLine(_a));
            this._writeStatusToUI(chalk.yellow, 'WARNING', warningMessage);
        }
        else {
            if (options.dryRun) {
                this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
                return;
            }
            var className = stringUtils.classify(options.entity.name + "Service");
            var fileName = stringUtils.dasherize(options.entity.name + ".service");
            var fullGeneratePath = path.join(this.project.root, this.generatePath);
            var moduleDir = path.parse(this.pathToModule).dir;
            var relativeDir = path.relative(moduleDir, fullGeneratePath);
            var normalizeRelativeDir = relativeDir.startsWith('.') ? relativeDir : "./" + relativeDir;
            var importPath = relativeDir ? normalizeRelativeDir + "/" + fileName : "./" + fileName;
            returns.push(astUtils.addProviderToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(ast_tools_1.NodeHost); }));
            this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
            this.addModifiedFile(this.pathToModule);
        }
        return Promise.all(returns);
        var _a;
    }
});
//# sourceMappingURL=index.js.map