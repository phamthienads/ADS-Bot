const fs = require('fs');
const path = require('path');
const diacritics = require('diacritics');
const logger = require("./Fca-Horizon-Remastered/logger");

module.exports = function ({ api }) {
    
	const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, 'admin.json'), 'utf8'));
	const admin = adminData.Admin;

	return async (event) => {

		if (!event.body || event.body.trim() === "") return;
		if (event.senderID === api.getCurrentUserID()) return;
	
		let s = diacritics.remove(event.body.toLowerCase());
	
		const list1 = ["nap", "uc"];
		const list2 = ["shop", "ban", "thu", "gop", "tim", "acc", "gdtg", "tram", "mua", "uy tin", "ut"];
	
		let message;
	
		if (list1.some(keyword => s.includes(keyword))) {
			message = "Cần Nạp UC Liên Hệ Neil PUBG, Có Nạp UC Quốc Tế. UC Bảo Hành 100%";
		} else if (list2.some(keyword => s.includes(keyword))) {
			message = "Hỗ Trợ All Dịch Vụ PUBG Mobile. Thu Mua Acc Giá Cao, Hỗ Trợ Góp Acc Từ 30-50% Vào Acc.";
		} else {
			return;
		}
	
		try {
			await api.shareContact(message, admin, event.threadID, (err) => {
				if (err) logger.Normal("Lỗi Khi Gửi Tin Nhắn:", err);
			}, event.messageID);
		} catch (err) {
			logger.Normal("Lỗi Khi Gửi Tin Nhắn:", err);
		}
	};
};
