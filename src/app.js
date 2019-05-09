const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

const router = new Router();
router.get('/crypto', async ctx => {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = crypto.pbkdf2Sync('crypto', salt, 10000, 64, 'sha512').toString('hex')

  ctx.body = { hash, len: hash.length }
  console.log(hash)

  ctx.status = 200
})

let reqNum = 0
router.get('/empty', async(ctx, next) => {

    ctx.body = { hash: 'empty' }
    reqNum++;

    ctx.status = 200
    next()
});

const app = new Koa();
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, err => {
  if (err) throw err;
  console.log('runing...');
});