---
title: A faster JabRef is coming!
id: faster-jabref
bg: jabref-font
color: white
author: "[mlep](https://github.com/mlep)"
---

Some users reported JabRef was slow on large databases (thank you for the feedback!).
This was especially the case for three operations:
- loading a database
- saving a database
- searching through a database.

During a search, the user interface could become very unresponsive, which is indeed quite annoying...
Well, this time will be over soon: [Simon Harrer](https://github.com/simonharrer) has recently contributed [code making search much faster](https://github.com/JabRef/jabref/pull/1100).

[By integrating the Java Microbenchmarking framework](https://github.com/JabRef/jabref/pull/1103),
[Tobias Diez](https://github.com/tobiasdiez) was able to benchmark JabRef and reveal interesting insights about the performance of JabRef:
Preliminary tests have been carried out on a database with 100000 entries (is it big enough for you?).
They show that **JabRef is now 10 times faster at searching**: it takes only one second to search through 60000 entries!

You can [give it a try](http://builds.jabref.org/master/)
(*This is a development version: Be carefully, and back up your data first!)*.
[Your comments are welcomed](https://github.com/JabRef/jabref/pull/1100)!

*Stay tuned: [work is under way to speed up the opening of large databases](https://github.com/JabRef/jabref/issues/1094).*
