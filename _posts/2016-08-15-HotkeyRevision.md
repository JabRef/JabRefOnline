---
title: Revised Hotkey System
id: HotkeyRevisionAugust2016
author: "[JabRef StuPro](https://github.com/orgs/JabRef/teams/stupro)"
---

In the next release of JabRef a revised hotkey system is introduced. The two goals of this revision is to improve maneuverability through the keyboard and streamlining hotkeys. Sometimes, related hotkeys (like the ones covering the side panes) were scattered across the keyboard, so we grouped them together. You might be wondering what has changed, so have a look at them:


Keys - new | Keys - old | Function
-----------|------------|---------
<kbd>F7</kbd>	| <kbd>alt</kbd> + <kbd>F</kbd> | Automatically set file links
<kbd>F8</kbd>	| <kbd>ctrl</kbd> +  <kbd>shift</kbd>  + <kbd>F7</kbd>  | Cleanup entries
<kbd>alt</kbd> + <kbd>1</kbd>	| <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>E</kbd> | Focus entry table
<kbd>alt</kbd> + <kbd>2</kbd>	| <kbd>ctrl</kbd> + <kbd>F9</kbd> | Toggle entry/preview editor
<kbd>alt</kbd> + <kbd>3</kbd>	| <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>G</kbd> | Toggle groups
<kbd>alt</kbd> + <kbd>4</kbd>	| <kbd>F5</kbd>  | web search
<kbd>alt</kbd> + <kbd>0</kbd>	| - | Open Openoffice/LibreOffice connection
<kbd>ctrl</kbd> +  <kbd>shift</kbd> + <kbd>F7</kbd> | <kbd>ctrl</kbd> + <kbd>F4</kbd> |	Synchronize file links
<kbd>ctrl</kbd> +  <kbd>shift</kbd> + <kbd>R</kbd> | - | Technical report
- | <kbd>alt</kbd> + <kbd>P</kbd> | Print entry preview
- | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>T</kbd> | Hide/show toolbar
- | <kbd>ctrl</kbd> + <kbd>p</kbd> | Edit preamble

- Improve group pane maneuverability by making groups selectable by arrow keys
- Improve main table maneuverability by making <kbd>tab</kbd> jump to the next entry instead of the next cell, <kbd>shift</kbd> + <kbd>tab</kbd> selects the previous entry.
- We moved related functions together. <kbd>F7</kbd> is now affiliated with file links, hence we changed key bindings if they contained "<kbd>F7</kbd>" but weren't related to file links.
- We moved all side panes together by changing them to <kbd>ALT</kbd>+<kbd>0</kbd> to <kbd>ALT</kbd>+<kbd>4</kbd>. By doing so we hope to improve the accessibility, because now one doesn't have to remember all kinds of key combinations for side panes, only which number stands for your desired pane. One side note: Open OpenOffice/LibreOffice connection was added to this family due to being a side pane.
- The new hotkey for "New technical report" was requested by some users that use it frequently, so we added a key binding.
- We removed the hotkey for "Hide/show toolbar" and "Edit preamble" due to the assumption that is used by a too small groups of users.
- We removed the hotkey for "Print entry preview" due to some conflicts with others and the fact that this function wasn't really used that often by users. The function itself is not gone: It existed in the right click menu of the preview panel and now is also available at the right click menu.
- We resized the "change key bindings" dialog due to being too small for some descriptions.

If you would like to try the new system, you can try it out at [https://builds.jabref.org/master/](https://builds.jabref.org/master/).

For questions about the functioning or suggestions for improvements, please use the [discussion forum](http://discourse.jabref.org/). In case you have trouble, report bugs on [GitHub]( https://github.com/JabRef/jabref/issues).
