import React, { useState } from "react";
import "./app.css";
import CharacterDetails from "../character-card";
import RMapiService from "../../service/rmapi-service";
import Header from "../header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundry from "../error-boundry";
import StartPage from "../start-page";
import CharacterList from "../character-list/character-list";
import EpisodeList from "../episod-list";
import MountingScript from "../menu/logick";
import { Provider } from "react-redux";
import { RMserviceProvider } from "../Rm-service-context/rm-service-context";
import store from "../../store";

const App = () => {
  const RMservice = new RMapiService();

  const menuItems = [
    {
      id: 1,
      value: "Home",
      href: "/",
      icon: "home",
    },
    {
      id: 2,
      value: "Characters List",
      href: "/list",
      icon: "settings_accessibility",
    },
    {
      id: 3,
      value: "Episodes",
      href: "/episode",
      icon: "density_small",
    },
  ];

  return (
    <div className="app">
      <Provider store={store}>
        <ErrorBoundry>
          <RMserviceProvider value={RMservice}>
            <BrowserRouter>
              <Header items={menuItems} />
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/episode" element={<EpisodeList />} />
                <Route path="list" element={<CharacterList />} />
                <Route path="character" element={<CharacterDetails />} />
                <Route path="character/:id" element={<CharacterDetails />} />

                <Route
                  path="episode_with_character/:id"
                  element={<EpisodeList />}
                />

                <Route
                  path="characters_in_episode/:id"
                  element={<CharacterList />}
                />
              </Routes>
            </BrowserRouter>
          </RMserviceProvider>
        </ErrorBoundry>
      </Provider>
      <MountingScript />
    </div>
  );
};

export default App;
