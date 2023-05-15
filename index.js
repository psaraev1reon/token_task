const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
	try {
		const authCode = req.query.code;
		await api.getAccessToken(authCode);
		console.log("token saved");
		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

app.get("/api/delete", async (req, res) => {
	try {
		api.deleteToken();
		console.log("token deleted");
		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));