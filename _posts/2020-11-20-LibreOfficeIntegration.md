---
title: JabRef Interaction with LibreOffice Explained
id: LibreOfficeIntegration
author: "[Felix Wilke](https://github.com/teertinker)"
---
Today's blog post will highlight the interaction between JabRef and LibreOffice, the [open-source alternative](https://www.libreoffice.org/) to Microsoft Office.
It is presented to you by a JabRef user, [Felix Wilke](https://github.com/teertinker), who is also a code contributor.

# JabRef Interaction with LibreOffice
JabRef offers many features for inserting citations and formatting a bibliography in OpenOffice or LibreOffice Writer.
This post explains the basic functionality and also how to get the most of it with the help of third-party tools.

## First: Connect JabRef to LibreOffice

- Open LibreOffice and JabRef
- Open the LibreOffice panel in JabRef
- Hit the "Connect" button

![](../img/ConnectToLibreOffice.gif)

In case you get an error message you may have to connect manually (see: https://docs.jabref.org/cite/openofficeintegration).
Especially Linux users should use the official versions of JabRef and LibreOffice in order to prevent connection issues.

## Second: Cite Entries from JabRef
- Place the cursor at the right position in your manuscript
- Mark the entry or entries you want to cite
- Click on "Cite" or "Cite-in-text"

![](../img/libreoffice_blog1.gif)

You can easily change the citation style and bibliography style.
Just click on "Select style".
After you have finished your manuscript, just hit the refresh button and your bibliography gets parsed.

## Exchange/Save documents in Other Formats

JabRef uses special fields in LibreOffice that are not supported by other word processors.
You should save your writer document in OpenDocument format (odt).
However, there exists an external tool that is able to convert the citations so that they are kept when you save in another format.

- Install the LibreOffice extension: https://github.com/teertinker/JabRef_LibreOffice_Converter
- Hit "Convert to Cite-Key"
- Save the document in any format you like
- Open and modify the manuscript with any word processor
  - Note: Some word processors do not save the additional information of "Cite special" (e.g. pages) 
- Convert the citations back to JabRef fields
- Refresh your bibliography

![](../img/libreoffice_blog2.gif)

### Additional Option: Use `\cite{key}` in any Word Processor to Generate References
- The LibreOffice extension can also be used to convert manuscripts with `\cite{keys}` to JabRef References for LibreOffice
- This offers the option to work on a manuscript with any word processor and generate a bibliography with LibreOffice

![](../img/libreoffice_blog3.gif)


## Fourth: Create you own Citation Style with the Export-Filter-Editor
Many journals have their own style and editing a style file to conform with those can be quite a pain.
To simplify the creation of a new jstyles there is this handy GUI tool, [Export-Filter-Editor](https://github.com/teertinker/Export-Filter-Editor), which can be used to create custom export filters.

- Open Export-Filter-Editor
- Create your bibliography
- Create you citation style
- Save the jstyle file
- Open the jstyle in JabRef

![](../img/ExportFilterEditor.gif)
