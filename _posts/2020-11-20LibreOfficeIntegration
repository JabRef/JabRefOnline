---
title: Jabref interaction with LibreOffice is great
id: LibreOfficeIntegration
author: "[Felix Wilke](https://github.com/teertinker)"
---

# Jabref interaction with LibreOffice is great
JabRef offers many features for inserting citations and formatting a bibliography in OpenOffice or LibreOffice Writer. This post shows you the basic functionality and what you can do with external tools.

## First you have to connect JabRef to LibreOffice
- Open LibreOffice and JabRef
- Open the LibreOffice panel in JabRef
- Hit the connect Button

![](../img/ConnectToLibreOffice.gif)

In case you get an error message you may have to connect manually (see: https://docs.jabref.org/cite/openofficeintegration). Especially Linux users should use the deb version of JabRef and LibreOffice in order to prevent connection issues.

## Second: Now you can cite entries from JabRef
- Place the cursor at the right position in your manuscript
- Mark the entry or entries you want to cite
- Click on "Cite" "Cite-in-text" etc.

![](../img/libreoffice_blog1.gif)

You can easily change the citation style and bibliography style. Just click on "Select style". After you have finished your manuscript, just hit the refresh button and your bibiography gets parsed.

## Third: You also want to use MS-Office or any other text processor? No problem with this extension

JabRef uses special fields in LibreOffice that are not supported by other textdocuments. You should save your writer document in OpenDocument format (odt). However, there exists an external tool that is able to convert the citations so that they are kept.
- just install the LibreOffice extension: https://github.com/teertinker/JabRef_LibreOffice_Converter
- Hit convert to Cite-Key
- Save the document in any format you like
- now you can open and modify the manuscript with any word processor
  - Note: Some word processors do not save the additional information of "Cite special" (e.g. pages) 
- Convert the citations back to JabRef fields
- Refresh your bibliography

![](../img/libreoffice_blog2.gif)

### Additional option: Use \cite{key} in any word processor to generate references
- the LibreOffice extension can also be used to convert manuscripts with \cite{keys} to JabRef References for LibreOffice
- This offers the option to work on a manuscript with any word processor and generate a bibliography with LibreOffice

![](../img/libreoffice_blog3.gif)


## Fourth: Create you own citation style with the Export-Filter-Editor
Each journal has its own style. Editing a style file can be quite a pain. But you can use the external gui application [Export-Filter-Editor](https://github.com/teertinker/Export-Filter-Editor) to create your own jstyle file (and also export filter).
- open Export-Filter-Editor
- create your bibliography
- create you citation style
- save the jstyle file
- open the jstyle in JabRef

![](../img/ExportFilterEditor.gif)
