sample.web.coder
=========

Codemirrorを利用した、javascript editor です。


 構成
---------------

```
+-------------------+        +-------------------+         +-------------------+
|                   |        |                   |         |                   |
|  Browser          +------->|  Reverse-Proxy    +-------->|  Web Server       |
|                   |        |                   |         |                   |
|  localhost:8080   |<-------+  Nginx            |<--------+  Deno.js:3000     |
|                   |        |                   |         |                   |
+-------------------+        +-------------------+         +-------------------+
```


使い方
---------------

①動作確認する場合は、下記をインストールしてください。

Mac : [Docker Desktop](https://www.docker.com/products/docker-desktop)

Windows : [Docker Compose](https://docs.docker.com/compose) 

②フォルダ直下でビルドする。
```
docker-compose build
```

③立ち上げ
```
docker-compose up
```

④起動したらブラウザでアクセスする。
[http://localhost:8080](http://localhost:8080)

⑤Side Menuの「Step.1 コードの追加」を押す。

タブが追加されます。ソースコード部分はCodemirror[https://codemirror.net/](https://codemirror.net/)を使っています。

タブ名はランダム文字列です。

⑥Side Menuの「Step.2 コードのテスト」を押す。

追加されたタブ中のソースコードをiframeに読み込ませます。

初期コードは閉じ括弧がないので、SyntaxErrorが追加表示されます。

以上です。
