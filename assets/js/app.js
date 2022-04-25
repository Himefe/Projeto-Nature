// Debounce do Lodash
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};




$('[data-group]').each(function() {
   var $allTarget = $(this).find('[data-target]'),
       $allClick = $(this).find('[data-click]'),
       activeClass = 'active';
       
   
       $allTarget.first().addClass(activeClass);
       $allClick.first().addClass(activeClass);

       $allClick.click(function(e){
        e.preventDefault();

        var id = $(this).data('click'),
        $target = $('[data-target="' + id + '"]');

        $allClick.removeClass(activeClass); 
        $allTarget.removeClass(activeClass);
        
        $target.addClass(activeClass);
        $(this).addClass(activeClass);
       });
});


$('.menu-nav a[href^="#"]').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('.menu').innerHeight(),
			targetOffset = $(id).offset().top;

    $('html, body').animate({
        scrollTop: targetOffset - menuHeight
    }, 500);
    
});

$(window).scroll(debounce(function() {
    $('.backtop').addClass('animated');
    if ($(this).scrollTop() > 0) {
        $('.backtop').addClass('bounceInRight');
        $('.backtop').removeClass('bounceOutRight')
    } else{
        $('.backtop').removeClass('bounceInRight');
        $('.backtop').addClass('bounceOutRight');
        
    }
}, 200));

$('.backtop').click(function() {
    $('html, body').animate({
        scrollTop: 0
    });
});

$('section').each(function(){
    var height = $(this).height(),
        offsetTop = $(this).offset().top,
        menuHeight = $('.menu').innerHeight(),
        id = $(this).attr('id'),
        $itemMenu = $('a[href="#'+ id + '"]');

        console.log(height);
        
    $(window).scroll(debounce(function(){
        var scrollTop = $(window).scrollTop();

        if (offsetTop - menuHeight < scrollTop  && offsetTop + height - menuHeight > scrollTop) {
            $itemMenu.addClass('active');
        } else {
            $itemMenu.removeClass('active');
        }
    }, 200));
    
});


$('.menu-mobile').click(function(){
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
    $('.mobile-menu').css('transition', '.3s');
});

function slider(sliderName, velocidade) {
    var sliderClass = '.' + sliderName,
        activeClass = 'active',
        rotate = setInterval(rotateSlide, velocidade);

        $(sliderClass + ' > :first').addClass(activeClass);

        $(sliderClass).hover(function(){
            clearInterval(rotate);
        }, function(){
            rotate = setInterval(rotateSlide, velocidade);
        });

        function rotateSlide() {
            var activeSlide = $(sliderClass + ' > .' + activeClass),
                nextSlide = activeSlide.next();
            if (nextSlide.length == 0) {
                nextSlide = $(sliderClass + ' > :first');
            }
                activeSlide.removeClass(activeClass);
                nextSlide.addClass(activeClass);
        }
}


slider('introducao', 2000);

(function(){
	var $target = $('[data-anime="scroll"]'),
			animationClass = 'animate',
			offset = $(window).height() * 3/4;

	function animeScroll() {
		var documentTop = $(document).scrollTop();

		$target.each(function(){
			var itemTop = $(this).offset().top;
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		});
	}


	$(document).scroll(debounce(function(){
		animeScroll();
	}, 200));
})();


	































