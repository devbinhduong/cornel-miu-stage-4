import utils from '@bigcommerce/stencil-utils';
const fetch = require('node-fetch');

export default function(context, wrapper) {
    const token = context.token;
    var  list = [];

    function getProductListId() {
        let productWishlist = document.querySelectorAll('.page-account__sidebar .product-wishlist-item .card');

        for (let product of productWishlist) {
            let productId = product.getAttribute("data-product-id");

            if(!productId) return;

            list.push(productId.toString());
        }

        list = uniqueArray(list);

        if(list.length > 0){
            getWishlistBrandName(list).then(data => {
                renderBrandName(data);
            });
        }
    }

    function getWishlistBrandName(list){
        return fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                query: `
                    query SeveralProductsByID {
                        site {
                            products(entityIds: [`+list+`], first: 50) {
                                edges {
                                    node {
                                        entityId
                                        name
                                        brand{
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            }),
        }).then(res => res.json()).then(res => res.data);
    }

    function renderBrandName(data){
        var aFilter = data.site.products.edges;

        $.each(aFilter, (index, element) => {
            var productId = element.node.entityId;
            var brandName = element.node.brand ? element.node.brand.name : '';
            var productWishlist = document.querySelectorAll('.page-account__sidebar .product-wishlist-item .card[data-product-id="'+productId+'"]');

            for (let product of productWishlist) {
                /* Create div tag below title for contain brand name */
                var brandNameDiv = document.createElement('p');
                brandNameDiv.classList.add('wish-list-brand-name');
                product.querySelector('.card-title').after(brandNameDiv);

                var brandBlock = product.querySelector('.wish-list-brand-name');

                if(brandName){
                    brandBlock.innerHTML = brandName;
                }else{
                    brandBlock.style.display = 'none';
                }
            }
        });
    }

    function uniqueArray(list) {
        var result = [];

        $.each(list, (index, element) => {
            if ($.inArray(element, result) == -1) {
                result.push(element);
            }
        });

        return result;
    }

    getProductListId();
}
