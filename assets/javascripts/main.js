$(document).ready(function() {
  // setTimeout(function() {
  //   $("#main_page").fadeOut(1000, function() {
  //     $("#dashboard_page").slideUp(1000).addClass("d-block").removeClass("d-none");
  //     $("#main_page").slideUp(1000).addClass("d-none").removeClass("d-block");
  //   });
  // }, 3000);


  $("#nextBtn").click(function() {
    $("#dashboard_page").fadeOut(500, function() {
        $("#dashboard2_page").slideDown(500);
        if ($("#dashboard2_page").hasClass("d-none")) {
          $("#dashboard_page").addClass("d-none").removeClass("d-block");
          $("#dashboard2_page").addClass("d-block").removeClass("d-none");
        }
      });
  });

  $("#backBtn").click(function() {
    $("#dashboard2_page").fadeOut(500, function() {
        $("#dashboard_page").slideDown(500);
        if ($("#dashboard_page").hasClass("d-none")) {
          $("#dashboard2_page").addClass("d-none").removeClass("d-block");
          $("#dashboard_page").addClass("d-block").removeClass("d-none");
        }
      });
  });

  $("#payBtn").click(function() {
    $("#dashboard2_page").fadeOut(500, function() {
        $("#payment_page").slideDown(500);
        if ($("#payment_page").hasClass("d-none")) {
          $("#dashboard2_page").addClass("d-none").removeClass("d-block");
          $("#payment_page").addClass("d-block").removeClass("d-none");
        }
      });
  });

  $("#paybackBtn").click(function() {
    $("#payment_page").fadeOut(500, function() {
        $("#dashboard_page").slideDown(500);
        if ($("#dashboard_page").hasClass("d-none")) {
          $("#payment_page").addClass("d-none").removeClass("d-block");
          $("#dashboard_page").addClass("d-block").removeClass("d-none");
        }
      });
  });

  $("#checkBtn").click(function() {
    $("#payment_page").fadeOut(500, function() {
        $("#dashboard_page").slideDown(500);
        if ($("#dashboard_page").hasClass("d-none")) {
          $("#payment_page").addClass("d-none").removeClass("d-block");
          $("#dashboard_page").addClass("d-block").removeClass("d-none");
        }
      });
  });
});