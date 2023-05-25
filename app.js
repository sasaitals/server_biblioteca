const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const db = require('./database')
const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    session({
        secret: '123@123abc',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }),
)
app.use(flash())
app.get('/', function (req, res, next) {
    res.render('index', { title: 'User Form' })
})
app.post('/user_form', function (req, res, next) {
    let nome_do_livro = req.body.nome_do_livro
    let autor = req.body.autor
    let categoria = req.body.categoria
    let editora = req.body.editora
    let data_pub = req.body.data_pub
    let preco_livro = req.body.preco_livro
    let sql = `INSERT INTO livros (nome_do_livro, autor, categoria, editora, data_pub) VALUES ("${nome_do_livro}", "${autor}", "${categoria}", "${editora}", "${data_pub}")`
    db.query(sql, function (err, result) {
        if (err) throw err
        console.log('Registro atualizado')
        req.flash('success', 'Dado armazenado!')
        res.redirect('/')
    })
})
app.use(function (req, res, next) {
    next(createError(404))
})
app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})
app.listen(5555, function () {
    console.log('Servidor está rodando na porta : 5555')
})
module.exports = app