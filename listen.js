const fs = require('fs');
const path = require('path');
const diacritics = require('diacritics');
const logger = require("./Fca-Horizon-Remastered/logger");

module.exports = function ({ api }) {
    
	const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, 'admin.json'), 'utf8'));
	const admin = adminData.Admin;

	return async (event) => {

		if (!event.body) return;

		if (event.senderID === api.getCurrentUserID()) return;

		let s = diacritics.remove(event.body.toLowerCase());
		const keywords = ["mua acc", "shop acc", "ban acc", "nap uc", "thu acc", "gop acc", "tim acc", "tim ac", "ban ac", "uy tin", "co acc", "co ac"];
		let containsKeyword = keywords.some(keyword => s.includes(keyword));

		if (!containsKeyword) return;

		let message;
		if (s.includes("nap uc")) {
			message = "Cần Nạp UC Liên Hệ Neil PUBG Có Nạp UC Quốc Tế. UC Bảo Hành 100%";
		} else {
			message = "Hỗ Trợ All Dịch Vụ PUBG Mobile. Thu Mua Acc Giá Cao, Hỗ Trợ Góp Acc Từ 30-50% Được Vào Acc Chơi.";
		}

		return api.shareContact(message, admin, event.threadID, (err) => {
			if (err) return console.error(err);
		}, event.messageID);
        
	};
};