
(function() {
  "use strict";

  // iPad and iPod detection
  var isiPad = function() {
    return navigator.platform.indexOf("iPad") != -1;
  };

  var isiPhone = function() {
    return (
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPod") != -1
    );
  };

  var sliderMain = function() {
    $("#qbootstrap-slider-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function() {
        setTimeout(function() {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function() {
        setTimeout(function() {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      }
    });
  };

  // animate-box
  var contentWayPoint = function() {
    $(".animate-box").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          $(this.element).addClass("fadeInUp animated");
        }
      },
      { offset: "75%" }
    );
  };

  // Burger Menu
  var burgerMenu = function() {
    $("body").on("click", ".js-qbootstrap-nav-toggle", function(event) {
      if ($("#navbar").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }

      event.preventDefault();
    });
  };

  // Parallax
  var parallax = function() {
    if (!isiPad() || !isiPhone()) {
      $(window).stellar();
    }
  };

  // Page Nav
  var clickMenu = function() {
    $('a:not([class="external"])').click(function(event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");
      $("html, body").animate(
        {
          scrollTop: $('[data-section="' + section + '"]').offset().top
        },
        500
      );

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-qbootstrap-nav-toggle").removeClass("active");
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  var navActive = function(section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function() {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest("li")
        .addClass("active");
    });
  };
  var navigationSection = function() {
    var $section = $("div[data-section]");

    $section.waypoint(
      function(direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px"
      }
    );

    $section.waypoint(
      function(direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function() {
          return -$(this.element).height() + 155;
        }
      }
    );
  };

  // Window Scroll
  var windowScroll = function() {
    var lastScrollTop = 0;

    $(window).scroll(function(event) {
      var header = $("#qbootstrap-header"),
        scrlTop = $(this).scrollTop();

      if (scrlTop > 500 && scrlTop <= 2000) {
        header.addClass("navbar-fixed-top qbootstrap-animated slideInDown");
      } else if (scrlTop <= 500) {
        if (header.hasClass("navbar-fixed-top")) {
          header.addClass("navbar-fixed-top qbootstrap-animated slideOutUp");
          setTimeout(function() {
            header.removeClass(
              "navbar-fixed-top qbootstrap-animated slideInDown slideOutUp"
            );
          }, 100);
        }
      }
    });
  };

  // Animations
  var contentWayPoint = function() {
    var i = 0;
    $(".animate-box").waypoint(
      function(direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function() {
            $("body .animate-box.item-animate").each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }

                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 50);
        }
      },
      { offset: "85%" }
    );
  };

  var inlineSVG = function() {
    $("img.svg").each(function() {
      var $img = $(this);
      var imgID = $img.attr("id");
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");

      $.get(
        imgURL,
        function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find("svg");

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr("xmlns:a");

          // Replace image with new SVG
          $img.replaceWith($svg);
        },
        "xml"
      );
    });
  };

  // password-protect the RSVP form
  $("#rsvp-password").on("input", function(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value.length == 7) {
      if (value == "ktq+nko") {

        $(".rsvp-password-container").fadeOut('fast', () => {
          $("#invitation_name").addClass("animate fadeInUp").show();
        })
      } else {
        alert("Incorrect password");
        $(this).focus();
        $(this).select();
      }
    }
  });

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    return o;
  };

  function getSheetData() {
    const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1M4v_UMT3sJeMkEcza09caScQT9x1HLtor_8ymCsOTTI/edit?usp=sharing'

    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: showInfo,
      simpleSheet: true,
    });

    function showInfo(data, tabletop) {
      data.map(d => { 
        d.label = d["Prefix"] + " " + d["Invitation Name"];
        return d;
      });
      window.guestData = data;
      window.gd = data;

      window.gd2 = window.gd.reduce((acc, g) => {
        let guestNames = g["Guests"].split(',').map(g => g.trim().toLowerCase())
        let altNames = g["Alternate Names"].split(',').map(g => g.trim().toLowerCase())
        let names = [...guestNames, ...altNames]
        for (name of names) {
          acc.set(name, g)
        }
        return acc
      }, new Map())
    }
  }

  $("#invitation_name").autocomplete({
    appendTo: null,
    autoFocus: true,
    disabled: false,
    minLength: 5,
    source: (req, res) => {
      let term = req.term.trim().toLowerCase()
      if (gd2.has(term)) {
        res([ gd2.get(term) ])
      }
    }
  });

  $("#invitation_name").on("autocompleteselect", function(event, ui) {

    const party = ui.item;
    $("#invitation_id").val(party.invitation_id);

    const $rsvpForm = $("#rsvp-form");
    $("#rsvp-form #adult-form-template").remove()
    $("#rsvp-form #kids-form-template").remove()

    const adultFormTemplate = document.getElementById("adult-form-template");
    const kidsFormTemplate = document.getElementById("kids-form-template");
    const guestNames = party.Guests.split(", ");

    let id = 0;
    for (var i = 0; i < party.Adult; i++) {
      const $adultForm = $(adultFormTemplate).clone({
        withDataAndEvents: true
      });

      const $nameInput = $adultForm.find("input[type='text']");
      $nameInput.val(guestNames[i] || "Guest Name");

      id += 1;
      const $attendingAccept = $adultForm.find(".guest-attending-accept");
      $attendingAccept[0].name = `guest_attending_${id}`;
      $attendingAccept[0].id = `guest_attending_${id}`;
      $attendingAccept.parent().attr("for", `guest_attending_${id}`);
      $attendingAccept.on("change", function(e) {
        $attendingDecline.parent().removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        $(this).val("yes");
        const $mealPrefs = $adultForm.find('.guest-meal-pref-container').show();
      });

      const $attendingDecline = $adultForm.find(".guest-attending-decline");
      $attendingDecline[0].name = `guest_attending_${id}`;
      id += 1;
      $attendingDecline[0].id = `guest_attending_${id}`;
      $attendingDecline.parent().attr("for", `guest_attending_${id}`);
      $attendingDecline.on("change", function(e) {
        $attendingAccept.parent().removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        $(this).val("no");
        $adultForm.find('.guest-meal-pref-container').hide();
      });

      const $guestBeef = $adultForm.find(".guest-meal-pref-beef");
      const $guestFish = $adultForm.find(".guest-meal-pref-fish");
      const $guestVegetarian = $adultForm.find(".guest-meal-pref-vegetarian");
      $guestBeef[0].name = `guest_meal_pref_${id}`;
      $guestFish[0].name = `guest_meal_pref_${id}`;
      $guestVegetarian[0].name = `guest_meal_pref_${id}`;

      $guestBeef[0].id = `guest_meal_pref_${id}`;
      $guestBeef
        .parent()
        .find("label")
        .attr("for", `guest_meal_pref_${id}`);
      $guestBeef.on("change", function(e) {
        $(this)
          .closest("li")
          .addClass("active");
        $($guestFish)
          .closest("li")
          .removeClass("active");
        $($guestVegetarian)
          .closest("li")
          .removeClass("active");
        $(this).val("beef");
      });

      id += 1;
      $guestFish[0].id = `guest_meal_pref_${id}`;
      $guestFish
        .parent()
        .find("label")
        .attr("for", `guest_meal_pref_${id}`);
      $guestFish.on("change", function(e) {
        $(this)
          .closest("li")
          .addClass("active");
        $($guestBeef)
          .closest("li")
          .removeClass("active");
        $($guestVegetarian)
          .closest("li")
          .removeClass("active");
        $(this).val("fish");
      });

      id += 1;
      $guestVegetarian[0].id = `guest_meal_pref_${id}`;
      $guestVegetarian
        .parent()
        .find("label")
        .attr("for", `guest_meal_pref_${id}`);
      $guestVegetarian.on("change", function(e) {
        $(this)
          .closest("li")
          .addClass("active");
        $($guestBeef)
          .closest("li")
          .removeClass("active");
        $($guestFish)
          .closest("li")
          .removeClass("active");
        $($guestFish);
        $(this).val("vegetarian");
      });

      $adultForm.appendTo($rsvpForm);
      $adultForm.removeClass("hide");
    }

    if (party.Child || party.Infant) {
      const $kidsForm = $(kidsFormTemplate).clone();
      $kidsForm.find("#kids_num").val(party.Child);
      $kidsForm.find("#kids_num").prop("min", "0")
      $kidsForm.find("#kids_num").prop("max", party.Child)
      $kidsForm.find("#infants_num").val(party.Infant);
      $kidsForm.find("#infants_num").prop("min", "0")
      $kidsForm.find("#infants_num").prop("max", party.Infant)

      $kidsForm.appendTo($rsvpForm);
      $kidsForm.removeClass("hide");
    }

    $("#rsvp-form .submit-button")
      .first()
      .removeClass('hide')
      .appendTo($rsvpForm)

    $("#rsvp-form").addClass('animated fadeInUp').show()
    $("#rsvp-form").prop("disabled", true)
  });

  $("#rsvp-form").on("submit", function(e) {
    e.preventDefault();

    const invitation_id = $("#invitation_id").val();
    const invitation_name = $("#invitation_name").val();
    const kids_num = $("#kids_num").val() || 0 
    const infants_num = $("#infants_num").val() || 0
    const mac_and_cheese_num = $("#mac_and_cheese_num").val() || 0
    const chicken_tenders_num = $("#chicken_tenders_num").val() || 0

    const guests = []
    $("#rsvp-form #adult-form-template").each(function(i, form) {
      const guestName = $(form)
        .find(".guest-name-input")
        .val();

      const guest_attending = $(form).find(
        'input[name^="guest_attending"]:checked'
      )[0].value;

      const guest_meal_pref = $(form).find(
        'input[name^="guest_meal_pref"]:checked'
      )[0].value;

      guests.push({
        name: guestName,
        attending: guest_attending,
        meal_pref: (guest_attending ? guest_meal_pref : null),
      })
    })

    $(".submit-button").prop("disabled", true);

    const data = {
      invitation_id,
      invitation_name,
      guests,
      kids_num,
      mac_and_cheese_num,
      chicken_tenders_num,
      infants_num,
    };

    const database = firebase.database();
    const request = database.ref(`rsvps/${invitation_id}`).set(data)
    request
      .then((a,b) => {
        $(".submit-button", "#rsvp-form").fadeOut('fast', () => {
          $("#thanks").addClass('animated fadeInUp').show()
        })
      })
      .catch(err => {console.error(err)})
  });

  // dom onload
  $(function() {
    getSheetData();
    burgerMenu();
    sliderMain();
    clickMenu();
    parallax();
    navigationSection();
    contentWayPoint();
    inlineSVG();
  });
})();
