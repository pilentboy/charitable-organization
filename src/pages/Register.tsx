const Register = () => {
  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full h-[500px] flex items-center justify-between border ">
        {/* register form */}
        <div className="w-1/2  h-full ">
          <form>
            <h1>عضویت</h1>
          </form>
        </div>

        <img
          src="https://shaaf-charity.ir/wp-content/plugins/arian-login//assets/images/login-pic.jpg"
          alt="img"
          className="w-1/2 h-full"
        />
      </div>
    </section>
  );
};

export default Register;
