#!/bin/bash

# 启动 ssh-agent 并添加秘钥
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github

# 切换到项目目录并更新代码
cd ~/project/ken
git pull origin main

# Git 拉取成功才进入 Docker build
if [ $? -eq 0 ]; then
    echo "✅ Git pull was successful."
else
    echo "❌ Git pull failed. Not building the image."
    exit 1
fi

# 读取当前版本号
version=$(docker images ken --format "{{.Tag}}" | sort -V -r | head -n 1)

old_version=$version

echo "更新前 ken 镜像版本是 $old_version"

# 如果没有找到版本号，则默认设置为 v1.0.0
if [ -z "$version" ]; then
    version="v1.0.0"
else
    # 获取版本号最后一位
    last_num=${version##*.}
    # 对最后一位加一
    last_num=$((last_num + 1))
    # 重新组装版本号
    version=${version%.*}.$last_num
fi

# 执行构建命令
docker build \
    --build-arg POSTHOG_API_KEY= \
    --build-arg GISCUS_REPO_ID= \
    --build-arg GISCUS_CATEGORY_ID= \
    --build-arg ALGOLIA_APP_ID= \
    --build-arg ALGOLIA_API_KEY= \
    --build-arg ALGOLIA_INDEX_NAME= \
    -t ken:${version} .

# Check if docker build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker build was successful."

    # 移除旧的容器并运行新的镜像
    docker rm -f ken
    docker run -d -p 4000:3000 --name ken ken:${version}

    echo "更新后 ken 镜像版本是$version"

    # 删除旧的镜像
    echo "删除旧的镜像 ken:${old_version}"
    docker rmi ken:${old_version}

else
    echo "❌ Docker build failed. Not deleting the old image."
fi
