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

          if (!resp.ok) throw Error("There was a problem in the login request"),400;

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          const data = await resp.json();
          return data, 200
        } catch (error) {
          return error
        }
      },
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-frederico2191-jwt-kz6zgehxbq2.ws-eu93.gitpod.io/api/token",
            opts
          );
          if (resp.status !== 200) {
            alert("there has been an error. Message from flux.js");
            return false;
          }

          const data = await resp.json();
          console.log("this is the data!!! from the backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          return error
        }
      },
    },
  };
};

export default getState;
