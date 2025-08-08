<script setup lang="ts">
import { useNotifications } from '@/composable/useNotifications';
import { onMounted } from 'vue';
const {newNotification,unread, clearAllNotifications, doSetToReadNotification, fetAllNotifications, form, lstNotifications} = useNotifications();


    onMounted(() => {
        fetAllNotifications();
        window.Echo.channel('admin_notifications')
            .listen('AdminNotification', (e:any) => {
                form.value.description = e.message;
                newNotification(form.value);
                console.log(e.message);
            });
    });
</script>

<template>
    <IconBtn>
        <VBadge 
        v-if="unread > 0"
        dot
        location="bottom right"
        offset-x="-5"
        offset-y="5"
        color="error"
        ></VBadge>
        <VIcon icon="bx-bell" class="cursor-pointer" />
        <!-- SECTION Menu -->
        <VMenu
         v-if="lstNotifications.length > 0"
            activator="parent"
            width="230"
            location="bottom end"
            offset="14px"
        >
            <VList>
            <!-- 👉 User Avatar & Name -->
            <VListItem>
                <VListItemTitle class="font-weight-bold">
                Notifications
                </VListItemTitle>
            </VListItem>
            <VDivider class="my-2" />

            <!-- 👉 Settings -->
            <VListItem @click="doSetToReadNotification(notify.id)"  class="cursor-pointer" v-for="notify in lstNotifications" :Key="notify.id">
                <template #prepend>
                 <VBadge
                    dot
                    location="bottom right"
                    offset-x="1"
                    offset-y="2"
                    :color="notify.is_read ? 'success' : 'error'"
                    ></VBadge>
                </template>
                <div>{{ notify.description }}</div>
            </VListItem>

            <!-- Divider -->
            <VDivider class="my-2" />

            <VListItem >
                <template #prepend>
                <VIcon
                    class="me-2"
                    icon="bx-trash"
                    size="22"
                    color="error"
                />
                </template>

                <VListItemTitle class="cursor-pointer"
                @click="clearAllNotifications()"
                >Clear All </VListItemTitle>
            </VListItem>
            </VList>
        </VMenu>
    </IconBtn>
</template>
