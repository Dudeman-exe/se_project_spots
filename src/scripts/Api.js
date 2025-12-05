class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "46747406-c2b0-48b7-b5f8-07dbde211dbd",
      },
    }).then((res) => res.json());
  }
}

export default Api;
