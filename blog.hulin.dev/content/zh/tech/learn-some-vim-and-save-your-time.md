---
title: "Learn Some Vim and Save Your Time"
date: 2017-12-22T22:41:13+08:00
categories: vim
gitalk: true
---

vim无敌
<!--more-->

自己学vim使用的一些命令，大多数在文后的链接能找到

### Survive

- vi/vim -> open the editor
- :q -> Quit
- :wq -> Save and Quit
- :q! -> Quit and Not Save
- i -> Insert mode
- x -> Delete the char under the cursor
- dd -> Delete the current line
- pP -> Paste to above or under the current line
- yy -> Copy current line
- hjkl -> Right, Down, Up, Left

### Feel comfortable

- a -> Insert after the cursor
- oO -> Insert a new line after/before the current one
- 0 -> Go to the first column
- ^ -> go to the first non-blank character of the line
- $ -> go to the end of line
- g_ -> go to the last non-blank character of line
- /pattern -> search for pattern
- u -> undo
- `<C-r>` -> redo
- :e `<path/to/file>` -> open file
- bn,bp -> show next/previous file (buffer)

### Feel Better, Stronger, Faster

- . -> Repeat the last command
- `N<command>` -> Repeat the command N times.
- NG -> Go to N line
- gg -> Go to first line
- G -> Go to last line
- b -> Open one buffer file
- % -> Go to the corresponding (, {, [.
- `*` -> go to next/previous(#) occurrence of the word under the cursor

### Vim Superpowers

- `f<char>`, `;`, `,` -> Find one char on the current line, `;` go to the next same char, ',' go back to the last same char
- t, -> Go to just before the character ,
- F,T -> Like f and t but backward
- `<C-p>` -> Go to the previous line
- `<C-n>` -> GO to the next line
- `<C-d>` -> Go down a half screen
- `<c-u>` -> Go up a half screen
- {,} -> previous/next empty line
- v,V,`<C-v>` -> Visual mode
- :split, :vsplit -> split the window
- tabnew -> open a new tab


[Learn Vim Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)

[简明 VIM 练级攻略](http://coolshell.cn/articles/5426.html)

[Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)

[Practical Vim: Edit Text at the Speed of Thought](https://www.amazon.com/Practical-Vim-Edit-Speed-Thought/dp/1680501275/ref=sr_1_1?ie=UTF8&qid=1488958924&sr=8-1&keywords=practical-vim)

[Practical-Vim 整理](https://github.com/flyingalex/Practical-Vim)