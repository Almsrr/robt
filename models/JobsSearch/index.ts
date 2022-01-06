import Job from "../Job";

export interface UserSearch {
  keyword: string;
  location: string;
}

export interface JobsState {
  list: Job[];
  isLoading: boolean;
  error: boolean;
  userInput: UserSearch;
}

export interface JobsAction {
  type: string;
  payload?: Job[];
  input?: UserSearch;
}
