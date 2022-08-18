
const ADMIN = 0
const READ_ONLY = 1
const AUTHOR = 2

enum Role { ADMIN = 5, READ_ONLY, AUTHOR }

const person = {
 name: 'Soojin',
  age: 20,
  role: Role.ADMIN
}

if (person.role === Role.AUTHOR) {
  console.log('admin')
}
