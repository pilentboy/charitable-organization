import axios from "axios";

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
    console.log(res, "user profile info");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default handleGetUserProfileInfo;
