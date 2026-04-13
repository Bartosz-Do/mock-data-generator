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
