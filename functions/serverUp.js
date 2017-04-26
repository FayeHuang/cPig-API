const app = require('./server');
// ---- 啟動伺服器 ----
app.listen(8080, () => {
  console.log('server run on 8080 port');
});