import { Container, Profile as ProfileComponent } from "../components";

function Profile(){
    return (
        <section className="w-full py-10 text-gray-600 body-font bg-gray-100">
            <Container>
                <h1 className="text-2xl font-bold text-center my-5">User Profile</h1>
                
                <div className="w-full min-h-screen flex justify-center items-start">
                    <ProfileComponent />
                </div>
            </Container>
        </section>
    );
}

export default Profile;