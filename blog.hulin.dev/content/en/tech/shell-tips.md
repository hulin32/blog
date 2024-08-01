---
title: Some Shell Tips
date: 2018-12-12
categoires: shell
---

Really Small Tips
<!--more-->

### 1. pushd, popd, dirs---Terminal Directory Stack Management
These commands can achieve the purpose of quickly switching between different directories. `pushd` is used to push a directory into the directory stack, `popd` pops it out, and `dirs` displays the contents of the directory stack. When using numbers after `pushd` or `popd`, it operates on the contents of the directory stack. If it's a directory, it's new content.
Personal opinion: Generally useful
##### Personal opinion: Generally useful

### 2. Quick Movement in Terminal
`Meta + f`: Move forward one word
`Meta + b`: Move backward one word
`Ctrl + y`: Paste the last cut
`Ctrl + a`: Move to the beginning of the line
`Ctrl + e`: Move to the end of the line
`Ctrl + k`: Delete from current position to the end of the line
`Meta + d`: Delete from current position to the end of the word
`Ctrl + w`: Delete from current position to the previous whitespace
(Meta key can be set on Mac at Terminal > Preferences > Settings > Keyboard)
##### Personal opinion: Especially 1 and 2 are great

###. 3 Finding Files---`find`
Let's talk about application scenarios. When you want to change a certain name in the editor, you can search for the content within files, but if you want to change the file name, the editor might not be helpful. This is where `find` comes in handy.

Command format:
```shell
find options starting/path expression
```
examples
```shell
# Search for filenames containing "hello" in the current directory:
find  .  -name  "*hello*"

Ignore case:
find  .  -iname  "*hello*"

# You can use `-type` to filter file types. Common ones are d (directory) and f (file):
find  .  -iname  "*hello*" -type f
find  .  -iname "*hello*" -type d
```

##### Personal opinion: Really useful

References:
1. [Shortcuts to move faster in Bash command line](http://teohm.com/blog/shortcuts-to-move-faster-in-bash-command-line/)

