import { logoutAction } from "../auth-actions";

export async function GET() {
  return logoutAction();
}
