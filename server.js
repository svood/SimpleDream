const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
const cors = require('cors');
const LRUCache = require('lru-cache');
const compression = require('compression');
var LiqPay = require('./lib/liqpay');
const PORT = 3000;
var fs = require('fs');
const axios = require('axios');
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

const public = 'sandbox_i31171724869';
const private = 'sandbox_EKnOtyKVqlzpFJjHfn7vsH2bcqJ6PGkI8rZts64x'

const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    length: function (n, key) {
        return n.length
    },
    maxAge: 1000 * 60 * 60 * 24 * 30
});


app.prepare()
    .then(async () => {
        const server = express()
        server.use(bodyParser.urlencoded({
            limit: "50mb",
            extended: false
        }));
        server.use(bodyParser.json({ limit: "500mb" }));
        server.use(express.json()) // for parsing application/json
        server.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded;
        server.use(compression());
        server.use(cors());


        await nextI18next.initPromise
        server.use(nextI18NextMiddleware(nextI18next))



        server.post('/api/liqpay', (req, res) => {
            var liqpay = new LiqPay(public, private);
            var html = liqpay.cnb_form({
                'action': 'pay',
                'amount': req.body.amount,
                'currency': 'UAH',
                'description': 'SimpleDreams',
                'order_id': req.body.number,
                'version': '3'
            });
            res.end(html);
        });

        server.post('/api/sendform', (req, res) => {

            const token = '1146944249:AAGlKsZ4O_Bq2Mb4zU8OGxp3tXrPdNAsfdo';
            const chat = '-323585312';
            let fields = [
                '<b>-----Новый заказ-----</b>',
                '<b> Номер заказа:</b> ' + req.body.number,
                '<b>Оплата:</b>: ' + req.body.payType,
                '<b>ФИО</b>: ' + req.body.fio,
                '<b>Телефон</b>: ' + req.body.phone,
                '<b>Город</b>: ' + req.body.city,
                '<b>Отделение Новой почты</b>: ' + req.body.mailNumber,
                '<b>----------Товары----------</b> ',
                req.body.products,
                '<b>--------------------</b> ',
                '<b>Всего</b>: ' + req.body.total + 'грн',
            ]
            let msg = ''
            //проходимся по массиву и склеиваем все в одну строку
            fields.forEach(field => {
                msg += field + '\n'
            });
            //кодируем результат в текст, понятный адресной строке
            msg = encodeURI(msg)


            axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat}&parse_mode=html&text=${msg}`)
                .then((result) => {
                    res.end(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.end(err);
                })
        })


        server.post('/api/sendforminfo', (req, res) => {

            const token = '1146944249:AAGlKsZ4O_Bq2Mb4zU8OGxp3tXrPdNAsfdo';
            const chat = '-323585312';
            let fields = [
                '<b>-----Новый вопрос-----</b>',
                '<b> Имя :</b> ' + req.body.name,
                '<b>Почта:</b>: ' + req.body.email,
                '<b>----------Вопрос----------</b> ',
                req.body.introduction
            ]
            let msg = ''
            //проходимся по массиву и склеиваем все в одну строку
            fields.forEach(field => {
                msg += field + '\n'
            });
            //кодируем результат в текст, понятный адресной строке
            msg = encodeURI(msg)

            axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat}&parse_mode=html&text=${msg}`)
                .then((result) => {
                    res.end(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.end(err);
                })
        })



        server.get('/', (req, res) => {
            renderAndCache(req, res, '/', {});
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        await server.listen(PORT || 3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

function getCacheKey(req) {
    //TODO clean-up, standardize an url to maximize cache hits
    return req.url
}

async function renderAndCache(req, res, pagePath, queryParams) {
    //TODO add a way to purge cache for a specific url
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    // No cache present for specific key? let's try to render and cache
    try {
        const html = await app.renderToHTML(req, res, pagePath, queryParams);
        // If something is wrong with the request, let's not cache
        // Send the generated content as is for further inspection

        if (dev || res.statusCode !== 200) {
            res.setHeader('x-cache', 'SKIP');
            res.send(html);
            return;
        }

        // Everything seems OK... let's cache
        ssrCache.set(key, html);
        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams);
    }
}