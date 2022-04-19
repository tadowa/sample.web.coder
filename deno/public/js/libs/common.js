function makeUniqueId() {
	let s = [];
	let hexDigits = "0123456789abcdef";
	for (let i = 0; i < 16; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	};
	return s.join('');
};

function makeUniqueName() {
	let s = [];
	let hexDigits = "abcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < 8; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	};
	return s.join('');
};

export { makeUniqueId, makeUniqueName };