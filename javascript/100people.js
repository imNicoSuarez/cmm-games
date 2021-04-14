var GAME_COUNT = 0;
var COMPLETED_QUEST=1;
var COMPLETED_SUCCESS=0;
var intervalTimer=[];

$(document).ready(function(){

    $(".js-load-tempalate").html(loadTemplate("#game-start-screen")); 

    $('.js-load-tempalate').on("click", '.c-game-next.active', function(e){ 
        printScreen();
    })
    
    $('.js-load-tempalate').on("click", '.js-play-button', function(e){ 
        var startNumber = 3
        var $this = $(this)
       
        var interval =setInterval(function(){ 
            if (startNumber < 0) {
                printScreen();
                clearInterval(interval);
            } else {
                $this.html(startNumber).addClass('activeCounter');
            }
            startNumber = startNumber-1
        }, 1000);
    })



    $('.js-load-tempalate').on("click", '.c-game-restart', function(e){ 
        GAME_COUNT = 0;
        COMPLETED_QUEST=1;
        COMPLETED_SUCCESS=0;
        printScreen()
    })

    $('.js-load-tempalate').on("click", '.c-game-options', function(e){ 
        e.preventDefault();
        var validData = $(this).data("option");
        var gameOptions = $(".c-game-options");

        if(!$(this).hasClass('js-lock')){
            if (validData) {
                for (let index = 0; index < gameOptions.length; index++) {
                    const element = gameOptions[index];
                    $(element).addClass( "c-game-options-other" );
                }
                $(this).removeClass( "c-game-options-other" );
                $(this).addClass( "c-game-options-success" );
                COMPLETED_SUCCESS = COMPLETED_SUCCESS + 2;
                
            } else {
            
                for (let index = 0; index < gameOptions.length; index++) {
                    const element = gameOptions[index];
                    var dataOption = $(element).data("option");
                    if(dataOption){
                        $(element).addClass( "c-game-options-success-indi" );
                    } else {
                        $(element).addClass( "c-game-options-other" );
                    }
                }
                $(this).removeClass( "c-game-options-other" );
                $(this).addClass( "c-game-options-user" );

                COMPLETED_SUCCESS = COMPLETED_SUCCESS + 1;
            }
        }

        $(".c-game-options").addClass('js-lock');
        $(".c-game-next").addClass('active');
        COMPLETED_QUEST = COMPLETED_QUEST + 1
    }); 
 });



var getdata = function(callback){
    $.ajax({
        url: 'data/100people.json',
        dataType: 'json',
        type: "Get",
        success: function(respuesta) {
            
            var arry = respuesta;
            callback(arry)
           
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

var printScreen = function(){

    getdata(function(arry){
        var questionList = arry.qpeople 

        if(COMPLETED_QUEST <= questionList.length ) {
            var optionList = shuffle(questionList[GAME_COUNT].answersList)

            var currentQuest =  {listOption: optionList, 
                                 question: questionList[GAME_COUNT].question,
                                 numberComplete: COMPLETED_QUEST, 
                                 totalData: questionList.length}
    
            $(".js-load-tempalate").html(loadTemplate("#game-question", currentQuest )); 
            if (intervalTimer != null) {
                clearInterval(intervalTimer);
            }
            timerCount();
        } else {

            $(".js-load-tempalate").html(loadTemplate("#game-brands-quiz-result", {completedCount: COMPLETED_SUCCESS} )); 
            $(".c-container-face").addClass(showFace());

        }

        GAME_COUNT = GAME_COUNT + 1;

    });
}


var timerCount =  function() {
    var startNumber = 15
    intervalTimer=setInterval(function(){ 
        
        if (startNumber < 0) {
            COMPLETED_QUEST = COMPLETED_QUEST + 1
            COMPLETED_SUCCESS = COMPLETED_SUCCESS + -1
            clearInterval(intervalTimer);
            printScreen()
        } else {
            $(".c-counter").html(startNumber);
        }
        startNumber = startNumber-1
    }, 1000);
}



var loadTemplate = function(templateId,  data ) {
    if (typeof data == "undefined" ){
        var value =  {};
    } else {
        var value = data;
    }

    var templateSelector =  $(templateId).html();
    var compiledTemplate = _.template(templateSelector);
    var templateResult = compiledTemplate(value);

    return templateResult;
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  var showFace = function(){

   if(COMPLETED_SUCCESS <= 0) {
       return "c-face-1"
   } 

   if(COMPLETED_SUCCESS > 1 && COMPLETED_SUCCESS <= 10) {
    return "c-face-2"
   }
   
   if(COMPLETED_SUCCESS > 10 && COMPLETED_SUCCESS < 20) {
    return "c-face-3"
   }

   return "c-face-4"

  }

