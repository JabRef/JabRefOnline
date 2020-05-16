// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $("a.page-scroll").bind("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
});

// Highlight the top nav as scrolling occurs
$("body").scrollspy({
  target: ".navbar-fixed-top",
});

// Closes the Responsive Menu on Menu Item Click
$(".navbar-collapse ul li a").click(function () {
  $(".navbar-toggle:visible").click();
});

$("div.modal").on("show.bs.modal", function () {
  var modal = this;
  var hash = modal.id;
  window.location.hash = hash;
  window.onhashchange = function () {
    if (!location.hash) {
      $(modal).modal("hide");
    }
  };
});

// Interactive-image setup
var items = [
    {
      type: "text",
      title: "Search",
      description: "Find your paper using advanced search and filter features.",
      position: {
          left: 200,
          top: 45
      }
    },
    {
        type: "text",
        title: "Groups",
        description: "Group your research into hierarchical collections based on keywords, search terms or manual assignments.",
        position: {
            left: 80,
            top: 250
        }
      },
      {
        type: "text",
        title: "Web Search",
        description: "Import new documents from many online scientific catalogue.",
        position: {
            left: 100,
            top: 600
        }
      },
      {
        type: "text",
        title: "Library",
        description: "Keep the overview of what you read and cite.",
        position: {
            left: 720,
            top: 285
        }
      },
      {
        type: "text",
        title: "Editor",
        description: "Edit and complete bibliographic data using curated online catalogues.",
        position: {
            left: 500,
            top: 550
        }
      },
      
  ];
  var options = {
    shareBox: false
  };

// Activate the plugin
$(document).ready(function () {
  $("#image-overlay-container").interactiveImage(items, options);
});
