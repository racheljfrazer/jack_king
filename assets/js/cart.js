$(function() {
var selectedClasses = 'active selected';
 $('.cart').on('click', '.quantity-increment', function () {
      var variantId = $(this).data('variant-id');
      incrementQuantity(variantId);
    });

    /* decrement quantity click listener */
    $('.cart').on('click', '.quantity-decrement', function() {
      var variantId = $(this).data('variant-id');
      decrementQuantity(variantId);
    });
  /* Build new ShopifyBuy client
  ============================================================ */
  var client = ShopifyBuy.buildClient({
    accessToken: '82edfb9afa370f63059e70cd93df1795',
    domain: 'jack-kings.myshopify.com',
    appId: '6'
  });
  var variantIdText = 'variant-id';
  productVariants = {};
  productVariantTitles = {};

  var product;
  var cart;
  var cartLineItemCount;
  if(localStorage.getItem('lastCartId')) {
    setTimeout(function(){ 
      client.fetchCart(localStorage.getItem('lastCartId')).then(function(remoteCart) {
        cart = remoteCart;
        cartLineItemCount = cart.lineItems.length;

        renderCartItems();

      });
     }, 3000);

    
  } else {
    client.createCart().then(function (newCart) {
      cart = newCart;
      localStorage.setItem('lastCartId', cart.id);
      cartLineItemCount = 0;
    });
  }

  var previousFocusItem;
 

  /* Fetch product and init
  ============================================================ */

  var productIds = ['19961020427', '19971866635'];

  
  for(i=0; i<= productIds.length-1; i++) {
    fetData(productIds[i]);
  }

  function fetData(id) {
    client.fetchProduct(id).then(function (fetchedProduct) {   
    product = fetchedProduct;    
    var selectedVariant = product.selectedVariant;
    var selectedVariantImage = product.selectedVariantImage;
    var currentOptions = product.options;

    var variantSelectors = generateSelectors(product);    
    $('.variant-selectors').html(variantSelectors);
    updateSelectWrapper(product);
    updateProductTitle(product.title);
    updateVariantImage(selectedVariantImage);
    updateVariantTitle(selectedVariant);
    updateVariantPrice(selectedVariant);
    attachOnVariantSelectListeners(product);
    
    bindEventListeners();

    setTimeout(function(){ updateCartTabButton(); }, 3000);
  });
  }

  
 $('.flav-option').on('click', function () {
   /* var variant_id = $(this).data(variantIdText);
    var variant = productVariants[variant_id];*/
	
    /*if(productweight_select == 'twelve_pack'){
		$('#twe_pac').css({'display':'block'});
	} else {
		$('#twe_pac').css({'display':'none'});
	}*/
	
   /* $('#scrollbar-style li').removeClass(selectedClasses);
    $(this).addClass(selectedClasses);
    $('#productNameText').text($(this).text());*/
	//$('.chosen-option').removeClass('open-list');
	//$('#scrollbar-style').hide();
	$('.chosen-option').removeClass('open-list');
	$('#scrollbar-style').css({'z-index':'50'});
  });


    function updateSelectWrapper(product) {
      var variants = product.variants;
      var section = $('section.' + product.id);
      // section.find('.select-wrapper .select-dropdown').val(variants[0].title);
      var count = 0;
      section.find('.select-wrapper ul li').each(function(){
        var item = $(this).find('span');
        var variant = variants[count];
        productVariants[variant.id] = variant;
        productVariantTitles[variant.id] = item.html();
        // item.html(variant.title);
        item.data(variantIdText, variant.id);
        count++;
      });

      // console.log(productVariantTitles);
      
    }


    function getLiHtml(product) {
      var variants = product.variants;
      var html = '';
      for(i=0; i<= variants.length-1; i++) {
        html += '<li class=""><span>' +variants[i].title +'/span></li>';
      }      
      return html;
    }

  /* Generate DOM elements for variant selectors
  ============================================================ */
  function generateSelectors(product) {
    var elements = product.options.map(function(option) {
      var optionsHtml = option.values.map(function(value) {
        return '<option value="' + value + '">' + value + '</option>';
      });

      return '<div class="shopify-select">\
                <select class="select" name="' + option.name + '">' + optionsHtml + '</select>\
              </div>'
    });

    return elements;
  }


  /* Bind Event Listeners
  ============================================================ */
  function bindEventListeners() {
    /* cart close button listener */
    $('.cart .btn--close').on('click', closeCart);

    /* click away listener to close cart 
    $(document).on('click', function(evt) {
      if((!$(evt.target).closest('.cart').length) && (!$(evt.target).closest('.js-prevent-cart-listener').length)) {
        closeCart();
      }
    })*/

    /* escape key handler */
    var ESCAPE_KEYCODE = 27;
    $(document).on('keydown', function (evt) {
      if (evt.which === ESCAPE_KEYCODE) {
        if (previousFocusItem) {
          $(previousFocusItem).focus();
          previousFocusItem = ''
        }
        closeCart();
      }
    });

    /* checkout button click listener */
    $('.btn--cart-checkout').on('click', function () {
      window.open(cart.checkoutUrl, '_self');
    });

    /* buy button click listener */
    $('.buy-button').unbind('click');
    $('.buy-button').on('click', buyButtonClickHandler);
 

    /* increment quantity click listener */
    $('.cart').find('.quantity-increment').unbind('click');
    $('.cart').find('.quantity-decrement').unbind('click');

   

    /* update quantity field listener */
    $('.cart').on('keyup', '.cart-item__quantity', debounce(fieldQuantityHandler, 250));

    /* cart tab click listener */
    $('.btn--cart-tab').click(function() {
      setPreviousFocusItem(this);
      openCart();
    });
  }


  /* Variant option change handler
  ============================================================ */
  function attachOnVariantSelectListeners(product) {
    $('.variant-selectors').on('change', 'select', function(event) {
      var $element = $(event.target);
      var name = $element.attr('name');
      var value = $element.val();
      product.options.filter(function(option) {
        return option.name === name;
      })[0].selected = value;

      var selectedVariant = product.selectedVariant;
      var selectedVariantImage = product.selectedVariantImage;
      updateProductTitle(product.title);
      updateVariantImage(selectedVariantImage);
      updateVariantTitle(selectedVariant);
      updateVariantPrice(selectedVariant);
    });
  }

  /* Update product title
  ============================================================ */
  function updateProductTitle(title) {
    $('#buy-button-1 .product-title').text(title);
  }

  /* Update product image based on selected variant
  ============================================================ */
  function updateVariantImage(image) {
    var src = (image) ? image.src : ShopifyBuy.NO_IMAGE_URI;

    $('#buy-button-1 .variant-image').attr('src', src);
  }

  /* Update product variant title based on selected variant
  ============================================================ */
  function updateVariantTitle(variant) {
    $('#buy-button-1 .variant-title').text(variant.title);
  }

  /* Update product variant price based on selected variant
  ============================================================ */
  function updateVariantPrice(variant) {
    $('#buy-button-1 .variant-price').text('$' + variant.price);
  }

  function getSelectedVariant(form) {
    var id = form.find('.active.selected span').data(variantIdText);
    
    if(id != undefined){
      return id;
    }

    return form.find('ul span').first().data(variantIdText)
  }

  /* Attach and control listeners onto buy button
  ============================================================ */
  function buyButtonClickHandler(evt) {
    evt.preventDefault();

    var form = jQuery(evt.currentTarget).parents('.s12');

    // var id = product.selectedVariant.id;

    var id = getSelectedVariant(form);
    // var id = product.selectedVariant.id;

    var qty = parseInt(form.find('.quantity-number').val());
    var cartLineItem = findCartItemByVariantId(id);

    quantity = cartLineItem ? cartLineItem.quantity + qty : qty;
    // console.log(quantity);
    var variant = productVariants[id];

    addOrUpdateVariant(variant, quantity);
    setPreviousFocusItem(evt.target);
    $('#checkout').focus();
  }

  /* Update product variant quantity in cart
  ============================================================ */
  function updateQuantity(fn, variant) {
    // var variant = product.variants.filter(function (variant) {
    //   return (variant.id === variantId);
    // })[0];
    // console.log('update quantity');
    var quantity;
    var cartLineItem = findCartItemByVariantId(variant.id);
    if (cartLineItem) {
      quantity = fn(cartLineItem.quantity);
      updateVariantInCart(cartLineItem, quantity);
    }
  }

  /* Decrease quantity amount by 1
  ============================================================ */
  function decrementQuantity(variantId) {
    updateQuantity(function(quantity) {
      return quantity - 1;
    }, productVariants[variantId]);
  }

  /* Increase quantity amount by 1
  ============================================================ */
  function incrementQuantity(variantId) {
    updateQuantity(function(quantity) {
      return quantity + 1;
    }, productVariants[variantId]);
  }

  /* Update product variant quantity in cart through input field
  ============================================================ */
  function fieldQuantityHandler(evt) {
    var variantId = parseInt($(this).closest('.cart-item').attr('data-variant-id'), 10);
    var variant = product.variants.filter(function (variant) {
      return (variant.id === variantId);
    })[0];
    var cartLineItem = findCartItemByVariantId(variant.id);
    var quantity = evt.target.value;
    if (cartLineItem) {
      updateVariantInCart(cartLineItem, quantity);
    }
  }

  /* Debounce taken from _.js
  ============================================================ */
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  /* Open Cart
  ============================================================ */
  function openCart() {
    $('.cart').addClass('js-active');
  }

  /* Close Cart
  ============================================================ */
  function closeCart() {
    $('.cart').removeClass('js-active');
    $('.overlay').removeClass('js-active');
  }

  /* Find Cart Line Item By Variant Id
  ============================================================ */
  function findCartItemByVariantId(variantId) {
    return cart.lineItems.filter(function (item) {
      return (item.variant_id === variantId);
    })[0];
  }

  /* Determine action for variant adding/updating/removing
  ============================================================ */
  function addOrUpdateVariant(variant, quantity) {
    openCart();
    var cartLineItem = findCartItemByVariantId(variant.id);

    if (cartLineItem) {
      updateVariantInCart(cartLineItem, quantity);
    } else {
      addVariantToCart(variant, quantity);
    }

    updateCartTabButton();
  }

  /* Update details for item already in cart. Remove if necessary
  ============================================================ */
  function updateVariantInCart(cartLineItem, quantity) {
    var variantId = cartLineItem.variant_id;
    var cartLength = cart.lineItems.length;
    cart.updateLineItem(cartLineItem.id, quantity).then(function(updatedCart) {
      var $cartItem = $('.cart').find('.cart-item[data-variant-id="' + variantId + '"]');
      if (updatedCart.lineItems.length >= cartLength) {
        $cartItem.find('.cart-item__quantity').val(cartLineItem.quantity);
        $cartItem.find('.cart-item__price').text(formatAsMoney(cartLineItem.line_price));
      } else {
        $cartItem.addClass('js-hidden').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
           $cartItem.remove();
        });
      }

      updateCartTabButton();
      updateTotalCartPricing();
      if (updatedCart.lineItems.length < 1) {
        closeCart();
      }
    }).catch(function (errors) {
      console.log('Fail');
      console.error(errors);
    });
  }

  /* Add 'quantity' amount of product 'variant' to cart
  ============================================================ */
  function addVariantToCart(variant, quantity) {
    openCart();

    cart.createLineItemsFromVariants({ variant: variant, quantity: quantity }).then(function() {
      var cartItem = cart.lineItems.filter(function (item) {
        return (item.variant_id === variant.id);
      })[0];
      var $cartItem = renderCartItem(cartItem);
      var $cartItemContainer = $('.cart-item-container');
      $cartItemContainer.append($cartItem);
	  fbq('track', 'AddToCart');
      setTimeout(function () {
        $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
      }, 0)

    }).catch(function (errors) {
      console.log('Fail');
      console.error(errors);
    });

    updateTotalCartPricing();
    updateCartTabButton();
  }

  /* Return required markup for single item rendering
  ============================================================ */
  function renderCartItem(lineItem) {
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $lineItemTemplate = $(lineItemEmptyTemplate);
    var itemImage = lineItem.image.src;
    $lineItemTemplate.attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.addClass('js-hidden');
    $lineItemTemplate.find('.cart-item__img').css('background-image', 'url(' + itemImage + ')');
    $lineItemTemplate.find('.cart-item__title').text(lineItem.title);
    $lineItemTemplate.find('.cart-item__variant-title').text(productVariantTitles[lineItem.variant_id]);
    // $lineItemTemplate.find('.cart-item__variant-title').text(lineItem.variant_title);
    
    $lineItemTemplate.find('.cart-item__price').text(formatAsMoney(lineItem.line_price));
    $lineItemTemplate.find('.cart-item__quantity').attr('value', lineItem.quantity);
    $lineItemTemplate.find('.quantity-decrement').attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.find('.quantity-increment').attr('data-variant-id', lineItem.variant_id);

    return $lineItemTemplate;
  }

  /* Render the line items currently in the cart
  ============================================================ */
  function renderCartItems() {
    var $cartItemContainer = $('.cart-item-container');
    $cartItemContainer.empty();
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $cartLineItems = cart.lineItems.map(function (lineItem, index) {
      return renderCartItem(lineItem);
    });
    $cartItemContainer.append($cartLineItems);

    setTimeout(function () {
      $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
    }, 0)
    updateTotalCartPricing();
  }

  /* Update Total Cart Pricing
  ============================================================ */
  function updateTotalCartPricing() {
    $('.cart .pricing').text(formatAsMoney(cart.subtotal));
  }

  /* Format amount as currency
  ============================================================ */
  function formatAsMoney(amount, currency, thousandSeparator, decimalSeparator, localeDecimalSeparator) {
    currency = currency || '$';
    thousandSeparator = thousandSeparator || ',';
    decimalSeparator = decimalSeparator || '.';
    localeDecimalSeparator = localeDecimalSeparator || '.';
    var regex = new RegExp('(\\d)(?=(\\d{3})+\\.)', 'g');

    return currency + parseFloat(amount, 10).toFixed(2)
      .replace(localeDecimalSeparator, decimalSeparator)
      .replace(regex, '$1' + thousandSeparator)
      .toString();
  }

  /* Update cart tab button
  ============================================================ */
  function updateCartTabButton() {
    if (cart.lineItems.length > 0) {
      $('.btn--cart-tab .btn__counter').html(cart.lineItemCount);
      $('.btn--cart-tab').addClass('js-active');
    } else {
      $('.btn--cart-tab').removeClass('js-active');
      $('.cart').removeClass('js-active');
    }
  }

  /* Set previously focused item for escape handler
  ============================================================ */
  function setPreviousFocusItem(item) {
    previousFocusItem = item;
  }

});
