function validateRegistrationForm({
  name,
  email,
  authId,
  address: { house, street, city, pin, country },
  payment: { cardNo, nameOnCard, validFrom, validUpto, cvv },
}) {
  const data = {
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

  if (
    (typeof data.name === "undefined" || data.name.length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.name} cannot be blank`);
  }

  if (
    (typeof data.email === "undefined" || data.email.length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.email} cannot be blank`);
  }

  Object.entries(data.address).map((item) => {
    if (
      (typeof item[1] === "undefined" || item[1].length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  Object.entries(data.payment).map((item) => {
    if (
      (typeof item[1] === "undefined" || item[1].length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  return alertShown;
}

export default validateRegistrationForm;
