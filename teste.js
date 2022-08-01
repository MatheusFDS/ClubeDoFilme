const fs = require('fs');
const path = require('path');

let filenameToDestroy = path.join(__dirname,'./public/profile/');


avatarOld='1659388386122avatar-masculino2.png'

let ver = filenameToDestroy+avatarOld;
console.log('VER: ', ver);

ver2=fs.unlinkSync(ver);

console.log('RESULTADO EXC: ', ver2)