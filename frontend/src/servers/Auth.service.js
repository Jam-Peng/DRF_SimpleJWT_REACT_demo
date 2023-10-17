// 使用 axios 的方法
import axios from "axios";
const API_URL = "http://127.0.0.1:8000/";

class AuthService {
  // 註冊
  async register(username, password) {
    return await axios.post(
      `${API_URL}/api/v1/register`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 登入
  async login(username, password) {
    return await axios.post(
      `${API_URL}/api/v1/token/`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 登出
  logout() {
    localStorage.removeItem("client");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("client"));
  }
}

const authService = new AuthService();
export default authService;
