---
title: "JabRef GSoC’21 Projects"
id: gsoc'21-projects
author: JabRef GSoC Mentee
bg: jabref-font
color: white
---

Hey everyone, Today's blog is about the projects selected for GSoC and a little sneak peek into the projects.

## Microsoft Word Integration

We are working on a Word add-in that allows users to select and insert citations directly from the Word document. The JabRef Word Add-in can be used without having your reference manager open or even installed. Once you sign in to JabRef Word Addin, your JabRef library is downloaded from the cloud, and you can continue working on your document. JabRef word addin opens as a separate panel in Word alongside your document window. So your whole document remains in your view as you search, select and insert references.

![](../img/jabrefWordAddin.gif)

For more information about the project, visit the links below.

- GitHub: [JabRef Word Addin](https://github.com/JabRef/JabRef-Word-Addin)
- Mentors: [@Siedlerchr](https://github.com/Siedlerchr), [@Tobiasdiez](https://github.com/tobiasdiez), [@JonatanAsketorp](https://github.com/k3KAW8Pnf7mkmdSMPHz27)
- Mentee: [@Mohit](https://github.com/mohit038)

## Improved PDF Integration

The second project is all about PDFs and is split into two main goals:
[Fulltext search in linked PDFs](#fulltext-search) and
[metadata extraction from new pdfs](#metadata-extraction).

The people involved are:
- Mentors: [@Koppor](https://github.com/koppor), [@Calixtus](https://github.com/calixtus), [@DominikVoigt](https://github.com/DominikVoigt)
- Mentee: [@Btut](https://github.com/btut)

### Fulltext search

Over the duration of a scientists career, bibliographies tend to grow large in
size.
Currently, JabRef users can filter their bibliography by performing a search in the
bib-entries.
This search only looks for matches in the fields of the bibentry, but not in the
linked documents.
We want to change that by indexing all linked documents using
[Apache Lucene](https://lucene.apache.org/).
Additionally to the filtering in the table of entries, users are presented with
a tab in the entry-editor containing a google-esque visualization of
the matched text portions in the PDFs.
Progress can be tracked [here](https://github.com/JabRef/jabref/pull/2838).

### Metadata extraction

An important aspect of a library is the ability to share items with others.
The de-facto way of sharing work in the scientific community is to share PDF
files.
Unfortunately, most of the times, it is hard to automatically deduce metadata
needed to build a JabRef entry from a PDF alone.
We want to integrate with [GROBID](https://grobid.readthedocs.io), a machine
learning library for extracting metadata from raw PDF documents.
GROBID is learned to deduce the metadata from the content itself, as a human
would.
Checkout [the corresponding issue](https://github.com/JabRef/jabref/issues/6158)
for more information.
