function getChatList() {
    //
    debug();
    //
    if (halt(true))
        return;
    var fN = fName();
    //
    if ($('.showChat').length === 0) {
        //myApp.showIndicator();
    }
    dbx('SELECT * FROM chat INNER JOIN contact ON contact.num=chat.chat_num WHERE chat.chat_from = "me" OR chat.chat_to = "me" GROUP BY chat_num ORDER BY id DESC', function (transaction, result) {

        if (result.rows.length > 0) {
            $('#nenhumacon').hide();
        }

        // FIX FIELDS FOR IPHONE
        var res = [];
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            res[i] = {
                id: row['id'],
                name: row['name'],
                num: row['num'],
                id_fb: row['id_fb'],
                chat_from: row['chat_from'],
                chat_to: row['chat_to'],
                chat_msg: row['chat_msg']
            };
        }
        // construct
        var x = 0;
        var html = '';
        var fb, url, vc, nome;
        $.each(res, function (i, item) {
            var rs = res[i];
            console.log("aaa:" + enc(res[i]));
            if (rs.chat_from !== "me") {
                //fb = rs.srcFb;
                vc = "";
                //nome = rs.srcNome;
            }
            else {
                //fb = rs.dstFb;
                vc = "<em>Você:</em> ";
                //nome = rs.dstNome;
            }
            url = "https://graph.facebook.com/" + rs.id_fb + "/picture?type=large";
            //
            html += '<li class="showChat swipeout" data-fb="' + rs.id_fb + '" data-num="' + rs.num + '" data-name="' + rs.name + '">'; // row
            html += '<div class="swipeout-content">';
            html += '<a href="#" class="item-link item-content">';
            html += '<div class="item-media">';
            html += '<img src="' + url + '" style="width:42px !important;height:42px !important"/>';
            html += '</div>';
            html += '<div class="item-inner">';
            html += '<div class="item-title-row">';
            html += '<div class="item-title">' + rs.name + '</div>';
            html += '<div class="item-after">';
            //html += '<div class="chip" style="margin-top:-5px;background:#0288d1;color:#fff;font-size:12px;font-weight:100">';
            //html += '<div class="chip-label">5</div>';
            //html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="item-text" style="font-weight:100">' + vc + rs.chat_msg + '</div>';
            html += '</div>';
            html += '</a>';
            html += '</div>';
            html += '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Responder</a><a href="#" class="demo-forward bg-blue">Repray</a></div>';
            html += '<div class="swipeout-actions-right"><a href="#" class="demo-actions">Mais</a><a href="#" class="demo-mark bg-orange">Fav</a><a href="#" data-confirm="Are you sure you want to delete this item?" class="swipeout-delete swipeout-overswipe">Denunciar</a></div>';
            html += '</li>'; // row
            //sessionStorage.lastchat = rs.id; // last chat id
        });
        $('#getChatList').html(html);


    });
    /*
     $.ajax({
     url: localStorage.server + "/chat-list.json.php",
     data: {
     'user_id': localStorage.user_id,
     'startdate': sessionStorage.session_startdate,
     'lastchat': sessionStorage.lastchat
     },
     type: 'GET',
     dataType: 'jsonp',
     jsonp: 'callback',
     timeout: 7000
     })
     .always(function () {
     s.removeItem(fN); // halt
     myApp.hideIndicator();
     })
     
     .fail(function () {
     myApp.alert('Desculpe, verifique sua conexão e tente novamente.', 'Erro');
     })
     
     .done(function (res) {
     if (res !== null) {
     if (res.error) {
     myApp.alert('Desculpe, ocorreu um erro interno.' + res.error, 'Erro');
     return;
     }
     
     if (typeof res.length !== "undefined") {
     console.log(res.length + " results");
     }
     
     // construct
     var x = 0;
     var html = '';
     var fb, url, vc, nome;
     $.each(res, function (i, item) {
     
     if (res[i].dstId === localStorage.userid) {
     fb = res[i].srcFb;
     vc = "";
     nome = res[i].srcNome;
     }
     else {
     fb = res[i].dstFb;
     vc = "<em>Você:</em> ";
     nome = res[i].dstNome;
     }
     url = "https://graph.facebook.com/" + fb + "/picture?type=large";
     //
     html += '<li class="showChat swipeout" data-id-user-dst="' + res[i].dstId + '" data-id-pair="' + res[i].id_pair + '" data-nome="' + nome + '">'; // row
     html += '<div class="swipeout-content">';
     html += '<a href="#" class="item-link item-content">';
     html += '<div class="item-media">';
     html += '<img src="' + url + '" style="width:42px !important;height:42px !important"/>';
     html += '</div>';
     html += '<div class="item-inner">';
     html += '<div class="item-title-row">';
     html += '<div class="item-title">' + nome + '</div>';
     html += '<div class="item-after">';
     html += '<div class="chip" style="margin-top:-5px;background:#0288d1;color:#fff;font-size:12px;font-weight:100">';
     html += '<div class="chip-label">5</div>';
     html += '</div>';
     html += '</div>';
     html += '</div>';
     html += '<div class="item-text" style="font-weight:100">' + vc + res[i].msg + '</div>';
     html += '</div>';
     html += '</a>';
     html += '</div>';
     html += '<div class="swipeout-actions-left"><a href="#" class="bg-green swipeout-overswipe demo-reply">Responder</a><a href="#" class="demo-forward bg-blue">Repray</a></div>';
     html += '<div class="swipeout-actions-right"><a href="#" class="demo-actions">Mais</a><a href="#" class="demo-mark bg-orange">Fav</a><a href="#" data-confirm="Are you sure you want to delete this item?" class="swipeout-delete swipeout-overswipe">Denunciar</a></div>';
     html += '</li>'; // row
     sessionStorage.lastchat = res[i].id; // last chat id
     });
     $('#getChatList').html(html);
     
     
     } // res not null
     }); // after ajax
     */
}
function getChat() {
    //
    debug();
    //
    if (halt(true))
        return;
    var fN = fName();
    //
    if ($('.message').length === 0) {
        //myApp.showIndicator();
    }
    
    $('#getChat').html("");

    var myMessages = myApp.messages('.messages');
    var myMessagebar = myApp.messagebar('.messagebar');

    var t = "";
    t += "<div style='font-size:12px;position:relative'><div style='position:absolute;top:100px;background:#000;color:#fff;opacity:0.8;font-size:24px'>R$ 350,00</div>"; // post
    t += "<img src='http://nickford.com.br/adsapp/img/724432198.jpg' mmax-width='90%' />";
    t += "<div style='margin-top:5px;font-weight:bold'>Saiba como ficar rico em 5 minutos</div>";
    t += "<div style='margin-top:5px;'>Uma nova técnica foi disponibilizada para pessoas comuns ganharem dinheiro dentro de casa</div>";
    t += '<p class="buttons-row">';
    t += '<a href="#" class="button button-raised button-fill color-indigo"><i class="fa fa-facebook-official" aria-hidden="true"></i> 1/32</a>';
    t += '<a href="#" class="button button-raised button-fill color-pink"><i class="fa fa-instagram" aria-hidden="true"></i> 8/12</a>';
    t += '<a href="#" class="button button-raised button-fill color-green"><i class="fa fa-comments-o" aria-hidden="true"></i> 12</a>';
    t += '</p>';
    t += "</div>"; // post

    myMessages.addMessage({
        text: t,
        avatar: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg',
        type: 'sent',
        date: 'Agora'
    });

    dbx('SELECT * FROM chat WHERE chat.chat_num = "' + sessionStorage.chatNum + '" ORDER BY id ASC', function (transaction, result) {

        //console.log(result.rows);

        // FIX FIELDS FOR IPHONE
        var res = [];
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            res[i] = {
                id: row['id'],
                name: row['name'],
                num: row['num'],
                id_fb: row['id_fb'],
                chat_from: row['chat_from'],
                chat_to: row['chat_to'],
                chat_msg: row['chat_msg']
            };
        }

        // construct
        var x = 0;
        var html = '';
        var fb, url, vc, nome;

        $.each(res, function (i, item) {

            var rs = res[i];

            if (rs.chat_from === "me") {

                myMessages.addMessage({
                    text: rs.chat_msg,
                    avatar: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg',
                    type: 'sent',
                    date: 'Agora'
                });
            }
            else {
                myMessages.addMessage({
                    text: rs.chat_msg,
                    avatar: sessionStorage.chatFbLink,
                    type: 'received',
                    date: 'Agora'
                });

            }

        });
    });


    /*
     $.ajax({
     url: localStorage.server + "/chat-read.json.php",
     data: {
     'username': localStorage.username,
     'userpass': localStorage.userpass,
     'startdate': sessionStorage.session_startdate,
     'id_pair': sessionStorage.id_pair,
     'lastchat': sessionStorage.lastchat_inner
     },
     type: 'GET',
     dataType: 'jsonp',
     jsonp: 'callback',
     timeout: 5000
     })
     .always(function () {
     s.removeItem(fN); // halt
     myApp.hideIndicator();
     })
     
     .fail(function () {
     myApp.alert('Desculpe, verifique sua conexão e tente novamente.', 'Erro');
     })
     
     .done(function (res) {
     if (res !== null) {
     if (res.error) {
     myApp.alert('Desculpe, ocorreu um erro interno.', 'Erro');
     return;
     }
     
     if (typeof res.length !== "undefined") {
     console.log(res.length + " results");
     }
     
     // construct
     var x = 0;
     var html = '';
     var fb, url, vc, nome;
     $.each(res, function (i, item) {
     
     fb = res[i].srcFb;
     nome = res[i].srcNome;
     url = "https://graph.facebook.com/" + fb + "/picture?type=large";
     // enviado
     if (res[i].srcId === localStorage.userid) {
     html += '<div class="message message-sent">';
     //html += '<div class="message message-sent message-with-avatar">';
     html += '<div class="message-text">' + res[i].msg;
     html += '<div class="message-date"><!--<div style="float:left"><i class="fa fa-clock-o"></i></div>-->12:59</div>';
     html += '</div>';
     //html += '<div style="background-image:url(' + url + ')" class="message-avatar"></div>';
     html += '</div>';
     }
     // recebido
     else {
     //html += '<div class="message message-received message-with-avatar">';
     html += '<div class="message message-received">';
     //html += '<div class="message-name">' + nome + '</div>';
     html += '<div class="message-text">' + res[i].msg;
     html += '<div class="message-date">Feb 9, 13:11</div>';
     html += '</div>';
     //html += '<div style="background-image:url(' + url + ')" class="message-avatar"></div>';
     html += '</div>';
     }
     sessionStorage.lastchat_inner = res[i].id;
     console.log("lastchat_inner:" + sessionStorage.lastchat_inner);
     if (res.length === parseInt(i + 1)) {
     $("html, body, .page-content, .messages").animate({scrollTop: $(document).height()}, 1000);
     }
     });
     $('#getChat').append(html);
     
     } // res not null
     }); // after ajax
     */
}

$$(document).on('pageBeforeInit', '[data-page="messages"]', function (e) {
    $('#toolbar').hide();
});

$$(document).on('pageInit', '[data-page="messages"]', function (e) {
    getChat();
});

$$(document).on('click', '.showChat', function (e) {
    return false;
    sessionStorage.chatNum = $(this).attr("data-num");
    sessionStorage.chatNome = $(this).attr("data-name");
    sessionStorage.chatFb = $(this).attr("data-fb");
    sessionStorage.chatFbLink = "http://graph.facebook.com/" + sessionStorage.chatFb + "/picture?type=square";
    view3.router.loadPage('chat.html', {ignoreCache: true});
});

$$(document).on('pageBeforeInit', '[data-page="post"]', function (e) {

});
