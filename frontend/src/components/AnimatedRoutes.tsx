import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  Home,
  Login,
  OKR,
  OKRDetail,
  NotFound,
  Organization,
  SetPassword,
  TimePeriods,
  People,
  Profile,
  Unauthorized,
  LandingPage,
} from "../pages";
import { PrivateRoute } from "../components";
import { AppSkeleton } from ".";
import { ROUTES } from "../utils/routes.enum";
import AuthRole from "../utils/AuthRole";
import { ROLES } from "../utils/constants";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <AppSkeleton />
            </PrivateRoute>
          }
        >
          <Route
            element={<AuthRole allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}
          >
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PEOPLE} element={<People />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.OKR} element={<OKR />} />
            {/* <Route path={ROUTES.OKR_DETAIL} element={<OKRDetail />} /> */}
          </Route>
          <Route element={<AuthRole allowedRoles={[ROLES.SUPER_ADMIN]} />}>
            <Route path={ROUTES.ORGANIZATION} element={<Organization />} />
          </Route>
          <Route element={<AuthRole allowedRoles={[ROLES.ADMIN]} />}>
            <Route path={ROUTES.TIMEPERIOD} element={<TimePeriods />} />
          </Route>
          <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        </Route>
        <Route path={`${ROUTES.SET_PASSWORD}/:id`} element={<SetPassword />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.WELCOME} element={<LandingPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
