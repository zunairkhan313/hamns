"use client";

import cap from "../../public/image/tshirt.png"
import Image from 'next/image'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const capitalizeFirstLetter = (text) => {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const capitalizedName = capitalizeFirstLetter(name);

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: capitalizedName,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/login");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    return (
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
                            <h1 className="text-3xl font-sans my-3">Create an account</h1>
                            <p className="text-sm mt-2">Enter your details below</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                                <input
                                    className="py-2 px-6 border border-gray-200"
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Full Name"
                                />
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
                                <button style={{ "backgroundColor": "#222222" }} className="text-white font-bold cursor-pointer px-6 py-2">
                                    Register
                                </button>

                                {error && (
                                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                        {error}
                                    </div>
                                )}

                                <Link className="text-sm mt-3 text-right" href={"/login"}>
                                    Already have an account? <span className="underline">Login</span>
                                </Link>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}