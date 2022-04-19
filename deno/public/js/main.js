import { makeUniqueId, makeUniqueName } from 'http://localhost:8080/public/js/libs/common.js';
import { TabBarManager } from 'http://localhost:8080/public/js/libs/tabbar.js';
import { CodeManager } from 'http://localhost:8080/public/js/libs/code.js';
import { IFrameManager } from 'http://localhost:8080/public/js/libs/iframe.js';

(async () => {

	document.addEventListener('DOMContentLoaded', e => {
		const container = new TabBarManager(document.getElementById('container'));
		const tester = new TabBarManager(document.getElementById('tester'));

		let console = document.createElement("div");
		console.id = makeUniqueId();
		tester.add('console', console);

		const codes = new CodeManager();

		document.getElementById('test1').addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			const name = makeUniqueName();
			let textarea = document.createElement("textarea");
			textarea.classList.add('code');
			textarea.value = `function ${name}(num) {
	return num * 2;
// } // この括弧がないので、
let r = ${name}(2);
console.log(r);
// 閉じ括弧なしと判断される`;
			container.add(name, textarea);
			codes.init(name, textarea);
		});

		document.getElementById('test2').addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();

			codes.removeErrors();

			while (console.firstChild) {
				console.removeChild(console.firstChild);
			}

			let iFrameManager = new IFrameManager().init(
				console.id,
				codes.getSourceUrls(),
				codes.recvErrorForIFrame.bind(codes)
			);
		});

	});

})();
