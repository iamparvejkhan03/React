import { Webhook } from 'svix';
import User from '../models/user.js';

const clerkWebhooks = async (req, res) => {
    try{
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        await wHook.verify(JSON.stringify(req.body), headers);

        const {data, type} = req.body;

        const userData = {
            _id: data.id,
            username: `${data.first_name} ${data.last_name}`,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        }

        switch(type){
            case "user.created":
                await User.create(userData);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;

            default:
                break;
        }

        res.json({success: true, message: "Webhook reached."});
    }catch(error){
        res.json({success:false, message:error.message});
    }
}

export default clerkWebhooks;