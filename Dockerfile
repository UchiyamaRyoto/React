# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 必要な依存関係をインストール
RUN npm install

# アプリのソースコードをコピー
COPY . .

# コンテナのポートを公開
EXPOSE 3000

# 開発用サーバーを起動
CMD ["npm", "start"]
