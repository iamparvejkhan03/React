import {Container} from ".";

function Hero(){
    return (
        <section className={`w-full h-screen bg-[url('./assets/heroImage.png')] bg-cover bg-center bg-no-repeat flex justify-start items-center`}>
            <Container classes="text-white w-full md:w-4/5 lg:w-3/5 xl:w-1/2">
                <p className="bg-blue-300 inline-block py-1 px-3 rounded-full">The Ultimate Hotel Experience</p>
                <h1 className="text-3xl font-bold my-2 lg:my-4 lg:text-4xl xl:text-5xl">Discover Your Perfect Getaway Destination</h1>
                <p>Unparalleled luxury and confort await of the world's most exlusive hotels and resorts. Start your journey today!</p>
                <div>
                    <form>
                        
                    </form>
                </div>
            </Container>
        </section>
    );
}

export default Hero;