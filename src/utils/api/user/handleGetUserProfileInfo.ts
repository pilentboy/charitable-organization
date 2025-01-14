import axios from "axios";
// Importing the axios library for making HTTP requests

const handleGetUserProfileInfo = async (accessToken: any) => {
  try {
    const res = await axios(
      "https://nazronline.ir/api/user/profile/personal-info/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // Making a GET request to the user profile info endpoint with authorization header


    return res;
    // Returning the response
  } catch (error) {
    console.log(error);
    // Logging any errors that occur during the request
  }
};

export default handleGetUserProfileInfo;
// Exporting the handleGetUserProfileInfo function as the default export
