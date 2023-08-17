'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { z } from 'zod';

const mySchema = z.string().email();

function RecoverPage() {
    const supabase = createClientComponentClient();
    const [password, setPassword] = useState<string>('');
    const [isEmail, setIsEmail] = useState<boolean>(true);


    return (
        <>
            <div className="mt-20">
                <label className="text-md mr-3" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (!isEmail) setIsEmail(true);
                    }}
                    value={password}
                />
            </div>
            {!isEmail && <h2 className="text-red-600 text-md font-bold">Wrong Email Format !!</h2>}
            <button onClick={e => {
                const result = mySchema.safeParse(password);
                if (!result.success) {
                    setIsEmail(false);
                    return
                }
                supabase.auth.resetPasswordForEmail(password);
            }} className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Recover Password
            </button>
        </>
    );
}

export default RecoverPage;