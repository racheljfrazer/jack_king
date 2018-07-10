
$(document).ready(function () {
    
    //Materialize Commands
    $('select').material_select();
    $('ul.tabs').tabs('select_tab', 'details');
    $('.scrollspy').scrollSpy({
        scrollOffset: 0
    });
    
    //Open Product Options
   // $('#openLakeCrab, #imageOpenLC').on('click touchstart', function (e) {
	 $('#openLakeCrab, #imageOpenLC').click(function(e){	 
        e.preventDefault();
        $('#jkLakecrab').show();
        $('body').addClass('modal-open');
        $('.close-circle').on('click touchstart', function () {
          $('#jkLakecrab').hide();
            $('.single-image.image1').addClass('active');
            $('.single-image.image2').removeClass('active');
            $('.single-image.image3').removeClass('active');
            $('.single-image.image4').removeClass('active');
        });
    });

   //$('.close-icon').on('click touchstart', function (e) {
    $('.close-circle').click(function(e){	   
      e.preventDefault();		
	  $('body').removeClass('modal-open');
      console.log("Clicked");
    });   
	
	
    
    //$('#openCrawfish, #imageOpenCF').on('click touchstart', function (e) {
	$('#openCrawfish, #imageOpenCF').click(function(e){	 	
        e.preventDefault();
        $('#jkCrawfish').show();
		$('body').addClass('modal-open');
        $('.close-circle').on('click touchstart', function () {
          $('#jkCrawfish').hide();
            $('.single-image.image1').addClass('active');
            $('.single-image.image2').removeClass('active');
            $('.single-image.image3').removeClass('active');
            $('.single-image.image4').removeClass('active');
        });
    });
    
    
    //Product Image Slider  
    $('.dot1').on('click touchstart', function (e) {
        e.preventDefault();
        $('.single-image.image1').addClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active');
        $('.single-image.image4').removeClass('active');
    });
    
    $('.dot2').on('click touchstart', function (e) {
        e.preventDefault();
        $('.single-image.image1').removeClass('active');
        $('.single-image.image3').removeClass('active');
        $('.single-image.image4').removeClass('active');
        $('.single-image.image2').addClass('active');
    });
    
    $('.dot3').on('click touchstart', function (e) {
        e.preventDefault();
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image4').removeClass('active');
        $('.single-image.image3').addClass('active');
    });
    
    $('.dot4').on('click touchstart', function (e) {
        e.preventDefault();
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active');
        $('.single-image.image4').addClass('active');
    });
    
    
    $('.next-control').on('click touchstart', function (e) {
    if ($('.single-image.image1').hasClass('active')) {
        $('.single-image.image2').addClass('active');
        $('.single-image.image1').removeClass('active');
        $('.single-image.image3').removeClass('active');
        $('.single-image.image4').removeClass('active')
      } else if ($('.single-image.image2').hasClass('active')) {
        $('.single-image.image3').addClass('active');
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image4').removeClass('active')
      } else if ($('.single-image.image3').hasClass('active')) {
        $('.single-image.image4').addClass('active');
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active');
      } else{
        $('.single-image.image1').addClass('active');
        $('.single-image.image4').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active'); 
      }
    });
    
    $('.prev-control').on('click touchstart', function (e) {
    if ($('.single-image.image1').hasClass('active')) {
        $('.single-image.image2').addClass('active');
        $('.single-image.image3').removeClass('active');
        $('.single-image.image4').removeClass('active');
        $('.single-image.image1').removeClass('active');
      } else if($('.single-image.image2').hasClass('active')) {
        $('.single-image.image3').addClass('active');
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image4').removeClass('active')
      } else if($('.single-image.image3').hasClass('active')) {
        $('.single-image.image4').addClass('active');
        $('.single-image.image1').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active');
      } else{
        $('.single-image.image1').addClass('active');
        $('.single-image.image4').removeClass('active');
        $('.single-image.image2').removeClass('active');
        $('.single-image.image3').removeClass('active'); 
      }
    });
    
    //Product Option Styling
    jQuery('<div class="carhet" style="position: absolute;"><svg class="icon icon-down-arrow"><use xlink:href="#icon-down-arrow"></use></svg></div>').insertAfter('.flavor input');
    
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
	
	$('#option-list-one').click(function(e){ 
       // e.preventDefault;
		// $('.pack-option').removeClass('open-list');
        if(!$('.chosen-option').hasClass('open-list')){
            $('.chosen-option').addClass('open-list');
			$('#scrollbar-style').css({'z-index':'100'});
			
			//$('.shop-btn').addClass('mobile-inactive');
        }else{ alert('ddd');
            $('.chosen-option').removeClass('open-list');
			//$('#scrollbar-style').css({'z-index':'50'});
        }
       // $(window).on('click', function(e){
//			$('.chosen-option').removeClass('open-list');
//			//$('.shop-btn').removeClass('mobile-inactive');
//		});
       // e.stopPropagation();
    });
	
	$("#select_change").change(function() {
		var select_val = $("#select_change").val();
		$("#select_1").css({'display':'none'});
		$("#select_2").css({'display':'none'});
		$("#select_3").css({'display':'none'});
		$("#select_4").css({'display':'none'});
		$("#select_5").css({'display':'none'});
		$("#select_6").css({'display':'none'});		
		
		$("#select_thumb_1").css({'display':'none'});
		$("#select_thumb_2").css({'display':'none'});
		$("#select_thumb_3").css({'display':'none'});
		$("#select_thumb_4").css({'display':'none'});
		$("#select_thumb_5").css({'display':'none'});
		$("#select_thumb_6").css({'display':'none'});		
		
		console.log("Slected")
		
		$("#price_1").css({'display':'none'});
		$("#price_2").css({'display':'none'});
		$("#price_3").css({'display':'none'});
		$("#price_4").css({'display':'none'});
		$("#price_5").css({'display':'none'});
		$("#price_6").css({'display':'none'});
		
		$("#desc_1").css({'display':'none'});
		$("#desc_2").css({'display':'none'});
		$("#desc_3").css({'display':'none'});
		$("#desc_4").css({'display':'none'});
		$("#desc_5").css({'display':'none'});
		$("#desc_6").css({'display':'none'});		
		
		$("#select_"+select_val).css({'display':'block'});
		$("#select_thumb_"+select_val).css({'display':'block'});
		$("#price_"+select_val).css({'display':'block'});
		$("#desc_"+select_val).css({'display':'block'});
        $('.single-image.image2').removeClass('active');
		$('.single-image.image3').removeClass('active');
		$('.single-image.image4').removeClass('active');
		$('.single-image.image5').removeClass('active');
		$('.single-image.image6').removeClass('active');
        $('.single-image.image1').addClass('active');		
	});
	
	

	$("#selected_change").change(function() {
		var selected_val = $("#selected_change").val();
		$("#select2_1").css({'display':'none'});
		$("#select2_2").css({'display':'none'});	
		
		$("#select2_thumb_1").css({'display':'none'});
		$("#select2_thumb_2").css({'display':'none'});	
		
		//console.log($select_val)
		
		$("#price2_1").css({'display':'none'});
		$("#price2_2").css({'display':'none'});
		
		$("#desc2_1").css({'display':'none'});
		$("#desc2_2").css({'display':'none'});		
		
		$("#select2_"+selected_val).css({'display':'block'});
		$("#select2_thumb_"+selected_val).css({'display':'block'});
		$("#price2_"+selected_val).css({'display':'block'});
		$("#desc2_"+selected_val).css({'display':'block'});	
 		$('li.single-image.image2').removeClass('active');
 		$('li.single-image.image3').removeClass('active');
 		$('li.single-image.image4').removeClass('active');		
        $('li.single-image.image1').addClass('active');		
	});	
	
});


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function submitEmail(){
    $('.contact-form').find('input').css('border', '0px');
    $('.contact-form').find('input').css('border-bottom', '1px solid #9e9e9e');
    
     if($('#first_name').val()===''){
       $('#first_name').css('border' , '1px solid orange');
     }else if($('#last_name').val()===''){
       $('#last_name').css('border' , '1px solid orange');
     }else if(validateEmail($('#contact-email').val())==false){
      $('#contact-email').css('border' , '1px solid orange');
    }else if($('#textarea1').val()===''){
      $('#textarea1').css('border' , '1px solid orange');
    }else{
     var name = $('#first_name').val() + ' ' + $('#last_name').val();
     var email =  $('#contact-email').val();
     var message = $('#textarea1').val();
     
     $.ajax({
       url: "/contact-basic",
            type: "POST",
            dataType: "json",
            data: {
              name: name,
              email: email,
              message: message
        },
        success: function(data){
          if(data==false){
            alert('Server error, please try again');
          }else{
            $('.contact-form').empty();
            $('.contact-form').append('<h4>Your contact request was submitted. We will be in touch shortly!</h4>');
          }
        },
        fail: function(){
          alert('Server error, please try again');
        }
     });
    }
}


function exitpop(){
  var isPopupShown = false;
  var link_clicked= false;

  $('body').one('mousemove', function () {
  $("body").append("<div id='exitpop-mouseover-trigger' style='width:100%; height:10px; position:fixed; z-index:1000; top:0;'></div>");
  setTimeout(function () {
    $("#exitpop-mouseover-trigger").mouseover(function () {
      if (!link_clicked && !isPopupShown && $(window).width() > 768) {
        $('#pooch-discount').show();  
        isPopupShown = true;

        $('.close-icon').on('click touchend', function(e){
          $('#pooch-discount').hide();  
        });
      }
      });
    }, 5000);
  });

  $('a').mousedown(function() {
    link_clicked = true;
  });
  $('button').mousedown(function() {
    link_clicked = true;
  });
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        if($('#current-mobile-slide').css('opacity')!=1){
          $newMobile = $('.mobile-product-slider').filter(function() {
                          return $(this).css('z-index') == '0';
                        });
          $('#current-mobile-slide').attr('id', '');
          $newMobile.attr('id', 'current-mobile-slide');
          var newDotNum = $newMobile.attr('mobileDotNum');
          $newDot = $('.mobile-dot-option').filter(function() {
                          return $(this).attr('mobileDotNum') == newDotNum;
                        });
          $('.mobile-dot-option.select').removeClass('select').addClass('dot-control');
          $newDot.removeClass('dot-control').addClass('select');
        }
    });    
});

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

// configuration of the observer:
var config = { attributes: true }
