---
title: JabCon 2019 & JabRef 5.0 Alpha release
id: JabCon2019
author: "[JabRef Developers](https://github.com/JabRef/jabref/blob/master/DEVELOPERS)" 
bg: jabref-font
color: white
---
Last weekend the annual [JabCon](https://jabcon.jabref.org/) took place in Stuttgart, Germany, where the majority of the JabRef developers met in person and worked together to improve JabRef and discuss the roadmap for future releases.
This year's JabCon was special as our Google Sumemr of Code student David also was able to attend the JabCon. If you regulary read our blog, you will have already seen some insights into the LaTeX-Citation-Search feature he developed.
We were finally able to release an alpha version of the upcoming JabRef 5.0 release after more than one year of hard work! ❤️ 🎆
The major change is the new user interface, and our primary focus was on reducing the number of bugs to make JabRef 5.0 more stable.

During JabCon could successfully reduce the number of [open issues](https://github.com/JabRef/jabref/issues?q=is%3Aopen+is%3Aissue).
Managing, categorizing and sorting issues is a very time consuming task that takes away valuable programming time, so consolidating the list of existing issues is very important once in a while. 
Now, we are ready to focus on important issues and to move on with JabRef more quickly.

We also would like to thank to all of our various contributors, translators and donors! This helps us a lot!

Some highlights of the things we fixed and implemented in the new release:
- We completed the rewrite of the old user interface to the new GUI technology JavaFX. This allows for a smoother JabRef user interface experience and enables support for high-dpi monitors. 
- We restructured the menu items to be more consistent.
- We finished the migration to Java 11. All further versions now require a Java 11 installation. For Windows, the Java 11 version is now included in the installer.
- We added a 'LaTeX citations' tab to the entry editor, to search for citations to the active entry in the LaTeX file directory. It can be disabled in the preferences dialog.
- We improved the process of renaming and moving files in the entry editor. A new feature is the possibility to copy a single file or mutliple files of selected entries to a new folder
- We added the ability to use negation in export filter layouts.
- We use https for fetching from most online bibliographic database.

For more information about new features and fixed issues we refer to the [changelog](https://github.com/JabRef/jabref/blob/master/CHANGELOG.md#50-alpha--2019-08-25)
