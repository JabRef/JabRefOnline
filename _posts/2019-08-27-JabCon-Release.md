---
title: JabCon 2019 & JabRef 5.0 Alpha release
id: JabCon2019
author: "[JabRef Developers](https://github.com/JabRef/jabref/blob/master/DEVELOPERS)" 
bg: jabref-font
color: white
---
Last weekend the annual [JabCon](https://jabcon.jabref.org/) took place in Stuttgart, Germany, where the majority of the JabRef developers met in person and worked together to improve JabRef and discuss the roadmap for future releases.
This year's JabCon was special as our GSOC student David also was able to attended the JabCon. If you regulary read our blog, you will have already seen some insights into the LaTeX-Citation-Search feature he developed.
As some of you might have already seen, we implemented some new features, fixed and closed a lot of issues. 
We could successfully reduce the number of [open issues](https://github.com/JabRef/jabref/issues?q=is%3Aopen+is%3Aissue) from xx to xx
Managing, categorizing and sorting issues is a very time consuming task that takes away valuable programming time, so consolidating the list of existing issues is very important once in a while. 
Now, we are ready to focus on important issues and to move on with JabRef more quickly.
In addtion we also took the opportunity to release an alpha version of the next JabRef Version 5.0. Since the release of JabRef 4.3.1 our primary focus was on fixing bugs and making JabRef more stable.

Some highlights of the things we fixed and implemented in the new release:
- We finished the migration from the old swing GUI to JavaFX and could successfully remove old swing dependencies. This allows for a smoother JabRef user interface experience.
- We restructured the menu items to be more consistent.
- We finished the migration to Java 11 as Java 8 is no longer supported. All further versions now require a Java 11 installation. For Windows, the Java 11 version is now included in the installer.
- We added a 'LaTeX citations' tab to the entry editor, to search for citations to the active entry in the LaTeX file directory. It can be disabled in the preferences dialog.
- We improved the process of renaming and moving files in the entry editor. A new feature is the possibility to copy a single file or mutliple files of selected entries to a new folder
- We added the ability to use negation in export filter layouts´.
- We use https for fetching from most online bibliographic database.


For more information about new features and fixed issues we refer to the [changelog](https://github.com/JabRef/jabref/blob/master/CHANGELOG.md#50-alpha--2019-08-25)