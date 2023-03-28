class CustomSelect {
    constructor(originalSelect) {
      this.originalSelect = originalSelect;
      this.customSelect = document.createElement("div");
      this.customSelect.classList.add("selectOption");
       

      this.originalSelect.querySelectorAll("option").forEach((optionElement) => {

        const itemElement = document.createElement("div");

        itemElement.classList.add("select__item", "fs-11px", "d-flex", "flex-column", "align-items-center", "justify-content-center", "col");
        
        const imgElement = document.createElement("img");
        const index = Array.from(optionElement.parentNode.children).indexOf(optionElement);

        switch(index) {
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
        default:
            imgElement.setAttribute("src", "/assets/img/icons/default.png");
        }

        imgElement.setAttribute("class", "mx-auto py-3");
        imgElement.setAttribute("width", "35");
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
          });
      });
  
      this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
      this.originalSelect.style.display = "none";
    }

    _select(itemElement) {
        const index = Array.from(this.customSelect.children).indexOf(itemElement);
        
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
        
        const imgElement = itemElement.querySelector("img");
        if (imgElement) {
          const src = imgElement.getAttribute("src");
          if (!src.includes("-active")) {
            imgElement.setAttribute("src", src.replace(".png", "-active.png"));
          }
        }
      }
      

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

  
  $("#individual-option").on("click", function() {
    $("#dashboard-select").attr("multiple", true);
    console.log("multiple active");
  });

  $("#corporation-option").click(function() {
    // Get the original select element and the custom select div
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
  
    console.log('multiple attr is removed');
  });


  