<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('home');
});

/*****************************************************************************/
/*   API routes
/*****************************************************************************/

Route::group(['prefix' => 'api/v1', 'namespace' => '\API1\Controllers'], function () {

    Route::get('products', 'ProductsController@index');

//    Route::get('phone/{phoneId}', 'PhonesController@show');
//    Route::get('brands', 'PhonesController@brands');
//
//    Route::get('comment/{phoneId}', 'CommentsController@index');
//    Route::post('comment', 'CommentsController@store');
//    Route::delete('comment/{commentId}', 'CommentsController@destroy');
//
//    Route::post('profile', 'ProfileController@update');
//
//    Route::post('feebback/createq', 'FeedbackController@create');
//
//    //Authentfication routes
//    Route::post('register', 'TokenAuthController@register');
//    Route::post('authenticate', 'TokenAuthController@authenticate');
//    Route::get('authenticate/user', 'TokenAuthController@getAuthenticatedUser');

});
