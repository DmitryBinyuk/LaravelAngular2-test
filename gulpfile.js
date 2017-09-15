var gulp = require("gulp");
//var bower = require("gulp-bower");
var elixir = require("laravel-elixir");
require('laravel-elixir-livereload');
require('laravel-elixir-typescript');
var elixirTypscript = require('elixir-typescript');

var vendors = '../../assets/vendors/';

var paths = {
    'jquery': vendors + 'jquery/dist',
    'jqueryUi': vendors + 'jquery-ui',
    'moment': vendors + 'moment',
    'bootstrap': vendors + 'bootstrap/dist',
    'fontawesome': vendors + 'font-awesome',
    'eonasdanBootstrapDatetimepicker': vendors + 'eonasdan-bootstrap-datetimepicker/build',
    'tether' : vendors + 'tether/dist'
};

elixir(function (mix) {
    // mix.copy('node_modules/@angular', 'public/@angular');
    // mix.copy('node_modules/rxjs', 'public/rxjs');
    // mix.copy('node_modules/systemjs', 'public/systemjs');
    // mix.copy('node_modules/es6-promise', 'public/es6-promise');
    // mix.copy('node_modules/es6-shim', 'public/es6-shim');
    // mix.copy('node_modules/zone.js/dist', 'public/zone.js/dist');
    // mix.copy('node_modules/satellizer', 'public/satellizer');
    // mix.copy('node_modules/platform', 'public/platform');
    // mix.copy('node_modules/reflect-metadata', 'public/reflect-metadata');

    mix.copy('resources/assets/typescript/app/app.component.html', 'public/js/app/app.component.html');
    mix.copy('resources/assets/typescript/app/app.component.css', 'public/js/app/app.component.css');


   // mix.typescript("/**/*.ts", "public/js", {
   //     "target": "es5",
   //     "module": "system",
   //     "moduleResolution": "node",
   //     "sourceMap": true,
   //     "emitDecoratorMetadata": true,
   //     "experimentalDecorators": true,
   //     "removeComments": false,
   //     "noImplicitAny": false,
   // });

    mix.typescript('app/main.ts', "public/js/app", {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
    });
    
    mix.typescript('app/app.module.ts', "public/js/app", {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
    });

     mix.typescript('app/app.component.ts', "public/js/app", {
         "target": "es5",
         "module": "system",
         "moduleResolution": "node",
         "sourceMap": true,
         "emitDecoratorMetadata": true,
         "experimentalDecorators": true,
         "removeComments": false,
         "noImplicitAny": false,
     });
     
     // mix.typescript('app/child.component.ts', "public/js/app", {
     //     "target": "es5",
     //     "module": "system",
     //     "moduleResolution": "node",
     //     "sourceMap": true,
     //     "emitDecoratorMetadata": true,
     //     "experimentalDecorators": true,
     //     "removeComments": false,
     //     "noImplicitAny": false,
     // });

    // mix.typescript('data.service.ts', "public/js", {
    //     "target": "es5",
    //     "module": "system",
    //     "moduleResolution": "node",
    //     "sourceMap": true,
    //     "emitDecoratorMetadata": true,
    //     "experimentalDecorators": true,
    //     "removeComments": false,
    //     "noImplicitAny": false,
    // });

    mix.livereload();
    mix.browserSync({proxy: 'localhost:8000'});

});
