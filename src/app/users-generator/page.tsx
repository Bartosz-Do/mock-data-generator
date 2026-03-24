"use client";
import { UsersGeneratorContext } from "./template";
import { useContext } from "react";
import SwitchSection from "@/components/switch-section";

export default function UsersGeneratorPage() {
  const {
    name: isName,
    surname: isSurname,
    username: isUsername,
    avatar: isAvatar,
    email: isEmail,
    password: isPassword,
  } = useContext(UsersGeneratorContext);

  return (
    <>
      <h1>Random users generator</h1>
      <p>Name: {isName ? "enabled" : "disabled"}</p>
      <p>Surname: {isSurname ? "enabled" : "disabled"}</p>
      <p>Username: {isUsername ? "enabled" : "disabled"}</p>
      <p>Avatar: {isAvatar ? "enabled" : "disabled"}</p>
      <p>Email: {isEmail ? "enabled" : "disabled"}</p>
      <p>Password: {isPassword ? "enabled" : "disabled"}</p>
      <SwitchSection className="mt-2">
        <div id="json">
          <p>json test</p>
          <div>test</div>
        </div>

        <div id="sql">
          <p>sql test</p>
        </div>
      </SwitchSection>
    </>
  );
}
