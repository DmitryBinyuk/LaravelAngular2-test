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
var astUtils = require('../../utilities/ast-utils');
var findParentModule = require('../../utilities/find-parent-module').default;
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    name: 'directive',
    description: '',
    aliases: ['d'],
    availableOptions: [
        {
            name: 'flat',
            type: Boolean,
            description: 'Flag to indicate if a dir is created.'
        },
        {
            name: 'prefix',
            type: String,
            default: null,
            description: 'Specifies whether to use the prefix.'
        },
        {
            name: 'spec',
            type: Boolean,
            description: 'Specifies if a spec file is generated.'
        },
        {
            name: 'skip-import',
            type: Boolean,
            default: false,
            description: 'Allows for skipping the module import.'
        },
        {
            name: 'module',
            type: String, aliases: ['m'],
            description: 'Allows specification of the declaring module.'
        },
        {
            name: 'export',
            type: Boolean,
            default: false,
            description: 'Specifies if declaring module exports the component.'
        },
        {
            name: 'app',
            type: String,
            aliases: ['a'],
            description: 'Specifies app name to use.'
        }
    ],
    beforeInstall: function (options) {
        var appConfig = app_utils_1.getAppFromConfig(this.options.app);
        if (options.module) {
            this.pathToModule =
                resolve_module_file_1.resolveModulePath(options.module, this.project, this.project.root, appConfig);
        }
        else {
            try {
                this.pathToModule = findParentModule(this.project.root, appConfig.root, this.generatePath);
            }
            catch (e) {
                if (!options.skipImport) {
                    throw "Error locating module for declaration\n\t" + e;
                }
            }
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
        var defaultPrefix = (appConfig && appConfig.prefix) || '';
        var prefix = (this.options.prefix === 'false' || this.options.prefix === '')
            ? '' : (this.options.prefix || defaultPrefix);
        prefix = prefix && prefix + "-";
        this.selector = stringUtils.camelize(prefix + parsedPath.name);
        return parsedPath.name;
    },
    locals: function (options) {
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.directive.spec');
        options.flat = options.flat !== undefined ?
            options.flat : config_1.CliConfig.getValue('defaults.directive.flat');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            selector: this.selector
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.directive.spec.ts') < 0; });
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
        var _this = this;
        var appConfig = app_utils_1.getAppFromConfig(this.options.app);
        if (options.prefix && appConfig.prefix && appConfig.prefix !== options.prefix) {
            console.log(chalk.yellow((_a = ["You are using different prefix from app,\n       you might get lint errors. Please update \"tslint.json\" accordingly."], _a.raw = ["You are using different prefix from app,\n       you might get lint errors. Please update \"tslint.json\" accordingly."], common_tags_1.oneLine(_a))));
        }
        var returns = [];
        var className = stringUtils.classify(options.entity.name + "Directive");
        var fileName = stringUtils.dasherize(options.entity.name + ".directive");
        var fullGeneratePath = path.join(this.project.root, this.generatePath);
        var moduleDir = path.parse(this.pathToModule).dir;
        var relativeDir = path.relative(moduleDir, fullGeneratePath);
        var normalizeRelativeDir = relativeDir.startsWith('.') ? relativeDir : "./" + relativeDir;
        var importPath = relativeDir ? normalizeRelativeDir + "/" + fileName : "./" + fileName;
        if (!options.skipImport) {
            if (options.dryRun) {
                this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
                return;
            }
            returns.push(astUtils.addDeclarationToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(ast_tools_1.NodeHost); })
                .then(function (result) {
                if (options.export) {
                    return astUtils.addExportToModule(_this.pathToModule, className, importPath)
                        .then(function (change) { return change.apply(ast_tools_1.NodeHost); });
                }
                return result;
            }));
            this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
            this.addModifiedFile(this.pathToModule);
        }
        return Promise.all(returns);
        var _a;
    }
});
//# sourceMappingURL=index.js.map