<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fetch API sandbox</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
</head>
<body>

  <ul>
    <li><a href="top.html">コース作成機能はこちら</a></li>
  </ul>

  <div id="top">
    <h1>ページTOP</h1>
    <p>コース閲覧機能</p>
  </div>

  <hr>

  <div class="container">
    <h1 class="display-4 mb-4">Fetch API Sandbox</h1>
    
    <div class="d-flex">
      <button class="btn btn-primary mr-4" id="getText">Get text</button>
      <button class="btn btn-success mr-4" id="getUsers">Get JSON</button>
      <button class="btn btn-warning" id="getPosts">Get Posts</button>
    </div>
    
    <hr>
    
    <div id="output"></div>
    
    <form id="addPost">
      <div class="form-group mb-3">
        <input type="text" id="title" class="form-control" placeholder="Title">
      </div>
      <div class="form-group mb-3">
        <textarea id="body" class="form-control" placeholder="Body"></textarea>
      </div>
      <input type="submit" class="btn btn-secondary" value="Submit">
    </form>
  </div>

  <ul>
    <li><a href="contact.html#contact">お問い合わせはこちら</a></li>
  </ul>

  <script>
    document.getElementById('getText').addEventListener('click', getText);
    document.getElementById('getUsers').addEventListener('click', getUsers);
    // getPostsのイベントリスナーは元からありました
    document.getElementById('getPosts').addEventListener('click', getPosts);
    document.getElementById('addPost').addEventListener('submit', addPost);

    function getText(){
      fetch('sample.txt')
      .then((res)=>res.text())
      .then((data)=> {
        document.getElementById('output').innerHTML = data;
      })
      .catch((err) => console.log(err))
    }

    function getUsers(){
      fetch('users.json')
      .then((res)=>res.json())
      .then((data)=>{
        let output = '<h2 class="mb-4">Users</h2>';
        data.forEach(function(user){
          output += `
          <ul class="list-group mb-3">
            <li class="list-group-item">ID: ${user.id}</li>
            <li class="list-group-item">Name: ${user.name}</li>
            <li class="list-group-item">Email: ${user.email}</li>
          </ul>
          `;
        });
        document.getElementById('output').innerHTML = output;
      })
    }

    function getPosts(){
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res)=>res.json())
      .then((data)=>{
        let output = '<h2 class="mb-4">Posts</h2>';
        data.forEach(function(post){
          output += `
          <div class="card card-body mb-3">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>
          `;
        });
        document.getElementById('output').innerHTML = output;
      })
    }

    function addPost(e){
      e.preventDefault();

      let title = document.getElementById('title').value;
      let body = document.getElementById('body').value;

      fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json'
        },
        // 💥 修正: body,body を body:body に変更 💥
        body:JSON.stringify({title:title, body:body}) 
      }).then((res)=>res.json())
      .then((data)=>console.log(data))
    }

  </script>
</body>
</html>