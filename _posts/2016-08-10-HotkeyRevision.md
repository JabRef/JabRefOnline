---
title: Revised Hotkey System
id: HotkeyRevisionAugust2016
author: "[JabRef Developers](https://github.com/orgs/JabRef/teams/developers)"
---

In the next release of JabRef we will introduce a revisid hotkey system. The 2 goals of this revision is to improve maneuverability through the keyboard and streamlining hotkeys. Some related hotkeys like for the side panes were scattered across the keyboard, so we grouped them together. You might be wondering what has changed, so have a look at them:

- Change default key bindings (have a look at the table below)
- Add a hotkey for creating a new technical report
- Add a hotkey for opening the OpenOffice/LibreOffice pane
- Add “Print preview” to the right-click menu
- Improve group pane maneuverability by making groups selectable by arrow keys 
- Improve main table maneuverability by making “TAB” jump to the next entry instead of the next cell, “SHIFT+TAB” selects the previous entry
- Resize the “change key bindings” dialog to 500x500


Keys - new | Keys - old | Function
-----------|------------|---------
F7	| alt + f | Automatically set file links
F8	| ctrl + shift + F7  | Cleanup entries
alt + 1	| ctrl + shift + E | Focus entry table
alt + 2	| ctrl + F9 | Toggle entry/preview editor 
alt + 3	| ctrl + shift + G | Toggle groups
alt + 4	| F5  | web search
alt + 0	|- | Open Openoffice/LibreOffice connection 
ctrl + shift + F7 | ctrl + f4 |	Synchronize file links 
ctrl + shift R | - | Technical report
- |alt + P | Print entry preview
- |ctrl + alt + T  | Hide/show toolbar
-|ctrl+P| Edit preamble

- As you can see we moved related functions together. “F7” is now affiliated with file links, hence we changed key bindings if they contained “F7” but weren’t related to file links.
- Also we moved all side panes together by changing them to “ALT+(1,2,3,4,0)”. By doing so we hope to improve the accessibility, because now you don’t have to remember all kinds of key combinations for side panes, only which number stands for your desired pane. On a side note: Open OpenOffice/LibreOffice connection was added to this family due to being a side pane.
- The hotkey for “Edit preamble” was changed due to normally being the hotkey to print.
- The new hotkey for “New technical report” was requested by some users that use it frequently, so we added a key binding.
- We removed the hotkey for “Hide/show toolbar” due to being not of any imaginable use for users.
- We removed the hotkey for “Print entry preview” due to some conflicts with others and the fact that this function wasn’t really used that often by users. But we didn’t remove it completely, we added it to the right click menu.
- We removed the hotkey for "Edit preamble" due to being a seldomly used action that doens't require a hotkey.
- We resized the “change key bindings” dialog due to being too small for some descriptions.

If you would like to to try the new system, you can try it out at http://builds.jabref.org/master/.

For questions about the functioning or suggestions for improvements please use the discussion forum. In case you have trouble, report bugs on GitHub.
_**You like it? Foster JabRef development with [Code](https://github.com/JabRef/jabref/blob/master/CONTRIBUTING.md) or [Money](https://github.com/JabRef/jabref/wiki/Donations).**_
