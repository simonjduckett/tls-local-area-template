window.onload = (event) => {

    let slides = [];
    //dynamically create reviews by fetching from existing pages
    (function createReviewsSection() {
        console.log('try fetch')

        //LIVE END POINT - /wills-probate/wills/draft-individual-will
        fetch('/wills-probate/wills/draft-individual-will').then(function (response) {
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response", { cause: response });
            } else {
                return response.text();
            }
            
        }).then(function (html) {

            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            // Get the reviews
            slides = doc.querySelectorAll('.ktc-lp2__reviews-box p:nth-of-type(1)');
            slideDates = doc.querySelectorAll('.ktc-lp2__reviews-box p:nth-of-type(2)');
            slideStars = doc.querySelectorAll('.ktc-lp2__reviews-box-rating')
            console.log(slides);

            let glideUl = document.querySelector('.glide__slides')

            //loop through reviews and add them to slider
            for (let i = 0; i < slides.length; i++) {
                let review = document.createElement('li')
                review.classList.add('glide__slide')

                //create the stars
                let y = document.createElement('div')
                let j = 0
                while (j < slideStars[i].children.length) {
                    y.innerHTML += '<i class="fa-solid fa-star"></i>'
                    j++
                }
                review.appendChild(y)
                review.appendChild(slides[i])
                review.appendChild(slideDates[i])
                //append the whole review
                glideUl.appendChild(review)
            }

            //start the review slider
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

        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong. Hiding reviews', err);
            document.querySelector('#tls-reviews').style.display = 'none'
        });

        
    })()

    //faqs
    $('.accordion').click(function () {
        $(this).toggleClass('accordion--open')
        $('.accordion__txt', this).toggleClass('showFaq')
    })
}