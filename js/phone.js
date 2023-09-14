const loadPhone = async(searchText = 13,isShowMore)  =>{
 const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
 const data = await res.json();
 const phones  = data.data;
//  console.log(phones);
displayPhones(phones, isShowMore)
    
}

displayPhones = (phones, isShowMore) =>{

    const phoneContainer = document.getElementById("phone-container");
    // clear the phone container before adding new cards
    phoneContainer.textContent = '';
    // display show all link if there are more than 12 phones
    const extraPhoneContainer = document.getElementById("link-container");

    if(phones.length > 12 && !isShowMore){
    extraPhoneContainer.classList.remove("hidden");
    }
    else{
        extraPhoneContainer.classList.add("hidden")
    }
    // display first 12 phones

   if(!isShowMore){
     phones = phones.slice(0,12);
   }

    phones.forEach(phone => {
       console.log(phone); 
    //    Now create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-10 bg-gray-400 shadow-xl`;
    // set the inner HTML for new div
    phoneCard.innerHTML = `
        <figure><img src= "${phone.image}"alt="Shoes" /></figure>
       <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
       <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        </div>
        `;
        // append the div into phone container
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSDpinner(false);

}
// handle show details

const handleShowDetails = async(id) =>{
//  console.log(id);
//  load single phone data
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const phone = data.data;
showPhoneDetail(phone);

}

const showPhoneDetail = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = phone.name;
    const phoneDetailContainer = document.getElementById("show-detail-container");
    phoneDetailContainer.innerHTML = `
    <img class = "ml-32" src="${phone?.image}"alt=""/>
    <p class = "font-bold"><span class = "font-normal">brand: </span>${phone?.brand}</p>
    <p class = "font-bold"><span class = "font-normal">Chip: </span>${phone?.mainFeatures?.chipSet
}</p>
    <p class = "font-bold"><span class = "font-normal">Display-Size: </span>${phone?.mainFeatures?.displaySize
}</p>
    <p class = "font-bold"><span class = "font-normal">Memory: </span>${phone?.mainFeatures.memory}</p>
    <p class = "font-bold"><span class = "font-normal">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class = "font-bold"><span class = "font-normal">Release-Date: </span>${phone?.releaseDate}</p>
    <p class = "font-bold"><span class = "font-normal">Name: </span>${phone?.slug}</p>
    <p class = "font-bold"><span class = "font-normal">GPS: </span>${phone?.others?.GPS || "NO GPS available in this device"}</p>
    
    

    
    `
    // show the modal
    show_details_modal.showModal()
}
// handle click with search button
 const handleClickSearch = (isShowMore) =>{

    // for loading spinner
    toggleLoadingSDpinner(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowMore); 
 }
 const toggleLoadingSDpinner = (isLoading) =>{
    const loadingSpinner =document.getElementById("loading-spinner");
    if(isLoading){
         loadingSpinner.classList.remove("hidden");
    }
    else{
        loadingSpinner.classList.add("hidden");
    }
   
 }

//  handle show more

const handleShowMore = () =>{
    handleClickSearch(true); 
}
loadPhone()