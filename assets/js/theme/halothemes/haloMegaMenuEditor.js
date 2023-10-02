import haloMegaMenu from './haloMegaMenu';
    window.haloMegaMenu = haloMegaMenu;

export default function (context) {
	if (context.themeSettings.haloMegamenuType == 'Editor') {
	    var haloMegaMenu = new window.haloMegaMenu();
	    const urlImgLoad = $('.halo-global-block').data('image-load');
	    const urlStoreHash = $('.halo-global-block').data('store-hash-image');

	    var mstyle1_item = parseInt(context.themeSettings.mstyle1_item),
	        mstyle2_item = parseInt(context.themeSettings.mstyle2_item),
	        mstyle3_item = parseInt(context.themeSettings.mstyle3_item),
	        mstyle4_item = parseInt(context.themeSettings.mstyle4_item),
	        mstyle5_item = parseInt(context.themeSettings.mstyle5_item),
	        mstyle6_item = parseInt(context.themeSettings.mstyle6_item),
	        mstyle7_item = parseInt(context.themeSettings.mstyle7_item),
	        mstyle8_item = parseInt(context.themeSettings.mstyle8_item);

	    function SetItemMegaMenu(){
	        $('.navPages-list-megamenu > li:not(.navPages-item-toggle)').mouseover(event => {
	            var numberItem = $(event.currentTarget).index() + 1;

	            if (!$(event.currentTarget).hasClass('has-megamenu')) {
	                LoadMegaMenu(numberItem);
	            }
	        });

	        $(document).on('click','#halo-menu-sidebar .navPages-list:not(.navPages-list--user) > li > .navPages-action' , event => {
	            var numberItem = $(event.currentTarget).parent().index() + 1;

	            if (!$(event.currentTarget).parent().hasClass('has-megamenu')) {
	                LoadMegaMenu(numberItem);
	            }
	        });

	        $(document).ready(function() {
			 	$('body').addClass('menu-is-load');
			});
	    }
	        
	    function LoadMegaMenu(numberItem){
	        if (mstyle1_item == numberItem) {
	            haloMegaMenu.menuItem(mstyle1_item).setMegaMenu({
	                style: 'style 1',
	                imageAreaWidth: context.themeSettings.mstyle1_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle1_item_col_width,
	                cateColumns: context.themeSettings.mstyle1_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle1_item1_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item1_img+'" alt="'+context.themeSettings.mstyle1_item1_img+'" title="'+context.themeSettings.mstyle1_item1_img+'"/>\
		                        </a>',
	                imagesRight: '<a class="image" href="'+context.themeSettings.mstyle1_item2_link+'">\
			                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item2_img+'" alt="'+context.themeSettings.mstyle1_item2_img+'" title="'+context.themeSettings.mstyle1_item2_img+'"/>\
			                        </a>\
			                        <a class="image" href="'+context.themeSettings.mstyle1_item3_link+'">\
			                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item3_img+'" alt="'+context.themeSettings.mstyle1_item3_img+'" title="'+context.themeSettings.mstyle1_item3_img+'"/>\
			                        </a>',
	                contentLeft: '<li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
	                                	<a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link1+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext1+'</span></span></a>\
		                            </li>\
		                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
		                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link2+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext2+'</span></span></a>\
		                            </li>\
		                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
		                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link3+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext3+'</span></span></a>\
		                            </li>\
		                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
		                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link4+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext4+'</span></span></a>\
		                            </li>\
		                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
		                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link5+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext5+'</span></span></a>\
		                            </li>\
		                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
		                                <a class="navPage-subMenu-action navPages-action navPages-action-custom navPages-action--sale" href="'+context.themeSettings.mstyle1_item_custom_link6+'"><span class="text"><span>'+context.themeSettings.mstyle1_item_custom_linktext6+'</span></span></a>\
		                            </li>',
                    contentRight: '<h3 class="megamenu-title">'+context.themeSettings.mstyle2_item_subMenuBlock+'</h3>\
                    			   	<div class="megamenu-subMenu">\
                    			   		<ul class="navPage-subMenu-links navPage-subMenu-list">\
				                    		<li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
				                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link7+'">\
				                                	<img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item_custom_img1+'" alt="'+context.themeSettings.mstyle1_item_custom_linktext7+'" title="'+context.themeSettings.mstyle1_item_custom_linktext7+'"/>\
				                                	<span class="text"><span>\
				                                		'+context.themeSettings.mstyle1_item_custom_linktext7+'\
				                                	</span></span>\
				                                </a>\
				                            </li>\
				                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
				                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link8+'">\
				                                	<img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item_custom_img2+'" alt="'+context.themeSettings.mstyle1_item_custom_linktext8+'" title="'+context.themeSettings.mstyle1_item_custom_linktext8+'"/>\
				                                	<span class="text"><span>\
				                                		'+context.themeSettings.mstyle1_item_custom_linktext8+'\
				                                	</span></span>\
				                                </a>\
				                            </li>\
				                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
				                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link9+'">\
				                                	<img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item_custom_img3+'" alt="'+context.themeSettings.mstyle1_item_custom_linktext9+'" title="'+context.themeSettings.mstyle1_item_custom_linktext9+'"/>\
				                                	<span class="text"><span>\
				                                		'+context.themeSettings.mstyle1_item_custom_linktext9+'\
				                                	</span></span>\
				                                </a>\
				                            </li>\
				                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
				                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link10+'">\
				                                	<img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item_custom_img4+'" alt="'+context.themeSettings.mstyle1_item_custom_linktext10+'" title="'+context.themeSettings.mstyle1_item_custom_linktext10+'"/>\
				                                	<span class="text"><span>\
				                                		'+context.themeSettings.mstyle1_item_custom_linktext10+'\
				                                	</span></span>\
				                                </a>\
				                            </li>\
				                            <li class="navPage-subMenu-item-child navPage-subMenu-item-custom">\
				                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle1_item_custom_link11+'">\
				                                	<img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle1_item_custom_img5+'" alt="'+context.themeSettings.mstyle1_item_custom_linktext11+'" title="'+context.themeSettings.mstyle1_item_custom_linktext11+'"/>\
				                                	<span class="text"><span>\
				                                		'+context.themeSettings.mstyle1_item_custom_linktext11+'\
				                                	</span></span>\
				                                </a>\
				                            </li>\
			                            </ul>\
	                        		</div>'
	            });
	        } else if (mstyle2_item == numberItem){
	            haloMegaMenu.menuItem(mstyle2_item).setMegaMenu({
	                style: 'style 2',
	                imageAreaWidth: context.themeSettings.mstyle2_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle2_item_col_width,
	                cateColumns: context.themeSettings.mstyle2_item_col,
	                contentLeft: '<ul class="navPage-subMenu-links navPage-subMenu-list">\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle2_item_custom_link1+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext1+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle2_item_custom_link2+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext2+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle2_item_custom_link3+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext3+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle2_item_custom_link4+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext4+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle2_item_custom_link5+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext5+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom navPages-action--sale" href="'+context.themeSettings.mstyle2_item_custom_link6+'"><span class="text"><span>'+context.themeSettings.mstyle2_item_custom_linktext6+'</span></span></a>\
	                            </li>\
	                        </ul>',
	                contentRight: '<div class="item"><a class="image" href="'+context.themeSettings.mstyle2_item_link3+'">\
	                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle2_item_img3+'" alt="'+context.themeSettings.mstyle2_item_img3+'" title="'+context.themeSettings.mstyle2_item_img3+'"/>\
	                        </a></div>',
	                products:'<h3 class="megamenu-title">'+context.themeSettings.mstyle2_item_productBlock+'</h3>\
	                        <div class="megamenu-brands">\
	                            <ul>\
	                                <li data-brand-letter="a"><a href="/brands#a"><span>a</span></a></li>\
	                                <li data-brand-letter="b"><a href="/brands#b"><span>b</span></a></li>\
	                                <li data-brand-letter="c"><a href="/brands#c"><span>c</span></a></li>\
	                                <li data-brand-letter="d"><a href="/brands#d"><span>d</span></a></li>\
	                                <li data-brand-letter="e"><a href="/brands#e"><span>e</span></a></li>\
	                                <li data-brand-letter="f"><a href="/brands#f"><span>f</span></a></li>\
	                                <li data-brand-letter="g"><a href="/brands#g"><span>g</span></a></li>\
	                                <li data-brand-letter="h"><a href="/brands#h"><span>h</span></a></li>\
	                                <li data-brand-letter="i"><a href="/brands#i"><span>i</span></a></li>\
	                                <li data-brand-letter="j"><a href="/brands#j"><span>j</span></a></li>\
	                                <li data-brand-letter="k"><a href="/brands#k"><span>k</span></a></li>\
	                                <li data-brand-letter="l"><a href="/brands#l"><span>l</span></a></li>\
	                                <li data-brand-letter="m"><a href="/brands#m"><span>m</span></a></li>\
	                                <li data-brand-letter="n"><a href="/brands#n"><span>n</span></a></li>\
	                                <li data-brand-letter="o"><a href="/brands#o"><span>o</span></a></li>\
	                                <li data-brand-letter="p"><a href="/brands#p"><span>p</span></a></li>\
	                                <li data-brand-letter="q"><a href="/brands#q"><span>q</span></a></li>\
	                                <li data-brand-letter="r"><a href="/brands#r"><span>r</span></a></li>\
	                                <li data-brand-letter="s"><a href="/brands#s"><span>s</span></a></li>\
	                                <li data-brand-letter="t"><a href="/brands#t"><span>t</span></a></li>\
	                                <li data-brand-letter="u"><a href="/brands#u"><span>u</span></a></li>\
	                                <li data-brand-letter="v"><a href="/brands#v"><span>v</span></a></li>\
	                                <li data-brand-letter="w"><a href="/brands#w"><span>w</span></a></li>\
	                                <li data-brand-letter="x"><a href="/brands#x"><span>x</span></a></li>\
	                                <li data-brand-letter="y"><a href="/brands#y"><span>y</span></a></li>\
	                                <li data-brand-letter="z"><a href="/brands#z"><span>z</span></a></li>\
	                                <li data-brand-letter="0"><a href="/brands#0"><span>1-9</span></a></li>\
	                            </ul>\
	                            <a class="view-all" href="/brands">'+context.themeSettings.mstyle2_item_productBlock_btnAll+'</a>\
	                        </div>',
	                images: '<div class="item"><a class="image" href="'+context.themeSettings.mstyle2_item_link1+'">\
	                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle2_item_img1+'" alt="'+context.themeSettings.mstyle2_item_img1+'" title="'+context.themeSettings.mstyle2_item_img1+'"/>\
	                        </a></div>\
	                        <div class="item"><a class="image" href="'+context.themeSettings.mstyle2_item_link2+'">\
	                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle2_item_img2+'" alt="'+context.themeSettings.mstyle2_item_img2+'" title="'+context.themeSettings.mstyle2_item_img2+'"/>\
	                        </a></div>'
	            });
	        } else if (mstyle3_item == numberItem){
	            haloMegaMenu.menuItem(mstyle3_item).setMegaMenu({
	                style: 'style 3',
	                imageAreaWidth: context.themeSettings.mstyle3_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle3_item_col_width,
	                cateColumns: context.themeSettings.mstyle3_item_col,
	                content: '<ul class="navPage-subMenu-links navPage-subMenu-list">\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle3_item_custom_link1+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext1+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle3_item_custom_link2+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext2+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle3_item_custom_link3+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext3+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle3_item_custom_link4+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext4+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom" href="'+context.themeSettings.mstyle3_item_custom_link5+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext5+'</span></span></a>\
	                            </li>\
	                            <li class="navPage-subMenu-item-child">\
	                                <a class="navPage-subMenu-action navPages-action navPages-action-custom navPages-action--sale" href="'+context.themeSettings.mstyle3_item_custom_link6+'"><span class="text"><span>'+context.themeSettings.mstyle3_item_custom_linktext6+'</span></span></a>\
	                            </li>\
	                        </ul>',
	                images: '<a class="image" href="'+context.themeSettings.mstyle3_item_link1+'">\
	                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle3_item_img1+'" alt="'+context.themeSettings.mstyle3_item_img1+'" title="'+context.themeSettings.mstyle3_item_img1+'"/>\
	                        </a>\
	                        <a class="image" href="'+context.themeSettings.mstyle3_item_link2+'">\
	                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle3_item_img2+'" alt="'+context.themeSettings.mstyle3_item_img2+'" title="'+context.themeSettings.mstyle3_item_img2+'"/>\
	                        </a>',
	                bottomCates: '<div class="megamenu-custom-list"><div class="megamenu-bottom"><span class="text"><span>'+context.themeSettings.mstyle3_item_bottomCates+'</span></span></div></div>'
	            });
	        } else if (mstyle4_item == numberItem){
		    	haloMegaMenu.menuItem(mstyle4_item).setMegaMenu({
	                style: 'style 4',
	                imageAreaWidth: context.themeSettings.mstyle4_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle4_item_col_width,
	                cateColumns: context.themeSettings.mstyle4_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle4_item_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle4_item_img+'" alt="'+context.themeSettings.mstyle4_item_img+'" title="'+context.themeSettings.mstyle4_item_img+'"/>\
		                        </a>\
		                        <h3>'+context.themeSettings.mstyle4_item_title+'</h3>\
		                        <a class="link" href="'+context.themeSettings.mstyle4_item_link+'">'+context.themeSettings.mstyle4_item_text_link+'</a>',
		            contentRight: '<p class="megamenu-title">'+context.themeSettings.mstyle4_item_content_right_text+'</p>\
                    			   <h3>'+context.themeSettings.mstyle4_item_content_right_title+'</h3>\
                    			   <a class="link" href="'+context.themeSettings.mstyle4_item_content_right_link+'">'+context.themeSettings.mstyle4_item_content_right_text_link+'</a>'
	            });
		    } else if (mstyle5_item == numberItem){
		    	haloMegaMenu.menuItem(mstyle5_item).setMegaMenu({
	                style: 'style 5',
	                imageAreaWidth: context.themeSettings.mstyle5_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle5_item_col_width,
	                cateColumns: context.themeSettings.mstyle5_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle5_item_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle5_item_img+'" alt="'+context.themeSettings.mstyle5_item_img+'" title="'+context.themeSettings.mstyle5_item_img+'"/>\
		                        </a>\
		                        <h3>'+context.themeSettings.mstyle5_item_title+'</h3>\
		                        <a class="link" href="'+context.themeSettings.mstyle5_item_link+'">'+context.themeSettings.mstyle5_item_text_link+'</a>',
		            contentRight: '<p class="megamenu-title">'+context.themeSettings.mstyle5_item_content_right_text+'</p>\
                    			   <h3>'+context.themeSettings.mstyle5_item_content_right_title+'</h3>\
                    			   <a class="link" href="'+context.themeSettings.mstyle5_item_content_right_link+'">'+context.themeSettings.mstyle5_item_content_right_text_link+'</a>'
	            });
		    } else if (mstyle6_item == numberItem){
		    	haloMegaMenu.menuItem(mstyle6_item).setMegaMenu({
	                style: 'style 6',
	                imageAreaWidth: context.themeSettings.mstyle6_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle6_item_col_width,
	                cateColumns: context.themeSettings.mstyle6_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle6_item_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle6_item_img+'" alt="'+context.themeSettings.mstyle6_item_img+'" title="'+context.themeSettings.mstyle6_item_img+'"/>\
		                        </a>\
		                        <h3>'+context.themeSettings.mstyle6_item_title+'</h3>\
		                        <a class="link" href="'+context.themeSettings.mstyle6_item_link+'">'+context.themeSettings.mstyle6_item_text_link+'</a>',
		            contentRight: '<p class="megamenu-title">'+context.themeSettings.mstyle6_item_content_right_text+'</p>\
                    			   <h3>'+context.themeSettings.mstyle6_item_content_right_title+'</h3>\
                    			   <a class="link" href="'+context.themeSettings.mstyle6_item_content_right_link+'">'+context.themeSettings.mstyle6_item_content_right_text_link+'</a>'
	            });
		    } else if (mstyle7_item == numberItem){
		    	haloMegaMenu.menuItem(mstyle7_item).setMegaMenu({
	                style: 'style 7',
	                imageAreaWidth: context.themeSettings.mstyle7_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle7_item_col_width,
	                cateColumns: context.themeSettings.mstyle7_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle7_item_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle7_item_img+'" alt="'+context.themeSettings.mstyle7_item_img+'" title="'+context.themeSettings.mstyle7_item_img+'"/>\
		                        </a>\
		                        <h3>'+context.themeSettings.mstyle7_item_title+'</h3>\
		                        <a class="link" href="'+context.themeSettings.mstyle7_item_link+'">'+context.themeSettings.mstyle7_item_text_link+'</a>',
		            contentRight: '<p class="megamenu-title">'+context.themeSettings.mstyle7_item_content_right_text+'</p>\
                    			   <h3>'+context.themeSettings.mstyle7_item_content_right_title+'</h3>\
                    			   <a class="link" href="'+context.themeSettings.mstyle7_item_content_right_link+'">'+context.themeSettings.mstyle7_item_content_right_text_link+'</a>'
	            });
		    } else if (mstyle8_item == numberItem){
		    	haloMegaMenu.menuItem(mstyle8_item).setMegaMenu({
	                style: 'style 8',
	                imageAreaWidth: context.themeSettings.mstyle8_item_img_width,
	                cateAreaWidth: context.themeSettings.mstyle8_item_col_width,
	                cateColumns: context.themeSettings.mstyle8_item_col,
	                imagesLeft: '<a class="image" href="'+context.themeSettings.mstyle8_item_link+'">\
		                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mstyle8_item_img+'" alt="'+context.themeSettings.mstyle8_item_img+'" title="'+context.themeSettings.mstyle8_item_img+'"/>\
		                        </a>\
		                        <h3>'+context.themeSettings.mstyle8_item_title+'</h3>\
		                        <a class="link" href="'+context.themeSettings.mstyle8_item_link+'">'+context.themeSettings.mstyle8_item_text_link+'</a>',
		            contentRight: '<p class="megamenu-title">'+context.themeSettings.mstyle8_item_content_right_text+'</p>\
                    			   <h3>'+context.themeSettings.mstyle8_item_content_right_title+'</h3>\
                    			   <a class="link" href="'+context.themeSettings.mstyle8_item_content_right_link+'">'+context.themeSettings.mstyle8_item_content_right_text_link+'</a>'
	            });
		    }
	        else {
	            return;
	        }
	    }

	    function MegaMenuLabel(){
	        if (context.themeSettings.m_new_label && context.themeSettings.m_new_label_text) {
	            haloMegaMenu.menuItem(context.themeSettings.m_new_label).setMegaMenu({
	                label: context.themeSettings.m_new_label_text,
	                labelType: "new",
	                disabled: true
	            });
	        }

	        if (context.themeSettings.m_hot_label && context.themeSettings.m_hot_label_text) {
	            haloMegaMenu.menuItem(context.themeSettings.m_hot_label).setMegaMenu({
	                label: context.themeSettings.m_hot_label_text,
	                labelType: "hot",
	                disabled: true
	            });
	        }

	        if (context.themeSettings.m_sale_label && context.themeSettings.m_sale_label_text) {
	            haloMegaMenu.menuItem(context.themeSettings.m_sale_label).setMegaMenu({
	                label: context.themeSettings.m_sale_label_text,
	                labelType: "sale",
	                disabled: true
	            });
	        }
	    }

	    MegaMenuLabel();

	    var setItemMegaMenu = SetItemMegaMenu();

	    window.onload = setItemMegaMenu;
	}
}
