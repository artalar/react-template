export const isEmail = email => {
  if (typeof email === 'string' && email.includes('@')) {
    return;
  } else {
    throw new Error ('Wrong email')
  }
}

export const isPassword = password => {
  if (typeof password === 'string' && password.length > 6) {
    return;
  } else {
    throw new Error ('Password to short')
  }
}