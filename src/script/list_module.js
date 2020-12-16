// 分页的接口：http://10.31.161.125/dashboard/ROBAM_project/php/listdata.php
//前端获取总的页数：后端提供
//pagination.js分页的插件，支持AMD格式。
//列表页的思路
//第一步：渲染列表页的第一页，默认的数据。
//第二步：将分页页码传递给后端，后端返回对应页码的数据，重新渲染。上面的两步渲染过程是一样的，数据是有区别的。
//第三步：排序，获取对应的元素结构(li)里面的价格(数字),将li组成为一个数组,对数组里面的li元素进行排序
//第四步：采用冒泡排序，两两相互比较(价格),通过价格改变li的排序。
define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            const $list = $('.list ul');
            let $array_default = []; //排序前的li放入此数组。
            let $array = []; //排序后的数组
            let $prev = []; //li里面的商品的前一个价格
            let $next = []; //li里面的商品的后一个价格
            //1.渲染列表页面
            $.ajax({
                url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listsdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                // console.log(datalist);
                data = datalist.pagedata; //获取接口里面数据
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}" class="">
                            <span class="bur-event">1212年终盛典</span>
                            <img src="${value.url}" alt="" class="bursting-pic">
                            <div class="bur-says">
                                <p class="bur-says1">大吸力果然效果好</p>
                                <p class="bur-says2">来自******4536的用户评价</p>
                            </div>

                        </a>
                        <div class="bur-detial">
                            <a href="detail.html?sid=${value.sid}">
                                <h2> ${value.title}</h2>
                                <p class="cont"> 0.01元购福袋抢iPhone12等10重豪礼!
                                </p>
                                <span class="price">￥${value.price}</span>
                                <span class="iconfont icon-pinzhibaozhang"></span><span class="txt">赠送4999积分</span>

                            </a>
                            <div class="btns">
                                <a href="detail.html?sid=${value.sid}" class="infor">查看详情</a>
                                <a href="detail.html?sid=${value.sid}" class="search">咨询有礼</a>
                                <a href="" class=" btns-price"> <span class="price">￥${value.price}</span></a>
                                <a href="" class="btns-txt"><span class="iconfont icon-pinzhibaozhang"></span><span class="txt">赠送4999积分</span></a>
                            </div>
                        </div>
                </li>
                    `;
                });
                $list.html($strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                //将li元素添加到排序前的数组中。
                $array_default = [];
                $array = [];
                $('.list li').each(function(index, element) { //element:原生的元素对象
                    $array_default[index] = $(this); //排序前
                    //比如每页长度是15，数组里面有15项
                    //index:0-14
                    //如果数据不够15条，只有10条，替换前面的10条，后面还多余了5条
                    $array[index] = $(this); //排序后
                });
                // console.log($array_default);


                //2.进行分页设置(html页面载入分页的结构)
                $('.page').pagination({
                    pageCount: datalist.pageno, //总的页数
                    jump: true, //是否开启跳转到指定的页数，布尔值。
                    prevContent: '', //将图标改成上一页下一页。
                    nextContent: '',
                    callback: function(api) {
                        // console.log(api.getCurrent()); //获取当前的点击的页码。
                        $.ajax({
                            url: 'http://10.31.161.125/dashboard/ROBAM_project/php/listsdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata; //获取接口里面数据
                            let $strhtml = ''
                            $.each(data, function(index, value) {
                                $strhtml += `
                                <li> 
                                    <a href="detail.html?sid=${value.sid}" class="">
                                        <a href="javascript:;" class="">
                                            <span class="bur-event">1212年终盛典</span>
                                            <img src="${value.url}" alt="" class="bursting-pic">
                                            <div class="bur-says">
                                                <p class="bur-says1">大吸力果然效果好</p>
                                                <p class="bur-says2">来自******4536的用户评价</p>
                                            </div>

                                        </a>
                                        <div class="bur-detial">
                                            <a href="javascript:;">
                                                <h2> ${value.title}</h2>
                                                <p class="cont"> 0.01元购福袋抢iPhone12等10重豪礼!
                                                </p>
                                                <span class="price">￥${value.price}</span>
                                                <span class="iconfont icon-pinzhibaozhang"></span><span class="txt">赠送4999积分</span>

                                            </a>
                                            <div class="btns">
                                                <a href="javascript:;" class="infor">查看详情</a>
                                                <a href="" class="search">咨询有礼</a>
                                                <a href="" class=" btns-price"> <span class="price">￥${value.price}</span></a>
                                                <a href="" class="btns-txt"><span class="iconfont icon-pinzhibaozhang"></span><span class="txt">赠送4999积分</span></a>
                                            </div>
                                        </div>
                                    </a>
                                 </li>
                                    `;
                            });
                            $list.html($strhtml);
                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });

                            //将li元素添加到排序前的数组中。
                            $array_default = [];
                            $array = [];
                            $('.list li').each(function(index, element) { //element:原生的元素对象
                                $array_default[index] = $(this); //排序前
                                $array[index] = $(this); //排序后
                            });
                            // console.log($array_default);
                        });
                    }
                });
                console.log(1);
                //3.点击按钮进行排序
                $('.Btns button').eq(0).on('click', function() {
                    console.log($('.Btns button'));
                    //遍历渲染。
                    $.each($array_default, function(index, value) { //遍历原数组，value就是li元素
                        $list.append(value);
                    });
                });
                $('.Btns button').eq(1).on('click', function() {
                    console.log($('.Btns button'));
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('.price').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('.price').html().substring(1)); //下一个价格
                            if ($prev > $next) {
                                //通过价格的比较,交换的是里面的这个li元素 升序
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $list.append(value);
                    });
                });

                $('.Btns button').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        console.log($('.Btns button'));
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('.price').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('.price').html().substring(1)); //下一个价格
                            if ($prev < $next) {
                                //通过价格的比较,交换的是里面的这个li元素 降序
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $list.append(value);
                    });
                });


            });
        }
    }
});