import axios from 'axios';
export async function patchDataToServer(data) {
 
  
    try {
    
      let res=  await axios.patch(`${process.env.REACT_APP_RENDER_SERVER}/updatePizza`,data);
      
      return res
    } catch (error) {
      console.log('There was a problem patching the data:', error.message);
      throw new Error('Failed to patch data to the server');
    }
  }
  
  