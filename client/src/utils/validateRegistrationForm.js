function validateRegistrationForm({
  name,
  email,
  password,
  address: { house, street, city, pin, country },
  payments: { cardNo, nameOnCard, validFrom, validUpto, cvv },
}) {
  const userData = {
    name,
    email,
    password,
    address: { house, street, city, pin, country },
    payments: { cardNo, nameOnCard, validFrom, validUpto, cvv },
  };

  const attributeNames = {
    name: "Name",
    email: "e-mail",
    password: "password",
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
    typeof userData.name !== "string" ||
    (userData.name.replace(pattern, "").length === 0 && !alertShown)
  ) {
    alertShown = true;
    alert(`${attributeNames.name} cannot be blank`);
  }

  if (
    (typeof userData.email !== "string" ||
      userData.email.replace(pattern, "").length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.email} cannot be blank`);
  }

  if (
    (typeof userData.password !== "string" ||
      userData.password.replace(pattern, "").length === 0) &&
    !alertShown
  ) {
    alertShown = true;
    alert(`${attributeNames.password} cannot be blank`);
  }

  Object.entries(userData.address).map((item) => {
    if (
      (typeof item[1] !== "string" ||
        item[1].replace(pattern, "").length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  Object.entries(userData.payments).map((item) => {
    if (
      (typeof item[1] !== "string" ||
        item[1].replace(pattern, "").length === 0) &&
      !alertShown
    ) {
      alertShown = true;
      alert(`${attributeNames[item[0]]} cannot be blank`);
    }
  });

  return alertShown;
}

export default validateRegistrationForm;
