/*!
 * gentelella 2.0-beta2 (https://colorlib.com/polygon/gentelella/)
 * Copyright 2016 Aigars Silkalns & Colorlib
 * Licensed under MIT (https://github.com/ColorlibHQ/gentelella/blob/master/LICENSE.txt)
 */

/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;

      function delayed() {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize 
  jQuery.fn[sr] = function (fn) {
    return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
  };

})(jQuery, 'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
  $BODY = $('body');

var setContentHeight = function () {
  // reset height
  $('.right_col').css('min-height', $(window).height());

  var bodyHeight = $BODY.outerHeight(),
    footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $('footer').height(),
    leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
    contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

  // normalize content
  contentHeight -= $('.nav_menu').height() + footerHeight;

  $('.right_col').css('min-height', contentHeight);
};



// Sidebar
function init_sidebar() {
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function () {
    // reset height
    $('.right_col').css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $('footer').height(),
      leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $('.nav_menu').height() + footerHeight;

    $('.right_col').css('min-height', contentHeight);
  };

  $('#sidebar-menu').off('click').on('click', 'a', function (ev) {
    var $li = $(this).parent();

    if ($li.is('.active') && $(window).width() > 992) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function () {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $('#sidebar-menu').find('li').removeClass('active active-sm');
        $('#sidebar-menu').find('li ul').slideUp();
      } else {
        if ($BODY.is(".nav-sm")) {
          $('#sidebar-menu').find("li").removeClass("active active-sm");
          $('#sidebar-menu').find("li ul").slideUp();
        }
      }
      $li.addClass('active');

      $('ul:first', $li).slideDown(function () {
        setContentHeight();
      });
    }
  });



  // toggle small or large menu 

  $('#menu_toggle').off('click').on('click', function () {
    const body = $('body');
    if (body.hasClass('nav-md')) {
      $('#sidebar-menu').find('li.active ul').hide();
      $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
    } else {
      $('#sidebar-menu').find('li.active-sm ul').show();
      $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
    }
    body.toggleClass('nav-md nav-sm');

    setContentHeight();

    // $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
  });
  // });

  // check active menu
  // $('#sidebar-menu').find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('active');

  // $('#sidebar-menu').find('a').filter(function () {
  // 	return this.href == CURRENT_URL;
  // }).parent('li').addClass('active').parents('ul').slideDown(function () {
  // 	setContentHeight();
  // }).parent().addClass('active');

  // recompute content when resizing
  $(window).smartresize(function () {
    setContentHeight();
  });
  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
      autoHideScrollbar: true,
      theme: 'minimal',
      scrollInertia: 0
    });
  }
};

var randNum = function () {
  return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
};
