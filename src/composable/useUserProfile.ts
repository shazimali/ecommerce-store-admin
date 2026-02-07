import httpClient from "@/plugins/httpClient";
import { logout } from "@/services/AuthService";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useUserProfile() {

    const router = useRouter();
    const user_name = ref<string>(localStorage.getItem('user_name') || '');
    const handleLogOut = () => {

        let id: string = localStorage.getItem('user_id') || '0';
          window.localStorage.clear()
          logout(httpClient, parseInt(id)).then((res) => {
            router.push('/login')
          }).catch((err) => {
            console.log(err);
          })
        }
    return {
        handleLogOut,
        user_name
    }
}
