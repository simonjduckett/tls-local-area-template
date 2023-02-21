window.onload = (event) => {
    //reviews
    setTimeout(() => {
        console.log('trying glide')
        new Glide('.glide', {
            type: 'carousel',
            autoplay: 8000,
            perView: 4,
            gap: 25,
            breakpoints: {
                768: {
                    perView: 1
                },
                992: {
                    perView: 3
                }
            }
        }).mount()
    }, 1000);

    //faqs
    $('.accordion').click(function () {
        $(this).toggleClass('accordion--open')
        $('.accordion__txt', this).toggleClass('showFaq')
    })
}