---
title: JabRef Hacktoberfest 2019 Reflection
id: hacktoberfest2019-reflection
author: "[JabRef Maintainers](https://github.com/JabRef/jabref/blob/main/MAINTAINERS)"
---

# JabRef Hacktoberfest 2019 Reflection

In 2019, we participated at [hacktoberfest](https://hacktoberfest.digitalocean.com/) again; now an own organization - [one out of 29 organizations having special goodies](https://benbarth.github.io/hacktoberfest-swag/).
This attracted many persons:  We had 37 different contributors from outside the current JabRef main developers, which is really cool.
The most notable feature inside JabRef is the updated [fetcher for the astrophysics data system (ADS)](https://help.jabref.org/en/ADS).
Outside the desktop application, our [browser integration](https://github.com/JabRef/JabRef-Browser-Extension) finally runs on Google Chrome and on Linux as well.
We are currently publishing the new extensions on the app stores.
Finally, the Linux snap build process has been improved.

In total, there were

- 80 pull requests (for each contributor: min: 1, max: 22, avg: 7, med: 4),
- 222 files changed (for each contributor: min: 1, max: 37, avg: 16, med: 11),
- 2585 lines added (for each contributor: min: 0, max: 889, avg: 144, med: 17),
- 3546 lines removed (for each contributor: min: 0, max: 696, avg: 169, med: 52).

We wrote a tool to gather data about the submitted pull requests:
The [hacktoberfest-contributor-overview-generator](https://github.com/JabRef/hacktoberfest-contributor-overview-generator).
It generates the above statistics and a `csv` file, which was manually analyzed with Excel, especially the sorting and [Subtotal feature](https://superuser.com/a/405569/138868).

We enjoyed [#hacktoberfest](https://twitter.com/search?q=%23hacktoberfest) and are currently sending out gifts.
Not all users have public email adresses, so we wait for them to show up.

For next year, we will probably adjust the rules, since some contributions were quite minor and probably have been done using the GitHub web interface without cloning any repository.
We currently think of requiring at least 100 lines of code for a sticker and 1000 lines of code for a T-Shirt;
however, focusing on the lines of code is certainly not ideal, since it could incentivize writing bloated code - which unnecessarily increases the load when reviewing PRs.
["When a measure becomes a target, it ceases to be a good measure." - Charles Goodhart](https://en.wikipedia.org/wiki/Goodhart%27s_law).
Another idea is that only PRs count that fix a pre-existing issue and therefore directly contributes to the improvement of JabRef.
In our opinion, this could increase high-quality pull requests and avoiding discussions whether changing a letter should lead to a sticker.
