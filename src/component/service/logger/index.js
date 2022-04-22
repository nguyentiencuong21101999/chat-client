const getTime = () => {
  const date = new Date();
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
};

class Logger {
  static info(content) {
    console.info(`[${getTime()}]-[INFO]: \n`, JSON.stringify(content, null, 2));
  }

  static debug(message, content) {
    console.debug(
      `[${getTime()}]-[DEBUG]: ${message} \n`,
      JSON.stringify(content, null, 3)
    );
  }

  static trace(content) {
    console.trace(
      `[${getTime()}]-[TRACE]: \n`,
      JSON.stringify(content, null, 2)
    );
  }

  static warn(content) {
    console.warn(`[${getTime()}]-[WARN]: \n`, JSON.stringify(content, null, 2));
  }

  static error(content) {
    console.error(
      `[${getTime()}]-[ERROR]: \n`,
      JSON.stringify(content, null, 2)
    );
  }

  static log(content) {
    console.log(`[${getTime()}]-[LOG]: \n`, content);
  }

  static table(content) {
    console.table(`[${getTime()}]-[TABLE]: \n`, content);
  }
}

export default Logger;
