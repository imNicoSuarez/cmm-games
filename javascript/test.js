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
            COMPLETED_SUCCESS = COMPLETED_SUCCESS + validData;
            $(this).addClass( "c-game-options-user" );
        }

        $(".c-game-options").addClass('js-lock');
        $(".c-game-next").addClass('active');
        COMPLETED_QUEST = COMPLETED_QUEST + 1
    }); 
 });



var getdata = function(callback){
    $.ajax({
        url: 'data/test.json',
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
        var questionList = arry.test 

        if(COMPLETED_QUEST <= questionList.length ) {
            var current = questionList[GAME_COUNT]

            var currentQuest =  {question: current.question,
                                 numberComplete: COMPLETED_QUEST, 
                                 totalData: questionList.length}
    
            $(".js-load-tempalate").html(loadTemplate("#game-question", currentQuest )); 
            if (intervalTimer != null) {
                clearInterval(intervalTimer);
            }
            timerCount();
        } else {
            var result = showFace()
            $(".js-load-tempalate").html(loadTemplate("#game-brands-quiz-result", {completedCount: COMPLETED_SUCCESS, message: result.text} )); 
            $(".c-container-face").addClass(result.face);

        }

        GAME_COUNT = GAME_COUNT + 1;

    });
}


var timerCount =  function() {
    // var startNumber = 15
    // intervalTimer=setInterval(function(){ 
        
    //     if (startNumber < 0) {
    //         COMPLETED_QUEST = COMPLETED_QUEST + 1
    //         COMPLETED_SUCCESS = COMPLETED_SUCCESS + -1
    //         clearInterval(intervalTimer);
    //         printScreen()
    //     } else {
    //         $(".c-counter").html(startNumber);
    //     }
    //     startNumber = startNumber-1
    // }, 1000);
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

   if(COMPLETED_SUCCESS <= 39) {
        return {face: "c-face-1",  text: "¡Manos a la obra! Hay mucho por hacer. Empezá ya mismo. Capacitate en serio, investigá, aprendé, entendé y ejecutá. Sin buenos contenidos hoy ningún proyecto, empresa u organización va a crecer y ni siquiera mantenerse a flote. No quiero desanimarte, pero tenés que moverte o pedir ayuda. 🤷🏻‍♂️ "}
   } 

   if(COMPLETED_SUCCESS > 39 && COMPLETED_SUCCESS <= 59) {
        return {face: "c-face-2",  text: "Puede y debe mejorar. Tenés que realizar ajustes importantes en tu estrategia, tu equipo o tus proveedores. Armá un plan y contratá free-lancers que te ayuden o una empresa especializada en contenidos. También podés hacer un taller in-company ad-hoc sobre contenidos como los que ofrece MarketingAVC. Pero corré, porque hay muchos que ya lo están haciendo y entre ellos puede estar tu competencia. 🏃‍♀️🏃‍♀️🏃‍♀️"}
   }
   
   if(COMPLETED_SUCCESS > 59 && COMPLETED_SUCCESS <= 75) {
        return {face: "c-face-3",  text: "Venís muuuy bien. Hay detalles para mejorar, pero estás haciendo un gran trabajo.  Leé y hace cursos online sobre copywriting, lead magnets, utilizá herramientas para saber de qué y cómo habla tu público y seguí por este camino. 😊"}
   }
        
   return {face: "c-face-4",  text: "Estás despegado, ¿qué hacés acá? Aplauso, medalla y beso!🏅💪🏻 Seguí produciendo, personalizá, automatizá y vende. Tenes todo para que crecer. ¡No bajes los brazos! "}

  }

