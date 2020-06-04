// Main Javascript file for  ed portal

//Adding scrollspy to the pages like about
$('body').scrollspy({ target: '#spy', offset:280});

//Calculate the position of scroll for
$(window).on('load',function(){
    calcScrollLocation();
});

$(window).scroll(function() {    
    calcScrollLocation();
}); 

function calcSidebarHeight(){
    var height = $(".module-content").outerHeight();
    $(".sidebar").height(height);
};

function calcScrollLocation(){
    var scroll = $(window).scrollTop();
}

$('a.feedback_mail').on('click', function(){
    window.location.href = "mailto:odpfeedback@ed.gov";
});

$(document).ready(function(){

    //Checks the page name via page tag
    var page = $('body').find('.page-home').text();

    /* Particles js for homepage */
    if(page=="home"){
        renderParticles();
    }


    //Showing scrollbar on specific page for devices larger than 768px
    if(page=="search" || page=="publisher_listing"){
        if ($(window).width() >= 768) {
            new SimpleBar($('#scrollbar')[0]);
        }

        $("p.module-content.empty").attr("tabindex","0");
    }

    if(page=="dataset"){
        //Changing navicons programatiically 
        $(".view_list").html("view_list");
        $(".info").html("info");
        $(".add_comment").html("add_comment");
        $(".bar_chart").html("bar_chart");
        $(".supervisor_account").html("supervisor_account");
    }


    //Subpage 
    var subpage = $('body').find('.page-name-sub').text();

    if(subpage=="data"){
        $(".nav-tabs > li:first-child").addClass("active");
    }

    var navHeight = $("#nav-wrapper").outerHeight();
    $("body").css("paddingTop",navHeight);


    /* Tab fixes */
    $('a[data-module="api-info"]').click(function(event) {
        restrictTab();
    });

    $("body").on('click','button[data-dismiss="modal"]', function(event){
        continueTab();
    })
}); 

//Escape button for modal close - Tab fixes
$(document).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
        continueTab();
    }
});

//Backdrop click for modal close - Tab fixes
$(document).click(function (e) {
    if (e.target === $('.modal')[0] && $('body').hasClass('modal-open')) {
        continueTab();
    }
});


//Restricting tab to circle inside modal
function restrictTab(){
    $('a').attr("tabindex","-1");
    $('input').attr("tabindex","-1");
    $('button').attr("tabindex","-1");

    $('.modal a').attr("tabindex","1");
    $('.modal input').attr("tabindex","-1");
    $('.modal button').attr("tabindex","1");
}

function continueTab(){
    $('a').attr("tabindex","1");
    $('button').attr("tabindex","1");
    $('input').attr("tabindex","1");

    $('.modal').modal('hide');
}

//Using Particles.js for homepage
function renderParticles(){
    particlesJS("hero", {
        "particles": {
            "number": {
                "value":20, "density": {
                    "enable": true, "value_area": 1000
                }
            }
            , "color": {
                "value": ["#3da650", "#0372e4"]
            }
            , "shape": {
                "type":"edge", "stroke": {
                    "width": 0, "color": "#000000"
                }
                , "polygon": {
                    "nb_sides": 10
                }
                , "image": {
                    "src": "img/github.svg", "width": 100, "height": 100
                }
            }
            , "opacity": {
                "value":1, "random":false, "anim": {
                    "enable": false, "speed": 1, "opacity_min": 0, "sync": false
                }
            }
            , "size": {
                "value":5.5, "random":true, "anim": {
                    "enable": false, "speed": 4, "size_min": 3.5, "sync": false
                }
            }
            , "line_linked": {
                "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1
            }
            , "move": {
                "enable":true, "speed":1, "direction":"none", "random":true, "straight":false, "out_mode":"out", "bounce":false, "attract": {
                    "enable": false, "rotateX": 600, "rotateY": 600
                }
            }
        }
        , "interactivity": {
            "detect_on":"canvas", "events": {
                "onhover": {
                    "enable": false, "mode": "bubble"
                }
                , "onclick": {
                    "enable": false, "mode": "repulse"
                }
                , "resize":true
            }
            , "modes": {
                "grab": {
                    "distance":400, "line_linked": {
                        "opacity": 1
                    }
                }
                , "bubble": {
                    "distance": 85.26810729164123, "size": 0, "duration": 2, "opacity": 0, "speed": 3
                }
                , "repulse": {
                    "distance": 400, "duration": 0.4
                }
                , "push": {
                    "particles_nb": 4
                }
                , "remove": {
                    "particles_nb": 2
                }
            }
        }
        , "retina_detect":true
    });

    //Calculating the canvas height to ensure particles take up full space
    function calcCanvasHeight(){
        setTimeout(function() { 
            $(".hero > canvas").height("400px");
            $(".hero > canvas").attr("height",400);
         },1);
    }
    

}


//Dataset Validation
$(document).ready(function(){
    
    // Form valid flag
    var isValid = false;

    var isDesc = false;
    $(".editor-info-block").after("<p id='field-notes-err' class='form-err hidden'>Error: Description cannot be empty</p>");

    var isAuthor = false;
    $("#field-author").after("<p id='field-author-err' class='form-err hidden'>Error: Data Steward Name cannot be empty</p>");

    var isAuthorEmail = false;
    $("#field-author-email").after("<p id='field-author-email-err' class='form-err hidden'>Error: Data Steward Email cannot be empty</p>");

    var islevelOfData = false;
    $("#level_of_data").after("<p id='level_of_data-err' class='form-err hidden'>Error: Enter level of data</p>");

    var isOrg = false;
    $("#field-organizations").after("<p id='field-organizations-err' class='form-err hidden'>Error: Select Publisher</p>");


    $("#dataset-edit").submit(function(event){

        //Validate Description
        var description=$("#field-notes").val().replace(/^\s+|\s+$/g, "").length != 0;
        if(description){
            isDesc = true;
            $("#field-notes-err").addClass('hidden');
        }
        else{
            isDesc = false;
            $("#field-notes-err").removeClass('hidden');
        }


        //Validate Datasteward Name
        var authorName=$("#field-author").val().replace(/^\s+|\s+$/g, "").length != 0;
        if(authorName){
            isAuthor = true;
            $("#field-author-err").addClass('hidden');
        }
        else{
            isAuthor = false;
            $("#field-author-err").removeClass('hidden');
        }

        //Validate Datasteward Email
        var authorEmail=$("#field-author-email").val().replace(/^\s+|\s+$/g, "").length != 0;
        if(authorEmail){
            isAuthorEmail = true;
            $("#field-author-email-err").addClass('hidden');
        }
        else{
            isAuthorEmail = false;
            $("#field-author-email-err").removeClass('hidden');
        }

        // Validate Level of data
        var levelofdata=$("#level_of_data").val();
        console.log(levelofdata.length);
        if(levelofdata.length > 0){
            islevelOfData = true;
            $("#level_of_data-err").addClass('hidden');
        }
        else{
            islevelOfData = false;
            $("#level_of_data-err").removeClass('hidden');
        }

        // Validate Owner Org
        var ownerOrg=$("#field-organizations").val();
        if(ownerOrg){
            isOrg = true;
            $("#field-organizations-err").addClass('hidden');
        }
        else{
            isOrg = false;
            $("#field-organizations-err").removeClass('hidden');
        }
        

        //Validate Final
        if(isDesc == true && isAuthor == true && isAuthorEmail == true && islevelOfData == true && isOrg == true){
            isValid = true;
        }

        //Final Submission
        if(isValid==false){
            event.preventDefault();

            setTimeout(function(){ 
                $("button[name='save']").removeAttr("disabled");
                $("button[name='save']").attr("enabled","enabled");

                if(isOrg == false){
                    $("#field-organizations").focus();
                }

                if(isAuthorEmail == false){
                    $("#field-author-email").focus();
                }

                if(isAuthor == false){
                    $("#field-author").focus();
                }

                if(islevelOfData == false){
                    $("label[for='level_of_data']").focus();
                }

                if(isDesc == false){
                    $("#field-notes").focus();
                }
            }, 100);
        }
        
    })

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();   
});

function validateDesc(isValid,isDesc){
    
}
