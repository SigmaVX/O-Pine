

// X 1) add event listener to view comments
// 2) show modal with comments at top and text box with button at bottom
// 2.a) pass ID into dom id -> grab ID and include as part of AJAX params
// 2.b) create jQ loop to render comments -> show "no comments" if empty
// 3) add route to text box button that adds the comment and keeps modal open

// Get News From Sites
function getNews(){
   
    $.ajax({
        url: "/api/scan",
        type: "GET",
    }).then(function(data) {
        console.log(data);
    });
}

// Add Comments To Modal
function renderComments(id){
    
    $.ajax({
        url: "/api/comments/"+id,
        type: "GET",
    }).then(function(data) {
        console.log("Data Stored: ", data);
        $("#comment-title").text(data.title);
        

        if(data.comments.length === 0){
            $("#comments").text("No Comments");
        } else{

            // Loop Comments Into Rows 
            for(var i=0; i<data.comments.length; i++){
                var newRow = $("<tr>").attr("class", "col-12 text center");
                $("#comments").append(newRow);

                var newComment = $("<td>").text(data.comments[i])
            };
        }
    }); 

    $("#commentModal").modal("show");

};


// Post Comments
function postComment(id){
    var text = $("#user-comment").val().trim();
    console.log("User Comment: ", text);
    if(text.length < 3 || text.length > 500){
        $("#error-text").text("Error: Comments Must Be Between Thee and 500 Characters!")
    } else {

        $.ajax({
            url: "/api/comments/"+id,
            type: "PUT",
            data: text
        }).then(function(data) {
            renderComments(id);
        });
    }

}


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
$("#sync").on("click", function(event){
    event.preventDefault();
    // console.log("Clicked");
    getNews();
})

// Post Comment
$("#submit-btn").on("click", function(event){
    event.preventDefault();
    var id = $(this).attr("data-id");
    // console.log(id);
    postComment(id);
})