import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Orb from "../Components/Orb/Orb";
import Navigation from "../Components/Navigation/Navigation";
import Dashboard from "../Components/Dashboard/Dashboard";
import Income from "../Components/Income/Income";
import Expenses from "../Components/Expenses/Expenses";
import { useGlobalContext } from "../context/globalContext";
import Signup from "../Components/SignUp/Signup";
import Login from "../Components/Login/Login";
import Analytics from "../Components/Analytics/Analytics";
import TermsAndConditions from "../Components/TermsAndConditions/TermsAndConditions"; // Importing TermsAndConditions
import axios from "axios";
import { DatePicker, message } from "antd";

const { RangePicker } = DatePicker;

function Home() {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelecteteddate] = useState([]);
  const [type, setType] = useState("all");
  const [allTransection, setAllTransection] = useState([]);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Analytics />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Login />;
      case 6:
        return <Signup />;
      case 7: 
        return <TermsAndConditions />;
      default:
        return <Signup />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;
