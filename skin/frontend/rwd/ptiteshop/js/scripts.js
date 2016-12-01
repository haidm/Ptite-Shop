/*global $j, jQuery, alert*/
(function ($j) {
    "use strict";
 
    function heroContentSlider() {
        var heroContSlider = $j('.hero-content-slider'),
            autoplay = heroContSlider.data('autoplay'),
            autoplaySpeed = heroContSlider.data('speed');
        if ($j(window).width() > 992) {
            heroContSlider.owlCarousel({
                animateOut: 'bounceOut',
                animateIn: 'bounceIn',
                autoplay: autoplay,
                autoplayTimeout: autoplaySpeed,
                items: 1,
                dots: false,
                mouseDrag: false,
                touchDrag: false,
                loop: true
            });
        } else {
            heroContSlider.owlCarousel({
                autoplay: false,
                items: 1,
                dots: false,
                mouseDrag: true,
                touchDrag: true,
                loop: true,
                autoHeight: true
            });
        }
    }
    function heroContentSliderFade() {
        $j('.hero-content-slider').css({ 'opacity': '1' })
    }
    
    function heroSliderOwl() {
        var heroOwlSlider = $j(".hero-slider"),
            autoplay = heroOwlSlider.data('autoplay'),
            autoplaySpeed = heroOwlSlider.data('speed'),
            touchSlide = heroOwlSlider.data('touch-drag');
        heroOwlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: false,
            nav: true,
            navSpeed: 500,
            loop: true,
            autoHeight : true,
            navText: ["<img src='/skin/frontend/rwd/ptiteshop/images/slider-left-thin-arrow.png'>", "<img src='/skin/frontend/rwd/ptiteshop/images/slider-right-thin-arrow.png'>"]
        });
        if ($j('.hero-fullscreen>div').hasClass('hero-slider')) {
            $j('.hero-fullscreen').css({'padding': '0'});
        }
    }
    
    function sliderOwl() {
        var owlSlider = $j(".carousel"),
            autoplay = owlSlider.data('autoplay'),
            autoplaySpeed = owlSlider.data('speed'),
            touchSlide = owlSlider.data('touch-drag'),
            loopSlides = owlSlider.data('loop');
        owlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: true,
            nav: true,
            loop: loopSlides,
            autoHeight : true,
            navText: ["<img src='/skin/frontend/rwd/ptiteshop/images/slider-left-thin-arrow.png'>", "<img src='/skin/frontend/rwd/ptiteshop/images/slider-right-thin-arrow.png'>"],
            navRewind: true,
            slideBy : 'page'
        });
    }
        
    function progressBars() {
        function progressBar() {
            $j('.progress').each(function () {
                $j(this).find('.progress-bar').animate({
                    width: $j(this).attr('data-percent')
                }, 800);
            });
        }
        if ($j('.progress-bars').data('animate-on-scroll') === 'on') {
            $j('.progress-bars').waypoint(function () {
                progressBar();
            }, { offset: '100%', triggerOnce: true });
        } else {
            progressBar();
        }
    }
    
    function progressCircles() {
        function progressCircle() {
            var totalProgress, progress, circles;
            circles = document.querySelectorAll('.progress-svg');
            for(var i = 0; i < circles.length; i++) {
                totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
                progress = circles[i].parentElement.getAttribute('data-circle-percent');
                circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
            }
        };
        if ($j('.progress-circles').data('animate-on-scroll') === 'on') {
            $j('.progress-circle').waypoint(function () {
                progressCircle();
            }, { 
                offset: '70%', 
                triggerOnce: true 
            });
        } else {
            progressCircle();
        };
    }
    
    function vossenIframes() {
        $j('.video-container').click(function(){
            $j(this).addClass('reveal'); 
            var videoImg = $j(this).find('img'),
                videoIframe = $j(this).find('iframe'),
                videoAttr = videoIframe.attr('data-video-embed'),
                videoPlay = videoAttr + "?autoplay=1&autoplay=true";
            videoImg.animate({'opacity': 0}, 300);
            videoIframe.css('visibility', 'visible').attr('src', videoPlay);
            videoIframe[0].setAttribute('allowFullScreen', '');
        });
    }
    
    function teamSlider() {
        $j(".team-slider").owlCarousel({
            autoplay : false,
            items: 3,
            dots: true,
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }
    
    function quoteSlider() {
        var quoteOwl = $j('.quote-slider');
        quoteOwl.owlCarousel({
            autoplay: false,
            autoplayTimeout: 3000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: ["<img src='/skin/frontend/rwd/ptiteshop/images/slider-left-thin-arrow.png'>", "<img src='/skin/frontend/rwd/ptiteshop/images/slider-right-thin-arrow.png'>"]
        });
    }
 
    function vossenPortfolio() {
        var vosPortfolio = $j('.vossen-portfolio'),
            initFilter = $j('.vossen-portfolio-filters'),
            vossenFilters = $j('.vossen-portfolio-filters li'),
            portfolioItems = $j('.vossen-portfolio > div'),
            initialCat;
        
        // Init Filter to class except *all
        initFilter.each(function () {
            var dataOption = $j(this).attr('data-initial-filter');
            $j(this).attr('data-initial-filter', '.' + dataOption);
            if ($j(initFilter).data('initial-filter') === '.*') {
                $j(this).attr('data-initial-filter', '*');
            }
        });
        // Filters data to class except first
        vossenFilters.not(':first').each(function () {
            var dataOption = $j(this).attr('data-filter');
            $j(this).attr('data-filter', "." + dataOption);
        });
        // Items data to class
        portfolioItems.each(function () {
            var dataOption = $j(this).attr('data-filter');
            $j(this).addClass(dataOption);
        });
        // Animate Items
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $j(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        initialCat = $j('.vossen-portfolio-filters').attr('data-initial-filter');
        // Add active class to filter
        $j('.vossen-portfolio-filters li[data-filter="' + initialCat + '"]').addClass('active');
        // Init Isotope Filters
        vossenFilters.on('click', function () {
            $j('.vossen-portfolio-filters li.active').removeClass('active');
            $j(this).addClass('active');
            var filterValue = $j(this).attr('data-filter');
            vosPortfolio.isotope({
                filter: filterValue
            });
        });
        // Init Isotope
        var $jgrid = vosPortfolio.isotope({
            itemSelector: '.vossen-portfolio > div',
            percentPosition: true,
            filter: initialCat,
            masonry: {
                columnWidth: '.vossen-portfolio > div'
            }
        });
        $jgrid.imagesLoaded().progress( function() {
            $jgrid.isotope('layout');
        });
    }
    
    $j(window).resize(function (){
        setTimeout(function(){ 
            $j('.vossen-portfolio-filters .active').trigger('click');
        }, 600);
    });
    
    function testimonialSlider() {
        var testimonialsOwl = $j('.testimonials'),
            autoplay = testimonialsOwl.data('autoplay'),
            autoplaySpeed = testimonialsOwl.data('speed');
        testimonialsOwl.owlCarousel({
            autoplay : autoplay,
            autoplayTimeout: autoplaySpeed,
            autoplaySpeed: 700,
            loop: true,
            items: 1,
            dots: true,
            dotsSpeed: 400
        });
    }
    
    function clientsSlider() {
        var clientSlider = $j(".clients-slider"),
            autoplay = clientSlider.data('autoplay'),
            autoplaySpeed = clientSlider.data('speed');
        clientSlider.owlCarousel({
            autoplay : autoplay,
            autoplayTimeout: autoplaySpeed,
            loop: false,
            dots: false,
            nav: false,
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    }
    
    function contactForm() {
        $j('#contactform').submit(function () {
            var action = 'php/contact-form.php';
            $j("#message-info").slideUp(250, function () {
                $j('#message-info').hide();
                $j('#submit')
                    .after('<div class="loader"><div></div></div>')
                    .attr('disabled', 'disabled');
                $j.post(action, {
                    name: $j('#name').val(),
                    email: $j('#email').val(),
                    phone: $j('#phone').val(),
                    message: $j('#message').val()
                },
                    function (data) {
                        document.getElementById('message-info').innerHTML = data;
                        $j('#message-info').slideDown(250);
                        $j('#contactform .loader div').fadeOut('slow', function() {
                            $j(this).remove(); 
                        });
                        $j('#submit').removeAttr('disabled');
                        if (data.match('success') !== null) {
                            $j('#contactform').slideUp(850, 'easeInOutExpo');
                        }
                    });
            });
            return false;
        });
    }
    
    function subscribeForm() {
        $j('#subscribe-form,#subscribe-form-2').on('submit', function (e) {
            e.preventDefault();
            var $jel = $j(this),
                $jalert = $jel.find('.form-validation'),
                $jsubmit = $jel.find('button'),
                action = $jel.attr('action');
            $jsubmit.button('loading');
            $jalert.removeClass('alert-danger alert-success');
            $jalert.html('');
            $j.ajax({
                type     : 'POST',
                url      : action,
                data     : $jel.serialize() + '&ajax=1',
                dataType : 'JSON',
                success  : function (response) {
                    if (response.status === 'error') {
                        $jalert.html(response.message);
                        $jalert.addClass('alert-danger').fadeIn(500);
                    } else {
                        $jel.trigger('reset');
                        $jalert.html(response.message);
                        $jalert.addClass('alert-success').fadeIn(500);
                    }
                    $jsubmit.button('reset');
                }
            });
        });    
    }
    
    function vosMap() {
        $j('#vossen-map').waypoint(function () {
            initVossenMaps()
        }, { offset: '100%', triggerOnce: true });
    }
    
    function vossenHeader() {
        $j('.nav li.dropdown>a, .dropdown-submenu>a').on('click', function () {
            $j(this).closest('.dropdown').siblings().removeClass('open');
            $j(this).closest('.dropdown').toggleClass('open');
            return false;
        });
        $j('.nav li a, .btn-scroll').on('click', function () {
            var $janchor = $j(this);            
            function scrollToAnchor() {
                $j('html, body').stop().animate({
                    scrollTop: $j($janchor.attr('href')).offset().top - offsetVar
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            }
            if ($j(window).width() > 992) {
                var offsetVar = '59';
                scrollToAnchor();
            } else {
                var offsetVar = '0';
                scrollToAnchor();
            }
        });
        function navSmall() {
            $j(window).scroll(function (){
                if ($j(window).scrollTop() > 70) {
                $j('nav').addClass("nav-small");
                } else {
                    $j('nav').removeClass("nav-small");
                }
            });
        }
        if ($j('nav').data('animation') === 'hiding') {
            var vosWindow = $j(window);
            var navPosition = vosWindow.scrollTop();
            vosWindow.scroll(function() {
                if(vosWindow.scrollTop() > navPosition) {
                    $j('nav').removeClass('nav-down').addClass('nav-up');
                } else {
                    $j('nav').removeClass('nav-up').addClass('nav-down');
                }
                navPosition = vosWindow.scrollTop();
             });
            navSmall();
        } else {
            navSmall();
        }
        $j('.scroll-top').on('click', function () {
            $j('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
            return false;
        });
        function elementsAnchor() {
            var hash = window.location.hash;
            if (hash != '') {
                setTimeout(function() {
                    $j('html, body').stop().animate({
                        scrollTop: $j(hash).offset().top - 59
                    }, 1000, 'easeInOutExpo');
                    history.pushState('', document.title, window.location.pathname);
                }, 500);
            }  
        } elementsAnchor();
    }
    
    function bootstrapTools() {
        $j('#accordion,#accordion2').on('show.bs.collapse', function () {
            $j('#accordion .in').collapse('hide');
        });
        $j("[data-toggle='tooltip']").tooltip();
        $j('#buttonTabs a,#iconTabs a').click(function (e) {
            e.preventDefault();
            $j(this).tab('show');
        });
    }
    
    function twitterFeedSlider() {
        if ($j('#twitter-feed-slider').length) {
            var twitterUser, twitterNumber, twitterFeedSlider;
            twitterUser = $j('#twitter-feed-slider').attr('data-twitter-widget-id');
            twitterNumber = $j('#twitter-feed-slider').attr('data-max-tweets');
            twitterFeedSlider = {
                "id": twitterUser,
                "domId": 'twitter-feed-slider',
                "maxTweets": twitterNumber,
                "enableLinks": true,
                "showImages": false
            };
            twitterFetcher.fetch(twitterFeedSlider);
        }
    }
    
    function twitterFeedSliderInit() {
        if ($j('#twitter-feed-slider').length) {
            $j('#twitter-feed-slider ul').addClass('twitter-feed-slider navigation-thin');
             var twitterAutoSpeed = $j('#twitter-feed-slider').attr('data-slider-speed');
            $j('.twitter-feed-slider').owlCarousel({
                autoplay: true,
                autoplayTimeout: twitterAutoSpeed,
                items: 1,
                dots: false,
                mouseDrag: true,
                touchDrag: true,
                loop: true
            });
        }
    }
    
    function twitterFeedList() {
        if ($j('#twitter-feed-list').length) {
            var twitterUser, twitterNumber, twitterFeedList;
            twitterUser = $j('#twitter-feed-list').attr('data-twitter-widget-id');
            twitterNumber = $j('#twitter-feed-list').attr('data-max-tweets');
            twitterFeedList = {
                "id": twitterUser,
                "domId": 'twitter-feed-list',
                "maxTweets": twitterNumber,
                "enableLinks": true,
                "showImages": false
            };
            twitterFetcher.fetch(twitterFeedList);
        }
    }
    
    function countUp() {
        $j('#fun-facts').waypoint(function () {
            $j('.counter h1').each(function() {
            var $jthis = $j(this),
                countTo = $jthis.attr('data-count');
                $j({ countNum: $jthis.text()}).animate({
                    countNum: countTo
                }, {
                    duration: 1700,
                    easing:'linear',
                    step: function() {
                      $jthis.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                      $jthis.text(this.countNum);
                      //alert('finished');
                    }
                });  
            });
        }, { offset: '100%', triggerOnce: true });
    }
    
    function countdown() {
        var dateUser = $j("#countdown-timer").attr('data-date'),
            deadline = new Date(dateUser);
        function updateClock() {
            var today = Date(),
                diff = Date.parse(deadline) - Date.parse(today);
            if (diff <= 0) {
                clearInterval(interval);
            } else {
                var seconds = Math.floor((diff / 1000) % 60),
                    minutes = Math.floor((diff / 1000 / 60) % 60),
                    hours = Math.floor((diff / 1000 / 60 / 60) % 24),
                    days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5),
                    months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);
                $j("#months").text(('0' + months).slice(-2));
                $j("#days").text(('0' + days).slice(-2));
                $j("#hours").text(('0' + hours).slice(-2));
                $j("#minutes").text(('0' + minutes).slice(-2));
                $j("#seconds").text(('0' + seconds).slice(-2));
            }
        }
        var interval = setInterval(updateClock, 1000);
    }
    
    function vossenBlogGrid() {
        var vosPortfolio = $j('.vossen-blog-grid'),
            portfolioItems = $j('.vossen-blog-grid > div');
        portfolioItems.each(function () {
            var dataOption = $j(this).attr('data-filter');
            $j(this).addClass(dataOption);
        });
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $j(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        vosPortfolio.isotope({
            itemSelector: '.vossen-blog-grid > div',
            percentPosition: true,
            masonry: {
                columnWidth: '.vossen-blog-grid > div'
            }
        });
        // Init Isotope
        var $jbloggrid = vosPortfolio.isotope({
            itemSelector: '.vossen-blog-grid > div',
            percentPosition: true,
            masonry: {
                columnWidth: '.vossen-blog-grid > div'
            }
        });
        $jbloggrid.imagesLoaded().progress( function() {
            $jbloggrid.isotope('layout');
        });
    }
    
    function lightbox() {
        $j('.lightbox').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery:{
                enabled:true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><img src="/skin/frontend/rwd/ptiteshop/images/slider-left-thin-arrow.png"></button>',
            },
            mainClass: 'mfp-zoom-in',
            removalDelay: 500, //delay removal to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                }
            },     
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            midClick: true
        });
    }
    
    $j(document).ready(function () {
        $j.when(heroContentSlider()).then(heroContentSliderFade());
        heroSliderOwl();
        progressBars();
        progressCircles();
        teamSlider();
        countUp();
        vossenIframes();
        quoteSlider();
        parallaxVossen();
        vossenPortfolio();
        testimonialSlider();
        clientsSlider();
        contactForm();
        subscribeForm();
        vosMap();
        sliderOwl();
        vossenHeader();
        bootstrapTools();
        twitterFeedSlider();
        twitterFeedList();
        countdown();
        vossenBlogGrid();
        lightbox();
    });
    
    $j(window).load(function () {
        twitterFeedSliderInit();
    });
  
    $j(window).on('scroll', function () {
        
    });
     
}(jQuery));  