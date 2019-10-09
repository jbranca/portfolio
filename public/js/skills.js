function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let skills = [
  { 
    type: 'Software',
    data: [
      { name: 'JavaScript', experience: 50 },
      { name: 'PHP', experience: 75 },
      { name: 'Python', experience: 10 },
      { name: 'HTML/CSS', experience: 100 },
      { name: 'MySQL', experience: 50 },
      { name: 'Oracle', experience: 10 },
      { name: 'Memcache', experience: 50 },
      { name: 'Redis', experience: 25 },
      { name: 'Laravel', experience: 25 },
      { name: 'Zend Framework', experience: 10 },
      { name: 'Nginx', experience: 25 },
      { name: 'Git', experience: 50 }
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
    skills[i].data[j].color = getRandomColor();
  }
}
