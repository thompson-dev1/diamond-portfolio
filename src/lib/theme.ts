export const dayStart = 6;
export const nightStart = 18;
export const themePreferenceKey = "diamond-theme";

export type Theme = "light" | "dark";

export const themeColors = {
  light: "#f5efe5",
  dark: "#070707",
} as const;

export function themeAt(time: Date) {
  const hour = time.getHours();
  return hour >= dayStart && hour < nightStart ? "light" : "dark";
}

export function nextThemeChange(time: Date) {
  const hour = time.getHours();
  const change = new Date(time);

  if (hour >= nightStart) change.setDate(change.getDate() + 1);
  change.setHours(hour >= dayStart && hour < nightStart ? nightStart : dayStart, 0, 0, 0);
  return change.getTime();
}

export const initialThemeScript = `
  (() => {
    const now = new Date();
    let theme = now.getHours() >= ${dayStart} && now.getHours() < ${nightStart} ? "light" : "dark";
    try {
      const [choice, expiresAt] = (localStorage.getItem("${themePreferenceKey}") || "").split(":");
      if ((choice === "light" || choice === "dark") && Number(expiresAt) > now.getTime()) theme = choice;
    } catch {}
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "light" ? "${themeColors.light}" : "${themeColors.dark}";
  })();
`;
