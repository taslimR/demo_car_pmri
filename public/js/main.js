$(document).ready(function() {



  $(".toggle-accordion").on("click", function() {

    var accordionId = $(this).attr("accordion-id"),

      numPanelOpen = $(accordionId + ' .collapse.in').length;

    

    $(this).toggleClass("active");



    if (numPanelOpen == 0) {

      openAllPanels(accordionId);

    } else {

      closeAllPanels(accordionId);

    }

  })   

});









$(document).ready(function() {

    

    var navListItems = $('ul.setup-panel li a'),

        allWells = $('.setup-content');



    allWells.hide();



    navListItems.click(function(e)

    {

        e.preventDefault();

        var $target = $($(this).attr('href')),

            $item = $(this).closest('li');

        

        if (!$item.hasClass('disabled')) {

            navListItems.closest('li').removeClass('active');

            $item.addClass('active');

            allWells.hide();

            $target.show();

        }

    });

    

    $('ul.setup-panel li.active a').trigger('click');

    

    // DEMO ONLY //

    $('#activate-step-2').on('click', function(e) {
        $('#record').html("");
        $('#record').html('step 2');
        $('ul.setup-panel li:eq(1)').removeClass('disabled');



        $('ul.setup-panel li a[href="#two-normal"]').trigger('click');

        $(this).remove();

    })

    

    $('#activate-step-3').on('click', function(e) {

        $('#record').html("");
        $('#record').html('step 3');

        $('ul.setup-panel li:eq(2)').removeClass('disabled');

        $('ul.setup-panel li a[href="#three-normal"]').trigger('click');

        $(this).remove();

    })

    

    $('#activate-step-4').on('click', function(e) {

        $('#record').html("");
        $('#record').html('step 4');

        $('ul.setup-panel li:eq(3)').removeClass('disabled');

        $('ul.setup-panel li a[href="#four-normal"]').trigger('click');

        $(this).remove();

    })

    

    // $('#activate-step-3').on('click', function(e) {

    //     $('ul.setup-panel li:eq(2)').removeClass('disabled');

    //     $('ul.setup-panel li a[href="#three-normal"]').trigger('click');

    //     $(this).remove();

    // })

});









$('.portfolio-item').on('click', function(e) {

	$('.portfolio-item').removeClass('selected-portfolio');

	$(this).addClass('selected-portfolio');

})