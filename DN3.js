$("input.inputfile").change(function(e) {

    console.log("Image selected");

    /*
    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
        

        var file = e.originalEvent.srcElement.files[i];
        
        var img = document.getElementById("imgIn");
        var reader = new FileReader();
        reader.onloadend = function() {
             img.src = reader.result;
        }
        reader.readAsDataURL(file);
    }

    //context.drawImage(image, 0, 0,image.width,image.height,0,0,w,h);
    */

    let img = new Image();
    let ctx = document.getElementById("cv").getContext("2d");

    img.onload = function() {
        console.log(img.height)
        console.log(img.width)

        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = URL.createObjectURL(e.target.files[0]);
    document.getElementById("cv").style.display = "block";
    document.getElementById("cv").style.width = "25%";
    document.getElementById("cv").style.height = "25%";
    console.log("Finished");
    sel = true;
    document.getElementById("msg").setAttribute("placeholder", "Type your secrets here...")



});

var sel = false;

var slide = 0;

$("input.slider").change(function(e) {

    slide = $("input.slider").val();
    console.log(slide);

});


function showPop() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function encode() {
    console.log("Writing data")

    let canvas = "cv";
    let text = document.getElementById("msg").value;
    let pass = document.getElementById("pass").value;

    console.log(canvas, text, pass, slide);

    if(text === "") {
        document.getElementById("msg").setAttribute("placeholder", "You didn't write anything to encode.");
        return;
    }

    if(!sel) {
        document.getElementById("msg").value = "";
        document.getElementById("msg").setAttribute("placeholder", "Encoding failed. No image selected.");
        return;
    }

    if(writeMsgToCanvas(canvas, text, pass, slide) === null) {
        console.log("Failed to write.");
        document.getElementById("msg").setAttribute("placeholder", "Encoding failed. The message is probably too long.");
        return;
    }
    console.log("Writing successful.");
    document.getElementById("msg").setAttribute("placeholder", "Encoded successfully. You can now save the image by\nright clicking on it and selecting 'Save Image As...'");
    document.getElementById("msg").value = "";

}

function decode() {

    console.log("Decoding data")

    let canvas = "cv";
    let pass = document.getElementById("pass").value;

    let ret = readMsgFromCanvas(canvas, pass, slide);

    if(ret === null) {
        console.log("Failed to read.");
        document.getElementById("msg").setAttribute("placeholder", "Failed to decode.");
        return;
    }
    if(ret === "") {
        document.getElementById("msg").setAttribute("placeholder", "No text was encoded.");
    }

    document.getElementById("msg").value = ret;
    console.log("Reading successful.");
    document.getElementById("pass").value = "";
    
}

function make_base() {


}