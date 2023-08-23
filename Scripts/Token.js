const baseUrl = "https://sumsi.dev.webundsoehne.com",
  loginUrl = "https://sumsi.dev.webundsoehne.com/api/v1/login",
  headers = { "Content-Type": "application/json", Accept: "application/json" },
  saveToken = (e) => {
    localStorage.setItem("token", e);
  },
  getToken = () => localStorage.getItem("token"),
  login = () => {
    let e = { email: "admin@csaw.at", password: "pw4sumsiadmin" };
    return axios
      .post("https://sumsi.dev.webundsoehne.com/api/v1/login", e, { headers })
      .then((e) => {
        let n = e.data;
        if ("success" === n.status && n.token) {
          let o = n.token;
          return saveToken(o), o;
        }
        throw Error("Invalid credentials");
      });
  },
  handleLogin = () =>
    login()
      .then((e) => {
        console.log("Login successful"), console.log("Token:", e), saveToken(e);
      })
      .catch((e) => {
        console.error("Login failed:", e);
      }),
  token = getToken();
token ? console.log("Token:", token) : handleLogin();
