## Bot 搭建流程

1. 自行寻找方法搭建 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) WebSocket 服务端
2. 安装 [Node.js](https://nodejs.org/)
3. 安装 [pnpm](https://pnpm.io/)
4. 修改配置

```javascript
// bot/config.js

export default {
	group_id: 你的群号,
};
```

```javascript
// bot/index.js

// line 6

const napcat = new NCWebsocket(
	{
		baseUrl: "你的 WebSocket 服务端地址",
		throwPromise: true,
		reconnection: {
			enable: true,
			attempts: 10,
			delay: 5000,
		},
	},
	true
);
```

5. 在 `bot` 目录下运行 `pnpm install`
6. 在 `bot` 目录下运行 `node index.js`
