import express from "express";
import { logger, NCWebsocket } from "node-napcat-ts";
import config from "./config.js";

const app = express();
const napcat = new NCWebsocket(
	{
		baseUrl: "ws://",
		throwPromise: true,
		reconnection: {
			enable: true,
			attempts: 10,
			delay: 5000,
		},
	},
	true
);
const port = 36524;

await napcat.connect();

app.get("/get_root_dir", async (req, res) => {
	try {
		const root_files = await napcat.get_group_root_files({
			group_id: config.group_id,
		});
		res.send({ code: 200, data: root_files });
	} catch (err) {
		res.send({
			code: 500,
			msg: err,
		});
	}
});

app.get("/get_dir", async (req, res) => {
	var folder_id = req.query.folder_id;
	if (!folder_id) {
		res.send({
			code: 400,
			msg: "folder_id is required",
		});
		return;
	}

	folder_id = "/" + folder_id;

	try {
		const files = await napcat.get_group_files_by_folder({
			group_id: config.group_id,
			folder_id: folder_id,
		});
		res.send({ code: 200, data: files });
	} catch (err) {
		res.send({
			code: 500,
			msg: err,
		});
	}
});

app.get("/get_file_url", async (req, res) => {
	const file_id = req.query.file_id;
	if (!file_id) {
		res.send({
			code: 400,
			msg: "file_id is required",
		});
		return;
	}

	try {
		const file_url = await napcat.get_group_file_url({
			group_id: config.group_id,
			file_id: file_id,
		});
		res.send({ code: 200, data: file_url });
	} catch (err) {
		res.send({
			code: 500,
			msg: err,
		});
	}
});

app.listen(port, () => {
	logger.debug(`Server is running at http://localhost:${port}`);
});
