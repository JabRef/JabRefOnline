---
title: "Google Summer of Code 2019: 'LaTeX Citations' tab"
id: gsoc-2019-latex-citations-tab
author: '[JabRef Maintainers](https://github.com/JabRef/jabref/blob/main/MAINTAINERS)'
bg: jabref-font
color: white
---

Hello!
Since our last post, we have worked hard to carry out this second major update.
The tool that allows you to search for citations in LaTeX files is ready, fully functional and integrated into the development version, in its latest version.

The code has been reviewed and modified to improve its performance and prevent possible errors.
Regarding the user interface, we have added a tab to the entry editor, improved the aesthetics and renamed the tool to **Search for Citations in LaTeX files**.

Now we need your feedback!
We will take it into account to keep improving this feature.
[Forum](http://discourse.jabref.org/t/project-latex-integration-please-give-us-your-feedback/1660) |
[GitHub](https://github.com/JabRef/jabref/issues/5002) |
[Gitter](https://gitter.im/JabRef/jabref)

## _LaTeX Citations_ tab

We added a new tab to the entry editor to search for citations to the active entry in the LaTeX file directory (it can be configured in the _Library properties_ dialog).
The new tab can be disabled in the preferences.

This is how it works:

!['LaTeX Citations' tab](https://user-images.githubusercontent.com/12954316/62509787-d68a0a80-b80c-11e9-84f5-f894f965dc9e.gif)

### An improved back-end

- Optimized parsing performance.
- Non-existent nested files are skipped.
- Better exception handling.

### The new tab

- A _LaTeX Citations_ tab has been added to the entry editor.
- This tab can be disabled in the _Entry editor_ preferences.
- A progress indicator appears while parsing.
- Current search is cancelled if other entry is selected.
- Parsed files are stored when the tool is run for the first time (better performance).
- The current search path is shown at the bottom, next to a button to set the LaTeX file directory.
- A user-friendly error logging and handling has also been implemented.

### A custom user interface controller for listing citations

- Citations list view is the same for dialog tool and tab.
- Context of citations, instead of the whole line of text (which is shown as a tooltip).
- Absolute file path has been changed into a relative one, from the search path.
- New icons and styles for context, file path and position (line and column) of a citation.
