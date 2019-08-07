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

  // Carousel Feature Slide
  // var testimonialCarousel = function() {
  //   var owl = $(".owl-carousel-fullwidth");
  //   owl.owlCarousel({
  //     animateOut: "fadeOut",
  //     items: 1,
  //     loop: true,
  //     margin: 0,
  //     nav: false,
  //     dots: true,
  //     smartSpeed: 800,
  //     autoHeight: false
  //   });
  // };

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

  // // Set the date we're counting down to
  // 	var countDownDate = new Date("Dec 02, 2017 15:37:25").getTime();

  // 	// Update the count down every 1 second
  // 	var x = setInterval(function() {

  // 	// Get todays date and time
  // 	var now = new Date().getTime();

  // 	// Find the distance between now an the count down date
  // 	var distance = countDownDate - now;

  // 	// Time calculations for days, hours, minutes and seconds
  // 	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  // 	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // 	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  // 	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // 	// Display the result in an element with id="demo"
  // 	// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
  // 	// + minutes + "Minutes " + seconds + "Seconds ";

  // 	// Display the result in an element with id="demo"
  // 	document.getElementById("days").innerHTML = days +" <small>days</small>";
  // 	document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
  // 	document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
  // 	document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

  // 	// If the count down is finished, write some text
  // 	if (distance < 0) {
  // 	 clearInterval(x);
  // 	 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
  // 	}
  // 	}, 1000);

  // var bgVideo = function() {
  // 	$('.player').mb_YTPlayer();
  // };

  // password-protect the RSVP form
  $("#rsvp-password").on("input", function(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value.length == 7) {
      if (value == "ktq+nko") {
        // hide this form
        $("#rsvp-password").hide();

        // unhide the other form
        // const rsvpForm = document.getElementById("rsvp-form");
        // $(rsvpForm).fadeIn();
        // fade this thing out and fade rsvp form in
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

  // retrieve guest data from guest_list.csv file
  const guestData = [
    {
      invitation_id: 1,
      "Invitation Name": "Kenneth Tang-Quan",
      FIELD3: "PastorKen@pvbc.com",
      FIELD4: "dtangquan@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Debbie Tang-Quan, Kenneth Tang-Quan",
      "Alternate Names": "Ken Tang-Quan",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 2,
      "Invitation Name": "Timothy Su",
      FIELD3: "timsu@alumni.stanford.edu",
      FIELD4: "sharon.tangquan@gmail.com",
      Adult: 2,
      Child: null,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Sharon Su, Elizabeth Su, Timothy Su",
      "Alternate Names": "Tim Su",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 3,
      "Invitation Name": "Yee Mee Tang-Quan",
      FIELD3: "",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mrs.",
      Guests: "Yee Mee Tang-Quan",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 4,
      "Invitation Name": "Lin Fai Leung",
      FIELD3: "",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Bo Chun Leung, Lin Fai Leung",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 5,
      "Invitation Name": "William Tang",
      FIELD3: "wquantang@gmail.com",
      FIELD4: "",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Susie Tang, Frank Tang, Elaine Tang, William Tang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 6,
      "Invitation Name": "Jean Lee",
      FIELD3: "jatqmail1@yahoo.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mrs.",
      Guests: "Jean Lee",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 7,
      "Invitation Name": "Winston Tang",
      FIELD3: "wtangang@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Alice Tang, Winston Tang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 8,
      "Invitation Name": "Victor Tang-Quan",
      FIELD3: "vtq@hotmail.com",
      FIELD4: "etang-qu@ccsf.edu",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests:
        "Ethel Tang-Quan, Fawn Tang-Quan, Holly Tang-Quan, Victor Tang-Quan",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 9,
      "Invitation Name": "Tony Chow",
      FIELD3: "tchowfamily@comcast.net",
      FIELD4: "",
      Adult: 3,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Jonathan Chow, Samantha Chow, Tony Chow",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 10,
      "Invitation Name": "Vincent Tang",
      FIELD3: "vincetang1@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Tedrick Tang, Vincent Tang",
      "Alternate Names": "Vince Tang",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 11,
      "Invitation Name": "Dennis Hanley",
      FIELD3: "denniswhanley@gmail.com",
      FIELD4: "",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Dennis Hanley, Isaac Hanley, Brian Hanley, Christian Hanley",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 12,
      "Invitation Name": "Daniel Leung",
      FIELD3: "danielson320@yahoo.com",
      FIELD4: "ko1726@yahoo.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mr.",
      Guests: "Li Kong, Daniel Leung",
      "Alternate Names": "Dan Leung, Danny Leung",
      Notes: "",
      "Coming?": "Probably just Daniel"
    },
    {
      invitation_id: 13,
      "Invitation Name": "David Kuroda",
      FIELD3: "dkuroda@gmail.com",
      FIELD4: "alicekuroda@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Alice Kuroda, David Kuroda",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 14,
      "Invitation Name": "Kazuaki Uemura",
      FIELD3: "kaz@uemura-law.com",
      FIELD4: "cyuemura@hotmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Kazuaki Uemura, Cynthia Uemura",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 15,
      "Invitation Name": "David Hostetler",
      FIELD3: "David.hostetler@ieee.org",
      FIELD4: "karenkhostetler@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Karen Hostetler, David Hostetler",
      "Alternate Names": "Dave Hostetler",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 16,
      "Invitation Name": "David Akiyama",
      FIELD3: "dave@akimountain.com",
      FIELD4: "cindy@akimountain.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "David Akiyama, Cindy Akiyama",
      "Alternate Names": "Dave Akiyama",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 17,
      "Invitation Name": "Weymann Lee",
      FIELD3: "onewayman@gmail.com",
      FIELD4: "h2olee@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Dr. and Mrs.",
      Guests: "Helen Lee, Weymann Lee",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 18,
      "Invitation Name": "James Su",
      FIELD3: "art2su@gmail.com",
      FIELD4: "julie8888@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Dr. and Mrs.",
      Guests: "Julie Huang, James Su",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 19,
      "Invitation Name": "Jason Liang",
      FIELD3: "jasonzqliang@yahoo.com",
      FIELD4: "",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Betty Liang, Sabrina Liang, Stephanie Liang, Jason Liang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 20,
      "Invitation Name": "James Mar",
      FIELD3: "jim.mar@comcast.net",
      FIELD4: "marg.mar@comcast.net",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Margaret Mar, James Mar",
      "Alternate Names": "Jim Mar",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 21,
      "Invitation Name": "Richard Gin",
      FIELD3: "richgin56@comcast.net",
      FIELD4: "rhodagin@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Rhoda Gin, Richard Gin",
      "Alternate Names": "Rich Gin",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 22,
      "Invitation Name": "Seng Chean Ong",
      FIELD3: "james92011@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Mui Chin Yap, Seng Chean Ong",
      "Alternate Names": "Sonny Ong",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 23,
      "Invitation Name": "Benjamin Ong",
      FIELD3: "bnjmn.ong@gmail.com",
      FIELD4: "chif705@gmail.com",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Benjamin Ong, Feibi Chi, James Ong, Joshua Ong",
      "Alternate Names": "Feibi Ong",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 24,
      "Invitation Name": "Stan Cone",
      FIELD3: "cone@entouch.net",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Stan Cone, Sally Cone",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 25,
      "Invitation Name": "Eddie Young",
      FIELD3: "tycoinsurance@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Eddie Young, Tai Young",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 26,
      "Invitation Name": "Ong Seng Huck",
      FIELD3: "johnnyshong1@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Ong Seng Huck, ",
      "Alternate Names": "Johnny Ong",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 27,
      "Invitation Name": "Ronny Ong",
      FIELD3: "ausronsbong@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Ronny Ong, Mee Mee Ong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 28,
      "Invitation Name": "Daniel Ho",
      FIELD3: "joannedaniel@hotmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Daniel Ho, Joanne Ho",
      "Alternate Names": "Joanne Lim",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 29,
      "Invitation Name": "Kuo Hua Chi",
      FIELD3: "",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Kuo Hua Chi, May Fong Chi",
      "Alternate Names": "Frank Chi",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 30,
      "Invitation Name": "Benjamin Tzeng",
      FIELD3: "weenatzeng@yahoo.com",
      FIELD4: "",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Weena Tzeng, Benjamin Tzeng, Weena Child 1, Weena Child 2",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": ""
    },
    {
      invitation_id: 31,
      "Invitation Name": "Tzy Yu Chow",
      FIELD3: "paulinesgc@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Pauline Chow, Tzy Yu Chow, Pauline Child 1, Pauline Child 2",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": "Yes"
    },
    {
      invitation_id: 32,
      "Invitation Name": "Mathew Warren",
      FIELD3: "matthewwarren@hotmail.com",
      FIELD4: "philandawarren@hotmail.com",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests:
        "Philanda Warren, Mathew Warren, Philanda Child 1, Philanda Child 2",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": ""
    },
    {
      invitation_id: 33,
      "Invitation Name": "See Long Wong",
      FIELD3: "winniewthui@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Winnie Wong, See Long Wong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 34,
      "Invitation Name": "Evelyn Tanheheo",
      FIELD3: "",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mrs.",
      Guests: "Evelyn Tanheheo",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 35,
      "Invitation Name": "Jack Smith",
      FIELD3: "smithjackanne@aol.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Jack Smith, Ann Smith",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 36,
      "Invitation Name": "Thomas Huang",
      FIELD3: "satman1972@gmail.com",
      FIELD4: "eleanorhu1973@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Thomas Huang, Eleanor Huang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 37,
      "Invitation Name": "Doris Taylor",
      FIELD3: "stemcellzrus@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Dr.",
      Guests: "Doris Taylor, Plus one (Andrea)",
      "Alternate Names": "",
      Notes: "Don't know Dr. Taylor's plus one's full name",
      "Coming?": ""
    },
    {
      invitation_id: 38,
      "Invitation Name": "David Tang-Quan",
      FIELD3: "davidtq@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "David Tang-Quan",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 39,
      "Invitation Name": "James Tang",
      FIELD3: "jwtang15@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Kelly Tang, James Tang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 40,
      "Invitation Name": "John Lee",
      FIELD3: "jlee_od@yahoo.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Christine Lee, John Lee",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 41,
      "Invitation Name": "Joseph Lee",
      FIELD3: "email4jlee@yahoo.com",
      FIELD4: "joseph.n.brenda@gmail.com",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Brenda Lee, Kristen Lee, Kaitlyn Lee, Joseph Lee",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 42,
      "Invitation Name": "Justin Chow",
      FIELD3: "scamrock415@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Violetta Chow, Viva Chow, Pato Chow, Justin Chow",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 43,
      "Invitation Name": "Gordon Lew",
      FIELD3: "basiclabrat@gmail.com",
      FIELD4: "susanhwong@hotmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Susan Lew, Gordon Lew",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 44,
      "Invitation Name": "Janet Yau",
      FIELD3: "jyau57@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Janet Yau, Daniel ??",
      "Alternate Names": "",
      Notes: "Don't know Daniel's last name",
      "Coming?": "No"
    },
    {
      invitation_id: 45,
      "Invitation Name": "Daryn Sakamoto",
      FIELD3: "darynsakamoto@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Daryn Sakamoto, James Oh",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 46,
      "Invitation Name": "Don Chung",
      FIELD3: "elizabethwooo@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Don Chung, Elizabeth Chung",
      "Alternate Names": "Elizabeth Woo, Liz Woo, Liz Chung",
      Notes: "",
      "Coming?": "Only Liz"
    },
    {
      invitation_id: 47,
      "Invitation Name": "Stephanie Welke",
      FIELD3: "stephmasamitsu@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Donald Welke, Stephanie Welke",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 48,
      "Invitation Name": "Melanie Lew",
      FIELD3: "melaniedenise@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Melanie Lew",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 49,
      "Invitation Name": "Kamauri Yeh",
      FIELD3: "kamauriyeh@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Peter Hironaka, Kamauri Yeh",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 50,
      "Invitation Name": "Andrew Kao",
      FIELD3: "andrew.m.kao@gmail.com",
      FIELD4: "jessicamkao@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Jessica Kao, Andrew Kao",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 51,
      "Invitation Name": "Claudia Chern",
      FIELD3: "claudia.chern@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Hiroshi Tomita, Claudia Chern",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 52,
      "Invitation Name": "Jeanette Lok",
      FIELD3: "j.net.lok@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Jeanette Lok, Plus One (Jon)",
      "Alternate Names": "",
      Notes: "Don't know Jeanette's plus one's full name",
      "Coming?": "Yes"
    },
    {
      invitation_id: 53,
      "Invitation Name": "Heidi Chen",
      FIELD3: "h.isabel.chen@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Heidi Chen",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 54,
      "Invitation Name": "Cameron Olson",
      FIELD3: "rosiedwight@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Rosie Olson, Cameron Olson",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 55,
      "Invitation Name": "Jedidiah Chow",
      FIELD3: "jedidiahchow@gmail.com",
      FIELD4: "tchiu3@gmail.com",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Jedidiah Chow, Tiffany Chow, Elana Chow, Baby Chow 2",
      "Alternate Names": "Jed Chow",
      Notes: "Not sure of the baby names (Elana and Baby Chow 2)",
      "Coming?": ""
    },
    {
      invitation_id: 56,
      "Invitation Name": "Gary Chan",
      FIELD3: "gary.kun.chan@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Mara Chan, Gary Chan",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 57,
      "Invitation Name": "Richard Pang",
      FIELD3: "richpang@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Richard Pang, Plus One (Eugenie)",
      "Alternate Names": "DP",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 58,
      "Invitation Name": "Tod Berkey",
      FIELD3: "erinlberkey@yahoo.com",
      FIELD4: "todberkey@grace-bible.org",
      Adult: 4,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Erin Berkey, Tod Berkey, Paxson Berkey, Preston Berkey",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 59,
      "Invitation Name": "Jack Wang",
      FIELD3: "jack.calvin.wang@gmail.com",
      FIELD4: "rebecca.jane.wang@gmail.com",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Rebecca Wang, Bennett Wang, Matthias Wang, Jack Wang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 60,
      "Invitation Name": "Eric Kim",
      FIELD3: "ericjosephkim@gmail.com",
      FIELD4: "agapeunji@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Dr. and Mrs.",
      Guests: "Eunji Kim, Eric Kim",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 61,
      "Invitation Name": "Peter Wu",
      FIELD3: "peter.y.wu@gmail.com",
      FIELD4: "lilsnowangel@gmail.com",
      Adult: 2,
      Child: null,
      Infant: 1,
      FIELD8: "Dr. and Dr.",
      Guests: "Jennifer Wu, Wu Baby, Peter Wu",
      "Alternate Names": "Jenn Wu",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 62,
      "Invitation Name": "John Hsieh",
      FIELD3: "liljohnjohn@gmail.com",
      FIELD4: "ejlee012@gmail.com",
      Adult: 2,
      Child: null,
      Infant: 2,
      FIELD8: "Dr. and Mrs.",
      Guests: "Esther Hsieh, Ethan Hsieh, Levi Hsieh, John Hsieh",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 63,
      "Invitation Name": "Dawn Chan",
      FIELD3: "dcsukyi@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Dawn Chan",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 64,
      "Invitation Name": "Sunny Kim",
      FIELD3: "jeesunnykim@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Sunny Kim",
      "Alternate Names": "Jeesun Kim",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 65,
      "Invitation Name": "Victoria Kwong",
      FIELD3: "vickkwong@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Victoria Kwong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 66,
      "Invitation Name": "Priscilla Bishop",
      FIELD3: "cillabish@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Priscilla Bishop, Corey Bishop",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": "No"
    },
    {
      invitation_id: 67,
      "Invitation Name": "Tabitha Liang",
      FIELD3: "tadpole0019@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: 1,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Tabitha Liang, Steve Liang",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": ""
    },
    {
      invitation_id: 68,
      "Invitation Name": "Becky Wagner",
      FIELD3: "becky.yong@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Becky Wagner, Dustin Wagner",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 69,
      "Invitation Name": "Bonny Ong",
      FIELD3: "bonnyong@yahoo.com",
      FIELD4: "",
      Adult: 3,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Bonny Ong, Samantha Ong, Vanessa Ong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 70,
      "Invitation Name": "Ben Poon",
      FIELD3: "benjamintpoon@gmail.com",
      FIELD4: "spchen78@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Ben Poon, Sarah Chen",
      "Alternate Names": "Benjamin Poon",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 71,
      "Invitation Name": "Chris Lin",
      FIELD3: "chrislin99@gmail.com",
      FIELD4: "soo.caroline@gmail.com",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Chris Lin, Caroline Soo",
      "Alternate Names": "Christopher Lin",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 72,
      "Invitation Name": "BJ Borja",
      FIELD3: "sjborja@gmail.com",
      FIELD4: "Ann Nguyen <annmnguyen@gmail.com>",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "BJ Borja, Ann Borja, Peyton Borja, Audrey Borja",
      "Alternate Names": 'Silvestre "BJ" Borja, Silvestre Borja',
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 73,
      "Invitation Name": "Jon Kwan",
      FIELD3: "kwankeewing@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Jon Kwan",
      "Alternate Names": "Jonathan Kwan",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 74,
      "Invitation Name": "Alvin Leung",
      FIELD3: "alvinwleung@gmail.com",
      FIELD4: "Nina Shiang <ninashiang@gmail.com>",
      Adult: 2,
      Child: 1,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Alvin Leung, Nina Leung, Noah Leung, Alina Leung",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 75,
      "Invitation Name": "Noel Rydecki",
      FIELD3: "noel.rydecki@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Noel Rydecki",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 76,
      "Invitation Name": "Tim Park",
      FIELD3: "timmie0123@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Tim Park",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 77,
      "Invitation Name": "Hai Nguyen",
      FIELD3: "hainguyen281@gmail.com",
      FIELD4: "Angeline Ngo <ngo.angelineh@gmail.com>",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Hai Nguyen, Angeline Nguyen, Hudson Nguyen, Hayden Nguyen",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 78,
      "Invitation Name": "Anthony Tsuei",
      FIELD3: "anthony.tsuei@gmail.com",
      FIELD4: "Christina Tsuei <cwtsuei@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Anthony Tsuei, Christina Tsuei",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 79,
      "Invitation Name": "Thomas Le",
      FIELD3: "thomasle77@gmail.com",
      FIELD4: "Jen Duong <jenduong@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Thomas Le, Jennifer Duong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 80,
      "Invitation Name": "Anthony Nguyen",
      FIELD3: "avnguyen@gmail.com",
      FIELD4: "Nancy Nguyen <nancytunguyen@gmail.com>",
      Adult: 2,
      Child: 2,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Anthony Nguyen, Nancy Nguyen, Alex Nguyen, Logan Nguyen",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 81,
      "Invitation Name": "David Tang",
      FIELD3: "davidtang1@gmail.com",
      FIELD4: "Denise Truong <Dentru@gmail.com>",
      Adult: 2,
      Child: 1,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "David Tang, Denise Tang, Olive Tang",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 82,
      "Invitation Name": "Eddison Fu",
      FIELD3: "eddisonfu@gmail.com",
      FIELD4: "Emily Wang <justwangit85@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Eddison Fu, Emily Wang",
      "Alternate Names": "Ed Fu, Emily Fu",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 83,
      "Invitation Name": "Sanket Kumar",
      FIELD3: "sanket.kumar@gmail.com",
      FIELD4: "Roma Patel <romabpatel@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Sanket Kumar, Roma Kumar",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 84,
      "Invitation Name": "Wayne Hsu",
      FIELD3: "waynehsu@gmail.com",
      FIELD4: "Lu Bu <awesomelu@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Wayne Hsu, Lu Bu, Mina Hsu",
      "Alternate Names": "Lu Hsu",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 85,
      "Invitation Name": "Nicole Hostetler",
      FIELD3: "nicolehostetler@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Nicole Hostetler",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 86,
      "Invitation Name": "Lee Luthy",
      FIELD3: "wleeluthy@yahoo.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Lee Luthy, Tammy Luthy",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 87,
      "Invitation Name": "Timmy Dy",
      FIELD3: "timmydy@gmail.com",
      FIELD4: "Grace Dy <gracey1212@gmail.com>",
      Adult: 2,
      Child: null,
      Infant: 1,
      FIELD8: "Mr. and Mrs.",
      Guests: "Timmy Dy, Grace Dy, Baby Dy",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 88,
      "Invitation Name": "Jason Shen",
      FIELD3: "jason.shen@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Jason Shen",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "Yes"
    },
    {
      invitation_id: 89,
      "Invitation Name": "Ramin Beygui",
      FIELD3: "ramin.beygui@ucsf.edu",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Dr. and Mrs.",
      Guests: "Ramin Beygui, Mrs. Beygui",
      "Alternate Names": "",
      Notes: "Don't know wife's name",
      "Coming?": ""
    },
    {
      invitation_id: 90,
      "Invitation Name": "Sonja Schrepfer",
      FIELD3: "sonja.schrepfer@ucsf.edu",
      FIELD4: "",
      Adult: 2,
      Child: 1,
      Infant: null,
      FIELD8: "Dr. and Dr.",
      Guests: "Sonja Schrepfer, Tobias Deuse, Tyler Deuse",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 91,
      "Invitation Name": "Nicole Yap",
      FIELD3: "nicoleyap1201992@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Nicole Yap",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 92,
      "Invitation Name": "Tim Chi",
      FIELD3: "newsearch2010@yahoo.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Tim Chi",
      "Alternate Names": "",
      Notes: "",
      "Coming?": "No"
    },
    {
      invitation_id: 93,
      "Invitation Name": "Ellen Su",
      FIELD3: "ellenfsu@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Ellen Su, Jonathan (Ellen Su Plus One)",
      "Alternate Names": "",
      Notes: "Don't know Ellen's Plus One's full name",
      "Coming?": "No"
    },
    {
      invitation_id: 94,
      "Invitation Name": "Sunita Biswas",
      FIELD3: "sunita.biswas@gmail.com",
      FIELD4: "",
      Adult: 2,
      Child: 1,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Sunita Biswas, Ray Huang, Sunita child",
      "Alternate Names": "",
      Notes: "Don't know kids' names",
      "Coming?": ""
    },
    {
      invitation_id: 95,
      "Invitation Name": "Dennis Ong",
      FIELD3: "dennis.ong@outlook.com",
      FIELD4: "",
      Adult: null,
      Child: null,
      Infant: null,
      FIELD8: "Mr. ",
      Guests: "Dennis Ong",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 96,
      "Invitation Name": "Pang Shio Hin",
      FIELD3: "shpang2002@yahoo.com",
      FIELD4: "",
      Adult: null,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Pang Shio Hin",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 97,
      "Invitation Name": "Tony Ho",
      FIELD3: "tonyhhk@yahoo.com",
      FIELD4: "",
      Adult: null,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "Tony Ho",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 98,
      "Invitation Name": "KC Lam",
      FIELD3: "lam_kc@msn.com",
      FIELD4: "",
      Adult: null,
      Child: null,
      Infant: null,
      FIELD8: "Mr.",
      Guests: "KC Lam",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 99,
      "Invitation Name": "Isabel Hu",
      FIELD3: "huliangya@gmail.com",
      FIELD4: "",
      Adult: 1,
      Child: null,
      Infant: null,
      FIELD8: "Ms.",
      Guests: "Isabel Hu",
      "Alternate Names": "",
      Notes: "",
      "Coming?": ""
    },
    {
      invitation_id: 100,
      "Invitation Name": "Benjamin Wu",
      FIELD3: "",
      FIELD4: "",
      Adult: 2,
      Child: null,
      Infant: null,
      FIELD8: "Mr. and Mrs.",
      Guests: "Benjamin Wu, Mrs. Wu",
      "Alternate Names": "Ben Wu",
      Notes: "Don't know wife's name",
      "Coming?": ""
    }
  ].map(guest => {
    guest.label = guest["Invitation Name"];
    guest.value = guest.Guests;
    return guest;
  });

  window.gd = guestData;

  // rsvp form behaviors

  $("#invitation_name").autocomplete({
    appendTo: null,
    autoFocus: true,
    disabled: false,
    minLength: 3,
    source: (req, res) => {
      const matcher = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(req.term),
        "i"
      );

      const matches = guestData.filter(guest =>
        matcher.test(guest["Invitation Name"])
      );
      res(matches);
    }
  });

  $("#invitation_name").on("autocompleteselect", function(event, ui) {
    $("#invitation_name").hide();
    const party = ui.item;
    $("#invitation_id").val(party.invitation_id);

    const $rsvpForm = $("#rsvp-form");
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
      });

      if (party["Coming?"] === "Yes") {
        $attendingAccept.val("yes");
        $attendingAccept.parent().addClass("active");
        $attendingDecline.parent().removeClass("active");
      } else {
        $attendingDecline.val("no");
        $attendingDecline.parent().addClass("active");
        $attendingAccept.parent().removeClass("active");
      }

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

    const $kidsForm = $(kidsFormTemplate).clone();
    $kidsForm.find("#kids_num").val(party.Child);
    $kidsForm.find("#infants_num").val(party.Infant);
    $kidsForm.appendTo($rsvpForm);
    $kidsForm.removeClass("hide");

    $("#rsvp-form .submit-button")
      .first()
      .appendTo($rsvpForm)
      .removeClass("hide");

    adultFormTemplate.remove();
    kidsFormTemplate.remove();
  });

  // submit to Google Sheet "database"
  const googleSheetUrl =
    "https://script.google.com/macros/s/AKfycby2Py0YcgHB9IvxdWe5LEnvSl1T_FecsIqt3tJl_mquqsoVziS_/exec";

  $("#rsvp-form").on("submit", function(e) {
    e.preventDefault();

    // for each adult form in the rsvp form..
    const rsvpFormObject = $(this).serializeObject();

    $("#rsvp-form #adult-form-template").each(function(i, form) {
      const guestName = $(form)
        .find(".guest-name-input")
        .val();

      const invitation_id = $("#invitation_id").val();
      const invitation_name = $("#invitation_name").val();
      const guest_name = guestName;
      const guest_attending = $(form).find(
        'input[name^="guest_attending"]:checked'
      )[0].value;
      const guest_meal_pref = $(form).find(
        'input[name^="guest_meal_pref"]:checked'
      )[0].value;
      const kids_num = $("#kids_num").val();
      const infants_num = $("#infants_num").val();

      const data = {
        invitation_id,
        invitation_name,
        guest_name,
        guest_attending,
        guest_meal_pref,
        kids_num,
        infants_num
      };

      $(".submit-button").prop("disabled", true);

      $.ajax({
        url: googleSheetUrl,
        method: "POST",
        data: data,
        dataType: "jsonp",
        contentType: "application/javascript"
      }).error(function(err) {
        if (err.status === 200) {
          $(".submit-button", "#rsvp-form").fadeOut('fast', () => {
            $("#thanks").fadeIn('fast')
          });
        }
      });
    });
  });

  // dom onload
  $(function() {
    burgerMenu();
    sliderMain();
    clickMenu();
    parallax();
    navigationSection();
    contentWayPoint();
    inlineSVG();
  });
})();
