const search=document.getElementById("search");
const logo=document.querySelector(".navbar__logo-img");
const filterSearch=document.getElementById("filterSearch")
const filterHeader=document.querySelector(".products__filters-top")
const filterBottom=document.querySelector(".products__filters-bottom")
const brandFilters = document.getElementById("brandFilters");
const sliderMin = document.getElementById("sliderMin");
const sliderMax = document.getElementById("sliderMax");
const minVal = document.getElementById("minVal");
const maxVal = document.getElementById("maxVal");
const sliderTrack = document.getElementById("priceSliderTrack");
const productCards=document.querySelector(".products__cards")
const error=document.querySelector(".products__cards-error")
const filterSummary=document.querySelector(".products__filters--summary")
const navMenu=document.querySelector(".navbar__search-dropdown-menu")
const clearFilters=document.querySelector(".products__filters--clear")
const navbarInput=document.querySelector(".navbar__search-input")
const navbar=document.querySelector(".navbar__search")
const sortAscending=document.querySelector(".products__filters-dropdown-menu-low")
const sortDescending=document.querySelector(".products__filters-dropdown-menu-high")
const sortText=document.querySelector(".products__filters-dropdown-toggle")
const brandSearch=document.querySelector(".products__filters-input")
const mobileSort=document.querySelector(".mobile__bar--sort")
const sortMenu=document.querySelector(".mobile__bar--sort-menu")
const mobileAscending=document.querySelector(".mobile__bar--sort-menu-low")
const mobileDescending=document.querySelector(".mobile__bar--sort-menu-high")
const mobileFilter=document.querySelector(".mobile__bar--filter")
const productFilter=document.querySelector(".products__filters")
const filterApply=document.querySelector(".products__filters--mobile--apply")
const filterClose=document.querySelector(".products__filters--mobile--close")
let uniqueBrands = [];
let products=[];


logo.addEventListener("click",function reload(e){
    window.location.href="landing.html"
})

filterSearch.addEventListener("click",()=>{
    filterHeader.style.display="none";
    filterBottom.style.display="block";
})
filterBottom.querySelector("img").addEventListener("click",()=>{
    filterHeader.style.display="flex";
    filterBottom.style.display="none";

})
fetch('https://fakestoreapi.in/api/products')
  .then(response => {return response.json();})
  .then(data => {
    products = data.products;
    const container = document.getElementById('productContainer');

    products.forEach((product) => {
      const brand = product.brand.charAt(0).toUpperCase() + product.brand.slice(1);
      if (!uniqueBrands.includes(brand)) {
        uniqueBrands.push(brand);
      }
      if(product.discount === undefined){
        product.discount=30;
      }

      const originalPrice = (product.price / (1 - product.discount / 100)).toFixed(0);

      const card = document.createElement('div');
      card.className = 'products__card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="products__card-img">
        <div class="products__card-rating">
          4.5 <span class="products__card-rating-icon">★</span> | 65
        </div>
        <div class="products__card-content">
          <div class="products__card-brand">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</div>
          <div class="products__card-desc">${product.title}</div>
          <div class="products__card-price">
            <span class="products__card-price--discounted">₹${product.price}</span>
            <span class="products__card-price--offer">(${product.discount}% OFF)</span>
            <span class="products__card-price--original">₹${originalPrice}</span>
          </div>
        </div>`;

      container.appendChild(card);
    });
    if(products.length===0){
        error.innerHTML=`No Products to show`;
    }
    else{
        error.innerHTML=``;
    }
    showBrand(uniqueBrands);

     

  })
  .catch(error => {
    console.error('Problem', error);
  });


search.addEventListener("input", function () {
  const ans = search.value.trim().toLowerCase();
  navMenu.innerHTML = ""; 

  if (ans.length >= 3) {
    const result = products.filter(product =>
      product.brand.toLowerCase().includes(ans) ||
      product.title.toLowerCase().includes(ans)
    );

    if (result.length === 0) {
      const noItem = document.createElement("li");
      noItem.textContent = "No matches found";
      noItem.style.color = "grey";
      navMenu.appendChild(noItem);
    } else {
      result.slice(0, 10).forEach(product => {
        const combinedText = `${product.brand.charAt(0).toUpperCase()+product.brand.slice(1)} - ${product.title}`;
        const words = combinedText.split(" ").slice(0, 5).join(" ");

        const li = document.createElement("li");
        li.className="navbar__search-dropdown-menu-list"
        li.textContent = words;
        li.addEventListener("click", () => {
          search.value = product.title;
          navMenu.style.display = "none";
          dispayProducts([product]);
        });
        navMenu.appendChild(li);
      });
    }
    navMenu.style.display = "block";
  } else {
    navMenu.style.display = "none";
  }
});


search.addEventListener("click",()=>{
    navbarInput.style.backgroundColor="white";
    navbar.style.backgroundColor="white";
    navbar.style.border="1px solid #e9e9ed";

})

search.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); 
    const ans = search.value.trim().toLowerCase();

    const result = products.filter(product =>
      product.brand.toLowerCase().includes(ans) ||
      product.title.toLowerCase().includes(ans)
    );

    navMenu.style.display = "none";
    dispayProducts(result);
  }
});
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.style.display = "none"; 
  }
});
search.addEventListener("click", function () {
  navbarInput.style.backgroundColor = "white";
  navbar.style.backgroundColor = "white";
  navbar.style.border = "1px solid #e9e9ed";
  if (search.value.trim().length >= 3) {
    navMenu.style.display = "block";  
  }
});

function dispayProducts(products){
    const container=document.getElementById("productContainer");
    container.innerHTML="";
    
    products.forEach(product =>{
        const originalPrice = (product.price / (1 - product.discount / 100)).toFixed(0);

        const card = document.createElement('div');
        card.className = 'products__card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="products__card-img">
          <div class="products__card-rating">
            4.5 <span>★</span> | 65
          </div>
          <div class="products__card-content">
            <div class="products__card-brand">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</div>
            <div class="products__card-desc">${product.title}</div>
            <div class="products__card-price">
              <span class="products__card-price--discounted">₹${product.price}</span>
              <span class="products__card-price--offer">(${product.discount}% OFF)</span>
              <span class="products__card-price--original">₹${originalPrice}</span>
            </div>
          </div>`;
        container.appendChild(card);
      
    
    });
    if(products.length===0){
        error.innerHTML=`No Products to show`
    }
    else{
        error.innerHTML=``

    }

}

const minGap = 100;

function updateSlider(e) {
  const min = parseInt(sliderMin.value);
  const max = parseInt(sliderMax.value);

  if (max - min <= minGap) {
    if (e.target.id === "sliderMin") {
      sliderMin.value = max - minGap;
    } else {
      sliderMax.value = min + minGap;
    }
  }

  minVal.textContent = sliderMin.value;
  maxVal.textContent = sliderMax.value === "10000" ? "10000+" : sliderMax.value;

  checkFilter()
}

sliderMin.addEventListener("input", updateSlider);
sliderMax.addEventListener("input", updateSlider);

updateSlider();

brandFilters.addEventListener("input", checkFilter);
const discountFilters = document.querySelectorAll('input[name^="discount"]');
discountFilters.forEach(checkbox => {
    checkbox.addEventListener('input', checkFilter);
});

function checkFilter() {
  const selectedInputs = Array.from(document.querySelectorAll('input[name="brand"]:checked'));
  const selectedBrands = selectedInputs.map(input => input.value.toLowerCase());

  const selectedDiscounts = Array.from(document.querySelectorAll('input[name^="discount"]:checked'))
      .map(input => parseInt(input.id.replace('discount', '')));

  const minPrice = parseInt(sliderMin.value);
  const maxPrice = parseInt(sliderMax.value);

  filterSummary.innerHTML = "";

  selectedInputs.forEach(input => {
    const brand = input.value;

    const item = document.createElement("div");
    item.className = "products__filters--summary-item";
    item.innerHTML = `${brand} <img class="products__filters--summary-image" src="./assets/cross.png" alt="cross">`;

    item.querySelector("img").addEventListener("click", () => {
      input.checked = false;
      checkFilter();
    });

    filterSummary.appendChild(item);
  });

  if (minPrice !== 0 || maxPrice !== 10000) {
      const priceItem = document.createElement("div");
      priceItem.className = "products__filters--summary-item";
      priceItem.innerHTML = `₹${minPrice} - ₹${maxPrice === 10000 ? '10000+' : maxPrice} <img src="./assets/cross.png" alt="cross">`;

      priceItem.querySelector("img").addEventListener("click", () => {
          sliderMin.value = 0;
          sliderMax.value = 10000;
          updateSlider();  
      });

      filterSummary.appendChild(priceItem);
  }

  selectedDiscounts.forEach(discount => {
      const item = document.createElement("div");
      item.className = "products__filters--summary-item";
      item.innerHTML = `${discount}% and above <img src="./assets/cross.png" alt="cross">`;

      item.querySelector("img").addEventListener("click", () => {
          document.getElementById(`discount${discount}`).checked = false;
          checkFilter();
      });

      filterSummary.appendChild(item);
  });

  let filtered = products;

  if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
          selectedBrands.includes(product.brand.toLowerCase())
      );
  }

  filtered = filtered.filter(product => {
      return product.price >= minPrice && product.price <= maxPrice;
  });

  if (selectedDiscounts.length > 0) {
      filtered = filtered.filter(product => {
          const productDiscount = product.discount || 0; 
          return selectedDiscounts.some(discount => productDiscount >= discount);
      });
  }

  if (selectedBrands.length === 0 && minPrice === 0 && maxPrice === 10000 && selectedDiscounts.length === 0) {
      filterSummary.innerHTML = "";
  }
  if (selectedBrands.length > 0 || selectedDiscounts.length > 0 || minPrice !== 0 || maxPrice !== 10000) {
    clearFilters.style.display = "block";
  } else {
  clearFilters.style.display = "none";
  }

  dispayProducts(filtered);
}


clearFilters.addEventListener("click", () => {
  document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
      checkbox.checked = false;
  });

  document.querySelectorAll('input[name^="discount"]').forEach(checkbox => {
      checkbox.checked = false;
  });

  sliderMin.value = 0;
  sliderMax.value = 10000;
  minVal.textContent = sliderMin.value;
  maxVal.textContent = "10000+";
  updateSlider();

  filterSummary.innerHTML = "";

  checkFilter();
});


function showBrand(uniqueBrands) {
  brandFilters.innerHTML = ""; 

  const maxBrands = 5;
  let isMoreVisible = false; 
  uniqueBrands.forEach((brand, i) => {
    const option = document.createElement("div");
    option.className = "products__filters--brand-option";
    option.innerHTML = `
      <input type="checkbox" name="brand" value="${brand}">
      <label>${brand}</label>
    `;
    if (i >= maxBrands) option.style.display = "none"; 
    brandFilters.appendChild(option);
  });

  const moreBrandsCount = uniqueBrands.length - maxBrands;

  if (moreBrandsCount > 0) {
    const more = document.createElement("div");
    more.textContent = `+${moreBrandsCount} more`;
    more.classList.add("more-toggle");
    more.style.cursor = "pointer";
    more.style.color = "#ff3f6c";
    more.style.padding = "1rem";

    more.addEventListener("click", function () {
      if (isMoreVisible) {
        document.querySelectorAll(".products__filters--brand-option").forEach((item, index) => {
          if (index >= maxBrands) {
            item.style.display = "none";
          }
        });
        more.textContent = `+${moreBrandsCount} more`; 
        isMoreVisible = false; 
      } else {
        document.querySelectorAll(".products__filters--brand-option").forEach(item => {
          item.style.display = "block";
        });
        more.textContent = `Show less`; 
        isMoreVisible = true; 
      }
    });

    brandFilters.appendChild(more);
  }
}

sortAscending.addEventListener("click",()=>{
  products.sort((a, b) => a.price - b.price); 
  sortText.innerHTML=`
  Sort By :Price Low to High
  <img src="./assets/accordian.png" alt="accordian">
  `;
  dispayProducts(products);  

});
sortDescending.addEventListener("click",()=>{
  products.sort((b, a) => a.price - b.price); 
  sortText.innerHTML=`
  Sort By :Price High to Low
  <img src="./assets/accordian.png" alt="accordian">
  `;
 
  dispayProducts(products);  
});

brandSearch.addEventListener("input", () => {
  const ans = brandSearch.value.trim().toLowerCase();
  console.log(ans)
  const result = uniqueBrands.filter(brand => brand.trim().toLowerCase().includes(ans));  
  showBrand(result);
});

mobileSort.addEventListener("click",()=>{
  sortMenu.style.display="block";
 
})
mobileAscending.addEventListener("click",(e)=>{
  sortMenu.style.display="none";
  products.sort((a, b) => a.price - b.price); 
  dispayProducts(products); 
  e.stopPropagation();


})
mobileDescending.addEventListener("click",(e)=>{
  sortMenu.style.display="none";
  products.sort((b,a) => a.price - b.price); 
  dispayProducts(products);  
  e.stopPropagation();

})
document.addEventListener("click",(e)=>{
  if(!mobileSort.contains(e.target) ){
    sortMenu.style.display="none";
  }
})

mobileFilter.addEventListener("click",()=>{
  productFilter.style.display="block";
  productCards.style.display="none";

})

filterApply.addEventListener("click",(e)=>{
  productFilter.style.display="none";
  productCards.style.display="block";

})
filterClose.addEventListener("click",(e)=>{
  productFilter.style.display="none";
  productCards.style.display="block";

})