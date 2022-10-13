const CONSTANTS = {
    ROLES : {
        ADMIN : 'ADMIN',
        MANAGER : 'MANAGER',
        USER : 'USER',
        SUPER_ADMIN: 'SUPER_ADMIN'
    },

    HTTP_CODES: {
        SUCCESS : 200,
        CREATED : 201,
        ACCEPTED : 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN : 403,
        NOT_FOUND : 404,
        UNPROCESSABLE_ENTITY: 422,
        INTERNAL_SERVER_ERROR :500,
        NOT_IMPLEMENTES: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVILABLE: 503
    },
    ERROR_MESSAGES: {
        SUCCESS : 'SUCCESS',
        CREATED : 'CREATED',
        ACCEPTED : 'ACCEPTED',
        NO_CONTENT: 'NO_CONTENT',
        BAD_REQUEST: 'BAD_REQUEST',
        UNAUTHORIZED: 'UNAUTHORIZED',
        FORBIDDEN : 'FORBIDDEN',
        NOT_FOUND : 'NOT_FOUND',
        UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
        INTERNAL_SERVER_ERROR :'INTERNAL SERVER ERROR',
        NOT_IMPLEMENTES: 'NOT_IMPLEMENTES',
        BAD_GATEWAY: 'BAD_GATEWAY',
        SERVICE_UNAVILABLE: 'SERVICE_UNAVILABLE',
        SOMETHING_WENT_WRONG: 'SOMETHING WENT WRONG',
    },
    STATUS : {
        ACTIVE : 'ACTIVE',
        INACTIVE : 'INACTIVE'
    },
    PERMISSIONS:{
        ADMIN:[
            "create_manager_L1",
            "create_projects",      
            "create_teams",
            "monitor_and_control_portal"
        ],
        MANAGER:[
            "create_sub_managers",
            "create_teams",
            "create_projects",
            "review_okrs",
            "provide_feedback",
            "view_organizational_structure"
        ],
        USER: [
            "create_okr",
            "update_okr",
            "view_organizational_structure"
        ],
        SUPER_ADMIN: [
            "monitor_and_control_portal"
        ]
    },
    ORG_TYPES : {
        PUBLIC : 'public',
        PRIVATE : 'private',
        JOINT : 'joint',
    },
    OKR_TYPES: {
        COMPANY: "company",
        INDIVIDUAL: "individual"
    },
    GET_OKRS: {
        SELF: "self",
        COMPANY: "company",
    },
    GENDER_ARRAY :["Male", "Female", "Other"],
    ROLES_ARRAY: ["ADMIN", "MANAGER", "USER", "SUPER_ADMIN"],
    ORG_TYPE_ARRAY: ["public", "private", "joint"],
    STATUS_ARRAY: ["ACTIVE", "INACTIVE"],
    OKR_TYPES_ARRAY: ["company", "individual"],
    LOGIN_TYPE : {
        ADMIN : 'ADMIN',
        MANAGER : 'MANAGER',
        USER : 'USER',
        SUPER_ADMIN: 'SUPER_ADMIN'
    },
    WEEKDAYS_ARRAY :["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"],
    WEEKDAYS:{
        SUNDAY : "SUNDAY",
        MONDAY : "MONDAY",
        TUESDAY : "TUESDAY",
        WEDNESDAY : "WEDNESDAY",
        THURSDAY : "THURSDAY",
        FRIDAY : "FRIDAY",
        SATURDAY : "SATURDAY"
    },
    TIMEZONES:{
        IST: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    },
    ACTIVITY_STATUS: {
        CREATED: 'CREATED',
        UPDATED: 'UPDATED',
        DELETED: 'DELETED',
    },
    ACTIVITY_STATUS_ARRAY: ['CREATED','UPDATED','DELETED'],
    UNIT_TYPES_ARRAY: ['%', 'number', 'boolean'],
    UNIT_TYPES:{
        PERCENTAGE: '%',
        NUMBER: 'number',
        BOOLEAN: 'boolean'
    },
    KR_OPERATIONS_ARRAY: ['KR_UPDATED', 'KR_CREATED', 'KR_PROGRESS_UPDATED', 'COMMENTED', 'COMMENT_UPDATED', 'OKR_CREATED', 'OKR_UPDATED', 'KR_PROGRESS_UPDATED_COMMENTED'],
    KR_OPERATIONS:{
        KR_UPDATED: 'KR_UPDATED',
        KR_CREATED: 'KR_CREATED',
        KR_PROGRESS_UPDATED: 'KR_PROGRESS_UPDATED',
        COMMENTED: 'COMMENTED',
        COMMENT_UPDATED: 'COMMENT_UPDATED',
        OKR_CREATED: 'OKR_CREATED',
        OKR_UPDATED: 'OKR_UPDATED',
        KR_PROGRESS_UPDATED_COMMENTED: 'KR_PROGRESS_UPDATED_COMMENTED',
    },
}

module.exports = CONSTANTS