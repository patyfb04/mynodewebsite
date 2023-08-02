
// (function() {
//   "use strict";

//   const on = (type, el, listener, all = false) => {
//     let selectEl = document.querySelectorAll(el)
//     if (selectEl) {
//       if (all) {
//         selectEl.forEach(e => e.addEventListener(type, listener))
//       } else {
//         selectEl.addEventListener(type, listener)
//       }
//     }
//   }


//   const onscroll = (el, listener) => {
//     el.addEventListener('scroll', listener)
//   }


//   window.addEventListener('load', () => {
//     let portfolioContainer = document.querySelector('#portfolio-grid');
//     if (portfolioContainer) {
//       let portfolioIsotope = new Isotope(portfolioContainer, {
//         itemSelector: '.item',
//       });

//       let portfolioFilters = document.querySelectorAll('#filters a');

//       on('click', '#filters a', function(e) {
//         e.preventDefault();
//         portfolioFilters.forEach(function(el) {
//           el.classList.remove('active');
//         });
//         this.classList.add('active');

//         portfolioIsotope.arrange({
//           filter: this.getAttribute('data-filter')
//         });
//         portfolioIsotope.on('arrangeComplete', function() {
//           AOS.refresh()
//         });
//       }, true);
//     }

//   });


//   window.addEventListener('load', () => {

//     var grid =  document.getElementById("portfolio-grid");
//     var params = getUrlParameter("art");
//     var type = getUrlParameter("type");

//     var data_json =[];
    
//     switch(type)
//     {
//       case "digital":
//      //   document.getElementById("link_d").className = "active";
//         document.getElementById("dlink_d").className = "col-lg-4 active";
//         break;
//       case "traditional":
//       //  document.getElementById("link_t").className = "active";
//         document.getElementById("tlink_d").className = "col-lg-4 active";
//           break;
//     }

//     loadJSON(function(response) {
//       data_json = JSON.parse(response);
     
//        if(params) // if art detail page
//        {
//           var title = document.getElementById("title");
//           var title2 = document.getElementById("title2");
//           var description = document.getElementById("description");
//           var description_total = document.getElementById("description_total");
//           var subtype = document.getElementById("subtype");
//           var img = document.getElementById("img");
//           var resources = document.getElementById("resources");
//           var pdf = document.getElementById("pdf");
    
//           var item = searchArt(data_json, params)[0]
    
//           title.innerHTML = item.art.title;
//           title2.innerHTML = item.art.title;
//           description.innerHTML = item.art.description;
//           description_total.innerHTML = item.art.description_total;
//           subtype.innerHTML = item.art.subtype;
//           img.src = "/assets/img/"+item.art.img +"-big.jpg";
        


//           item.art.resources.forEach(element => {
//             var li = document. createElement("li");
//             li. appendChild(document. createTextNode(element));
//             resources. appendChild(li);
//           });
  
//         } 
  
//       });

//     AOS.init({
//       duration: 1000,
//       easing: 'ease-in-out',
//       once: true,
//       mirror: false
//     })
//   });



// // helpers ----------------------

// function loadJSON(callback) 
// {   
//   var xobj = new XMLHttpRequest();
//       xobj.overrideMimeType("application/json");
//   xobj.open('GET', 'data.json', true); 
//   xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//           callback(xobj.responseText);
//         }
//   };
//   xobj.send(null);  
// }

// function getUrlParameter(name)
//  {
//   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//   var results = regex.exec(location.search);
//   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

// function searchArt(array, search)
// {
// return array.filter((element) => element.name == search);
// }


// function createElement(element) {
//   var grid =  document.getElementById("portfolio-grid");

//   var itemDiv = document.createElement("div")
//   itemDiv.className = "item "+  element.art.style +" col-sm-6 col-md-4 col-lg-4 mb-4";

//   var link = document.createElement("a")
//   link.setAttribute("href", "art.html?art=" + element.name);
//   link.setAttribute("class","item-wrap fancybox");


//   var itemLinkDiv = document.createElement("div");
//   itemLinkDiv.className = "work-info";
  
//   var itemLinkH3 = document.createElement("H3");
//   var itemLinkSpan = document.createElement("span");

//   itemLinkH3.innerHTML = element.art.title;
//   itemLinkSpan.innerHTML = element.art.subtype;

//   itemLinkDiv.appendChild(itemLinkH3);
//   itemLinkDiv.appendChild(itemLinkSpan);

//   var itemLinkImg = document.createElement("div");
//   itemLinkImg.className = "img-fluid";
//   itemLinkImg.setAttribute("src","/assets/img/"+element.art.img +"-small.jpg");

//   link.appendChild(itemLinkDiv)
//   link.appendChild(itemLinkImg)

//   itemDiv.appendChild(link);
//   grid.appendChild(itemDiv);
// }

// })()