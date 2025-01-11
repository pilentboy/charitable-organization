import axios from "axios";
// Importing the axios library for making HTTP requests

const handleGetUserProfileInfo = async (accessToken: string) => {
  try {
    const res = await axios(
      "https://nazronlinetest.liara.run/user/profile/personal-info/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // Making a GET request to the user profile info endpoint with authorization header

    console.log(res, "user profile info");
    // Logging the response with a custom message

    return res;
    // Returning the response
  } catch (error) {
    console.log(error);
    // Logging any errors that occur during the request
  }
};

export default handleGetUserProfileInfo;
// Exporting the handleGetUserProfileInfo function as the default export
