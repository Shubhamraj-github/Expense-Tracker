
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const config = process.env;

const secretKey = "a2a70b769e6d4d12336723d11273e93b";

exports.decryptData = (encryptedData) => {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
		const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
		if (decryptedData.startsWith('{') || decryptedData.startsWith('[')) {
			return JSON.parse(decryptedData);
		} else {
			return decryptedData;
		}
	} catch (error) {
		console.error("Decryption error: ", error);
		return null;
	}
};

exports.decryptToken = async (encryptedData) => {
	const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
	const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return data;
};

exports.encryptData = (data) => {
	const encData = CryptoJS.AES.encrypt(JSON.stringify(data), config.JWT_SECRET).toString();
	return encData;
};

exports.encryptDataWithoutSlash = (data) => {
	const encData = CryptoJS.AES.encrypt(JSON.stringify(data), config.JWT_SECRET).toString();
	return encData.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};


exports.decryptDataWithoutSlash = (encryptedData) => {
	const base64 = encryptedData
		.replace(/-/g, '+')
		.replace(/_/g, '/')
		.padEnd(encryptedData.length + (4 - encryptedData.length % 4) % 4, '=');
	const bytes = CryptoJS.AES.decrypt(base64, config.JWT_SECRET);
	const decrypted = bytes.toString(CryptoJS.enc.Utf8);

	return JSON.parse(decrypted);
};

exports.authenticate = (plainText, userPassword) => {
	return exports.setPassword(plainText) === userPassword;
};

exports.hashPassword = (password) => {
	if (!password) return '';
	return crypto.createHash('sha1').update(password).digest('hex');
};

exports.setPassword = (password) => {
	if (!password) return '';
	return crypto.createHash('sha1').update(password).digest('hex');
};




