---
title: GSOC22 — Implement a Three Way Merge UI for merging BibTeX entries
id: GSOC22-Three-Way-Merge
author: "[JabRef Maintainers](https://github.com/JabRef/jabref/blob/main/MAINTAINERS)"
bg: jabref-font
color: white 
---

Hi there! This is Houssem. I'm the Google Summer of Code *(GSoC)* student for this year. In this article, I'll talk about new features and functionalities that I worked on as part of my GSoC project.
<!--more-->

## Introduction

Merging duplicates and resolving conflicts is a major use case for JabRef users, according to a 2019 research conducted by JabRef developers [^1]. 

JabRef has several dialogs that reuse the merge UI, such as the Entries Merger Dialog, the Duplicate Resolver Dialog, the Entry Importer Dialog, and the External Changes Resolver Dialog.

## Notable Changes

In this section, I'll be talking about notable changes that introduce new UI elements or can affect the current workflow of users. However, I won't be discussing code changes even though they're just as important. You can still check out code changes in the linked PRs below.

### Editable Merged Entry

One of the core features of a three way merge, is being able to edit the merged entry from the dialog. This is obviously possible in the new merge UI. In addition, we created a binding between the merged entry fields and the selected field value, so that editing the merged entry fields will select either the left or right entry field value.

### An Improved Diff Highlighting

When you're looking at a huge list of items, it can be helpful to see which ones are different from the others. This is especially useful when merging duplicates, as most of the time, duplicates only contain one difference. By having differences highlighted, you can quickly and easily spot the different field, and resolve it.

![](../img/three-way-merge-diff-highlighting.png)

In the new three way merge UI, we've decided to highlight differences by coloring the background behind the different text. This is a more common way of highlighting differences, and we think it will be easier for users to notice. We've also introduced *Split view* and *Unified view* to allow users to view differences split between the two entries or in one entry. Finally, we've fixed several bugs and pitfalls in the previous diff highlighting algorithm, such as, [Spaces trimmed in Merge Entry Dialog](https://github.com/koppor/jabref/issues/371).

### Select Both Field Values (AKA Merge Fields)

When merging entries, sometimes you want to select both values for a certain field. A common use case for this would be wanting the merged entry to have both the left and right entry groups. Now, you can simply click the merge button next to the groups label and we'll take care of the rest. We'll merge the left and right entry groups, keeping only one copy of any common group. And this works for more than just groups - you can also merge keywords, comments and files. So go ahead and give it a try - it'll make your life a lot easier.

![](../img/three-way-merge-groups-keywords.png)

### Open DOIs and URLs from The Merge Dialog

We included a button on the side of field cells to open links; as of right now, only URLs and DOIs can be opened. Since the left and right field cells cannot be selected, a copy button was included for convenience. We plan to improve this design and include more actions in the future.

![](../img/three-way-merge-open-doi-copy.png)

## Future Work
We've made some progress, but there's still more work to be done. We're going to make separate improvements to each of the dialogs that use the merge UI. This has already begun with the external changes resolver dialog. We'll also update the documentation and write tests before release.

![](../img/external-changes-resolver-dialog.png)

## Summary

We hope you've enjoyed learning about some of the new changes in JabRef. The three-way merge changes are now part of the development version. You can try it out right now! https://builds.jabref.org/main/

Remember to make backup up of your library before trying out the new version. Don't hesistate to report any issues you encounter to help improving the dialog!

## Submitted PRs

- [GSOC22 - A - Implement a fully functional three way merge UI](https://github.com/JabRef/jabref/pull/8945)
- [GSOC22 - B - Implement merging fields in the three way merge UI](https://github.com/JabRef/jabref/pull/9022)
- [GSOC22 - C - Improve the external changes resolver dialog](https://github.com/JabRef/jabref/pull/9021)

## References

[^1]: Simon, Martin K., et al. "Analyzing the Importance of JabRef Features from the User Perspective." ZEUS. 2019.
