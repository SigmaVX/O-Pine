

// X 1) add event listener to view comments
// 2) show modal with comments at top and text box with button at bottom
// 2.a) pass ID into dom id -> grab ID and include as part of AJAX params
// 2.b) create jQ loop to render comments -> show "no comments" if empty
// 3) add route to text box button that adds the comment and keeps modal open


function renderComments(id){
    
    $.ajax({
        url: "/comments/"+id,
        type: "GET",
    }).then(function(data) {
        console.log("Data Stored: ", data);

        // add jQ for looping 
        for(var i=0; i<data.length; i++){
            var newRow = $("<tr>").attr("class", "col-12 text center");
            $("#comments").append(newRow);

            var newComment = $("<td>").text("data[i]")
        };
    }); 

    $("#commentModal").modal("show");

};



$(".comment-btn").on("click", function(event){
    event.preventDefault();
    var id = $(this).attr("id");
    // console.log(id);
    $("#commentModal").attr("data-id", id);
    $("#submit-btn").attr("data-id", id);
    renderComments(id);
});
