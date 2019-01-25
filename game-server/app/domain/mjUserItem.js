var logger = require('pomelo-logger').getLogger(__filename);
var SocketCmd = require('../models/socketCmd');
var utils = require('../util/utils');

var UserItem = function (room, data) {
	this.room = room;

	//玩家信息
	this.mid = data.mid || 0;
	this.nick = data.nick || "";
	this.sex = data.sex || 0,
	this.gold = data.gold || 0,
	this.diamond = data.diamond || 0,
	this.head_url = data.head_url || "",
	this.seatID = data.seatID || 0,
	this.ready = data.ready || 0,
	this.online = data.online || 1,
	this.robot = data.robot || 0,

	//玩家牌局数据
	this.handCards = []; 						//手牌列表
	this.staHandCards = {}; 					//手牌统计
	this.outCards = []; 						//出牌列表
	this.extraCards = []; 						//吃碰杠牌的列表
	this.handCardsNum = 0; 						//手牌张数
	this.tingList = []; 						//听牌列表

	this.timeoutID = null; 						//延时定时器
	this.intervalID = null; 					//循环计时ID
	this.leaveRoomTimeoutID = null; 			//离开房间延时定时器
};

var pro = UserItem.prototype;

//导出前端的userData
pro.exportClientData = function () {
	var data = {};

	//玩家信息
	data.mid = this.mid;
	data.nick = this.nick;
	data.sex = this.sex;
	data.gold = this.gold;
	data.diamond = this.diamond;
	data.head_url = this.head_url;
	data.seatID = this.seatID;
	data.ready = this.ready;
	data.online = this.online;

	//玩家牌局数据
	data.handCards = this.handCards;
	data.outCards = this.outCards;
	data.extraCards = this.extraCards;
	data.handCardsNum = this.handCardsNum;
	data.tingList = this.tingList;

	return data;
}

//导出前端的gameData
pro.exportClientGameData = function () {
	var data = {};

	//玩家牌局数据
	data.handCards = this.handCards;
	data.outCards = this.outCards;
	data.extraCards = this.extraCards;
	data.handCardsNum = this.handCardsNum;
	data.tingList = this.tingList;

	return data;
}

//机器人接收到的推送消息
pro.onSocketMsg = function (param) {
	var self = this;

	var res = param.res;
	var socketCmd = res.socketCmd;

	switch (socketCmd) {
		case SocketCmd.USER_ENTER:
			break;
		case SocketCmd.USER_LEAVE:
			var realPlayerNum = self.room.getRealUserNum();
			if (realPlayerNum === 0) {
				if (!self.leaveRoomTimeoutID) {
					var delayTime = utils.randomNum(1, 3);

					self.leaveRoomTimeoutID = setTimeout(function () {
						self.room.leaveRoom(self.mid);
					}, delayTime);
				}
			}

			break;
		default:
	}
};

pro.clearTimeoutTimer = function () {
	if (this.timeoutID) {
		clearTimeout(this.timeoutID);
		this.timeoutID = null;
	}
};

pro.clearIntervalTimer = function () {
	if (this.intervalID) {
		clearInterval(this.intervalID);
		this.intervalID = null;
	}
};

pro.clearLeaveRoomTimeoutTimer = function () {
	if (this.leaveRoomTimeoutID) {
		clearTimeout(this.leaveRoomTimeoutID);
		this.leaveRoomTimeoutID = null;
	}
};

//清理工作
pro.clean = function () {
	this.clearTimeoutTimer();
	this.clearIntervalTimer();
	this.clearLeaveRoomTimeoutTimer();
};

module.exports = UserItem;