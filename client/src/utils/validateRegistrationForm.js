function validateRegistrationForm({
  name,
  email,
  authId,
  address: { house, street, city, pin, country },
  payment: { cardNo, nameOnCard, validFrom, validUpto, cvv },
}) {
  const userData = {
    name,
    email,
    authId,
    address: { house, street, city, pin, country },
    payment: { cardNo, nameOnCard, validFrom, validUpto, cvv },
  };

  const attributeNames = {
    name: "Name",
    email: "e-mail",
    house: "House/Apartment No",
    street: "Street",
    city: "City",
    pin: "PIN",
    country: "Country",
    cardNo: "Card Number",
    nameOnCard: "Name on Card",
    validFrom: "Valid From",
    validUpto: "Valid Through",
    cvv: "CVV",
  };

  let alertShown = false;
  const pattern = /\s/g;

  if (
    (typeof userData.name === "null" ||
      pattern.test(userData.name) ||
      userData.name.length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.name} cannot be blank`);
  }

  if (
    (typeof userData.email !== "string" ||
      pattern.test(userData.email) ||
      userData.email.length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.email} cannot be blank`);
  }

  Object.entries(userData.address).map((item) => {
    if (
      (typeof item[1] !== "string" ||
        pattern.test(item[1]) ||
        item[1].length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  Object.entries(userData.payment).map((item) => {
    if (
      (typeof item[1] !== "string" ||
        pattern.test(item[1]) ||
        item[1].length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  return alertShown;
}

export default validateRegistrationForm;
