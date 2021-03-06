//============================
// CAMERA POST FORM
//============================
$$('.photoGet').on('click', function () {
    photoOptions();
});
$$(document).on('click', '.ui-state-disabled', function (e) {
    photoOptions();
});
$$(document).on('click', '#camera_sort .fa-times-circle', function (e) {
    var $el = $(this).closest("li");
    $el.fadeOut("fast", function () {
        $('#camera_sort').append('<li class="ui-state-disabled ui-state-default"><div><i class="fa fa-plus-circle"></i></div></li>');
        $el.remove();
    });
});
function photoGet(gallery) {
    var type, cb;
    if (typeof gallery === "undefined") {
        type = navigator.camera.PictureSourceType.PHOTOLIBRARY
    } else {
        type = navigator.camera.PictureSourceType.CAMERA
    }
    navigator.camera.getPicture(photoAdd, function (message) {
        //alert('get picture failed');
    }, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: type,
        quality: 50,
        allowEdit: true,
        targetWidth: 600,
        targetHeight: 600,
        saveToPhotoAlbum: true,
        popoverOptions: true
    });
}
function photoUpload(array, n) {

    if (typeof n === "undefined") {
        var n = 0;
    }
    // end of upload
    if (n > 5 || typeof array[n] === "undefined") {
        window.location.href = "index.html";
        return;
    }

    var imageURI = array[n];
    // se =0, imagem não alterada
    if (imageURI === 0) {
        n = parseInt(n + 1);
        photoUpload(array, n);
        return;
    }

    myApp.showIndicator();

    // file data
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    alert(n + " = " + imageURI);

    // user data
    var params = new Object();
    params.user_id = localStorage.user_id;
    params.user_email = localStorage.user_email;
    params.user_pass = localStorage.user_pass;
    params.post_id = sessionStorage.post_id; // postSend()...
    params.img_pos = n;
    params.img_fn_original = encodeURI(imageURI);
    options.params = params;
    options.chunkedMode = false;

    // transfer
    var ft = new FileTransfer();
    ft.upload(imageURI, localStorage.server + "/post_upload.php", function (result) {
        myApp.hideIndicator();
        n = parseInt(n + 1);
        photoUpload(array, n);
    }, function (error) {
        myApp.hideIndicator();
    }, options);
}
function photoAdd(imageURI) {

    var id = Math.floor(Math.random() * 9999999) + 1111111;
    var fn = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    var dir = 'file:///storage/emulated/0/Android/data/br.com.nickford.adsapp/cache/';
    renameFile(fn, dir, id + ".jpg", renameSuccess);
    var fn_new = dir + id + ".jpg";
    alert("fn_new=" + fn_new + " => fn=" + fn + " => dir=" + dir);
    imageURI = fn_new;

    // active page
    if (sessionStorage.activePage !== "post_form") {
        sessionStorage.imageURI = imageURI;
        go("post_form.html");
    }
    // add photo
    else {
        var x;
        for (x = 0; x <= 5; x++) {
            var $el = $('#camera_sort li').eq(x);
            if ($el.css("background-image") === "none") {
                $el.css({"background-image": "url(" + imageURI + ")"});
                $el.attr("data-upload", imageURI);
                $el.removeClass("ui-state-disabled");
                $el.find("i").removeClass("fa-plus-circle").addClass("fa-times-circle");
                return;
            }
        }
    }
}
function photoOptions() {
    myApp.actions([
        [
            {
                text: 'Escolha uma opção',
                label: true
            },
            {
                text: 'CÂMERA',
                bold: true,
                color: "pink",
                onClick: function () {
                    photoGet(true);
                }
            },
            {
                text: 'GALERIA DE FOTOS',
                bold: true,
                color: "pink",
                onClick: function () {
                    if (!isApp) {
                        go("post_form.html");
                        return;
                    }
                    photoGet();
                }
            }
        ],
        [
            {
                text: 'Cancelar',
                bold: false
            }
        ]
    ]);
}
function postUpload() {
    //alert("upload-0");
    var x;
    var arr = [];
    for (x = 0; x <= 5; x++) {
        var $el = $('#camera_sort li').eq(x);
        var fn = $el.attr("data-upload");
        if (typeof fn !== "undefined") {
            arr.push(fn);
        } else {
            arr.push(0);
        }
    }
    //alert("upload-1");
    photoUpload(arr);
}


//=================================
// CAMERA USER FORM
//=================================
$$(document).on('click', '#userCamera', function (e) {

    myApp.actions([
        [
            {
                text: 'Escolha uma opção',
                label: true
            },
            {
                text: 'CÂMERA',
                bold: true,
                color: "pink",
                onClick: function () {
                    userCameraGet(true);
                }
            },
            {
                text: 'GALERIA DE FOTOS',
                bold: true,
                color: "pink",
                onClick: function () {
                    userCameraGet();
                }
            }
        ],
        [
            {
                text: 'Cancelar',
                bold: false
            }
        ]
    ]);
});
function userCameraGet(gallery) {
    var type;
    if (typeof gallery === "undefined") {
        type = navigator.camera.PictureSourceType.PHOTOLIBRARY
    } else {
        type = navigator.camera.PictureSourceType.CAMERA
    }
    navigator.camera.getPicture(userCameraShow, function (message) {
        alert('get picture failed: ' + message);
    }, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: type,
        quality: 75,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300,
        saveToPhotoAlbum: true,
        popoverOptions: true
    });
}
function userCameraShow(imageURI) {
    //alert(imageURI);
    //$("#post_camera").attr("src", imageURI);
    $("#profileImgBg").css("background-image", "url(" + imageURI + ")");
    $("#profileImgFront").css("background-image", "url(" + imageURI + ")");
    $("#userForm [name='user_img']").val(imageURI);
}
function userCameraUpload(imageURI) {
    //alert(imageURI);
    myApp.showIndicator();
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    //alert(JSON.stringify(options.fileName));
    var params = new Object();

    // user data
    params.user_id = localStorage.user_id;
    params.user_email = localStorage.user_email;
    params.user_pass = localStorage.user_pass;
    options.params = params;
    options.chunkedMode = false;
    //alert(localStorage.server);
    var ft = new FileTransfer();
    ft.upload(imageURI, localStorage.server + "/user_upload.php", function (result) {
        //alert("ok="+result.response);
        myApp.hideIndicator();
        userUpdate(result.response);
    }, function (error) {
        myApp.hideIndicator();
        alert(JSON.stringify(error));
    }, options);
}

//the function
function renameFile(currentName, currentDir, newName, successFunction) {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

        fileSystem.root.getFile(currentDir + currentName, null, function (fileEntry) {
            fileSystem.root.getDirectory(currentDir, {create: true}, function (dirEntry) {
                parentEntry = new DirectoryEntry(currentName, currentDir + currentName);

                fileEntry.copyTo(dirEntry, newName, function () {

                    successFunction();

                }, renameFail);
            }, renameFail);
        }, renameFail);

    }, renameFail);
}

//and the sample success function
function renameSuccess() {
    alert('renamed!');
}

//and the sample fail function
function renameFail(error) {
    alert('failed=' + JSON.stringify(error));
}