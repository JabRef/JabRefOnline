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

### JabFox

_by Tobias Diez_

JabFox is a Firefox add-on for users of the bibliographic reference manager JabRef. It automatically identifies and extracts bibliographic information on websites and sends them to JabRef in one click. A wide range of publisher sites, library catalogs and databases are supported.

[Download the Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/jabfox/)

### WinEdt's JabRef launcher

_by Karl Koeller_

This WinEdt's package allows to launch the JabRef program from within WinEdt.

[Download the WinEdt's JabRef launcher](http://www.winedt.org/config/menus/JabRef.html)

### Export-Filter Editor

_by Felix Wilke_

Using this tool you can easily create a custom export filter for JabRef to build you own bibliography style.
It supports:

*   HTML Export Filter
*   RTF Export Filter
*   OpenOffice/ LibreOffice Style File
*   Saving the filter for later refinements

[Download the Export-Filter Editor](https://sourceforge.net/projects/efe/?source=dlp)

### PocketBib

_by Graham Dennis_

PocketBib is a BibTeX library reader for academics on the go. With PocketBib you can search, browse and read the papers in your BibTeX library, and sync them with BibDesk or JabRef on your computer.

Available for iPad, iPhone and iPod Touch.

[Download PocketBib](http://www.grahamdennis.me/pocketbib/)


### Eratosthenes Reference Manager

_by Matthew Matlock_

Eratosthenes Reference Manager is a BibTeX-based bibliography manager for Android. It [integrates with JabRef](https://bitbucket.org/mkmatlock/eratosthenes/wiki/Home#!using-eratosthenes-with-jabref), supporting top-level groups and attached files/external links.

Available for Android 4.0 and up.

[Download Eratosthenes Reference Manager](https://play.google.com/store/apps/details?id=com.mm.eratos)


### Bibtex4word

_by Mike Brookes_

Bibtex4Word is an add-in for Microsoft Word that allows the citation of references and the insertion of a bibliography into your document using your choice of formatting style. It is lightweight, transparent and does not mess up your documents.

[Download Bibtex4Word](http://www.ee.ic.ac.uk/hp/staff/dmb/perl/index.html)

### BibSync

_by Daniel Mendler_

BibSync is a tool to synchronize your paper database with a BibTeX file which might be most useful for Physicists and Mathematicians since it supports synchronization with DOI and arXiv.

[Download BibSync](https://github.com/minad/bibsync)

## Export filters

JabRef allows you to create custom export filters.
This functionality and the installation procedure are described in the help file on [Custom export filters](https://help.jabref.org/en/CustomExports).
Some users have created export filters that can be useful to many others.
They are collected at <https://layouts.jabref.org>.


## JabRef journal abbreviation lists

JabRef can help you refactor your reference list by automatically abbreviating or unabbreviating journal names, as explained in [the dedicated help file](http://help.jabref.org/en/JournalAbbreviations).

While JabRef comes with a build-in list of journals, additional lists are available:

* [General](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_general.txt)
* [American Mathematical Society](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_ams.txt) by Tzu-Hao Wei.
* [Année philologique](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_annee-philologique.txt) by Domenico Cufalo.
* [Astronomy](https://raw.githubusercontent.com/timstaley/jabref-astro-abbreviations/master/MNRAS_abbreviations.txt) by Tim Staley. _Note: Please contribute using [github](https://github.com/timstaley/jabref-astro-abbreviations)._
* [Economics](https://raw.github.com/jrnold/jabref-econ-journal-abbrevs/master/aea-abbrevs.txt) by Jeff Arnold (as as posted on the AEA website).
* [Entrez](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_entrez.txt) by Emmanuel Charpentier. _Note: provides Medline (dotless) abbr. only._
* [Geology and Physics](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_geology_physics.txt) by an [anonymous user](https://sourceforge.net/p/jabref/patches/164/).
* [IEEE](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_ieee.txt) by Thomas Arildsen and “eyliu”.
* [Index Medicus](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_medicus.txt) by Guy Tsafnat. _Note: provides Medline (dotless) abbr. only._
* [ISI Web of Science (with dots)](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_webofscience-dots.txt) by Alistair Auffret.
* [ISI Web of Science (dotless)](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_webofscience.txt) by Alistair Auffret.
* [Life Science](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_lifescience.txt) by Zé Roberto Ribeiro.
* [Mechanical and biomechanical](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_mechanical.txt) by an [anonymous user](https://sourceforge.net/p/jabref/patches/151/).
* [Meteorology](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_meteorology.txt) by Thijs Heus.
* [Sociology](https://raw.githubusercontent.com/JabRef/reference-abbreviations/master/journals/journal_abbreviations_sociology.txt) by Ronggui Huang.


## Plugins

Until version 2.11 JabRef offered a plugin framework. Support for that has been removed. See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status of integration of the plugins into JabRef.

## Entry fetchers

Until version 2.11 JabRef offered a plugin framework. Support for that has been removed. See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status of integration of the plugins into JabRef.
