---
title: "Google Summer of Code 2019: User Interface"
id: gsoc-2019-user-interface
author: "[JabRef Developers](https://github.com/JabRef/jabref/blob/master/DEVELOPERS)"
bg: jabref-font
color: white
---

Hi!
We keep working on the [LaTeX Integration project for the Google Summer of Code](https://summerofcode.withgoogle.com/projects/#6055042405105664).

Any feedback is more than welcome!
[Forum](http://discourse.jabref.org/t/project-latex-integration-please-give-us-your-feedback/1660) |
[GitHub](https://github.com/JabRef/jabref/pull/5011) |
[Gitter](https://gitter.im/JabRef/jabref)

## Jun 03, 2019 – Jun 10, 2019 (Second week of coding)

This week we have been working on two different issues:
1. On the one hand, improving the code from last week, thanks to the feedback we got on [GitHub](https://github.com/JabRef/jabref/pull/5011).
2. On the other hand, discussing and improving prototypes, before starting to code the user interface for the TEX parser tool.

The goal has been to connect the back-end of the parser with the user interface:
- A first dialog box will ask for a directory for scanning TEX files.
Then, the user could select specific files.
After that, the tool parses these files and it shows all bibliographic entries found.
- For displaying these entries, a new dialog box will be opened.
Instead of the draft view that we published last week, we have finally chosen a view that allows a comfortable reading of the citations found along all documents.

![User Interface](https://user-images.githubusercontent.com/12954316/59305727-1b754300-8c9b-11e9-941e-950a4dbf6ae2.gif)

For a better understanding, each part of the project will be available in [different public pull requests](https://github.com/davidemdot/jabref/pull/1) so as to make the discussion about implementation details easier.
