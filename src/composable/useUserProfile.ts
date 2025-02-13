import { logout } from "@/services/AuthService";
import { useRouter } from "vue-router";

export function useUserProfile() {

    const router = useRouter();
    const user_name = ref<string>(localStorage.getItem('user_name'));
    const handleLogOut = () => {

        let id:number = localStorage.getItem('user_id')
          window.localStorage.clear()
          logout(id).then((res) => {
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
