const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const preview = document.getElementById('preview');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
  dropArea.addEventListener(event, e => e.preventDefault());
  document.body.addEventListener(event, e => e.preventDefault());
});

// Highlight drop area on drag
['dragenter', 'dragover'].forEach(event => {
  dropArea.addEventListener(event, () => dropArea.classList.add('dragover'));
});

['dragleave', 'drop'].forEach(event => {
  dropArea.addEventListener(event, () => dropArea.classList.remove('dragover'));
});

// Handle dropped files
dropArea.addEventListener('drop', e => {
  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Browse button click
browseBtn.addEventListener('click', () => fileInput.click());

// File input change
fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  if (files.length === 0) return;

  const file = files[0];
  if (!file.type.startsWith('image/')) {
    alert('Only image files are allowed!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" />`;
  };
  reader.readAsDataURL(file);
}
