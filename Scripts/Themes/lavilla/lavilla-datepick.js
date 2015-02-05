/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */

jQuery(document).ready(function ($) {

    "use strict";

    function datepicker_button_titles() {
        $('.ui-datepicker-header .ui-datepicker-prev').each(function () {
            $(this).prop('title', 'Previous month');
        });
        $('.ui-datepicker-header .ui-datepicker-next').each(function () {
            $(this).prop('title', 'Next month');
        });
    }

    function drawCustomMonthSelect(elm, obj, widget) {
        var $elm = $(elm);
        var $title = widget.find(".ui-datepicker-title").eq(0);
        var is_multi = widget.find(".ui-datepicker-title").length > 1;
        var $select = $("<select class='custom-month-select " + (is_multi ? 'custom-month-select-multi' : '') + "' />");
        var start_date = $elm.datepicker("option", "minDate") || new Date();
        var current_month = obj.drawMonth;
        var current_year = obj.drawYear;
        var start_month = new Date(new Date(start_date).setDate(1));
        var this_month = new Date(new Date().setDate(1));
        var range = 12 - monthDiff(start_month, this_month) - (is_multi ? 1 : 0);
        for (var i = 0; i < range; i++) {
            var date = new Date(new Date(new Date(start_date).setDate(1)).setMonth(start_date.getMonth() + i));
            var $option = $("<option />").append($.datepicker.formatDate('M yy', date));
            $option.data("_date", date);
            if (current_month == date.getMonth() && current_year == date.getFullYear()) {
                var selected_date = date;
                $option.prop("selected", true);
            }
            $select.append($option);
        }
        $title.empty().append($select);
        widget.find('.custom-month-select').customSelect({ customClass: 'select-box-calendar' });
        if (is_multi) {
            var $title2 = widget.find(".ui-datepicker-title").eq(1).empty();
            $title2.append("<span class='custom-month-year'>" + $.datepicker.formatDate('M yy', new Date(new Date(new Date(selected_date).setDate(1)).setMonth(selected_date.getMonth() + 1))) + "</span> ");
        }

        $title.find("select").change(function () {
            var $option = $(this).find("option:selected");
            if ($option.length > 0) {
                gotoDate($elm, $option.data("_date").getMonth(), $option.data("_date").getFullYear());
            }
        });
        function gotoDate($j, month, year) {
            $j.each(function (i, el) {
                var inst = $.datepicker._getInst(el);
                inst.drawMonth = inst.selectedMonth = month;
                inst.drawYear = inst.selectedYear = year;
                $.datepicker._notifyChange(inst);
                $.datepicker._adjustDate(el);
            });
        }

        function monthDiff(to, from) {
            var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));
            if (to.getDate() < from.getDate()) {
                months--;
            }
            return months;
        }
    }

    //$.datepicker._checkExternalClick = function () {};

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

    $(window).scroll(debouncer(function () {
        $('.input-datepicker:focus').datepicker('show');
    }));

    $('.input-datepicker').blur(function () {
        //$( this ).datepicker( 'hide' );
    });

    $('.input-datepicker').datepicker({

        buttonText: '',
        dateFormat: 'mm/dd/yy',
        prevText: '&lsaquo;',
        nextText: '&rsaquo;',
        firstDay: 1,
        minDate: 0,
        maxDate: '+11m',
        showOn: 'both',

        onChangeMonthYear: function (y, m, obj) {
            setTimeout(function () {
                drawCustomMonthSelect($(obj.input[0]), obj, $(obj.input[0]).datepicker("widget"));
                datepicker_button_titles();
            }, 10);
        },

        beforeShow: function (elm, obj) {
            // Handle calendar position before showing it.
            var calendar = obj.dpDiv;
            setTimeout(function () {
                var direction = "top+8";
                var at = "bottom";
                if (($(elm).offset().top - $(window).scrollTop() > calendar.height() + 12) && ($(window).innerHeight() - ($(elm).offset().top - $(window).scrollTop() + $(elm).outerHeight()) < calendar.height() + 12)) {
                    direction = "bottom-8";
                    at = "top";
                }
                calendar.position({
                    my: 'left ' + direction,
                    at: 'left ' + at,
                    collision: 'none',
                    of: elm
                });
                drawCustomMonthSelect(elm, obj, $(elm).datepicker("widget"));
                datepicker_button_titles();
            }, 10);

            if ($(elm).attr('id') == 'check-out-date') {
                var min_check_out = 0;
                if (check_in_date) {
                    min_check_out = new Date(check_in_date);
                    min_check_out.setDate(min_check_out.getDate() + 1);
                }
                $(elm).datepicker('option', 'minDate', min_check_out);
            }
        },

        onSelect: function () {
            $(this).trigger('change');
        },

        onClose: function () {
            $('.input-datepicker').parent().find('button').attr('tabindex', '-1');
        },

    });

    var check_in_date = null, check_out_date = null;

    $('#check-in-date').change(function () {
        check_in_date = $(this).datepicker('getDate');
        if (check_in_date && check_out_date && (check_in_date.getTime() >= check_out_date.getTime())) {
            $('#check-out-date').datepicker('setDate', null);
            check_out_date = null;
        }
    });

    $('#check-out-date').datepicker('option', {
        beforeShowDay: function (date) {
            if (check_in_date && (date.getTime() < check_in_date.getTime())) {
                return [false, '', ''];
            }
            return [true, '', ''];
        }
    }).change(function () {
        check_out_date = $(this).datepicker('getDate');
    });

    $('.input-datepicker').parent().find('button').attr('tabindex', '-1');

});




/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */
