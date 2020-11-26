window.onload = function() {
  function getNode(bl) {return document.getElementById(bl);}
  Element.prototype.vis = function() {this.classList.add("visible");}
  Element.prototype.unvis = function() {this.classList.remove("visible");}

  function selectEmployee(block) {
    getNode("card").vis();
    [].forEach.call(document.getElementsByClassName("employee"), el => el.unvis());
    block.vis();
    var index = [].indexOf.call(block.parentElement.children, block);
    getNode("employeeImg").src = employees[index].photo;
    getNode("employeeName").innerText = employees[index].name;
    getNode("employeePost").innerText = employees[index].post;
    getNode("employeeEmail").innerText = employees[index].email;
   
  }

  function removeEmployee() {
    var bool = confirm("Ви впевнені, що хочете видалити дані про працівника?");
    if (bool) {
      var block = this.parentElement.parentElement;
      var index = [].indexOf.call(block.parentElement.children, block);
      fetch('https://jsonplaceholder.typicode.com/posts/'+(index+1), {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        employees.splice(index, 1);
        block.remove();
        var blocks = document.getElementsByClassName("employee");
        if (blocks.length) selectEmployee(blocks[0]);
        else getNode("card").unvis();
      });
    }
  }

  function editEmployee() {
    var block = this.parentElement.parentElement;
    var index = [].indexOf.call(block.parentElement.children, block);
    els.name.value = employees[index].name;
    els.post.value = employees[index].post;
    els.email.value = employees[index].email;
   
    getNode("photo").src = employees[index].photo;
    getNode("overflow").vis();
    getNode("title").innerText = "Редагувати працівника";
    getNode("submit").innerText = "Редагувати";
    edit.change = true;
    edit.index = index;
  }

  var form = document.forms['employeeData'];
  var els = form.elements;
  var employees = [];
  var lastImgURL;
  var edit = {
    change: false,
    index: 0,
  }

  getNode("add").addEventListener("click",function(){
    getNode("overflow").vis();
    getNode("title").innerText = "Додати нового працівника";
    getNode("submit").innerText = "Додати";
    getNode("photo").src = "images/portrait.png";
    [].forEach.call(els, function(el){el.value = ""});
    edit.change = false;
  });
  getNode("overflowDark").addEventListener("click",function(){
    getNode("overflow").unvis();
  });

  getNode("photoInput").addEventListener("input", function() {
    var file = this.files[0];
    var img = getNode("photo");
    var reader = new FileReader();
    reader.onload = function(event) {
      img.src = event.target.result;
      lastImgURL = img.src;
      var w = img.width, h = img.height;
    }
    reader.readAsDataURL(file);
    console.log(file);
  });

  form.addEventListener("submit",function(event){
    event.preventDefault();
    if (!((form.photo.files.length || edit.change) && els.name.value && els.post.value)) {alert("Вкажіть ПІБ, посаду та виберіть фотографію працівника"); return;}
    if (form.photo.files.length) var ph = form.photo.files[0].name;
    else ph = "";
    var link = 'https://jsonplaceholder.typicode.com/posts';
    var method = 'POST';
    if (edit.change) {
      link += '/'+(edit.index+1);
      method = 'PUT';
    }
    fetch(link, {
      method: method,
      body: JSON.stringify({
        name: els.name.value,
        post: els.post.value,
        email: els.email.value,
        photo: ph
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      if (els.photo.value) json.photo = lastImgURL;
      else json.photo = getNode("photo").src;
      if (!edit.change) {
        employees.push(json);
        var li = document.createElement("div");
        var remove = document.createElement("div");
        li.innerText = json.name;
        li.classList.add("employee");
        li.classList.add("flexed");
        li.innerHTML = '<span>'+json.name+'</span><div class="flexed"><div class="option edit" title="Редагувати">✏</div><div class="option remove" title="Видалити">×</div></div>';
        li.getElementsByClassName("remove")[0].addEventListener("click", removeEmployee, false);
        li.getElementsByClassName("edit")[0].addEventListener("click", editEmployee, false);
        document.getElementsByClassName("list")[0].append(li);
        li.addEventListener("click", function(e){
          if (e.target === this)
          selectEmployee(this);
        }, false);
      } else {
        employees[edit.index] = json;
        var li = document.getElementsByClassName("employee")[edit.index];
        li.children[0].innerText = json.name;
        li.click();
      }
      console.log(employees);
      getNode("overflowDark").click();
      li.click();
    });
  });

}
