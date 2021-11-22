interface localeData {
  token: string;
  accountId: string;
  accountRole: string;
}

export function saveAccountLocally(accountData: localeData): boolean {
  try {
    localStorage.setItem("token", accountData.token);
    localStorage.setItem("account-id", accountData.accountId);
    localStorage.setItem("account-role", accountData.accountRole);

    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("account-id");
    const accountRole = localStorage.getItem("account-role");

    if (token && accountId && accountRole) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export function removeLocaleAccount(): boolean {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("account-id");
    localStorage.removeItem("account-role");

    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("account-id");
    const accountRole = localStorage.getItem("account-role");

    if (!token && !accountId && !accountRole) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export function getLocaleAccount(): localeData | null {
  try {
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("account-id");
    const accountRole = localStorage.getItem("account-role");

    if (token && accountId && accountRole) {
      return { token, accountId, accountRole };
    }
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
