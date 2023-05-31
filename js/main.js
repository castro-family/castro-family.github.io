var vid = document.querySelector(".background-video");
var srcv = document.getElementById("sorce");
srcv.src = "video.mp4";
vid.volume = 0.09;
vid.autoplay = true;
vid.load();

var dont = false
var userAgent = navigator.userAgent;
var isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

window.addEventListener('load', function() {
    var loader = document.getElementById('preloader');
    setTimeout(function() {
        // var video_container = document.querySelector('.video-container')
        // var video = document.createElement('video')
        // video.id = "myVideo";
        // video.className = 'background-video';
        // video.volume = 0.09;
        // video.loop = true;
        // video.autoplay = true;
        // var source = document.createElement('source')
        // source.id = 'sorce';
        // source.type = 'video/mp4';
        // source.src = 'video.mp4';
        // video.appendChild(source);
        // video_container.appendChild(video)
        // video.load()
        loader.style.display = 'none';
    }, 2000);
});


var cursor = document.querySelector(".cursor");
var cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove",function(e){
    if (isPhone == true) { return; }
    if (dont == true) { return; }
    cursor.style.display = "none";
    cursor2.style.display = "none";

    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

function checks () {
    var elems = document.querySelectorAll('.content');
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].addEventListener("mouseenter",(e)=>{
            var element1 = document.querySelector(".cursor");
            var element2 = document.querySelector(".cursor2");
            element1.style.display = "none";
            element2.style.display = "none";
            dont = true
        });
        elems[index].addEventListener("mouseleave",(e)=>{
            var element1 = document.querySelector(".cursor");
            var element2 = document.querySelector(".cursor2");
            element1.style.display = "block";
            element2.style.display = "block";
            dont = false
        });
    }
}

setTimeout(checks, 1500)

var xhr = new XMLHttpRequest();
var url = 'http://158.220.100.119:25617/site/items'; // Замените URL на свой

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.length <= 0) {
            return
        }
        for (var i = 0; i < data.length; i++) {
            var element = document.querySelector('.list-items')
            var add_item = document.createElement('div')
            add_item.className = 'item'
            add_item.setAttribute('data-id', i)
            var add_div_img = document.createElement('div')
            add_div_img.className = 'img-block'
            add_item.appendChild(add_div_img)
            var add_img = document.createElement('img')
            add_img.src = data[i].image
            add_div_img.appendChild(add_img)
            var add_div_item_content = document.createElement('div')
            add_div_item_content.className = 'item-content'
            add_item.appendChild(add_div_item_content)
            var h1 = document.createElement('h1')
            h1.innerText = data[i].title
            add_div_item_content.appendChild(h1)
            var p = document.createElement('p')
            p.innerText = data[i].desc
            add_div_item_content.appendChild(p)
            var a = document.createElement('a')
            a.classList = 'content'
            a.href = "#"
            a.innerHTML = '<i class="fa fa-cloud-download" aria-hidden="true"></i> Скачать'
            add_div_item_content.appendChild(a)
            element.appendChild(add_item)
        }
        var not_error = document.querySelector('.no-items')
        not_error.style.display = 'none'
        var element = document.querySelector('.list-items')
        element.style.display = 'block'
        var element = document.querySelector('.mainH1')
        element.style.display = 'block'
    })
    .catch(function(error) {
        console.log('Ошибка:', error);
    });
