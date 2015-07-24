App.View = (function() {
    var that = {},
    $button = null,
    $dot = null,
    $dot2 = null,
    $dot3 = null,
    $container = null,
    timeToWait = 1000,
    timeToWaitForNextNum = 5000,
    timeToStart = 2000,
    newNum = null,
    user = 3,
    positions = [0,1,2,3,4,5],
    normal1 = [
        7110932, 
        5828704, 
        4012821,
        2749816, 
        5349340, 
        2151213, 
    ],
    normal2 = [
        6358673, 
        2804714,
        4918636, 
        3221571, 
        3538890, 
        6142152, 
    ],
    bigMiddle1=[
        7939200, 
        8255433, 
        8348124, 
        4056261,
        7304676, 
        2320802, 
    ],
    bigMiddle2 = [
        2563193,
        5914876, 
        6288271, 
        9560720, 
        6038812, 
        2224894, 
    ],
    bigBottom1 = [
        9204300,
        1893623, 
        5091336, 
        6527491, 
        3926952, 
        6551704, 
    ],
    bigBottom2 = [
        9698522,
        8024764, 
        3732163, 
        8655820, 
        9236281, 
        6051966,
    ],
    nums = null,
    counter = 0;

    init = function() {
        counter =36;
        $button = $("#button");
        $dot = $(".dot");
        $dot2 = $(".dot2");
        $dot3 = $(".dot3");
        $container = $(".container");
        addClassFromNumber();
        initRadioButtons();
        setVersion();
        $button.on("click", startNewSession);
    	return that;
    },

    initRadioButtons = function(){
        $('input:radio[name="group"]').change(
            function(){
                if ($(this).is(':checked') && $(this).val() == 'Version 1') {
                    user = 1;
                    setVersionOne();
                }
                if ($(this).is(':checked') && $(this).val() == 'Version 2') {
                    user = 2;
                    setVersionTwo();
                }
                if ($(this).is(':checked') && $(this).val() == 'Version 3') {
                    user = 3;
                    setVersionThree();
            }
        });
    },

    setVersionOne = function(){
        $dot.removeClass("invisible");
        $dot2.addClass("invisible");
        $dot3.addClass("invisible");
        $container.removeClass("container-dot2");
    },

    setVersionTwo = function(){
        $dot.addClass("invisible");
        $dot2.removeClass("invisible");
        $dot3.addClass("invisible");
        $container.addClass("container-dot2");
    },

    setVersionThree = function(){
        $dot.addClass("invisible");
        $dot2.addClass("invisible");
        $dot3.removeClass("invisible");
        $container.addClass("container-dot2");
    },

    startNewSession = function(){
        if(counter==36){
            fillNums();
            timeToWait = 1000;
            $button.prop('disabled', true);
            console.log("new Session");
        //setTimeout(function(){
            counter = 0;
            showNum();
        //}, timeToStart);
        }else{
            startNextRound();
        }
    },

    fillNums = function(){
        var randomNormal1 = transformArrayintoRandomArray(normal1);
        var randomNormal2 = transformArrayintoRandomArray(normal2);
        var randomBigMiddle1 = transformArrayintoRandomArray(bigMiddle1);
        var randomBigMiddle2 = transformArrayintoRandomArray(bigMiddle2);
        var randomBigBottom1 = transformArrayintoRandomArray(bigBottom1);
        var randomBigBottom2 = transformArrayintoRandomArray(bigBottom2);
        if(user==1){
            nums = fillArray(randomNormal1, randomBigBottom1, randomBigMiddle1, randomNormal2, randomBigBottom2, randomBigMiddle2);
        }else if(user==2){
            nums = fillArray(randomBigBottom1, randomBigMiddle1, randomNormal1, randomBigBottom2, randomBigMiddle2, randomNormal2);
        }else{
            nums = fillArray(randomBigMiddle1, randomNormal1, randomBigBottom1, randomBigMiddle2, randomNormal2, randomBigBottom2);
        }
    },

    fillArray = function(array1, array2, array3, array4, array5, array6){
        var filledArray = new Array();
        for(var i =0; i< array1.length;i++){
            filledArray.push(array1[i]);
        }
        for(var i =0; i< array2.length;i++){
            filledArray.push(array2[i]);
        }
        for(var i =0; i< array3.length;i++){
            filledArray.push(array3[i]);
        }
        for(var i =0; i< array4.length;i++){
            filledArray.push(array4[i]);
        }
        for(var i =0; i< array5.length;i++){
            filledArray.push(array5[i]);
        }
        for(var i =0; i< array6.length;i++){
            filledArray.push(array6[i]);
        }
        return filledArray;
    },

    transformArrayintoRandomArray = function(array){
       // var indexes = [10,10,10,10,10, 10];
       var indexes = new Array();
        console.log("laenge: " + indexes.length);
        var count =6;
       // while(indexes.indexOf(10) > -1){
        //while(indexes.length<6){
            while(count > 0){
            console.log("laenge: " + indexes.length);
            var index = Math.floor(Math.random() * (6 - 0));
            console.log("index : " + index);
            var alreadyInList = false;
            if(indexes.indexOf(index) <0){
                indexes.push(index);
                console.log("pushed");
                count--;
            }
            /*for(var i = 0; i< indexes.length;i++){
                console.log("length: " + indexes.length);
                if(index == indexes[i]){
                    alreadyInList = true;
                }
            }
            if(!alreadyInList){
                indexes.push(index);
                console.log("pushed");
            }*/
        }
        console.log(indexes[0] + indexes[1]+indexes[2]);
        var randomArray = new Array();
        for(var i = 0; i< array.length;i++){
            randomArray.push(array[indexes[i]]);
        }
        return randomArray;
    },

    showNum = function(){
        //setVersion();
        setTimeout(function(){
            console.log("counter: " + counter);
            removeClassFromNumber();
            for(var i = 0; i <6; i++){
                    var currentNum1 = nums[counter].toString();
                    $("#number" + i).text(currentNum1[i]);
            }
            setRandomDot(currentNum1[6]);
            counter++;
            //setVersion();
            addClassFromNumberAfterTimeout(currentNum1[6]);
            startOver();
        }, timeToWaitForNextNum);   
    },

    setVersion = function(){
        if(user==1){
            setVersionIfUser1();
        }
        if(user==2){
            setVersionIfUser2();
        }
        if(user==3){
            setVersionIfUser3();
        }

    },

    setVersionIfUser1 = function(){
        if(counter == 0|| counter==18){
            setVersionOne();
        }else if(counter == 6 || counter == 24){
            setVersionTwo();
        }else if(counter ==12 || counter == 30){
            setVersionThree();
        }
    },

    setVersionIfUser2 = function(){
        if(counter == 0|| counter==18){
            setVersionTwo();
        }else if(counter == 6 || counter == 24){
            setVersionThree();
        }else if(counter ==12 || counter == 30){
            setVersionOne();
        }
    },

    setVersionIfUser3 = function(){
        if(counter == 0|| counter==18){
            setVersionThree();
        }else if(counter == 6 || counter == 24){
            setVersionOne();
        }else if(counter ==12 || counter == 30){
            setVersionTwo();
        }
    },

    setRandomDot = function(pos){
        if(pos < 5){
            $(".dot-displ"+pos).css('color', '#FF4141');
        }
    },

    startOver = function(){
        //setTimeout(function(){
            if(counter ==18){
                timeToWait = 500;
            }
            if(counter == 6 || counter ==12||counter ==18||counter==24||counter==30){
                setTimeout(function(){
                    setVersion();
                    $button.prop('disabled', false);
                    $button.text("Weiter");
            }, timeToWaitForNextNum);
                
            }else
            if(counter < 36){
                showNum();
            }else{
                $button.prop('disabled', false);
                $button.text("Start");
            }
        //}, timeToWaitForNextNum);
    },

    removeClassFromNumber = function(){
        for(var i = 0; i <6; i++){
            $("#number" + i).removeClass("invisible");
        }
    },

    addClassFromNumberAfterTimeout = function(displ){
        setTimeout(function(){
            if(displ<6){
                $(".dot-displ"+displ).css('color', '#E1E3CD');
            }
            addClassFromNumber();
        }, timeToWait);
    },

    startNextRound = function(){
        console.log("next round");
        $button.prop('disabled', true);
       // counter++;
        showNum();
    },

    addClassFromNumber = function(){
        for(var i = 0; i <6; i++){
            $("#number" + i).addClass("invisible");
        }
    };

    that.init = init;

	return that;
})();