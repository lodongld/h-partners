function openPaymentModal() {
  let representative = $("#representative").val();
  let company = $("#company").val();
  let contact = $("#contact").val();
  let code = $("#inputCode").val();

  // Get the selected option
  let categoryOption = $("input[name=category-option]:checked").val();

  // Get the selected options from the dashboard-select
  var selectedItems = $("#dashboard-select option:selected")
    .map(function () {
      var name = $(this).attr("name");
      var optionValue = $(this).val();
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
            value: optionValue,
            koreanName: koreanName,
            data: financialStatements,
          };
        default:
          koreanName = name;
          break;
      }
      return {
        name: name,
        value: optionValue,
        koreanName: koreanName,
      };
    })
    .get();

  // Calculate the total value
  let total = selectedItems.reduce(
    (acc, item) => acc + parseInt(item.value),
    0
  );

  let data = {
    categoryOption: categoryOption,
    representative: representative,
    company: company,
    contact: contact,
    code: code,
    selectedItems: selectedItems,
    total: total.toLocaleString(),
  };

  // console.log(data);

  // Update the modal template using Mustache.js to prevent undefined template when button is clicked more than once.
  let template = $("#paymentModalTemp").html();
  if (!template) {
    return;
  }
  let rendered = Mustache.render(template, data);
  $("#globalModalCont").html(rendered);
}

$("#paymentModalBtn").on("click", function () {
  let representative = $("#representative").val();
  let company = $("#company").val();
  // let contact = $("#contact").val();

  // Check if representative and company input boxes are empty
  if (!representative || !company) {
    $("#alertModal").modal("show");
    console.log("모든 필수 정보를 입력하십시오.");
    return;
  } else {
    // Open the modal
    $("#globalModal").modal("show");

    openPaymentModal();
  }
});
