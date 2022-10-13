module.exports = constant = {
  MONGO_URL:"",
  user_data: {
    email: "",
    password: "",
  },
  activity_feed_id: "",
  quarter_id: "",
  admin_okr_id: "",
  idToken: "",
  org_admin_data: {
    email: "",
    password: "",
  },
  manager_data: {
    email: "",
    password: "",
  },
  super_admin_data: {
    email: "",
    password: "",
  },
  org_id: "",
  user_id: "",
  admin_id: "",
  feedback_id: "",
  update_feedback: {
    user_rating: 4,
    user_feedback_okrs: {
      okr: “<“okr-id>,
      comments: "",
      rating: 3,
    },
  },
  update_manager_feedback: {
    user_rating: 4,
    user_feedback_okrs: {
      okr: “<“okr-id>,
      comments: "",
      rating: 4,
    },
  },
  update_admin_feedback: {
    final_rating: 4,
    comments: [""],
  },
  new_org_signup: {
    orgName: "",
    orgUsername: "",
    adminName: "",
    adminEmail: "",
    location: "",
    adminPhone: "",
  },
};