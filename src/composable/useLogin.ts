import { ILogin } from "@/interfaces/ILogin";
import { login } from "@/services/AuthService";
import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
export function useLogin(){
    const form = ref<ILogin>({
        email: '',
        password: '',
        remember: false,
      })
    const loading = ref<boolean>(false)  
    const isPasswordVisible = ref<boolean>(false)
    const router = useRouter();
    const errorMessages = ref<[email:string, password: string|number]>([]);
    const handleSubmit = () => {
        loading.value = true;
        login(form.value).then((res) => {
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('user_id',res.data.user.id)
          localStorage.setItem('user_name',res.data.user.name)
          localStorage.setItem('user_email',res.data.user.email)
          localStorage.setItem('permissions',res.data.permissions)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          loading.value = false;
          router.push('/dashboard')
          toast.success('Logged in successfully')
        })
        .catch((err) => {
          if(err.response.status == "422"){
            errorMessages.value =  err.response.data.errors
            loading.value = false;
          }else if(err.response.status == "401"){  
            toast.error(err.response.data.message);
            loading.value = false;
            errorMessages.value = ['','']
          }else{
            toast.error(err.message)
            loading.value = false;
          }
        })
    }

    return { form, isPasswordVisible, handleSubmit, errorMessages, loading}
}
