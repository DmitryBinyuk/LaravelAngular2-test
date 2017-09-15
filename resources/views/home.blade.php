<!DOCTYPE html>
<html>
    <head>

        <base href="/">

        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

    <!-- Load libraries -->
    <!-- IE required polyfills, in this exact order --> 
    <script src="es6-shim/es6-shim.min.js"></script>
    <script src="zone.js/dist/zone.js"></script>
    <script src="reflect-metadata/Reflect.js"></script>
    <script src="systemjs/dist/system.src.js"></script>
    <script src="systemjs.config.js"></script>
 
    <script>
      System.import('/js/app/main.js').catch(function(err){ console.error(err); });
    </script>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <my-app>Loading...</my-app>
                <div class="title">Laravel 5</div>
            </div>
        </div>
    </body>
</html>
