import { useEffect, useState } from "react"; // Importing React hooks: useEffect for side effects and useState for managing state.
import handleGetContactUs from "../utils/api/content/handleGetContactUs"; // Importing the function to fetch the "Contact Us" data from the API.

const ContactUs = () => {
  const [contactUs, setContactUs] = useState<any>(); // Declaring a state variable to hold the "Contact Us" data. Initially, it's undefined.

  useEffect(() => {
    // Using useEffect to perform side effects when the component mounts.
    const getData = async () => {
      const req = await handleGetContactUs(); // Fetching the "Contact Us" data from the API asynchronously.
      setContactUs(req.data); // Storing the fetched data into the contactUs state variable.
    };
    getData(); // Invoking the getData function to fetch the data when the component mounts.

    document.title = "ارتباط با ما"; // Setting the document title to "ارتباط با ما" (Contact Us) when the component is loaded.
  }, []); // The empty dependency array ensures that this effect runs only once, when the component is first mounted.

  return (
    <div className="w-full flex items-center flex-wrap gap-2">
      {contactUs // Conditional rendering: If contactUs data is available, map through the data and display each item.
        ? contactUs.map(
            (
              content: any // Iterating over the contactUs data array.
            ) => (
              <div key={content.id} className="flex flex-col ">
                <span>{content.title}</span>
                {/* Displaying the title of each "Contact Us" section. */}
                <pre className="text-justify text-wrap  ">{content.content}</pre>
                {/* Disp laying the content of each "Contact Us" section. */}
              </div>
            )
          )
        : "در حال دریافت اطلاعات"}
      {/* If contactUs is still undefined (loading state), show a loading message. */}
    </div>
  );
};

export default ContactUs; // Exporting the ContactUs component to be used elsewhere in the application.
