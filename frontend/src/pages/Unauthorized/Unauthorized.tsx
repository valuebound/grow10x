import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes.enum";
import { currentUser, ROLES } from "../../utils/constants";

type UnauthorizedProps = {};

const Unauthorized: React.FC<UnauthorizedProps> = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    if (currentUser?.role === ROLES.SUPER_ADMIN) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <Result
      status="403"
      title="401"
      subTitle="Sorry, you are an unauthorized user for this page."
      extra={
        <Button
          type="primary"
          onClick={goToHome}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorized;
