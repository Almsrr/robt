import { FC } from "react";

import RegisterForm from "../../components/RegisterForm";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { setUser } from "../../app/userSlice";

const RegisterPage: FC = function () {
  const router = useRouter();
  const dispatch = useDispatch();

  const registerHandler = (newAccountData: any) => {
    // console.log(newUserAccount);

    axios
      .post("/api/account", newAccountData)
      .then((response) => {
        if (response.status === 200) {
          const { token, id: userId } = response.data;
          const userRole = newAccountData.role;

          dispatch(login({ token }));
          dispatch(setUser({ userId, userRole }));

          alert("User registered successfully");
          router.replace(`/${userRole}/${userId}/dashboard`);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
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
