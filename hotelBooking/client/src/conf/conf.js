let conf = {
    clerkPublishableKey : String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY),
    baseUrl: String(import.meta.env.VITE_BASEURL),
    currency: String(import.meta.env.VITE_CURRENCY),
}

export default conf;