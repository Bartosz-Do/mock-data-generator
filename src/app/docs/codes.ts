export const basicApiFetchCode = {
  js: `const res = await fetch("https://mock-data-generator-jet.vercel.app/api/generator", {
  method: "POST",
  body: JSON.stringify({
    count: 10,
    fields: ["firstName", "lastName"],
  })
});

const data = await res.json();
console.log(data.value);`,

  py: `import requests

response = requests.post("https://mock-data-generator-jet.vercel.app/api/generator", json={
  "count": 10,
  "fields": ["firstName", "lastName"],
})

data = response.json()
print(data["value"])`,

  res: `[
  { firstName: 'Estelle', lastName: 'Turcotte' },
  { firstName: 'Shaun', lastName: 'Wilkinson' },
  { firstName: 'Archie', lastName: 'Russel' },
  { firstName: 'Ruben', lastName: 'Emard' },
  { firstName: 'Barbara', lastName: 'Hahn' },
  { firstName: 'Nikki', lastName: 'Okuneva' },
  { firstName: 'Johnnie', lastName: 'Howe' },
  { firstName: 'Molly', lastName: 'Runolfsson' },
  { firstName: 'Sherman', lastName: 'Schowalter' },
  { firstName: 'Earl', lastName: 'Klein' }
]`,
};

export const seedApiFetchCode = {
  js: `const res = await fetch("https://mock-data-generator-jet.vercel.app/api/generator", {
  method: "POST",
  body: JSON.stringify({
    count: 5,
    fields: ["avatar", "email", "password"],
    seed: 123,
  })
});

const data = await res.json();
console.log(data.value);`,
  py: `import requests

response = requests.post("https://mock-data-generator-jet.vercel.app/api/generator", json={
  "count": 5,
  "fields": ["avatar", "email", "password"],
  "seed": 123,
})

data = response.json()
print(data["value"])`,

  res: `[
  {
    avatar: 'https://avatars.githubusercontent.com/u/28613933',
    email: 'Chris84@gmail.com',
    password: 'aqi83WueYU0cbUE'
  },
  {
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/71.jpg',
    email: 'Gabriel.Murray@hotmail.com',
    password: 'xpBFcBiYbF7AQ_q'
  },
  {
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/68.jpg',
    email: 'Jeannie_Kuvalis11@hotmail.com',
    password: 'UrEB1oAUWRw4Rv9'
  },
  {
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/34.jpg',
    email: 'Jeffrey.Moore@hotmail.com',
    password: 'VmFf0ZsI4KUyWLh'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/43857224',
    email: 'Jasmine_Langosh@hotmail.com',
    password: 'gdp0kucJJiVXnAy'
  }
]`
}
