$(function(){

  $('.navigation .toggle-wrapper .show').on('click',function(){
    $('.navigation').addClass('open');
  });
  $('.navigation .toggle-wrapper .hide').on('click',function(){
    $('.navigation').removeClass('open');
  });
  $('.navigation .has-menu a').on('click',function(e){
    e.stopPropagation();
  });
  $('.navigation .has-menu').on('click',function(){
    $(this).toggleClass('open');
  });
  
});