import { useEffect, useState } from "react"; // Importing React hooks: useEffect for side effects and useState for managing state.
import { useForm } from "react-hook-form"; // Importing the useForm hook from react-hook-form for managing form state and validation.
import { Link, useNavigate } from "react-router"; // Importing Link for navigation and useNavigate to programmatically navigate after successful login.
import useAuth from "../context/AuthProvider"; // Importing custom hook to manage authentication context (like updating the access token).
import axios from "axios"; // Importing axios to handle HTTP requests.

const Login = () => {
  const {
    register, // Register function to bind input fields to react-hook-form.
    handleSubmit, // Function to handle form submission.
    setError, // Function to set errors on specific form fields.
    clearErrors, // Function to clear specific form errors.
    formState: { errors }, // Destructuring the errors from the form state.
  } = useForm(); // Initializing the useForm hook.

  const { updateAccessToken } = useAuth(); // Destructuring the updateAccessToken function from the authentication context.
  const navigate = useNavigate(); // Using the navigate function to redirect the user after successful login.
  const [loading, setLoading] = useState<boolean>(false); // State to track whether the login request is loading.

  const onSubmit = async (data: any) => {
    // Function that runs when the form is submitted.
    console.log("wait for login response..."); // Log for debugging.
    setLoading(true); // Set loading state to true when the login request starts.

    try {
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/login/username/", // API endpoint to send the login request.
        data // Sending the form data (username and password).
      );

      // If the login is successful, store the access and refresh tokens in local storage.
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      alert("ورود با موفقیت"); // Showing a success message.
      updateAccessToken(); // Updating the access token using the context function.
      navigate("/"); // Redirecting the user to the home page after successful login.
    } catch (error: any) {
      // If there is an error, handle it.
      console.log(error); // Log the error for debugging.

      if (error.response && error.response.status === 400) {
        // If the error response status is 400 (bad request).
        const serverErrors = error.response.data.error;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          // If there are specific error messages, display them.
          setError("server", { type: "server", message: serverErrors[0] });
        } else {
          // If no specific error message, show a general error message.
          setError("server", {
            type: "server",
            message: "مشکل عمومی در ورود.",
          });
        }
      } else {
        // If the error is due to network issues or other problems, display a network error message.
        setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    }

    setLoading(false); // Set loading state to false after the request finishes (whether successful or failed).
  };

  useEffect(() => {
    document.title = "ورود"; // Set the document title to "ورود" (Login) when the component mounts.
  }, []); // Empty dependency array ensures this effect runs only once on component mount.

  return (
    <section className="h-[90vh] sm:h-fulk  xl:h-[80vh] flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6">
          <form
            onSubmit={(e) => {
              clearErrors(); // Clear any existing errors before submitting the form.
              handleSubmit(onSubmit)(e); // Handle form submission.
            }}
            className="flex flex-col gap-5 mx-auto md:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>

            {errors.server && (
              <p className="text-red-500">
                {errors.server.message?.toString()}
                {/* Display any server-side error messages. */}
              </p>
            )}

            <label htmlFor="username">نام کاربری</label>

            <input
              {...register("username")} // Registering the input for "username" field.
              required
              id="username"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="password">رمز عبور</label>
            <input
              {...register("password")} // Registering the input for "password" field.
              type="password"
              required
              id="password"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading} // Disabling the button when loading.
            >
              {loading ? "لطفا صبر کنید" : "ورود"}{" "}
              {/* Button text changes based on loading state. */}
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-2 sm:flex-wrap ">
              <Link to="/login-otp" className=" text-primary">
                ورود با شماره تلفن {/* Link to OTP login page. */}
              </Link>
              <Link to="/reset-password" className=" text-primary">
                بازیابی رمز عبور {/* Link to password reset page. */}
              </Link>
              <div className="flex gap-2">
                حساب کاربری ندارید؟
                <Link to="/register" className=" text-primary">
                  عضویت {/* Link to registration page. */}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login; // Exporting the Login component for use in other parts of the app.
