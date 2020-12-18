define(['jlazyload'], () => {
    return {
        init: function() {
            // 二级菜单
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
            // 轮播图
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
            // 双12特惠渲染
            const $limitlists = $('.limit-box ul');
            $.ajax({
                url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    if (index >= 1 && index <= 6) {
                        $strhtml += `
                        <li>
                            <div class="limit-l fl">
                                <span>1212年终盛典</span>
                                <a href="">
                                    <img src="${value.url}" alt="">
                                </a>
                            </div>
                            <div class="limit-r fr">
                                <h2>${value.title}</h2>
                                <p>12. 12年终盛典:同价双11! 领券立臧100元!<br> 0.01元购福袋抢iPhone12等10重豪礼!</p>
                                <span class="txt">特惠价:</span>
                                <span class="price">￥${value.price}</span>
                                <div class="btn">立即购买</div>
                            </div>
                        </li>
                        `;
                    }
                });
                $limitlists.html($strhtml);

                //懒加载
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            // 热销渲染
            const $saleLists1 = $('.salebox-r .salebox-r-lists1');
            $.ajax({
                url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $salehtml1 = '';
                $.each(data, function(index, value) {
                    if (index >= 7 && index <= 10) {
                        $salehtml1 += `
                            <li>
                                <a href="">
                                    <div class="bt"><span class="bur-event">1212年终盛典</span></div>
                                    <div class="sale-pic fl">
                                        <img src="${value.url}" alt="">
                                    </div>
                                    <div class="con-box fr">
                                        <h2>${value.title}</h2>
                                        <p>27N0H+57B0</p>
                                        <p>0.01元抢iPhone12等10重豪礼！</p>
                                        <div class="price">¥${value.price}</div>
                                        <div class=" txt "><i></i>赠送4599积分</div>
                                        <span class="search ">咨询有礼</span>
                                    </div>
                                </a>
                            </li>
                        `;
                    }
                });
                $saleLists1.html($salehtml1);
                //懒加载
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            const $saleLists2 = $('.salebox-r .salebox-r-lists2');
            $.ajax({
                url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $salehtml2 = '';
                $.each(data, function(index, value) {
                    if (index >= 11 && index <= 14) {
                        $salehtml2 += `
                            <li>
                                <a href="">
                                    <div class="bt"><span class="bur-event">1212年终盛典</span></div>
                                    <div class="sale-pic fl">
                                        <img src="${value.url}" alt="">
                                    </div>
                                    <div class="con-box fr">
                                        <h2>${value.title}</h2>
                                        <p>27N0H+57B0</p>
                                        <p>0.01元抢iPhone12等10重豪礼！</p>
                                        <div class="price">¥${value.price}</div>
                                        <div class=" txt "><i></i>赠送4599积分</div>
                                        <span class="search ">咨询有礼</span>
                                    </div>
                                </a>
                            </li>
                        `;
                    }
                });
                $saleLists2.html($salehtml2);
                //懒加载
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            const $saleLists3 = $('.salebox-r .salebox-r-lists3');
            $.ajax({
                url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $salehtml1 = '';
                $.each(data, function(index, value) {
                    if (index >= 15 && index <= 18) {
                        $salehtml1 += `
                            <li>
                                <a href="">
                                    <div class="bt"><span class="bur-event">1212年终盛典</span></div>
                                    <div class="sale-pic fl">
                                        <img src="${value.url}" alt="">
                                    </div>
                                    <div class="con-box fr">
                                        <h2>${value.title}</h2>
                                        <p>27N0H+57B0</p>
                                        <p>0.01元抢iPhone12等10重豪礼！</p>
                                        <div class="price">¥${value.price}</div>
                                        <div class=" txt "><i></i>赠送4599积分</div>
                                        <span class="search ">咨询有礼</span>
                                    </div>
                                </a>
                            </li>
                        `;
                    }
                });
                $saleLists3.html($salehtml1);
                //懒加载
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            // tab选项卡----热销爆款
            const $titles = $('.recom');
            const $saleContents = $('.salebox-r ul');
            let $timer3 = null;
            $titles.hover(function() {
                $(this).addClass('reActive').siblings('.recom').removeClass('reActive');
                console.log($(this).index() - 2);
                $saleContents.eq($(this).index() - 2).addClass('salebox-r-lists').siblings('ul').removeClass('salebox-r-lists');
            }, function() {});


            //检测是否用户已经登录
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.login').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });
            //赋值件数给右上角的购物车图标
            if (localStorage.getItem('goodsnum') && localStorage.getItem('loginname')) {
                console.log(1);
                $('.top .t-num').html(localStorage.getItem('goodsnum'));
            }
        }
    }
});