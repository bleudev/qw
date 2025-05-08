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
npm i -g qweditor
```

Or use those commands to locally build and install the latest development version (requires `sudo`):
```bash
git clone https://github.com/bleudev/qw.git
cd qw
npm i
npm run build
sudo npm i -g
```

You can also use this one-liner (requires `sudo`):
```bash
git clone https://github.com/bleudev/qw.git && cd qw && npm i && npm run build && sudo npm i -g
```

### `AUR`

On Arch-based systems an [AUR package](https://aur.archlinux.org/packages/qw-git),
but be aware that this package is unofficial and might break! (use `sudo pacman -R qw` to uninstall it before
installing the npm version)

install with `yay`:
```bash
yay -S qw-git
```

or you can install without `yay`:
```bash
git clone https://aur.archlinux.org/qw-git.git && cd qw-git && makepkg -si
```

## Configure

Edit `~/.config/qw/config.yaml` to configure `qw`. If you haven't one, just run `qw` once.
`config.yaml` will create automatically with default values.
