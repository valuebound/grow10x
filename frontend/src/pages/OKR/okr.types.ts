export interface Okr {
  totalObjective:   number;
  objectiveDone:    number;
  objectiveAtRisk:  number;
  objectiveBehind:  number;
  objectiveOnTrack: number;
  totalKrs:         number;
  overallProgress:  number;
  overallStatus:    string;
  okrs:             OkrElement[];
}

export interface OkrElement {
  okrObjectiveId: string;
  okrObjective:   string;
  okrType:        string;
  krs:            Kr[];
  okrProgress:    number;
  okrStatus:      string;
  okrOwner:       OkrOwner;
  quarter:        string;
  okrCreatedAt:   Date;
  okrUpdatedAt:   Date;
  okrComments:    OkrComment[];
}

export interface Kr {
  krsId:        string;
  keyResult:    string;
  krProgress:   number;
  status:       string;
  start:        number;
  currentValue: number;
  target:       number;
  isBoolean:    boolean;
  unit:         string;
  krComments:   OkrComment[];
}

export interface OkrComment {
  text:        string;
  commentedBy: CommentedBy;
  createdAt:   Date;
  _id:         string;
}

export interface CommentedBy {
  _id:       string;
  firstName: string;
  surname:   string;
}

export interface OkrOwner {
  _id:          string;
  firstName:    string;
  surname:      string;
  organization: string;
  level:        number;
  teams:        any[];
}

export interface ActivityFeed {
  status:  string;
  code:    number;
  message: string;
  data:    Data;
  error:   Error;
}

export interface Data {
  _id:       string;
  user:      User;
  id:        string;
  type:      string;
  createdAt: Date;
  status:    string;
  activity:  Activity[];
}

export interface Activity {
  prevData:  PrevDatum | any;
  newData:   NewDatum | any;
  createdBy: {
    _id: string;
    firstName: string;
    surname: string;
    avatar: string;
  };
  operation: string;
  timestamp: Date;
  _id:       string;
}

export interface NewDatum {
  keyResult?:    string;
  target?:       number;
  start?:        number;
  currentValue?: number;
  isDeleted?:    boolean;
  isBoolean?:    boolean;
  unit?:         string;
  comment?:      CommentClass;
  _id?:          string;
  text?:         string;
  commentedBy?:  string;
}

export interface CommentClass {
  text:        string;
  commentedBy: {
    _id: string;
    firstName: string;
    surname: string;
    avatar: string;
  };
}

export interface PrevDatum {
  currentValue: number;
}

export interface User {
  _id:       string;
  firstName: string;
  surname:   string;
}