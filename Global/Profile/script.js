document.addEventListener('DOMContentLoaded', async function () {
    // Function to load the user profile from the backend
    async function loadUserProfile() {
        try {
            const response = await fetch('/getProfile');
            if (response.ok) {
                const userData = await response.json();
                console.log('Profile Data:', userData); // Debug: Check data

                // Populate the form fields with the user data
                document.getElementById('usernameField').value = userData.username || '';
                document.getElementById('nameField').value = userData.name || 'No Name Set';
                document.getElementById('emailField').value = userData.email || '';
            } else if (response.status === 401) {
                alert('Please log in to view your profile.');
                window.location.href = '/login.html';
            } else {
                console.error('Failed to load profile data');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    // Load the saved profile image from localStorage
    function loadProfileImage() {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            document.getElementById('profileImg').src = savedImage;
        }
    }

    // Save uploaded profile picture to localStorage
    document.getElementById('uploadBtn').addEventListener('change', function (event) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            localStorage.setItem('profileImage', imageData); // Save image in localStorage
            document.getElementById('profileImg').src = imageData; // Update image
        };
        reader.readAsDataURL(event.target.files[0]); // Convert to Base64
    });

    // Initialize the profile
    loadUserProfile(); // Load profile on page load
    loadProfileImage(); // Load profile image on page load
});
