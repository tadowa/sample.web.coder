// ------------------------------------------------------------------------------
// 基底クラス：
// メンバ定義
// ------------------------------------------------------------------------------
class CodeEditor {

	constructor(element) {
		this.codemirror = CodeMirror.fromTextArea(element, {
			mode: "javascript",
			lineNumbers: true,
			indentUnit: 4,
			indentWithTabs: true,
			theme: 'monokai',
		});
		this.widgets = [];
	}

	getSourceCode() {

		this.codemirror.save();
		return this.codemirror.getTextArea().value;

	}

	getUrl() {

		let src = this.getSourceCode();
		return window.URL.createObjectURL(new Blob([src], { type: "text/javascript" }));

	}

	setError(message, filename, lineno, column, err) {
		
		this
		.removeError()
		.addError(lineno, message)
		.scrollError();

		return this;
	}

	addError(line, reason) {
		
		let div = document.createElement("div");
		let icon = div.appendChild(document.createElement("span"));
		icon.innerHTML = "!!";
		icon.className = "js-error-icon";
		div.appendChild(document.createTextNode(reason));
		div.className = "js-error";
		this.widgets.push(this.codemirror.addLineWidget(line - 1, div, { coverGutter: false, noHScroll: true }));

		return this;
	}

	removeError() {

		for (let i = 0, m = this.widgets.length; i < m; ++i) {
			this.codemirror.removeLineWidget(this.widgets[i]);
		};
		this.widgets = [];

		return this;
	}

	scrollError() {

		const info = this.codemirror.getScrollInfo();
		const after = this.codemirror.charCoords({ line: this.codemirror.getCursor().line + 1, ch: 0 }, "local").top;
		if (info.top + info.clientHeight < after) {
			this.codemirror.scrollTo(null, after - info.clientHeight + 3);
		};

		return this;
	}

}


class CodeManager {

	constructor() {
		this.codemirrors = {};
		this.urls = {};
	}

	init(name, element) {
		this.codemirrors[name] = new CodeEditor(element);
		return this;
	}

	getSourceUrls() {
		this.urls = {};
		for (let name in this.codemirrors) {
			let url = this.codemirrors[name].getUrl();
			this.urls[url] = name;
		}
		return Object.keys(this.urls);
	}

	recvErrorForIFrame(reason, file, line, column, err) {
		// CodeMirrorは表示しないとエラーが反映されない。クリックイベント発火してタブ表示させる。
		document.getElementById(this.urls[file]).click();

		if (this.codemirrors[this.urls[file]]) {
			this.codemirrors[this.urls[file]].setError(reason, file, line, column, err);
		}
	}

	removeErrors() {
		for (let key in this.codemirrors) {
			this.codemirrors[key].removeError();
		};
	}

}

export { CodeManager };