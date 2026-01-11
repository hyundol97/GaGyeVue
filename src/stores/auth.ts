import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const loading = ref(false);

    const setUser = (newUser: User | null) => {
        user.value = newUser;
    };

    const fetchUser = async () => {
        loading.value = true;
        try {
            const {
                data: { user: currentUser },
            } = await supabase.auth.getUser();
            user.value = currentUser;
            return currentUser;
        } catch (error) {
            console.error('사용자 정보 가져오기 실패:', error);
            user.value = null;
            return null;
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        user.value = null;
    };

    return {
        user,
        loading,
        setUser,
        fetchUser,
        logout,
    };
});
