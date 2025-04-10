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
const error=document.querySelector(".products__cards-error")
const filterSummary=document.querySelector(".products__filters--summary")


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

let products=[];
fetch('https://fakestoreapi.in/api/products')
  .then(response => {return response.json();})
  .then(data => {
    products = data.products;
    const container = document.getElementById('productContainer');

    const uniqueBrands = [];
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

    const maxBrands=5;
    uniqueBrands.forEach((brand,i) => {
        const option = document.createElement("div");
        option.className = "products__filters--brand-option";
        option.innerHTML = `
          <input type="checkbox" name="brand" value="${brand}">
          <label>${brand}</label>
        `;
        if(i>=maxBrands)option.style.display="none";
        brandFilters.appendChild(option);
      });
      if (uniqueBrands.length > maxBrands) {
        const more = document.createElement("div");
        more.textContent = `+${uniqueBrands.length - maxBrands} more`;
        more.style.cursor = "pointer";
        more.style.color="#ff3f6c"
        more.style.padding="1rem"
      
        more.addEventListener("click", function () {
          document.querySelectorAll(".products__filters--brand-option").forEach(item => {item.style.display = "block";});
          more.remove(); 
        });
      
        brandFilters.appendChild(more); 
      }

  })
  .catch(error => {
    console.error('Problem', error);
  });

search.addEventListener("input",function(){
    const ans=search.value.trim().toLowerCase();
    if(ans.length>=3){
    const result=products.filter(product=>product.brand.toLowerCase().includes(ans) || product.title.toLowerCase().includes(ans)  );
    dispayProducts(result);}
})

function dispayProducts(products){
    const container=document.getElementById("productContainer");
    container.innerHTML=" ";

    if (products.length === 0) {
        error.innerHTML = `No Products Found`;
        return;
      }

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

}

const minGap = 100;

function updateSlider() {
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
}

sliderMin.addEventListener("input", updateSlider);
sliderMax.addEventListener("input", updateSlider);

updateSlider();

brandFilters.addEventListener("input",checkFilter)
brandFilters.addEventListener("input", checkFilter);

function checkFilter() {
  const selectedInputs = Array.from(document.querySelectorAll('input[name="brand"]:checked'));

  const selectedBrands = selectedInputs.map(input => input.value.toLowerCase());

  filterSummary.innerHTML = "";

  selectedInputs.forEach(input => {
    const brand = input.value.toLowerCase();

    const item = document.createElement("div");
    item.className = "products__filters--summary-item";
    item.innerHTML = `
      ${brand.charAt(0).toUpperCase() + brand.slice(1)}
      <img src="./assets/cross.png" alt="cross" style="cursor:pointer;">
    `;

    item.querySelector("img").addEventListener("click", () => {
      input.checked = false;
      checkFilter();
    });

    filterSummary.appendChild(item);
  });

  if (selectedBrands.length === 0) {
    dispayProducts(products);
    return;
  }

  const filtered = products.filter(product =>
    selectedBrands.includes(product.brand.toLowerCase())
  );

  dispayProducts(filtered);
}
