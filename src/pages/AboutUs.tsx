import { useEffect, useState } from "react"; // Importing React hooks: useEffect for side effects and useState for managing state.
import handleGetAboutUs from "../utils/api/content/handleGetAboutUs"; // Importing the function to fetch "About Us" data from the API.

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState<any>(); // Declaring state for holding the fetched "About Us" data. Initially, it's undefined.

  useEffect(() => {
    // Using useEffect to fetch the data when the component mounts.
    const getData = async () => {
      const req = await handleGetAboutUs(); // Calling the API function to get the "About Us" content.
      console.log(req.data); // Logging the response data for debugging purposes.
      setAboutUs(req.data); // Setting the fetched data into state.
    };
    getData(); // Invoking the getData function to fetch the data.

    document.title = "درباره ما"; // Setting the document title when the component is mounted. This changes the page title to "درباره ما".
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

  return (
    <div className="w-full flex items-center flex-wrap gap-2">
      {aboutUs // Conditional rendering: If aboutUs data exists, map through it and display each item.
        ? aboutUs.map(
            (
              content: any // Iterating over the "About Us" data.
            ) => (
              <div key={content.id} className="flex flex-col ">
                <span>{content.title}</span>
                {/* Displaying the title of each "About Us" section. */}
                <p className="text-justify">{content.content}</p>
                {/* Displaying the content of each "About Us" section. */}
              </div>
            )
          )
        : "در حال دریافت اطلاعات"}
      {/* If aboutUs is undefined (loading state), display a loading message. */}
    </div>
  );
};

export default AboutUs; // Exporting the AboutUs component to be used elsewhere in the app.
