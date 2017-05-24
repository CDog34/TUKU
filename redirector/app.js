const http = require('http');

const notFound = (res) => {
  res.statusCode = 404;
  res.end();
};

const movedPermanently = (res, location) => {
  res.statusCode = 301;
  res.setHeader('Location', location);
  res.end();
};

const getNewLocation = (urlArr, canWebp) => {
  const newUri = urlArr.slice(2).join('/');
  return `https://dn-tatpics.qbox.me/${newUri}!normal${canWebp ? '.webp' : ''}`;
};

const server = http.createServer((req, res) => {
  const urlArr = req.url.split('/');
  const accept = req.headers['accept'] || '';
  const webp = accept.indexOf('webp') !== -1;
  if (urlArr[1] !== 'v') return notFound(res);
  return movedPermanently(res, getNewLocation(urlArr, webp));
});

server.listen(2333, () => console.log('serverStart'));