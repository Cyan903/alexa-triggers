import Fastify from "fastify";
import consola from "consola";

import * as pm2 from "./util/pm2.js";
import exec from "./util/cmd.js";
import config from "../config.json" assert { type: "json" };

const fastify = Fastify();

pm2.connect(() => {
    for (const app of config.apps) {
        consola.info(`[${app.name}] ${app.route}`);

        fastify.post(app.route, async (req, res) => {
            if (req.body != config.password) {
                consola.info(`${req.ip} bad password (${req.body})!`);

                res.code(401).send({
                    code: 401,
                    msg: "Unauthorized!",
                });

                return;
            }

            const list = await pm2.list();
            const active = list.map((l) => l.name);

            for (const pro of app.background) {
                if (active.includes(pro.name)) {
                    await pm2.stop(pro.name);
                    continue;
                }

                await pm2.start(pro.name, pro.cmd);
            }

            for (const c of app.cmd) {
                await exec(c);
            }
        });
    }

    fastify.listen({ port: config.port, host: "0.0.0.0" }, (err) => {
        if (err) {
            consola.fatal(err);
            process.exit(1);
        }

        consola.success(`triggers :${config.port}`);
    });
});
