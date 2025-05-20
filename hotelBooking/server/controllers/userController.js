// GET api/user
export const getUserData = (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        res.json({success:true, role, recentSearchedCities});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export const storeRecentSearchedCities = async (req, res) => {
    try {
        const {recentSearchedCy} = req.body;
        const user = await req.user;
        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCy);
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCy);
        }
        await user.save();
        res.json({success:true, message:"City saved"});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}