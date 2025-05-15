import { Container, Hero, FeaturedDestination, ExclusiveOffers, Testimonials, Newsletter } from "../components";

function Home(){
    return (
        <main className="min-h-[70vh]">
            <Hero />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonials />
            <Newsletter />
        </main>
    );
}

export default Home;