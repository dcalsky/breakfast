export const isPhoneNumber = phone => {
  return phone.match(/^\d{11}$/) !== null
}

export const isLegalPassword = password => {
  return password.length >= 6 && !password.match(/\s/) && !password.match(/(\.|,|\?|\/|`)/)
}

export const isLegalName = name => {
  return name.length >= 2
}