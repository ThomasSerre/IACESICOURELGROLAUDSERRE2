import MongoClient from "C:\Users\matth\Desktop\IA_CESI\Nouveau dossier\classificationImages\node_modules\mongodb";


 async function main () {
    const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

    const iacesi = new MongoClient(uri);

    try {
        await iacesi.connect();
    } catch {
        console.error(e);
    }

    



}