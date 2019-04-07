window.onload=function(){
  let webbrands=[];
   var linksList = document.querySelectorAll('[id^=product-]');
      linksList.forEach(function(header) {
      let brand=header.textContent.split(" ")[0];
      if(brand==='ASOS'){
        webbrands.push(brand);
        console.log('header',header);
        header.toggle("wellspent")
        header.style["border-color"] = "red";
      }
    });
    console.log("Brands",webbrands);
  const url=`https://wellspentethecal.herokuapp.com/api/brand/ASOS`;
   fetch(url)
      .then(function(response) {
        // return response.json();
        console.log("resss",response.json());
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
    }
