"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../models/config");
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var path = require('path');
var stringUtils = require('ember-cli-string-utils');
var getFiles = Blueprint.prototype.files;
exports.default = Blueprint.extend({
    description: '',
    availableOptions: [
        { name: 'source-dir', type: String, default: 'src', aliases: ['sd'] },
        { name: 'prefix', type: String, default: 'app', aliases: ['p'] },
        { name: 'style', type: String },
        { name: 'routing', type: Boolean, default: false },
        { name: 'inline-style', type: Boolean, default: false, aliases: ['is'] },
        { name: 'inline-template', type: Boolean, default: false, aliases: ['it'] },
        { name: 'skip-git', type: Boolean, default: false, aliases: ['sg'] },
        { name: 'minimal',
            type: Boolean,
            default: false,
            description: 'Should create a minimal app.'
        }
    ],
    beforeInstall: function (options) {
        if (options.ignoredUpdateFiles && options.ignoredUpdateFiles.length > 0) {
            return Blueprint.ignoredUpdateFiles =
                Blueprint.ignoredUpdateFiles.concat(options.ignoredUpdateFiles);
        }
    },
    locals: function (options) {
        if (options.minimal) {
            options.inlineStyle = true;
            options.inlineTemplate = true;
            options.skipTests = true;
        }
        this.styleExt = options.style === 'stylus' ? 'styl' : options.style;
        if (!options.style) {
            this.styleExt = config_1.CliConfig.getValue('defaults.styleExt') || 'css';
        }
        this.version = require(path.resolve(__dirname, '../../package.json')).version;
        // set this.tests to opposite of skipTest options,
        // meaning if tests are being skipped then the default.spec.BLUEPRINT will be false
        this.tests = options.skipTests ? false : true;
        // Split/join with / not path.sep as reference to typings require forward slashes.
        var relativeRootPath = options.sourceDir.split('/').map(function () { return '..'; }).join('/');
        var fullAppName = stringUtils.dasherize(options.entity.name)
            .replace(/-(.)/g, function (_, l) { return ' ' + l.toUpperCase(); })
            .replace(/^./, function (l) { return l.toUpperCase(); });
        return {
            htmlComponentName: stringUtils.dasherize(options.entity.name),
            jsComponentName: stringUtils.classify(options.entity.name),
            fullAppName: fullAppName,
            version: this.version,
            sourceDir: options.sourceDir,
            prefix: options.prefix,
            styleExt: this.styleExt,
            relativeRootPath: relativeRootPath,
            routing: options.routing,
            inlineStyle: options.inlineStyle,
            inlineTemplate: options.inlineTemplate,
            tests: this.tests,
            minimal: options.minimal
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.routing) {
            fileList = fileList.filter(function (p) { return p.indexOf('app-routing.module.ts') < 0; });
        }
        if (this.options && this.options.inlineTemplate) {
            fileList = fileList.filter(function (p) { return p.indexOf('app.component.html') < 0; });
        }
        if (this.options && this.options.inlineStyle) {
            fileList = fileList.filter(function (p) { return p.indexOf('app.component.__styleext__') < 0; });
        }
        if (this.options && this.options.skipGit) {
            fileList = fileList.filter(function (p) { return p.indexOf('gitignore') < 0; });
        }
        if (this.options && this.options.skipTests) {
            fileList = fileList.filter(function (p) { return p.indexOf('app.component.spec.ts') < 0; });
        }
        if (this.options && this.options.minimal) {
            var toRemoveList_1 = [/e2e\//, /editorconfig/, /README/, /karma.conf.js/,
                /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/, /tslint.json/, /favicon.ico/];
            fileList = fileList.filter(function (p) {
                return !toRemoveList_1.some(function (re) { return re.test(p); });
            });
        }
        var cliConfig = config_1.CliConfig.fromProject();
        var ngConfig = cliConfig && cliConfig.config;
        if (!ngConfig || ngConfig.packageManager != 'yarn') {
            fileList = fileList.filter(function (p) { return p.indexOf('yarn.lock') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                return options.locals.sourceDir;
            },
            __styleext__: function () {
                return _this.styleExt;
            }
        };
    }
});
//# sourceMappingURL=index.js.map