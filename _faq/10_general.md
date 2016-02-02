---
title: General
id: general
bg: '#6C1027'
color: white
style: left
---

# General

## Q: My plugins stopped working. What should I do?

A: JabRef v3.0 removed plugin support as the development team cannot keep up plugin support any more.
Plugins, however, can be integrated in JabRef.
See [issue #152](https://github.com/JabRef/jabref/issues/152) for the current status and discussion.
Please contact the author of the respective plugin and ask him to port his plugin into JabRef's code.

## Q: I am using JabRef in my work. Should I cite JabRef in my publications?

A: You are not obliged to cite JabRef, but we would greatly appreciate it if you do.

{% raw %}
```
@Manual{JabRef_software,
  title = {JabRef},
  author = {{JabRef Development Team}},
  year = {2016},
  url = {http://www.jabref.org}
}
```
{% endraw %}

## Q: Are there any publications dealing with JabRef?

A: We are collecting all publications we hear about at <https://github.com/JabRef/jabref/wiki/JabRef-in-the-media>.

## Q: JabRef does not start. What should I do?

A: This may be because the preferences need to be reset.
Execute `java -jar JabRef-3.2.jar --prdef all -n`.
On Windows, if that does not help, execute `regedit` and delete the folder `HKEY\_CURRENT\_USER\SOFTWARE\JavaSoft\Prefs\net\sf\jabref`.

## Q: Does JabRef support Chinese characters?

A: Yes. Go to Options-&gt;Preferences-&gt;General-&gt;Default Encoding.
Set it to UTF8.
At "Appearance" set table font as simsun (or any other Chinese font).
At "General", you can change the UI language to Chinese. 
More information was available at <http://yenlung.math.nccu.edu.tw/~yenlung/notes/latex_in_Windows.pdf>, but the link is currently broken.

## Q: When I have an instance of Jabref running and double click another BibTeX file it is opened in a new JabRef instance. Is it possible to open it in a new tab in the first instance?

A: Yes. Go to **Options -&gt; Preferences -&gt; Advanced -&gt; “Remote operation”**.
Put a checkmark to “Listen for remote operation on port:”.
This option allows new instances of JabRef to detect the instance already running, and pass files to that instead of opening a new window.

## Q: BibTeX converts uppercase characters to lowercase in my title field. I know this can be prevented by wrapping uppercase letters in braces, e.g. `{T}he life cycle of {A}tlantic salmon`, but this is too much work. Can JabRef help?

A: JabRef has a setting that will automatically wrap all capital letters for certain fields in `{ }` - this will make sure they are preserved in the LaTeX output.
Under **Options -&gt; Preferences -&gt; File -&gt; "Store the following fields with braces around capital letters"**, make sure the title field is included.
To do this for several fields, write e.g. `title;abstract`.
This setting automatically adds braces when saving the bib file, but you won't see the braces within JabRef.

## Q: I have a DOI. Is it possible to create an entry directly out of the DOI?

A: Yes. Go to Search and click on “Web Search” to enable the Web search.
A Web search box appears on the left side of JabRef.
The name of a web search is selected (e.g. “ACM Portal”).
Click on it and change it to “DOI to BibTeX”.
Enter the DOI in the field and press “Fetch”.
A search starts and the result is displayed in a new pop up window.
One entry should appear.
Just push “OK” to insert the entry into the database.

## Q: I have an ISBN. Is it possible to create an entry directly out of the ISBN?

A: Yes. Go to Search and click on “Web Search” to enable the Web search.
A Web search box appears on the left side of JabRef.
The name of a web search is selected (e.g. “ACM Portal”).
Click on it and change it to “ISBN to BibTeX”.
If a ISBN is not found, head to the [online service](http://manas.tungare.name/software/isbn-to-bibtex/) by Manas Tungare.
[We are working on making the error message more clear](https://github.com/JabRef/jabref/pull/791).

## Q: I miss a field translator, lastfollowedon, ... How can I add such fields?

A: To add this “translator“ to all entry types, you can use **Options-&gt;Set up general fields** and add a “translator” field under one of JabRef's general field tabs.
To add this "translator" to a specific entry type, edit the specific entry type(s) (**Options-&gt;Customize entry types**) and add a “translator“ field under required fields or optional fields, as you like.


## Q: How do I prevent JabRef from introducing line breaks in certain fields (such as “title”) when saving the .bib file?

A: Open **Options -&gt; Preferences**.
In the “File” panel, you will find an option called “Do not wrap the following fields when saving”.
This option contains a semicolon-separated list of field names.
Any field you add to this list will always be stored without introduction of line breaks.

## Q: Is it possible to open files, e.g. from my web browser, in the running instance of JabRef instead of opening a new instance?

A: Yes. Go to **Options -&gt; Preferences -&gt; Advanced -&gt; “Remote operation”**.
Put a checkmark to “Listen for remote operation on port:”. 
This option allows new instances of JabRef to detect the instance already running, and pass files to that instead of opening a new window.

## Q: Is it possible to append entries from a BibTeX file, e.g. from my web browser, to the currently opened database?

A: Yes, you can use the parameter `--importToOpen bibfile`.

## Q: I want to link external files with paths relative to my .bib file, so I can easily move my database along with its files to another directory. Is this possible?

A: Yes. You need to override the default file directory for this specific database.
Go to **File -&gt; Database properties**. You can override the **Default file directory** setting.
There, you can either enter the path in **General file directory** (for it to be valid for all users of the file) or in **User-specific file directory** (for it to be valid for you only).
If you simply enter “.” (a dot, without the quotes), the file directory will be the same as the .bib file directory.
To place your files in a subdirectory called **subdir**, you can enter **“./subdir”** (without the quotes).
Files will automatically be linked with relative paths if the files are placed in the default file directory or in a directory below it.

## Q: I want to export my bibliography entries into a simple text file so that I can import them into a spreadsheet easily. Is this possible?

A: Yes. Use **File -&gt; Export**.
Under “Filter:”, choose “OpenOffice CSV (\*.csv)”.

## Q: How can I add and remove keywords of multiple entries?

A: Select the entries.
Right click.
Choose “Manage keywords”.
Then you can manage keywords appearing in all selected entries or in any selected entry.
New keywords are added to all selected entries.

## Q: I want to have bib file specific PDF directory.

A: Right click on the tab of the .bib file.
Choose “Database properties”.
Then at the field “General file directory” choose the directory specific for the database.
If you want to set a directory for you only and other users should use the default directory, use the field “User-specific file directory”.
The fields “PDF directory” and “PS directory” are legacy fields.
Just ignore them.

## Q: When linking a file, I cannot set the correct type. How can I add new types?

A: Go to **Options -&gt; Manage external file types**.
Here you can add arbitrary types.

## Q: Is there a portable version of JabRef?

A: Store the file jabref.jar on the drive.
It can be opened directly on any computer offering a Java installation by double clicking the `jar` file.
In **Options-&gt;Preferences-&gt;General**, be sure to activate "Load and Save preferences from/to jabref.xml on start-up (memory stick mode)".

## Q: When an organization is provided as author, my BibTeX style doesn't recognize it.
For instance, “European Commission” is converted to “Commission, E.”.

A: Use braces to tell BibTeX to keep your author field as is: `{European Commission}`.
In Biblatex, you can use `label = {EC}` to have `EC05` as label for a publication of the European Commission in the year 2005.

## Q: Is there a FAQ on BibTeX?

A: Yes, please look at “Bibliographies and citations” at the [UK List of TeX Frequently Asked Questions on the Web](http://www.tex.ac.uk/).
For German readers, there is the [dante e.V. FAQ](http://projekte.dante.de/DanteFAQ/LiteraturVerzeichnis).
