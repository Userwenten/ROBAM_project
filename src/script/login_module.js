define([], function() {
    return {
        init: function() {
            const $telphone = $('#mobile'); //手机号码
            const $password = $('#password'); //密码
            const $login = $('.l-btn'); //登录按钮
            const $tip = $('.tip');

            //手机
            $telphone.on('focus', function() {
                $tip.html('请输入11位正确的手机号码').css('color', '#333');
            });

            $telphone.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                    if ($reg.test($value)) {
                        $tip.html('格式正确').css('color', 'green');
                        $telphoneflag = true;
                    } else {
                        $tip.html('手机号码格式有误').css('color', 'red');
                        $telphoneflag = false;
                    }
                } else {
                    $tip.html('手机号码不能为空').css('color', 'red');
                    $telphoneflag = false;
                }
            });
            //密码
            $password.on('focus', function() {
                $tip.html(' ').css('color', '#333');
            });

            $password.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^[a-zA-Z]\w{5,17}$/;
                    if ($reg.test($value)) {
                        $tip.html('格式正确').css('color', 'green');
                        $passflag = true;
                    } else {
                        $tip.html('密码格式有误').css('color', 'red');
                        $passflag = false;
                    }
                } else {
                    $tip.html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
            });
            $login.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.125/dashboard/ROBAM_project/php/login.php',
                    data: {
                        tel: $telphone.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) { //登录失败
                        // alert('用户名或者密码有误!');
                        $password.val(''); //密码清空
                        $tip.html('用户名或者密码有误!').css('color', 'red');;
                    } else { //登录成功
                        location.href = 'index.html'; //前端和前端进行页面的通信，相对路径即可，如果是前后端的通信一定是觉对路径。
                        //存储用户名，方便首页获取。
                        localStorage.setItem('loginname', $telphone.val());
                    }
                })
            })

        }
    }

});