import axios from "axios";
import { patchDataToServer } from "./HandlePatch";

export async function postData(data) {
  const url = `${process.env.REACT_APP_RENDER_SERVER}/postPizza`;

  try {
    // Check if a pizza with the provided identifier already exists
    const existingPizza = await axios.get(`${process.env.REACT_APP_RENDER_SERVER}/getPizzaByFilter?identify=${data.identify}`);

    if (existingPizza.data.length > 0) {
      // If pizza exists, update its quantity
      await patchDataToServer({_id:existingPizza.data[0]._id, quantity: existingPizza.data[0].quantity + 1 })
     
      console.log("Pizza quantity updated successfully");
      return "Pizza quantity updated successfully";
    } else {
      // If pizza doesn't exist, create a new one
      const response = await axios.post(url, data);
      console.log("New pizza created successfully:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("There was a problem posting/updating the data:", error);
    throw new Error("Failed to post/update data to the server");
  }
}
