---
title: Linux
id: linux
bg: turquoise
color: lightgray
style: left
---

# JabRef and Linux

## Q: JabRef does not start under Linux! What can I do?

A: JabRef works fine under Linux if you use a Java Runtime Environment (JRE) from Oracle version 1.6 and newer.
If running JabRef fails to start nevertheless do the following for troubleshooting:

Run

    java -version

from the command line.
If this does not report to be a product from Oracle (for instance tells you that it is a GCJ VM) even if you have installed the Oracle JVM then you need to change your setup.
This is highly dependent on your distribution, so we cannot give exact advise for everybody.

Under Debian/Ubuntu it works like this (you need to have admin privileges):

    sudo update-alternatives --config java

In the dialog that appears select the Oracle JDK or JRE.
Alternatively you can also search for the java executable and run that directly.
In Ubuntu 12.04 LTS you can find Java at

    /usr/lib/jvm/java-6-openjdk/jre/bin/java

If you do not have root-access on the machine you can install the Sun JRE in your home but need to make sure that you run the correct java executable.
For instance if you installed the JRE into a folder called

    java

in your home try

    ~/java/jre/bin/java -jar JabRef-X.jar

, where 'X' is the JabRef version.


## Q: I am on Debian/Ubuntu and clicking on the JabRef icon works, but I cannot start JabRef from the command line.
What is wrong?

A: You have several Java Virtual Machines installed and under the command line the wrong one is chosen.
Have a look at the previous question that tells you how to change the virtual machine used.

For Ubuntu you may also have a look at the [Ubuntu page on Java](https://help.ubuntu.com/community/Java).


## Q: Does JabRef run under free Java (Classpath, Kaffee, GCJ, etc.)?

A: As far as we know, it has not yet succeeded running JabRef on these free JVMs, due of our dependencies.
At the time of writing this (2006-09-13), version 0.92 of Classpath was used.
However, JabRef is reported to run nicely on the [IcedTea](http://fedoraproject.org/wiki/Features/IcedTea) runtime, which is based on the [OpenJDK](http://openjdk.java.net/) built with [GNU Classpath](http://www.gnu.org/software/classpath/) to fill in missing classes.
Please let us know if newer versions give different results.
If you have an idea or the expertise to make JabRef work under Classpath let us know.

