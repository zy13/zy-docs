let btnElement = document.querySelector('.btn');
let uploadElement = document.querySelector('#upload');
let contentListElement = document.querySelector('.content-list');
let taskBodyElement = document.querySelector('.task_body');

// 点击btn触发upload，显示上传对话框
btnElement.onclick = function () {
    uploadElement.click();
}

// 监听uploadElement的change事件，开始通过xhr进行上传
uploadElement.onchange = function () {

    // 通过xhr来完成上传（请求）
    let xhr = new XMLHttpRequest();

    xhr.open('post', '/upload', true);

    // urlencode: k1=v1&k2=v2....
    // json: {"k1": "v1", "k2": "v2"}
    // form-data: 

    //     xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundaryyb1zYhTI38xpQxBK');
    //     xhr.send(`
    // ----WebKitFormBoundaryyb1zYhTI38xpQxBK

    // Content-Disposition: form-data; name="name"
    // 123

    // ----WebKitFormBoundaryyb1zYhTI38xpQxBK
    //     `);

    //  文件
    // console.log(this.files.item(0));

    let fd = new FormData();
    fd.append('name', 'zmouse');
    fd.append('age', 36);
    fd.append('attachment', this.files.item(0));


    let liElement = document.createElement('li');
    let uploadFileNameElement = document.createElement('span');
    let taskProgressStatusElement = document.createElement('div');
    taskProgressStatusElement.classList.add('task-progress-status');
    taskProgressStatusElement.innerHTML = '0%';
    let progressElement = document.createElement('div');
    progressElement.classList.add('progress');
    progressElement.style.width = '0%';

    liElement.appendChild(uploadFileNameElement);
    liElement.appendChild(taskProgressStatusElement);
    liElement.appendChild(progressElement);

    taskBodyElement.appendChild(liElement);

    xhr.upload.onprogress = function (e) {
        // console.log('e', e);
        let v = (e.loaded / e.total * 100).toFixed(2);
        taskProgressStatusElement.innerHTML = progressElement.style.width = `${v}%`;
    }

    xhr.onload = function () {
        // ....
        let img = new Image();
        img.src = xhr.responseText;
        contentListElement.appendChild(img);
    }

    // 事件的监听应该在事件触发之前进行注册
    xhr.send(fd);
}