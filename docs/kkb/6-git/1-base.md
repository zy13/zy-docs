## 1-git简介与工具安装

* 什么是git？

git是一个免费并且开源的分布式版本控制系统

官网：https://git-scm.com

* 版本控制系统

保留文件所有的修改历史记录，可以方便地撤销之前对文件的修改操作

* 安装

## 2-git常用命令上手操作

* 命令行终端

```bash
- gitbash
- cmd
- vscode terminal
```

* 配置用户名和邮箱

```bash
git config user.email "邮箱"
git config user.name "用户名"

# 全局配置
# git config --global user.email "邮箱"
# git config --global user.name "用户名"
```

* 检查配置
```bash
# 打印所有config
git config --list
# 打印指定config
git config user.name
```

* 初始化仓库
```bash
git init
```

* ls命令 查看文件夹下的文件
> ls -a 查看文件夹所有文件，包括隐藏的文件

* cd命令 修改目录

* rm 删除一个或者多个文件或者目录

* touch 修改文件或者目录的时间属性，如果文件不存在，系统会建立一个新的文件

* cat 显示整个文件

* clear 清除屏幕

* lsof -i:端口号 查看端口号进程


## git文件状态、工具目录及工作

### 状态status
git提供三种不同的记录状态
- 已修改（modified）
- 已暂存（unstaged）
- 已提交（committed）
一个特殊状态
- 未追踪

* git log --oneline 查看记录 

* git checkout 撤销操作


## git入门命令扩展


## git入门命令：删除文件



## git入门命令：移除文件


## 强大的查看命令：status


## 强大的查看命令：diff和log



## 提交对象及master



## 创建分支



## merge的两种合并：正常合并


## 分支的操作：解决冲突、删除


## 撤销大集合


## reset和chechout本质


## git存储及操作



## rease变基操作


## 配置及分布式版本控制的概念


## tag标签



## 远程仓库命令



## ssh及编辑器命令行使用



## 