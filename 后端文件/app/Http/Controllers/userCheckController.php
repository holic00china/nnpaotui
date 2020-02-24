<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use http\Exception;
use App\Http\Controllers\Idcheck;

class userCheckController extends Controller
{

    //增加用户
   public function user(Request $request){
        $method = $request->method();
        $name = $request->input('name');
        $money = $request->input('money');
        //$users = DB::select("select * from user",[1]);
        if(DB::table('user')->where('nickname', $name)->exists())
        {
            echo '已存在该用户';
        }
        else {
            $res = DB::insert('insert into user (nickname, money) values (?, ?)', [$name, $money]);
            echo($res);
        }
//       if(DB::connection()->getDatabaseName())
//       {
//           echo "Connected sucessfully to database ".DB::connection()->getDatabaseName().".";
//       }
      // echo $users[0]->nickname;
//       foreach ($users as $user) {
//           echo $user->nickname;
//       }
//
//        if ($request->isMethod('post')) {
//            $name = $request->input('name');
//            $money = $request->input('money');
//            echo $name."&".$money;
//        }
    }
    //显示金额
    public function money(Request $request){
        $method = $request->method();
        $name = $request->input('name');
        $result=DB::table('user')->where('nickname', $name)->first();
        echo $result->money;
    }
    //提现申请
    public function alipay(Request $request)
    {
        $method = $request->method();
        $name = $request->input('name');
        $number= $request->input('number');
        $result=DB::table('user')->where('nickname', $name)->first();
        $m=$result->money;
        if($m<=0)
        {
            echo '金额小于0，无法提现';
            return;
        }
        $res = DB::insert('insert into alipay (number , money) values (?, ?)', [$number, $m]);
        $res2 = DB::update('update user set money=0 and nickname="'.$name.'"');
        if($res==1&&$res2==1)
        {
            echo '提交成功！';
        }
        else
        {
            echo '提交失败';
        }

    }
    //身份证验证
    public  function idCheck(Request $request)
    {
        $method = $request->method();
        $name = $request->input('name');
        $tel= $request->input('tel');
        $id = $request->input('id');
        $nickname= $request->input('nickName');
        $check=new Idcheck();
        if($check->check_id($id))
        {
            $sql='update user set name = "'.$name.'",tel="'.$tel.'",identity="'.$id.'",authority=1 where nickname = "'.$nickname.'"';
            //echo $sql;
           $res=DB::update($sql);
            if($res==1)
            {
                echo '1';
            }
            else
            {
                echo '0';
            }
        }
        else
        {echo 0;}

    }
    //取出openid
    public function login(Request $request)
    {
        $method = $request->method();
        $js_code = $request->input('code');
        $appid='wxa73fc2bacb6e0e94';
        $secret='af85ce42bcf0f96c7044dd8fd0bf3c69';
        $jsons =file_get_contents('https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$secret.'&js_code='.$js_code.'&grant_type=authorization_code');

        $data = json_decode($jsons, true);
// 显示出来看看
        echo json_encode($data);
    }
    //用户下单
    public function order(Request $request)
    {
        $method = $request->method();
        $title = $request->input('title');
        $arriveAddress = $request->input('arriveAddress');
        $code = $request->input('code');
        $name = $request->input('name');
        $tel = $request->input('tel');
        $time = $request->input('time');
        $category = $request->input('categoryId');
        $nickname = $request->input('nickname');
        $money = $request->input('money');
        $area = $request->input('area');
        $res = DB::insert('insert into ordery (title, arriveAddress,getcode,username,categoryId,statu,tel,time,money,area,usernickname) values (?, ?,?,?,?,?,?,?,?,?,?)', [$title, $arriveAddress,$code,$name,$category,1,$tel,$time,$money,$area,$nickname]);
        if($res==1)
        {
            echo 1;
        }
        else
        {echo 0;}
    }
    //查询公告栏
    public function bbs(Request $request)
    {
        $method = $request->method();
        $area = $request->input('area');
        $res=DB::select("select * from bbs where area=".$area);
        $data = array();
        foreach ($res as $row) {
            $data[]=$row->content;
        }
        $json_string = json_encode($data);
        echo $json_string;
    }

    //发表留言
    public function order3(Request $request)
    {
        $method = $request->method();
        $content = $request->input('content');
        $area = $request->input('area');
        $res=DB::insert("insert into bbs(content,area) values ('".$content."',$area)");
        if($res==1)
        {
            echo 1;
        }
        else
        {echo 0;}
    }
    //检查权限
    public function checkRun(Request $request)
    {
        $method = $request->method();
        $nickName = $request->input('name');
        if(DB::table('user')->where('nickname', $nickName)->exists())
        {
            echo '1';
        }
    }
    //数据渲染
    public function wait(Request $request)
    {
        $method = $request->method();
        $area = $request->input('area');
        $statu=$request->input('state');
        $sql='select * from ordery where statu="'.$statu.'" and area="'.$area.'"';
        //echo $sql;
        $res=DB::select($sql);
        $data = array();
        foreach ($res as $row) {
            $data[]=$row;
        }
        $json_string = json_encode($data);
        echo $json_string;
    }
    //接单
    public function jiedan(Request $request)
    {
        $method = $request->method();
        $name = $request->input('name');
        $title=$request->input('title');
        $money=$request->input('money');
//        $sql='select * from user where nickname="'.$name.'" and authority=1';
//        echo $sql;
        if(DB::table('user')->where('nickname',$name)
                                  ->where('authority','1')
                                  ->exists())
        {
            $sql='update ordery set statu =1 where title = "'.$title.'"';
            $res1=DB::update($sql);
            $sql2='update user set money=money+"'.$money.'" where nickname="'.$name.'"';
            $res2=DB::update($sql2);
            if($res1==1&&$res2==1)
            {
                echo '1';
            }
            else
            {
                echo '0';
            }
        }
        else
        {
            echo 0;
        }
    }
    //跑腿员查询
    public function select(Request $request)
    {
        $method = $request->method();
        $name = $request->input('name');
        $sql='select * from ordery where runname="'.$name.'"';
        //echo $sql;
        $res=DB::select($sql);
        $data = array();
        foreach ($res as $row) {
            $data[]=$row;
        }
        $json_string = json_encode($data);
        echo $json_string;
    }
    //用户查询
    public function select2(Request $request)
    {
        $method = $request->method();
        $name = $request->input('name');
        $sql='select * from ordery where usernickname="'.$name.'"';
        //echo $sql;
        $res=DB::select($sql);
        $data = array();
        foreach ($res as $row) {
            $data[]=$row;
        }
        $json_string = json_encode($data);
        echo $json_string;
    }
    //下单2
    public function order2(Request $request)
    {
        $method = $request->method();
        $title = $request->input('title');
        $arriveAddress = $request->input('arriveAddress');
        $name = $request->input('name');
        $tel = $request->input('tel');
        $time = $request->input('time');
        $category = $request->input('categoryId');
        $area = $request->input('area');
        //echo $title.$arriveAddress;
     $res = DB::insert('insert into ordery (title,arriveAddress,username,categoryId,statu,tel,time,money,area) values (?, ?,?,?,?,?,?,?,?)', [$title,$arriveAddress,$name,$category,2,$tel,$time,5,$area]);
        if($res==1)
        {
            echo 1;
        }
        else
        {echo 0;}
    }
}
