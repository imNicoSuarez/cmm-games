var GAME_COUNT = 0;
var COMPLETED_BRAND=1;
var COMPLETED_SUCCESS=0;

$(document).ready(function(){

    printScreen();

    $('.js-load-tempalate').on("click", '.c-game-next.active', function(e){ 
        GAME_COUNT = GAME_COUNT + 1;
        printScreen()

    })

    $('.js-load-tempalate').on("click", '.c-game-restart', function(e){ 
        GAME_COUNT = 0;
        COMPLETED_BRAND=1;
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
                    $(element).addClass( "c-game-options-noselection" );
                }
                $(this).removeClass( "c-game-options-noselection" );
                $(this).addClass( "c-game-options-success" );
                COMPLETED_SUCCESS = COMPLETED_SUCCESS + 1;
                
            } else {
            
                for (let index = 0; index < gameOptions.length; index++) {
                    const element = gameOptions[index];
                    var dataOption = $(element).data("option");
                    if(dataOption){
                        $(element).addClass( "c-game-options-success-indi" );
                    } else {
                        $(element).addClass( "c-game-options-noselection" );
                    }
                }
                $(this).removeClass( "c-game-options-noselection" );
                $(this).addClass( "c-game-options-error" );
            }
        }

        $(".c-game-options").addClass('js-lock');
        $(".c-game-next").addClass('active');
        COMPLETED_BRAND = COMPLETED_BRAND + 1
    }); 
 });



var getdata = function(callback){
    $.ajax({
        url: 'data/data.json',
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
       
        var listBrand = arry.brandsQuiz

        if(COMPLETED_BRAND <= listBrand.length ) {
            var otherOption = shuffle(listBrand[GAME_COUNT].otherOptions).slice(0,3);

            otherOption.push(listBrand[GAME_COUNT].successBrand);

            var optionList = shuffle(otherOption)
    
            console.log(optionList)
    
            var currentBrand =  {currentOption: listBrand[GAME_COUNT].successBrand,
                                 listOption: optionList, 
                                 numberComplete: COMPLETED_BRAND, 
                                 totalData: listBrand.length}
    
            $(".js-load-tempalate").html(loadTemplate("#game-brands-quiz", currentBrand )); 
        } else {

            $(".js-load-tempalate").html(loadTemplate("#game-brands-quiz-result", {completedCount: COMPLETED_SUCCESS} )); 
            $(".c-container-face").addClass(showFace());

        }

    });
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
   if(COMPLETED_SUCCESS <= 1) {
       console.log("c-face-1")
       return "c-face-1"

       
   } 

   if(COMPLETED_SUCCESS > 1 && COMPLETED_SUCCESS < 6) {
    console.log("c-face-2")
    return "c-face-2"
   }
   
   if(COMPLETED_SUCCESS > 6 && COMPLETED_SUCCESS < 20) {
    console.log("c-face-3")
    return "c-face-3"
   }
   console.log("c-face-4")
   return "c-face-4"

  }