const urlParams = new URLSearchParams(window.location.search);
const sub_url = urlParams.get('view');
const final_url = '/article.html?view='+sub_url;
 function bring_post(post_url) {
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
                if (page.url == post_url) {
                    document.getElementById('title').innerText = page.title;
                    if(page.image_url == "N/A"){
                        document.getElementById("img").src = "./favicon.ico"
                    }
                    if(page.content == "loading..."){
                        document.getElementById('content').innerText = page.description;
                    }
                    else{
                        document.getElementById('content').innerText = page.content;
                    }
                    console.table(page);
                }
                else{
                    console.log(sub_url,post_url)
                }
            })
        }
    }
    xhr.send()
}
bring_post(final_url)
