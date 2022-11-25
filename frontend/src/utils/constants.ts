import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

// import API from "./axios";

export const STORAGE_KEY_CONSTANT = "okr_vb_token";
export const USER_KEY_CONSTANT = "okr_vb_user";
export const OKR_STATUS_NOT_FOUND = "status not yet calculated";
export const COMPANY_ID = "companyId";

export const currentUser = JSON.parse(
  String(localStorage.getItem(USER_KEY_CONSTANT))
);

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export const RoleLabel = {
  USER: "User",
  ADMIN: "Administrator",
  SUPER_ADMIN: "Super Administrator",
};

export const krUnitOptions = [
  { label: "%", value: "%" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
];

export enum OKR_TYPE {
  Individual = "individual",
  CompanyWide = "company",
}

export const okrTypesForForm = [
  { label: "Individual", value: "individual" },
  { label: "Company Wide", value: "company" },
];

export const getProgressColorPro = (expected: string) => {
  // const percentagePro = getStatusByProgress(percentage, expected);
  switch (expected) {
    case "atRisk":
      return "#ff4d4f";
    case "onTrack":
      return "#1890ff";
    case "behind":
      return "#faad14";
    case "done":
      return "#52c41a";
  }
};

export const getProgressColor = (percentage: number) => {
  switch (true) {
    case percentage <= 35:
      return "exception";
    case percentage > 35 && percentage < 100:
      return "normal";
    case percentage === 100:
      return "success";
  }
};
export const getProgressColorByStatus = (
  status: "onTrack" | "atRisk" | "behind" | "done"
) => {
  const colorMap = {
    done: "success",
    atRisk: "exception",
    behind: "warning",
    onTrack: "active",
  };
  return colorMap[status] ?? "normal";
};

export const getStatusByProgress = (current: number, expected: number) => {
  let diff;
  if (current === 100) {
    return "done";
  } else if (expected <= current) {
    return "onTrack";
  } else {
    if (expected > current) {
      diff = expected - current;
      if (diff > 15) {
        return "atRisk";
      } else {
        return "behind";
      }
    }
  }
};

export const getStatusColorPro = (
  status: "onTrack" | "atRisk" | "behind" | "done"
) => {
  const colorMap = {
    done: "#52c41a",
    atRisk: "#ff4d4f",
    behind: "#faad14",
    onTrack: "#1890ff",
  };
  return colorMap[status] ?? "#bfbfbf";
};

export const getStatusColor = (
  status: "onTrack" | "atRisk" | "behind" | "done"
) => {
  const colorMap = {
    done: "success",
    atRisk: "danger",
    behind: "warning",
    onTrack: "active",
  };
  return colorMap[status] ?? "secondary";
};

export const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "Missing ${label}!",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "${label} is not a valid email!",
    // eslint-disable-next-line no-template-curly-in-string
    number: "${label} is not a valid number!",
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    min: "${label} must be minimum ${min}",
    // eslint-disable-next-line no-template-curly-in-string
    max: "${label} must be maximum ${max}",
  },
};

export const timeAgoFrom = (createdAt: string) => {
  const now = new Date();
  const happened = new Date(createdAt);

  const diff = differenceInSeconds(now, happened);
  let result = "";

  switch (true) {
    // Few seconds ago
    case diff < 60:
      result = `${diff} ${diff === 1 ? "second" : "seconds"} ago`;
      break;
    // Few minutes ago
    case diff < 60 * 60:
      const minuteDiff = differenceInMinutes(now, happened);
      result = `${minuteDiff} ${minuteDiff === 1 ? "minute" : "minutes"} ago`;
      break;
    // Few hours ago
    case diff < 60 * 60 * 24:
      const hourDiff = differenceInHours(now, happened);
      result = `${hourDiff} ${hourDiff === 1 ? "hour" : "hours"} ago`;
      break;
    // Few days ago
    case diff < 60 * 60 * 24 * 7:
      const dayDiff = differenceInDays(now, happened);
      result = `${dayDiff} ${dayDiff === 1 ? "day" : "days"} ago`;
      break;
    default:
      result = `${happened}`;
      break;
  }

  return result;
};

export const getAvatarUrl = (name: string) =>
  `https://avatars.dicebear.com/api/avataaars/${name}.svg?mood[]=happy&background=%23EE6C4DFF`;

export const getDonutChartColor = (type: string) => {
  switch (true) {
    case type === "At Risk":
      return "#ff4d4f";
    case type === "Behind":
      return "#faad14";
    case type === "Done":
      return "#52c41a";
    case type === "On Track":
      return "#1890ff";
  }
};

export const getCompanyId = () => {
  return (
    JSON.parse(String(localStorage.getItem(COMPANY_ID))) || {
      id: "",
      logoUrl: "",
      name: "",
    }
  );
};
