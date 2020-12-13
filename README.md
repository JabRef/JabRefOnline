# Source of www.jabref.org

> This repository contains the source of the [JabRef homepage](https://www.jabref.org/).

Feel free to improve the page using the [issue tracker](https://github.com/JabRef/www.jabref.org/issues) or pull requests.

## Local Development

For local development, follow the [Jekyll installation instructions](https://jekyllrb.com/docs/installation/).
Installing the latest version of ruby followed by `gem install bundler` should be enough.

Afterwards, run

```terminal
bundle install
jekyll serve --livereload
```

and go to <http://localhost:4000/> in your browser.

On Windows, using a dockerized environment is recommended:

```terminal
docker run -p 4000:4000 --rm --volume="C:\git-repositories\jabref\www.jabref.org":/srv/jekyll jekyll/jekyll:4 jekyll serve
```

In case you get errors regarding `Gemfile.lock`, just delete `Gemfile.lock` and rerun.

Incremental building is also possible:

```terminal
docker run -p 4000:4000 --rm --volume="C:\git-repositories\jabref\www.jabref.org":/srv/jekyll jekyll/jekyll:4 jekyll serve --incremental
```

### Update fonts

Precondition: `npm install --global get-google-fonts`

```terminal
get-google-fonts -i http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic
npm install --save @fortawesome/fontawesome-free
```

## Notes on the Jekyll version

This homepage is generated using the latest version of [Jekyll](https://jekyllrb.com/).
