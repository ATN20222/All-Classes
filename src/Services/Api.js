import axios from 'axios';
import axiosInstance, {  deleteToken, setToken   } from './AxiosApi';

const baseURL = 'https://yellowgreen-raccoon-480548.hostingersite.com/api'; 

const axiosReg = axios.create({
  baseURL: baseURL,
});
const AuthService = {

    Login: async (email , password) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await axiosInstance.post(`/auth/login`, formData);
        console.log("resp",response);
        setToken(response.data.token);
        return response.data; 
      } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message); 
//throw new Error(error.response.data.message); 
      }
    },
    Logout: async () =>{
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
    
    RequestPasswordReset: async (email)=>{
        try {
            const formData = new FormData();
            formData.append('email', email);
            const response = await axiosInstance.post(`/auth/forgot-password`,formData);
            deleteToken();
            return response.data; 
          } catch (error) {
            throw new Error(error.response.data.message); 
//throw new Error('Failed to send email'); 
          }
    },
    ResetPassword:async (token, email , password, password_confirmation)=>{
        try {
            
            const response = await axiosInstance.post(`/auth/reset-password`,null, {
                params: {
                    token: token,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
            });
            return response.data; 
          } catch (error) {
            throw new Error(error.response.data.message); 
//throw new Error('Failed to reset password'); 
          }
    },
    RegisterApi:async (name, email, phone , city,country, address, branches_number, classes_number, kids_number, employees_number, start_fees, about , provided_services , media)=>{
      try {
        console.log(name, email, phone , city,country, address, branches_number, classes_number, kids_number, employees_number, start_fees, about , provided_services , media);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('province', country);
        formData.append('address', address);
        formData.append('branches_number', branches_number);
        formData.append('classes_number', classes_number);
        formData.append('children_number', kids_number);
        formData.append('employees_number', employees_number);
        formData.append('start_fees', start_fees);
        formData.append('about', about);
        formData.append('services', provided_services);
        formData.append('media', media);
        
        const response = await axiosReg.post(`https://dashboard.infancia.app/api/nurseries-create`,formData);
        return response.data; 
  
      } catch (error) {
        throw new Error(error.response.data.message); 
//throw new Error('Failed to register'); 
  }
    },
    AuthRole:async ()=>{
      try {
          
          const response = await axiosInstance.post(`/auth/auth-role`);
          return response.data; 
        } catch (error) {
          throw new Error(error.response.data.message); 
//throw new Error('Failed to get roles'); 
        }
  },
}


const FAQServices = {
  Add: async (question , answer)=>{
    try {
      const formData = new FormData();
      formData.append('questions', question);
      formData.append('answer', answer);
      
      const response = await axiosInstance.post(`/faq` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/faq`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/faq/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}
const PolicyServices = {
  Add: async (title, description )=>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      const response = await axiosInstance.post(`/policies` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/policies`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/policies/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}

const EventService = {
  List: async () =>{
    try {

      const response = await axiosInstance.get(`/events`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/events/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (title,date,time,place,description) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('place', place);
      formData.append('description', description);
      const response = await axiosInstance.post(`/events`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit: async (id, title,date,time,place,description) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('place', place);
      formData.append('description', description);
      const response = await axiosInstance.post(`/events/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/events/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

}


const NewsService = {
  List: async () =>{
    try {

      const response = await axiosInstance.get(`/news`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/news/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (caption , img) =>{
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.post(`/news`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit: async (id, caption , img) =>{
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.put(`/news/${id}?caption=${caption}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/news/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  AddComment:async (news_id,comment) =>{
    try {
      const formData = new FormData();
      formData.append('comment', comment);
      formData.append('news_id', news_id);
      
      const response = await axiosInstance.post(`/news/comment`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  ReplyComment:async (comment_id,reply) =>{
    try {
      const formData = new FormData();
      formData.append('comment_id', comment_id);
      formData.append('reply', reply);
      
      const response = await axiosInstance.post(`/news/comment/reply`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },

  LikeNews:async (id) =>{
    try {
      
      const response = await axiosInstance.get(`news/like/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
}





export { 
  AuthService,
  EventService,
  NewsService,
  FAQServices,
  PolicyServices
};
