import { INotification, INotificationsList } from "@/Interfaces/INotification";
import { deleteAllNotifications, fetchNotifications, storeNotification, updateNotification } from "@/services/AuthService";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
export function useNotifications(){

    const lstNotifications = ref<INotificationsList>([]);
    const unread = ref<number>(0);
    const form = ref<INotification>({
        description: '',
        is_read: false,
      })
    const newNotification = () => {
        storeNotification(form.value).then((res) => {
            lstNotifications.value = res.data.notifications;
            unread.value = res.data.unread_notifications;
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }

    const fetAllNotifications = () => {
        fetchNotifications().then((res) => {
           lstNotifications.value = res.data.notifications;
            unread.value = res.data.unread_notifications;
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }

     const doSetToReadNotification = (id:number) => {
        updateNotification(id).then((res:any) => {
           lstNotifications.value = res.data.notifications;
            unread.value = res.data.unread_notifications;
        })
        .catch((err:any) => {
            toast.error(err.message)
        })
    }

     const clearAllNotifications = () => {
        deleteAllNotifications().then((res:any) => {
            lstNotifications.value = res.data.notifications;
            unread.value = res.data.unread_notifications;
        })
        .catch((err:any) => {
            toast.error(err.message)
        })
    }

    return { form, newNotification, doSetToReadNotification, fetAllNotifications, lstNotifications, unread, clearAllNotifications}
}
