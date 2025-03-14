"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function FrontRemovebtn({ id }) {
  const { data: session } = useSession();
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      }
    }
  };
  let addButton;

  if (session?.user?.email === "nasah123@gmail.com") {
    addButton = (
      <button onClick={removeTopic} className="text-black">
        <HiOutlineTrash size={24} />
      </button>
    );
  }

  return <>{addButton}</>;
}
