$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="chat__message-list__block" data-message-id="${message.id}">
          <div class="chat__message-list__block__top">
            <div class="chat__message-list__block__top__title">
              ${message.user_name}
            </div>
            <div class="chat__message-list__block__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__message-list__block__main">
            <p class="chat__message-list__block__main__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="chat__message-list__block" data-message-id="${message.id}">
          <div class="chat__message-list__block__top">
            <div class="chat__message-list__block__top__title">
              ${message.user_name}
            </div>
            <div class="chat__message-list__block__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__message-list__block__main">
            <p class="chat__message-list__block__main__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html; 
    };
    
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html =buildHTML(data);
      $('.chat__message-list').append(html);
      $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight});     
      $('form')[0].reset();
      $('.chat__message-form__box__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.chat__message-form__box__btn').prop('disabled', false);
    });
  });
  var reloadMessages = function() {
    last_message_id = $('.chat__message-list__block:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat__message-list').append(insertHTML);
        $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".chat__message-form__box__btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});