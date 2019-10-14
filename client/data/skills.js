function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// courtesy of https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
function isTooDark(hexCode) {
  const c = hexCode.substring(1); // strip #
  const rgb = parseInt(c, 16);    // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;   // extract red
  const g = (rgb >>  8) & 0xff;   // extract green
  const b = (rgb >>  0) & 0xff;   // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  if (luma < 40) {
      return true;
  }

  return false;
}

// courtesy of https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
function getInvertedColor(hex) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

let randomColor;
let skills = [
  { 
    type: 'Software',
    data: [
      { name: 'JavaScript', experience: 50 },
      { name: 'PHP', experience: 75 },
      { name: 'Python', experience: 10 },
      { name: 'HTML/CSS', experience: 95 },
      { name: 'MySQL', experience: 50 },
      { name: 'Oracle', experience: 10 },
      { name: 'Memcache', experience: 50 },
      { name: 'Redis', experience: 25 },
      { name: 'Laravel', experience: 25 },
      { name: 'Zend Framework', experience: 10 },
      { name: 'Nginx', experience: 25 },
      { name: 'Git', experience: 50 },
      { name: 'Jenkins', experience: 25 }
    ]
  },
  {
    type: 'Web',
    data: [
      { name: 'Akamai', experience: 75 },
      { name: 'SEO', experience: 50 },
      { name: 'Agile', experience: 50 },
      { name: 'Web Analytics', experience: 50 },
      { name: 'Advertising Technology', experience: 25 }
    ]
  }
];


for (var i = 0; i < skills.length; i++) {
  for (var j = 0; j < skills[i].data.length; j++) {
    randomColor = getRandomColor();

    while (isTooDark(randomColor)) {
      randomColor = getRandomColor();
    }

    skills[i].data[j].color = randomColor;
    skills[i].data[j].invertedColor = getInvertedColor(randomColor);
  }
}

module.exports = skills;
