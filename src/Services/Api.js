import axios from 'axios';
import axiosInstance, {  deleteToken, setDB, setToken   } from './AxiosApi';

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
        // setDB(response.data.db);
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
          
          const response = await axiosInstance.post(`auth/permissions`);
          return response.data; 
        } catch (error) {
          throw new Error(error.response.data.message); 
//throw new Error('Failed to get roles'); 
        }
    },
}
const HomeServices = {
  ListCommunity: async ()=>{
    try {
      const response = await axiosInstance.get(`/dashboard/community`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
}
const MindHomeServices = {
  ListCommunity: async ()=>{
    try {
      const response = await axiosInstance.get(`/dashboard/mind`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
}
const AboutServices = {
  Add: async (title, description )=>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      const response = await axiosInstance.post(`/abouts` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/abouts`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/abouts/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/abouts/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Edit: async (id, title,description) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      const response = await axiosInstance.post(`/abouts/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

}

const PolicyServices = {
  AddPrivacy: async (title, description )=>{
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
  ListPrivacy: async ()=>{
    try {
      const response = await axiosInstance.get(`/policies`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  DeletePrivacy: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/policies/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },

  AddTerms: async (title, description )=>{
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
  ListTerms: async ()=>{
    try {
      const response = await axiosInstance.get(`/policies`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  DeleteTerms: async (id)=>{
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

const PointsService = {
  ListPoints: async () =>{
    try {
      const response = await axiosInstance.get(`/point/systems`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  EditPoints: async (id,points, display_name, action ) =>{
    try {
      const response = await axiosInstance.put(`/point/systems/${id}?points=${points}&display_name=${display_name}&action=${action}`);

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

const JobsService = {
  List: async () =>{
    try {

      const response = await axiosInstance.get(`/jobs`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (title,type,location,salary_range,user_experience,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('location', location);
      formData.append('salary_range', salary_range);
      formData.append('user_experience', user_experience);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.post(`/jobs`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit: async (id,title,type,location,salary_range,user_experience,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('location', location);
      formData.append('salary_range', salary_range);
      formData.append('user_experience', user_experience);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      
      const response = await axiosInstance.post(`/jobs/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/jobs/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const BuyAndSellService = {
  List: async () =>{
    try {

      const response = await axiosInstance.get(`/buysells`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (title,price_before , price_after,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price_before', price_before);
      formData.append('price_after', price_after);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.post(`/buysells`,formData);
      return response.data; 
    } catch (error) { 
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit: async (id,title,price_before , price_after,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price_before', price_before);
      formData.append('price_after', price_after);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      
      const response = await axiosInstance.post(`/buysells/${id}`,formData);
      return response.data;   
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/buysells/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/buysells/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const AdminsService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/admins`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Add: async (data) =>{
    try {
      
      const response = await axiosInstance.post(`/admins`,data);
      return response.data; 
    } catch (error) { 
      throw new Error(error.response.data.message); 
    }
  },

  Edit: async (id , data) =>{
    try {
      const response = await axiosInstance.post(`/admins/${id}`,data);
      return response.data; 
    } catch (error) { 
      throw new Error(error.response.data.message); 
    }
  },

  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/admins/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/admins/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}
const MembersService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/members`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {
      const response = await axiosInstance.get(`/members/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Delete: async (id) =>{
    try {
      const response = await axiosInstance.delete(`/members/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const BrandsService = {
  List: async () =>{
    try {

      const response = await axiosInstance.get(`/brands`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/brands/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (name) =>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      const response = await axiosInstance.post(`/brands`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit: async (id, name) =>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      const response = await axiosInstance.post(`/brands/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {
      const response = await axiosInstance.delete(`/brands/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

}
const OffersService = {
  List: async (type) =>{
    try {
      const response = await axiosInstance.get(`/offers/category/${type}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (title,brand_info,category,discount,description ,brand_id ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('brand_info', brand_info);
      formData.append('category', category);
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('brand_id', brand_id);

      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.post(`/offers`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit:async (id ,title,brand_info,category,discount,description ,brand_id ,img) =>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('brand_info', brand_info);
      formData.append('category', category);
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('brand_id', brand_id);

      if(img){
        formData.append('media', img);
      }
      
      const response = await axiosInstance.post(`/offers/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {
      const response = await axiosInstance.get(`/offers/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/offers/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}


const CharityService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/charities`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (name,description,email,website,phone ,address,services ,img) =>{
    try {
      const data={
        name:name,
        description:description,
        email:email, 
        website:website,
        phone:phone , 
        address:address,  
        services:services 
      }
      const response = await axiosInstance.post(`/charities`,data);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit:async (id ,name,description,email,website,phone ,address,services ,img) =>{
    try {
      const data={
        name:name,
        description:description,
        email:email, 
        website:website,
        phone:phone , 
        address:address,  
        services:services 
      }
      
      const response = await axiosInstance.post(`/charities/${id}`,data);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {
      const response = await axiosInstance.get(`/charities/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/charities/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}


const ApplicationsService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/applications`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  ApplicationStateChange: async (user_id , status) =>{
    try {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('status', status);

      const response = await axiosInstance.post(`/applications`,formData);
      return response.data; 
    } catch (error) { 
      throw new Error(error.response.data.message); 
    }
  },


  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/applications/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Delete: async (id) =>{
    try {
      const response = await axiosInstance.delete(`/applications/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const CashierService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/cashiers`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Add: async (brand_id,name , email , password ) =>{
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('brand_id', brand_id);
      formData.append('password', password);
      const response = await axiosInstance.post(`/cashiers`,formData);
      return response.data; 
    } catch (error) { 
      throw new Error(error.response.data.message); 
    }
  },

  Edit: async (id , brand_id,name , email , password) =>{
    try {
      const response = await axiosInstance.put(`/cashiers/${id}?email=${email}&name=${name}&brand_id=${brand_id}&password=${password}`);
      return response.data; 
    } catch (error) { 
      throw new Error(error.response.data.message); 
    }
  },

  GetById: async (id) =>{
    try {

      const response = await axiosInstance.get(`/cashiers/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },

  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/cashiers/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const RewardsService = {
  List: async (type) =>{
    try {
      const response = await axiosInstance.get(`/rewards`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (name,quantity,redeem_points,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('redeem_points', redeem_points);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      const response = await axiosInstance.post(`/rewards`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit:async (id ,name,quantity,redeem_points,description ,img) =>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('redeem_points', redeem_points);
      formData.append('description', description);

      if(img){
        formData.append('media', img);
      }
      
      const response = await axiosInstance.post(`/rewards/${id}`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {
      const response = await axiosInstance.get(`/rewards/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {
      const response = await axiosInstance.delete(`/rewards/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

const SubscriptionService = {
  List: async () =>{
    try {
      const response = await axiosInstance.get(`/subscriptions`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (plan_name,frequency,amount ,details) =>{
    try {
      const formData = new FormData();
      formData.append('name', plan_name);
      formData.append('frequency', frequency);
      formData.append('amount_cents', amount);
      formData.append('details', details);

      const response = await axiosInstance.post(`/subscriptions`,formData);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data); 
    }
  },
  Edit:async (id ,plan_name,frequency,amount ,details) =>{
    try {
      const response = await axiosInstance.put(`/subscriptions/${id}?sub_id=${id}&name=${plan_name}&frequency=${frequency}&amount_cents=${amount}&details=${details}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  GetById: async (id) =>{
    try {
      const response = await axiosInstance.get(`/subscriptions/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
  Delete: async (id) =>{
    try {

      const response = await axiosInstance.delete(`/subscriptions/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.message); 
    }
  },
}

export { 
  AuthService,
  EventService,
  NewsService,
  JobsService ,
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
  MindHomeServices
};

