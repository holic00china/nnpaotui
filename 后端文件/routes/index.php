<?php
//Route::get("/paotui/userCheck", "userCheckController@user");
Route::post("/userCheck", "userCheckController@user");
Route::get("/money", "userCheckController@money");
Route::get("/alipay", "userCheckController@alipay");
Route::post("/idCheck", "userCheckController@idCheck");
Route::get("/login", "userCheckController@login");
Route::post("/order", "userCheckController@order");
Route::get("/bbs", "userCheckController@bbs");
Route::post("/order3", "userCheckController@order3");
Route::get("/checkRun", "userCheckController@checkRun");
Route::get("/wait", "userCheckController@wait");
Route::get("/jiedan", "userCheckController@jiedan");
Route::post("/select", "userCheckController@select");
Route::post("/select2", "userCheckController@select");
Route::post("/order2", "userCheckController@order2");
