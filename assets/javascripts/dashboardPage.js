class CustomSelect {
  constructor(originalSelect) {
    this.originalSelect = originalSelect;
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("selectOption");

    this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
      const itemElement = document.createElement("div");

      itemElement.classList.add(
        "select__item",
        "fs-11px",
        "d-flex",
        "flex-column",
        "align-items-center",
        "justify-content-center",
        "col",
        "fw-bolder"
      );

      const imgElement = document.createElement("img");
      const index = Array.from(optionElement.parentNode.children).indexOf(
        optionElement
      );

      switch (index) {
        case 0:
          imgElement.setAttribute("src", "/assets/img/icons/refund.png");
          break;
        case 1:
          imgElement.setAttribute("src", "/assets/img/icons/history.png");
          break;
        case 2:
          imgElement.setAttribute("src", "/assets/img/icons/tax-refund.png");
          break;
        case 3:
          imgElement.setAttribute("src", "/assets/img/icons/consulting.png");
          break;
        case 4:
          imgElement.setAttribute("src", "/assets/img/icons/output-form.png");
          break;
        case 5:
          imgElement.setAttribute(
            "src",
            "/assets/img/icons/financial-statements.png"
          );
          break;
        default:
          imgElement.setAttribute("src", "/assets/img/icons/default.png");
      }

      imgElement.setAttribute("class", "mx-auto py-3");
      imgElement.setAttribute("width", "45");
      imgElement.setAttribute("alt", "");
      itemElement.appendChild(imgElement);

      const textElement = document.createElement("span");
      textElement.textContent = optionElement.textContent;
      textElement.classList.add("text-center");
      itemElement.appendChild(textElement);

      this.customSelect.appendChild(itemElement);

      if (optionElement.selected) {
        this._select(itemElement);
      }

      itemElement.addEventListener("click", () => {
        if (
          this.originalSelect.multiple &&
          itemElement.classList.contains("select__item--selected")
        ) {
          this._deselect(itemElement);
        } else {
          this._select(itemElement);
        }

        // Check if the clicked option is "financial-statements"
        if (optionElement.getAttribute("name") === "financial-statements") {
          // Trigger the modal
          const modalTarget = optionElement.getAttribute("data-bs-target");
          const modal = document.querySelector(modalTarget);
          if (modal) {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
          }

          /// Get the "확인" button element
          const confirmFinancialStatementsBtn = document.getElementById(
            "confirmFinancialStatementsBtn"
          );

          // Add a click event listener to the button
          confirmFinancialStatementsBtn.addEventListener("click", () => {
            // Get all the checked checkboxes within the financial statements modal
            const checkboxes = document.querySelectorAll(
              '#financialStatements input[type="checkbox"]:checked'
            );

            // Select the financial-statements option only if there are checked checkboxes
            if (checkboxes.length > 0) {
              optionElement.selected = true;
              itemElement.classList.add("select__item--selected");

              // Change the image source to active
              const imgElement = itemElement.querySelector("img");
              if (imgElement) {
                const src = imgElement.getAttribute("src");
                if (!src.includes("-active")) {
                  imgElement.setAttribute(
                    "src",
                    src.replace(".png", "-active.png")
                  );
                }
              }

              var selectedOptions = []; // Array to store selected options
              var total = 0; // Variable to store the sum of selected values

              // Get the checked checkboxes and retrieve their data and values
              $('input[type="checkbox"]:checked').each(function () {
                var name = $(this).attr("name");
                var value = parseInt($(this).val());
                var option = { [name]: value };
                selectedOptions.push(option);
                total += value;
              });

              var result = { total, data: selectedOptions };
              // console.log(result);

              localStorage.setItem(
                "financial-statements",
                JSON.stringify(result)
              );

              $('option[name="financial-statements"]').val(total);
            } else {
              optionElement.selected = false;
              itemElement.classList.remove("select__item--selected");

              // Change the image source to inactive
              const imgElement = itemElement.querySelector("img");
              if (imgElement) {
                const src = imgElement.getAttribute("src");
                if (src.includes("-active")) {
                  imgElement.setAttribute("src", src.replace("-active", ""));
                }
              }
            }
          });
        }
      });
    });

    this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
    this.originalSelect.style.display = "none";
  }

  // FUNCTION FOR SELECTING ITEM
  _select(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    // FUNCTION OF SELECT IS FOR SINGLE SELECTION
    if (!this.originalSelect.multiple) {
      this.customSelect.querySelectorAll(".select__item").forEach((el) => {
        el.classList.remove("select__item--selected");
        const imgElement = el.querySelector("img");
        if (imgElement) {
          const src = imgElement.getAttribute("src");
          imgElement.setAttribute("src", src.replace("-active", ""));
        }
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("select__item--selected");

    //FUNCTION FOR CHANGING THE IMG SRC IF ITS ACTIVE OR INACTIVE
    const imgElement = itemElement.querySelector("img");
    if (imgElement) {
      const src = imgElement.getAttribute("src");
      if (!src.includes("-active")) {
        imgElement.setAttribute("src", src.replace(".png", "-active.png"));
      }
    }
  }

  // FUNCTION FOR DESELECTING ITEM
  _deselect(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    if (this.originalSelect.multiple) {
      const options = this.originalSelect.querySelectorAll("option");
      options[index].selected = false;

      let hasSelectedOptions = false;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          hasSelectedOptions = true;
          break;
        }
      }

      if (!hasSelectedOptions) {
        this.customSelect.querySelectorAll(".select__item").forEach((el) => {
          el.classList.remove("select__item--selected");
          const imgElement = el.querySelector("img");
          if (imgElement) {
            const src = imgElement.getAttribute("src");
            if (src.includes("-active")) {
              imgElement.setAttribute("src", src.replace("-active", ""));
            }
          }
        });
      } else {
        itemElement.classList.remove("select__item--selected");
      }
    } else {
      this.originalSelect.querySelectorAll("option")[index].selected = false;
      itemElement.classList.remove("select__item--selected");
    }

    const imgElement = itemElement.querySelector("img");
    if (imgElement) {
      const src = imgElement.getAttribute("src");
      if (src.includes("-active")) {
        imgElement.setAttribute("src", src.replace("-active", ""));
      }
    }
  }
}

document.querySelectorAll(".custom-select").forEach((selectElement) => {
  new CustomSelect(selectElement);
});

// FUNCTION FOR BUTTON "INDIVIDUAL" TO ENABLE MULTIPLE SELECTION
$("#individual-option").on("click", function () {
  // $("#dashboard-select").attr("multiple", true);
  console.log("individual has been selected");
});

// FUNCTION FOR BUTTON "CORPORATION" TO ENABLE SINGLE SELECTION
$("#corporation-option").click(function () {
  // // Get the original select element and the custom select div
  // const originalSelect = document.querySelector("#dashboard-select");
  // const customSelect = originalSelect.nextElementSibling;

  // // Remove the multiple attribute from the original select
  // originalSelect.removeAttribute("multiple");

  // // Deselect all options in the custom select
  // customSelect.querySelectorAll(".select__item").forEach((el) => {
  //   el.classList.remove("select__item--selected");
  //   const imgElement = el.querySelector("img");
  //   if (imgElement) {
  //     const src = imgElement.getAttribute("src");
  //     if (src.includes("-active")) {
  //       imgElement.setAttribute("src", src.replace("-active", ""));
  //     }
  //   }
  // });

  // console.log('multiple attr is removed');
  console.log("corporation has been selected");
});

$("#nextBtn").on("click", function () {
  var menuSelected = [];
  $("#dashboard-select option:selected").each(function () {
    var name = $(this).attr("name");
    var value = $(this).val();
    var item = {};
    item[name] = value;
    menuSelected.push(item);
  });

  if (menuSelected.length === 0) {
    alert("하나 이상의 항목을 선택하십시오.");
    return false;
  } else {
    // Check if the "financial-statements" option is selected
    var financialStatementsOption = menuSelected.find(function (option) {
      return option.hasOwnProperty("financial-statements");
    });

    if (financialStatementsOption) {
      // Retrieve the data from localStorage
      var financialStatementsData = localStorage.getItem(
        "financial-statements"
      );

      // Set the value of the "financial-statements" option to the retrieved data
      financialStatementsOption["financial-statements"] =
        financialStatementsData;
    }

    // Set the value of inputCode as the text of spanCode
    var inputCodeValue = $("#inputCode").val();
    $("#spanCode").text(inputCodeValue);

    if (!inputCodeValue) {
      alert("코드를 입력해 주세요.");
      return;
    } else {
      $("#dashboard_page").fadeOut(500, function () {
        $("#dashboard2_page").slideDown(500);
        if ($("#dashboard2_page").hasClass("d-none")) {
          $("#dashboard_page").addClass("d-none").removeClass("d-block");
          $("#dashboard2_page").addClass("d-block").removeClass("d-none");
        }
      });
    }
  }

  // console.log(menuSelected);
});
