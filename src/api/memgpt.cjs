const sdk = require('api')('@memgpt/v1.0#45vn31vlu0qsrya');

async function memgptInit() {
    try {
      await sdk.auth(process.env.MEMGPT_ADMIN_TOKEN);
      const user = await sdk.create_user_admin_users_post({user_id: null, api_key_name: null});
      return user;
    } catch (error) {
      logger.error(`Error initializing MemGPT: ${error}`);
      throw error;
    }
  }

  module.exports = {
    memgptInit
  };