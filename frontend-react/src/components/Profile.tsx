import axios from "axios";
import { useState } from "react"

type ProfileProps = {
    token: string
}

function Profile(props: ProfileProps) {

    type ProfileData = {
        profile_name: string,
        about_me: string
    }

    const [profileData, setProfileData] = useState<ProfileData | null>(null)


    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5000/profile",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data
            setProfileData(({
                profile_name: res.name,
                about_me: res.about
            }))
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                setProfileData(({ profile_name: "Failed", about_me: "Unknown" }))
            }
        })
    }

    return (
        <div>
            <p>To get your profile details: </p>
            <button onClick={getData}>Click me</button>
            {profileData && <div>
                <p>Profile name: {profileData.profile_name}</p>
                <p>About me: {profileData.about_me}</p>
            </div>
            }

        </div>
    )
}

export default Profile
