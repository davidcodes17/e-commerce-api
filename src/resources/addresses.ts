const countries = ["Nigeria"];

const currencies = ["NGN"];

const pickUpstations = {
  countries: {
    nigeria: {
      state: {
        lagos: [
          {
            local_govt: "Epe",
            address: "No 45, Adejobi Str, opp, Epe",
            google_map:"https://gmap.op",
            email:"",
            phone_contact:["+2347085218191"],
            images:[],
            lon: 12.3,
            lat: 45.2,
          },
        ],
      },
    },
  },
};

const address = {
  country: {
    nigeria: {
      state: {
        lagos: ["Epe", "Ikorodu", "Ojo", "Mushin", "Agege", "Shomolu"],
      },
    },
  },
};


export {countries, pickUpstations, address, currencies}