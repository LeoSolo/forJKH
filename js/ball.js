myApp.onPageInit('ball', function (page) {
    $$('.startBtn').on('click', function(){
       $$(this).addClass('active');
       $$('.finishBtn').removeClass('active');
       ball.getMove();
    });

    $$('.finishBtn').on('click', function(){
        $$(this).addClass('active');
        $$('.startBtn').removeClass('active');
        var currentBall = document.getElementById('ball');
        currentBall.classList = '';
    });

    $$('#speedControl').on('input', function(){
       var currentBall = document.getElementById('ball');
       if( currentBall.classList != ''){
           setTimeout(function(){
               ball.getMove();
           },300);
       }
    });
});

var ball = {
    getSpeed: function(){
      return $$('#speedControl').val();
    },
    getMove: function(){
        var currentBall = document.getElementById('ball');
        currentBall.classList = 'speed'+ball.getSpeed();
    }
};