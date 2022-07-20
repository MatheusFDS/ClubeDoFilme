const fs = require('fs');
const User = {
    fileName: './database/config/users.json',

 create: function(userData) {
      let allUsers = this.getUsers();
      let newUser = {
        id: this.generateId(),
        ...userData
      }

  allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))   
    return newUser
   },

  generateId: function() {
      let allUsers = this.getUsers();
      let lastUser = allUsers.pop();

      if (lastUser) {
        return lastUser.id + 1;
      }
      return 1;
  },

  getUsers: function() {
     return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
  },

  findUserbyId:  function (id) {
    let allUsers =  this.getUsers();
    let userFound = allUsers.find(ondeUser => ondeUser.id === id);
    return userFound;
  },

  findUserbyField:  function (field, value) {
    let allUsers =  this.getUsers();
    let userFound = allUsers.find(ondeUser => ondeUser[field] === value);
    return userFound;
  }


    
}
    

module.exports = User;