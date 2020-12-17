define([], function() {
    return {
        init: function() {
            //1.表单验证。
            let $form = $('form'); //form表单。
            let $tel = $('[name=mobile]'); //手机号码
            let $password = $('[name=password]'); //密码
            let $captcha = $('[name=captcha]'); //验证码
            let $span = $('.tip .tips'); //span
            // 定义检测标记
            $telflag = true;
            $passflag = true;
            $capflag = true;

            //手机
            $tel.on('focus', function() {
                $span.eq(0).html('请输入11位正确的手机号码').css('color', '#333');
            });

            $tel.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                    if ($reg.test($value)) {
                        $span.eq(0).html('格式正确').css('color', 'green');
                        $telflag = true;
                        //手机号码格式没有问题，将手机号码传给后端。
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.125/dashboard/ROBAM_project/php/reg.php',
                            data: {
                                tel: $tel.val()
                            }
                        }).done(function(data) {
                            if (!data) { //不存在
                                $span.eq(0).html('格式正确').css('color', 'green');
                            } else { //存在
                                $span.eq(0).html('该手机号码已存在').css('color', 'red');
                            }
                        });

                    } else {
                        $span.eq(0).html('手机号码格式有误').css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $span.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
            });

            //密码
            $password.on('focus', function() {
                $span.eq(1).html('以字母开头，长度在6-18之间，只能包含字符、数字和下划线').css('color', '#333');
            });

            $password.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^[a-zA-Z]\w{5,17}$/;
                    if ($reg.test($value)) {
                        $span.eq(1).html('格式正确').css('color', 'green');
                        $passflag = true;
                    } else {
                        $span.eq(1).html('密码格式有误').css('color', 'red');
                        $passflag = false;
                    }
                } else {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
            });

            //验证码
            $captcha.on('focus', function() {
                $span.eq(2).html('请输入6位正确的验证码').css('color', '#333');
            });

            $captcha.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^\d{6}$/;
                    if ($reg.test($value)) {
                        $span.eq(2).html('格式正确').css('color', 'green');
                        $captchaflag = true;
                    } else {
                        $span.eq(2).html('验证码有误').css('color', 'red');
                        $captchaflag = false;
                    }
                } else {
                    $span.eq(2).html('验证码不能为空').css('color', 'red');
                    $captchaflag = false;
                }
            });
            //阻止表单的直接跳转。
            $form.on('submit', function() {
                if ($tel.val() === '') {
                    $span.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
                if ($captcha.val() === '') {
                    $span.eq(2).html('验证码不能为空').css('color', 'red');
                    $capflag = false;
                }

                if (!$telflag || !$passflag || !$capflag) {
                    return false;
                }
            });

        }
    }
});