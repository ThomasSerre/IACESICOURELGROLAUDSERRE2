import MongoClient from "C:\Users\matth\Desktop\IA_CESI\Nouveau dossier\classificationImages\node_modules\mongodb";

var database= {};
 
function connectToBase () {
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
		if (err) {
			throw err;
		} else {
			database = db;
			console.log("successfully connected to the database");
		}
	});
}



$("#showhisto").click(function () {	

	connectToBase();

	database.collection("iacesi").find().toArray(function (error, results) {
        if (error) throw error;

        results.forEach(function(i, obj) {
            console.log(
                "date : " + obj.date + ";\n",           
				"nom : " + obj.name + ";\n",                  
				"taille : " + obj.taille.toString() + "Mo;\n",
				"Animaux : " + obj.predict.animaux.toString() + ";\n",
				"Humains : " + obj.predict.humains.toString() + ";\n",
				"Perso : " + obj.predict.perso.toString() + ";\n",
				"Plantes : " + obj.predict.plantes.toString() + ";\n",
				"Vehicules : " + obj.predict.vehicules.toString() + ";\n",
				"Prédit : " + obj.predicted + ";\n"
            );
        });
	});
	
	database.close();
});


$("#supphisto").click(function (id) {	

	connectToBase();

	database.collection("aicesi").remove(id, null, function(error, result) {
		if (error) throw error;   
	});

	database.close();

});

function addToHisto(object) {	

	connectToBase();

	database.collection("aicesi").insert(object, null, function(error, result) {
		if (error) throw error;   
	});
	
	database.close();


};
