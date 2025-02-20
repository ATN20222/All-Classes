import axios from "axios";
import axiosInstance, { deleteToken, setDB, setToken } from "./AxiosApi";

const baseURL = "https://all-classes.com/api";

const axiosReg = axios.create({
  baseURL: baseURL,
});
setDB('mind');

const AuthService = {
  Login: async (email, password) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axiosInstance.post(`/auth/login`, formData);
      console.log("resp", response);
      localStorage.setItem("UId", response.data.user_id);
      setToken(response.data.token);
      // setDB(response.data.db);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
      //throw new Error(error.response.data.message);
    }
  },
  Logout: async () => {
    try {
      const response = await axiosInstance.post(`/auth/logout`);
      deleteToken();
      localStorage.clear();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to logout');
    }
  },
  Me: async () => {
    try {
      const response = await axiosInstance.post(`/auth/me`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to logout');
    }
  },
  RequestPasswordReset: async (email) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axiosInstance.post(
        `/auth/password/forget`,
        formData
      );
      deleteToken();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to send email');
    }
  },
  ResetPassword: async (token, email, password, password_confirmation) => {
    try {
      const response = await axiosInstance.post(`/auth/password/reset`, null, {
        params: {
          token: token,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to reset password');
    }
  },
  VerifyOTP: async (otp, email) => {
    try {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("email", email);
      const response = await axiosInstance.post(`/auth/otp/check`, formData);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
      //throw new Error(error.response.data.message);
    }
  },
  RegisterApi: async (
    name,
    email,
    phone,
    city,
    country,
    address,
    branches_number,
    classes_number,
    kids_number,
    employees_number,
    start_fees,
    about,
    provided_services,
    media
  ) => {
    try {
      console.log(
        name,
        email,
        phone,
        city,
        country,
        address,
        branches_number,
        classes_number,
        kids_number,
        employees_number,
        start_fees,
        about,
        provided_services,
        media
      );
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("province", country);
      formData.append("address", address);
      formData.append("branches_number", branches_number);
      formData.append("classes_number", classes_number);
      formData.append("children_number", kids_number);
      formData.append("employees_number", employees_number);
      formData.append("start_fees", start_fees);
      formData.append("about", about);
      formData.append("services", provided_services);
      formData.append("media", media);

      const response = await axiosReg.post(
        `https://dashboard.infancia.app/api/nurseries-create`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to register');
    }
  },
  AuthRole: async () => {
    try {
      const response = await axiosInstance.post(`auth/permissions`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get roles');
    }
  },
};
const HomeServices = {
  ListCommunity: async () => {
    try {
      const response = await axiosInstance.get(`/dashboard/community`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
const MindHomeServices = {
  ListCommunity: async () => {
    try {
      const response = await axiosInstance.get(`/dashboard/mind`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
const AboutServices = {
  Add: async (title, description, image) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("media", image);
      }

      const response = await axiosInstance.post(`/abouts`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  List: async () => {
    try {
      const response = await axiosInstance.get(`/abouts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/abouts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/abouts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Edit: async (id, title, description, image) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("media", image);
      }
      const response = await axiosInstance.post(`/abouts/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const PolicyServices = {
  AddPrivacy: async (title, description) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      const response = await axiosInstance.post(`/policies`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  ListPrivacy: async () => {
    try {
      const response = await axiosInstance.get(`/policies`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  DeletePrivacy: async (id) => {
    try {
      const response = await axiosInstance.delete(`/policies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },

  AddTerms: async (title, description) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("details", description);

      const response = await axiosInstance.post(`/terms`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  ListTerms: async () => {
    try {
      const response = await axiosInstance.get(`/terms`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  DeleteTerms: async (id) => {
    try {
      const response = await axiosInstance.delete(`/terms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};
const EventService = {
  List: async (page) => {
    try {
      const response = await axiosInstance.get(`/events?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (title, date, time, place, description, img) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("place", place);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }

      const response = await axiosInstance.post(`/events`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, title, date, time, place, description, img) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("place", place);
      formData.append("description", description);
      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/events/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const QuestionsService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/community/questions`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/community/questions/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (title, question, required) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("question", question);
      formData.append("required", required ? 1 : 0);

      const response = await axiosInstance.post(
        `/community/questions`,
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, title, question, required) => {
    try {
      const response = await axiosInstance.put(
        `/community/questions/${id}?title=${title}&question=${question}&required=${
          required ? 1 : 0
        }`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/community/questions/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const PointsService = {
  ListPoints: async () => {
    try {
      const response = await axiosInstance.get(`/point/systems`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  EditPoints: async (id, points, display_name, action) => {
    try {
      const response = await axiosInstance.put(
        `/point/systems/${id}?points=${points}&display_name=${display_name}&action=${action}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const NewsService = {
  List: async (page) => {
    try {
      const response = await axiosInstance.get(`/news?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (caption, img) => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/news`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, caption, img) => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/news/${id}/update`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  DeleteComment: async (id) => {
    try {
      const response = await axiosInstance.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  AddComment: async (news_id, comment) => {
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("news_id", news_id);
      formData.append("model_type", "news");

      const response = await axiosInstance.post(`/comments`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  ReplyComment: async (comment_id, reply) => {
    try {
      const formData = new FormData();
      formData.append("comment_id", comment_id);
      formData.append("reply", reply);

      const response = await axiosInstance.post(`/comment/reply`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },

  LikeNews: async (id) => {
    try {
      const response = await axiosInstance.get(`news/like/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
};
const JobsService = {
  List: async (num) => {
    try {
      const response = await axiosInstance.get(`/jobs?page=${num}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (
    title,
    type,
    location,
    salary_range,
    user_experience,
    description,
    img
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("location", location);
      formData.append("salary_range", salary_range);
      formData.append("user_experience", user_experience);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/jobs`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (
    id,
    title,
    type,
    location,
    salary_range,
    user_experience,
    description,
    img
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("location", location);
      formData.append("salary_range", salary_range);
      formData.append("user_experience", user_experience);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }

      const response = await axiosInstance.post(`/jobs/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const RoomsService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/rooms`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const RoomPostsService = {
  List: async (room_id) => {
    try {
      const response = await axiosInstance.get(`/posts?room_id=${room_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  DeleteComment: async (id) => {
    try {
      const response = await axiosInstance.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const NotificationService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/notifications?user_id=${localStorage.getItem("UId")}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};
const BuyAndSellService = {
  List: async (page) => {
    try {
      const response = await axiosInstance.get(`/buysells?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (title, price, discount, description, img) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      // formData.append("discount", 0);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/buysells`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, title, price, discount, description, img) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      // formData.append("discount", 0);
      formData.append("price", price);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }

      const response = await axiosInstance.post(`/buysells/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/buysells/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/buysells/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const AdminsService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/admins`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Add: async (data) => {
    try {
      const response = await axiosInstance.post(`/admins`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  Edit: async (id, data) => {
    try {
      const response = await axiosInstance.post(`/admins/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/admins/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const MembersService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/members`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const BrandsService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/brands`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/brands/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (name, email, img) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/brands`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, name) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      const response = await axiosInstance.post(`/brands/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/brands/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const OffersService = {
  List: async (type , page) => {
    try {
      const response = await axiosInstance.get(`/offers/category/${type}?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (
    title,
    brand_info,
    category,
    discount,
    description,
    brand_id,
    img
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("brand_info", brand_info);
      formData.append("category", category);
      formData.append("discount", discount);
      formData.append("description", description);
      formData.append("brand_id", brand_id);

      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/offers`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (
    id,
    title,
    brand_info,
    category,
    discount,
    description,
    brand_id,
    img
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("brand_info", brand_info);
      formData.append("category", category);
      formData.append("discount", discount);
      formData.append("description", description);
      formData.append("brand_id", brand_id);

      if (img) {
        formData.append("media", img);
      }

      const response = await axiosInstance.post(`/offers/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/offers/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/offers/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const CharityService = {
  List: async (page) => {
    try {
      const response = await axiosInstance.get(`/charities?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (
    name,
    description,
    email,
    website,
    phone,
    address,
    services,
    img
  ) => {
    try {
      const data = {
        name: name,
        description: description,
        email: email,
        website: website,
        phone: phone,
        address: address,
        services: services,
        media: img,
      };

      const response = await axiosInstance.post(`/charities`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (
    id,
    name,
    description,
    email,
    website,
    phone,
    address,
    services,
    img
  ) => {
    try {
      const data = {
        name: name,
        description: description,
        email: email,
        website: website,
        phone: phone,
        address: address,
        services: services,
      };
      if (img) {
        data.media = img;
      }

      const response = await axiosInstance.post(`/charities/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/charities/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/charities/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const ApplicationsService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/applications`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  ApplicationStateChange: async (user_id, status) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("status", status);

      const response = await axiosInstance.post(`/applications`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const CashierService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/cashiers`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Add: async (brand_id, name, email, password) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("brand_id", brand_id);
      formData.append("password", password);
      const response = await axiosInstance.post(`/cashiers`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  Edit: async (id, brand_id, name, email, password) => {
    try {
      const response = await axiosInstance.put(
        `/cashiers/${id}?email=${email}&name=${name}&brand_id=${brand_id}&password=${password}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/cashiers/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/cashiers/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const RewardsService = {
  List: async (page) => {
    try {
      const response = await axiosInstance.get(`/rewards?page=${page}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Add: async (name, quantity, redeem_points, description, img) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity);
      formData.append("redeem_points", redeem_points);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }
      const response = await axiosInstance.post(`/rewards`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, name, quantity, redeem_points, description, img) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity);
      formData.append("redeem_points", redeem_points);
      formData.append("description", description);

      if (img) {
        formData.append("media", img);
      }

      const response = await axiosInstance.post(`/rewards/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/rewards/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/rewards/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const SubscriptionService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/subscriptions/plans`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  ListHistory: async () => {
    try {
      const response = await axiosInstance.get(`/transactions`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Add: async (plan_name, frequency, amount, details) => {
    try {
      const formData = new FormData();
      formData.append("name", plan_name);
      formData.append("frequency", frequency);
      formData.append("amount_cents", amount);
      formData.append("details", details);

      const response = await axiosInstance.post(
        `/subscriptions/plans`,
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  Edit: async (id, plan_name, frequency, amount, details) => {
    try {
      const response = await axiosInstance.put(
        `/subscriptions/plans/${id}?sub_id=${id}&name=${plan_name}&frequency=${frequency}&amount_cents=${amount}&details=${details}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/subscriptions/plans/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/subscriptions/plans/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};
const ChatService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/chats`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },

  Add: async (type, members, name) => {
    try {
      const data = {
        type: type,
        members: members,
        name: name,
      };
      console.log(data);
      const response = await axiosInstance.post(`/chats/create`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data);
    }
  },
  SendMessages: async (chat_id, message, user_id) => {
    try {
      const formData = new FormData();
      formData.append("chat_id", chat_id);
      formData.append("message", message);
      formData.append("user_id", user_id);
      const response = await axiosInstance.post(`/chats`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  Edit: async (id, plan_name, frequency, amount, details) => {
    try {
      const response = await axiosInstance.put(
        `/subscriptions/plans/${id}?sub_id=${id}&name=${plan_name}&frequency=${frequency}&amount_cents=${amount}&details=${details}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/chats/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/subscriptions/plans/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  },
};

export {
  NotificationService,
  RoomPostsService,
  RoomsService,
  AuthService,
  EventService,
  NewsService,
  QuestionsService,
  JobsService,
  PointsService,
  BuyAndSellService,
  SubscriptionService,
  AdminsService,
  MembersService,
  ApplicationsService,
  BrandsService,
  CashierService,
  OffersService,
  RewardsService,
  HomeServices,
  CharityService,
  AboutServices,
  PolicyServices,
  MindHomeServices,
  ChatService,
};