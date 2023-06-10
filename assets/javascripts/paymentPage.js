function PaymentModal() {
  let representative = $("#representative").val();
  let company = $("#company").val();
  let contact = $("#contact").val();
  let code = $("#inputCode").val();

  // Get the selected option
  let categoryOption = $("input[name=category-option]:checked").val();

  // Get the selected options from the dashboard-select
  var selectedData = $("#dashboard-select option:selected")
    .map(function () {
      var name = $(this).attr("name");
      var value = $(this).val();
      var koreanName;
      switch (name) {
        case "refund":
          koreanName = "예상환급액 확인하기";
          break;
        case "history":
          koreanName = "특관자 근무 내역 찾기";
          break;
        case "tax-refund":
          koreanName = "법인세 납부이력 즉시 환급액 이월세액";
          break;
        case "consulting":
          koreanName = "가지급금규모 컨설팅가능 영역확인";
          break;
        case "output-form":
          koreanName = "양식용 출력 서비스";
          break;
        case "financial-statements":
          koreanName = "재무재표";
          // Retrieve the financial-statement data from localStorage
          var financialStatementsData = localStorage.getItem(
            "financial-statements"
          );
          // Parse the JSON data into an object
          var financialStatements = JSON.parse(financialStatementsData);
          // Include the financial-statement data in the selectedItems array
          return {
            name: name,
            value: value,
            koreanName: koreanName,
            data: financialStatements,
          };
        default:
          koreanName = name;
          break;
      }
      return {
        name: name,
        value: value,
        koreanName: koreanName,
      };
    })
    .get();

  // Calculate the total value
  let paytotal = selectedData.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );

  let paydata = {
    categoryOption: categoryOption,
    representative: representative,
    company: company,
    contact: contact,
    code: code,
    selectedData: selectedData,
    paytotal: paytotal.toLocaleString(),
  };

  console.log("Receipt Data: ", paydata);

  // Display the payment data using the mustache template
  let template = $("#paymentConfirmTemp").html();
  if (!template) {
    return;
  }
  let rendered = Mustache.render(template, paydata);
  $("#paymentPageCont").html(rendered);

  // console.log("template: ", template, "rendered: ", rendered);
}

function clearSelections() {
  // Refresh the page to reset all data
  location.reload();
}

$("#checkBtn").on("click", function () {
  clearSelections();
  console.log("Clear All");
  localStorage.removeItem("financial-statements");
});

$("#payBtn").click(function () {
  // console.log("PayBtn from paymentPage Active");
  PaymentModal();
});
