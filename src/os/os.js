import { EOL, homedir, userInfo, cpus } from "os";

import { showInvalidMessage } from "../constants/index.js";

export const osCommandsHandler = (arg = "") => {
  switch (arg) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      return;
    case "--cpus":
      console.log(cpus().length);
      cpus().forEach(({ model, speed }) => {
        console.log(`${model}, speed: ${speed / 1000} GHz`);
      });
      return;
    case "--homedir":
      console.log(homedir());
      return;
    case "--username":
      const { username } = userInfo();
      console.log(username);
      return;
    case "--architecture":
      console.log(process.arch);
      return;
    default:
      showInvalidMessage();
  }
};
