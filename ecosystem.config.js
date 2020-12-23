module.exports = {
  apps: [
    {
      name: 'code-challenge-api',
      script: 'yarn start:prod',
      env: {
        DB_HOST: '127.0.0.1',
        DB_PORT: '5432',
        HOST: 'localhost',
        DB_NAME: 'name_db',
        DB_USERNAME: 'username_user',
        DB_PASSWORD: 'SuPeRpAsSwOrD',
      },
    },
  ],
};
