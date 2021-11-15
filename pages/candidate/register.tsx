import { FC } from "react";

import RegisterForm from "../../components/RegisterForm";

const RegisterPage: FC = function () {
  const registerHandler = () => {
    alert("User registered successfully");
  };

  return (
    <main className="page">
      <div className="container">
        <section>
          <span className="block pb-3 text-center font-bold text-4xl">
            Robt
          </span>
          <RegisterForm onRegister={registerHandler} />
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
