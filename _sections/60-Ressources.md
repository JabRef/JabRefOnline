---
title: Resources
bg: lightgray
color: black
style: left
fa-icon: wrench
---

## JabRef-compatible text editors

JabRef can push entries, i.e. insert `\cite{key}` commands, to the following text editors:

- [Emacs](https://www.gnu.org/software/emacs/)
- [LaTeX Editor](http://www.latexeditor.org/)
- [LyX/Kile](http://www.lyx.org/)
- [TeXstudio](http://www.texstudio.org/)
- [Texmaker](http://www.xm1math.net/texmaker/)
- [Vim](http://www.vim.org/)
- [WinEdt](http://www.winedt.com/)

Additionally, JabRef can natively insert citations and format a bibliography in:

- [OpenOffice Writer](https://www.openoffice.org/)
- [LibreOffice Writer](https://www.libreoffice.org/)

See [OpenOffice/LibreOffice integration](https://help.jabref.org/en/OpenOfficeIntegration) for details.


## External tools


### Bibtex4word

_by Mike Brookes_

Bibtex4Word is an add-in for Microsoft Word that allows the citation of references and the insertion of a bibliography into your document using your choice of formatting style. It is lightweight, transparent and does not mess up your documents.

Homepage: <http://www.ee.ic.ac.uk/hp/staff/dmb/perl/index.html>


### BibSync

_by Daniel Mendler_

BibSync is a tool to synchronize your paper database with a BibTeX file which might be most useful for Physicists and Mathematicians since it supports synchronization with DOI and arXiv.

Homepage: <https://github.com/minad/bibsync>


### Endnote filter set

This improves author recognitzion and adds support for more fileds to EndNote.

Homepage: <https://github.com/JabRef/EndNode-JabRef-filters>


### Eratosthenes Reference Manager

_by Matthew Matlock_

Eratosthenes Reference Manager is a BibTeX-based bibliography manager for Android. It [integrates with JabRef](https://bitbucket.org/mkmatlock/eratosthenes/wiki/Home#!using-eratosthenes-with-jabref), supporting top-level groups and attached files/external links.

Available for Android 4.0 and up.

App store: <https://play.google.com/store/apps/details?id=com.mm.eratos>


### Export-Filter Editor

_by Felix Wilke_

Using this tool you can easily create a custom export filter for JabRef to build you own bibliography style.
Styles files are available at <https://layouts.jabref.org> and for LibeOffice at <https://jstyles.jabref.org>.
The tool itself supports:

*   HTML Export Filter
*   RTF Export Filter
*   OpenOffice/ LibreOffice Style File
*   Saving the filter for later refinements

[Download the Export-Filter Editor](https://sourceforge.net/projects/efe/?source=dlp)


### Feinerleiser

_by Niklas Alt_

Feinerleiser is a tool for improving the JabRef-LibreOffice integration when writing for the humanities. This tool can be run to finalize a document, providing citation features that are not supported by JabRef itself.

Homepage: <http://www.sourceforge.net/projects/feinerleiser/>


### gitignore.io

This site offers to generate `.gitignore` files using common patterns for applications.
For instance, you can use the keywords JabRef, Windows, Linux, macos, latex to generate a `.gitignore` for your daily tex work.

- Homepage: <https://www.gitignore.io/>
- .gitignore for JabRef and friends: <https://www.gitignore.io/api/jabref%2Clatex%2Cwindows%2Clinux%2Cmacos>


### JabFox

_by Tobias Diez_

JabFox is a Firefox add-on for users of the bibliographic reference manager JabRef. It automatically identifies and extracts bibliographic information on websites and sends them to JabRef in one click. A wide range of publisher sites, library catalogs and databases are supported.

- Homepage: https://addons.mozilla.org/en-US/firefox/addon/jabfox/
- Source: https://github.com/JabRef/JabFox/


### PocketBib

_by Graham Dennis_

PocketBib is a BibTeX library reader for academics on the go. With PocketBib you can search, browse and read the papers in your BibTeX library, and sync them with BibDesk or JabRef on your computer.

Available for iPad, iPhone and iPod Touch.

Homepage: <http://www.grahamdennis.me/pocketbib/>


### WinEdt's JabRef launcher

_by Karl Koeller_

This WinEdt's package allows to launch the JabRef program from within WinEdt.

[Download the WinEdt's JabRef launcher](http://www.winedt.org/config/menus/JabRef.html)


## Export filters

JabRef allows you to create custom export filters.
This functionality and the installation procedure are described in the help file on [Custom export filters](https://help.jabref.org/en/CustomExports).
Some users have created export filters that can be useful to many others.
They are collected at <https://layouts.jabref.org>.


## JabRef journal abbreviation lists

JabRef can help you refactor your reference list by automatically abbreviating or unabbreviating journal names, as explained in [the dedicated help](https://help.jabref.org/en/JournalAbbreviations).

Although JabRef comes with a build-in list of journals, additional lists are available at <https://abbrv.jabref.org>.


## Plugins and additional entry fetchers

Until version 2.11 JabRef offered a plugin framework.
Support for that has been removed.
See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status of integration of the plugins into JabRef.

The current way to add a new entry fetcher or additional functionality is to directly [contribute](https://github.com/JabRef/jabref/blob/master/CONTRIBUTING.md) the code to JabRef.
