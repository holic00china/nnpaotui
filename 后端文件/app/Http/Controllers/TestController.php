<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    function testFunction(){

        $mid="这是变量";
        return view('hello',['mid'=>$mid]);
    }

}
