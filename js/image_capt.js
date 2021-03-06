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
    });
    reader_url.readAsDataURL(file)

    // Read image data as binary
    const reader_bin = new FileReader();
    reader_bin.onload = () => image_bin = reader_bin.result;
    reader_bin.readAsBinaryString(file);
})

submit_btn.addEventListener("click", () => {
  // Set up AJAX
  const xhttps = new XMLHttpRequest();
  xhttps.onload = () => {
    console.log("File sent !");
  }

  xhttp.open("POST", "https://alhazimi.herokuapp.com/image_capt/", true);
  xhttp.send(image_bin)

})