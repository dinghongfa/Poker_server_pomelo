module.exports = {
	MSG_GROUP_NAME: "MjGroup",

	CARD_LIST: [
		//万
		0,1,2,3,4,5,6,7,8,
		0,1,2,3,4,5,6,7,8,
		0,1,2,3,4,5,6,7,8,
		0,1,2,3,4,5,6,7,8,
		//筒
		9,10,11,12,13,14,15,16,17,
		9,10,11,12,13,14,15,16,17,
		9,10,11,12,13,14,15,16,17,
		9,10,11,12,13,14,15,16,17,
		//条
		18,19,20,21,22,23,24,25,26,
		18,19,20,21,22,23,24,25,26,
		18,19,20,21,22,23,24,25,26,
		18,19,20,21,22,23,24,25,26,
	],

	//马张数
	MA_NUM: 6,

	//游戏状态
	GAME_STATE: {
		INIT: 0, 																//初始化
		FA_PAI: 1, 																//发牌
		DA_PAI: 2, 																//打牌
		RESULT: 3, 																//结算
		OVER: 4, 																//结束
	},

	//操作类型
	OPE_TYPE: {
		NO_OPT: -1, 															//无操作
		GUO: 0, 																//过
		PENG: 1, 																//碰
		GANG: 2,																//杠
		AN_GANG: 3,																//暗杠
		BU_GANG: 4,																//补杠
		HU: 5,																	//胡
		OUT_CARD: 6, 															//打牌
	},

	//操作时间
	TIME_CONF: {
		//ai操作时间配置
		ReqRobotTime: 300,														//玩家进入离开房间请求机器人的延时

		//动画时间
		GameStartAnimTime: 1000, 												//游戏开始动画时长
		FaPaiAnimTime: 2000, 													//发牌时长

		//流程时长
		ReadyLeftTime: 12000, 													//准备时间
		OutCardLeftTime: 10000, 												//打牌等待时长
		OpeLeftTime: 5000, 														//吃碰杠胡等待时长
	},

	//机器人配置
	ROBOT: {
		AutoReadyTime: { 														//自动准备时间
			Min: 100,
			Max: 200,
		},

		UpDataUserListLeave: { 													//房间中没有了真实玩家离开房间的时间
			Min: 100,
			Max: 300,
		},

		AutoOpeTime: { 															//自动操作的时间
			Min: 1000,
			Max: 2000,
		},

		AutoOutCardTime: { 														//自动出牌时间
			Min: 1000,
			Max: 5000,
		},
	},
};