import { Container, BlogCard, Statistics, Contact } from "../components";
import { Link } from "react-router-dom";

function Home(){
    return (
        <main className="w-full">
            <section className="text-gray-600 body-font bg-gray-100">
                <Container>
                    <div className="container mx-auto flex py-24 md:flex-row flex-col items-center">
                        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl md:font-bold text-3xl mb-4 font-medium text-gray-900">Unlocking the Unexpected:
                            <br className="hidden lg:inline-block" />Stories That Spark Curiosity
                        </h1>
                        <p className="mb-8 leading-relaxed">Dive into a world where everyday moments turn into extraordinary tales. From hidden histories to future tech, our blog unearths the fascinating side of life you never knew you needed. Ready to see the world differently?</p>
                        <div className="flex justify-center">                        
                            <Link to="/all-posts" className="bg-black text-white rounded-sm py-2 px-5 hover:bg-gray-950 cursor-pointer mr-4">View Posts</Link>
                            <Link to="" className="border border-gray-300 rounded-sm py-2 px-5 hover:bg-gray-200 cursor-pointer">Login <i className="fa-regular fa-user"></i></Link>
                        </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <figure className="">
                            <img className="rounded-lg" alt="hero" src="https://plus.unsplash.com/premium_photo-1661914399349-feb0d755c411?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYWtlfGVufDB8fDB8fHww" />
                        </figure>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="text-gray-600 body-font">
                <Container>
                    <div className="container py-5 mx-auto">
                        <h2 className="py-5 text-3xl font-bold text-black">Featured Blogs</h2>
                        <div className="flex flex-wrap -m-4">
                            <BlogCard />
                        </div>
                    </div>
                </Container>
            </section>

            <Statistics />

            <Contact />
        </main>
    );
}

export default Home;