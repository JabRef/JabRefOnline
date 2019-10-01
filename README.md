# Source of www.jabref.org

> This repository contains the source of the [JabRef homepage](https://www.jabref.org/).

Feel free to improve the page using the [issue tracker](https://github.com/JabRef/www.jabref.org/issues) or pull requests.

The layout is based on [github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).

For running htmlproof, execute these two commands:

    bundle exec jekyll build
    bundle exec htmlproof ./build

On Windows, the [Docker image](https://github.com/envygeeks/jekyll-docker/blob/master/README.md) is recommended:

([Jekyll's Docker image](https://github.com/envygeeks/jekyll-docker/blob/master/README.md) does not work)

```
docker run --rm --volume="c:\CHECKOUTDIR:/srv/jekyll" -it ruby:2.3.4 bash
cd /srv/jekyll
bundle install
jekyll build
```

Hints for running Jekyll in general is provided at <https://github.com/JabRef/help.jabref.org/blob/gh-pages/README.md>.

We use Jekyll 3.8.6, as the GitHub action currently does not support Jekyll 4.x (due to pinning ruby to 2.3.4).
