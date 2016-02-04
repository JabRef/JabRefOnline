This repository contains the source of the [JabRef homepage](http://www.jabref.org/).
Feel free to improve the page using the [issue tracker](https://github.com/JabRef/www.jabref.org/issues) or pull requests.

The layout is based on [github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).

Execute `gem install bundler`, `bundle install`, and `bundle exec jekyll serve` to serve this page locally at http://localhost:4000/.
Source: https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll
At windows, this works with [RubyInstaller](http://rubyinstaller.org/downloads) and the [Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit).
[JRuby](http://jruby.org/) doesn't work as the [C extensions were dropped](http://stackoverflow.com/a/32135381/873282).

For running htmlproof, execute these two commands:

    bundle exec jekyll build
    bundle exec htmlproof ./_site

On Windows, you have to do following steps to let htmlproof work.

  - Download libcurl https://curl.haxx.se/download.html. Current version: http://curl.haxx.se/gknw.net/7.40.0/dist-w32/renamed-curl-7.40.0-devel-mingw32.zip
  - Extract subfolder `curl-7.40.0-devel-mingw32` into `c:\temp`
  - Exec `SET PATH=%PATH%;c:\temp\curl-7.40.0-devel-mingw32\bin`

You can update your jekyll instance using `bundle update`.
This might be necessary because of the update to [Jekyll 3.0 by GitHub](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0).
