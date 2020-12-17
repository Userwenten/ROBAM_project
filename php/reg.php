<?php
//1.连接数据库
include "conn.php";
//3.获取前端传入的用户名做唯一值的检测。
if(isset($_POST['tel'])){
    $name = $_POST['tel'];
    $result=$conn->query("select * from register where tel='$name'");
    //如果存在结果，表示该用户名已经存在，否则不存在。
    if($result->fetch_assoc()){//存在 php里面的true返回1
        echo true;
    }else{//不存在,php里面的false返回空隙。
        echo false;
    }
}

//2.获取前端表单传入的值。
if(isset($_POST['submit'])){//前端点击了submit提交按钮，后端开始接收值。
    $tel = $_POST['mobile'];
    $pass = sha1($_POST['password']);
    $conn->query("insert register values(null,'$tel','$pass',NOW())");//将数据传递给数据库。
    //一旦数据提交成功，回到前端的登录页面
    header('location:http://10.31.161.125/dashboard/ROBAM_project/src/login.html');
}


