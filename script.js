var swiper = new Swiper('.product-slider', {
        spaceBetween: 30,
        effect: 'fade',
        // initialSlide: 2,
        loop: false,
        navigation: {
            nextEl: '.next',
            prevEl: '.prev'
        },
        // mousewheel: {
        //     // invert: false
        // },
        on: {
            init: function(){
                var index = this.activeIndex;

                var target = $('.product-slider__item').eq(index).data('target');

                console.log(target);

                $('.product-img__item').removeClass('active');
                $('.product-img__item#'+ target).addClass('active');
            }
        }
    });

    swiper.on('slideChange', function () {
        var index = this.activeIndex;

        var target = $('.product-slider__item').eq(index).data('target');

        console.log(target);

        $('.product-img__item').removeClass('active');
        $('.product-img__item#'+ target).addClass('active');

        if(swiper.isEnd) {
            $('.prev').removeClass('disabled');
            $('.next').addClass('disabled');
        } else {
            $('.next').removeClass('disabled');
        }

        if(swiper.isBeginning) {
            $('.prev').addClass('disabled');
        } else {
            $('.prev').removeClass('disabled');
        }
    });

    $(".js-fav").on("click", function() {
        $(this).find('.heart').toggleClass("is-active");
    });



    //navbar
    document.addEventListener('DOMContentLoaded', function() {
        var header = document.getElementById('myHeader');
          var page = document.getElementById('page');
        var openMenuButton = document.getElementById('openmenu');
    
        window.addEventListener('scroll', function() {
            page.classList.remove('menuopen'); // Ensures the menu is closed on scroll
            if (window.scrollY >= 100) {
                header.classList.add('sticky'); // When scrolled down 100 pixels, adds 'sticky' class
            } else {
                header.classList.remove('sticky'); // Removes 'sticky' class if scrolled back up
            }
        });
        
    
        // Event listener to remove the sticky class when the button is clicked
        openMenuButton.addEventListener('click', function() {
            header.classList.remove('sticky');
                    page.classList.add('menuopen');
        });
        
        var links = document.querySelectorAll('a[href^="#"]');
    
        links.forEach(function(link) {
            link.addEventListener('click', function(event) {
                // Prevent the default action
                event.preventDefault();
    
                // Get the target element
                var targetId = this.getAttribute('href');
                var targetElement = document.querySelector(targetId);
    
                // Smooth scroll to target
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    });