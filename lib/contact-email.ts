export const DEFAULT_CONTACT_EMAIL = "ziaurrahman.26261@gmail.com";

export function validateContactEmail(value: string) {
  const email = value.trim();
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(email)) {
    throw new Error("The contact email must be one email address without a display name or additional parameters.");
  }
  return email;
}
