'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



function UpdatePassword() {
    const [pass, setPass] = useState<string>('');
    const supabase = createClientComponentClient();
    const router = useRouter()

    async function authenication() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
        }
    }
    authenication();
    return (
        <>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="text"
                onChange={e => {
                    setPass(e.target.value);
                }}
            />
            <button onClick={async (e) => {
                await supabase.auth.updateUser({
                    password: pass
                })
                router.push('.');
                router.refresh();
            }} className="bg-green-700 rounded px-4 py-2 text-white mb-6">Update Password</button>
        </>
    );
}

export default UpdatePassword;