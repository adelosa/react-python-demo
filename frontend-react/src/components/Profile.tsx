import axios from "axios"
import { useState } from "react"
import { Button, Card } from "react-bootstrap"

type ProfileProps = {
    token: string
    setToken: Function
}

function Profile(props: ProfileProps) {

    type ProfileData = {
        profile_name: string
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
            console.log(res)
            res.access_token && props.setToken(res.access_token)
            setProfileData(({
                profile_name: res.name,
                about_me: res.about
            }))
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                setProfileData(({ 
                    profile_name: "Failed", 
                    about_me: "Unknown" 
                }))
            }
        })
    }

    return (
        <div>
            <p><Button variant='secondary' onClick={getData}>Fetch my profile</Button></p>
            {profileData &&
            <> 
                <Card>
                    {/* <Card.Header>Profile</Card.Header> */}
                    <Card.Body>
                        <Card.Title>{profileData.profile_name}</Card.Title>
                        <Card.Text>{profileData.about_me}</Card.Text>
                    </Card.Body>
                </Card>
            </>}
        </div>
    )
}

export default Profile
