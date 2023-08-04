
# 使用较小的基础镜像
FROM node:lts-alpine

# 环境变量
ARG POSTHOG_API_KEY
ARG GISCUS_REPO_ID
ARG GISCUS_CATEGORY_ID

ENV POSTHOG_API_KEY=$POSTHOG_API_KEY
ENV GISCUS_REPO_ID=$GISCUS_REPO_ID
ENV GISCUS_CATEGORY_ID=$GISCUS_CATEGORY_ID

# 设置工作目录
WORKDIR /app

# 首先只复制依赖文件并安装，这样如果依赖没有变化，就不会每次都重建此部分
COPY package*.json ./
RUN npm install

# 现在复制其他文件
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 设置启动命令
ENTRYPOINT npm run serve -- --build --port 3000 --host 0.0.0.0
