import utils from '@bigcommerce/stencil-utils';
const fetch = require('node-fetch');

export default function(context, wrapper) {
    const token = context.token;
    var  list = [];

    function getProductListId() {
        let orderList = document.querySelectorAll('.custom-order-content .account-listItem');

        for (let product of orderList) {
            let productId = product.getAttribute("data-product-id");

            if(!productId) return;

            list.push(productId.toString());
        }

        list = uniqueArray(list);

        if(list.length > 0){
            getBrandNameByGrapql(list).then(data => {
                console.log("data", data)
                renderBrandName(data);
            });
        }
    }

    function getBrandNameByGrapql(list){
        console.log("list", list);
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
            var orderList = document.querySelectorAll('.custom-order-content .account-listItem[data-product-id="'+productId+'"]');

            console.log("orderList", orderList)

            for (let product of orderList) {
                /* Create div tag below title for contain brand name */
                var brandNameDiv = document.createElement('p');
                brandNameDiv.classList.add('order-item-brand-name');
                product.querySelector('.account-product-title').after(brandNameDiv);

                var brandBlock = product.querySelector('.order-item-brand-name');

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
