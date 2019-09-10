
$( "button" ).click(function() {
    let commentID = $(this).val();
    console.log(commentID)

    $.ajax({
        method: "POST",
        url: "/articles/" + commentID,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
    });
    $("#titleinput").empty()
    $("#bodyinput").empty()
  });