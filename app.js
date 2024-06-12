const express = require('express');
const app = express();
const path = require('path')
const userModal = require('./models/users')

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/create', async (req,res) => {
    let {name, email, image} = req.body;
    let createduser = await userModal.create({
        username : name,
        email,
        image
    })

    res.redirect('/read');
})

app.get('/read', async (req,res) => {
    let users = await userModal.find();
    res.render('read' , {users: users})
})

app.get('/delete/:id', async (req,res) => {
    let users = await userModal.findOneAndDelete({ _id: req.params.id});
    res.redirect('/read')
})

app.get('/edit/:id', async (req,res) => {
    let users = await userModal.findOne({ _id: req.params.id });
    res.render('edit', {users})
})

app.post('/update/:id', async (req,res) => {
    let {name, email, image} = req.body
    let users = await userModal.findOneAndUpdate({ _id: req.params.id }, {username: name, email, image}, {new: true});
    res.redirect('/read')
})

app.listen(3000);