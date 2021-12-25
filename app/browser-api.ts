interface LocaleData {
  token: string;
  accountId: string;
  accountRole: string;
}

export function saveAccountLocally(accountData: LocaleData): void {
  localStorage.setItem("token", accountData.token);
  localStorage.setItem("account-id", accountData.accountId);
  localStorage.setItem("account-role", accountData.accountRole);
}

export function removeLocaleAccount(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("account-id");
  localStorage.removeItem("account-role");
}

export function getLocaleAccount(): LocaleData | null {
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("account-id");
  const accountRole = localStorage.getItem("account-role");

  if (token && accountId && accountRole)
    return { token, accountId, accountRole };

  return null;
}
