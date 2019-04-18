let webbrands = [];
let brands=[];
let resp=[];
let productNode;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://wellspent-ethical.herokuapp.com/api/brands`;


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
    const finalResult = brands.result.map((data)=>{
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
                product.style["border-color"] =resp.colourMap[resp.result[index].OverallScore];
                product.classList.add('product');
                var button = document.createElement("button");
                button.innerText = "More information";
                button.setAttribute("id", "btn");
                product.appendChild(button);

                var span =document.createElement("span");
                var myModal =document.createElement("div");

                if(button){
                button.onclick = function() {
                  myModal.classList.add('myModal');
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

                  //LaborScore
                  var LS=document.createElement('div');
                  LS.classList.add('ls');

                  var LaborScore=document.createElement('span');
                  LaborScore.classList.add('score');
                  LaborScore.innerText=resp.result[index].LaborScore;
                  LaborScore.style["background-color"] =resp.colourMap[resp.result[index].LaborScore];


                  var LaborScoret=document.createElement('span');
                  LaborScoret.classList.add('scoret');
                  LaborScoret.innerText=" LaborScore "

                  //TransparencyScore
                  var TS=document.createElement('div');
                  TS.classList.add('ls');

                  var TransparencyScore=document.createElement('span');
                  TransparencyScore.classList.add('score');
                  TransparencyScore.innerText=resp.result[index].TransparencyScore;
                  TransparencyScore.style["background-color"] =resp.colourMap[resp.result[index].LaborScore];


                  var TransparencyScoret=document.createElement('span');
                  TransparencyScoret.classList.add('scoret');
                  TransparencyScoret.innerText=" TransparencyScore "


                  //EnvironmentScore
                  var ES=document.createElement('div');
                  ES.classList.add('es');

                  var EnvironmentScore=document.createElement('span');
                  EnvironmentScore.classList.add('score');
                  EnvironmentScore.innerText=resp.result[index].EnvironmentScore;
                  EnvironmentScore.style["background-color"] =resp.colourMap[resp.result[index].EnvironmentScore];


                  var EnvironmentScoret=document.createElement('span');
                  EnvironmentScoret.classList.add('scoret');
                  EnvironmentScoret.innerText=" EnvironmentScore " ;

                  //OverallScore
                  var OS=document.createElement('div');
                  OS.classList.add('os');

                  var OverallScore=document.createElement('span');
                  OverallScore.classList.add('scoreo');
                  OverallScore.innerText=resp.result[index].OverallScore;
                  OverallScore.style["background-color"] =resp.colourMap[resp.result[index].OverallScore];


                  var OverallScoret=document.createElement('span');
                  OverallScoret.classList.add('scoret');
                  OverallScoret.innerText= " OverallScore ";

                  //Link Page
                  var brandpagelink ="https://wellspent-ethical.herokuapp.com/#/Brand/"+brand[0];
                  var brandpage=document.createElement('a');
                  brandpage.setAttribute("href",brandpagelink);
                  brandpage.setAttribute("target","_blank")
                  brandpage.innerText="Click here for more detail";
                  brandpage.classList.add('brandpage');


                  myModal.appendChild(content);
                  content.appendChild(span);
                  content.appendChild(score);
                  content.appendChild(header);

                  OS.appendChild(OverallScore);
                  OS.appendChild(OverallScoret);
                  ES.appendChild(EnvironmentScore);
                  ES.appendChild(EnvironmentScoret);
                  LS.appendChild(LaborScore);
                  LS.appendChild(LaborScoret);
                  TS.appendChild(TransparencyScore);
                  TS.appendChild(TransparencyScoret);


                  content.appendChild(OS);
                  content.appendChild(ES);
                  content.appendChild(LS);
                  content.appendChild(TS);

                  content.appendChild(brandpage);

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
            }
          });
      }})
    });
  })
  .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
