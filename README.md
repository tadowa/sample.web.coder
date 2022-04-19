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

1.動作確認する場合は、下記をインストールしてください。

Mac : [Docker Desktop](https://www.docker.com/products/docker-desktop)

Windows : [Docker Compose](https://docs.docker.com/compose) 



2.フォルダ直下でビルドする。
```
docker-compose build
```



3.立ち上げる
```
docker-compose up
```



4.起動したらブラウザでアクセスする。
[http://localhost:8080](http://localhost:8080)



5.Side Menuの「Step.1 コードの追加」を押す。

タブが追加されます。ソースコード部分はCodemirror[https://codemirror.net/](https://codemirror.net/)を使っています。

タブ名はランダム文字列です。



6.Side Menuの「Step.2 コードのテスト」を押す。

追加されたタブ中のソースコードをiframeに読み込ませます。

初期コードは閉じ括弧がないので、SyntaxErrorが追加表示されます。

以上です。
