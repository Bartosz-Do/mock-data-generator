import { faker } from "@faker-js/faker";

export const generators = [
  {
    key: "name",
    generator: () => faker.person.firstName(),
  },
  {
    key: "surname",
    generator: () => faker.person.lastName(),
  },
  {
    key: "username",
    generator: () => faker.internet.username(),
  },
  {
    key: "avatar",
    generator: () => faker.image.avatar(),
  },
  {
    key: "email",
    generator: () => faker.internet.email(),
  },
  {
    key: "password",
    generator: () => faker.internet.password(),
  },
  {
    key: "title",
    generator: () => faker.lorem.sentence(),
  },
  {
    key: "body",
    generator: () => faker.lorem.paragraphs(),
  },
  {
    key: "date",
    generator: () => faker.date.past().toISOString(),
  },
  {
    key: "phrase",
    generator: () => faker.hacker.phrase(),
  },
];
