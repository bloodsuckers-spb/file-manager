import { EOL, homedir, userInfo, cpus } from "os";

const commands = Object.freeze({
  EOL: "--EOL",
  cpus: "--cpus",
  homedir: "--homedir",
  username: "--username",
  architecture: "--architecture",
});

const showMessage = (message = "") => {
  console.log(message);
};

export const osCommandHandler = async (arg = "") => {
  switch (arg) {
    case commands.EOL:
      showMessage(JSON.stringify(EOL));
      return;
    case commands.cpus:
      showMessage(cpus().length);
      cpus().forEach(({ model, speed }) => {
        showMessage(`${model}, speed: ${speed / 1000} GHz`);
      });
      return;
    case commands.homedir:
      showMessage(homedir());
      return;
    case commands.username:
      const { username } = userInfo();
      showMessage(username);
      return;
    case commands.architecture:
      showMessage(process.arch);
      return;
    default:
      showMessage("Invalid input message");
  }
};
