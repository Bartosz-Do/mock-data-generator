const fakerFields: Record<string, string[]> = {
  "person": [
    "firstName",
    "lastName",
    "fullName"
  ],
  "internet": [
    "email",
    "username",
    "password",
  ],
  "image": [
    "avatar"
  ],
  "hacker": [
    "phrase",
  ],
  "date": [
    "anytime"
  ]
}

export const FieldCategory: Record<string, string> = Object.entries(fakerFields).reduce((acc, [key, value]) => {
  value.forEach((field) => {
    acc[field] = key;
  });
  return acc;
}, {} as Record<string, string>);
