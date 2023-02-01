/* eslint-disable no-tabs */
/* SCRIPT.JS */
/* -------------------------------------------------------- */
/* This is main JS file that contains custom rules used in this template */
/* -------------------------------------------------------- */
/* Template Name: KARMA PRO */
/* Version: 1.0 Initial Release */
/* Build Date: */
/* Author:  */
/* Website: */
/* Copyright: (C) */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* TABLE OF CONTENTS: */
/* -------------------------------------------------------- */
/*
	1. VARS
	2. CALCULATE WINDOW SIZE
	3. MAIN MENU
	4. MOBILE MAIN MENU
	5. WINDOW LOAD
	6. WINDOW RESIZE
	7. WINDOW LOAD & RESIZE
	8. WINDOW SCROLL
	9. IMAGE TO BACKGROUND
	10. SWIPER
	11. FOOTER
	12. TITLEBARS
	14. BLOCKS
	15. POP UP
	16. SHOP
	17. THE GRID
	18. BLOG
  19. MAGNIFIC POPUP INITIALIZATION
  20. Smooth scroll to anchors
*/
/* -------------------------------------------------------- */
(function ($) {

  /* ============================ */
  /* VARS */
  /* ============================ */
  var $WIN = $(window);
  var BREAKPOINTS = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1600
  };
  var winW = null;
  var winH = null;
  var swipers = [];

  // document.addEventListener('touchend', function() {}); // sticky hover fix in iOS

  /* ============================ */
  /* CALCULATE WINDOW SIZE (width, height) */

  /* ============================ */
  function calcWinSizes() {
    winW = window.innerWidth;
    winH = window.innerHeight;
  }

  calcWinSizes();

  /* ============================ */
  /* MAIN MENU */
  /* ============================ */

  // Add dropdown arrow to items with childrens
  $('.menu-item-has-children > a')
    .after('<span class="dropdown-btn"></span>');

  if ($('.main-header').length) {
    var $html = $('html'),
      $body = $('body'),
      $header = $('.main-header'),
      $toolbar = $('.main-header__toolbar-wrap'),
      $hamburger = $('.hamburger'),
      $dropdownBtn = $('.dropdown-btn'),
      $stickyHeader = $('.main-header--sticky'),
      $stickyHeaderJs = $('.js-sticky-header'),
      $stickyHeaderNotMob = $('.main-header--sticky-not-mobile'),
      $mobileMenuWidth = 1024,
      $fullScreenMenu = $('.main-header--fullscreen-menu');

    // Hamburger click
    $hamburger.click(function (ev) {
      let menuBox = $(this)
        .parent()
        .find('.main-header__menu-box');
      $(this)
        .toggleClass('is-active');
      $header.toggleClass('is-open');
      $body.toggleClass('over-hidden');
      if (($(this)
        .hasClass('is-active'))) {
        menuBox.slideToggle('fast')
          .css('display', 'flex');
      } else {
        if (!$fullScreenMenu.length) {
          menuBox.hide();
          if ('none' == menuBox.css('display')) {
            menuBox.removeAttr('style');
          }
        } else {
          menuBox.slideToggle('fast', function () {
            if ('none' == menuBox.css('display')) {
              menuBox.removeAttr('style');
            }
          });
        }
      }
    });

    // Fullscreen Menu
    if ($fullScreenMenu.length) {
      $dropdownBtn.click(function (ev) {
        $(this)
          .toggleClass('is-active');
        $(this)
          .parent()
          .find('> .sub-menu')
          .slideToggle('fast');
      });
    }

    // Sticky header
    if (($stickyHeaderJs.length)) {
      $header.wrap('<div class="header-clearfix"></div>');

      function setHeaderHeight() {
        let headerHeight = $header.find('.main-header__menu-wrap')
          .innerHeight();
        let toolbarHeight = $header.find('.main-header__toolbar-wrap')
          .innerHeight();
        if ($header.hasClass('main-header--transparent') | $header.hasClass('main-header--translucent-dark') | $header.hasClass('main-header--translucent-light')) {
          headerHeight = 0;
        }

        if (($toolbar.hasClass('main-header__toolbar-wrap--transparent')) | ($toolbar.hasClass('main-header__toolbar-wrap--translucent-dark'))) {
          toolbarHeight = 0;
        }

        $('.header-clearfix')
          .css('height', headerHeight + toolbarHeight + 'px');
      }

      $(window)
        .resize(function () {
          setHeaderHeight();
        });
    }

    // Header position fix if there is admin bar on page
    function headerWithAdminBar() {
      if ($('#wpadminbar').length) {
        $header.css('top', $('#wpadminbar')
          .height() + 'px');
      }
    }

    window.addEventListener('load', function () {
      headerWithAdminBar();
      $(window)
        .resize(function () {
          headerWithAdminBar();
        });
    });
  }

  // Header
  if ($('.aheto-header').length) {
    let $body = $('body'),
      $header = $('.aheto-header'),
      $hamburger = $('.hamburger'),
      $hamburgerAside = $('.js-hamburger-aside'),
      $aside = $('.js-aside'),
      $asideClose = $('.js-aside-close'),
      $menu;

    $hamburger.click(function (ev) {

      // Make body not scrollable
      if ($(this)
        .hasClass('js-hamburger--body-over')) {
        $body.toggleClass('over-hidden');
      }

      $('html,body')
        .animate({
            scrollTop: $('[class*="nav-wrap"]')
              .offset().top
          },
          'slow');

      // Hamburger animation
      $(this)
        .toggleClass('is-active');

      // Open menu
      $menu = $(this)
        .closest('.aheto-header')
        .find('.js-menu');
      $header.toggleClass('is-open');
      if ($(this)
        .hasClass('is-active')) {
        $menu.slideToggle('fast', function () {
        });
      } else {
        $menu.slideToggle('fast', function () {
          if ('none' == $menu.css('display')) {
            $menu.removeAttr('style');
          }
        });
      }
      $('.js-toggle')
        .slideToggle('fast', function () {
          if ('none' == $(this)
            .css('display')) {
            $(this)
              .removeAttr('style');
          }
        });
    });

    $hamburgerAside.click(function (ev) {
      $aside.toggle(0, function () {
        $(this)
          .toggleClass('js-aside-opened');
      });
    });

    $asideClose.click(function (ev) {
      $aside.toggleClass('js-aside-opened');
      setTimeout(function () {
        $aside.hide(0);
      }, 500);
    });

    // Move logo to the center of menu items
    if ($('.js-center-logo').length) {

      let logoIsMoved = false;

      function moveLogoToMenu() {
        let $logo = $('.js-center-logo');
        let menuLength = $('.aheto-header .main-menu > .menu-item').length;
        if (0 == menuLength % 2) {
          $logo.insertAfter('.aheto-header .main-menu > .menu-item:nth-child(' + Math.floor(menuLength / 2) + ')');
        }
        logoIsMoved = true;
      }

      function moveLogoFromMenu() {
        let $logo = $('.js-center-logo');
        $logo.prependTo('.js-logo-initial');
        logoIsMoved = false;
      }

      function moveLogo() {
        if (1024 < window.innerWidth & !logoIsMoved) {
          moveLogoToMenu();
        }
        if (1024 >= window.innerWidth & logoIsMoved) {
          moveLogoFromMenu();
        }
      }

      moveLogo();

      $(window)
        .resize(function () {
          moveLogo();
        });
    }

    if ($('.js-dropdown-btn').length) {
      let $dropBtn = $('.dropdown-btn');
      $dropBtn.click(function (ev) {
        $(this)
          .toggleClass('is-active');
        $(this)
          .parent()
          .find('> .sub-menu')
          .slideToggle('fast');
      });
    }

    // Shop header
    if ($('.js-shop-header').length) {
      let $shopHeader = $('.js-shop-header'),
        $shopHamburger = $('.js-shop-hamburger'),
        $shopAside = $('.js-shop-aside'),
        $shopAsideClose = $('.js-shop-aside-close'),
        $shopAsideOverlay = $('.js-shop-aside-overlay'),
        $dropBtn = $('.dropdown-btn');

      $shopHamburger.click(function (ev) {
        $shopHeader.toggleClass('is-open');
        $(this)
          .toggleClass('is-active');
        $shopAside.toggle(0)
          .toggleClass('is-open');
        $shopAsideOverlay.toggle(0)
          .toggleClass('is-open');
        $shopHeader.toggleClass('is-open');
      });

      $shopAsideClose.click(function (ev) {
        closeShopAside();
      });

      $shopAsideOverlay.click(function (ev) {
        closeShopAside();
      });

      function closeShopAside() {
        $shopHeader.removeClass('is-open');
        $shopHamburger.removeClass('is-active');
        $shopAside.removeClass('is-open');
        $shopAsideOverlay.removeClass('is-open');
        setTimeout(function () {
          $shopAside.toggle(0);
          $shopAsideOverlay.toggle(0);
        }, 500);
        $shopHeader.removeClass('is-open');
      }

      $dropBtn.click(function (ev) {
        if (1024 >= winH) {
          $(this)
            .removeClass('is-active');
          $(this)
            .parent()
            .find('> .sub-menu')
            .slideToggle('fast');
        }
      });
    }
  }


  /* ============================ */
  /* HTML Multi language */
  /* ============================ */

  if ($('.multi-lang').length) {
    let $activeLang = $('.js-lang'),
      $langList;

    $activeLang.click(function (ev) {
      let $langList = $(this)
        .closest('.multi-lang')
        .find('.js-lang-list');
      $langList.slideToggle('fast');
    });
  }

  /* ============================ */
  /* WINDOW RESIZE */
  /* ============================ */
  $WIN.on('resize', function () {
    $('.swiper-container.initialized[data-slidesperview="responsive"]')
      .each(function () {
        var thisSwiper = swipers['swiper-' + $(this)
            .attr('id')],
          $t = $(this),
          slidesPerViewVal = updateSlidesPerView($t),
          centerVar = thisSwiper.params.centeredSlides;

        thisSwiper.params.slidesPerView = slidesPerViewVal;
        thisSwiper.update();
      });
  });

  /* ============================ */
  /* WINDOW LOAD & RESIZE */
  /* ============================ */
  $WIN.on('load resize', function () {
    calcWinSizes();
  });


  /* ============================ */
  /* IMAGE TO BACKGROUND */

  /* ============================ */
  function changeImgToBg(imgSel, parentSel) {

    if (!imgSel) {
      console.info('no img selector');
      return false;
    }

    let $parent,
      _this;

    $(imgSel)
      .each(function () {
        _this = $(this);
        if ('none' == _this.css('display')) {
          return true;
        }

        $parent = _this.closest(parentSel);
        $parent = $parent.length ? $parent : _this.parent();
        $parent.css('background-image', 'url(' + _this.attr('src') + ')');
        _this.hide();
      });
  }

  $(window)
    .on('load', function () {
      changeImgToBg('.js-bg');
    });
  /* ============================ */
  /* IF TOUCH DEVICE */

  /* ============================ */
  function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  /* ============================ */
  /* SWIPER */

  /* ============================ */

  function initSwiper() {
    var initIterator = 0;
    $('.swiper-container')
      .each(function () {
        var $t = $(this);

        var index = 'swiper-unique-id-' + initIterator;

        $t.addClass('swiper-' + index + ' initialized')
          .attr('id', index);
        $t.parent()
          .find('.swiper-pagination')
          .addClass('swiper-pagination-' + index);

        var autoPlayVar = ('true' == $t.attr('data-autoplay'));
        var delayVal = parseInt($t.attr('data-delay'), 10);
        if (delayVal) {
          autoPlayVar = {
            delay: delayVal
          };
        }
        ;
        var modeVal = $t.attr('data-mode');
        var spaceBetweenVal = parseInt($t.attr('data-spaceBetween'));

        var modehorizontalVal = $t.attr('data-modehorizontal');

        var slidesPerViewVal = $t.attr('data-slidesPerView');
        if ('responsive' == slidesPerViewVal) {
          slidesPerViewVal = updateSlidesPerView($t);
        } else if ('auto' == slidesPerViewVal) {

        } else {
          slidesPerViewVal = parseInt(slidesPerViewVal, 10);
        }

        var loopVal = $t.attr('data-loop');
        var slideToClickedSlideVal = $t.attr('data-slideToClickedSlide');
        var speedVal = parseInt($t.attr('data-speed'), 10);
        if (!speedVal) {
          speedVal = 500;
        }
        var centeredSlidesVal = $t.attr('data-centeredSlides');
        var effectVal = $t.attr('data-effect');
        var initialSlideVal = parseInt($t.attr('data-initialSlide'), 10);
        if (!initialSlideVal) {
          initialSlideVal = 0;
        }
        var progBarVal = $t.attr('data-progBar');

        var paginationVal = false;

        if (progBarVal !== 'custom') {
          paginationVal = {
            el: '.swiper-pagination-' + index,
            type: progBarVal || 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              if ($t.find('.swiper-pagination--numeric').length) {
                if (9 > index) {
                  var zero = '0';
                }
                return '<span class="' + className + '">' + zero + (index + 1) + '</span>';
              }
              if ($t.find('.swiper-pagination--numeric2').length) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
              }
              return '<span class="' + className + '"></span>';
            },
          };
        }

        swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
          observer: true,
          observeParents: true,
          speed: speedVal,
          pagination: paginationVal,
          loop: loopVal,
          effect: effectVal,
          slideToClickedSlide: slideToClickedSlideVal,
          spaceBetween: spaceBetweenVal,
          paginationClickable: true,
          autoplay: autoPlayVar,
          slidesPerView: slidesPerViewVal,
          keyboardControl: true,
          calculateHeight: true,
          simulateTouch: true,
          roundLengths: true,
          centeredSlides: centeredSlidesVal,
          cssWidthAndHeight: true,
          initialSlide: initialSlideVal,
          direction: modeVal || 'horizontal',
          noSwiping: true,
          noSwipingClass: 'swiper-no-swiping',
          on: {
            init: function () {
              if (progBarVal === 'custom') {
                $('.swiper-pagination-' + index)
                  .addClass('swiper-pagination-custom')
                  .append($('<div class="swiper-pagination-custom-line" style="transition-duration: ' + speedVal + 'ms"></div>'));
              }
            },
            progress: function (progress) {
              progress = progress > 1 ? 1 : progress;
              if (progBarVal === 'custom') {
                $('.swiper-pagination-' + index).find('.swiper-pagination-custom-line').css('width', progress * 100 + '%');
              }
            },
          },
          breakpoints: {
            991: {
              direction: modehorizontalVal || 'horizontal',
            }
          }
        });
        swipers['swiper-' + index].update();

        if ('responsive' == $t.attr('data-slidesperview')) {
          var paginationSpan = $t.find('.pagination span');
          var paginationSlice = paginationSpan.hide()
            .slice(0, (paginationSpan.length + 1 - slidesPerViewVal));
          if (1 >= paginationSlice.length || slidesPerViewVal >= $t.find('.swiper-slide').length) {
            $t.addClass('pagination-hidden');
          } else {
            $t.removeClass('pagination-hidden');
          }
          paginationSlice.show();
        }

        initIterator++;
      });

    // Setting for swiper type - gallery-thumbs
    if ($('.swiper .gallery-thumbs').length & $('.swiper .gallery-top').length) {
      var galTopId = document.querySelector('.gallery-top').id;
      var galThumbsId = document.querySelector('.gallery-thumbs').id;
      swipers['swiper-' + galTopId].controller.control = swipers['swiper-' + galThumbsId];
      swipers['swiper-' + galThumbsId].controller.control = swipers['swiper-' + galTopId];
    }
  }

  initSwiper();

  /* ============================ */
  /* Swiper filter */
  /* ============================ */
  $(".filter-construction .aheto-pf__filter").on("click", function(){
    var filter = $(this).data('filter');

    var slides = $(this).closest('.aheto-pf').find('.swiper-slide');

    var swiper_id = $(this).closest('.aheto-pf').find('.swiper-container').attr('id');
    var swiper = swipers['swiper-' + swiper_id];


    slides.show();

    if(filter != "all"){
      slides.not("[data-filter='" + filter + "']").hide();
    }

    swiper.update();
  });

  // Update slides per view
  function updateSlidesPerView(swiperContainer) {
    if (winW >= BREAKPOINTS.xl) {
      return parseInt(swiperContainer.attr('data-add-slides'), 10);
    } else if (winW >= BREAKPOINTS.lg) {
      return parseInt(swiperContainer.attr('data-lg-slides'), 10);
    } else if (winW >= BREAKPOINTS.md) {
      return parseInt(swiperContainer.attr('data-md-slides'), 10);
    } else if (winW >= BREAKPOINTS.sm) {
      return parseInt(swiperContainer.attr('data-sm-slides'), 10);
    } else {
      return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }
  }

  $(window)
    .trigger('resize');

  // Swiper arrows
  $('.swiper-button-prev')
    .on('click', function () {
      swipers['swiper-' + $(this)
        .parent()
        .find('.swiper-container')
        .attr('id')].slidePrev();
    });

  $('.swiper-button-next')
    .on('click', function () {
      swipers['swiper-' + $(this)
        .parent()
        .find('.swiper-container')
        .attr('id')].slideNext();
    });

  // var postSingleSlider = $('.single_post_slider');
  // if (postSingleSlider.length) {
  //   new Swiper('.single_post_slider .swiper-container', {
  //     slidesPerView: '2',
  //     spaceBetween: 30
  //   });
  // }

  /* ============================ */
  /* SEARCH */
  /* ============================ */

  $(document)
    .ready(function () {
      let $search = $('.site-search');
      $('.js-open-search')
        .on('click', function () {
          $search.addClass('open');
        });
      $('.js-close-search')
        .on('click', function (ev) {
          ev.stopPropagation();
          $search.addClass('closing');
          setTimeout(function () {
            $search.removeClass('open closing');
          }, 300);
        });
    });

  /* ============================ */
  /* BLOCKS */
  /* ============================ */

  // Function return boolean value if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window)
      .scrollTop();
    var docViewBottom = docViewTop + $(window)
      .height();

    var elemTop = $(elem)
      .offset().top;
    var elemBottom = elemTop + $(elem)
      .height();

    return ((elemTop >= docViewTop) && (elemTop <= docViewBottom));
  }

  // Tabs
  $('.js-tab-list')
    .on('click', function (e) {
      var indexEl = $(this)
        .parent()
        .index();

      $(this)
        .parent()
        .siblings()
        .removeClass('active');
      $(this)
        .parent()
        .addClass('active');

      $(this)
        .parent()
        .closest('.js-tab')
        .find('.js-tab-box')
        .removeClass('active')
        .eq(indexEl)
        .addClass('active');
      e.preventDefault();
    });

  // Counter (animation)
  if ($('.js-counter').length) {

    let $counter = $('.js-counter'),
      counterView = false;

    function counterInView() {
      if (!counterView) {
        if (isScrolledIntoView($counter)) {
          counterView = true;
          var counterArr = [];
          $('.js-counter')
            .each(function () {
              counterArr.push($(this)
                .html());
            });
          $counter.each(function () {
            $(this)
              .prop('Counter', 0)
              .animate({
                Counter: $(this)
                  .text()
              }, {
                duration: 2500,
                easing: 'swing',
                step: function (now) {
                  if ($(this)
                    .hasClass('js-percent')) {
                    $(this)
                      .text(Math.floor(now) + '%');
                  } else if ($(this)
                    .hasClass('js-k')) {
                    $(this)
                      .text(commaSeparateNumber(Math.floor(now) + 'k'));
                  } else if ($(this)
                    .hasClass('js-plus')) {
                    $(this)
                      .text('+' + Math.floor(now)
                        .toLocaleString('en'));
                  } else if ($(this)
                    .hasClass('js-whole')) {
                    $(this)
                      .text(Math.floor(now));
                  } else {
                    $(this)
                      .text(commaSeparateNumber(Math.floor(now)));
                  }
                },
                complete: function () {
                  if ($(this)
                    .hasClass('js-percent') | $(this)
                    .hasClass('js-k') | $(this)
                    .hasClass('js-plus')) {
                    counterArr.shift();
                  } else if ($(this)
                    .hasClass('js-whole')) {
                    $(this)
                      .text(counterArr.shift());
                  } else {
                    $(this)
                      .text(commaSeparateNumber(counterArr.shift()));
                  }
                }
              });
          });
        }
      }
    }

    counterInView();

    $(window)
      .scroll(function () {
        counterInView();
      });

    function commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString()
          .replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      return val;
    }
  }

  // Progress bar (animation)
  var progBar = $('.prog-bar');
  if (progBar.length) {
    var progBarView = false;

    function progBarF() {
      if (!progBarView) {
        if (isScrolledIntoView(progBar)) {
          progBarView = true;
          progBar.each(function () {
            var percentage = $(this)
              .find('.prog-bar-perc')
              .html();
            $(this)
              .find('.prog-bar-hldr')
              .animate({
                left: percentage + '%'
              }, 2000);
            $(this)
              .find('.prog-bar-val')
              .animate({
                width: percentage + '%'
              }, 2000);
          });
        }
      }
    }

    progBarF();
    $(window)
      .scroll(function () {
        progBarF();
      });
  }

  let progChart = $('.js-chart-circle');
  if (progChart.length) {
    var progChartInView = false;

    function progChartAnimation() {
      if (!progChartInView) {
        if (isScrolledIntoView(progChart)) {
          progChart.addClass('active');
          progChartInView = true;
        }
      }
    }

    progChartAnimation();
    $(window)
      .scroll(function () {
        progChartAnimation();
      });
  }


  // Video
  $('.aheto-video a')
    .on('click', function (e) {
      e.preventDefault();
      var videoWrapp = $(this)
        .closest('.aheto-video');
      var target = $(videoWrapp)
        .find('iframe');
      var videoSrc = $(this)
        .data('video');

      $(videoWrapp)
        .toggleClass('play');

      if ($(videoWrapp)
        .hasClass('play')) {
        $(target)
          .attr('src', videoSrc);
      } else {
        $(target)
          .attr('src', videoSrc);
      }
    });

  // Content Block (list number)
  if ($('.aheto-content-block').length) {
    $('.aheto-content-block')
      .parent()
      .parent()
      .each(function () {
        index = 0;
        $(this)
          .find('.aheto-content-block--list-icon, .aheto-content-block--list, .aheto-content-block--slider')
          .each(function (index) {
            index++;
            index = (10 > index) ? '0' + index : index;
            $(this)
              .attr('data-index', index);
            $(this)
              .find('h1,h2,h3,h4,h5,h6')
              .attr('data-index', index);
          });
      });
  }

  $('.aheto-content-block--bgImg')
    .hover(
      function () {
        $(this)
          .find('.aheto-content-block__info')
          .slideDown(200);
      },
      function () {
        $(this)
          .find('.aheto-content-block__info')
          .slideUp(200);
      }
    );

  // Accordion
  $('.js-accordion')
    .on('click', function () {
      $(this)
        .toggleClass('active')
        .next()
        .slideToggle('fast');
    });

  // Typed text animation
  if ($('.js-typed').length) {

    var typed = [];
    var typedItem = $('.js-typed');


    $(typedItem)
      .each(function (index, el) {
        $(this)
          .attr('id', 'js-typed-' + index);
        $(this)
          .attr('data-text', $(this)
            .text())
          .text('');
      });

    function typedTextAnim() {
      $(typedItem)
        .each(function () {
          if (true == isScrolledIntoView(this) && !$(this)
            .hasClass('init')) {
            typedText = ['', $(this)
              .attr('data-text')];

            $(this)
              .text('')
              .addClass('init');
            var typedText = ['New York', 'London', 'Paris'];

            var typedSetting = {
              strings: typedText,
              fadeOut: true,
              typeSpeed: 50,
              startDelay: 0,
              loop: false,
              loop: true
            };

            var typedId = '#' + $(this)
              .attr('id');
            typed[typedId] = new Typed(typedId, typedSetting);
          }
        });
    }

    typedTextAnim();

    $(window)
      .scroll(function () {
        typedTextAnim();
      });
  }

  /*Karma text animation*/
  // Typed text animation
  if ($('.js-typed-karma').length) {

    var typed = [];
    var typedItem = $('.js-typed-karma');


    $(typedItem)
        .each(function (index, el) {
          $(this)
              .attr('id', 'js-typed-karma-' + index);
          $(this)
              .attr('data-text', $(this)
                  .text())
              .text('');
        });

    function typedTextAnim() {
      $(typedItem)
          .each(function () {
            if (true == isScrolledIntoView(this) && !$(this)
                .hasClass('init')) {
              typedText = ['', $(this)
                  .attr('data-text')];

              $(this)
                  .text('')
                  .addClass('init');
              var typedText = ['design company', 'web agency', 'creative bureau'];

              var typedSetting = {
                strings: typedText,
                fadeOut: true,
                typeSpeed: 50,
                startDelay: 0,
                loop: false,
                loop: true
              };

              var typedId = '#' + $(this)
                  .attr('id');
              typed[typedId] = new Typed(typedId, typedSetting);
            }
          });
    }

    typedTextAnim();

    $(window)
        .scroll(function () {
          typedTextAnim();
        });
  }



  /*Karma text animation - service modern*/
  // Typed text animation
  if ($('.js-typed-karma-modern').length) {

    var typed = [];
    var typedItem = $('.js-typed-karma-modern');


    $(typedItem)
        .each(function (index, el) {
          $(this)
              .attr('id', 'js-typed-karma-modern-' + index);
          $(this)
              .attr('data-text', $(this)
                  .text())
              .text('');
        });

    function typedTextAnim() {
      $(typedItem)
          .each(function () {
            if (true == isScrolledIntoView(this) && !$(this)
                .hasClass('init')) {
              typedText = ['', $(this)
                  .attr('data-text')];

              $(this)
                  .text('')
                  .addClass('init');
              var typedText = ['digital creation', 'visual design', 'digital presence'];

              var typedSetting = {
                strings: typedText,
                fadeOut: true,
                typeSpeed: 50,
                startDelay: 0,
                loop: false,
                loop: true
              };

              var typedId = '#' + $(this)
                  .attr('id');
              typed[typedId] = new Typed(typedId, typedSetting);
            }
          });
    }

    typedTextAnim();

    $(window)
        .scroll(function () {
          typedTextAnim();
        });
  }
  // Gallery pop up
  if ($('.js-gallery').length) {

    var blogModal = $('.js-gallery-modal');
    var blogImg = $('.js-gallery-item');
    var blogModalImg = $('.js-gallery-content');

    blogImg.click(function (ev) {
      ev.stopPropagation();
      blogModal.css('display', 'flex');
      blogModalImg.attr('src', $(this)
        .find('img')
        .attr('src'));
    });

    var blogModalClose = document.getElementsByClassName('js-gallery-close')[0];

    if (blogModalClose) {
      blogModalClose.onclick = function () {
        blogModal.animate({
          opacity: 0
        }, 'fast', function () {
          blogModal.css('display', 'none');
          blogModal.removeAttr('style');
        });

      };
    }
  }

  // Coming soon countdown
  var countDownDate = $('.count-down')
    .attr('data');
  if (countDownDate) {
    if (576 <= $(window)
      .width()) {
      $('.coming-soon__caption')
        .each(function () {
          $(this)
            .html($(this)
              .attr('data-desktop'));
        });
    } else {
      $('.coming-soon__caption')
        .each(function () {
          $(this)
            .html($(this)
              .attr('data-mobile'));
        });
    }
    var countDown = new Date(countDownDate).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDown - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      $('.count-down-value.days')
        .html(days);
      $('.count-down-value.hours')
        .html(hours);
      $('.count-down-value.minutes')
        .html(minutes);
      $('.count-down-value.seconds')
        .html(seconds);
      if (0 > distance) {
        clearInterval(x);
        $('.count-down-value')
          .html('00');
      }
    }, 1000);
  }

  /* ============================ */
  /* POP UP */
  /* ============================ */

  // Pop up button click triggers pop up window which is in same parent element
  var popUpBtn = $('.js-pop-up-btn');
  if (popUpBtn.length) {
    var overlay;
    var form;
    var popUpActive;

    function on() {
      overlay
        .css({
          opacity: 0,
          display: 'flex'
        })
        .animate({
          opacity: 1
        }, 500);
      form
        .css({
          top: '-50%',
          opacity: 0
        })
        .animate({
          opacity: 1,
          top: 0
        }, 500);
      popUpActive = true;
    }

    function off() {
      form.animate({
        opacity: 0,
        top: '-50%'
      }, 500);
      overlay
        .animate({
          opacity: 0
        }, 500, function () {
          overlay.css('display', 'none');
        });
      popUpActive = false;
    }

    popUpBtn.click(function (btnClick) {
      overlay = $(this)
        .parent()
        .find('.js-pop-up-overlay');
      form = overlay.find('.js-pop-up-window');
      form.click(function (formClick) {
        formClick.stopPropagation();
      });
      on();
      btnClick.stopPropagation();
    });

    $(window)
      .click(function () {
        if (popUpActive) {
          if ('flex' === overlay.css('display')) {
            off();
          }
        }
      });

    $('.pop-up-close')
      .click(function () {
        if ('flex' === overlay.css('display')) {
          off();
        }
      });
  }

  // Contact form 7 change color of select (after option was selected)
  var cf7select = $('.wpcf7-form-control.wpcf7-select');
  if (cf7select.length) {
    cf7select[0].onchange = function () {
      cf7select.addClass('cf7-selected');
    };
  }

  $('select')
    .change(function () {
      $(this)
        .addClass('selected');
    });

  /* ============================ */
  /* SHOP */
  /* ============================ */

  // Shop products layout fix
  var shopItem,
    shopItemWidth;

  function productWidth() {
    shopItem = $('.aheto-products__item:first-child');
    shopItemWidth = $('.aheto-products__item:first-child')
      .width();
    shopItem.nextAll()
      .each(function () {
        if ($(this)
          .width() > shopItemWidth) {
          $(this)
            .css({});
        }
      });
  }

  productWidth();
  $(window)
    .resize(function () {
      productWidth();
    });

  // Woocommerce. Cart quantity buttons
  $('body')
    .on('click', '.quantity .q_inc, .quantity .q_dec', function (e) {
      e.preventDefault();

      var input = $(this)
        .parent('.quantity-input')
        .find('input');
      var qty = Number(input.val());

      'q_dec' === this.className ? qty-- : qty++;
      qty = 1 < qty ? qty : 1;
      input.val(qty)
        .change();

      function updateCart() {
        $('button[name=update_cart]')
          .removeAttr('disabled');
      }

      updateCart();
    });


  /* ============================ */
  /* THE GRID */
  /* ============================ */

  // Window size correction
  var gridWrapper = $('.tg-grid-wrapper');
  if (gridWrapper.length) {
    window.onload = function () {
      window.dispatchEvent(new Event('resize'));
    };

    if ($('.grid-blog-centered').length | $('.grid-blog-grid').length) {

      // Fix grid video src (grid paste it incorrectly)
      window.onload = function () {
        $('.tg-item-media-inner > iframe')
          .each(function () {
            var GridVideoSrc = $(this)
              .attr('data-src');
            $(this)
              .attr('src', GridVideoSrc);
          });
        window.dispatchEvent(new Event('resize'));
      };

      function appendVidBtn() {

        // Append video overlay button
        $('.has-media-poster .tg-item-media-poster')
          .not('.video-wrapped')
          .append('<div class="tg-item-media-poster-play"><i class="icon ion-play"></i></div>')
          .addClass('video-wrapped');

        // Hide video overlay and play it
        $('.tg-item-media-poster-play')
          .click(function (ev) {
            $(this)
              .parent()
              .animate({
                opacity: 0
              }, 300, function () {
                $(this)
                  .css('display', 'none');
              });

            var GridVideo = $(this)
              .parent()
              .parent()
              .find('video');
            var GridIframe = $(this)
              .parent()
              .parent()
              .find('iframe');

            if (GridVideo.length) {
              GridVideo.get(0)
                .play();
            }
            if (GridIframe.length) {
              GridIframe[0].src += '&autoplay=1';
              ev.preventDefault();
            }
          });
      }

      appendVidBtn();

      $(document)
        .ajaxStop(function () {
          appendVidBtn();
        });
    }
  }

  /* ============================ */
  /* BLOG */
  /* ============================ */

  // // Blog format gallery modal window
  // if ( $( '.post .gallery-wrapper' ).length ) {
  //
  // 	function galleryModalWin() {
  // 		var blogModal = $( '.gallery-modal' )
  // 		var blogImg = $( '.post .gallery-image' )
  // 		var blogModalImg = $( '.gallery-modal-content' )
  // 		blogImg.click( function( ev ) {
  // 			ev.stopPropagation()
  // 			blogModal.css( 'display', 'flex' )
  // 			blogModalImg.attr( 'src', $( this ).find( 'img' ).attr( 'src' ) )
  // 		})
  // 		var blogModalClose = document.getElementsByClassName( 'gallery-close' )[0]
  // 		blogModalClose.onclick = function() {
  // 			blogModal.css( 'display', 'none' )
  // 		}
  // 	}
  //
  // 	galleryModalWin()
  //
  // 	$( document ).ajaxStop( function() {
  // 		galleryModalWin()
  // 	})
  // }

  // Blog video play button
  if ($('article.post').length) {

    function blogVideoBtn() {
      $('.post .video-wrapper')
        .not('.video-wrapped')
        .each(function (index) {
          var blogVidBtn = $(this)
            .find('.video-play-btn');
          blogVidBtn.click(function (ev) {
            ev.stopPropagation();

            // Hide thumbnail
            $(this)
              .parent()
              .animate({
                opacity: 0
              }, 300, function () {
                $(this)
                  .css('display', 'none');
              });

            // Play Video
            var blogVid = $(this)
              .closest('.video-wrapper')
              .find('video');
            var blogIframe = $(this)
              .closest('.video-wrapper')
              .find('iframe');

            if (blogVid.length) {
              blogVid.get(0)
                .play();
            }
            if (blogIframe.length) {
              blogIframe[0].src += '&autoplay=1';
            }
          });

          $(this)
            .addClass('video-wrapped');
        });
    }

    blogVideoBtn();

    $(document)
      .ajaxStop(function () {
        blogVideoBtn();
      });
  }

  // Blog Metro style layout
  var blogMetro = $('.aheto-content--metro');
  if (blogMetro.length) {
    var blogMetroItems = blogMetro.find('.post')
      .addClass('post-iso');
    blogMetro.isotope({
      itemSelector: '.post',
      percentPosition: true,
      masonry: {
        columnWidth: '.post:nth-child(2)'
      }
    });

    $(document)
      .ajaxComplete(function () {
        var blogMetroItems = blogMetro.find('.post')
          .not('.post-iso');
        blogMetro.isotope('appended', blogMetroItems);
        blogMetroItems.addClass('post-iso');
      });
  }

  // portfolio agency style layout
  var portfolioAgency = $('.agency-gallery');
  portfolioAgency.isotope({
    itemSelector: '.agency-gallery__item',
    percentPosition: true,
    masonry: {
      columnWidth: '.agency-gallery__item',
      gutter: 70
      }
  });


  /* ============================ */
  /* TITLEBARS */
  /* ============================ */

  // Titlebar arrow down
  var titleArrDown = $('.aheto-titlebar__arrow-down');
  if (titleArrDown.length) {
    titleArrDown.each(function (index) {
      $(this)
        .click(function (ev) {
          $('html, body')
            .animate({
              scrollTop: $(this)
                .closest('.aheto-titlebar')
                .offset().top + $(this)
                .closest('.aheto-titlebar')
                .height()
            }, 1000);
        });
    });
  }

  /* ============================ */
  /* PORTFOLIO */
  /* ============================ */

  // Portfolio Isotope layout
  if ($('.aheto-pf').length) {
    var pfGrid = [];

    $('.aheto-pf')
      .each(function (index) {

        if (!$(this)
          .hasClass('aheto-pf--masonry')) {

          pfGrid[index] = $(this)
            .find('.aheto-pf__container');

          // Init Isotope
          pfGrid[index].isotope({
            masonry: {
              columnWidth: '.aheto-pf__item:not(.aheto-pf__item--height):not(.aheto-pf__item--width)'
            }
          });

        } else {

          // Init Isotope
          pfGrid[index] = $('.aheto-pf--masonry .aheto-pf__container')
            .isotope({
              itemSelector: '.aheto-pf__item',
              percentPosition: true,
              masonry: {
                columnWidth: '.aheto-pf__item'
              }
            });

          // Layout Isotope after each image loads
          pfGrid[index].imagesLoaded()
            .progress(function () {
              pfGrid[index].isotope('layout');
            });
        }

        $('.aheto-pf__filter')
          .on('click', function () {
            $('.aheto-pf__filter')
              .removeClass('active');
            $(this)
              .addClass('active');
            var filterValue = $(this)
              .attr('data-filter');
            pfGrid[index].isotope({
              filter: filterValue
            });
          });
      });

    // Image Pop Up window for Portfolio New
    if ($('.aheto-pf--new').length) {

      // Get the modal
      var pfModal = $('.aheto-pf__modal');

      // Get the image and insert it inside the modal
      var pfImg = $('.aheto-pf__img');
      var pfModalImg = $('.aheto-pf__modal-content');
      pfImg.click(function (ev) {
        ev.stopPropagation();
        pfModal.css('display', 'flex');
        pfModalImg.attr('src', $(this)
          .find('img')
          .attr('src'));
      });

      // Close the modal on span click
      var pfspan = $('.aheto-pf__close')[0];
      pfspan.onclick = function () {
        pfModal.css('display', 'none');
      };
    }

  }

  /* ============================ */
  /* Grid layout */
  /* ============================ */

  if ($('.js-grid-1').length) {

    var grid1 = $('.js-grid-1');

    // Init Isotope
    grid1 = $('.js-grid-1-cont')
      .isotope({
        itemSelector: '.js-grid-1-item',
        layoutMode: 'fitRows',
        percentPosition: true
      });

    // Layout Isotope after each image loads
    grid1.imagesLoaded()
      .progress(function () {
        grid1.isotope('layout');
      });

    $('.js-grid-1-filt')
      .on('click', function () {
        $('.js-grid-1-filt')
          .removeClass('active');
        $(this)
          .addClass('active');
        var filterValue = $(this)
          .attr('data-filter');
        grid1.isotope({
          filter: filterValue
        });
      });
  }


  /* ============================ */
  /* Deal */
  /* ============================ */

  if ($('.js-grid').length) {
    var isotopeGrid = $('.js-grid')
      .isotope({
        itemSelector: '.js-grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.js-grid-item:not(.js-grid-item-width)'
        }
      });
  }

  /* ============================ */
  /* MEDIAELEMENTS JS */
  /* ============================ */

  if ('undefined' !== typeof $.fn.mediaelementplayer) {
    $('audio')
      .mediaelementplayer();
  }

  /* ============================= */
  /* MAGNIFIC POPUP INITIALIZATION */
  /* ============================= */

  $('.js-mfp-video')
    .each(function () {
      $(this)
        .magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: true,
          fixedBgPos: true
        });
    });

  $('.js-mp-video')
    .each(function () {
      $(this)
        .magnificPopup({
          type: 'iframe'
        });
    });

  /* ============================= */
  /* SAAS PRICING RESPONSIVE       */
  /* ============================= */

  if ($('.aheto-pricing__detail--checked').length) {
    var itemChecked = $('.aheto-pricing__detail--checked'),
      labels = itemChecked.closest('.aheto-pricing')
        .eq(0)
        .siblings('.aheto-pricing--legend')
        .eq(0)
        .find('.aheto-pricing__detail'),
      labelArr = [];

    labels.each(function () {
      labelArr.push($(this)
        .find('p')
        .text()
        .trim());
    });

    itemChecked.each(function () {
      $(this)
        .attr('data-label', labelArr[$(this)
          .index()]);
    });

    $('.aheto-pricing__detail--not-labeled')
      .each(function () {
        if ('' === $(this)
          .find('p')
          .text()
          .trim()) {
          $(this)
            .addClass('hidden-md');
        }
      });
  }


  // Simple list with active element
  if ($('.js-list').length) {
    let $list = $('.js-list'),
      $listChild = $list.children();

    $list.each(function () {
      $(this)
        .children()
        .eq(0)
        .addClass('active');
    });

    $listChild.click(function (ev) {
      $(this)
        .closest('.js-list')
        .children()
        .removeClass('active');
      $(this)
        .addClass('active');
    });
  }

  // Widget posts
  if ($('.js-wdgt-post').length) {
    let $postWgt = $('.js-wdgt-post'),
      $btnList = $('.js-wdgt-post-btns'),
      $postList = $('.js-wdgt-post-list');

    $postWgt.each(function () {
      $(this)
        .find('.js-wdgt-post-btns')
        .children()
        .eq(0)
        .addClass('active');
      $(this)
        .find('.js-wdgt-post-list')
        .children()
        .eq(0)
        .addClass('active');
    });

    $btnList.children()
      .click(function (ev) {
        $(this)
          .siblings()
          .removeClass('active');
        $(this)
          .addClass('active');
        $(this)
          .closest('.js-wdgt-post')
          .find('.js-wdgt-post-list')
          .children()
          .removeClass('active')
          .eq($(this)
            .index())
          .css('opacity', 0)
          .addClass('active')
          .animate({
            opacity: 1
          }, 300);
      });
  }

  // Input quantity buttons
  if ($('.js-num-inc').length) {
    $('body')
      .on('click', '.js-num-inc, .js-num-dec', function (e) {
        e.preventDefault();

        var input = $(this)
          .parent()
          .find('input');
        var quantity = Number(input.val());

        if ($(this)
          .hasClass('js-num-dec')) {
          quantity--;
        } else {
          quantity++;
        }
        if (1 > quantity) {
          quantity = 1;
        }
        input.val(quantity)
          .change();
      });
  }

  if ($('.js-tour-item').length) {
    let tourItem = $('.js-tour-item');
    let tourAttr;
    tourItem.click(function (ev) {
      $('.js-tour-item')
        .removeClass('active');
      $(this)
        .addClass('active');
      tourAttr = $(this)
        .attr('data-unit');
      $('.js-tour-unit')
        .hide(0);
      $('.js-tour-unit[data-unit=' + tourAttr + ']')
        .css({
          opacity: 0,
          display: 'block'
        })
        .show(0)
        .animate({
          opacity: 1
        }, 500);

        let swiperId = $('.js-tour-unit[data-unit=' + tourAttr + ']').find('.swiper-container').attr('id');
        if(swiperId) {

          swipers['swiper-' + swiperId].destroy(true, true);
          initSwiper();
        }
    });
  }


  if ($('.js-tour-btn').length) {
    let tourBtn = $('.js-tour-btn');
    let tourAttr;
    tourBtn.click(function (ev) {
      $('.js-tour-btn')
        .removeClass('active');
      $(this)
        .addClass('active');
      tourAttr = $(this)
        .attr('data-form');
      $('.js-tour-form')
        .removeClass('active');
      $('.js-tour-form[data-form=' + tourAttr + ']')
        .css({
          opacity: 0
        })
        .addClass('active')
        .animate({
          opacity: 1
        }, 500);
    });
  }

  var url = window.location.pathname,
    urlRegExp = new RegExp(url.replace(/\/$/, '') + '$'); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
  // now grab every link from the navigation
  $('.menu-item a')
    .each(function () {
      // and test its normalized href against the url pathname regexp
      if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
        $(this)
          .addClass('active')
          .closest('.menu-item-has-children')
          .addClass('active');
      }
    });
  var metroItem = $('.aheto-pf__container');
  if (metroItem.length) {
    function metroIsotop() {
      metroItem.isotope({
        itemSelector: '.aheto-pf__item',
        percentPosition: true,
        masonry: {
          columnWidth: '.aheto-pf__item:not(.aheto-pf__item--height):not(.aheto-pf__item--width)'
        }
      });
    }

    metroIsotop();
    $('.loading')
      .on('click', function () {
        var thisLink = $(this);
        thisLink.addClass('load');

        function customDelay() {
          metroItem.find('.aheto-pf__item')
            .removeClass('hide');
          $('.loading')
            .addClass('hide');
          metroIsotop();
        }

        setTimeout(customDelay, 1000);
      });
  }
  var blogMetro = $('.aht-blog-bsns');
  if (blogMetro.length) {
    function metroIsotop() {
      blogMetro.isotope({
        itemSelector: '.aht-blog-bsns__item',
        percentPosition: true,
        masonry: {
          columnWidth: '.aht-blog-bsns__item',
          gutter: 30
        }
      });
    }

    metroIsotop();
  }


  var blogItem = $('.aht-page__content-inner');
  if (blogItem.length) {
    $('.loading')
      .on('click', function () {
        var thisLink = $(this);
        thisLink.addClass('load');

        function customDelay() {
          blogItem.find('.post')
            .removeClass('hide');
          $('.loading')
            .addClass('hide');
        }

        setTimeout(customDelay, 1000);
      });
  }


  $('.load-more a')
    .on('click', function () {
      $('.aheto-pf__item')
        .removeClass('hide');
      $('.load-more')
        .addClass('hide');
      metroIsotop();
    });

  var shopItem = $('.shop__content');
  if (shopItem.length) {
    $('.loading')
      .on('click', function () {
        var thisLink = $(this);
        thisLink.addClass('load');

        function customDelay() {
          shopItem.find('.aheto-products__item')
            .removeClass('hide');
          $('.loading')
            .addClass('hide');
        }

        setTimeout(customDelay, 1000);
      });
  }
  $('.slider-input')
    .jRange({
      from: 0,
      to: 100,
      step: 1,
      theme: 'theme-blue',
      format: '%s',
      width: 275,
      showLabels: true,
      isRange: true
    });


  $('.price_slider_amount button')
    .on('click', function (e) {
      e.preventDefault();
      var values = $('.slider-input')
        .val()
        .split(',');
      var min = values[0];
      var max = values[1];
    });

  var acc = document.getElementsByClassName('accordion');
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  if ($('.lightgallery').length) {
    $('.lightgallery')
      .lightGallery({
        mode: 'lg-slide',
        closable: true,
        iframeMaxWidth: '80%',
        download: false,
        thumbnail: true
      });
  }
  /* ============================ */
  /* main home shop */
  /* ============================ */
  $('.panel li')
    .on('click', function (e) {
      var thisLink = $(this);
      $('.panel li')
        .removeClass('color__blue');
      thisLink.addClass('color__blue');
    });
  $('.color-item')
    .on('click', function (e) {
      var thisLink = $(this);
      $('.color-item')
        .removeClass('border-color');
      thisLink.addClass('border-color');
    });
  $('.product-categories-item')
    .on('click', function (e) {
      var thisLink = $(this);
      $('.product-categories-item')
        .removeClass('active');
      thisLink.addClass('active');
    });
  $('.description_tab')
    .on('click', function (e) {
      $('.woocommerce-Tabs-panel ')
        .removeAttr('style')
        .hide();
      $('.reviews_tab')
        .removeClass('active');
      $('.description_tab ')
        .addClass('active');
      $('.woocommerce-Tabs-panel--description ')
        .removeAttr('style')
        .show();
    });
  $('.reviews_tab')
    .on('click', function (e) {
      $('.woocommerce-Tabs-panel ')
        .removeAttr('style')
        .hide();
      $('.description_tab')
        .removeClass('active');
      $('.reviews_tab')
        .addClass('active');
      $('.woocommerce-Tabs-panel--reviews')
        .removeAttr('style')
        .show();
    });

  /* ============================ */
  /* Saas blog */
  /* ============================ */

  if ($('#toggle-demos').length) {
    $('#toggle-demos')
      .on('click', function () {
        $('.thb-demo-holder')
          .addClass('active');
        $('.demo-switcher')
          .addClass('demo-open');
      });
  }

  if ($('.thb-demo-holder svg').length) {
    $('.thb-demo-holder svg')
      .on('click', function () {
        $('.thb-demo-holder')
          .removeClass('active');
      });
  }

  /**
   * Mouse move animation
   */
  const windowWidth = $(window).width();

  $('[data-parent-move]').mousemove(function(event){
    var moveX = (($(window).width() / 2) - event.pageX) * 0.1;
    var moveY = (($(window).height() / 2) - event.pageY) * 0.1;

    $('[data-move]').each(function(){
      var current = $(this);
      var currentMoveX = moveX * +current.attr('data-move');
      var currentMoveY = moveY * +current.attr('data-move');

      // current.css('transform', 'translate(' + currentMoveX + 'px,' + currentMoveY+ 'px)')
      current.css({"margin-left": currentMoveX + 'px', "margin-top": currentMoveY + 'px'})
    })
  });

  /**
   * Added circle to progressbar swiper pagination
   */
  /* ============================ */
  /* gallery masonry */
  /* ============================ */
  if ($('.gallery').length) {
    var galleryMasonty = $('.gallery');

    galleryMasonty.isotope({
      itemSelector: '.gallery-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.gallery-item-size'
      }
    });

    galleryMasonty.imagesLoaded()
      .progress(function () {
        galleryMasonty.isotope('layout');
      });
  }

  /* ============================ */
  /* Construction content block  */
  /* ============================ */
  $( ".aheto-content-block--construction" ).mouseover(function() {
    $(".aheto-content-block--construction").removeClass('active');
    $(this).addClass('active');
  });

  /* ============================ */
  /* Education courses content block  */
  /* ============================ */
  $('.aht-course--edu-details .aht-page').removeClass('container').addClass('container-fluid');


  /* ============================ */
  /* Smooth scroll to anchors  */
  /* ============================ */
  var $page = $('html, body');
  $('a[href*="#"]').click(function() {
      $page.animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 600);
      return false;
  });

  function orderSucces() {
    $('.rest-reservation-order').css('display', 'flex');
  }
  $('.rest-reserv-btn').on('click', function () {
    let inputDate = document.querySelector('input[type="date"]');
    let inputName = document.querySelector('input[name="Name"]');
    let inputPhone = document.querySelector('input[name="Phone"]');
    let inputTime = document.querySelector('input[name="Time"]');
    if (inputDate.value === '' || inputName.value === '' || inputPhone.value === '' || inputTime.value === '') {
      alert('Please fill all fields');
    } else {setTimeout(orderSucces, 700);}
  });

  // Pagination Barbershop - Serivicec What we do, barbershop-wwd
  $('.pagn-16').click(function(e) {
    e.preventDefault();
    $('.hiden').css({'opacity':'1', 'position':'static', 'height':'toggle', 'z-index':'1'});
    $('.pagn-16').hide();
  });

// events menu
  $(window).scroll(function(){
    if ($(this).scrollTop() > 10) {
      $('.aheto-header-3__inner').addClass('aheto-header-3__fix');
    } else {
      $('.aheto-header-3__inner').removeClass('aheto-header-3__fix');
    }
  });
  if ($('.menu-item-js').length) {
    $('.menu-item-js a')
        .on('click', function () {
          $(this)
              .closest('body')
              .removeClass('over-hidden');
          $(this)
              .closest('body')
              .find('.js-menu')
              .removeAttr('style');
          $(this)
              .closest('body')
              .find('.js-hamburger')
              .removeClass('is-active');
        });
  }
  //Them Construction, show first item in according on page careers.html
  $('.aheto-accordion__item:first-child .js-accordion').addClass('active');
  $('.aheto-accordion__item:first-child .aheto-accordion__panel').show();

}(jQuery));
