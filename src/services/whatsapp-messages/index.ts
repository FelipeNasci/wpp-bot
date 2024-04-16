const wppconnect = require( "@wppconnect-team/wppconnect");

export const createServer = async () => {

  const options = { session: "whatsbot", autoClose: false };
  return wppconnect.create(options);
};

export default {
    createServer
}