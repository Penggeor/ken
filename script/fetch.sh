#!/bin/bash

# 启动 ssh-agent 并添加秘钥
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github

# 切换到项目目录并更新代码
cd ~/project/ken
git pull origin main