import { sessionToBeUploaded } from "../types";

export const uploadSession = async () => {
if(localStorage.getItem("sessionDetails") === null) return;
else{
    // Retrieve the array of objects from local storage
const sessionDetails = JSON.parse(localStorage.getItem("sessionDetails") as string);

// Iterate through each object in the array
sessionDetails.forEach(function(object:sessionToBeUploaded) {
    // Send the object to the server
    sendToServer(object);

    // Remove the object from the array in local storage
    const index = sessionDetails.indexOf(object);
    if (index > -1) {
        sessionDetails.splice(index, 1);
    }
});

// Update the modified array in local storage
localStorage.setItem("sessionDetails", JSON.stringify(sessionDetails));
   
}


  
}

function sendToServer(object:sessionToBeUploaded) {
    console.log(object);
  }