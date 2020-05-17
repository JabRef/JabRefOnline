// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this)
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr('href')).offset().top,
        },
        1500,
        'easeInOutExpo'
      )
    event.preventDefault()
  })
})

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top',
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggle:visible').click()
})

$('div.modal').on('show.bs.modal', function () {
  var modal = this
  var hash = modal.id
  window.location.hash = hash
  window.onhashchange = function () {
    if (!location.hash) {
      $(modal).modal('hide')
    }
  }
})

// OS specific download
if (window.navigator.userAgent.indexOf('Win') != -1) {
  // Windows
  $('.download-btn').attr(
    'href',
    'https://www.fosshub.com/JabRef.html?dwl=JabRef-5.0.msi'
  )
  $('.for-win-only').css('display', 'inline')
}
if (window.navigator.userAgent.indexOf('Mac') != -1) {
  // Mac/iOS
  $('.download-btn').attr(
    'href',
    'https://www.fosshub.com/JabRef.html?dwl=JabRef-5.0.pkg'
  )
  $('.for-mac-only').css('display', 'inline')
}
if (window.navigator.userAgent.indexOf('X11') != -1) {
  // Unix
  $('.download-btn').attr(
    'href',
    'https://www.fosshub.com/JabRef.html?dwl=jabref_5.0-1_amd64.deb'
  )
  $('.for-linux-only').css('display', 'inline')
}
if (window.navigator.userAgent.indexOf('Linux') != -1) {
  // Linux (e.g. android)
}

// Interactive-image setup
var items = [
  {
    type: 'text',
    title: 'Search',
    description: 'Find your paper using advanced search and filter features.',
    position: {
      left: 20,
      top: 7,
    },
  },
  {
    type: 'text',
    title: 'Groups',
    description:
      'Group your research into hierarchical collections based on keywords, search terms or manual assignments.',
    position: {
      left: 10,
      top: 30,
    },
  },
  {
    type: 'text',
    title: 'Web Search',
    description: 'Import new documents from many online scientific catalogue.',
    position: {
      left: 6,
      top: 93,
    },
  },
  {
    type: 'text',
    title: 'Library',
    description: 'Keep the overview of what you read and cite.',
    position: {
      left: 70,
      top: 31,
    },
  },
  {
    type: 'text',
    title: 'Editor',
    description:
      'Edit and complete bibliographic data using curated online catalogues.',
    position: {
      left: 50,
      top: 85,
    },
  },
]
var options = {
  shareBox: false,
}

// Activate the plugin
$(document).ready(function () {
  $('#image-overlay-container').interactiveImage(items, options)
})
