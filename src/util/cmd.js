import { exec } from "child_process";
import consola from "consola";

export default (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err) => {
            if (err) {
                consola.error(`could not execute ${cmd}`, err);
                return reject(err);
            }

            consola.success("[exec]", cmd);
            resolve();
        });
    });
};
