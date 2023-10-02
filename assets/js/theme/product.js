/*
 Import all product specific js
 */
import utils from "@bigcommerce/stencil-utils";
import Sortable from "sortablejs";
import PageManager from "./page-manager";
import Review from "./product/reviews";
import collapsibleFactory from "./common/collapsible";
import ProductDetails from "./common/product-details";
import videoGallery from "./product/video-gallery";
import { classifyForm } from "./common/utils/form-utils";
import modalFactory from "./global/modal";
import haloYoutubeCarousel from "./halothemes/haloYoutubeVideo";
import haloNextProducts from "./halothemes/haloNextProducts";
import haloNotifyMe from "./halothemes/haloNotifyMe";
import haloStickyAddToCart from "./halothemes/haloStickyAddToCart";
import haloBundleProducts from "./halothemes/haloBundleProducts";

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory("#modal-review-form")[0];
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on("close.fndtn.reveal", () => {
            if (
                this.url.indexOf("#write_review") !== -1 &&
                typeof window.history.replaceState === "function"
            ) {
                window.history.replaceState(
                    null,
                    document.title,
                    window.location.pathname
                );
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();
        haloNextProducts(this.context);
        haloNotifyMe($(".halo-productView"), this.context);
        haloYoutubeCarousel($(".halo-productView .productView-image-wrapper"));
        haloBundleProducts($(".halo-productView"), this.context);

        this.productDetails = new ProductDetails(
            $(".productView"),
            this.context,
            window.BCData.product_attributes
        );
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        this.productReviewHandler();
        this.viewingProduct($(".productView-ViewingProduct"));
        this.soldProduct($(".productView-soldProduct"));
        this.countDownProduct($(".productView-countDown"));
        this.productViewShareLink();
        this.compareColors();
        this.toggleTabs();
        this.productCustomTab();
        this.productShippingTab();
        this.showmoreDescription();
        this.checkProduct();
        this.copyDigitalLink();
        this.digitalDownloadSidebar();
        this.productDigitalDownload();

        haloStickyAddToCart($(".halo-productView"), this.context);

        const $reviewForm = classifyForm(".writeReview-form");

        if ($reviewForm.length === 0) return;

        const review = new Review($reviewForm);

        $("body").on("click", '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on("submit", () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll("valid");
            }

            return false;
        });
    }

    ariaDescribeReviewInputs($form) {
        $form.find("[data-input]").each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr("name")}-msg`;

            $input.siblings("span").attr("id", msgSpanId);
            $input.attr("aria-describedby", msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf("#write_review") !== -1) {
            this.$reviewLink.trigger("click");
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf("#bulk_pricing") !== -1) {
            this.$bulkPricingLink.trigger("click");
        }
    }

    soldProduct($wrapper) {
        if ($wrapper.length > 0) {
            var numbersProduct_text =
                    this.context.themeSettings.product_soldProduct_products,
                numbersHours_text =
                    this.context.themeSettings.product_soldProduct_hours,
                soldProductText =
                    this.context.themeSettings.product_soldProduct_text,
                soldProductText2 =
                    this.context.themeSettings.product_soldProduct_hours_text;

            var numbersProductList = JSON.parse(
                    "[" + numbersProduct_text + "]"
                ),
                numbersProductItem = Math.floor(
                    Math.random() * numbersProductList.length
                ),
                numbersHoursList = JSON.parse("[" + numbersHours_text + "]"),
                numbersHoursItem = Math.floor(
                    Math.random() * numbersHoursList.length
                );

            $wrapper.html(
                '<svg class="icon"><use xlink:href="#icon-fire"/></svg><span class="text">' +
                    numbersProductList[numbersProductItem] +
                    " " +
                    soldProductText +
                    " " +
                    numbersHoursList[numbersHoursItem] +
                    " " +
                    soldProductText2 +
                    "</span>"
            );
            $wrapper.show();
        }
    }

    countDownProduct($wrapper) {
        if ($wrapper.length > 0) {
            var countDown = $wrapper.data("countdown"),
                countDownDate = new Date(countDown).getTime(),
                seft = $wrapper;

            var countdownfunction = setInterval(function () {
                var now = new Date().getTime(),
                    distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(countdownfunction);
                    seft.remove();
                } else {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours = Math.floor(
                            (distance % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60)
                        ),
                        minutes = Math.floor(
                            (distance % (1000 * 60 * 60)) / (1000 * 60)
                        ),
                        seconds = Math.floor((distance % (1000 * 60)) / 1000),
                        strCountDown =
                            '<svg class="icon"><use xlink:href="#icon-bell"/></svg><span class="text"><span>Limited-time offers:</span></span> <span class="num">' +
                            days +
                            'd :</span> <span class="num">' +
                            hours +
                            'h :</span> <span class="num">' +
                            minutes +
                            'm :</span> <span class="num">' +
                            seconds +
                            "s</span>";

                    seft.html(strCountDown);
                }
            }, 1000);
        }
    }

    productViewShareLink() {
        const $shareLinkBtn = $(".shareLinkSocial__button");
        const $shareLinkPopup = $(".shareLinkSocial__popup");
        const $shareLinkClose = $(".shareLinkSocial__close");
        const $shareLinkCopy = $("#shareLinkSocial__copy");

        $shareLinkBtn.on("click", (e) => {
            e.preventDefault();

            if ($shareLinkPopup.hasClass("is-open")) {
                $shareLinkPopup.slideUp(400);
                $shareLinkPopup.removeClass("is-open");
            } else {
                $shareLinkPopup.slideDown(400);
                $shareLinkPopup.addClass("is-open");
            }
        });

        $shareLinkClose.on("click", (e) => {
            e.preventDefault();

            if ($shareLinkPopup.hasClass("is-open")) {
                $shareLinkPopup.slideUp(400);
                $shareLinkPopup.removeClass("is-open");
            }
        });

        $shareLinkCopy.on("click", (e) => {
            e.preventDefault();
            const $target = $(e.target);

            $target.select();
            document.execCommand("copy");
        });
    }

    viewingProduct($wrapper) {
        if ($wrapper.length > 0) {
            var viewerText =
                    this.context.themeSettings.product_viewingProduct_text,
                numbersViewer_text =
                    this.context.themeSettings.product_viewingProduct_viewer,
                numbersViewerList = JSON.parse("[" + numbersViewer_text + "]"),
                timeViewer =
                    parseInt(
                        this.context.themeSettings.product_viewingProduct_change
                    ) * 1000;

            setInterval(function () {
                var numbersViewerItem = Math.floor(
                    Math.random() * numbersViewerList.length
                );

                $wrapper.html(
                    '<svg class="icon"><use xlink:href="#icon-eye"/></svg>' +
                        numbersViewerList[numbersViewerItem] +
                        " " +
                        viewerText
                );
            }, timeViewer);
        }
    }

    compareColors() {
        const $swatchWrapper = $(".halo-compareColors-swatch"),
            $imageWrapper = $(".halo-compareColors-image"),
            $textWrapper = $(".halo-compareColors-text");

        $(".form-option", $swatchWrapper).on("click", (event) => {
            var $this = $(event.currentTarget);

            $this.toggleClass("show-color");

            var title = $this.find(".form-option-variant").attr("title"),
                id = $this.data("product-swatch-value"),
                $color,
                $color2,
                $color3,
                $img,
                $pattern;

            if ($this.hasClass("show-color")) {
                if ($this.find(".form-option-variant--color").length) {
                    $color = $this
                        .find(".form-option-variant--color")
                        .attr("style");

                    $imageWrapper.append(
                        '<div class="item item-color item-' +
                            id +
                            '"><span class="color" style="' +
                            $color +
                            ';"></span><span class="title">' +
                            title +
                            "</span></div>"
                    );
                } else if ($this.find(".form-option-variant--color2").length) {
                    $color = $this
                        .find(".form-option-variant--color2 span:nth-child(1)")
                        .attr("style");
                    $color2 = $this
                        .find(".form-option-variant--color2 span:nth-child(2)")
                        .attr("style");

                    $(".halo-compareColors-image").append(
                        '<div class="item item-color item-' +
                            id +
                            '"><span class="color color2"><span style="' +
                            $color +
                            ';"></span><span style="' +
                            $color2 +
                            ';"></span></span><span class="title">' +
                            title +
                            "</span></div>"
                    );
                } else if ($this.find(".form-option-variant--color3").length) {
                    $color = $this
                        .find(".form-option-variant--color3 span:nth-child(1)")
                        .attr("style");
                    $color2 = $this
                        .find(".form-option-variant--color3 span:nth-child(2)")
                        .attr("style");
                    $color3 = $this
                        .find(".form-option-variant--color3 span:nth-child(3)")
                        .attr("style");

                    $imageWrapper.append(
                        '<div class="item item-color item-' +
                            id +
                            '"><span class="color color3"><span style="' +
                            $color +
                            ';"></span><span style="' +
                            $color2 +
                            ';"></span><span style="' +
                            $color3 +
                            ';"></span></span><span class="title">' +
                            title +
                            "</span></div>"
                    );
                } else if ($this.find(".form-option-variant--pattern").length) {
                    $img = $this
                        .find(".form-option-variant--pattern")
                        .attr("style");
                    $pattern = $this
                        .find(".form-option-variant--pattern")
                        .attr("data-pattern");

                    $imageWrapper.append(
                        '<div class="item item-partern item-' +
                            id +
                            '"><span class="image"><img src=' +
                            $pattern +
                            " alt=" +
                            title +
                            " title=" +
                            title +
                            '></span><span class="title">' +
                            title +
                            "</span></div>"
                    );
                }
            } else {
                $(".item-" + id + "", $imageWrapper).remove();
            }

            if ($imageWrapper.children().length > 0) {
                $textWrapper.hide();
            } else {
                $textWrapper.show();
            }

            if ($(window).width() >= 1025) {
                var el = document.getElementById("color-swatch-image");

                new Sortable(el, {
                    animation: 150,
                });
            }
        });
    }

    toggleTabs() {
        $(".productView-tab [data-collapsible]").on("click", (event) => {
            var $target = $(event.currentTarget);

            if ($target.hasClass("is-open")) {
                $target
                    .parent(".toggle-title")
                    .siblings(".toggle-content")
                    .slideDown("slow");
            } else {
                $target
                    .parent(".toggle-title")
                    .siblings(".toggle-content")
                    .slideUp("slow");
            }
        });
    }

    productCustomTab() {
        if (this.context.themeSettings.show_product_details_tabs == true) {
            if (this.context.themeSettings.show_custom_tab == true) {
                if (this.context.themeSettings.show_custom_tab_type == "all") {
                    const url = this.context.themeSettings.show_custom_tab_link;

                    const option = {
                        template: "halothemes/page/halo-page-template",
                    };

                    utils.api.getPage(url, option, (err, response) => {
                        $(response).appendTo("#tab-custom-mobile");

                        if (
                            $(".productView-tab #tab-custom-mobile")
                                .text()
                                .trim() == ""
                        ) {
                            $(".productView-tab #tab-custom").hide();
                        }
                    });

                    $("#tab-description").find("[data-custom-tab]").remove();
                } else if (
                    this.context.themeSettings.show_custom_tab_type == "custom"
                ) {
                    $("#tab-description")
                        .find("[data-custom-tab]")
                        .appendTo("#tab-custom-mobile");
                }
            }
        } else {
            $(".productView-description").find("[data-custom-tab]").remove();
        }
    }

    productShippingTab() {
        if (this.context.themeSettings.show_product_details_tabs == true) {
            if (this.context.themeSettings.show_shipping_tab == true) {
                if (
                    this.context.themeSettings.show_shipping_tab_type == "all"
                ) {
                    const url =
                        this.context.themeSettings.show_shipping_tab_link;

                    const option = {
                        template: "halothemes/page/halo-page-template",
                    };

                    utils.api.getPage(url, option, (err, response) => {
                        $(response).appendTo("#tab-shipping-mobile");

                        if (
                            $(".productView-tab #tab-shipping-mobile")
                                .text()
                                .trim() == ""
                        ) {
                            $(".productView-tab #tab-shipping").hide();
                        }
                    });

                    $("#tab-description").find("[data-shipping-tab]").remove();
                } else if (
                    this.context.themeSettings.show_shipping_tab_type ==
                    "custom"
                ) {
                    $("#tab-description")
                        .find("[data-shipping-tab]")
                        .appendTo("#tab-shipping-mobile");
                }
            }
        } else {
            $(".productView-description").find("[data-shipping-tab]").remove();
        }
    }

    showmoreDescription() {
        const showMorebtn = $("#tab-descriptionShowmore"),
            descMobile = $("#tab-description-mobile"),
            textShowMore = showMorebtn.find(".button").data("show-more-text"),
            textShowLess = showMorebtn.find(".button").data("show-less-text");

        showMorebtn.find(".button").on("click", (event) => {
            event.preventDefault();

            if (showMorebtn.hasClass("less")) {
                showMorebtn.removeClass("less").addClass("show");
                showMorebtn.find(".button").text(textShowMore);
                descMobile.css("max-height", "300px");
            } else {
                showMorebtn.removeClass("show").addClass("less");
                descMobile.css("max-height", "unset");
                showMorebtn.find(".button").text(textShowLess);
            }
        });
    }

    checkProduct() {
        const relatedProducts = $("#halo-related-products"),
            similarProducts = $("#halo-similar-products");

        if ($(".halo-productView-digital")) return;

        if (!relatedProducts.find(".slick-track").html().length) {
            relatedProducts.hide();
        }

        if (!similarProducts.find(".slick-track").html().length) {
            similarProducts.hide();
        }
    }

    /* Button Copy Digital Link */
    copyDigitalLink() {
        const copyButton = document.querySelector(".copy__button"),
            copyLink = document.querySelector(".coppy__link-url");

        if (!copyButton || !copyLink) return;

        copyButton.addEventListener("click", function (e) {
            e.preventDefault();
            const tempInput = document.createElement("input");
            tempInput.value = copyLink.textContent;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);

            copyButton.innerHTML =
                '<span class="icon icon--check"><svg><use xlink:href="#icon-check"></use></svg></span> <span style="color: #28a210">Copiat</span>';
        });
    }

    /* Digital Download Sidebar */
    digitalDownloadSidebar() {
        const emailButton = document.querySelector(".digital-product-button--email");
        const downloadButton = document.querySelector(".digital-product-button--download");
        const overlay = document.querySelector("#digital-overlay");
        const sidebar = document.querySelector("#digital-sidebar");
        const emailContent = document.querySelector("#email-content");
        const downloadContent = document.querySelector("#download-content");
        const sidebarClose = document.querySelector("#digital-sidebar-close");

        if (!emailButton || !downloadButton) return;

        emailButton.addEventListener("click", function (e) {
            e.preventDefault();
            overlay.style.display = "block";
            sidebar.classList.add("active");
            emailContent.style.display = "block";
            downloadContent.style.display = "none";
        });

        downloadButton.addEventListener("click", function (e) {
            e.preventDefault();
            overlay.style.display = "block";
            sidebar.classList.add("active");
            emailContent.style.display = "none";
            downloadContent.style.display = "block";
        });

        overlay.addEventListener("click", function () {
            overlay.style.display = "none";
            sidebar.classList.remove("active");
        });

        sidebarClose.addEventListener("click", function (e) {
            e.preventDefault();
            overlay.style.display = "none";
            sidebar.classList.remove("active");
        });
    }

    /* Product digital Download function */
    productDigitalDownload() {
        let downloadButton = document.getElementById("digital-download-card");
        const formInput = document.querySelector("#download-content .form-input");
        const formField = document.querySelector("#download-content .form-field");
        const formActions = document.querySelector("#download-content .form-actions");
        const overlay = document.querySelector("#digital-overlay");
        const sidebar = document.querySelector("#digital-sidebar"); 
        let imageSidebar = document.querySelector("#download-content .digital-image__link");
        let imageLink = imageSidebar.getAttribute("href");
        let downloadClicked = false;

        if (!downloadButton || !imageLink) return;

        imageSidebar.addEventListener("click", function (e) {
            e.preventDefault();
        });

        downloadButton.addEventListener("click", function () {
            const email = formInput.value.trim();
    
            if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
    
            formField.innerHTML = `
                <div class="digital-download__success">
                    <h4>Thank You!</h4>
                    <p>If your download doesn’t open automatically, please <a href="${imageLink}" target="_blank">click here</a>.</p>
                </div>
            `;
            formActions.innerHTML = '<a href="#" id="digital-download-card" class="button button--tertiary back-to-digital-card">Back to Ecards</a>';

            let backButton = document.querySelector("#digital-download-card.back-to-digital-card");

            backButton.addEventListener("click", function (e) {
                e.preventDefault();
                overlay.style.display = "none";
                sidebar.classList.remove("active");
            });

            if (!downloadClicked) {
                window.open(`${imageLink}`, "_blank");
                downloadClicked = true;
                return;
            }
        });
    
        function isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(email);
        }
    }
}
