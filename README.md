This repository contains the source of the [JabRef homepage](https://www.jabref.org/).
Feel free to improve the page using the [issue tracker](https://github.com/JabRef/www.jabref.org/issues) or pull requests.

The layout is based on [github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).

For running htmlproof, execute these two commands:

    bundle exec jekyll build
    bundle exec htmlproof ./_site

On Windows, you have to do following steps to let htmlproof work.

  - Download libcurl https://curl.haxx.se/download.html. Current version: http://curl.haxx.se/gknw.net/7.40.0/dist-w32/renamed-curl-7.40.0-devel-mingw32.zip
  - Extract subfolder `curl-7.40.0-devel-mingw32` into `c:\temp`
  - Exec `SET PATH=%PATH%;c:\temp\curl-7.40.0-devel-mingw32\bin`

Hints for running Jekyll in general is provided at <https://github.com/JabRef/help.jabref.org/blob/gh-pages/README.md>.
