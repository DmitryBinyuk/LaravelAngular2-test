<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <base href="/">

        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="/css/main.css" rel="stylesheet">
        <link href="/css/bootstrap.min.css" rel="stylesheet">

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
        <div class="wrapper">
            <div class="main">
                <div class="header">
                    <ul>
                        <li><a class="main_header_link" href="#phones">All phones</a></li>
                        <li><a class="main_header_link" href="#profile">Profile</a></li>
                        <li class="logged_as_block" ng-if="typeof [[currentUserName]] !== undefined">Logged as: <a href="#profile"> [[currentUserName]] </a></li>
                        <input ng-model="phone_search" class="header_search" name="phone_search" placeholder="Search">
                    </ul>
                </div>

                <div class="container">
                    <div class="content">
                        <my-app>Loading...</my-app>
                        <div class="title">Laravel 5</div>
                    </div>
                </div>
            </div>
            <div id="footer">
                &copy; developed by Dmitry
            </div>
        </div>
    </body>
</html>
