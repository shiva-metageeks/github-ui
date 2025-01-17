
import { publicRequest } from '@/config/request'
import { Dataset } from '@/types/Dataset'
import { Model } from '@/types/Model'
import { Space } from '@/types/Space'
import React from 'react'
import ProfilePageContent from './components/ProfilePageContent'

interface UserData {
    _id: string
    name: string
    username: string
    display_photo?: string
    spaces: Space[],
    datasets: Dataset[],
    models: Model[],
}
const Page = async ({ params }: { params: { username: string } }) => {
    const userDataResp = await publicRequest.get("/users/profile/" + params.username)
    const userData: UserData = userDataResp.data
    return <ProfilePageContent userData={userData}/>
   
}
export async function generateStaticParams() {

    const spaceData = await publicRequest("/users/profile")
    const allUsers: {
        _id: string
        name: string
        username: string
        display_photo?: string
    }[] = spaceData.data

    return allUsers.map((user) => {
        return { username: user.username };
    });
}
export default Page