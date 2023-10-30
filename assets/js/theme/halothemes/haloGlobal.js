import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import { CollapsibleEvents } from '../common/collapsible';
import haloNewsletterPopup from './haloNewsletterPopup';
import haloRecentlyBoughtPopup from './haloRecentlyBoughtPopup';
import haloRecentlyViewedProduct from './haloRecentlyViewedProduct';
import haloBeforeYouLeave from './haloBeforeYouLeave';
import haloMegaMenuEditor from './haloMegaMenuEditor';
import haloAjaxLoginPopup from './haloAjaxLoginPopup';
import haloAddOptionForProduct from './haloAddOptionForProduct';
import AZBrands from './haloAZbrands';
import haloAjaxAddToCart from './haloAjaxAddToCart';
import haloHomeProductLookbook from './haloHomeProductLookbook';
import mobileMenuToggle from '../global/mobile-menu-toggle';
import quickView from '../global/quick-view';
import menu from '../global/menu';
import privacyCookieNotification from '../global/cookieNotification';
import loadingProgressBar from '../global/loading-progress-bar';
import quickSearch from '../global/quick-search';
import { Fancybox } from 'fancybox';

import addBrandForWishlistItem from './addBrandForWishlistItem';
import addBrandForOrderItem from './addBrandForOrderItem';
import addBrandForWishlistSidebar from './addBrandForWishlistSidebar';

import { api } from '@bigcommerce/stencil-utils';


import ProductDetails from '../common/product-details';
import { type } from 'jquery';
import { forEach } from 'lodash';

export default function(context) {
    const $context = context,
        token = context.token,
        theme_settings = context.themeSettings;

    var $header = $('header.header'),
        height_promotion = $('.halo-topHeader').outerHeight(),
        height_header = $header.outerHeight();

    // if ($('.header-layout-2').length) {
    //     height_header = $header.outerHeight() - $('.bottomHeader-container').outerHeight();
    // }

    var scroll_position = $(window).scrollTop();

    var checkJS_load = true,
        check_loadProductCarousel = true,
        check_loadProductGrid = true,
        check_homeProductTabByCategory = true,
        check_homeProductByCategory = true,
        check_homeProductByCategory2 = true,
        check_imageGalleryFancyBox = true,
        check_homeLPCarousel = true,
        check_homeImageCarousel = true,
        check_homeImageInstagramCarousel = true,
        check_homeImageInstagram2Carousel = true,
        check_homeImageGalleryCarousel = true,
        check_homePopularCategoryCarousel = true,
        check_homeLookBook1Carousel = true,
        check_homeLookBook2Carousel = true,
        check_homeCustomerCarousel = true,
        check_homeBlogPostsCarousel = true,
        check_homeImagePolicyCarousel = true,
        check_homeCategoryCarousel = true;

    if ($('#haloAZBrandsTable').length) {
        AZBrands(context);
    }

    function loadFunction() {
        if (checkJS_load) {
            checkJS_load = false;

            haloMegaMenuEditor($context);
            mobileMenuToggle();
            haloRecentlyBoughtPopup($context);
            haloBeforeYouLeave($context);
            haloAjaxAddToCart($context);
            haloHomeProductLookbook($context);
            haloAskAnExpert($context);
            haloAskAnExpertDigital($context);
            haloAskAnExpertReminder($context);
            quickView($context);
            quickSearch($context);
            menu();
            privacyCookieNotification();
            loadingProgressBar();

            /* Event Page */
            eventFilterSidebar();
            eventFilter();
            viewEventMore();

            /* Account Wishlist Sidebar */
            accountWishlistSidebar($context);

            /* Account Information */
            accountInformation();

            /* Account Address */
            getAccountAddress();
            changeNavigationPosition();
            changeWishlistPosition();
            changeDateFormat();
            orderTabs($context);
            viewMoreButton();
            addBrandForWishlistItem($context);
            removeWishlistItem();

            if (theme_settings.halo_recently_viewed_products) {
                haloRecentlyViewedProduct($context);
            }

            if (theme_settings.halo_newsletter_popup) {
                haloNewsletterPopup($context);
            }

            haloAjaxLoginPopup();
            activeMenuMobile();
            variantImageColor();
            footerMobileToggle();
            checkCookiesPopup();
            backToTop();
            blogTags();

            if (window.innerWidth < 1025) {
                carouselCompetition1();
                carouselCompetition2();
                carouselDigitalCardMobile();
            }
            
            if($('.special-product-blocks').length) {
                /* Special Product */
                customSpecialProduct($context);
            }  
            
            /* Gift card Preview */
            let themeCard = $('#card_name_dropdown');
            if(themeCard.length) {
                themeCard.on('change', function() {
                    reviewGiftCard();
                });
            }

            /* Check Balance */
            if($('.page-type-giftcertificates').length) {
                balanceVource();
            }
        }
        
    }
    function eventLoad() {
        $(document).ready(function() {
            const wWidth = window.innerWidth,
                tScroll = $(this).scrollTop();

            $('body').addClass('menu-is-load');
            searchFormMobile();
            loadOptionForProductCarousel(tScroll);
            loadProductGrid(tScroll);
            loadProductTabByCategory(tScroll);
            loadProductByCategory(tScroll);
            loadProductByCategory2(tScroll);
            hoverMenu();
            homeImageCarousel(tScroll);
            homeParallax(tScroll);
            halofadeInUp(tScroll);

            /* Halo Start */
            if(document.querySelector(".page-type-giftcertificates")) {
                triggerInput();
                // customCarlendarDropdown();
            }
            scrollDownItem();

            customTabsPageMember();

            eventFilterSidebar();
            eventFilter();
            viewEventMore();

            if (window.innerWidth < 1025) {
                carouselCompetition1();
                carouselCompetition2();
                groupProducts();
                carouselDigitalCardMobile();
            }

            if(!$('.page-type-category')) {
                showMoreDigitalProducts();
            }
            

            if($('.special-product-blocks').length) {
                /* Special Product */
                customSpecialProduct($context);
            }

            if($('.special-ticket-blocks').length) {
                customSpecialTicket2($context);
                customSpecialTicket($context).then((data) => {
                    appendTicketOptions();
                    getTotalValue();

                    $('.custom-checkout-form').click(function(e) {
                        e.preventDefault();
                        if(validateForm()) {
                            click_addToCart();
                        }
                    });
                });
            }

            if($('.productView').length && !$(".page-type-product").length) {
                ProductDetails($('.productView'), $context, window.BCData.product_attributes);
            }


        });

        $(window).on('scroll', (e) => {
            const $target = $(e.currentTarget);
            const tScroll = $target.scrollTop();

            loadFunction();
            haloStickyHeader(tScroll);
            loadOptionForProductCarousel(tScroll);
            loadProductGrid(tScroll);
            loadProductTabByCategory(tScroll);
            loadProductByCategory(tScroll);
            loadProductByCategory2(tScroll);
            homeImageCarousel(tScroll);
            homeParallax(tScroll);
            halofadeInUp(tScroll);
        });

        $(document).on('keydown mousemove touchstart', (e) => {
            loadFunction();
        });

        //
        // Resize
        // -----------------------------------------------------------------------------
        $(window).on('resize', (e) => {
            checkCookiesPopup();
            activeMenuMobile();
            searchFormMobile();
            changeNavigationPosition();
            changeWishlistPosition();
        });
    }
    eventLoad();

    function Event() {
        //
        // Change Option
        // // -----------------------------------------------------------------------------
        const btn_cardOption = '.card-option .form-option-swatch';

        $(document).on('click', btn_cardOption, e => {
            e.preventDefault();
            const $targer = $(e.currentTarget),
                thisTitle = $targer.find('.form-option-variant').attr('title');

            $(btn_cardOption).removeClass('is-active');
            $targer.addClass('is-active');
            $targer.parents('.card').find('.card-name').text(` - ${thisTitle}`);
        });

        //
        // Close
        // -----------------------------------------------------------------------------
        const $btn_close = $('.btn-close');
        const $btn_mobileMenu = $('.mobileMenu-toggle');
        const $beforeYouLeave = $('#before-you-leave');

        $btn_close.on('click', (e) => {
            e.preventDefault();
            const $target = $(e.currentTarget);

            $target.parents('.halo-side-block').removeClass('is-open');

            if ($('body').hasClass('openBeforeYouLeave')) {
                $('body').removeClass('openBeforeYouLeave');

                setTimeout(function() {
                    $beforeYouLeave.hide();
                }, 200);
            } else {
                $('body').removeClass('is-side-block');

                setTimeout(function() {
                    $sideLogin.hide();
                    $sideCart.hide();
                    $('#sideBlock_category').hide();
                    $('#sideBlock_search').hide();
                    $('#sideBlock_brand').hide();
                    $('#sideBlock_blog').hide();
                }, 200);
            }

            if ($('body').hasClass('has-activeNavPages')) {
                $btn_mobileMenu.trigger('click');
            }
        });

        //
        // Login Form
        // -----------------------------------------------------------------------------
        if (!$('body').hasClass('page-type-login')) {
            $('[data-login-form]').on('click', event => {
                event.preventDefault();
                if ($('.halo-auth-sidebar').hasClass('is-open')) {
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                } else {
                    $('.halo-auth-sidebar').addClass('is-open');
                    $('body').addClass('openAuthSidebar');
                }
            });
        } else {
            $('[data-login-form]').on('click', event => {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $('.login').offset().top,
                }, 700);
            });
        }

        //
        // Account Form
        // -----------------------------------------------------------------------------
        $('.halo-auth-sidebar .halo-sidebar-header .close').on('click', event => {
            event.preventDefault();

            $('.halo-auth-sidebar').removeClass('is-open');
            $('body').removeClass('openAuthSidebar');
        });

        $(document).on('click', event => {
            if ($('.halo-auth-sidebar').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-sidebar').length === 0) && ($(event.target).closest('[data-login-form]').length === 0) && ($(event.target).closest('[data-login-mobile]').length === 0)) {
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                }
            }
        });

        //
        // Live Help Popup
        // -----------------------------------------------------------------------------
        $('[data-header-liveHelp]').on('click', event => {
            event.preventDefault();

            if ($(window).width() < 1025) {
                if ($('#halo-live-help').hasClass('is-open')) {
                    $('#halo-live-help').removeClass('is-open');
                    $('body').removeClass('openLiveHelp');
                } else {
                    $('#halo-live-help').addClass('is-open');
                    $('body').addClass('openLiveHelp');
                }
            } else {
                if ($('#dropdown-liveHelp').hasClass('is-open')) {
                    $('#dropdown-liveHelp').removeClass('is-open');
                    $('body').removeClass('openLiveHelp');
                } else {
                    $('#dropdown-liveHelp').addClass('is-open');
                    $('body').addClass('openLiveHelp');
                }
            }
        });

        $(document).on('click', event => {
            if ($('.halo-live-help').hasClass('is-open')) {
                event.preventDefault();
                
                if (($(event.target).closest('[data-header-liveHelp]').length === 0)) {
                    $('.halo-live-help').removeClass('is-open');
                    $('body').removeClass('openLiveHelp');
                }
            }
        });

        //
        // Add To Wish List
        // -----------------------------------------------------------------------------
        $(document).on('click', '.card .wishlist', (e) => {
            e.preventDefault();
            var $this_wl = $(e.currentTarget);
            var url_awl = $this_wl.attr('href');

            if ($('body').hasClass('is-login')) {
                $.post(url_awl).done(function() {
                    window.location.href = url_awl;
                });
            } else {
                window.location.href = '/login.php';
            }
        });

        //
        // Footer Info Heading Toggle
        // -----------------------------------------------------------------------------
        const $footerHeadingToggle = $('.footer-info-heading--toggle');

        $footerHeadingToggle.on('click', (e) => {
            e.preventDefault();
            const wWidth = window.innerWidth;

            if (wWidth < 768) {
                const $target = $(e.currentTarget);
                const $thisFooterInfo = $target.parents('.footer-info-col');
                const $thisFooterInfo_list = $thisFooterInfo.find('.footer-info-list');

                $thisFooterInfo.toggleClass('open-dropdown');

                if ($thisFooterInfo.hasClass('open-dropdown')) {
                    $thisFooterInfo_list.slideDown(400);
                } else {
                    $thisFooterInfo_list.slideUp(400);
                }
            }
        });
    }
    Event();

    function hoverMenu() {
        if ($(window).width() > 1024) {
            if ($('.navPages-list:not(.navPages-list--user) > .navPages-item.has-dropdown').length) {
                $('.navPages-list:not(.navPages-list--user) > .navPages-item.has-dropdown').on('mouseover', event => {
                    $('body').addClass('openMenuPC');
                })
                .on('mouseleave', event => {
                    $('body').removeClass('openMenuPC');
                });
            }
        }
    }

    function searchFormMobile() {
        if ($('.bottomHeader-item #quickSearch').length) {
            $('.bottomHeader-item #quickSearch').appendTo('#halo-search-sidebar .halo-sidebar-search');
        }
    }

    function activeMenuMobile() {
        $('.halo-menu-sidebar .halo-sidebar-close').on('click', event => {
            event.preventDefault();

            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }
        });

        $(document).on('click', event => {
            if ($('body').hasClass('has-activeNavPages')) {
                if (($(event.target).closest('.halo-menu-sidebar').length === 0) && ($(event.target).closest('.mobileMenu-toggle').length === 0) && ($(event.target).closest('[data-menu-mobile]').length === 0)) {
                    $('.mobileMenu-toggle').trigger('click');
                }
            }
        });

        var $menuPc = $('.halo-bottomHeader .bottomHeader-container .navPages-list:not(.navPages-list--user)'),
            $menuMobile = $('#halo-menu-sidebar .navPages-list:not(.navPages-list--user)');

        if ($(window).width() <= 1024) {
            $('.mobileMenu-toggle').on('click', event => {
                if ($menuPc.length) {
                    if (!$menuMobile.children().length) {
                        $menuPc.children().appendTo($menuMobile);
                    }
                }
            });
        }
    }

    function variantImageColor() {
        $(document).on('click', '.card .card-option .form-option', function() {
            var self = $(this),
                newImageVariant = self.data('image'),
                productItemElm = self.closest('.card'),
                variantTitle = self.data('title');

            productItemElm.find('.variant_color_name').html(variantTitle)
            self.parents('.card-option').find('.form-option').removeClass('active');
            self.addClass('active');
            if (newImageVariant != "undefined") {
                productItemElm.find('.card-img-container img').attr({
                    "src": newImageVariant,
                    "srcset": newImageVariant

                });
                return false;
            }
        });
    }

    function haloAskAnExpert(context) {
        var message;

        if (!$('body').hasClass('page-type-product')) {
            $('.ask-an-expert-link').on('click', event => {
                event.preventDefault();

                const $options = {
                    template: 'halothemes/ask-an-expert/halo-ask-an-expert-content'
                };

                const modal = defaultModal();

                modal.$modal.removeClass().addClass('modal modal--standard halo-ask-an-expert');
                modal.open();

                utils.api.getPage('/', $options, (err, response) => {
                    modal.updateContent(response);
                });
            });
        } else if ($('body').hasClass('page-type-product')) {
            $('.ask-an-expert-link').on('click', event => {
                event.preventDefault();

                const $options = {
                    template: 'halothemes/ask-an-expert/halo-ask-an-expert-content'
                };

                const modal = defaultModal();

                modal.$modal.removeClass().addClass('modal modal--standard halo-ask-an-expert');
                modal.open();

                utils.api.product.getById($context.productId, $options, (err, response) => {
                    modal.updateContent(response);
                });
            });
        }

        $(document).on('click', '#halo-ask-an-expert-button', event => {
            var ask_proceed = true,
                subjectMail = context.themeSettings.halo_ask_an_expert_subject_mail,
                mailTo = context.themeSettings.halo_ask_an_expert_mailto,
                customerName = $('#halo-ask-an-expert-form input[name=customer_name]').val(),
                customerMail = $('#halo-ask-an-expert-form input[name=customer_email]').val(),
                customerPhone = $('#halo-ask-an-expert-form input[name=customer_phone]').val(),
                typeContact = $('#halo-ask-an-expert-form input[name=type_contact]:checked').val(),
                typePackage = $('#halo-ask-an-expert-form input[name=type_package]:checked').val(),
                customerMessage = $('#halo-ask-an-expert-form textarea[name=comment_area]').val();

            if (!$('body').hasClass('page-type-product')) {
                message = "<div style='border: 1px solid #e6e6e6;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                                <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>" + subjectMail + "</h2>\
                                <p style='border-bottom: 1px solid #e6e6e6;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a new message from your online store's ask an expert form.</p>\
                                <table style='width:100%;'>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Email Address: </strong></td><td>" + customerMail + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Phone Number: </strong></td><td>" + customerPhone + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>How would you like me to contact you? </strong></td><td>" + typeContact + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Do you need: </strong></td><td>" + typePackage + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>What can i help you with today? </strong></td><td>" + customerMessage + "</td></tr>\
                        </table></div>";
            } else if ($('body').hasClass('page-type-product')) {
                var img = $('.halo-ask-an-expert [data-product-image]').attr('data-product-image'),
                    title = $('.halo-ask-an-expert [data-product-title]').attr('data-product-title'),
                    sku = $('.halo-ask-an-expert [data-product-sku]').attr('data-product-sku'),
                    url = $('.halo-ask-an-expert [data-product-url]').attr('data-product-url');

                message = "<div style='border: 1px solid #e6e6e6;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                                <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>" + subjectMail + "</h2>\
                                <p style='border-bottom: 1px solid #e6e6e6;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a new message from your online store's ask an expert form.</p>\
                                <table style='width:100%;'>\
                                <tr>\
                                    <td style='border-bottom: 1px solid #e6e6e6;padding-bottom: 25px;margin-bottom:25px;width:50%;'><img width='100px' src='" + img + "' alt='" + title + "' title='" + title + "'></td><td style='border-bottom: 1px solid #e6e6e6;padding-bottom: 25px;margin-bottom:25px;'>" + sku + " <br><a href='" + url + "'>" + title + "</a></td>\
                                </tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Email Address: </strong></td><td>" + customerMail + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Phone Number: </strong></td><td>" + customerPhone + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>How would you like me to contact you? </strong></td><td>" + typeContact + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Do you need: </strong></td><td>" + typePackage + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>What can i help you with today? </strong></td><td>" + customerMessage + "</td></tr>\
                        </table></div>";
            }

            $("#halo-ask-an-expert-form input[required], #halo-ask-an-expert-form textarea[required]").each((index, el) => {
                if (!$.trim($(el).val())) {
                    $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                    ask_proceed = false;
                } else {
                    $(el).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
                }

                var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                if ($(el).attr("name") == "customer_email" && !email_reg.test($.trim($(el).val()))) {
                    $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                    ask_proceed = false;
                }
            });

            if (ask_proceed) {
                var ask_post_data = {
                    "api": "i_send_mail",
                    "subject": subjectMail,
                    "from_name": customerName,
                    "email": mailTo,
                    "email_from": customerMail,
                    "message": message
                };

                $.post('https://themevale.net/tools/sendmail/quotecart/sendmail.php', ask_post_data, (response) => {
                    if (response.type == 'error') {
                        var output = '<div class="alertBox alertBox--error"><p class="alertBox-message">' + response.text + '</p></div>';
                        var newHeading = 'Ai alte intrebari?!'
                    } else {
                        var output = `<div class="alertBox alertBox--success"><p class="alertBox-message custom-page-text fw-500 text-center">Multumim pentru mesajul tau. Vei primi un raspuns de la echipa noastra in curand pe email.</p>
                        <p class="alertBox-message custom-page-text fw-500 text-center">Intre timp, descopera cele mai noi produse adaugate!</p>

                        <a href="/categories/c-r-i/" class="button button--tertiary hover-gold btn-mobile">NOUTATI</a></div>`;

                        var newHeading = 'Multumim!'


                        $("#halo-ask-an-expert-form  input[required], #halo-ask-an-expert-form textarea[required]").val('');
                        $("#halo-ask-an-expert-form").hide();
                    }
                    $("#halo-ask-an-expert-results").hide().html(output).show();
                    $(".heading-submit-form--success").hide().text(newHeading).show();
                }, 'json');
            }
        });
    }

    function haloAskAnExpertReminder(context) {
        var message;

        $(document).on('click', '#reminder-annouce-button', event => {
            var ask_proceed = true,
                subjectMail = context.themeSettings.halo_ask_an_expert_subject_mail,
                mailTo = context.themeSettings.halo_ask_an_expert_mailto,
                customerName = $('#halo-ask-an-expert-form input[name=customer_name]').val(),       
                customerPhone = $('#halo-ask-an-expert-form input[name=customer_phone]').val(),
                customerOption = $('.reminder-form .ask-top-content .check-box-group input[name="reminder-form-radio"]:checked').val();
                message = "<div style='border: 1px solid #e6e6e6;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                                <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>" + subjectMail + "</h2>\
                                <p style='border-bottom: 1px solid #e6e6e6;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a new message from your online store's ask an expert form.</p>\
                                <table style='width:100%;'>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Phone Number: </strong></td><td>" + customerPhone + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Cate carti vrei sa citesti anul acesta?</strong></td><td>" + customerOption + "</td></tr>\
                        </table></div>";
            
            $("#halo-ask-an-expert-form input[required], #halo-ask-an-expert-form textarea[required]").each((index, el) => {
                if (!$.trim($(el).val())) {
                    $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                    ask_proceed = false;
                } else {
                    $(el).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
                }
            });

            if (ask_proceed) {
                var ask_post_data = {
                    "api": "i_send_mail",
                    "subject": subjectMail,
                    "from_name": customerName,
                    "email": mailTo,
                    "message": message
                };

                $(".reminder-form-wrapper").hide();
                $("#reminder-annouce-results").hide().html(`<div class="reminder-annouce-wrapper">
                        <h4 class="reminder-annouce-title">Esti inscris!</h4>
                        <div class="reminder-annouce-content">
                            <p>Abia asteptam sa fiim alaturi de tine in dezvoltarea obiceiului de a citi. Vei primi o confirmare si notificari pe email/mesaj Whatsapp.</p>
                            <p>Intre timp, descopera cele mai noi produse adaugate!</p>
                        </div>
                        <a href="#" class="button button--tertiary reminder-annouce-button hover-gold">NOUTATI</a>
                    </div>`).show();

                $.post('https://themevale.net/tools/sendmail/quotecart/sendmail.php', ask_post_data, (response) => {
                    if (response.type == 'error') {
                        var output = '<div class="alertBox alertBox--error"><p class="alertBox-message">' + response.text + '</p></div>';
                        var newHeading = 'Ai alte intrebari?!';
                    } else {
                        var output = `<div class="reminder-annouce-wrapper">
                        <h4 class="reminder-annouce-title">Esti inscris!</h4>
                        <div class="reminder-annouce-content">
                            <p>Abia asteptam sa fiim alaturi de tine in dezvoltarea obiceiului de a citi. Vei primi o confirmare si notificari pe email/mesaj Whatsapp.</p>
                            <p>Intre timp, descopera cele mai noi produse adaugate!</p>
                        </div>
                        <a href="#" class="button button--tertiary reminder-annouce-button hover-gold">NOUTATI</a>
                    </div>`;

                        var newHeading = 'Multumim!'

                        $(".reminder-form-wrapper").hide();
                    }
                    $("#reminder-annouce-results").hide().html(output).show();
                }, 'json');
            }
        });
    }

    function footerMobileToggle() {
        $('.footer-info-col--mobile .footer-info-heading').on('click', event => {
            $('.footer-info-col--mobile .footer-info-heading').not($(event.currentTarget)).removeClass('is-clicked');

            if ($(event.currentTarget).hasClass('is-clicked')) {
                $(event.currentTarget).removeClass('is-clicked');
            } else {
                $(event.currentTarget).addClass('is-clicked');
            }

            $('.footer-info-col--mobile').each((index, element) => {
                if ($('.footer-info-heading', element).hasClass('is-clicked')) {
                    $(element).find('.footer-info-wrapper').slideDown("slow");
                } else {
                    $(element).find('.footer-info-wrapper').slideUp("slow");
                }
            });
        });
    }

    function checkCookiesPopup() {
        if ($('#consent-manager').length) {
            var height = $('#consent-manager').height() + 15;

            $('#recently_bought_list').css('bottom', height);
        }
    }

    function backToTop() {
        var offset = $(window).height() / 2;
        const backToTop = $('#haloBackToTop');

        $(window).scroll(event => {
            ($(event.currentTarget).scrollTop() > offset) ? backToTop.addClass('is-visible'): backToTop.removeClass('is-visible');
        });

        backToTop.on('click', event => {
            event.preventDefault();

            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    function haloStickyHeader(tScroll) {
        if (theme_settings.halo_headerSticky) {
            if (tScroll > height_promotion && tScroll < scroll_position) {
                if ($(window).width() > 1024) {
                    if ($('.halo-search-sticky').length) {
                        $('.halo-search-main #quickSearch').appendTo('.halo-search-sticky');
                    }
                }
                if (!$('.header-height').length) {
                    $header.before('<div class="header-height" style="height: ' + height_header + 'px"></div>');
                }
                $header.addClass('is-sticky');
                $('body').addClass('is-sticky-header');
                $header.css('animation-name', 'fadeInDown');
            } else {
                if ($('.halo-search-main').length) {
                    $('.halo-search-sticky #quickSearch').appendTo('.halo-search-main');
                }
                $header.removeClass('is-sticky');
                $('body').removeClass('is-sticky-header');
                $('.header-height').remove();
                $header.css('animation-name', '');
            }

            scroll_position = tScroll;
        }
    }

    function loadOptionForProductCarousel(tScroll) {
        const $loadProductCarousel = $('.productCarousel');

        if ($loadProductCarousel.length) {
            const $loadProductCarouselTop = $loadProductCarousel.offset().top - screen.height;

            if (tScroll > $loadProductCarouselTop && check_loadProductCarousel) {
                check_loadProductCarousel = false;

                if ($('.productCarousel').length > 0) {
                    $('.productCarousel').each((index, element) => {
                        var $prodWrapId = $(element).attr('id');

                        haloAddOptionForProduct($context, $prodWrapId);
                    });
                }
            }
        }
    }

    function loadProductGrid(tScroll) {
        const $loadProductGrid = $('.productGrid:not(.productListing)');

        if ($loadProductGrid.length) {
            const $loadProductGridTop = $loadProductGrid.offset().top - screen.height;

            if (tScroll > $loadProductGridTop && check_loadProductGrid) {
                check_loadProductGrid = false;

                if ($('.productGrid:not(.productListing)').length > 0) {
                    let col = context.themeSettings.home_product_col,
                        limitProduct = 2 * parseInt(col);

                    let isPageWishlist = document.querySelector('.page-type-wishlist');

                    if(isPageWishlist) {
                        limitProduct = 9;
                    }

                    $('.productGrid:not(.productListing)').each((index, element) => {
                        var $prodWrapId = $(element).attr('id');

                        $(element).find('.product:visible').css('display', 'none');
                        $(element).find('.product:hidden').slice(0, limitProduct).css('display', 'inline-block');

                        if ($(element).find('.product').length > limitProduct) {
                            $(element).after('<div class="productGrid-showMore"><a class="button button--primary" href="#" data-href="' + $prodWrapId + '">VEZI TOATE</a></div>');
                        }

                        haloAddOptionForProduct($context, $prodWrapId);
                    });

                    $('.productGrid-showMore .button').on('click', event => {
                        event.preventDefault();
                        var target = $(event.currentTarget),
                            targetId = target.data('href');

                        target.blur();

                        $('[data-block=' + targetId + ']').find('.product:hidden').slice(0, limitProduct).css('display', 'inline-block');

                        if ($('[data-block=' + targetId + ']').find('.product:hidden').length == 0) {
                            target.addClass('disable').text('No more items');
                        }
                    });
                }
            }
        }
    }

    function loadProductTabByCategory(tScroll) {
        const $homeProductTabByCategory = $('.halo-block-product-tabs .productCarousel-tabs');

        if ($homeProductTabByCategory.length) {
            const $homeProductTabByCategoryTop = $homeProductTabByCategory.offset().top - screen.height;

            if (tScroll > $homeProductTabByCategoryTop && check_homeProductTabByCategory) {
                check_homeProductTabByCategory = false;

                const options = {
                    template: 'products/carousel-3'
                };

                if ($('.productCarousel-tabs').length > 0) {

                    if (!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide:not(.product-sample)').length) {
                        var block = $('.productCarousel-tabs .tab-content.is-active'),
                            wrap = block.find('.productCarousel'),
                            catId = block.data('tab-category-id'),
                            catUrl = block.data('tab-category-url'),
                            blockId = block.attr('id');

                        loadCategory(catId, catUrl, options, wrap, blockId);
                    }

                    $('.productCarousel-tabs [data-tab]').on('toggled', (event, tab) => {
                        if (!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide:not(.product-sample)').length) {
                            var block = $('.productCarousel-tabs .tab-content.is-active'),
                                wrap = block.find('.productCarousel'),
                                catId = block.data('tab-category-id'),
                                catUrl = block.data('tab-category-url'),
                                blockId = block.attr('id');

                            if (!$(event.currentTarget).find('.productCarousel').hasClass('slick-initialized')) {
                                loadCategory(catId, catUrl, options, wrap, blockId);
                            }
                        }
                    });
                }
            }
        }
    }

    function loadProductByCategory(tScroll) {
        const $homeProductByCategory = $('.halo-block-product-4 .productCarousel-custom');

        if ($homeProductByCategory.length) {
            const $homeProductByCategoryTop = $homeProductByCategory.offset().top - screen.height;

            if (tScroll > $homeProductByCategoryTop && check_homeProductByCategory) {
                check_homeProductByCategory = false;

                const options = {
                    template: 'products/carousel-3'
                };

                if ($('.halo-block-product-4 .productCarousel-custom').length > 0) {

                    if (!$('.halo-block-product-4 .productCarousel-custom .productCarousel-content .productCarousel .productCarousel-slide:not(.product-sample)').length) {
                        var block = $('.halo-block-product-4 .productCarousel-custom .productCarousel-content'),
                            wrap = block.find('.productCarousel'),
                            catId = block.data('category-id'),
                            catUrl = block.data('category-url'),
                            blockId = block.attr('id');

                        loadCategory(catId, catUrl, options, wrap, blockId);
                    }
                }
            }
        }
    }

    function loadProductByCategory2(tScroll) {
        const $homeProductByCategory2 = $('.halo-block-product-5 .productCarousel-custom');

        if ($homeProductByCategory2.length) {
            const $homeProductByCategory2Top = $homeProductByCategory2.offset().top - screen.height;

            if (tScroll > $homeProductByCategory2Top && check_homeProductByCategory2) {
                check_homeProductByCategory2 = false;

                const options = {
                    template: 'products/carousel-4'
                };

                if ($('.halo-block-product-5 .productCarousel-custom').length > 0) {
                    if (!$('.halo-block-product-5 .productCarousel-custom .productCarousel-content .productCarousel .productCarousel-slide:not(.product-sample)').length) {
                        var block = $('.halo-block-product-5 .productCarousel-custom .productCarousel-content'),
                            wrap = block.find('.productCarousel'),
                            catId = block.data('category-id'),
                            catUrl = block.data('category-url'),
                            blockId = block.attr('id');

                        loadCategory(catId, catUrl, options, wrap, blockId);
                    }
                }
            }
        }
    }

    function loadCategory(id, url, option, wrap, blockId) {
        utils.api.getPage(url, option, (err, response) => {

            if (!wrap.find('.productCarousel-slide:not(.product-sample)').length) {
                wrap.html(response);
                slickCarousel(wrap);
                wrap.parents('.tab-content').find('.loadingOverlay').remove();
                wrap.find('.product-sample').remove();

                var productCarousel = $('.halo-block-product-4 .productCarousel-custom .productCarousel'),
                    showDotbars = productCarousel.data('dots-bar'),
                    $dot = $('.halo-block-product-4 .productCarousel-custom .slick-dots li');

                if (showDotbars) {
                    if($dot) {
                        $dot.each((idx, dot) => {
                            $(dot).attr('data-index', idx + 1);
                        });
                    }

                    productCarousel.each((index, element) => {
                        var $prodWrapId = $(`#${$(element).attr('id')}`);
                        slickDots($prodWrapId[0], $prodWrapId);
                    });
                }


                haloAddOptionForProduct($context, blockId);
            }
        });
    }

    /* Show 3 product in line */
    function groupProducts() {
        const ul = document.querySelector('#halo-related-products .related-digital-list');
        const products = ul?.querySelectorAll('#halo-related-products .product');

        if(!ul || !products) return;
        
        if (window.innerWidth < 1024) {
            // const divs = Array.from(ul.querySelectorAll('div'));
            // divs.forEach(div => div.remove());

            for (let i = 0; i < products.length; i += 3) {
                const productGroup = document.createElement('div');
                const productGroupWrapper = document.createElement('div');
                const prodgressBar = document.createElement('div');

                productGroupWrapper.className = 'product-group-wrapper';
                productGroup.className = 'product-group';
                productGroup.setAttribute("id", "product-group-" + i);
                productGroup.setAttribute("data-dots-bar", true);

                prodgressBar.className = 'progress-wrapper';
                prodgressBar.innerHTML = `<div class="progress" role="progressbar" aria-label="Progress Bar" aria-valuemin="0" aria-valuemax="100" data-bars>
                                            <div class="bar-thumb"></div>
                                        </div>`;
                
                for (let j = i; j < i + 3 && j < products.length; j++) {
                    productGroup.appendChild(products[j]);
                }
                productGroupWrapper.appendChild(productGroup);
                productGroupWrapper.appendChild(prodgressBar);

                ul.appendChild(productGroupWrapper);
            }
            
        } else {
            const productGroups = ul.querySelectorAll('.product-group');
            productGroups.forEach(group => {
                group.querySelectorAll('.product').forEach(product => ul.appendChild(product));
                group.remove();
            });
        }
    }

    /* View more product */
    function showMoreDigitalProducts() {
        const products = document.querySelectorAll('.related-digital-block .product');
        const viewMoreButton = document.getElementById('digital-view-more-button');
        const productsPerPage = 6;
        let currentPage = 1;

        if (!viewMoreButton || !products) return;

        function showProducts(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                if (products[i]) {
                    products[i].style.display = 'inline-block';

                    if(window.innerWidth < 1024){
                        products[i].closest(".product-group-wrapper").classList.remove("process-hidden")
                    }
                }
            }
        }

        function hideAllProducts() {
            products.forEach(product => {
                product.style.display = 'none';
                if(window.innerWidth < 1024){
                    product.closest(".product-group-wrapper").classList.add("process-hidden")
                }
            });
        }

        function updateView() {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            hideAllProducts();
            showProducts(0, endIndex);

            if (endIndex >= products.length) {
                viewMoreButton.textContent = 'No More Product';
                viewMoreButton.disabled = true;
                viewMoreButton.style.pointerEvents = 'none';
                viewMoreButton.style.backgroundColor = '#ccc';
                viewMoreButton.style.borderColor = '#ccc';
            } else {
                viewMoreButton.textContent = 'VEZI TOATE';
                viewMoreButton.disabled = false;
            }
        }

        viewMoreButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage++;
            updateView();
        });

        updateView();
    }
    
    function carouselDigitalCardMobile() {

        let $productGroup = $(".product-group");

        for(let item of $productGroup) {

            slickCarousel($(`#${$(item).attr('id')}`))

            var productCarousel = $(`#${$(item).attr('id')}`),
                showDotbars = productCarousel.data('dots-bar'),
                $dot = $(`#${$(item).attr('id')} .slick-dots li`);

            if (showDotbars) {
                if($dot) {
                    $dot.each((idx, dot) => {
                        $(dot).attr('data-index', idx + 1);
                    });
                }

                productCarousel.each((index, element) => {
                    var $prodWrapId = $(`#${$(element).attr('id')}`);
                    slickDots($prodWrapId[0], $prodWrapId);
                });
            }
        }
    }

    function carouselCompetition1() {
        slickCarousel($('#list-1'))

        var productCarousel = $('#list-1'),
            showDotbars = productCarousel.data('dots-bar'),
            $dot = $('#list-1 .slick-dots li');

        if (showDotbars) {
            if($dot) {
                $dot.each((idx, dot) => {
                    $(dot).attr('data-index', idx + 1);
                });
            }

            productCarousel.each((index, element) => {
                var $prodWrapId = $(`#${$(element).attr('id')}`);
                slickDots($prodWrapId[0], $prodWrapId);
            });
        }
    }

    function carouselCompetition2() {
        slickCarousel($('#list-2'))

        var productCarousel = $('#list-2'),
            showDotbars = productCarousel.data('dots-bar'),
            $dot = $('#list-2 .slick-dots li');

        if (showDotbars) {
            if($dot) {
                $dot.each((idx, dot) => {
                    $(dot).attr('data-index', idx + 1);
                });
            }

            productCarousel.each((index, element) => {
                var $prodWrapId = $(`#${$(element).attr('id')}`);
                slickDots($prodWrapId[0], $prodWrapId);
            });
        }
    }

    function slickCarousel(wrap) {
        wrap.not('.slick-initialized').slick({
            dots: true,
            arrows: false,
            infinite: false,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }

    function slickDots(wrap, productCarousel) {
        const slickDots = wrap.querySelectorAll('.slick-dots li');
        const totalSlideStepCount = slickDots.length;
        const dotbars = wrap.parentElement.querySelector('[data-bars]');
        const dots = wrap.querySelector('.slick-dots');
        const barThumb = dotbars.querySelector('.bar-thumb');
        const barThumbWidth = dotbars.clientWidth / totalSlideStepCount;
        const dotsBarLeft = dotbars.getBoundingClientRect().x;


        barThumb.style.width = `calc(100%/${totalSlideStepCount})`;

        if (slickDots.length === 0) {
            dotbars.remove()
            return
        }

        productCarousel.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            const slickDots = wrap.querySelectorAll('.slick-dots li')
            const totalSlideStepCount = slickDots.length
            const dotsActive = dots.querySelector('.slick-active').dataset.index;


            barThumb.style.width = `calc(100%/${totalSlideStepCount} * ${dotsActive})`;
        });

        dotbars.addEventListener('click', e => {
            const clickedIndex = Math.floor((e.pageX - dotsBarLeft) / barThumbWidth)
            slickDots[clickedIndex].click()
        });
    }

    function homeImageCarousel(tScroll) {
        const $homeLPCarousel = $('.home-landing-page .heroCarousel'),
            $homeImageCarousel = $('#homeBanner2 .homeBanner2__carousel'),
            $homeImageInstagramCarousel = $('#halo_instagram .halo-image-instagram'),
            $homeImageInstagram2Carousel = $('#halo_instagram_2 .halo-image-instagram'),
            $homeImageGalleryCarousel = $('#halo_image_gallery .halo-image-gallery'),
            $homePopularCategoryCarousel = $('#popularCategory .popularCategory__carousel'),
            $homeLookBook1Carousel = $('#lookBook1 .lookBook1__carousel'),
            $homeLookBook2Carousel = $('#lookBook2 .lookBook2__carousel'),
            $homeCustomerCarousel = $('.customerReviews__carousel'),
            $homeBlogPostsCarousel = $('.halo-block-post .halo-recent-post'),
            $homeImagePolicyCarousel = $('#policyBlock .policyBlock__container'),
            $homeCategoryCarousel = $('#halo_shop_category .halo-shop-category');

        if ($homeLPCarousel.length) {
            const $homeLPCarouselTop = $homeLPCarousel.offset().top - screen.height;

            if (tScroll > $homeLPCarouselTop && check_homeLPCarousel) {
                check_homeLPCarousel = false;

                $homeLPCarousel.slick({
                    fade: true,
                    dots: true,
                    arrows: context.mainCarouselArrow,
                    mobileFirst: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: context.mainCarouselSpeed,
                    slide: '[data-hero-slide]',
                    customPaging: (slider, i) => {
                        let index = i + 1;
                        return '<button data-carousel-dot type="button"><span>' + String(index).padStart(2, '') + '</span><span data-dots-totals>|</span><span>' + slider.slideCount + '</span></button>';
                    }
                });
            }
        }

        if ($homeImageCarousel.length) {
            const $homeImageCarouselTop = $homeImageCarousel.offset().top - screen.height;

            if (tScroll > $homeImageCarouselTop && check_homeImageCarousel) {
                check_homeImageCarousel = false;

                $homeImageCarousel.slick({
                    fade: true,
                    dots: false,
                    arrows: true,
                    infinite: false,
                    mobileFirst: false,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        }

        if ($homeImageInstagramCarousel.length) {
            const $homeImageInstagramCarouselTop = $homeImageInstagramCarousel.offset().top - screen.height;

            if (tScroll > $homeImageInstagramCarouselTop && check_homeImageInstagramCarousel) {
                check_homeImageInstagramCarousel = false;

                $homeImageInstagramCarousel.slick({
                    dots: false,
                    arrows: false,
                    infinite: false,
                    mobileFirst: true,
                    autoplay: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [{
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                });
            }
        }

        if ($homeImageInstagram2Carousel.length) {
            const $homeImageInstagram2CarouselTop = $homeImageInstagram2Carousel.offset().top - screen.height;

            if (tScroll > $homeImageInstagram2CarouselTop && check_homeImageInstagram2Carousel) {
                check_homeImageInstagram2Carousel = false;

                $homeImageInstagram2Carousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    mobileFirst: true,
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
        }

        if ($homeImageGalleryCarousel.length) {
            const $homeImageGalleryCarouselTop = $homeImageGalleryCarousel.offset().top - screen.height;

            if (tScroll > $homeImageGalleryCarouselTop && check_homeImageGalleryCarousel) {
                check_homeImageGalleryCarousel = false;

                $homeImageGalleryCarousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: false,
                    mobileFirst: true,
                    autoplay: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
        }

        if ($homePopularCategoryCarousel.length) {
            const $homePopularCategoryCarouselTop = $homePopularCategoryCarousel.offset().top - screen.height;

            if (tScroll > $homePopularCategoryCarouselTop && check_homePopularCategoryCarousel) {
                check_homePopularCategoryCarousel = false;

                $homePopularCategoryCarousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    mobileFirst: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    responsive: [{
                            breakpoint: 1599,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 5
                            }
                        },
                        {
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                });
            }
        }

        if ($homeLookBook1Carousel.length) {
            const $homeLookBook1CarouselTop = $homeLookBook1Carousel.offset().top - screen.height;

            if (tScroll > $homeLookBook1CarouselTop && check_homeLookBook1Carousel) {
                check_homeLookBook1Carousel = false;

                $homeLookBook1Carousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    mobileFirst: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        }

        if ($homeLookBook2Carousel.length) {
            const $homeLookBook2CarouselTop = $homeLookBook2Carousel.offset().top - screen.height;

            if (tScroll > $homeLookBook2CarouselTop && check_homeLookBook2Carousel) {
                check_homeLookBook2Carousel = false;

                $homeLookBook2Carousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    mobileFirst: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 551,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: true
                            }
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                arrows: true
                            }
                        },
                        {
                            breakpoint: 1600,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                arrows: true
                            }
                        }
                    ]
                });
            }
        }

        if ($homeCustomerCarousel.length) {
            const $homeCustomerCarouselTop = $homeCustomerCarousel.offset().top - screen.height;

            if (tScroll > $homeCustomerCarouselTop && check_homeCustomerCarousel) {
                check_homeCustomerCarousel = false;

                let dots = true,
                    arrows = true;

                if ($homeCustomerCarousel.length) {
                    dots = true;
                    arrows = false;
                } else {
                    dots = false;
                    arrows = true;
                }

                $homeCustomerCarousel.slick({
                    dots: dots,
                    arrows: arrows,
                    infinite: true,
                    mobileFirst: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
        }

        if ($homeBlogPostsCarousel.length) {
            const $homeBlogPostsCarouselTop = $homeBlogPostsCarousel.offset().top - screen.height;

            if (tScroll > $homeBlogPostsCarouselTop && check_homeBlogPostsCarousel) {
                check_homeBlogPostsCarousel = false;

                let dots = false,
                    arrows = false,
                    fade = false,
                    column = 1;

                $homeBlogPostsCarousel.slick({
                    dots: dots,
                    arrows: arrows,
                    fade: fade,
                    infinite: true,
                    mobileFirst: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 911,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]
                });
            }
        }

        if ($homeImagePolicyCarousel.length) {
            const $homeImagePolicyCarouselTop = $homeImagePolicyCarousel.offset().top - screen.height;

            if (tScroll > $homeImagePolicyCarouselTop && check_homeImagePolicyCarousel) {
                check_homeImagePolicyCarousel = false;

                $homeImagePolicyCarousel.slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    mobileFirst: true,
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        }

        if ($homeCategoryCarousel.length) {
            const $homeCategoryCarouselTop = $homeCategoryCarousel.offset().top - screen.height;

            if (tScroll > $homeCategoryCarouselTop && check_homeCategoryCarousel) {
                check_homeCategoryCarousel = false;

                $homeCategoryCarousel.slick({
                    dots: false,
                    arrows: false,
                    infinite: true,
                    mobileFirst: true,
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1399,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
        }
    }

    function blogTags() {
        if ($('body[data-page-type="blog"]').length) {
            let arr = {};

            $('#blog-tags .recentPosts_tags [data-tag]').each(function(i) {
                var txt = $(this).data('tag');

                if (arr[txt]) {
                    $(this).remove();
                } else {
                    arr[txt] = true;
                }
            });

            $('#blog-tags .recentPosts_tags').show();
        } else if ($('body[data-page-type="blog_post"]').length) {
            const url_blogTags = '/blog';

            $.get(url_blogTags, function(data) {
                let arr = {};
                const response = $(data).find('#blog-tags .recentPosts_tags').html();

                $('#blog-tags .recentPosts_tags').html(response);

                $('#blog-tags .recentPosts_tags [data-tag]').each(function(i) {
                    var txt = $(this).data('tag');

                    if (arr[txt]) {
                        $(this).remove();
                    } else {
                        arr[txt] = true;
                    }
                });

                $('#blog-tags .recentPosts_tags').show();
            });
        }
    }

    function homeParallax(tScroll) {
        const $homeParallax = $('.haloBannerParallax');

        if ($homeParallax.length) {
            $homeParallax.each(function(i) {
                const $homeParallaxHaft = $homeParallax.eq(i).outerHeight()/2;
                const $homeParallaxTop = $homeParallax.eq(i).offset().top - screen.height;
                const $homeParallaxBottom = $homeParallax.eq(i).offset().top + $homeParallax.outerHeight();
                var img = $homeParallax.eq(i).find('img');

                if (tScroll < $homeParallaxBottom && tScroll > $homeParallaxTop) {
                    $homeParallax.eq(i).find('.haloBannerParallax__img').addClass('is-zoom');
                } else {
                    $homeParallax.eq(i).find('.haloBannerParallax__img').removeClass('is-zoom');
                }

                if ((tScroll > $homeParallaxBottom - $homeParallaxHaft) && (tScroll < $homeParallaxBottom)) {
                    img.css({
                        top: '-20%',
                        transform: 'translate(0, 20%) scale3d(1.1, 1.1, 1.1)',
                        transition: 'all .8s ease'
                    });
                } else if (tScroll < $homeParallaxBottom - $homeParallaxHaft - screen.height) {
                    img.css({
                        top: '20%',
                        transform: 'translate(0, -20%) scale3d(1.1, 1.1, 1.1)',
                        transition: 'all .8s ease'
                    });
                } else {
                    img.css({
                        top: '',
                        transform: '',
                        transition: ''
                    });
                }
            });
        }
    }

    function halofadeInUp(tScroll) {
        const $haloBlock = $('.halo-fadeInUp');

        if ($haloBlock.length) {
            $haloBlock.each(function(i) {
                const $haloBlockTop = $haloBlock.eq(i).offset().top - screen.height + 50;
                const $haloBlockBottom = $haloBlock.eq(i).offset().top + screen.height - 50;
                var img = $haloBlock.eq(i).find('img');

                if (tScroll < $haloBlockBottom && tScroll > $haloBlockTop) {
                    $haloBlock.eq(i).addClass('animated');
                }
            });
        }
    }

    /* Halo Start */
    function triggerInput () {
        const dropdown = document.getElementById('card_name_dropdown');
        const radioForm = document.querySelector('.form-field-group'); 

        function checkRadio (){
            const selectedValue = dropdown.value;

            const radioInput = radioForm.querySelector(`input[value="${selectedValue}"]`);

            if (radioInput) {
            radioInput.checked = true;
            }     
        }  

        checkRadio();
      
        dropdown.addEventListener('change', function() {
            checkRadio();
        });
      
    }

    function customCarlendarDropdown() {
        let dropdownBtn = document.querySelector(".dropbtn"),
            calendaContent = document.getElementById("datepicker");


        function toggleCalendar() {
            var calendar = document.getElementById("calendar");
            calendar.classList.toggle("show");
        }

        function selectDate() {
            var selectedDate = document.getElementById("datepicker").value;
            var dropbtn = document.querySelector(".dropbtn");
            dropbtn.textContent = selectedDate !== "" ? selectedDate : "Select Data";
            document.getElementById("calendar").classList.remove("show");
        }

        dropdownBtn.addEventListener("click", toggleCalendar);

        calendaContent.addEventListener("change", selectDate);

    }

    function triggerRegister() {
        let registerBtn = $('.button-show-auth-sidebar');
        let body = $('body');
        let authSideBar = $('#halo-auth-sidebar');

        registerBtn.on( "click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            body.addClass('openAuthSidebar');
            authSideBar.addClass('is-open');

        });
    }

    if($("#member-convince").length) {
        triggerRegister();
    }

    function scrollDownItem() {
        /* Gift Card Page */
        $(".item-gift__buy").click(function() {
            $('html, body').animate({
                scrollTop: ($("#gift__buy").offset().top + 200)
            }, 1000);
        });
        $(".item-gift__active").click(function() {
            $('html, body').animate({
                scrollTop: ($("#gift__active").offset().top + 200)
            }, 1000);
        });
        $(".item-gift__verify").click(function() {
            $('html, body').animate({
                scrollTop: ($("#gift__verify").offset().top + 200)
            }, 1000);
        });

        /* Member Page */
        $(".member-benefic-button").click(function() {
            $('html, body').animate({
                scrollTop: ($("#member-benefic").offset().top + 200)
            }, 1000);
        });
        $(".member-convince-button").click(function() {
            $('html, body').animate({
                scrollTop: ($("#member-convince").offset().top + 200)
            }, 1000);
        });

        $(".button-register").click(function() {
            $('html, body').animate({
                scrollTop: ($(".reminder-form-wrapper").offset().top + 200)
            }, 1000);
        });
        $(".button-mai-multe").click(function() {
            $('html, body').animate({
                scrollTop: ($(".reminder-body").offset().top + 200)
            }, 1000);
        });

    }

     /* Halo Start */
    function customTabsPageMember() {
        let categoryTitles = document.querySelectorAll('.how-it-work__list .how-it-work__title'),
            categoryContents = document.querySelectorAll('.how-it-work__contents .how-it-work__content');

        if (categoryTitles.length) {
            for (let i = 0; i < categoryTitles.length; i++) {
                categoryTitles[i].addEventListener('click', function (e) {
                    e.preventDefault();

                    let categoryTitleActive = document.querySelector('.how-it-work__list .how-it-work__title.is-active'),
                        categoryContentActive = document.querySelector('.how-it-work__contents .how-it-work__content.is-active');  

                    categoryTitleActive.classList.remove('is-active');
                    categoryContentActive.classList.remove('is-active');

                    if (!this.classList.contains('is-active')) {
                        categoryTitles[i].classList.add('is-active');
                    }

                    if(!categoryContents[i].classList.contains('is-active')){
                        categoryContents[i].classList.add('is-active');
                    }
                });
            }
        }
    }

    /* Special Product */
    function customSpecialProduct($context){
        const context = $context;

        if(context.themeSettings.custom_product_block_special == true){
            var productId = $('[data-special-product-id]').data('special-product-id'),
                setFlag = false;

            const options ={
                template: 'halothemes/product/halo-special-product-tmp'
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
    }

    /* Special Ticket */
    function customSpecialTicket($context){
        return new Promise((resolve, reject) => {
            const context = $context;
    
            var productId = $('[data-special-product-id-1]').data('special-product-id-1'),
                setFlag = false;
    
            const options ={
                template: 'halothemes/product/halo-special-ticket-tmp'
            }
    
            $(window).on('scroll load', function() {
                var scroll = $(window).scrollTop(),
                    header_height = $('.header').height();
    
                if (scroll > header_height) {
                    setFlag = true;
                }
    
                if(setFlag){
                    if(!$('.halo-spacial-product-1 .productView').length){
                        utils.api.product.getById(productId, options, (err, response) => {
                            setFlag = false;
    
                            var scope = '.halo-spacial-product-1';
    
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
                                
                                resolve(response);
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

        });
    }

    function customSpecialTicket2($context){
        const context = $context;

        var productId = $('[data-special-product-id-2]').data('special-product-id-2'),
            setFlag = false;

        const options ={
            template: 'halothemes/product/halo-special-ticket-tmp'
        }

        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop(),
                header_height = $('.header').height();

            if (scroll > header_height) {
                setFlag = true;
            }

            if(setFlag){
                if(!$('.halo-spacial-product-2 .productView').length){
                    utils.api.product.getById(productId, options, (err, response) => {
                        setFlag = false;

                        var scope = '.halo-spacial-product-2';

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

    function appendTicketOptions() {
        const upperInputs = document.querySelectorAll('.product-ticket__form .custom-form-action .form-input');
        const lowerInputs = document.querySelectorAll('.product-ticket__form [data-product-option-change] .form-input');
        const checkoutButton = document.querySelector('.product-ticket__form .custom-checkout-form');

        upperInputs.forEach(function(input, index) {
            input.addEventListener('input', function() {
                lowerInputs[index].value = this.value;
            });
        });
    }

    function getTotalValue() {
        let ticketList = document.querySelectorAll('.special-ticket-blocks .halo-productView-right');

        forEach(ticketList, function(ticket) {
            let priceElement = ticket.querySelector('.custom-price-value').innerHTML;
            let ticketPrice = parseFloat(priceElement);
            let ticketQuantity = ticket.querySelector('.form-increment');
            var qtyInput = ticket.querySelector('.form-input--incrementTotal');

            function getTotal(quantity) {
                var totalValue = quantity * ticketPrice;

                var totalValueElement = ticket.querySelector('.total-value');
                totalValueElement.textContent = totalValue.toFixed(2);
            }

            var quantity = parseInt(qtyInput.value);

            getTotal(quantity);

            /* Change Input */
            qtyInput.addEventListener('change', function() {
                var quantity = parseInt(qtyInput.value);

                getTotal(quantity);
            });

            /* Inc Button */
            ticket.querySelector('.button[data-action="inc"]').addEventListener('click', function() {
                var quantity = parseInt(qtyInput.value) + 1;
                getTotal(quantity);
            });

            /* Dec Button */
            ticket.querySelector('.button[data-action="dec"]').addEventListener('click', function() {
                var quantity = parseInt(qtyInput.value) - 1;
                getTotal(quantity);
            });
        })

       
    }

    function validateForm() {
        var nameInput = document.querySelector('.custom-form__name');
        var emailInput = document.querySelector('.custom-form__email');
        var errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please fill out all fields and provide a valid email address';
        errorMessage.style.color = 'red';

        // Regular expression for validating email format
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (nameInput.value.trim() === '' || !emailPattern.test(emailInput.value)) {
            var formOptions = document.querySelector('.custom-form-options');
            formOptions.querySelector('.error-message') ? formOptions.querySelector('.error-message').remove() : null;
            formOptions.appendChild(errorMessage);
            return false;
        }
    
        return true;
    }

    function click_addToCart() {
        let $qor_results = $('.special-ticket-blocks');
    	const $form = $('form.qor_item_form', $qor_results);
		var arrPro = new Array();
        var c_err = 0;

        $qor_results.find('form.qor_item_form').each(function(i) {
            arrPro.push(i);
        });

        if (arrPro.length > 0) {
            addToCart($form, 0, arrPro, c_err);
        }
    }

    function addToCart(form, i, arrP, c_err) {
        if (i >= arrP.length) {
            window.location = '/cart.php';
            return;
        }

        if (window.FormData === undefined) {
            return;
        }
        var k = arrP[i];

        // $qor.find('.loadingOverlay').show();

        // Add item to cart
        utils.api.cart.itemAdd(filterEmptyFilesFromForm(new FormData(form[k])), (err, response) => {
            const errorMessage = err || response.data.error;

            if (errorMessage) {
                c_err++;
            	// $qor.find('.loadingOverlay').hide();
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;
                alert(tmp.textContent || tmp.innerText);
            }

            i++;
            if (i >= arrP.length) {
                if (!errorMessage || arrP.length > c_err) {
                    window.location = '/checkout';
                }
                return;
            }
            addToCart(form, i, arrP, c_err);
        });
    }

    function filterEmptyFilesFromForm(formData) {
        try {
            for (const [key, val] of formData) {
                if (val instanceof File && !val.name && !val.size) {
                    formData.delete(key)
;
                }
            }
        } catch (e) {
            console.error(e); // eslint-added-line no-console
        }
        return formData;
    }
}


/* Review Gift Card */

function reviewGiftCard(){
    if($('.page-type-giftcertificates').length) {
        let previewButton = $('#gift-certificate-preview');
        previewButton.click();
    }
}

function updateGiftCardInfo(text, value){
    if($('.page-type-giftcertificates').length) {
        let content = document.querySelector(text),
            inputValue = document.querySelector(value);
            
            inputValue.addEventListener("change", function() {
                const selectedValue = inputValue.value;
    
                content.textContent = selectedValue;
            });
    }
}

updateGiftCardInfo('#gift-name__price', '#selected_amount');
updateGiftCardInfo('#gift-name__receive', '#to_name');
updateGiftCardInfo('#gift-mail__receive', '#to_email');
updateGiftCardInfo('#gift-name__send', '#from_name');
updateGiftCardInfo('#gift-mail__send', '#from_email');
updateGiftCardInfo('#gift-message', '#message');


function balanceVource() {
    let inputValue = "";
    let previewUrl = ``;

    const inputElement = document.getElementById("giftcertificatecode");

    inputElement.addEventListener("change", function() {
        inputValue = inputElement.value;
        previewUrl = `/giftcertificates.php?action=balance&giftcertificatecode=${inputValue}`;
    });

    let buttonCheck =document.querySelector('#gift-certificate-balance .form-prefixPostfix-button--postfix'),
        checkStock = $('.custom-check-stock-balance');

    buttonCheck.addEventListener("click", function() {
        api.getPage(previewUrl, {}, (err, content) => {
            if (err) {
                checkStock.append(err);
            }

            if(content) {
                let startIndex = content.search('<main class="page-content">'),
                    endIndex = content.search('</main>') + 7,
                    newBlockPage = document.createElement('div'),
                    newContent = content.slice(startIndex, endIndex);
    
                newBlockPage.innerHTML = newContent;
                
                let stockValue = newBlockPage.querySelector("h1");

                

                stockValue? stockValue : stockValue = "Not found";
                
                checkStock.html(`Soldul cardului: ${stockValue.textContent? stockValue.textContent : stockValue}`);
            }
    
        });
    });
}


function checkConfirmEmail(email, emailConfirm) {
    var email1 = document.getElementById(email);
    var email2 = document.getElementById(emailConfirm);
    var errorText = document.getElementById("errorText");
    var submitButton = document.getElementById("gift-certificate-submit");

    if (email1.value === email2.value) {
        errorText.textContent = "";
        email2.closest('.form-field').classList.remove('confirm--error');
        email2.style.border = "1px solid #252525";
        submitButton.classList.remove("disable");
    } else {
        errorText.textContent = "Emails do not match";
        email2.style.border = "1px solid #cc4749";
        email2.closest('.form-field').classList.add('confirm--error');
        submitButton.classList.add("disable");
    }
}


let toEmail = document.getElementById("to_email2"),
    fromEmail = document.getElementById("from_email2");

if(fromEmail && toEmail){
    toEmail.addEventListener("change", () => checkConfirmEmail("to_email", "to_email2"));
    fromEmail.addEventListener("change", () => checkConfirmEmail("from_email", "from_email2"));
}

/* Zoom Image for Card Digital */
function zoomImageCardDigital() {
    document.addEventListener('DOMContentLoaded', function () {
        const zoomIcons = document.querySelectorAll('.icon--zoom');
        if(zoomIcons) {
            const overlay = document.createElement('div');
            overlay.className = 'digital-overlay';
            document.body.appendChild(overlay);
            overlay.style.display = 'none';
            zoomIcons.forEach(function (icon) {
                icon.addEventListener('click', function () {
                    const productCard = icon.closest('.product');
                    const imgSrc = productCard.querySelector('.card-img-container img').getAttribute('src');

                    let largeImgSrc = imgSrc.replace("160w", "1280w");
                    
                    const popup = document.createElement('div');
                    popup.className = 'digital-popup';
                    const img = document.createElement('img');
                    img.src = largeImgSrc? largeImgSrc : imgSrc;
                    const closeBtn = document.createElement('span');
                    closeBtn.className = 'close-btn';
                    closeBtn.innerHTML = '&times;';

                    closeBtn.addEventListener('click', function () {
                        overlay.removeChild(popup);
                        overlay.style.display = 'none';
                    });
                    popup.appendChild(img);
                    popup.appendChild(closeBtn);
                    overlay.appendChild(popup);
                    overlay.style.display = 'block';
                    popup.style.display = 'block';
                });
            });
            overlay.addEventListener('click', function () {
                const popup = document.querySelector('.digital-popup');
                if (popup) {
                    overlay.removeChild(popup);
                }
                overlay.style.display = 'none';
            });
        }
    });
}

zoomImageCardDigital();


/* Custom Digital Card With ASK */
function haloAskAnExpertDigital(context) {
    var message;

    $(document).on('click', '#halo-ask-an-expert-button-digital', event => {
        var ask_proceed = true,
            subjectMail = "Card Digital",
            mailTo = $('#halo-ask-an-expert-form input[name=recipient_email]').val(),
            customerName = $('#halo-ask-an-expert-form input[name=customer_name]').val(),
            customerMail = $('#halo-ask-an-expert-form input[name=customer_email]').val(),
            customerMessage = $('#halo-ask-an-expert-form textarea[name=comment_area]').val();

        if ($('body').hasClass('page-type-product')) {
            var img = $('.digital-image__link').attr('href'),
                title = $('#email-content .digital__title').text(),
                url = $('#email-content .digital__url').attr('href');

            message = "<div style='border: 1px solid #e6e6e6;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                            <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>" + subjectMail + "</h2>\
                            <p style='border-bottom: 1px solid #e6e6e6;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a card digital from Stephanus.</p>\
                            <table style='width:100%;'>\
                            <tr>\
                                <td style='border-bottom: 1px solid #e6e6e6;padding-bottom: 25px;margin-bottom:25px;width:50%;'><img width='100px' src='" + img + "' alt='" + title + "' title='" + title + "'></td><td style='border-bottom: 1px solid #e6e6e6;padding-bottom: 25px;margin-bottom:25px;'>" + " <br><a href='" + url + "'>" + title + "</a></td>\
                            </tr>\
                        <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>From Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                        <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Address: </strong></td><td>" + customerMail + "</td></tr>\
                        <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Personalized Message: </strong></td><td>" + customerMessage + "</td></tr>\
                    </table></div>";
        }

        $("#halo-ask-an-expert-form input[required], #halo-ask-an-expert-form textarea[required]").each((index, el) => {
            if (!$.trim($(el).val())) {
                $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                ask_proceed = false;
            } else {
                $(el).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
            }

            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if ($(el).attr("name") == "customer_email" && !email_reg.test($.trim($(el).val()))) {
                $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                ask_proceed = false;
            }
        });

        if (ask_proceed) {
            var ask_post_data = {
                "api": "i_send_mail",
                "subject": subjectMail,
                "from_name": customerName,
                "email": mailTo,
                "email_from": customerMail,
                "message": message
            };

            $.post('https://themevale.net/tools/sendmail/quotecart/sendmail.php', ask_post_data, (response) => {
                if (response.type == 'error') {
                    var output = '<div class="alertBox alertBox--error"><p class="alertBox-message">' + response.text + '</p></div>';
                    var newHeading = 'Ai alte intrebari?!'
                } else {
                    var output = `<div class="alertBox alertBox--success"><p class="alertBox-message custom-page-text fw-500 text-center">E-mail a fost trimis cu succes!</p>
                    <p class="alertBox-message custom-page-text fw-500 text-center">Intre timp, descopera cele mai noi produse adaugate!</p>

                    <a href="/categories/c-r-i/" class="button button--tertiary hover-gold btn-mobile" style="display: block; margin-top: 8px;">NOUTATI</a></div>`;

                    var newHeading = 'Multumim!'


                    $("#halo-ask-an-expert-form  input[required], #halo-ask-an-expert-form textarea[required]").val('');
                    $("#halo-ask-an-expert-form").hide();
                }
                $("#halo-ask-an-expert-results-digital").hide().html(output).show();
                $(".heading-submit-form--success").hide().text(newHeading).show();
            }, 'json');
        }
    });
}


/* Event Filter Sidebar */
function eventFilterSidebar () {
    let openFilterBtn = document.querySelector(".button-event-filter"),
        sidebar = document.querySelector(".event-block__left"),
        closeSidebar = document.querySelector(".icon-close-filter");

    if(!openFilterBtn || !sidebar) return;

    openFilterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let menuMobileBtn = document.querySelector(".middleHeader-item__item.item--hamburger");
        sidebar.classList.add("is-open");
        $("html, body").animate({ scrollTop: 0 });
        $("body").addClass('not-scroll');

        menuMobileBtn.querySelector('.mobileMenu-toggle').style.display = "none";
        menuMobileBtn.querySelector('.icon-close-filter').style.display = "block";
    });

    closeSidebar.addEventListener("click", (e) => {
        e.preventDefault();
        let menuMobileBtn = document.querySelector(".middleHeader-item__item.item--hamburger");
        sidebar.classList.remove("is-open");
        $("body").removeClass('not-scroll');

        menuMobileBtn.querySelector('.mobileMenu-toggle').style.display = "block";
        menuMobileBtn.querySelector('.icon-close-filter').style.display = "none";
    });
}

function eventFilter() {
    const filterButton = document.querySelector('.button-fillter');
    const filterCheckboxes = document.querySelectorAll('.filter-check');
    const eventItems = document.querySelectorAll('.event-content__item');
    const clearFilter = document.querySelector(".filter-clear");

    if(!filterButton || !eventItems) return;

    filterButton.addEventListener('click', function (e) {
        e.preventDefault();
        /* Create a Array contain all checkbox value */
        const selectedValues = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.nextElementSibling.textContent);

        /* Filter and Show Item */
        eventItems.forEach(eventItem => {
            const dataFilter = eventItem.getAttribute('data-filter');
            if(dataFilter) {
                const eventData = dataFilter.split(',');
                const eventCategory = eventData[1];

                /* Loop for all data */
                for (let data of eventData) {
                    /* Check checkbox value with data-filter value */
                    if (selectedValues.includes(eventCategory) || selectedValues.includes(data)) {
                        eventItem.style.display = 'flex';
                    } else {
                        eventItem.style.display = 'none';
                    }
                }
                
            }
        });
    });

    /* Clear All Filter */
    clearFilter.addEventListener('click', function (e) {
        e.preventDefault();
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        eventItems.forEach(eventItem => {
            eventItem.style.display = 'flex';
        });
    });
}

function viewEventMore() {
    const eventContents = document.querySelectorAll('.event-content');
    const viewMoreButton = document.querySelector('.event-view-more-button');
    let currentIndex = 0;

    if (!eventContents || !viewMoreButton) return;
    /* Show 2 block Default */
    showNextBlocks();

    viewMoreButton.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex++;

        if (currentIndex < eventContents.length) {
            showNextBlocks();
        }

        /* Hide View More Button */
        hideButton();
    });

    function hideButton() {
        /* Minus 2 blocks show when start */
        if(currentIndex === (eventContents.length - 2)) {
            viewMoreButton.style.display = 'none';
        }
    }

    function showNextBlocks() {
        /* Show block at Index Current and Current + 1 */
        eventContents[currentIndex].style.display = 'block';
        if (currentIndex + 1 < eventContents.length) {
            eventContents[currentIndex + 1].style.display = 'block';
        }
    }
}

/* Get Account Wishlist Sidebar */
function accountWishlistSidebar($context) {
    let productWishlist = document.querySelector('.account-wishlist__list');

    if(!productWishlist) return;

    fetch('/wishlist.php')
        .then(response => response.text())
        .then(data => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = data;

            const trList = tempElement.querySelectorAll('.table-tbody tr');

            const lastTr = trList[trList.length - 1];
            const lastAHref = lastTr.querySelector('a').getAttribute('href');
            
            fetch(lastAHref)
                .then(response => response.text())
                .then(data => {

                    const tempElement = document.createElement('div');
                    tempElement.innerHTML = data;

                    const productBlocks = tempElement.querySelectorAll('.product');

                    if(productBlocks.length === 0) {
                        productWishlist.innerHTML = '<p class="account-wishlist__empty">Your Wish List is empty. When you add items to your Wish List they will appear here.</p>';
                    } else {
                        productBlocks.forEach((productBlock, index) => {
                            /* Show 3 Items */
                            if(index < 3) {
                                productWishlist.appendChild(productBlock);
                            }
                        });
                    }
                    
                    let wishlist_list = document.querySelectorAll(".wishlist-item-example");

                    for(let wishlist__item of wishlist_list){
                        wishlist__item.remove();
                    }

                })

                /* Remove Wishlist Item */
                .then(() => {
                    let wistListItems = document.querySelectorAll('.account-wishlist__list .product');
                    wistListItems.forEach(item => {
                        let removeButton = item.querySelector('.button-remove-wishlist'),
                            link = item.querySelector('.form').getAttribute('action');
                        
                        removeButton.addEventListener('click', function(e) {
                            e.preventDefault();

                            let link = this.closest('.form').getAttribute('action'),
                                itemLink = this.closest('.product');

                            /* Add loading */
                            const loadingElement3 = document.createElement('div');
                                loadingElement3.classList.add('loading-scroll');
                                itemLink.appendChild(loadingElement3);

                            $.post(link).done(function() {
                                itemLink.remove();
                            });
                        });
                    });
                })

                .then(() => {
                    addBrandForWishlistSidebar($context)
                })
        })
        
        .catch(error => console.error('Error:', error)); 
}

/* Get Account Information */
function accountInformation () {
    let accountEditUrl = '/account.php?action=account_details';

    fetch(accountEditUrl)
        .then(response => response.text())
        .then(data => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = data;

            const accountInformation = tempElement.querySelector('.account-body .form-row');

            if(accountInformation) {
                let firstName = accountInformation.querySelector("#account_firstname").value,
                    lastName = accountInformation.querySelector("#account_lastname").value,
                    day = accountInformation.querySelector('.form-select[data-label="day"] option[selected]').value,
                    month = accountInformation.querySelector('.form-select[data-label="month"] option[selected]').value,
                    year = accountInformation.querySelector('.form-select[data-label="year"] option[selected]').value;
                
                let showFirstName = document.querySelector(".col-value--last-name"),
                    showLastName = document.querySelector(".col-value--first-name"),
                    showBirthDay = document.querySelector(".col-value--date");
                
                if(!showFirstName || !showLastName || !showBirthDay) return;
                
                showFirstName.textContent = lastName;
                showLastName.textContent = firstName;
                showBirthDay.textContent = `${day}.${month}.${year}`;
            }
        })
        .catch(error => console.error('Error:', error));
}

function getAccountAddress() {
    let getAccountAddress = '/account.php?action=address_book';

    fetch(getAccountAddress)
        .then(response => response.text())
        .then(data => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = data;

            const AddressList = tempElement.querySelectorAll('.addressList .address');

            for(let addressItem of AddressList) {
                let address = addressItem.querySelectorAll(".address-details li");

                const addressParts = [];

                address.forEach(li => {
                    const content = li.textContent.trim();
                    if (content !== "") {
                        addressParts.push(content);
                    }
                });

                const newAddress = addressParts.join(', ');
                
                if(newAddress !== ""){
                    let addressValue1 = document.querySelector(".col-value--address");
                    let addressValue2 = document.querySelector(".col-value--addres2");

                    if(!addressValue1 || !addressValue2) return;

                    addressValue1.innerHTML = newAddress;
                    addressValue2.querySelector(".col-value--address2").innerHTML = newAddress;
                }
            }
        })
        .catch(error => console.error('Error:', error));
}

function changeWishlistPosition() {
    let wistlistSidebar = document.querySelector(".custom-account-wishlist"),
        placeDesktop = document.querySelector(".page-account__sidebar"),
        placeMobile = document.querySelector(".custom-account-wishlist-mobile");
    
    if(!wistlistSidebar) return;

    if(window.innerWidth < 767) {
        placeMobile.appendChild(wistlistSidebar);
    }else {
        placeDesktop.appendChild(wistlistSidebar);
    }
}

function changeNavigationPosition() {
    let navigationSidebar = document.querySelector(".page-account__sidebar .navBar--account"),
        placeDesktop = document.querySelector(".page-account__sidebar"),
        placeMobile = document.querySelector(".account-navigation-mobile");
    
    if(!navigationSidebar) return;

    if(window.innerWidth < 767) {
        placeMobile.appendChild(navigationSidebar);
    }else {
        placeDesktop.appendChild(navigationSidebar);
    }
}

function converseDate(inputDate) {
    /* Split Day - Month -Year From inputDate */
    const parts = inputDate.match(/(\d+)(?:st|nd|rd|th) (\w+) (\d{4})/);

    if(!parts) return;

    /* Array include all month name */
    const monthName = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
    
    const day = parts[1];
    const month = monthName.indexOf(parts[2]) + 1;
    const year = parts[3];

    /* Format Date */
    if(day && month && year) {
        return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    }

    return null;
}

function changeDateFormat(){
    let orderItems = document.querySelectorAll(".account-listItem.order__item");

    for (let item of orderItems) {
        let orderDate = item.querySelector(".custom-order-date");
        
        let newDateFormat = converseDate(orderDate.textContent);

        if(newDateFormat) {
            orderDate.textContent = newDateFormat;
        }
    }
}

function orderTabs($context) {
    let orderTitles = document.querySelectorAll(".account-listItem.order__item .order-tab__title");

    if(!orderTitles) return;
    
    for(let title of orderTitles) {
        title.addEventListener("click", function(e) {
            e.preventDefault();

            /* Order Tab */
            let item = this.closest(".account-listItem.order__item");
            item.classList.toggle("is-open");

            /* Get TabContent */
            let tabHref = this.getAttribute("href");

            fetch(tabHref)
                .then(response => response.text())
                .then(data => {
                    const tempElement = document.createElement('div');
                    tempElement.innerHTML = data;

                    let orderContent = tempElement.querySelectorAll(".account-body");


                    if(orderContent) {
                        let tabContentItem = item.querySelector(".order-tab__content");

                        tabContentItem.innerHTML = orderContent[0].innerHTML;
                    }
                })

                /* Format Date */
                .then(() => {
                    let definitionList = document.querySelectorAll(".definitionList-value.custom-order-date");
                    
                    for (let orderDate of definitionList) {
                        let newDateFormat = converseDate(orderDate.textContent);
                
                        if(newDateFormat) {
                            orderDate.textContent = newDateFormat;
                        }
                    }
                })

                /* Add Brand */
                .then(() => {
                    console.log("add brand for order item")
                    addBrandForOrderItem($context);
                })
        });
    }

}

function viewMoreButton () {
    var itemsToShow = 3; 
    var items = document.querySelectorAll('.account-listItem');
    var accountViewMoreButton = document.querySelector('.order-viewMore-button');
    var currentIndex = 0;

    if(!accountViewMoreButton) return;

    for (var i = itemsToShow; i < items.length; i++) {
        items[i].style.display = 'none';
    }

    accountViewMoreButton.addEventListener('click', function() {
        var nextIndex = currentIndex + itemsToShow;
        
        for (var i = currentIndex; i < nextIndex && i < items.length; i++) {
            items[i].style.display = 'block';
        }
        
        currentIndex = nextIndex;
        
        if (currentIndex >= items.length) {
            accountViewMoreButton.style.display = 'none';
        }
    });

}


function removeWishlistItem () {
    let wistListItems = document.querySelectorAll('.page-type-wishlist .productGrid .product');
    wistListItems.forEach(item => {
        let removeButton = item.querySelector('.button-remove-wishlist'),
            link = item.querySelector('.form').getAttribute('action');
        
        removeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let link = this.closest('.form').getAttribute('action'),
                itemLink = this.closest('.product');

            /* Add loading */
            const loadingElement3 = document.createElement('div');
                loadingElement3.classList.add('loading-scroll');
                itemLink.appendChild(loadingElement3);

            $.post(link).done(function() {
                itemLink.remove();
            });
        });
    });
}