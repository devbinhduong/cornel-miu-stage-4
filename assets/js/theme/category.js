import { hooks, api } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import utils from '@bigcommerce/stencil-utils';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import haloSideAllCategory from './halothemes/haloSideAllCategory';
import haloAddOptionForProduct from './halothemes/haloAddOptionForProduct';
import haloproductDisplayMode from './halothemes/haloProductDisplayMode';
import haloSidebarToggle from './halothemes/haloSidebarToggle';
import haloStickyToolbar from './halothemes/haloStickyToolbar';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();
        haloSideAllCategory();
        haloproductDisplayMode();
        haloSidebarToggle();
        haloStickyToolbar(this.context);
        this.loadOptionForProductCard(this.context);
        this.showProductsPerPage();
        this.showMoreProducts();
        this.showPaginationInfoToolbar();

        this.getSubCategoriesPage();
        this.groupProducts();
        this.showMoreDigitalProducts();
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const $showMoreContainer = $('.halo-product-show-more');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
                paginator: 'halothemes/gallery/halo-product-paginator'
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.find('.product-listing-content').html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
            $showMoreContainer.html($(content.paginator).find('.halo-product-show-more').children());

            $('body').triggerHandler('compareReset');

            if($('#product-listing-container .product').length > 0){
                haloAddOptionForProduct(this.context, 'product-listing-container');
            }

            this.showProductsPerPage();
            this.showMoreProducts();
            this.showPaginationInfoToolbar();

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            const $topProduct = $('#faceted-search-container #featured-products .products-list');

            if ($topProduct.length) {
                $topProduct.slick();
            }
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

    showProductsPerPage() {
        try {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("limit");
            if(c != null){
                var limit = document.querySelectorAll('select#limit option');
                Array.prototype.forEach.call(limit, function(element) {
                    if(element.value == c){
                        element.selected = true;
                    }
                });
            }
        } catch(e) {}
    }

    showMoreProducts() {
        const context = this.context;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: context.categoryProductsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/halo-product-listing',
                sidebar: 'category/sidebar',
                paginator: 'halothemes/gallery/halo-product-paginator',
            },
            showMore: 'category/show-more',
        };

        const $productListingContainer = $('#product-listing-container .productListing');
        const $facetedSearchContainer = $('#faceted-search-container');
        const $paginatorContainer = $('.pagination-list');
        const $showMoreContainer = $('.halo-product-show-more');

        $('#listing-showmoreBtn > a').on('click', (event) => {
            event.preventDefault();

            var nextPage = $('.pagination-item--current').next(),
                link = nextPage.find("a").attr("href");


            if (link == undefined) {
                if (!$('#listing-showmoreBtn > a').hasClass('disable')) {
                    $('#listing-showmoreBtn > a').addClass('disable');
                }
            } else {
                $('#listing-showmoreBtn > a').addClass('loading');

                api.getPage(link.replace("http://", "//"), requestOptions, (err, content) => {
                    if (err) {
                        throw new Error(err);
                    }

                    if (content.productListing != '') {
                        $productListingContainer.append(content.productListing);
                        $paginatorContainer.html($(content.paginator).find('.pagination-list').children());

                        $('#listing-showmoreBtn > a').removeClass('loading').blur();

                        nextPage = $('.pagination-item--current').next();

                        if (nextPage.length === 0) {
                            $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
                            $('.pagination .pagination-info .end').html($(content.paginator).find('.pagination-info .total').text());
                        } else {
                            if (Number($(content.paginator).find('.pagination-info .end').text()) < Number($(content.paginator).find('.pagination-info .total').text())) {
                                $('.pagination .pagination-info .end').html($(content.paginator).find('.pagination-info .end').text());
                            }
                        }

                        var paginationInfo = $('.pagination .pagination-info').html(),
                        toolbarPaginationInfo = $('.toolbar-wrapper .toolbar-left .pagination-info');
                        toolbarPaginationInfo.html(paginationInfo);

                        this.showPaginationTotalProgress();

                        haloAddOptionForProduct(context, 'product-listing-container');
                    }
                });
            }
        });

        this.showPaginationTotalProgress();
    }

    showPaginationTotalProgress() {
            const txt_end = $('.pagination-info .end').text(),
                txt_total = $('.pagination-info .total').text(),
                num_end = (num_end != '' ? Number(txt_end.replace(/[^0-9.-]+/g,'')) : 0),
                num_total = (num_total != '' ? Number(txt_total.replace(/[^0-9.-]+/g,'')) : 0);

            var percent = parseInt(num_end/num_total * 100);
            
            percent = (percent > 100 ? 100 : percent);

            if(num_end == num_total){
                percent = 100;
            }

            $('.pagination-total-progress .pagination-total-item').css('width', percent + '%')
        }

    showPaginationInfoToolbar() {
        var paginationInfo = $('.pagination .pagination-info').html(),
            toolbarPaginationInfo = $('.toolbar-wrapper .toolbar-left .pagination-info');

        toolbarPaginationInfo.html(paginationInfo);
    }

    loadOptionForProductCard(context) {
        if($('#product-listing-container .product').length > 0){
            haloAddOptionForProduct(context, 'product-listing-container');
        }

        if($('#featured-products').length > 0){
            haloAddOptionForProduct(context, 'featured-products');
        }
    }

    /* Get Sub-Categories Page For Digital Category */
    getSubCategoriesPage() {
        var buttons = document.querySelectorAll(".haloSubCategories__name");
        var productListingContainer = document.querySelector("#product-listing-container .productListing");
        
        if(!buttons || !productListingContainer) return;
        buttons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                
                var loader = document.createElement("div");
                loader.className = "loader";
                productListingContainer.innerHTML = "";
                productListingContainer.appendChild(loader);
            
                var url = button.getAttribute("href");
                fetch(url)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (content) {
                        var tempElement = document.createElement("div");
                        tempElement.innerHTML = content;
                        
                        var newContent = tempElement.querySelector("#product-listing-container .productListing").innerHTML;
                        
                        productListingContainer.innerHTML = newContent;
                        
                        loader.remove();

                    })
                    .catch(function (error) {
                        console.error("Error fetching content:", error);
                    });
            });
        });
    }

    /* Show 3 product in line */
    groupProducts() {
        const ul = document.querySelector('.digital-category-layout .productListing');
        const products = ul.querySelectorAll('.digital-category-layout .product');
        
        if (window.innerWidth < 1024) {
            // const divs = Array.from(ul.querySelectorAll('div'));
            // divs.forEach(div => div.remove());

            for (let i = 0; i < products.length; i += 3) {
                const productGroup = document.createElement('ul');
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
    showMoreDigitalProducts() {
        const products = document.querySelectorAll('.page-digital-content .product');
        const viewMoreButton = document.getElementById('digital-view-more-button');
        const productsPerPage = 6;
        let currentPage = 1;

        if (!viewMoreButton) return;

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
}
