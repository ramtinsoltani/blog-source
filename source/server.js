const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const port = process.argv.length > 2 ? (isNaN(parseInt(process.argv[2])) ? 666 : parseInt(process.argv[2])) : 666;

app.all('*', function(req, res, next) {

  console.log(`${chalk.red.bold(req.connection.remoteAddress)} ${chalk.green.bold(req.method)} ${chalk.blue.bold(req.originalUrl)}`);
  next();

});

app.use(express.static(path.join(__dirname)));

app.listen(port);

console.log(`Server started on port ${port}`);
