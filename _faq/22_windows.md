---
title: Windows
id: windows
bg: blue
color: lightgray
style: left
---

# JabRef and Windows

## Q: JabRef does not start on Windows 8, 64bit

A: This has been resolved in JabRef 2.9.1.
For older versions, setting `JAVA_HOME` environment to java installation directory (e.g.
`C:\Program Files (x86)\Java\jre7`) resolves this issue.
An environment variable can be added/modified from Control Panel -&gt; System and Security -&gt; System -&gt; Advanced System Setting -&gt; Advanced Setting tab -&gt; Environment Variables button.

## Q: My virus-scanner tells me that JabRef is a virus.
Is your server compromised?

A: No.
But the windows installer uses [the Nullsoft Scriptable Install System (NSIS)](http://nsis.sourceforge.net/Main_Page) version 2.18 (as of JabRef 2.1) which unfortunately creates installers that are thought to be viruses by some virus-scanners.

See the [discussion in the NSIS forum](http://forums.winamp.com/showthread.php?postid=1977648) or [the list of false positives with NSIS](http://nsis.sourceforge.net/NSIS_False_Positives) for details.

As a work-around and if you are afraid to use the installer you can always use the platform independent jar and run it from the command line:

    java -jar JabRef-X.jar

where 'X' is the JabRef version.

Since JabRef is open source, you can of course also download the source code and compile it yourself.

If you want to do anything about this issue, please report this bug with your virus scanner.

## Q: How can I use JabRef as backend for Microsoft Word?

A: You can directly use the references in Word's internal reference manager.
Short explanation: Export your bibliography in XML format and replace the Sources.xml in `%APPDATA%\Roaming\Microsoft\Bibliography`.
Long explanation: see [Using JabRef references in Word document](http://www.ademcan.net/?d=2012/01/30/15/23/05-using-jabref-references-in-word-documents).

Another option is to use [BibteX4Word](http://www.ee.ic.ac.uk/hp/staff/dmb/perl/index.html).

The last option is to use [Docear4Word](https://github.com/Docear/Docear4Word), which is planned to be ported to JabRef.

## Q: How can I start or focus JabRef with hotkey Windows+J?

A: Use [AutoHotkey](http://www.autohotkey.com/) and [JabRef.ahk](https://github.com/koppor/autohotkey-scripts/blob/master/JabRef.ahk) provided at [koppor's autohotkey scripts](https://github.com/koppor/autohotkey-scripts).
