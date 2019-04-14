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
        res.map((brand,index, array) => {
          if(brand.length > 0){
          linksList.forEach(function(product) {
            const node = product.childNodes[0];
            const label = node.getAttribute("aria-label");
            let webbrand = label.split(" ")[0];
            if(brand[0] === webbrand){
                // product.classList.toggle("wellspent");
                product.style["border-color"] =resp[index]["OverallScoreColour"][0];
                product.style["border-width"] ='3px';
                product.style["border-style"] ='solid';
                product.style["padding"] ='5px';
                var button = document.createElement("button");
                button.innerText = "More information";
                button.style["border-radius"]= '3px';
                button.style["font-size"]= '12pt';
                button.style["margin-left"]= '25%';
                button.setAttribute("id", "btn");
                product.appendChild(button);

                /////////////////////
                // console.log("sama",button);
                var span =document.createElement("span");
                var myModal =document.createElement("div");

                if(button){
                button.onclick = function() {
                  myModal.classList.add('popup');
                  myModal.style["position"]=" fixed";
                  myModal.style["z-index"]=" 1";
                  myModal.style["left"]=" 0";
                  myModal.style["top"]=" 0";
                  myModal.style["width"]="100%";
                  myModal.style["height"]="100%";
                  myModal.style["background-color"]="#F1F1F1";
                  myModal.style["background-color"]=" rgba(0,0,0,0.4)";
                  myModal.style["-webkit-animation-name"]=" fadeIn";
                  myModal.style["-webkit-animation-duration"]=" 0.4s";
                  myModal.style["animation-name"]="fadeIn";
                  myModal.style["animation-duration"]="0.4s";
                  myModal.setAttribute("id", "myModal");
                  var content =document.createElement("div");
                  content.classList.add('popup-content');
                  var header =document.createElement("div");
                  header.classList.add('popup-header');
                  span.classList.add('end');
                  span.innerText="X";
                  var score=document.createElement('h1');
                  score.innerText="Brand Scores";
                  score.classList.add('title');
                  var LaborScore=document.createElement('h2');
                  LaborScore.classList.add('score');
                  console.log("ssss",resp[index]);
                  LaborScore.innerText="LaborScore: " + resp[index].LaborScore;
                  var EnvironmentScore=document.createElement('h3');
                  EnvironmentScore.classList.add('score');
                  EnvironmentScore.innerText=" EnvironmentScore: " + resp[index].EnvironmentScore;
                  var OverallScore=document.createElement('h4');
                  OverallScore.classList.add('score');
                  OverallScore.innerText= " OverallScore: " + resp[index].OverallScore;

                  myModal.appendChild(content);
                  content.appendChild(span);
                  content.appendChild(score);
                  content.appendChild(header);
                  content.appendChild(LaborScore);
                  content.appendChild(EnvironmentScore);
                  content.appendChild(OverallScore);

                  document.body.appendChild(myModal);
                  myModal.style.display = "block";
                    }}
                span.onclick = function() {
                      myModal.style.display = "none";
                    }
                window.onclick = function(event) {
                      if (event.target == myModal) {
                      myModal.style.display = "none";
                      }
                    }

                //////////////////////////

            }
          });
      }})
    });
  })
  .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
