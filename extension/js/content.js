// content.js
var ptiteObject = {
    domain: "//chickydev.ddns.net/",
    initcart: function(){
        var host = window.location.host;

        //Taobao
        if (host == 'world.taobao.com') {
            $('.item-buy-btn.tb-clearfix').prepend("<a class='remoteadd remoteaddtocartitem'>Thêm vào giỏ hàng PTITE SHOP</a>");
            $('body').append('<div class="cssload-container"><div class="cssload-whirlpool"></div><div class="notloggedin"><p>Xin hãy đăng nhập tại Ptite Shop trước khi đặt hàng!</p><a href="'+ptiteObject.domain+'customer/account/login/">Click vào đây để đăng nhập</a></div><div class="addedtocart"><p>Thêm vào giỏ hàng thành công!</p></div></div>');
            $.ajax({
                method: "get",
                url: ptiteObject.domain+"remotecart/index/getrating/",
                success: function(rate){
                    setInterval(function(){
                        var price = parseFloat($('.detail-bd-rt #J_PromoWrap .price.price-show .tb-rmb-num').text().replace('¥', ''));
                        $('#ptiteshopprice').remove();
                        $('.detail-bd-rt').prepend("<div class='item-promo tb-clearfix' id='ptiteshopprice'>" +
                            "<span class='tb-property' id='J_PriceName' style='font-weight: bold; font-size: 18px; width: 25%'>Giá VND</span>" +
                            "<div class='tb-property-cont tb-clearfix' style='width: 60%'>" +
                            "<div class='price price-show'>" +
                            "<strong class='tb-rmb-num'>"+number_format(price*rate, 0, ',', '.')+" VNĐ</strong><span class='add'></span>" +
                            "<span class='currency-exchange'>tỉ giá "+rate+" VNĐ</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                        $('#J_PromoWrap').after($('#ptiteshopprice'));
                    }, 1000);
                }
            });
            //1688
        } else if (host == 'detail.1688.com') {
            $('.obj-order').prepend("<div class='remoteaddwrap'><a class='remoteadd remoteaddtocartitem'>Thêm vào giỏ hàng PTITE SHOP</a></div>");
            $('body').append('<div class="cssload-container"><div class="cssload-whirlpool"></div><div class="notloggedin"><p>Xin hãy đăng nhập tại Ptite Shop trước khi đặt hàng!</p><a href="'+ptiteObject.domain+'customer/account/login/">Click vào đây để đăng nhập</a></div><div class="addedtocart"><p>Thêm vào giỏ hàng thành công!</p></div></div>');
            $.ajax({
                method: "get",
                url: ptiteObject.domain+"remotecart/index/getrating/",
                success: function(rate){
                    setInterval(function(){
                        var price = parseFloat($('.obj-list .list-total .price .value').text());
                        $('#ptiteshopprice').remove();
                        $('.obj-list').append("<div class='item-promo tb-clearfix' id='ptiteshopprice'>" +
                            "<span class='tb-property' id='J_PriceName' style='font-weight: bold; color: #888; font-size: 18px; width: 25%;'>Giá VND</span>" +
                            "<strong class='tb-rmb-num' style='font-weight: bold; font-size: 18px'> "+number_format(price*rate, 0, ',', '.')+" VNĐ</strong>" +
                            "<div class='tb-property-cont tb-clearfix' style='width: 60%'>" +
                            "<div class='price price-show'>" +
                            "<span class='add'></span>" +
                            "<span class='currency-exchange'>tỉ giá "+rate+" VNĐ</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                    }, 1000);
                }
            });
        } else if (host == 'detail.tmall.com' || host == 'world.tmall.com') {
            $('.tb-action').prepend("<div class='remoteaddwrap'><a class='remoteadd remoteaddtocartitem tmall-btn'>Thêm vào giỏ hàng PTITE SHOP</a></div>");
            $('body').append('<div class="cssload-container"><div class="cssload-whirlpool"></div><div class="notloggedin"><p>Xin hãy đăng nhập tại Ptite Shop trước khi đặt hàng!</p><a href="'+ptiteObject.domain+'customer/account/login/">Click vào đây để đăng nhập</a></div><div class="addedtocart"><p>Thêm vào giỏ hàng thành công!</p></div></div>');
            $.ajax({
                method: "get",
                url: ptiteObject.domain+"remotecart/index/getrating/",
                success: function(rate){
                    setInterval(function(){
                        var price = parseFloat($('.tm-promo-cur .tm-price').text());
                        $('.ptiteprice').remove();
                        $('.tm-promo-cur').after("<dl class='tm-promo-panel ptiteprice'>" +
                            "<dt class='tb-metatit' style='color: rgb(196, 0, 0); font-weight: bold;'>Giá VND</dt>" +
                            "<dd>" +
                            "<div class='tm-promo-price'>" +
                            "<span class='tm-price' style='font-size: 30px;color: #c40000;'>"+number_format(price*rate, 0, ',', '.')+" VND</span>" +
                            "<span class='currency-exchange' style='padding-left: 5px;'>tỉ giá "+rate+" VNĐ</span>" +
                            "</div>" +
                            "</dd>" +
                            "</dl>");
                    }, 1000);
                }
            });
        }
    },

    cartpopup: function() {
        $.ajax({
            method: "get",
            url: ptiteObject.domain+"remotecart/index/getcurrentcart/",
            success: function(data){
                var price = parseFloat($('.detail-bd-rt #J_PromoWrap .price.price-show .tb-rmb-num').text().replace('¥', ''));
                $(document).find('.shopping-cart-popup').remove();
                $('body').append("<div class='shopping-cart-popup' title='Click vào đây để xem giỏ hàng tại Ptite Shop' onclick='location.href=\""+ptiteObject.domain+"checkout/cart/\"\'>" +
                    "<div><b>Giỏ hàng</b> <span class='cart-count'>"+data+"</span></div>" +
                    "</div>");
            }
        });
    },

    remoteadd: function(sitename) {
        $('.cssload-container').fadeIn();
        $.ajax({
            method: "get",
            url: ptiteObject.domain+"remotecart/index/getloggedin/",
            success: function(data){
                if (data == 'ok') {
                    var data = {};
                    var optionTitle;
                    var optionValue;

                    if (sitename == 'taobao') {
                        data = {
                            product: 1,
                            name: $('#J_Title').text(),
                            image: $('#J_ThumbView').attr('src'),
                            qty: $('#J_IptAmount').val(),
                            url: window.location.href,
                            price: parseFloat($('.detail-bd-rt #J_PromoWrap .price.price-show .tb-rmb-num').text().replace('¥', '')),
                            option: {}
                        };
                        $('#J_SKU dl').each(function(index){
                            optionTitle = $(this).find('dt').text();
                            optionValue = $(this).find(".tb-selected a").attr('title');
                            data['option'][index] = {optionTitle: optionTitle, optionValue: optionValue};
                        });
                    } else if (sitename == '1688') {
                        data = {
                            product: 1,
                            name: $('#mod-detail-title .d-title').text(),
                            image: $('.mod-detail-gallery .tab-pane .box-img img').attr('src'),
                            qty: 1,
                            url: window.location.href,
                            price: parseFloat($('.obj-list .list-total .price .value').text()),
                            option: {}
                        };
                        $('.list-selected .table-list tr').each(function(index){
                            optionTitle = $(this).find('.prop').text();
                            optionValue = ($(this).find(".amount").text() != '') ? $(this).find(".amount").text() : $(this).find(".desc").text().replace('-+', '');
                            data['option'][index] = {optionTitle: optionTitle, optionValue: optionValue};
                        });
                    } else if (sitename == 'tmall') {
                        data = {
                            product: 1,
                            name: $('.tb-detail-hd h1').text(),
                            image: $('#J_ImgBooth').attr('src'),
                            qty: $('.mui-amount-input').val(),
                            url: window.location.href,
                            price: parseFloat($('.tm-promo-cur .tm-price').text()),
                            option: {}
                        };
                        $('.tb-key .tm-sale-prop').each(function(index){
                            optionTitle = $(this).find('.tb-metatit').text();
                            optionValue = $(this).find(".tb-selected a span").text();
                            data['option'][index] = {optionTitle: optionTitle, optionValue: optionValue};
                        });
                    }
                    console.log(data);

                    $.ajax({
                        method: "POST",
                        url: ptiteObject.domain+"checkout/cart/add/",
                        data: data,
                        success: function(response) {
                            $('.cssload-whirlpool').hide();
                            $('.addedtocart').show();
                            ptiteObject.cartpopup();
                            setTimeout(function(){
                                $('.cssload-whirlpool').show();
                                $('.addedtocart').hide();
                                $('.cssload-container').fadeOut();
                            }, 2000);
                        }
                    });
                } else {
                    $('.cssload-whirlpool').hide();
                    $('.notloggedin').show();
                }
            }
        });
    }
};

ptiteObject.initcart();
ptiteObject.cartpopup();

$('.remoteadd').on("click", function(e){
    e.preventDefault();
    var sitename;
    var host = window.location.host;
    if (host == 'world.taobao.com') {
        sitename = 'taobao';
    } else if (host == 'detail.1688.com') {
        sitename = '1688';
    } else if (host == 'detail.tmall.com' || host == 'world.tmall.com') {
        sitename = 'tmall';
    }
    ptiteObject.remoteadd(sitename);
});

function number_format (number, decimals, decPoint, thousandsSep) {

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number;
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
    var s = '';

    var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
                .toFixed(prec)
    };

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
}