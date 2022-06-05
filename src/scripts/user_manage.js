const login = (users, username, password) => {
  console.log(users);
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    return {
      username: user.username,
      role: user.role,
      mail: user.mail,
      name: user.name,
      lastName: user.lastName,
    };
  }
  return false;
};

const register = (users, name, lastName, username, password, mail) => {
  const user = users.find((user) => user.username === username);
  if (user) {
    return false;
  }
  users.push({
    name,
    lastName,
    username,
    password,
    mail,
    role: 'user',
  });
  return {
    name,
    lastName,
    username,
    mail,
    role: 'user',
  };
};

export { login, register };
