/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Script = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
          window.onload = function () {
          var windowElement = $('html');
          var bodyElement = $('body');
          var loaderOverlay = document.getElementById('loaderOverlay');
            if (loaderOverlay && loaderOverlay.parentNode && loaderOverlay.parentNode.nodeType === 1) {
              loaderOverlay.parentNode.removeChild(loaderOverlay);
              loaderOverlay = null;
              windowElement.removeClass('locked');
              bodyElement.addClass('animated fadeIn');
            }
          };
          var scrollController = new ScrollMagic.Controller();
          var windowHeight = $(window).height();

          var introSceneHeight = $('#introAnimation').height();
          var titleTextTween = new TimelineMax();
          titleTextTween.staggerFromTo('#intro > #letters > path', 0.4, {opacity: 0}, {opacity: 1}, 0.2);

          var introTextTween = new TimelineMax();
          introTextTween.fromTo('#ball', 0.8, {scale: 0, opacity: 0}, {scale: 1, opacity: 1})
          .fromTo('#subTitle', 0.2, {opacity: 0}, {opacity: 1});
          var introScene = new ScrollMagic.Scene({triggerElement: '#introScene', offset: introSceneHeight/2, duration: introSceneHeight/2})
            .setClassToggle('body', 'introTextScene_active')
            .setPin('#introScene', {pushFollowers: true})
            .setTween(introTextTween)
            .addTo(scrollController);

          var stadiumSceneHeight = $('#stadiumScene').height();
          var stadiumTween = TweenMax.staggerFromTo('[data-name="light"]', 0.5, {css:{fill: '#ffffff'}}, {css:{fill: 'transparent'}, repeat: 4, yoyo: true}, 1);
          var stadiumScene = new ScrollMagic.Scene({triggerElement: '#stadiumScene', offset: -stadiumSceneHeight/2, duration: stadiumSceneHeight*2})
            .setClassToggle('body', 'stadiumScene_active')
            .setTween(stadiumTween)
            .addTo(scrollController);

          var scoreboardSceneHeight = $('#scoreboardScene').height();
          var scoreboardTween = TweenMax.fromTo('#scoreboardAnimation', 1.4, {css:{transform: 'translateY(100px)', opacity: 0}}, {css:{transform: 'translateY(0)', opacity: 1}});
          var scoreboardScene = new ScrollMagic.Scene({triggerElement: '#scoreboardScene', offset: -scoreboardSceneHeight/4})
            .setClassToggle('body', 'scoreboardScene_active')
            .setTween(scoreboardTween)
            .addTo(scrollController);

          var fiftyYardSceneHeight = $('#fiftyYardScene').height();
          var fiftyYardTween = new TimelineMax();
          fiftyYardTween.fromTo('#fiftyYardTextAnimation', 0.8, {css:{transform: 'translateX(-100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .fromTo('#voiceGuyAnimation', 0.4, { css:{transform: 'translateX(100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .staggerFromTo('[data-name="comment"]', 0.8, {css:{fill: 'transparent'}}, {css:{fill: '#ffffff'}, repeat: 0 }, 0.2);
          var fiftyYardScene = new ScrollMagic.Scene({ triggerElement: '#fiftyYardScene', offset: 0})
            .setClassToggle('body', 'fiftyYardScene_active')
            .setTween(fiftyYardTween)
            .addTo(scrollController);

          var thirtyYardSceneHeight = $('#thirtyYardScene').height();
          var thirtyYardTween = new TimelineMax();
          thirtyYardTween.to('#playersScene', 0.4, {opacity: 0.25})
            .fromTo('#thirtyYardTextAnimation', 0.4, {css:{transform: 'translateX(-100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .fromTo('#brainGuyAnimation', 0.4, { css:{transform: 'translateX(100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .staggerFromTo('[data-name="lightbulb"]', 0.2, {css:{opacity: '0'}}, {css:{opacity: '1'}, repeat: 0 }, 0.1);
          var thirtyYardScene = new ScrollMagic.Scene({ triggerElement: '#thirtyYardScene', offset: -thirtyYardSceneHeight/2})
            .setClassToggle('body', 'thirtyYardScene_active')
            .setTween(thirtyYardTween)
            .addTo(scrollController);

          var thirtyYardPlayersTween = new TimelineMax();
          thirtyYardPlayersTween.to('#playersScene', 0.4, {opacity: 1})
            .to('.foulThirty', 1, {opacity: 0, scale: 0}, 'foul')
            .fromTo('.flagThirty', 1, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, 'foul');
          var thirtyYardPlayersScene = new ScrollMagic.Scene({ triggerElement: '#thirtyYardScene', offset: thirtyYardSceneHeight*1.2})
            .setClassToggle('body', 'thirtyYardPlayersPin_active')
            .setTween(thirtyYardPlayersTween)
            .addTo(scrollController);

          var tenYardSceneHeight = $('#tenYardScene').height();
          var tenYardTween = new TimelineMax();
          tenYardTween.to('#playersScene', 0.4, {opacity: 0.25})
            .to('.flagThirty', 1, {opacity: 0, scale: 0}, 'reset')
            .to('.foulThirty', 1, {opacity: 1, scale: 1}, 'reset')
            .fromTo('#tenYardTextAnimation', 0.8, {css:{transform: 'translateX(-100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .fromTo('#heartGuyAnimation', 0.8, { css:{transform: 'translateX(100px)', opacity: 0}}, {css:{transform: 'translateX(0px)', opacity: 1}})
            .fromTo('[data-name="heart"]', 0.6, {css:{strokeWidth: '1rem', stroke: '#FF4338'}}, {css:{strokeWidth: '0', stroke: '#FF4338'}, repeat: -1, yoyo: true }, 1);
          var tenYardScene = new ScrollMagic.Scene({ triggerElement: '#tenYardScene', offset: 0})
            .setClassToggle('body', 'tenYardScene_active')
            .setTween(tenYardTween)
            .addTo(scrollController);

          var tenYardPlayersTween = new TimelineMax();
          tenYardPlayersTween.to('#playersScene', 0.4, {opacity: 1})
          .to('.foulTen', 1, {opacity: 0, scale: 0}, 'foul')
          .fromTo('.flagTen', 1, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, 'foul');
          var tenYardPlayersScene = new ScrollMagic.Scene({ triggerElement: '#tenYardScene', offset: tenYardSceneHeight*1.2})
            .setClassToggle('body', 'tenYardPlayersPin_active')
            .setTween(tenYardPlayersTween)
            .addTo(scrollController);

          var endZoneSceneHeight = $('#endZoneScene').height();
          var endZoneTween = new TimelineMax();
          endZoneTween.fromTo('#endZoneTextAnimation', 0.8, {css:{transform: 'translateX(-100px)', opacity: 0}}, {css:{transform: 'translateX(0)', opacity: 1}})
            .fromTo('#goalPostAnimation', 0.8, {css:{transform: 'translateY(240px)', opacity: 0}}, {css:{transform: 'translateY(0)', opacity: 1}});
          var endZoneScene = new ScrollMagic.Scene({ triggerElement: '#endZoneScene', offset: endZoneSceneHeight/4})
            .on("start", function (e) {
              var eventTween = new TimelineMax();
              eventTween.to('#playersScene', 0.4, {opacity: 1})
              .to('.lose', 1, {opacity: 0}, 'disappear')
              .to('.titleLose', 1, { opacity: 0}, 'disappear');
            })
            .on("leave", function (e) {
              var eventTween = new TimelineMax();
              eventTween.to('#playersScene', 0.4, {opacity: 0.25})
              .to('.lose', 1, {opacity: 1}, 'show')
              .to('.titleLose', 1, { opacity: 1}, 'show');
            })
            .setClassToggle('body', 'endZoneScene_active')
            .setTween(endZoneTween)
            .addTo(scrollController);

            var endZonePlayersTween = new TimelineMax();
            endZonePlayersTween.to('#playersScene', 0.4, {opacity: 0.25})
              .to('.flagTen', 1, {opacity: 0, scale: 0}, 'reset')
              .to('.foulTen', 1, {opacity: 1, scale: 1}, 'reset');
            var endZonePlayersScene = new ScrollMagic.Scene({ triggerElement: '#endZoneScene', offset: -endZoneSceneHeight/4})
              .setClassToggle('body', 'endZoneReset_active')
              .setTween(endZonePlayersTween)
              .addTo(scrollController);

          var chalkBoardSceneHeight = $('#chalkBoardScene').height();
          var chalkBoardTween = new TimelineMax();
          chalkBoardTween.fromTo('#Board', 2.4, {transformOrigin: 'center center',rotationX:360}, {transformOrigin: 'center center', rotationX:0});
          var chalkBoardScene = new ScrollMagic.Scene({ triggerElement: '#chalkBoardScene', offset: chalkBoardSceneHeight/3})
            .setClassToggle('body', 'chalkBoardScene_active')
            .setTween(chalkBoardTween)
            .addTo(scrollController);

          var playersSceneHeight = $('#playersScene').height();

          var playersTween = TweenMax.fromTo('#playersScene object', 0.2, {css:{transform: 'rotate(-5deg)'}}, {css:{transform: 'rotate(5deg)'},repeat: -1, yoyo: true}, 2);
          var playersScene = new ScrollMagic.Scene({ triggerElement: '#playersScene', offset: 0})
            .setClassToggle('body', 'playarsScene_active')
            .setPin('#playersScene', {pushFollowers: false})
            .setTween(playersTween)
            .addTo(scrollController);
          playersScene.duration(endZoneScene.scrollOffset()-playersScene.scrollOffset());
          $(window).on('resize', function () {
            playersScene.duration(endZoneScene.scrollOffset()-playersScene.scrollOffset());
          });

          // introScene.addIndicators({name:'Intro'});
          // stadiumScene.addIndicators({name:'Stadium'});
          // scoreboardScene.addIndicators({name:'Scoreboard'});
          // fiftyYardScene.addIndicators({name:'Fifty Yard'});
          // thirtyYardScene.addIndicators({name:'Thirty Yard'});
          // thirtyYardPlayersScene.addIndicators({name:'50 to 30 Players'});
          // tenYardScene.addIndicators({name:'Ten Yard'});
          // tenYardPlayersScene.addIndicators({name:'30 to 10 Players'});
          // chalkBoardScene.addIndicators({name:'Chalkboard Scene'});
          // endZoneScene.addIndicators({name:'End Zone'});
          // endZonePlayersScene.addIndicators({name:'End Zone Players'});
          //
          // playersScene.addIndicators({name: 'Players'});

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page

      },
      finalize: function() {

      }
    },
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Script;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
