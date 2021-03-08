const input_file = document.getElementById("image-file");
const image_preview = document.getElementById("uploaded-image")
const img_name = document.getElementById("image-name");
const upload_btn = document.getElementById("upload-button");
const submit_btn = document.getElementById("submit-button");

var image_bin;

// Upload button click
upload_btn.addEventListener("click", (e) => {
  input_file.click()
});


// After the image is uploaded
input_file.addEventListener("change", (e) => {
    
  // Get file object
  for (const file of input_file.files) {

    // Read image info
    const name = file.name ? file.name : "NOT SUPPORTED";
    const type = file.type ? file.type : "NOT SUPPORTED";
    const size = file.size ? file.size : "NOT SUPPORTED";
    console.log(name, type, size);

    // Show the image name (cut long chars)
    img_name.innerText = file.name.length <= 40 ? 
                         file.name : "..." + file.name.slice(20, file.name.length);

    // Read image data url
    const reader_url = new FileReader();
    reader_url.addEventListener("load", (event) => {
      console.log("Image Loaded")
      
      // Unhidden the image
      if (image_preview.hasAttribute("hidden")) {
        image_preview.removeAttribute("hidden");
      }
      // Preview the image
      image_preview.src = event.target.result;
      image_bin = event.target.result;
    });
    reader_url.readAsDataURL(file)

  }
})


function submit(e) {

  // Prevent default submit


  if (image_bin) {
    // Set up JSON
    let bin = image_bin.split(",")[1];

    let data = {"image": bin};
    data = JSON.stringify(data)

    // Set up AJAX
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
      console.log("File sent !");
    }

    xhttp.open("POST", "http://127.0.0.1:5000/img_capt/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data)
  }
  else alert("No image found");
}

submit_btn.addEventListener("click", submit);