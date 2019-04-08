let webbrands = [];
var linksList = document.querySelectorAll("[id^=product-]");
linksList.forEach(function(product) {
  console.log(product);
  const node = product.childNodes[0];
  console.log("node", node);
  const label = node.getAttribute("aria-label");
  console.log("label", label);
  let brand = label.split(" ")[0];
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `https://wellspentethecal.herokuapp.com/api/brand/${brand}`; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      const resp = JSON.parse(contents);
      console.log("resp", resp[0]["Overall Score hexa"][0]);
      product.classList.toggle("wellspent");
      product.style["border-color"] = resp[0]["Overall Score hexa"][0];

      var button = document.createElement("button");
      button.innerText = "More information";
      // title.appendchild(document.createTextNode("more"));
      product.appendchild(button);
    })
    .catch(() =>
      console.log("Can’t access " + url + " response. Blocked by browser?")
    );
});
