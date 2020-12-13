define([], () => {
    return {
        init: function() {
            const $list = $('.menu-lists li');
            const $cartlist = $('.cartlist');
            const $item = $('.item');
            $list.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                //切换内容发生改变，不同的li对应不同的内容块。
                $item.eq($(this).index()).show().siblings('.item').hide();
                //改变右侧的大盒子的位置
                let $scrolltop = $(window).scrollTop();
                let $leftmenutop = $('.left-menu').offset().top;
                if ($scrolltop >= $leftmenutop) {
                    $cartlist.css({
                        top: $scrolltop - $leftmenutop
                    })
                } else {
                    $cartlist.css({
                        top: 0
                    })
                }
            }, function() {
                $cartlist.hide();
            });
            $cartlist.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });
        }
    }
});