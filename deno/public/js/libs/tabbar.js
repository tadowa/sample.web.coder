import { makeUniqueId } from 'http://localhost:8080/public/js/libs/common.js';

// ------------------------------------------------------------------------------
// 基底クラス：
// メンバ定義
// ------------------------------------------------------------------------------
class TabBarManager {

	constructor (parent) {
		this.tabs = document.createElement('ul');
		this.tabs.classList.add('tabs');
		parent.appendChild(this.tabs);

		this.panels = document.createElement('div');
		this.panels.classList.add('panels');
		parent.appendChild(this.panels);
	}

	createPanel() {
		let panel = document.createElement('div');
		panel.id = makeUniqueId();
		panel.classList.add('panel');
		return panel;
	}

	createTab (name) {
		let tab = document.createElement('li');
		tab.id = makeUniqueId();
		tab.classList.add('tab');
		tab.innerHTML = name;
		tab.addEventListener('click', this.clicked.bind(this), false);
		return tab;
	}

	add(name, element) {
		let panel = this.createPanel();
		panel.appendChild(element);
		this.panels.appendChild(panel);

		let tab = this.createTab(name);
		tab.id = name;
		tab.setAttribute('panel_id', panel.id);
		this.tabs.appendChild(tab);

		this.hide().show(tab);

		return this;
	}

	clicked(e) {
		this.hide().show(e.target);
	}

	show(tab) {
		tab.classList.add('show');
		const id = tab.getAttribute('panel_id');
		document.getElementById(id).classList.add('show');
		return this;
	}

	hide() {
		let active_tab = this.tabs.getElementsByClassName('show')[0];
		if (active_tab) {
			active_tab.classList.remove('show');
		}
		let active_panel = this.panels.getElementsByClassName('show')[0];
		if (active_panel) {
			active_panel.classList.remove('show');
		}
		return this;
	}

}

export { TabBarManager };