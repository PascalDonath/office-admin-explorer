# Changelog

All public versions of Office Admin Explorer. Dates are release dates on GitHub Pages.

## 2.2 – 2026-10-29

**New**
- **Own German pages** for all policies under `p/de/` (English under `p/en/`); old links redirect to the right language
- **Watchlist** as its own view (tab ★ Watchlist with counter): all policies and elements marked with ☆ Watchlist in one list – filter, open in the panel, add single or all policies to My collection, open the policy page. Replaces the short "Saved" list on the start panel
- **Clean up policies** (new tab in Packages & tools): `Invoke-OfficePolicyCleanup.ps1` scans the Office policy paths of the signed-in user (also when run from an admin account or as SYSTEM) and of the computer, then offers List, Export CSV (also loads in Check this PC), Backup (.reg) and Delete (shows first which values come back via GPO, Cloud Policy or Intune; Office policies only or also the values the Office ADMX writes outside Software\Policies; asks twice, always backs up first); files go to C:\ProgramData\OfficePolicies; `-Action` and `-User` for use without the menu
- Part of **AdminBench** (tools.pascal-donath.de), the collection of admin tools by Pascal Donath

**Improved**
- Static policy pages redesigned: settings menu (gear) with language and **Auto, Light, Dark, High contrast** – shared with the explorer; copy buttons; search across all policies and a filter per ADMX file
- Start page loads faster: the data (about 7 MB) is a separate file, the page itself is under 0.5 MB
- Every policy page links to the same page in the other language; German pages say when Microsoft ships the policy only in English
- **Check this PC** also reads the CSV from the cleanup script and can load JSON/CSV files directly
- PowerShell on the policy pages: check with clear "not configured" output, enable, disable and reset to Not configured, error handling, hint on admin rights for `HKCU\Software\Policies` (other user via `HKEY_USERS\<SID>`)
- Intune: custom OMA-URI with data type and `<enabled/>`/`<disabled/>` value; Cloud Policy section; note for classic vs. new Outlook; policies named in Microsoft's explanation are linked

## 2.1 – 2026-10-21

**New**
- **Custom package (questionnaire)** as fourth package: ten questions (macros, add-ins, trusted locations, template paths, file block for old formats, default file location and AutoRecover, privacy, update channel, Outlook cached mode, fewer prompts) on top of a base protection that breaks practically nothing. Shows what users lose, exports like the other packages and can be copied into My collection. Answers are stored only in your browser
- Paths with environment variables (e.g. `%USERPROFILE%`) are exported as `REG_EXPAND_SZ`

**Improved**
- **Add to collection** is now in the inspector header next to Save for every policy (adds all policies of an entry at once, click again to remove)
- Ribbon commands (Word, Excel, PowerPoint, Outlook) can be added to the collection too: their command ID goes into the policy **Disable commands** (one entry per app, IDs shown as chips, exported as `TCID1…n`)
- Static policy pages (`p/…`) have a button **+ Add to my collection** that opens the explorer and adds the policy

## 2.0 – 2026-10-19

**New**
- **Project, Access and Visio** as clickable mocks (eight apps in total): ribbon, window, File menu, Options and Trust Center – about 290 more option lines linked to their ADMX policy (proj16, access16, visio16)
- **Project Server connection**: how to add the Project Web App account by script/registry (there is no ADMX policy for it), zone policy, local cache, check-out, Project Online retirement (end of September 2026)
- New support cases for Project, Access and Visio
- **Theme switch**: Auto (system), Light, Dark and High contrast
- **OneNote** as clickable mock: ribbon (Home, Insert, Draw, History, Review, View, Help), notebook/section/page layout, File menu, OneNote Options and Trust Center – every option line linked to its ADMX policy (onent16 / office16)
- **Policy packages** view: three ready-made packages (security hardening, strict privacy, calm workplace) with reasons and "what users lose", export as `.reg`, PowerShell, GPO list (CSV) and Intune list (CSV)
- **My collection**: collect policies from the inspector, set state and values, export all at once (stored only in your browser)
- **Registry → policy**: paste a registry path (also Cloud Policy paths) and get the policy, GPO path and the place in the Office UI; also works in the main search
- **Check this PC**: read-only PowerShell script, paste the result and see which policies are set (optionally compared with a package) – analysed only in the browser
- **ADMX changes**: new/changed/removed policies per ADMX version and the list of deprecated policies
- **Where in Office**: the inspector shows where a policy appears in the Options/Trust Center and opens it ("Show in Office")
- Options of **Word, Excel, PowerPoint and Outlook** rebuilt after the current Microsoft 365 layout – every option line links to its own ADMX policy
- **Word matched against a real Word 2609** (Build 20430.20182, Current Channel, read via UI Automation): ribbon groups and commands (e.g. Media, eSignature, Markup, Page Movement, Selection Pane), File menu order and Info/Print/Account pages, every Options page incl. Advanced – German texts now exactly as in German Word
- **Excel, PowerPoint, OneNote, Access, Project and Visio matched against the real 2609 apps** (same build, UI Automation dump): ribbon tabs, groups and commands (new: Draw tab in Excel/PowerPoint, Process tab in Visio, Gantt Chart Format in Project, PowerPoint Record tab, Excel Check Performance/Show Changes/Focus Cell/Checkbox), File menu order and pages, every Options page and every Trust Center page in dump order – German texts exactly as in German Office. Settings that are only reachable by policy or in sub-dialogs stay linked under "More settings"
- New Trust Center pages from 2609: **Protocol Settings** (FrontPage RPC, FTP/HTTP; all apps with this page), Visio **Links to External Apps**, Project **Legacy Formats**; OneNote options **Sync** and **Meeting Details**
- **Trust Center** of all four apps rebuilt (incl. Message Bar, Form-based Sign-in, File Block per file type, Outlook e-mail security, attachments, automatic download, programmatic access)
- **File › Home** start page with Copilot prompt, templates and recent files; File menu now Home · New · Open | Info · Save · Save As …
- **Shareable links** for every policy (`#policy/word16/L_…`), command (`#cmd/word/FileSave`), view (`#view/support`, `#view/deployment`, `#view/packages`), support case (`#support/…`), package (`#package/security`) and the tour (`#tour`); "Copy link" buttons
- **Static page per policy** (2,400+) under `/p/` plus sitemap – findable via search engines
- **One search for everything** (header, Ctrl+K or /): views, explained entries, every option in the mocks, support cases, packages, 2,400+ policies, command IDs and registry paths in one list, fully keyboard and screen-reader operable
- **Outlook Calendar, People and Tasks**: the module bar is clickable – each module has its own window and Home tab (TabCalendar, TabContacts, TabTasks) with explained entries: calendar sharing and publishing, shared and room calendars, Internet calendars, weather bar, Teams meetings, contact card and contact export, Tasks/To Do
- **Tour** extended: Packages & tools, Deployment, Help – and it ends in the settings, so language, high contrast and info pins can be changed right away
- **How to use the results** (? menu): from an entry to a real configuration with Group Policy, Intune, Cloud Policy, scripts or the collection
- **Info pins** in the settings: all, fewer (only explained elements) or none
- Registry values shown as clear cards (key, value, type, data); PowerShell and .reg also for policies that need a value you choose (marked TODO)
- PowerPoint: notes pane, video and Section Zoom previews and status bar closer to the real app; slides stay white in dark mode. Visio: connectors meet the shapes
- New support cases for Visio: company stencils missing, providing a company stencil for all users
- **Accessibility**: every info pin reachable by keyboard and announced to screen readers, short live announcements instead of reading the whole inspector, skip links, page language follows EN/DE, contrast fixes (WCAG AA, checked with axe-core), reduced-motion support
- **Phones**: compact header, scaled mock, tap a setting → jump to the inspector and back
- Policy packages show the policy-set date (October 2026) and a disclaimer: own review required, new Office features may connect to Microsoft services
- Demo GIFs in the README
- **Favorites** (☆ Save) and **Print / PDF** for single entries, packages and your collection
- Tab icon, "Recently viewed" on the start panel, keyboard: `/` focuses the search, `Esc` closes dialogs
- **New header**: app switcher (all eight apps in one menu), view tabs, one search field, settings menu (language, appearance) and help menu (tour, basics, sources & method, what's new)
- **Packages & tools** as a main view right after Explorer, plus a tools card on the start panel
- **Sources & method** page: where every value comes from and how it is checked; **What's new** shows this changelog inside the app
- **Outlook matched against a real Outlook 2609** (same build, UI Automation dump): Mail ribbon (Home, Send / Receive, Folder, View, Help), File menu with Save Attachments and Exit, Create PDF, every Options page incl. the new **Tasks** page and every Trust Center page in dump order – German texts exactly as in German Outlook

**Changed**
- Removed what the 2609 dumps no longer show, e.g. Smart Lookup/Insights, Contact Support (except Access), Excel/PowerPoint Online Pictures button (now inside Pictures), PowerPoint Compare group and Present Online, OneNote Accessibility options page, Project ActiveX/Message Bar and Visio Protected View/Add-in catalogs pages – their policies stay in the reference and search
- Word: removed elements that no longer exist in current Word (Research/Researcher, Resume Assistant, Office Background, LinkedIn features, Startup Boost and default-program options, real-time collaboration options) – their policies stay in the reference and search
- "Save a Copy" renamed to "Save As" (with AutoSave it is still called "Save a Copy" in Office – noted in the entry)
- The ribbon builder switch sits next to the Office window; info pins moved into the settings menu; the footer is one calm line
- Intro above the window shortened to one line with an expandable "How it works"
- Gear icon in the header replaced by the Fluent settings icon
- Missing policies added to explained entries: Quick Access Toolbar (turn off customizations, roaming), COM add-ins and the Outlook Teams add-in (List of managed add-ins), Outlook macro security
- Sample people in the mocks are now clearly fictional (Max Mustermann, Reiner Zufall, John Doe); English texts consistently in US spelling
- "All policies (static pages)" opens the pages on the same site (also when testing locally)
- Outlook: removed what the 2609 dump no longer shows (Ignore, Groups and Focused Inbox groups on the ribbon, Feedback page in the File menu)
- Sitemap entries carry the build date (`lastmod`)

**Fixed**
- File menu pages of PowerPoint, OneNote, Project, Access and Visio showed "Product Information" on every page and pushed the page content (e.g. Save As) out of the window
- Oversized icons in some ribbon rows (Excel Sheet View, PowerPoint Transitions/Slide Show, Outlook View, Project View)
- Packages view did not switch language until reopened
- Placeholders like `<domain>` in texts were swallowed as HTML (e.g. the Central Store path showed `\\\SYSVOL\\Policies`) – now shown with contoso.com
- Visio connector lines did not meet the shapes
- Numbers in the "Start here" list sat next to the last line of a wrapped link

## 1.0 – 2026-10-14

First public release: clickable Word/Excel/PowerPoint/Outlook mocks, inspector with idMso, Group Policy, registry, Intune and Cloud Policy, ribbon builder, reference, user support, deployment, tour, English and German.
