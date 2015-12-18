'use strict';

const koa = require('koa');
const serve = require('koa-static');
const fs = require('fs');
const request = require('request');

const app = koa();

app.use(serve('./dist/assets'));
app.use(function *() {
    if (this.method === 'POST') {
        // TODO: ここで Ninja Lock の Web サーバを操作すること
        this.redirect('/');
    } else {
        this.type = 'text/html';
        this.body = fs.readFileSync('./dist/index.html');
    }
});

app.listen(process.env.PORT || 80);
