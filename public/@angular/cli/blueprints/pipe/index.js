"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var path = require("path");
var ast_tools_1 = require("../../lib/ast-tools");
var config_1 = require("../../models/config");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var app_utils_1 = require("../../utilities/app-utils");
var resolve_module_file_1 = require("../../utilities/resolve-module-file");
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var findParentModule = require('../../utilities/find-parent-module').default;
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    name: 'pipe',
    description: '',
    aliases: ['p'],
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
            name: 'skip-import',
            type: Boolean,
            default: false,
            description: 'Allows for skipping the module import.'
        },
        {
            name: 'module',
            type: String,
            aliases: ['m'],
            description: 'Allows specification of the declaring module.'
        },
        {
            name: 'export',
            type: Boolean,
            default: false,
            description: 'Specifies if declaring module exports the pipe.'
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
        return parsedPath.name;
    },
    locals: function (options) {
        options.flat = options.flat !== undefined ?
            options.flat : config_1.CliConfig.getValue('defaults.pipe.flat');
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.pipe.spec');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.pipe.spec.ts') < 0; });
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
        var returns = [];
        var className = stringUtils.classify(options.entity.name + "Pipe");
        var fileName = stringUtils.dasherize(options.entity.name + ".pipe");
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
    }
});
//# sourceMappingURL=index.js.map