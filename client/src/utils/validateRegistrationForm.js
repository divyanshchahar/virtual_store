function validateRegistrationForm({
  name,
  email,
  house,
  street,
  city,
  pin,
  country,
  cardNumber,
  nameOnCard,
  startMonth,
  endMonth,
  cvv,
}) {
  const data = {
    name,
    email,
    house,
    street,
    city,
    pin,
    country,
    cardNumber,
    nameOnCard,
    startMonth,
    endMonth,
    cvv,
  };

  const attributeNames = {
    name: "Name",
    email: "e-mail",
    house: "House/Apartment No",
    street: "Street",
    city: "City",
    pin: "PIN",
    country: "Country",
    cardNumber: "Card Number",
    nameOnCard: "Name on Card",
    startMonth: "Valid From",
    endMonth: "Valid Through",
    cvv: "CVV",
  };

  let alertShown = false;

  Object.entries(data).map((item) => {
    if (typeof item[1] === "undefined" && !alertShown) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  return alertShown;
}

export default validateRegistrationForm;
