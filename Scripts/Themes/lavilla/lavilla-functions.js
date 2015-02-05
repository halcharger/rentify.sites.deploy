/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */

/*
1) navigation
2) tabs
3) accordion and toggles
4) sliders
5) hero
6) background image
7) form elements
8) form validation
9) form submit
10) table
11) map
12) go to top
13) masonry gallery
14) debouncer
15) window resize
*/

jQuery(document).ready(function ($) {

    "use strict";

    /* -------------------------- */
    /* 1) navigation */
    /* -------------------------- */

    $('.header nav li:has(ul)').addClass('dropdown-submenu');

    var lw = $('#logo img').width(),
		tlww,
		trww = $('.top-header-widgets .right-widget').width(),
		rhw,
		available_space_header,
		available_space_top_header,
		cw;

    function top_left_widget_width() {
        var w = 0;
        $('.top-header-widgets .left-widget .contact-content span').each(function () {
            w = w + $(this).outerWidth(true);
        });
        return w;
    }
    tlww = top_left_widget_width();

    function right_header_width() {
        var w = 0;
        $('ul.sf-menu > li').each(function () {
            w = w + $(this).outerWidth(true);
        });
        return w;
    }
    rhw = right_header_width();

    function menu_resize() {

        cw = $('.header .container').width();
        available_space_header = cw - lw - rhw;
        available_space_top_header = cw - tlww - trww;

        if (available_space_top_header <= 0) {
            $('.top-header').addClass('mobile');
        } else {
            $('.top-header').removeClass('mobile');
        }

        if (available_space_header <= 0) {
            if (!$('.header').hasClass('mobile-header')) {
                $('.responsive-menu > ul').hide();
            }
            $('.header').addClass('mobile-header');
            $('.header').removeClass('is-fixed-header');
            $('.responsive-menu').superfish('destroy');
            sticky_header();
        } else {
            $('.header').removeClass('mobile-header');
            $('.responsive-menu li').removeClass('menuOpen');
            $('.responsive-menu > ul').show();
            $('.responsive-menu').superfish({
                onBeforeShow: function () {
                    if ($(this).parents('ul').length > 1) {
                        var w = $(window).width();
                        var ul_offset = $(this).parents('ul').offset();
                        var ul_width = $(this).parents('ul').outerWidth();
                        if (ul_offset.left + ul_width * 2 > w) {
                            $(this).addClass('sf-menu-sub-left');
                        } else {
                            $(this).removeClass('sf-menu-sub-left');
                        }
                    };
                }
            });
        }

        $('.responsive-menu').css('opacity', 1);
        $('.left-widget').css('opacity', 1);
        $('.top-header').css('height', 'auto');

    }

    $('.responsive-menu li > ul').before('<span class="plus-minus"><span class="plus">+</span><span class="minus">_</span></span>');

    $('.responsive-menu span.plus-minus').on('click', function () {
        $(this).next('ul').slideToggle(function () {
            $(this).parent().toggleClass('menuOpen');
        });
        return false;
    });

    $('.responsive-menu a:not(.menubtn)').on('click', function () {
        if ($(this).parents('.header').hasClass('mobile-header')) {
            if ($(this).attr('href') == '#') {
                $(this).parent().find('ul').first().slideToggle(function () {
                    $(this).parent().toggleClass('menuOpen');
                });
                return false;
            }
        }
    });

    $('.menubtn').on('click', function () {
        $('.responsive-menu > ul').slideToggle(function () {
            $('.menubtn').toggleClass('menuOpen');
        });
        return false;
    });

    $('.contact-details-trigger').on('click', function () {
        $(this).toggleClass('active');
        $('.contact-content').slideToggle();
    });

    function sticky_header() {
        var header_height = $('.header').height();
        var top_header_height = $('.top-header').height();
        var scroll = $(window).scrollTop();
        if ((scroll >= top_header_height) && ($('.header').hasClass('fixed-header')) && (!$('.header').hasClass('mobile-header'))) {
            $('.header').addClass('is-fixed-header').removeClass('is-scrolling-header');
            $('#wrapper').css('padding-top', header_height + top_header_height);
            $('.top-header').hide();
        } else {
            $('.header').removeClass('is-fixed-header').addClass('is-scrolling-header');
            $('#wrapper').css('padding-top', 0);
            $('.top-header').show();
        }

        if ((scroll >= top_header_height + 40) && ($('.header').hasClass('fixed-header')) && (!$('.header').hasClass('mobile-header'))) {
            $('.header').addClass('small-header');
        } else {
            $('.header').removeClass('small-header');
        }
    }

    $(window).scroll(function () {
        sticky_header();
    }).scroll();

    $('.right-header').css({ 'transition': 'margin 0.8s' });

    /* end 1) navigation */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 2) tabs */
    /* -------------------------- */

    function tabs_buttons() {
        $('.tabs').each(function () {
            $(this).removeClass('tabs-buttons');

            var nav_width = $(this).find('.ui-tabs-nav').outerWidth(true);
            var tabs_width = 0;

            $(this).find('.ui-tabs-nav li.ui-state-default').each(function () {
                var this_width = $(this).outerWidth(true);
                tabs_width = tabs_width + this_width;
            });

            if (tabs_width > nav_width) {
                $(this).addClass('tabs-buttons')
            }

        })
    }

    function tabs_fadein() {
        $('.ui-tabs-panel').each(function () {
            if ($(this).is(':visible')) {
                $(this).find('*:not(.ui-accordion-content)').fadeIn();
            } else {
                $(this).find('*').hide();
            }
        });
    }

    if ($('.tabs').length > 0) {
        $('.tabs').tabs({
            create: function () {
                tabs_buttons();
                tabs_fadein();
            },
            activate: function () {
                tabs_fadein();
            }
        });
    }

    /* end 2) tabs */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 3) accordion and toggles */
    /* -------------------------- */

    function accordion_icons() {
        $('.ui-accordion-header-icon, .toggles > p span').each(function () {
            if ($(this).parent().hasClass('ui-accordion-header-active') || $(this).parent().hasClass('active')) {
                $(this).html('&ndash;').css({
                    top: '46%',
                    left: '12px'
                });
            }
            else {
                $(this).html('+').css({
                    top: '50%',
                    left: '11px'
                });
            }
        })
    }

    if ($('.accordion').length > 0) {
        $('.accordion').accordion({
            active: false,
            heightStyle: 'content',
            collapsible: true,
            activate: function () {
                accordion_icons();
            }
        });
    }

    $('.toggles > p').append('<span class="icon"></span>');
    $('.toggles > p').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle();
        accordion_icons();
    });
    accordion_icons();

    /* end 3) accordion and toggles */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 4) sliders */
    /* -------------------------- */

    function position_slide_controls() {
        $('.testimonials-slider, .posts-slider').each(function () {
            var total_width = 0,
				t = $(this);
            t.find('.owl-pagination .owl-page').each(function () {
                total_width += $(this).outerWidth(true);
            });
            var pager_buttons_margin = 12;
            var button_distance = ((t.find('.owl-pagination').width() - total_width) / 2) - t.find('.owl-prev').width() - pager_buttons_margin;
            t.find('.owl-prev').css('left', button_distance + 'px');
            t.find('.owl-next').css('right', button_distance + 'px');
        });
    }

    var slider_options = {
        autoHeight: true,
        navigation: true,
        navigationText: ['<span>&#8249;</span>', '<span>&#8250;</span>'],
        pagination: true,
        singleItem: true,
        slideSpeed: 400,
        paginationSpeed: 400,
        rewindSpeed: 600
    };

    if ($('#hero-slider').length > 0) {
        var hero_slider_options = JSON.parse(JSON.stringify(slider_options));
        var transition = $('#hero-slider').data('transition');
        if (transition == 'fade' || transition == 'goDown' || transition == 'backSlide') {
            hero_slider_options.transitionStyle = transition;
        }
        var autoplay = $('#hero-slider').data('autoplay');
        if (autoplay === parseInt(autoplay)) {
            hero_slider_options.autoPlay = autoplay;
        }
        $('<img/>').load(function () {
            $(this).remove();
            $('#hero-slider img.initial-img').animate({ 'opacity': 1 }, function () {
                $('#hero-slider').css('background', '#fff');
                $('#hero-slider img, .hero-slider-caption-wrapper').css('display', 'block');
                $('#hero-slider .slider').owlCarousel(hero_slider_options);
            });
        }).attr('src', $('#hero-slider img.initial-img').attr('src'));
    }

    $(window).load(function () {
        position_slide_controls();
    });

    if ($('.slider').length > 0) {
        $('.posts-slider .slider, .testimonials-slider .slider').owlCarousel(slider_options);

        slider_options.pagination = false;
        slider_options.afterAction = slider_sync_position;
        $('.gallery-slider-main').owlCarousel(slider_options);
    }

    function slider_sync_position(el) {
        var current = this.currentItem;
        var $gallery_slider_thumbs = this.$elem.parent().find('.gallery-slider-thumbs');
        $gallery_slider_thumbs.find('.owl-item').removeClass('current').eq(current).addClass('current');
        if ($gallery_slider_thumbs.data('owlCarousel') !== undefined) {
            slider_center($gallery_slider_thumbs, current);
        }
    }

    function slider_center(slider, number) {
        var sync2 = slider;
        var sync2visible = sync2.data('owlCarousel').owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                found = true;
            }
        }
        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger('owl.goTo', num - sync2visible.length + 2);
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger('owl.goTo', num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger('owl.goTo', sync2visible[1]);
        } else if (num === sync2visible[0]) {
            sync2.trigger('owl.goTo', num - 1);
        }
    }

    function gallery_thumbs() {
        $('.gallery-slider').each(function () {
            var $gallery = $(this);
            var $gallery_thumbs = $gallery.find('.gallery-slider-thumbs');
            var gallery_width = $gallery.find('.gallery-slider-main').width();
            var left_and_right_margin = 80;
            var item_width = 80 + 20;
            if (gallery_width < 500) {
                $gallery.addClass('gallery-small');
                item_width = 40 + 10;
                left_and_right_margin = 70;
            } else {
                $gallery.removeClass('gallery-small');
            }
            var nb_items = Math.floor((gallery_width - left_and_right_margin) / item_width);
            if (nb_items > $gallery_thumbs.find('.thumb').length) {
                nb_items = $gallery_thumbs.find('.thumb').length;
            }

            var owl = $gallery_thumbs.data('owlCarousel');
            if (owl) {
                owl.destroy();
            }

            delete slider_options.afterAction;
            slider_options.singleItem = false;
            slider_options.itemsCustom = [[0, nb_items]];
            slider_options.items = nb_items;
            slider_options.itemsDesktop = false;
            slider_options.autoHeight = false;
            slider_options.itemsDesktopSmall = false;
            slider_options.itemsTablet = false;
            slider_options.itemsMobile = false;
            slider_options.pagination = false;
            slider_options.scrollPerPage = true;
            slider_options.itemForcedWidth = item_width;

            $gallery_thumbs.owlCarousel(slider_options);
            var main_owl = $('.gallery-slider-main').data('owlCarousel');
            $gallery_thumbs.find('.owl-item').eq(main_owl.currentItem).addClass('current');
            $gallery_thumbs.width(nb_items * item_width);

        });
    }

    $('.gallery-slider-thumbs a.thumb').each(function () {
        $(this).data('thumb-index', $(this).parent().index());
    });

    $('.gallery-slider-thumbs a.thumb').on('click', function () {
        $(this).parents('.gallery-slider').find('.gallery-slider-main').trigger('owl.goTo', $(this).data('thumb-index'));
        return false;
    });

    /* end 4) sliders */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 5) hero */
    /* -------------------------- */

    function hero_resize() {
        if ($('#wrapper').width() <= 750) {
            $('#hero-slider, #hero-img').addClass('small-hero');
            $('.transition-image').addClass('small-transition');
        } else {
            $('#hero-slider, #hero-img, .transition-image').removeClass('small-hero');
            $('.transition-image').removeClass('small-transition');
        }
        $('.hero-slider-caption-wrapper').width($('#main-content .container').width());
    }

    if ($('#hero-img').length > 0) {
        $('<img/>').load(function () {
            $(this).remove();
            $('#hero-img img').animate({ 'opacity': 1 }, function () {
                $('#hero-img').css('background', '#fff');
            });
        }).attr('src', $('#hero-img img').attr('src'));
    }

    /* end 5) hero */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 6) background image */
    /* -------------------------- */

    function resize_img(jQimg) {
        var jQpar = jQimg.parent();
        if (jQpar.is('body')) {
            jQpar = $('html');
        }
        var par_w = jQpar.width();
        var par_h = jQpar.height();
        var img_w = jQimg.data('native-width');
        var img_h = jQimg.data('native-height');
        if ((par_w / par_h) < (img_w / img_h)) {
            jQimg.css({ height: '100%', width: 'auto' });
            jQimg.css({ 'left': (par_w - jQimg.width()) / 2, 'top': 0 });
        } else {
            jQimg.css({ width: '100%', height: 'auto' });
            jQimg.css({ 'top': (par_h - jQimg.height()) / 2, 'left': 0 });
        }
    }

    $('.bg-img, .bg-img-content').each(function () {
        var jQimg = $(this);
        var jSimg = new Image();
        jSimg.onload = function () {
            jQimg.data('native-width', jSimg.width);
            jQimg.data('native-height', jSimg.height);
            jQimg.css({ 'display': 'none', 'left': 0 });
            resize_img(jQimg);
            jQimg.fadeIn();
        }
        jSimg.src = jQimg.attr('src');
    });

    /* end 6) background image */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 7) form elements */
    /* -------------------------- */

    if ($('select').length > 0) {
        $('select').customSelect({
            customClass: 'select-box'
        });
    }

    if ($('input[type=checkbox]').length > 0) {
        $('input[type=checkbox]').iCheck({
            checkboxClass: 'checkbox',
            insert: '<span class="tick">&#xf00c;</span>'
        });
    }

    if ($('input[type=radio]').length > 0) {
        $('input[type=radio]').iCheck({
            radioClass: 'radio',
            insert: '<span class="circle"></span>'
        });
    }

    $('input[type=checkbox], input[type=radio]').on('ifChecked', function (event) {
        $(this).prop('checked', true).change();
    });

    $('input[type=checkbox], input[type=radio]').on('ifUnchecked', function (event) {
        $(this).prop('checked', false).change();
    });

    if ($('form').hasClass('scroll-to-top-form')) {
        var top = $('form.scroll-to-top-form').offset().top - 175;
        setTimeout(function () {
            $('html, body').animate({ scrollTop: top }, 1000);
        }, 500);
    }

    /* end 7) form elements */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 8) form validation */
    /* -------------------------- */

    if ($('.validate-form').length > 0) {

        var enErrorDialogs = {
            badEmail: 'Invalid email.',
            badDate: 'Invalid date. Use a mm/dd/yyyy format.',
            requiredFields: 'Required field.'
        };

        $.formUtils.addValidator({
            name: 'future_date',
            validatorFunction: function (value, $el, config, language, $form) {
                var parts = value.split('/');
                var dt = new Date(parseInt(parts[2], 10), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
                //var dt = new Date( parseInt( parts[2], 10 ), parseInt( parts[1], 10 ) - 1, parseInt( parts[0], 10 ) ); // for dd/mm/yyyy format
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return dt >= today;
            },
            errorMessage: 'Invalid date. The date you entered is in the past.'
        });

        $.formUtils.addValidator({
            name: 'check_out_date',
            validatorFunction: function (value, $el, config, language, $form) {
                var check_in_date = $.formUtils.parseDate($form.find('#check-in-date').val(), 'mm/dd/yyyy');
                if (!check_in_date) {
                    return true;
                }
                check_in_date = new Date(check_in_date[0], check_in_date[1] - 1, check_in_date[2]);
                var parts = value.split('/');
                var check_out_date = new Date(parseInt(parts[2], 10), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
                //var check_out_date = new Date( parseInt( parts[2], 10 ), parseInt( parts[1], 10 ) - 1, parseInt( parts[0], 10 ) ); //for dd/mm/yyyy format
                return check_out_date > check_in_date;
            },
            errorMessage: 'Invalid date. The check-out date must be after the check-in date.'
        });

        $.validate({
            language: enErrorDialogs,
            borderColorOnError: false,
            scrollToTopOnError: false,
            onError: function ($form) {
                $form.find('input[type="submit"]').blur();
                if ($form.hasClass('scroll-on-error-form')) {
                    var top = $('p.has-error').first().offset().top;
                    if ($('.header').hasClass('is-fixed-header')) {
                        top -= $('.header').height();
                    }
                    $('html, body').animate({ scrollTop: top }, 400);
                }
            }
        });

    }

    /* end 8) form validation */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 9) form submit */
    /* -------------------------- */

    function showRequest(formData, $form, options) {
        if (!$form.hasClass('submitted') && !$form.hasClass('empty')) {
            $form.addClass('submitted');
            $form.find('input[type="submit"]').blur();
            $form.find('.form-processing').slideDown(function () {
                $('html, body').animate({
                    scrollTop: $($form.find('.form-processing')).offset().top - 200
                }, 400);
            });
            $form.find('.form-result-wrapper').css('display', 'none');
            return true;
        } else {
            return false;
        }
    }

    function showResponse(responseText, statusText, xhr, $form) {
        $form.removeClass('submitted');
        $form.find('.form-processing').css('display', 'none');
        $form.find('.form-result-wrapper').html(responseText).slideDown();
    }

    if ($('.ajax-form').length > 0) {

        $('.ajax-form').ajaxForm({
            beforeSubmit: showRequest,
            success: showResponse,
            type: 'POST',
            url: 'send-message.php',
            resetForm: true
        });

    }

    /* end 9) form validation */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 10) table */
    /* -------------------------- */

    function table_resize() {
        if ($('.container').width() < 880) {

            var total;
            $('.lv-table').each(function () {
                total = 0;
                $(this).find('th').each(function () {
                    total++;
                    var content = $(this).text();
                    $(this).closest('.lv-table').find('tbody').find('tr').append('<td class="dummy-td">' + content + '</td>');
                    var th_height = $('.dummy-td').outerHeight();
                    $('.dummy-td').remove();
                    var assigned_td = $(this).closest('.lv-table').find('tbody').find('tr').find('td:nth-child(' + total + ')');
                    assigned_td.each(function () {
                        assigned_td.attr('data-before', content);
                        var td_height = $(this).outerHeight();
                        if (th_height > td_height) {
                            $(this).css('height', th_height + 'px');
                            $(this).find('.td-wrap').wrap('<div class="td-wrap-container"></div> ');
                        }
                    })
                });
            });
            $('.lv-table').addClass('lv-table-mobile');

        } else {
            $('.lv-table').removeClass('lv-table-mobile');
            $('.lv-table th, .lv-table td').each(function () {
                $(this).css('height', 'auto');
            })
        }
    }

    $('.lv-table td').wrapInner('<span class="td-wrap"></span>');

    /* end 10) table */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 11) map */
    /* -------------------------- */

    function init_map($map) {
        var lat = $map.data('lat');
        var lng = $map.data('lng');
        var text = $map.data('text');
        var starting_coordinates = { lat: lat, lng: lng };
        var starting_zoom_level = 9;
        var markers = [
			{
			    lat: lat,
			    lng: lng,
			    text: text
			}
        ];

        var overlays = [];
        var map;
        var center = new google.maps.LatLng(starting_coordinates.lat, starting_coordinates.lng);
        CustomOverlay.prototype = new google.maps.OverlayView();
        function initialize() {
            var mapOptions = {
                zoom: starting_zoom_level,
                center: center
            };
            map = new google.maps.Map($map[0], mapOptions);
            for (var i = 0; i < markers.length; i++) {
                var latlng = new google.maps.LatLng(markers[i].lat, markers[i].lng);
                var text = markers[i].text;
                overlays[i] = new CustomOverlay(latlng, text, map);
            }
        }
        function CustomOverlay(latlng, text, map) {
            this.latlng_ = latlng;
            this.text_ = text;
            this.map_ = map;
            this.div_ = null;
            this.dot_ = null;
            this.setMap(map);
        }
        CustomOverlay.prototype.onAdd = function () {
            var div = document.createElement('div');
            div.className = "map-marker-container";
            div.innerHTML = this.text_;
            var dot = document.createElement('div');
            dot.className = "map-marker-dot";
            div.appendChild(dot);
            var inner_dot = document.createElement('div');
            inner_dot.className = "map-marker-dot-inner";
            dot.appendChild(inner_dot);
            this.div_ = div;
            this.dot_ = dot;
            var panes = this.getPanes();
            panes.overlayLayer.appendChild(div);
        };
        CustomOverlay.prototype.draw = function () {
            var overlayProjection = this.getProjection();
            var latlng = overlayProjection.fromLatLngToDivPixel(this.latlng_);
            var div = this.div_;
            var dot = this.dot_;
            var dot_distance = parseInt(window.getComputedStyle(dot).bottom);
            var div_width = div.clientWidth;
            var div_height = div.clientHeight;
            div.style.left = (latlng.x - div_width / 2) + 'px';
            div.style.top = (latlng.y - div_height + dot_distance) + 'px';
        };
        google.maps.event.addDomListener(window, 'load', initialize);
        $(window).resize(debouncer(function () {
            if (typeof map != 'undefined') {
                map.setCenter(center);
            }
        }));
    }

    $('.map-canvas, .map-canvas-full').each(function () {
        init_map($(this));
    });

    /* end 11) map */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 12) go to top */
    /* -------------------------- */

    function init_go_to_top() {
        go_to_top_on_scroll();
    }
    init_go_to_top();

    $('#go-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: '0' });
        return false;
    });

    function go_to_top_on_scroll() {
        var window_scroll = $(this).scrollTop();
        var opacity = 0;
        if ((window_scroll > 400) && (window_scroll < 600)) {
            opacity = (window_scroll - 300) / 300;
            $('#go-to-top').css('display', 'block');
        } else if (window_scroll >= 600) {
            opacity = 1;
            $('#go-to-top').css('display', 'block');
        } else {
            $('#go-to-top').css('display', 'none');
        }
        $('#go-to-top').css('opacity', opacity);
    }

    $(window).scroll(function () {
        go_to_top_on_scroll();
    });

    /* end 12) go to top */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 13) masonry gallery */
    /* -------------------------- */

    function masonry_gallery_resize() {
        if ($('body').width() <= 980) {
            $('.masonery-gallery-wrapper').addClass('gallery-mobile');
        } else {
            $('.masonery-gallery-wrapper').removeClass('gallery-mobile');
        }
    }
    masonry_gallery_resize();

    if ($('.masonry-gallery-container').length) {
        $('.masonry-gallery-container').masonry({
            containerStyle: null,
            columnWidth: '.grid-sizer',
            itemSelector: '.gallery-item'
        });
    }

    /* end 13) masonry gallery */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 14) debouncer */
    /* -------------------------- */

    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 50;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }

    /* end 14) debouncer */

    /* --------------------------------------------------------------------------------- */

    /* -------------------------- */
    /* 15) window resize */
    /* -------------------------- */

    $(window).resize(debouncer(function () {
        menu_resize();
        tabs_buttons();
        hero_resize();
        table_resize();
        position_slide_controls();
        gallery_thumbs();
        masonry_gallery_resize();
        if ($('select').length > 0) {
            $('select').trigger('render');
        }
        $('.bg-img, .bg-img-content').each(function () {
            resize_img($(this));
        });
    })).resize();

    /* end 15) window resize */

    /* --------------------------------------------------------------------------------- */

});



/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */