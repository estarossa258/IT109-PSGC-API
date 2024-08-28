
    // Add your JavaScript code here
    const regionSelect = document.getElementById('region');
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const barangaySelect = document.getElementById('barangay');
    const passwordError = document.getElementById('password-error');
    const form = document.getElementById('registration-form');

    // Fetch regions from PSGC API
    fetch('https://psgc.gitlab.io/api/regions/')
      .then(response => response.json())
      .then(data => {
        data.forEach(region => {
          const option = document.createElement('option');
          option.value = region.code;
          option.text = region.name;
          regionSelect.add(option);
        });
      })
      .catch(error => console.error('Error fetching regions:', error));

    // Handle region selection
    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
      provinceSelect.innerHTML = '<option value="">Select Province</option>';
      citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
      barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

      // Fetch provinces based on selected region
      fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`)
        .then(response => response.json())
        .then(data => {
          data.forEach(province => {
            const option = document.createElement('option');
            option.value = province.code;
            option.text = province.name;
            provinceSelect.add(option);
          });
        })
        .catch(error => console.error('Error fetching provinces:', error));
    });

    // Handle province selection
    provinceSelect.addEventListener('change', () => {
      const selectedProvince = provinceSelect.value;
      citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
      barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

      // Fetch cities/municipalities based on selected province
      fetch(`https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`)
        .then(response => response.json())
        .then(data => {
          data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.code;
            option.text = city.name;
            citySelect.add(option);
          });
        })
        .catch(error => console.error('Error fetching cities/municipalities:', error));
    });

    // Handle city/municipality selection
    citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.value;
      barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

      // Fetch barangays based on selected city/municipality
      fetch(`https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`)
        .then(response => response.json())
        .then(data => {
          data.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay.code;
            option.text = barangay.name;
            barangaySelect.add(option);
          });
        })
        .catch(error => console.error('Error fetching barangays:', error));
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match.';
        return;
      }

      passwordError.textContent = '';

      // Get form data
      const formData = new FormData(form);

      // Perform registration logic here
      console.log('Registered Successfully!');
      alert('Registered Successfully!');

      // Reset the form
      form.reset();
    });