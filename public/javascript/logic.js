 
// Get News From Sites
function getNews(){
   
    $.ajax({
        url: "/api/scan",
        type: "GET",
    }).then(function(data) {
        // console.log(data);
    });
};

// Add Comments To Modal
function renderComments(id){
    
    $.ajax({
        url: "/api/comments/"+id,
        type: "GET",
    }).then(function(data) {
        // console.log("Data Stored: ", data);
        // console.log("Number Of Data Comments: ", data.comments.length);
        $("#comment-title").text(data.title);
        
        if(data.comments.length < 1){
            $("#comments").text("No Comments");
        } else{

            // Loop Comments Into Rows 
            for(var i=0; i<data.comments.length; i++){
                var newPost = $("<div>").attr("class", "col-12 text center");
                $(newPost).text(data.comments[i]);
                $("#comments").append(newPost);

            };
        };
    }); 

    $("#commentModal").modal("show");

};


// Post Comments
function postComment(id){
    var text = $("#user-comment").val().trim();
    // console.log("User Comment: ", text);

    var sendObject = {
        userComment: text
    };

    if(text.length < 3 || text.length > 500){
        $("#error-text").text("Error: Comments Must Be Between Thee and 500 Characters!")
    } else {

        var sendObject = {
            userComment: text
        };

        $("#user-comment").val("");

        $.ajax({
            url: "/api/comments/"+id,
            type: "PUT",
            data: sendObject
        }).then(function(data) {
            var newPost = $("<div>").attr("class", "col-12 text center");
            $(newPost).text(text);
            $("#comments").append(newPost);
        });
    };
};


// Event Listeners
// ======================================================

// Comment Button - Render Comments
$(".comment-btn").on("click", function(event){
    event.preventDefault();
    var id = $(this).attr("id");
    // console.log(id);
    $("#commentModal").attr("data-id", id);
    $("#submit-btn").attr("data-id", id);
    renderComments(id);
});

// Sync Icon - Refresh News
$("#sync").one("click", function(event){
    event.preventDefault();
    // console.log("Clicked");
    getNews();
    $("#refresh-text").text("News Updated");
    $("#sync").css("background-color", "#aaaaaa");
    $(this).prop('disabled', true);
});

// Post Comment
$("#submit-btn").on("click", function(event){
    event.preventDefault();
    var id = $(this).attr("data-id");
    // console.log(id);
    postComment(id);
});