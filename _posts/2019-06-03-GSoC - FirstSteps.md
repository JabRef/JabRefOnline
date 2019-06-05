---
title: "Google Summer of Code 2019: First Steps"
id: gsoc-2019-first-steps
author: "[JabRef Developers](https://github.com/JabRef/jabref/blob/master/DEVELOPERS)"
bg: jabref-font
color: white
---

Hello!
My name is David Méndez, and this summer I will be working on the [LaTeX Integration project for the Google Summer of Code](https://summerofcode.withgoogle.com/projects/#6055042405105664).
The goal of this project is to facilitate working with LaTeX for the end user.
I will develop several tools that analyze and check LaTeX text documents:

- A search for bibliographic entries (which are used, how many times and where).

![Search](https://aws1.discourse-cdn.com/standard14/uploads/jabref/original/1X/63b823e846ed9e1a402304fac1c2de275593bbd0.png)

- A counting tool for words, characters and quotes per document.

![Counter](https://aws1.discourse-cdn.com/standard14/uploads/jabref/original/1X/0b2db19b7c986bf40fe15fc35bd284a74a4d52c7.png)

- A validator of TEX files to solve issues.

![Validator](https://aws1.discourse-cdn.com/standard14/uploads/jabref/original/1X/1137bdc577ae0a6dc4a56ca104eca23a35e9f551.png)

- A tool to import entries from TEX file.

In addition to this, if there is some time left, I would like to add a tool that supports connection to JabRef from external editors.

Any feedback is more than welcome!
[Forum](http://discourse.jabref.org/t/project-latex-integration-please-give-us-your-feedback/1660) |
[GitHub](https://github.com/JabRef/jabref/pull/5011) |
[Gitter](https://gitter.im/JabRef/jabref)

## May 06, 2019 – May 26, 2019 (Community bonding period)

At first, we have spent some time improving the definition of the project.
During this time I was familiarizing myself with the community and setting up the code environment, while completing the following tasks:

- First meetings with the mentors, which included: initial introduction, code walk-through, discussion and prioritization of the use cases and thinking about the implementation.
- Working on [small GitHub issues](https://github.com/JabRef/jabref/issues?q=is:issue+is:open+label:%22good+first+issue%22) and getting in touch with the community.
- Creation of a [forum thread](http://discourse.jabref.org/t/project-latex-integration-please-give-us-your-feedback/1660) in which to ask users about the project while proposing some use cases and prototypes in order to get feedback and discuss further.
- After that, defining the design details properly with the help of mentors.

## May 27, 2019 – Jun 02, 2019 (First week of coding)

After thinking about some design and implementation details, I have been coding the back-end of the TEX parser tool.
The tool reads each file line by line, parses and analyzes them and detects different citation formats.
On top of that, I have been preparing some tests for these classes.

Code will be as self-explanatory as possible, following the contributing guidelines.
Moreover, everything related to this project will be uploaded as a [public pull request](https://github.com/JabRef/jabref/pull/5011) so as to share code, ask and receive questions, discuss details, track the progress, etc.
