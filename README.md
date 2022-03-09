# JabRef's blog

> This repository contains the source of the [JabRef blog](https://blog.jabref.org/).

Feel free to send blog entries.
Find details in our [CONTRIBUTING.md](CONTRIBUTING.md) file.

The layout is based on [github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).
We use [jekyll](https://jekyllrb.com/) as static site generator.
See [GitHub pages](https://pages.github.com/) for more details on the mechanics behnd.

## Testing the blog entry

Execute `bundle exec jekyll serve` to serve this page locally at <http://localhost:4000/>.

For running htmlproof, execute these two commands:

    bundle exec jekyll build
    bundle exec htmlproof ./_site

## Installation

Source: <https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll>

1. Install Ruby by using the [RubyInstaller](http://rubyinstaller.org/downloads) or [choco install ruby](https://chocolatey.org/packages/ruby)
1. Install the [Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit) (or by [choco install ruby2.devkit](https://chocolatey.org/packages/ruby2.devkit))
1. `gem install bundler`
2. `bundle install`

Note that [JRuby](http://jruby.org/) doesn't work as the [C extensions were dropped](http://stackoverflow.com/a/32135381/873282).

### htmlproof

On Windows, you have to do following steps to let [htmlproof] work.

- Download libcurl <https://curl.haxx.se/download.html>. Current version: <http://curl.haxx.se/gknw.net/7.40.0/dist-w32/renamed-curl-7.40.0-devel-mingw32.zip>
- Extract subfolder `curl-7.40.0-devel-mingw32` into `c:\temp`
- Exec `SET PATH=%PATH%;c:\temp\curl-7.40.0-devel-mingw32\bin`

## Updating jekyll

You can update your jekyll instance using `bundle update`.
This might be necessary because of the update to [Jekyll 3.0 by GitHub](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0).

  [htmlproof]: https://github.com/gjtorikian/html-proofer
