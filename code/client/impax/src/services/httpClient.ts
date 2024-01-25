import { updatePlayersDetails } from "../states/updateAppStates";
import { Players, SessionToBeUploaded } from "../types";
import { BASE_URL} from "../config/config";

export const uploadSession = async () => {
  if (localStorage.getItem("sessionDetails") === null) return;
  else {
    // Retrieve the array of objects from local storage
    const sessionsToBeUploaded: SessionToBeUploaded[] = JSON.parse(
      localStorage.getItem("sessionDetails") as string
    );

    if (sessionsToBeUploaded.length === 0) return;

    // Iterate through each object in the array
    sessionsToBeUploaded.forEach(function (object: SessionToBeUploaded) {
      // Send the object to the server
      sendToServer(object);

      // Remove the object from the array in local storage
      const index = sessionsToBeUploaded.indexOf(object);
      if (index > -1) {
        sessionsToBeUploaded.splice(index, 1);
      }
    });

    // Update the modified array in local storage
    localStorage.setItem(
      "sessionDetails",
      JSON.stringify(sessionsToBeUploaded)
    );
  }
};

function sendToServer(object: SessionToBeUploaded) {
  console.log(object);
}

export const getPlayers = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const playersResponse = await fetch(`${BASE_URL}/manager/getTeamPlayers`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const playersData: Players = await playersResponse.json();
    console.log(playersData);
    updatePlayersDetails(playersData);
  } catch (error) {
    console.log(error);
  }
};
