var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Home', posts: posts.post });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact'});
});


/* GET Create post. */
router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  // res.(req.body);
  let obj = {
    "title" : req.body.title,
    "author" : req.body.author,
    "date" : req.body.date,
    "content" : req.body.content,
    "story" : req.body.story
  }

  request.post({
    url: 'http://localhost:8000/post',
    body: obj,
    json: true
  },function (error, response, body) {
      res.redirect('/index');
  });
});


router.get('/post/:id', function(req,res,next){
  let urlPath = req.path;
  let postId = urlPath.slice(-1);
  res.render('blog', {
    posts: posts.post[postId -1]
  })
});

router.get('/delete/:id', function(req,res,next){
  request ({
    url: "http://localhost:8000/post/" + req.params.id,
    method: "Delete",
  }, function(error, response, body){

    res.redirect('/index');
  });
});

/* GET Create post. */
router.get('/edit', function(req, res, next) {
  res.render('edit');
});



/* GET contact us */
router.get('/archive', function(req, res, next) {
  res.render('archive', { posts: posts.post });
});

/* GET sign in. */
router.get('/signin', function (req, res, next) {
  res.render('signin', {
    title: "Signin",
    posts: posts.posts,
    users: posts.users,
    message: false
  });

});
router.post('/signin', function (req, res, next) {
  var users = posts.users;
  console.log(users);

  var username = req.body.username;
  var password = req.body.password;

  // console.log("Username: "+username+"======="+" Password: "+password);
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user);
        if (username === user.username &&  password == user.password) {
      res.redirect('/signin');
    } else {
      continue;
    }
  
  }
});


router.get('/signup', function(req, res, next){
  res.render('signup', {
    title: 'Sign Up'
  });
});

//GET SIGNUP PAGE
router.post('/signup', function (req, res, next) {
var id = posts.users[posts.users.length-1].id + 1;


var obj = {
  "id": req.body.id,
  "username": req.body.username,
  "password": req.body.password,
  "email": req.body.email
}
request.post({

  url: "http://localhost:8000/users",
  body: obj,
  json: true

}, function (error, response, body) {
res.redirect('/index');

});
});

module.exports = router;
