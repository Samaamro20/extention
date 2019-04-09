let webbrands = [];
let brands=[];
let resp=[];
let productNode;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://wellspentethecal.herokuapp.com/api/brands`;


var linksList = document.querySelectorAll("[id^=product-]");
linksList.forEach(function(product) {
  const node = product.childNodes[0];
  const label = node.getAttribute("aria-label");
  let brand = label.split(" ")[0];
  webbrands.push(brand);
  productNode=product;
});


 // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.text())
  .then(contents => {
    resp = JSON.parse(contents);
    brands = resp;
    const finalResult = brands.map((data)=>{
    const result =   webbrands.filter((wellspentBrand)=>{
        return wellspentBrand===data.BrandName
      })
      return result;
    });
    const filteredBrand = Promise.all(finalResult)
    .then((res)=>{
        res.map(brand => {
          if(brand.length > 0){
          linksList.forEach(function(product) {
            const node = product.childNodes[0];
            const label = node.getAttribute("aria-label");
            let webbrand = label.split(" ")[0];
            if(brand[0] === webbrand){
                product.classList.toggle("wellspent");
                console.log("sss",resp[0]["OverallScoreColour"][0]);
                product.style["border-color"] = resp[0]["OverallScoreColour"][0];

                var button = document.createElement("button");
                button.innerText = "More information";
                product.appendChild(button);
            }
          });

      }})
    });
  })
  .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
