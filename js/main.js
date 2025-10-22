
$(document).ready(function(){

    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight");
                } else {
                label.removeClass("highlight");
                }
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight");
            }
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });

});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.contenedor-input').forEach(function (container) {
        var input = container.querySelector('input, textarea');
        var label = container.querySelector('label');
        if (!input || !label) return;

        function actualizar() {
            if (document.activeElement === input || input.value.trim() !== '') {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        }

        input.addEventListener('focus', actualizar);
        input.addEventListener('input', actualizar);
        input.addEventListener('blur', actualizar);

        actualizar();
    });
});