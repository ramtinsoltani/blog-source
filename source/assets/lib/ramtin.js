var Ramtin = function() {

  var that = this;

  this.util = {

    loadingDone: function() {

      var event = document.createEvent('Event');
      var loader = $('.loader-container').get(0);

      event.initEvent('loader-hidden', true, true);

      loader.style.opacity = 0;
      document.body.style.overflow = "auto";

      setTimeout(function(){

        loader.style.visibility = "hidden";
        window.dispatchEvent(event);

      } ,500);

    },

    isInView: function(element) {

      if ( $('.loader-container').get(0).style.visibility !== 'hidden' ) return false;

      var rect = element.getBoundingClientRect();

      return (
          rect.top + rect.height / 2 >= 0 &&
          rect.bottom - rect.height / 2 <= (window.innerHeight || document.documentElement.clientHeight)
      );

    },

    toggleSearch: function() {

      var bar = $('.search-bar').get(0);
      var input = $('.search-bar > input').get(0);
      var button = $('#nav-search').get(0);
      var icon = $('#nav-search > .nav-label > svg > g > path').get(0);

      if ( input.style.opacity === '0' ) {

        bar.style.height = '50px';
        input.style.pointerEvents = 'auto';
        input.style.opacity = '1';
        input.focus();
        button.style.backgroundColor = '#1b1b1b';
        icon.style.fill = '#4ae4ad';

      }
      else {

        bar.style.height = '0px';
        input.style.pointerEvents = 'none';
        input.style.opacity = '0';
        button.style.backgroundColor = '';
        icon.style.fill = '';

      }

    },

    animations: {

      chain: function(selector, chainDelay, animation, args) {

        var delay = 0;

        $(selector).each(function(index, item) {

          var animationArgs = [];

          animationArgs.push(item);
          animationArgs = animationArgs.concat(args);
          animationArgs.push(delay);

          animation.apply(null, animationArgs);

          delay += chainDelay;

        });

      },

      grow: function(element, width, height, force, delay) {

        if ( ! element.isActive && ( force || that.util.isInView(element) ) ) {

          element.isActive = true;

          if ( ! delay ) {

            element.style.height = height + 'px';
            element.style.width = width + 'px';

          }
          else {

            setTimeout(function() {

              element.style.height = height + 'px';
              element.style.width = width + 'px';

            }, delay);

          }

        }

      },

      fade: function(element, level, force, delay) {

        if ( ! element.isActive && ( force || that.util.isInView(element) ) ) {

          element.isActive = true;

          if ( ! delay ) {

            element.style.opacity = (level === undefined ? 1 : level);

          }
          else {

            setTimeout(function() {

              element.style.opacity = (level === undefined ? 1 : level);

            }, delay);

          }

        }

      }

    }

  };

  this.animations = {

    avatar: function() {

      that.util.animations.grow($('#avatar').get(0), 290, 290);
      that.util.animations.grow($('#avatar-border').get(0), 300, 300);

    },

    bio: function() {

      that.util.animations.fade($('.author-info').get(0));

    },

    logo: function() {

      that.util.animations.grow($('.blog-logo-large').get(0), 256, 256, true);

    },

    projects: function() {

      that.util.animations.fade($('.project.center').get(0));
      that.util.animations.fade($('.project.left').get(0), 1, false, 250);
      that.util.animations.fade($('.project.right').get(0), 1, false, 500);

    },

    technologies: function() {

      that.util.animations.chain('.technology-wrapper', 50, that.util.animations.fade, [.5, false]);

    },

    posts: function() {

      that.util.animations.chain('.post', 50, that.util.animations.fade, [1, false]);

    },

    social: function() {

      that.util.animations.chain('.social-button', 50, that.util.animations.fade, [1, false]);

    },

    footerNav: function() {

      that.util.animations.chain('.footer-nav', 50, that.util.animations.fade, [1, false]);

    }

  };

  window.addEventListener('load', that.util.loadingDone);
  window.addEventListener('scroll', that.animations.avatar);
  window.addEventListener('scroll', that.animations.bio);
  window.addEventListener('scroll', that.animations.projects);
  window.addEventListener('scroll', that.animations.technologies);
  window.addEventListener('scroll', that.animations.posts);
  window.addEventListener('scroll', that.animations.social);
  window.addEventListener('scroll', that.animations.footerNav);
  window.addEventListener('loader-hidden', that.animations.logo);
  window.addEventListener('loader-hidden', that.animations.avatar);
  window.addEventListener('loader-hidden', that.animations.bio);
  window.addEventListener('loader-hidden', that.animations.projects);
  window.addEventListener('loader-hidden', that.animations.technologies);
  window.addEventListener('loader-hidden', that.animations.posts);
  window.addEventListener('loader-hidden', that.animations.social);
  window.addEventListener('loader-hidden', that.animations.footerNav);

};

var ramtin = new Ramtin();
