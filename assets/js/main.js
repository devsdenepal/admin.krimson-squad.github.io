const init_title = document.title;
function change_title(text){
  document.title = text
}
function bring_posts() {
  var xhr = new XMLHttpRequest();
  var url = "./data/json/post.json"; // Replace with your API endpoint
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = xhr.response;
      const result = response.result;
      var pages = result
      // Loop through the pages and display the information in the div
      pages.forEach(function (page) {
        if (page.featured == "true") {
          console.table(page);
          document.getElementById("highlighted_topic").innerText = page.title;
          document.getElementById("highlighted_content").innerText = page.description;
          document.getElementById("highlighted_banner").src = page.image_url;
        }
        else {
          var blog_container=document.getElementById("blog_container");
          blog_container.innerHTML+=`
          <div class="p-4 lg:w-1/3">
          <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">${page.tag}</h2>
            <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">${page.title}</h1>
            <p class="leading-relaxed mb-3">${page.description}</p>
            <a class="text-indigo-400 inline-flex items-center" href="${page.url}" target="_blank">Read
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
          `
          // console.warn("no page is featured");
         }
      });
      // console.log(result.pages)
      // console.table(result)
      // 
    } else {
      console.error("XHR request failed with status code:", xhr.status);
    }
  };
  xhr.send();
}

setTimeout(change_title,1000,"loading...");
setTimeout(change_title,3000,init_title)