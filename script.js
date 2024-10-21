// Get modal and elements
const otherServerModal = document.getElementById('otherServerModal');
const otherServerBtn = document.getElementById('otherServerBtn');
const closeModal = document.getElementsByClassName('close')[0];
const modalOkBtn = document.getElementById('modalOkBtn');

// Open modal on button click
otherServerBtn.onclick = function() {
    otherServerModal.style.display = 'block';
}

// Close modal on 'OK' button click
modalOkBtn.onclick = function() {
    otherServerModal.style.display = 'none';
}

// Close modal when 'x' is clicked
closeModal.onclick = function() {
    otherServerModal.style.display = 'none';
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target == otherServerModal) {
        otherServerModal.style.display = 'none';
    }
}
