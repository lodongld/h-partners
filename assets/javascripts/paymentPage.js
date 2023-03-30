function PaymentModal() {
    let representative = $('#representative').val();
    let company = $('#company').val();
    let contact = $('#contact').val();
  
    // Get the selected option
    let categoryOption = $('input[name=category-option]:checked').val();

    // Get the selected options from the dashboard-select
    var selectedData = $('#dashboard-select option:selected').map(function() {
      var name = $(this).attr('name');
      var value = $(this).val();
      var koreanName;
      switch(name) {
        case 'refund':
          koreanName = "예상환급액 확인하기";
          break;
        case 'history':
          koreanName = "특관자 근무 내역 찾기";
          break;
        case 'tax-refund':
          koreanName = "법인세 납부이력 즉시 환급액 이월세액";
          break;
        case 'consulting':
          koreanName = "가지급금규모 컨설팅가능 영역확인";
          break;
        case 'output-form':
          koreanName = "양식용 출력 서비스";
          break;
        default:
          koreanName = name;
          break;
      }
      return {
        name: name,
        value: value,
        koreanName: koreanName
      };
    }).get();
  
    // Calculate the total value
    let paytotal = selectedData.reduce((acc, item) => acc + parseInt(item.value), 0);
  
    let paydata = {
      'categoryOption': categoryOption,
      'representative': representative,
      'company': company,
      'contact': contact,
      'selectedData': selectedData,
      'paytotal': paytotal
    };
  
    console.log('payD: ',paydata);
  
    // Display the payment data using the mustache template
    let template = $('#paymentConfirmTemp').html();
    if (!template) { return; } 
    let rendered = Mustache.render(template, paydata);
    $('#paymentPageCont').html(rendered);

    // console.log('template: ', template, 'rendered: ', rendered);
  }

function clearSelections() {
    // Clear all selected options in the dashboard-select
    const originalSelect = document.querySelector("#dashboard-select");
    const customSelect = originalSelect.nextElementSibling;
  
    // Remove the multiple attribute from the original select
    originalSelect.removeAttribute("multiple");
  
    // Deselect all options in the custom select
    customSelect.querySelectorAll(".select__item").forEach((el) => {
      el.classList.remove("select__item--selected");
      const imgElement = el.querySelector("img");
      if (imgElement) {
        const src = imgElement.getAttribute("src");
        if (src.includes("-active")) {
          imgElement.setAttribute("src", src.replace("-active", ""));
        }
      }
    });
  
    // Clear all input boxes
    $('#representative').val('');
    $('#company').val('');
    $('#contact').val('');
  }
  


  $('#checkBtn').on('click', function() {
    clearSelections();
    console.log('Clear All');
  });
  
  $("#payBtn").click(function() {
    PaymentModal();
  });