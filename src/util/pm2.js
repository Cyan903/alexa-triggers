import pm2 from "pm2";
import consola from "consola";

export function connect(onceConnected) {
    pm2.connect((err) => {
        if (err) {
            consola.fatal("could not connect to pm2", err);
            process.exit(1);
        }

        consola.success("connected to pm2");
        onceConnected();
    });
}

export function start(name, script) {
    return new Promise((resolve, reject) => {
        pm2.start({ name, script }, (err) => {
            if (err) {
                consola.error(`could not start ${name}`, err);
                return reject(err);
            }

            consola.success("[start]", name, script);
            resolve();
        });
    });
}

export function stop(name) {
    return new Promise((resolve, reject) => {
        pm2.delete(name, (err) => {
            if (err) {
                consola.error(`could not stop ${name}`, err);
                return reject(err);
            }

            consola.success("[stop]", name);
            resolve();
        });
    });
}

export function list() {
    return new Promise((resolve, reject) => {
        pm2.list((err, list) => {
            if (err) {
                consola.error(`could not list processes`, err);
                return reject(err);
            }

            resolve(list);
        });
    });
}
