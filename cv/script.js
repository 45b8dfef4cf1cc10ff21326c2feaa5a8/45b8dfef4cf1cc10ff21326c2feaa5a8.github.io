const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", function () {
  document.documentElement.style.setProperty('--primary-color', this.value);
});


document.getElementById("downloadBtn").addEventListener("click", function () {
  const resume = document.querySelector(".resume");
  html2pdf(resume, {
    margin: 0,
    filename: 'resume.pdf',
    html2canvas: {
      scale: 2
    },
    jsPDF: {
      format: 'a4',
      orientation: 'portrait'
    }
  });
});

function setfooter() {
  var creditContent = document.querySelector('.footer');
  var currentYear = new Date().getFullYear();
  creditContent.innerHTML = `
  Mimoun Jakhrouti &copy; 2021-${currentYear}
  `;
  }
  setfooter();



function setFontFamily(fontFamily) {
  document.documentElement.style.setProperty('--font-family', fontFamily);
}

// Custom select dropdown functionality
const customSelects = document.querySelectorAll('.font-selector');

customSelects.forEach(select => {
  const selectBtn = select.querySelector('.select-btn');
  const options = select.querySelector('.options');

  selectBtn.addEventListener('click', () => {
    select.classList.toggle('open');
  });

  options.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      const label = option.textContent;

      selectBtn.textContent = label;
      selectBtn.setAttribute('data-value', value);
      select.classList.remove('open');

      // Call setFontFamily function with the selected font
      setFontFamily(value);
    });
  });

  // Set "Open Sans" as default font
  const defaultFont = "'Raleway', sans-serif";
  selectBtn.textContent = 'Raleway';
  setFontFamily(defaultFont);
});

// Print Resume functionality
document.getElementById("printBtn").addEventListener("click", function () {
  const printContents = document.querySelector(".container").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();

  document.body.innerHTML = originalContents;
});
