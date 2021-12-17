const { app } = require('./app');

global.logger = console;

exports.handler = async (event, context) => {
  logger.info(JSON.stringify({ event }, null, 2));
  const { awsRequestId } = context;
  const { NODE_PATH } = process.env;
  logger.info(JSON.stringify({ awsRequestId, NODE_PATH }, null, 2));

  await app.listBuckets();
  await app.spawn();
  await app.fetch();

  return { status: 200 };
};
