$(function () {

  let paddingOffset = $(window).outerWidth() - $('body').width() + 'px';

  $('.humburger').on('click', (function () {
    $('.adaptive-menu').animate({
      'left': '0',
    }, 1200);
    if ($('.adaptive-menu').is(':visible')) {
      $(this).css('padding-right', paddingOffset);
      $('body').css({
        'overflow-y': 'hidden',
        'padding-right': paddingOffset,
      });
      $('.dark').show(1200);
    }
  }));

  $('.cross').on('click', function () {
    $('.adaptive-menu').animate({
      'left': '-250px'
    }, 1200);
    $("body").css({
      'overflow-y': 'inherit',
      'padding-right': 0,
    });
    $('.dark').hide(1200);
  });

  $('.menu-humburger li:not(:last-child)').on('click', 'a', function (ev) {
    ev.preventDefault();
    $('.adaptive-menu').animate({
      'left': '-250px'
    });

    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1200, function () {

      $('body').css({
        'overflow-y': 'inherit',
        'padding-right': 0
      });
      $('.dark').hide(1200);
    });
  });

  $('.header-menu, .footer-menu').on('click', 'a', function (ev) {
    ev.preventDefault();
    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1200);
  });

  function closeWindow() {
    if ($('.window-form').is(':visible')) {
      $('.window-form').animate({
        'opacity': '0'
      }, 800, function () {
        $('.window-form').css('display', 'none');
        $('.form-value input').val('');
        $('input.form-user_item').removeClass('error');
        $("span.form__check2").addClass('error1').removeClass('form__check2');
        $('.form-value').css('display', 'inline-block');
        $('.form-value input:checked').prop('checked', false);
      });
      $("body").css({
        'overflow-y': 'inherit',
        'padding-right': 0,
      });
      $('.window-form').each(function () {
        $(this).css('padding-right', 0);
      })
    } else if ($('.window-form_2').is(':visible')) {
      $('.window-form_2').animate({
        'opacity': '0'
      }, 1200, function () {
        $('.window-form_2').css('display', 'none');
        $('.form-value input').val('');
        $('.form-value').css('display', 'inline-block');
        $('.form-value input:checked').prop('checked', false);
        $('.form-value input').val('');
        $('input.form-user_item').removeClass('error');
        $("span.form__check2").removeClass('form__check2').addClass('error1');
      });
      $("body").css({
        'overflow-y': 'inherit',
        'padding-right': 0,
      });
      $('.window-form_2').each(function () {
        $(this).css('padding-right', 0);
      })
    }
  }

  $('body').on('click', function (ev) {
    let target = $(ev.target);
    if (target.is($('.header-contact__button')) || target.is($('.footer-social__button'))) {
      $('.window-form').each(function () {
        $(this).css('padding-right', paddingOffset);
      });
      $('body').css({
        'overflow-y': 'hidden',
        'padding-right': paddingOffset,
      });
      $('.window-form').css('display', 'inline-flex');
      $('.window-form').animate({
        'opacity': '1'
      }, 800);
    }

    if (target.is($('.header-text__button')) || target.is($('.button-main'))) {
      $('.window-form_2').each(function () {
        $(this).css('padding-right', paddingOffset);
      });
      $('body').css({
        'overflow-y': 'hidden',
        'padding-right': paddingOffset,
      });
      $('.window-form_2').css('display', 'inline-flex');
      $('.window-form_2').animate({
        'opacity': '1'
      }, 800);
    }

    if (target.is($('.window-form')) || target.is($('.window-form_2')) || target.is($('.cross-form')) || target.is($('.cross-form div'))) {
      let a = [];
      if ($('.window-form').is(':visible')) {
        $('.window-form .form-value').find('input.form-user_item').each(function () {
          a.push($(this).val());
        });
      } else if ($('.window-form_2').is(':visible')) {
        $('.window-form_2 .form-value').find('input.form-user_item').each(function () {
          a.push($(this).val());
        });
      }

      if (a.some(el => el !== '')) {
        $('.form-value').css('display', 'none');
        $('.exit').css('display', 'block');
      } else {
        closeWindow();
      }
    }

    if (target.is($('.button-close'))) {
      $('.form-value').css('display', 'block');
      $('.exit').css('display', 'none');
      closeWindow();
    }

    if (target.is($('.button-cancel'))) {
      $('.form-value').css('display', 'block');
      $('.exit').css('display', 'none');
    }
})

  $('form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,
      rules: {
        Чекбокс: {
          required: true,
          function () {
            $("span.error1").removeClass('error1').addClass('form__check2');
          }
        },
        Телефон: {
          required: true,
        },
        Имя: {
          required: true,
        },
        Mайл: {
          required: true,
        }
      },
      submitHandler(form) {
        let th = $(form);
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
          }).done(() => {
          th.trigger('reset');
            $('.value-send').show('slow', function () {
              $('.value-send').delay(1000).hide(500, function () {
                closeWindow();
              });
            })
          });
          return false;
      }
    });
  });

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 400) {
      $('.arrow-to_top ').show();
    } else {
      $('.arrow-to_top ').hide();
    }
  });

  $('.arrow-to_top').click(function () {
    $('body, html').animate({
      scrollTop: 0
    }, 1200);
  });

  let a = $('.service-info').offset().top - 400;
  $(window).scroll(function () {
    if ($(this).scrollTop() > a) {
      $('.service-info span').show();
    } else {
      $('.service-info span').hide();
    }
  });

  let b = $('.header-about').offset().top - 116;
  $(window).scroll(function () {
    if ($(this).scrollTop() < 500) {
      $('.header-about span').show();
    } else {
      $('.header-about span').hide();
    }
  });

  $('input[type="tel"]').on('focus', function (ev) {
    ev.preventDefault();
  })

  $('input[type="tel"]').inputmask({
    "mask": "+7 (999) 999-9999"
  });

  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.example-button_right',
      prevEl: '.example-button_left',
    },
    pagination: {
      el: '.circle',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
      }
    }
  });
});