// ------------------------------------------------------------------------------
// 基底クラス：
// メンバ定義
// ------------------------------------------------------------------------------
class IFrameManager {

	constructor() {
		this.doc =
			'<!DOCTYPE html>' +
			'<html lang="ja">' +
			'<head>' +
			'<meta charset="utf-8"/>' +
			'<style>body{color:#FFF;}</style>' +
			'<title>tester</title>' +
			'</head>' +
			'<body>' +
			'<h1>results</h1>' +
			'<script type="text/javascript">' +
			'</script>' +
			'</body>' +
			'</html>';

		this.css =
			"overflow: hidden;" +
			"border-radius: 5px;" +
			"width: 100%;" +
			"height: 100%;" +
			"margin: 10px;";
	}

	init(id, urls, callback) {

		let iframe = document.createElement("iframe");

		// CSS設定
		iframe.style.cssText = this.css;

		// スクロールバー非表示（挿入前に設定する）
		iframe.scrolling = "no";

		// ボーダーを消す（挿入前に設定する）
		iframe.frameBorder = "0";

		// DOMツリーに挿入
		document.getElementById(id).appendChild(iframe);

		iframe.srcdoc = this.doc;

		// iframe.sandbox = "allow-scripts";

		const fnc = (reason, file, line, column, err) => {
			callback(reason, file, line, column, err);
			
			let div = document.createElement("div");
			div.textContent = `${line}行 ${column}列 ${reason} ${file}`;

			let iFrameBody = iframe.contentDocument.getElementsByTagName('body')[0];
			iFrameBody.appendChild(div);
		}

		iframe.onload = function () {

			let iWindow = iframe.contentDocument.defaultView;
			iWindow.onerror = fnc;


			let iframeDoc;
			if (iframe.contentDocument) {
				iframeDoc = iframe.contentDocument;
			}
			else if (iframe.contentWindow) {
				iframeDoc = iframe.contentWindow.document;
			}
			else if (iframe.document) {
				iframeDoc = iframe.document;
			};
			let iFrameBody = iframeDoc.getElementsByTagName('body')[0];


			for (const url of urls) {
				let script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = url;

				script.onload = function (e) {
				};

				iFrameBody.appendChild(script);
			}
		}

	}

}

export { IFrameManager };