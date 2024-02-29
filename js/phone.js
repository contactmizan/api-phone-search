const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    disPlayPhones(phones, isShowAll);
}
// 1st 
const disPlayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // 1. jeikhane boshabo sheita pawa
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }//remove show all button if result less than 12
    else {
        showAllContainer.classList.add('hidden')
    }

    //display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    // console.log(phone.length);

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl p-4`;
        // 4. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        // 4. appendchild
        phoneContainer.appendChild(phoneCard);

    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}

//Show Details (at the last)
const handleShowDetail = async (id) => {
    // console.log('clicked show details', id);
    //load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
 <img src="${phone.image}" alt="" />
 <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
 <p><span>GPS:</span>${phone?.others?.GPS}</p>
 
 `


    //show modal
    show_details_modal.showModal();
}

//handler for search button

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    // input theke value neya
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// 2nd search field

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();