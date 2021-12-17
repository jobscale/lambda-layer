const { spawn } = require('child_process');
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

class App {
  async listBuckets() {
    const params = {};
    await s3.listBuckets(params).promise()
    .then(({ Buckets }) => logger.info(Buckets.map(item => item.Name)));
  }

  async spawn() {
    await new Promise(resolve => {
      const ls = spawn('ls', ['-lah', '/opt/nodejs']);
      ls.stdout.on('data', data => {
        logger.info(`[stdout]\n${data}`);
      });
      ls.stderr.on('data', data => {
        logger.error(`[stderr]\n${data}`);
      });
      ls.on('close', code => {
        logger.info(`child process exited with code ${code}`);
        resolve();
      });
    });
  }

  async fetch() {
    const loader = require;
    await loader('node-fetch')('https://inet-ip.info/ip')
    .then(res => res.text())
    .then(ip => logger.info({ ip }))
    .catch(e => logger.error(e));
  }
}

module.exports = {
  App,
  app: new App(),
};
