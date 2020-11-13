$("#showhisto").click(function () {	
});


$("#supphisto").click(function (id) {	


});

var obje = {};

let imageLoaded = false;
$("#image-selector").change(function () {
   imageLoaded = false;
   let reader = new FileReader();
   reader.onload = function () {
      let dataURL = reader.result;
      $("#selected-image").attr("src", dataURL);
      $("#prediction-list").empty();
      imageLoaded = true;
   }
   
   let file = $("#image-selector").prop('files')[0];
   reader.readAsDataURL(file);
});

let model;
let modelLoaded = false;
$( document ).ready(async function () {
   modelLoaded = false;
   $('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadGraphModel('model/model.json');
    console.log( "Model loaded." );
   $('.progress-bar').hide();
   modelLoaded = true;
});


 $("#predict-button").click(async function () {
	if (!modelLoaded) { alert("The model must be loaded first"); return; }
	if (!imageLoaded) { alert("Please select an image first"); return; }
	
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	console.log( "Loading image..." );
	let tensor = tf.browser.fromPixels(image, 3)
		.resizeNearestNeighbor([224, 224]) // change the image size
		.expandDims()
		.toFloat()
		.reverse(-1); // RGB -> BGR
	let predictions = await model.predict(tensor).data();
	console.log(predictions);

	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] // we are selecting the value from the obj
			};
		}).sort(function (a, b) {
			return b.probability - a.probability;
		}).slice(0, 5);

	$("#prediction-list").empty();

	var predict = "";
	var ani = 0;
	var hum = 0;
	var per = 0;
	var pla = 0;
	var veh = 0;
	var max = 0;

	top5.forEach(function (p) {
	 if (p.probability > max) {
			max = p.probability;
			predict = p.className;
		}
		switch (p.classeNamme) {
			case "Animaux": ani = p.probability;
							break;
			case "Humains": hum = p.probability;
							break;
			case "Personnages Fictifs": per = p.probability;
							break;
			case "Plantes": pla = p.probability;
							break;
			case "Véhicules": veh = p.probability;
							break;
			default : break;
		}
		$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
	});

	obje = {
		date : Date(),
		predict : {
			animaux : ani,
			humains : hum,
			perso : per,
			plantes : pla,
			vehicules : veh
		},
		predicted : predict
	}
	
	axios.post("http://localhost:3000/predict", obje);
});
 


