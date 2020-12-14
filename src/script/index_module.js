define([], () => {
    return {
        init: function() {
            // 二级菜单
            function menu() {
                const $list = $('.menu-lists li');
                const $cartlist = $('.cartlist');
                const $item = $('.item');
                //添加移入效果
                $list.hover(function() {
                    $cartlist.show();
                    $(this).addClass('active').siblings('li').removeClass('active');
                    //切换内容发生改变，不同的li对应不同的内容块。
                    $item.eq($(this).index()).show().siblings('.item').hide();
                }, function() {
                    $cartlist.hide();
                });
                //右侧大盒子移除隐藏
                $cartlist.hover(function() {
                    $(this).show();
                }, function() {
                    $(this).hide();
                });
            }
            menu();
            // 轮播图
            function lunbotu() {
                const $lunbo = $('.right-banner');
                const $piclist = $('.lunbo ul li');
                const $btnlist = $('.lunbo ol li');
                const $left = $('.lunbo #left');
                const $right = $('.lunbo #right');
                let $num = 0;
                let $timer1 = null;
                let $timer2 = null;
                //1.小圆圈切换
                $btnlist.on('mouseover', function() {
                    $num = $(this).index();
                    $timer1 = setTimeout(function() {
                        bannerswitch()
                    }, 300);
                });
                $btnlist.on('mouseout', function() {
                    clearTimeout($timer1);
                });
                //2.左右箭头切换
                // console.log($num);
                // 按右键进行切换
                $right.on('click', function() {
                    $num++;
                    // console.log($num);
                    if ($num > $btnlist.length - 1) {
                        $num = 0;
                    }
                    bannerswitch();
                });
                // 按左键进行切换
                $left.on('click', function() {
                    $num--;
                    // console.log($num);
                    if ($num < 0) {
                        $num = $btnlist.length - 1;
                    }
                    // console.log($num);
                    bannerswitch();
                });
                //3.自动轮播
                $timer2 = setInterval(function() {
                    // $num++;
                    // if ($num > $btnlist.length - 1) {
                    //     $num = 0;
                    // }
                    // console.log($num);
                    // bannerswitch();
                    $right.click();
                }, 3000);

                //4.鼠标控制定时器停止和开启。
                // $lunbo.on('mouseover', function() {
                //     clearInterval($timer2);
                // });
                // $lunbo.on('mouseout', function() {
                //     setInterval($timer2);
                // });
                $lunbo.hover(function() {
                    clearInterval($timer2);
                }, function() {
                    $timer2 = setInterval(function() {
                        $right.click();
                    }, 3000)
                });
                //封装btnlist对应piclist
                function bannerswitch() {
                    $btnlist.eq($num).addClass('active').siblings().removeClass('active');
                    $piclist.eq($num).stop(true).animate({
                        opacity: 1
                    }).siblings().stop(true).animate({
                        opacity: 0
                    });
                }
            }
            lunbotu();
        }

    }
});