export default function(){

    haloToolbarMobile();

    function haloToolbarMobile() {
        $(document).on('click', '.halo-sticky-toolbar-mobile [data-search-mobile]', event => {
            event.preventDefault();

            $('body').addClass('openSearchMobile');
            $('body').addClass('openQuickSearch');
        }); 
        
        $(document).on('click', '.halo-sticky-toolbar-mobile [data-menu-mobile]', event => {
            event.preventDefault();

            var $menuPc = $('.halo-bottomHeader .bottomHeader-container .navPages-list:not(.navPages-list--user)'),
            $menuMobile = $('#halo-menu-sidebar .navPages-list:not(.navPages-list--user)');

            if ($menuPc.length) {
                if (!$menuMobile.children().length) {
                    $menuPc.children().appendTo($menuMobile);
                }
            }

            $('body').addClass('has-activeNavPages');
            $('.header').addClass('is-open');
        });

        $(document).on('click', '.halo-sticky-toolbar-mobile [data-cart-mobile]', event => {
            event.preventDefault();
            $('body').addClass('openCartSidebar');
            $('[data-cart-preview]').trigger('click');
        }); 

        $(document).on('click', '.halo-sticky-toolbar-mobile [data-login-mobile]', event => {
            event.preventDefault();
            $('.halo-auth-sidebar').addClass('is-open');
            $('body').addClass('openAuthSidebar');
        }); 

        $(document).on('click', event => {
            if (($(event.target).closest('[data-menu-mobile]').length === 0) && ($(event.target).closest('.halo-sticky-toolbar-mobile').length === 0) && ($(event.target).closest('.halo-menu-sidebar').length === 0)){
                $('body').removeClass('has-activeNavPages');
                $('.header').removeClass('is-open');
            }
        });
    }
}
