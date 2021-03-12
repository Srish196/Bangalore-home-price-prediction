function getBathValue(){
    var uiBathroom=document.getElementsByName("uiBathroom");
    for (var i in uiBathroom) {
        if (uiBathroom [i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}
function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK){
        if (uiBHK[i].checked){
            return  parseInt(i)+1;
        }
    }
    return -1;
}
function onClickedEstimatedPrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uisqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uilocation");
    var estPrice = document.getElementById("uiEstimatedPrice");


   
    $.ajax({
        url: 'http://127.0.0.1:5000/predict_home_price',
        type: 'post',
        data: {
            total_sqft:parseFloat(sqft.value),
            bhk: bhk,
            bath: bathrooms,
            location: location.value
        },
        headers: {
            crossDomain: true,
            contentType: 'application/json; charset=utf-8'  
        },
        dataType: 'json',
        success: function (data) {
            estPrice.innerHTML= "</h2>" + data.estimated_price.toString() + "</h2>";
        },
        error: function (err) {
            console.log("error");
            console.log(err);
            alert(err);
            
        }
    });


}
function onPageLoad(){
    console.log("document loaded");
    var url="http://127.0.0.1:5000/get_location_names";
    $.get(url,function(data,status){
        if(data){
            var locations = data.locations;
            $('#uilocation').empty();
            for (var i in locations){
                var opt=new Option(locations[i]);
                $('#uilocation').append(opt);
            }
         }
    });
}
window.onload=onPageLoad;