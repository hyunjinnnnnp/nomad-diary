import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import Navigator from "./Navigator";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
