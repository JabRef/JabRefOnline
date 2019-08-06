---
title: "Google Summer of Code 2019: 'LaTeX Citations' tab"
id: gsoc-2019-latex-citations-tab
author: "[JabRef Developers](https://github.com/JabRef/jabref/blob/master/DEVELOPERS)"
bg: jabref-font
color: white
---

Hello!
Since the last publication, we have been working hard to accomplish this second major update.
The tool that allows you to search for citations in LaTeX files is ready, fully functional and integrated with the project, in its latest version.

All code has been reviewed and modified to improve its performance and prevent possible errors.
Regarding the user interface, we have added a tab in the entry editor, improved the aesthetics and renamed the tool: **Search for Citations in LaTeX files**.

Now we need your feedback!
We will take it into account to keep improving the feature.
[Forum](http://discourse.jabref.org/t/project-latex-integration-please-give-us-your-feedback/1660) |
[GitHub](https://github.com/JabRef/jabref/pull/5155) |
[Gitter](https://gitter.im/JabRef/jabref)

## _LaTeX Citations_ tab

We added a new tab to the entry editor to search for citations to the active entry in the LaTeX file directory (it can be configured in the _Library properties_ dialog).
The new tab can be disabled in the preferences.

That is how it works:

!['LaTeX Citations' tab](https://user-images.githubusercontent.com/12954316/62509787-d68a0a80-b80c-11e9-84f5-f894f965dc9e.gif)

### An improved back-end
- Optimized parsing performance
- Non-existing nested files are skipped
- Better exception handling

### The new tab
- New tab in the entry editor: _LaTeX Citations_
- This tab could be disabled in the entry editor preferences
- A progress indicator appears while parsing
- Search cancellation if the active entry is changed (background tasks)
- Parsed files are stored when the tool is run for the first time (much better performance)
- The current search path is shown at the bottom, next to a button to change the LaTeX file directory
- Error logging and handling (some of them are shown in the entry editor)

### A custom user interface controller for listing citations
- Citations list view is the same for dialog tool and tab
- Context of citations, instead of the full line (which is shown as a tooltip)
- Changed absolute file path to a relative one, from the search path
- New icons and styles for context, file path and position (line and column) of a citation
