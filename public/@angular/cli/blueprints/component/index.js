"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var fs = require("fs");
var path = require("path");
var common_tags_1 = require("common-tags");
var ast_tools_1 = require("../../lib/ast-tools");
var config_1 = require("../../models/config");
var app_utils_1 = require("../../utilities/app-utils");
var dynamic_path_parser_1 = require("../../utilities/dynamic-path-parser");
var resolve_module_file_1 = require("../../utilities/resolve-module-file");
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var findParentModule = require('../../utilities/find-parent-module').default;
var getFiles = Blueprint.prototype.files;
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var viewEncapsulationMap = {
    'emulated': 'Emulated',
    'native': 'Native',
    'none': 'None'
};
var changeDetectionMap = {
    'default': 'Default',
    'onpush': 'OnPush'
};
function correctCase(options) {
    if (options.viewEncapsulation) {
        options.viewEncapsulation = viewEncapsulationMap[options.viewEncapsulation.toLowerCase()];
    }
    if (options.changeDetection) {
        options.changeDetection = changeDetectionMap[options.changeDetection.toLowerCase()];
    }
}
exports.default = Blueprint.extend({
    name: 'component',
    description: '',
    aliases: ['c'],
    availableOptions: [
        {
            name: 'flat',
            type: Boolean,
            description: 'Flag to indicate if a dir is created.'
        },
        {
            name: 'inline-template',
            type: Boolean,
            aliases: ['it'],
            description: 'Specifies if the template will be in the ts file.'
        },
        {
            name: 'inline-style',
            type: Boolean,
            aliases: ['is'],
            description: 'Specifies if the style will be in the ts file.'
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
            name: 'view-encapsulation',
            type: String,
            aliases: ['ve'],
            description: 'Specifies the view encapsulation strategy.'
        },
        {
            name: 'change-detection',
            type: String,
            aliases: ['cd'],
            description: 'Specifies the change detection strategy.'
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
        this.selector = stringUtils.dasherize(prefix + parsedPath.name);
        if (this.selector.indexOf('-') === -1) {
            this._writeStatusToUI(chalk.yellow, 'WARNING', 'selectors should contain a dash');
        }
        return parsedPath.name;
    },
    locals: function (options) {
        this.styleExt = config_1.CliConfig.getValue('defaults.styleExt') || 'css';
        options.inlineStyle = options.inlineStyle !== undefined ?
            options.inlineStyle : config_1.CliConfig.getValue('defaults.component.inlineStyle');
        options.inlineTemplate = options.inlineTemplate !== undefined ?
            options.inlineTemplate : config_1.CliConfig.getValue('defaults.component.inlineTemplate');
        options.flat = options.flat !== undefined ?
            options.flat : config_1.CliConfig.getValue('defaults.component.flat');
        options.spec = options.spec !== undefined ?
            options.spec : config_1.CliConfig.getValue('defaults.component.spec');
        options.viewEncapsulation = options.viewEncapsulation !== undefined ?
            options.viewEncapsulation : config_1.CliConfig.getValue('defaults.component.viewEncapsulation');
        options.changeDetection = options.changeDetection !== undefined ?
            options.changeDetection : config_1.CliConfig.getValue('defaults.component.changeDetection');
        correctCase(options);
        return {
            dynamicPath: this.dynamicPath.dir.replace(this.dynamicPath.appRoot, ''),
            flat: options.flat,
            spec: options.spec,
            inlineTemplate: options.inlineTemplate,
            inlineStyle: options.inlineStyle,
            route: options.route,
            isAppComponent: !!options.isAppComponent,
            selector: this.selector,
            styleExt: this.styleExt,
            viewEncapsulation: options.viewEncapsulation,
            changeDetection: options.changeDetection
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && this.options.inlineTemplate) {
            fileList = fileList.filter(function (p) { return p.indexOf('.html') < 0; });
        }
        if (this.options && this.options.inlineStyle) {
            fileList = fileList.filter(function (p) { return p.indexOf('.__styleext__') < 0; });
        }
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.component.spec.ts') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        var appConfig = app_utils_1.getAppFromConfig(this.options.app);
        // Return custom template variables here.
        return {
            __path__: function () {
                var dir = _this.dynamicPath.dir;
                if (!options.locals.flat) {
                    dir += path.sep + options.dasherizedModuleName;
                }
                var srcDir = appConfig.root;
                _this.appDir = dir.substr(dir.indexOf(srcDir) + srcDir.length);
                _this.generatePath = dir;
                return dir;
            },
            __styleext__: function () {
                return _this.styleExt;
            }
        };
    },
    afterInstall: function (options) {
        var _this = this;
        var appConfig = app_utils_1.getAppFromConfig(this.options.app);
        if (options.prefix && appConfig.prefix && appConfig.prefix !== options.prefix) {
            this._writeStatusToUI(chalk.yellow, 'WARNING', (_a = ["\n        You are using a different prefix than the app ['", "']\n        and may receive lint failures.\n        Please verify/update 'tslint.json' accordingly.\n      "], _a.raw = ["\n        You are using a different prefix than the app ['", "']\n        and may receive lint failures.\n        Please verify/update 'tslint.json' accordingly.\n      "], common_tags_1.oneLine(_a, appConfig.prefix)));
        }
        var returns = [];
        var className = stringUtils.classify(options.entity.name + "Component");
        var fileName = stringUtils.dasherize(options.entity.name + ".component");
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
            var preChange_1;
            try {
                preChange_1 = fs.readFileSync(this.pathToModule, 'utf8');
            }
            catch (err) {
                if (err.code === 'EISDIR') {
                    throw 'Module specified should be a file, not a directory';
                }
                else {
                    throw err;
                }
            }
            returns.push(astUtils.addDeclarationToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(ast_tools_1.NodeHost); })
                .then(function (result) {
                if (options.export) {
                    return astUtils.addExportToModule(_this.pathToModule, className, importPath)
                        .then(function (change) { return change.apply(ast_tools_1.NodeHost); });
                }
                return result;
            })
                .then(function () {
                var postChange = fs.readFileSync(_this.pathToModule, 'utf8');
                var moduleStatus = 'update';
                if (postChange === preChange_1) {
                    moduleStatus = 'identical';
                }
                _this._writeStatusToUI(chalk.yellow, moduleStatus, path.relative(_this.project.root, _this.pathToModule));
                _this.addModifiedFile(_this.pathToModule);
            }));
        }
        return Promise.all(returns);
        var _a;
    }
});
//# sourceMappingURL=index.js.map