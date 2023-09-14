const loadPhone = async(searchText)  =>{
 const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
 const data = await res.json();
 const phones  = data.data;
//  console.log(phones);
displayPhones(phones)
    
}

displayPhones = phones =>{

    const phoneContainer = document.getElementById("phone-container");
    // clear the phone container before adding new cards
    phoneContainer.textContent = '';
    // display show all link if there are more than 12 phones
    const extraPhoneContainer = document.getElementById("link-container");

    if(phones.length > 12){
    extraPhoneContainer.classList.remove("hidden");
    }
    else{
        extraPhoneContainer.classList.add("hidden")
    }
    // display first 12 phones

    phones = phones.slice(0,12);

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
        <div class="card-actions justify-end">
       <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        </div>
        `;
        // append the div into phone container
        phoneContainer.appendChild(phoneCard);
    });
}
// handle click with search button
 const handleClickSearch = () =>{
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText); 
 }
// loadPhone()