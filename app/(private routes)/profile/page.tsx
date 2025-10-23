import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";


export const metadata: Metadata = {
    title: 'Edit Profile',
    description: 'Edit your user details and settings',
};

const Profile = async () => {
    const user = await getServerMe();

  return (
    <main>
      <div>
        <h1>My Profile</h1>
        <Link href="/profile/edit">Edit profile</Link>
      </div>
      <div>
        <Image src={user.photoUrl ?? '/default-avatar.png'} alt="Avatar" width={120} height={120} />
        <h2>Username: {user.username}</h2>
        <h2>Email: {user.email}</h2>
      </div>
    </main>
  );
}

export default Profile;