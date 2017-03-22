$(document).ready(function () {
    $('#nav').affix(
        {
            offset: {
                top: 100,
                bottom: 50

            }
        }
    );
});


var fixAffixWidth = function () {
    $('[data-spy="affix"]').each(function () {
        $(this).width($(this).parent().width());
    });
}
fixAffixWidth();
$(window).resize(fixAffixWidth);