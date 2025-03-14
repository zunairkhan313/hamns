"use client";

import cap from "../../public/image/tshirt.png";
import Image from 'next/image';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() { // Renamed to start with uppercase

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='container-fluid mt-5 mb-5'>
                <div className="row">
                    <div className="col-lg-6 bg-[#222222]">
                        <div className='flex justify-center align-center'>
                            <Image src={cap} alt="cap" width={700} className='object-cover img-fluid mt-[110px]' />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="grid place-items-center h-screen">
                            <div>
                                <h1 className="text-3xl font-sans my-3">Login to Exclusive</h1>
                                <p className="text-sm mt-2">Enter your details below</p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                                    <input
                                        className="py-2 px-6 border border-gray-200"
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        placeholder="Email"
                                    />
                                    <input
                                        className="py-2 px-6 border border-gray-200"
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <button style={{ backgroundColor: "#222222" }} className="text-white font-bold cursor-pointer px-6 py-2">
                                        Login
                                    </button>
                                    {error && (
                                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                            {error}
                                        </div>
                                    )}
                                    <Link className="text-sm mt-3 text-right" href={"/register"}>
                                        Don&apos;t have an account? <span className="underline">Register</span>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
