import 'fancybox';
import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';
import haloAddOptionForProduct from './halothemes/haloAddOptionForProduct';
import haloSidebarToggle from './halothemes/haloSidebarToggle';
import { conforms } from 'lodash';

export default class Blog extends PageManager {
    constructor(context) {
        super(context);
    }

	onReady() {
        haloSidebarToggle();

        this.loadOptionForProductCard(this.context);
        /* Animate Scroll*/
        this.animationScroll();

        this.getBlogPostByTag(".blog-tab-content__post--recenzii");
        this.getBlogPostByTag(".blog-tab-content__post--recomandari");
        this.getBlogPostByTag(".blog-tab-content__post--incurajare");
        this.getBlogPostByTag(".blog-tab-content__post--interviuri");

        this.viewMoreBlogCategory();

        this.getTimeBlog();

        this.similarArticle();

        if($('.special-product-blog-blocks').length > 0){
            this.customSpecialProduct(this.context);
        }
        if($('#list-product-blog-detail-block').length > 0){
            this.homeProductsListID();
        }
        const currentURL = window.location.href;
        const titleWrap = $('.blog-tab-content__info .blog-tab-content__title.other-post-heading');
        const blogTagName = currentURL.split('/').filter(segment => segment !== '').pop();
        if(titleWrap) titleWrap.html(blogTagName);

    }

    loadOptionForProductCard(context){
        if($('#featured-products .card').length > 0){
            haloAddOptionForProduct(context, 'featured-products');
        }
    }

    /* Animation Scroll */
    animationScroll(){
        let itemLink = $('.tab-title__link');
        if (!itemLink) return;
        for(let item of itemLink){
            let tabTile = item.closest('.tab-title__item');

            item.addEventListener('click', (e) => {
                e.preventDefault();
                /* Active Tab */
                let tabTileActive = document.querySelector('.tab-title__item.active');
                if(tabTileActive) tabTileActive.classList.remove('active');

                tabTile.classList.add('active');
                /* Scroll */
                let itemHref = item.getAttribute('href');
                $('html, body').animate({
                    scrollTop: ($(itemHref).offset().top - 200)
                }, 1000);
            })
        }
    }

    /* Get Post By Tag Name*/
    getBlogPostByTag(elementClass){
        let blogList = document.querySelector(elementClass),
            blogSection = blogList?.closest(".blog-tab__content"),
            blogUrl = blogSection?.querySelector(".blog-tab-content__link").getAttribute("href");

        if (!blogList) return;

        fetch(blogUrl)
            .then (response => response.text())
            .then ((content) => {
                var template = document.createElement('div');
                template.innerHTML = content;

                var newContent = template.querySelector(".blog-catagory-content").innerHTML;
                
                newContent = newContent.split("<nav")[0];

                blogList.innerHTML = newContent;
            })

            /* Show 9 blog post on desktop */
            .then(() => {
                if(window.innerWidth > 768){
                    let blogPost = blogSection.querySelectorAll(".blog-tab-content__post .blog");
                    for(let i = 0; i < blogPost.length; i++){
                        if(i > 8){
                            blogPost[i].remove();
                        }
                    }
                }
            })

            /* Show 3 blog post on mobile */
            .then(() => {
                if(window.innerWidth < 768){
                    let blogPost = blogSection.querySelectorAll(".blog-tab-content__post .blog");
                    for(let i = 0; i < blogPost.length; i++){
                        if(i > 2){
                            blogPost[i].remove();
                        }
                    }
                }
            })

            .then(() => {
                $(elementClass).slick({
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false ,
                    draggable: true,
                    dots: true,
        
                    /* Responsive */
                    responsive: [
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                dots: true,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                variableWidth: true,
                                dots: true,
                                slidesToScroll: 1,
                            },
                        }
                    ],
                });
            })

            .then(() => {
                let dot = blogSection.querySelectorAll(".slick-dots li");
                dot[0].click();
            })

            /* Scroll To Top After Click Above */
            .then(() => {
                window.scrollTo(0, 0);
            })

            /* Get Reading Time */
            .then(() => {
                var haloDescription = document.querySelectorAll('.blog-post.halo-description');

                for (let description of haloDescription) {
                    
                    var descriptionText = description.textContent.trim();

                    var extractedText = descriptionText.match(/(\d+\smin\sde\scitit)/i);
    
                    if (extractedText) {
                        extractedText = extractedText[0];
                        
                        var blogPostBody = description.closest('.blog-post-body');
                        var customBlogReading = blogPostBody.querySelector('.custom-blog-reading');

                        customBlogReading.textContent = extractedText;
    
                        description.textContent = description.textContent.replace(extractedText, '').trim();
                    }
                }
            })

            /* Get Matching Tags for Custom Post Detail Layout */
            .then(() => {
                let postDetailCustom = document.querySelector(".custom-post-detail-layout");

                if(postDetailCustom) {
                    function showMatchingTags() {
                        /* Get All Tags of this post */
                        const tags = document.querySelectorAll('.custom-post-tags .link');
                    
                        tags.forEach(tag => {
                            /* Get Tag Name */
                            const tagName = tag.innerText.trim();
                    
                            /* Find Div the samee with tag name */
                            const correspondingDiv = document.getElementById('blog-' + tagName.toLowerCase());

                            if (correspondingDiv) {
                                correspondingDiv.style.display = 'block';
                            }
                        });
                    }
                    
                    showMatchingTags();
                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });

    }

    viewMoreBlogCategory(){
        let viewMoreButton = document.querySelector(".post-category-viewMore");
        let blogList = document.querySelector(".blog-catagory-content");
        
        if(!viewMoreButton) return;
 
        viewMoreButton.addEventListener("click", (e) => {
            e.preventDefault();

            var nextPage = $('.pagination-item--current').next(),
                link = nextPage.find("a").attr("href");

            fetch(link)
                .then (response => response.text())
                .then ((content) => {
                    var template = document.createElement('div');

                    template.innerHTML = content;

                    var newContent = $(".blog-catagory-content .blog", $(template));
                    var newPagination = $(".pagination-list", $(template));
                    
                    if(link) {
                        $( newContent ).appendTo(blogList);
                    }
                    $('.pagination-list').html(newPagination);
                })

                /* Remove View More Button */
                .then (() => {
                    let nextPagination = document.querySelector(".pagination-item--next");

                    if(!nextPagination) {
                        viewMoreButton.style.display = "none";
                    }
                })
            
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
    }

    getTimeBlog() {
        var haloDescription = document.querySelectorAll('.blog-post.halo-description');

        for (let i = 0; i < haloDescription.length; i++) {
            
            var descriptionText = haloDescription[i].innerHTML.trim();

            var extractedText = descriptionText.match(/(\d+\smin\sde\scitit)/i);

            if (extractedText) {
                extractedText = extractedText[0];
                
                var blogPostBody = haloDescription[i].closest('.blog');
                var customBlogReading = blogPostBody.querySelector('.custom-blog-reading');

                customBlogReading.innerHTML = extractedText;
                
                /* Reading Time in blog detail page */
                let blogDetail = document.querySelector(".blog-post-detail .post-detail__top");

                if(blogDetail){
                    function convertTextToMinute(text) {
                        const regex = /(\d+)\s*min\s+de\s+citit/;
                        const match = text.match(regex);
                    
                        if (match && match[1]) {
                            const minutes = parseInt(match[1]);
                            return `${minutes} minute`;
                        } else {
                            return text;
                        }
                    }

                    var blogDetailReading = blogDetail.querySelector('.custom-blog-reading');

                    let newReadingTime = convertTextToMinute(extractedText);

                    if(i == 0) {
                        blogDetailReading.innerHTML = convertTextToMinute(extractedText);
                    }
                }

                haloDescription[i].innerHTML = haloDescription[i].innerHTML.replace(extractedText, '').trim();
            }
        }
    }

    similarArticle() {
        let similarTagLink = document.querySelector(".blog-post-tags .tags .tag .link")?.getAttribute("href");

        if(!similarTagLink) return;

        fetch(similarTagLink)
            .then (response => response.text())
            .then ((content) => {
                var template = document.createElement('div');
                template.innerHTML = content;
                var newContent = template.querySelector("#blog-listing-container .blog-tab__content .blog-catagory-content").innerHTML;
                newContent = newContent.split("<nav")[0];
                document.querySelector(".similar-blog__list").innerHTML = newContent;
            })
            .then(() => {
                let blogPost = document.querySelectorAll(".similar__wrapper .blog");
                for(let i = 0; i < blogPost.length; i++){
                    if(i > 2){
                        blogPost[i].remove();
                    }
                }
            })
            .then(() => {
                var haloDescription = document.querySelectorAll('.similar__wrapper .blog-post.halo-description');

                for (let description of haloDescription) {
                    
                    var descriptionText = description.textContent.trim();

                    var extractedText = descriptionText.match(/(\d+\smin\sde\scitit)/i);
    
                    if (extractedText) {
                        extractedText = extractedText[0];
                        
                        var blogPostBody = description.closest('.similar__wrapper .blog-post-body');
                        var customBlogReading = blogPostBody.querySelector('.similar__wrapper .custom-blog-reading');

                        customBlogReading.textContent = extractedText;
    
                        description.textContent = description.textContent.replace(extractedText, '').trim();
                    }
                }
            })
            .then(() => {
                $(document).ready(function(){
                    $('.similar-blog__list').slick({
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: false ,
                        draggable: true,
                        dots: true,
            
                        /* Responsive */
                        responsive: [
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    dots: true,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                    variableWidth: true,
                                    dots: true,
                                    slidesToScroll: 1,
                                },
                            }
                        ],
                    });
                });
            })
    }

    /* Special Product Blog Detail */
    customSpecialProduct($context){
        const context = $context;
            var productId = $('[data-special-product-blog-id]').data('special-product-blog-id'),
                setFlag = false;
            const options ={
                template: 'halothemes/product/halo-special-product-blog-tmp'
            }

            $(window).on('scroll load', function() {
                var scroll = $(window).scrollTop(),
                    header_height = $('.header').height();

                if (scroll > header_height) {
                    setFlag = true;
                }

                if(setFlag){
                    if(!$('.halo-spacial-product .productView').length){
                        utils.api.product.getById(productId, options, (err, response) => {
                            setFlag = false;

                            var scope = '.halo-spacial-product';

                            if(!$(scope).find('.productView').length){
                                $(scope).html(response);

                                viewingProduct($(scope).find('.productView-ViewingProduct'));

                                $(scope).find('[data-slick]').slick();
                                $(scope).find('.productView-for').get(0).slick.setPosition();

                                initThumbnailsHeight(scope);

                                $(scope).on('click', '.dropdown-menu-button', event => {
                                    var $target = $(event.currentTarget);

                                    if($target.hasClass('is-open')){
                                        $target
                                            .removeClass('is-open')
                                            .attr('aria-expanded', false);

                                        $target
                                            .siblings('.dropdown-menu')
                                            .removeClass('is-open')
                                            .attr('aria-hidden', true);
                                    } else{
                                        $target
                                            .addClass('is-open')
                                            .attr('aria-expanded', true);

                                        $target
                                            .siblings('.dropdown-menu')
                                            .addClass('is-open')
                                            .attr('aria-hidden', false);
                                    }

                                    event.stopPropagation();
                                });

                                $(document).on('click', event => {
                                    if ($(scope).find('.dropdown-menu-button').hasClass('is-open')) {
                                        if (($(event.target).closest('.dropdown-menu-button').length === 0) && ($(event.target).closest('.dropdown-menu').length === 0)){
                                            $(scope)
                                                .find('.dropdown-menu-button')
                                                .removeClass('is-open')
                                                .attr('aria-expanded', false);

                                            $(scope)
                                                .find('.dropdown-menu-button')
                                                .siblings('.dropdown-menu')
                                                .removeClass('is-open')
                                                .attr('aria-hidden', true);
                                        }
                                    }
                                });

                                var productDetails = new ProductDetails($(scope), context);
                                productDetails.setProductVariant();

                                return productDetails;
                            }
                        });

                        function viewingProduct(wrapper) {
                            if(wrapper.length > 0){ 
                                var viewerText = context.themeSettings.product_viewingProduct_text,
                                    numbersViewer_text = context.themeSettings.product_viewingProduct_viewer,
                                    numbersViewerList =  JSON.parse("[" + numbersViewer_text + "]"); 
                                
                                setInterval(function() {
                                    var numbersViewerItem = (Math.floor(Math.random()*numbersViewerList.length));

                                    wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
                                    wrapper.removeClass('u-hiddenVisually');
                                }, 10000);  
                            }
                        }


                        function initThumbnailsHeight($scope){
                            var el = $($scope);

                            var $carousel_nav = el.find('.productView-nav'),
                                $carousel_for = el.find('.productView-for');

                            if ($carousel_for.find('.slick-arrow').length > 0) {
                                $carousel_for.parent().addClass('arrows-visible');
                            } else {
                                $carousel_for.parent().addClass('arrows-disable');
                            }
                        }
                    }

                    setFlag = false;
                }
            });
    }

    homeProductsListID() {
        var $options;

        $(document).ready(function () {
            const tScroll = $(this).scrollTop();
            homeListId(tScroll);
        });

        $(window).on('scroll', (e) => {
            const $target = $(e.currentTarget);
            const tScroll = $target.scrollTop();

            homeListId(tScroll);
        });

        function homeListId(tScroll) {
            if ($('.productsByListId[data-list-id]').length > 0) {
                $('.productsByListId[data-list-id]').each((index, element) => {
                    let thisOffetTop = $(element).offset().top - (screen.height) * 1.5;

                    if (tScroll > thisOffetTop && !$(element).hasClass('is-loaded')) {
                        $(element).addClass('is-loaded');

                        var $prodWrapId = $(element).attr('id'),
                            $wrap,
                            $listId = $(element).data('list-id');
                        var homeProColumn = $(element).parents('.product-block').data('columns');
                        var dots = $(element).parents('.product-block').data('dots');
                        var limit = $(element).parents('.product-block').data('limit');

                        if ($(element).find('.productCarousel1').length > 0) {
                            $wrap = $(element).find('.productCarousel1');
                            $options = {
                                template: 'halothemes/product/halo-special-product-blog-tmp'
                            };
                        }

                        if (!$('#product-by-list-' + $prodWrapId + ' .productCarousel1 .productCarousel-slide').length) {
                            if ($listId.length > 1) {
                                loadListID($listId, $options, $wrap, homeProColumn, dots, limit);
                            } else {
                                loadListID($($listId), $options, $wrap, homeProColumn, dots, limit);
                            }

                        }
                    }
                });
            }
        }

        function loadListID(id, options, wrap, homeProColumn, dots, limit) {
            if (id.length <= 1) {
                var arr = id;
            } else {
                var arr = id.split(',');
            }

            if (id.length > homeProColumn) {
                var list = arr.slice(0, parseInt(limit));
            } else {
                var list = arr;
            }

            var num = 0;

            for (var i = 0; i <= list.length; i++) {
                var $prodId = list[i];

                if ($prodId != undefined) {
                    utils.api.product.getById($prodId, options, (err, response) => {
                        let hasProd = $(response).find('.card').data('product-id');
                        if (true) {
                            if (wrap.hasClass('slick-slider')) {
                                wrap.slick('unslick');
                                wrap.append(response);
                            } else {
                                wrap.append(response);
                            }
                        }

                        num++;

                        if (num == list.length) {
                            wrap.parents('.productsByListId[data-list-id]').find('.halo_productLoading').remove();
                            wrap.parents('.productsByListId[data-list-id]').addClass('show');
                           
                            if ($(window).width() <= 767) {
                                $('#list-product-blog-detail-block-mb').append($('#list-product-blog-detail-block'));
                                const mbWrap = $('#list-product-blog-detail-block-mb .productCarousel1');
                                slickCarouselListId(mbWrap, 1, dots);
                            }
                            return;
                        }
                    });
                }
            }
        }

        function slickCarouselListId($wrap, homeProColumn, dots) {
            $wrap.slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: false ,
                draggable: true,
                dots: true,
    
                /* Responsive */
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: false,
                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: true,
                            dots: false,
                            slidesToScroll: 1,
                        },
                    }
                ],
            });
        }
    }
    
}
