# DeepGui
Almost the same as Arash's work(https://github.com/heidariarash/DeepGUI), only some slightly modification based on personal liking.

## 介绍
本质是某次短期课程的一次性授课道具。当时是临时有“如果可以图形化生成代码就好了”的需求，随手改了一下就拿去上课用了。bug挺多，不过目前也没有继续完善它的创作热情，未来也大概率不会再碰这个了。

如果想找一个真正意义上的“图形化编写人工智能”的话，matlab的deep learning toolbox或许是个较好的选择。不过受限于matlab安装过于繁琐，可能实际作为初高中人工智能编程体验课授课道具的效果不会太好（学生很可能根本装不了）。deepgui本质上是一个用electron写的文本生成器，只能生成代码，还是需要让学生安装tensorflow开发环境才能运行，若是能找到一些在线运行平台说不定会好一些。

如果真的需要安装简单、功能齐全的“图形化人工智能编程”平台，不妨试着关注一下华南理工的李粤老师正在做的blockly tensorflow，说不定过一会儿就能用了呢。

## 使用教程
上面的是源码。只是使用的话下载解压release里面的DeepGUIV1.1.zip，直接运行就可以了。我不怎么熟electron，万一运行不了我还真想不到可能是哪些问题，不过至少上课那会儿一切正常。

## 版本

### V1.1
最初版本

### V1.2
\+ 机翻式汉化

\- 一堆毫无意义的功能和代码

虽然本就是抄的代码，但抄袭之余还是需要留下点自己的印记的。

### V1.3
\+ 代码优化

\+ 显示界面美化

\+ 或许会有的小惊喜

我一直觉得，所谓抄袭就是把别人的东西通过漫长的调校，一点点变成自己的模样。至少从这一版开始，我会加大力度、大刀阔斧地乱改的（误）。

**忘记测了，出了些不小的bug，目前用不了。看心情改**

## TODO
- 整个tensorflow\.js，把它真正变成集图形化编程和运行于一体的东西。
- 页面还是好丑，得大改。
