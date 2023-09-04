const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      signup: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email, password),
          });

          if (!resp.ok)
            throw (Error("There was a problem in the signup request"), 400);

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          const data = await resp.json();
          return data, 200;
        } catch (error) {
          return error;
        }
      },
      login: async (email, password) => {
        console.log("Email:", email);
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email, password),
          });

          if (!resp.ok)
            throw (Error("There was a problem in the login request"), 400);

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password";
          }
          console.log("before awaiting the repsonse!");
          const data = await resp.json();
          console.log("this is the data!!! from the backend", data);
          console.log(
            "this is the token from data!!! from the backend",
            data.token
          );
          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token });
          console.log("i feetched correctly");
          return true;
        } catch (error) {
          return error;
        }
      },
    },
  };
};

export default getState;
