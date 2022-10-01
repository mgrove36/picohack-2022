const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.panic = functions.https.onRequest((request, response) => {
  functions.logger.info("Panic has been issued", {structuredData: true});
  //Code to make a panic goes here
  db.collection("panic-events").add({
	patient: request.body.patient,
	resolved: false,
	timestamp: new Date(),
  });
  response.send(`patient: ${request.body.patient}`);
});

exports.userCreated = functions.auth.user().onCreate((user) => {
	return admin.auth().setCustomUserClaims(user.uid, {
		admin: false,
        role: undefined,
	});
});
// Redundant, I think
// exports.roleDefined = functions.https.onCall((data, context) => {
// 	if (data.role == "firstAider") {
// 		admin.auth().setCustomUserClaims(user.uid, {
// 			role: "firstAider",
// 		});
// 	} else {
// 		return db.collection("users").doc(user.uid).set({
// 			role: "patient",
// 		});
// 	}
// });

exports.firstAiderCreated = functions.firestore.document("first-aiders/{userId}/")
	.onCreate(async (snap, context) => {
		admin.auth().setCustomUserClaims(snap.id, {
			role: "firstAider",
		});
	});

exports.firstAiderCreated = functions.firestore.document("patients/{userId}/")
.onCreate(async (snap, context) => {
	admin.auth().setCustomUserClaims(snap.id, {
		role: "patient",
	});
});
//patient firstAider21