# qw

QuickWrite (qw) - Vim-like command line editor with a lot of features written on React.js and Ink.

Key features:
- FULL customisation. You can customise everything! Every color! Every hotkey! Just like in Arch
- Everything important without anything extra, but you can install (or write your own) packages! Editor, `cat`-like tool with syntax highlighting and scrolling using arrow keys, just like in `man`, etc.

TODO:
- [ ] Basic editor
- [ ] File showing system (like `cat`, but with syntax highlighting and other things)
- [ ] Package system (ex. `qwi py` -> install package with python's syntax highlighting and error checking)

## Install

Available methods:
- [`npm` (Windows, Linux, MacOs)](#npm)
- [`AUR` (ArchLinux, Manjaro and others)](#aur)

### `npm`

```bash
npm install -g qweditor
```

### `AUR`

> [!CAUTION]
> You can only install unstable developerment version. If you want to install stable version use `npm` method or wait for stable `AUR` release (coming in 0.2).

```bash
yay -S qw-git
```

## Configure

Edit `~/.config/qw/config.yaml` to configure `qw`. If you haven't one, just run `qw` once. `config.yaml` will create automatically with default values.
