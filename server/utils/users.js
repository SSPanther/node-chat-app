const _ = require('lodash');

// adduser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        // return user that was removed
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser (id) {
        // return user that was found
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        // return array of names
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    getUserByName (name) {
        return this.users.filter((user) => user.name === name)[0];
    }

    getRoomList() {
        var uniqueRooms = _.map(_.uniqBy(this.users, 'room'), (item) => {
            return item.room;
        });
        //console.log('rooms', uniqueRooms);
        return uniqueRooms;
    }
}

module.exports = { Users };

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('Steve', 38);
// var description = me.getUserDescription();
// console.log(description);