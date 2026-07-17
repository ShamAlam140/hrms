const Policy = require('../Schemas/policyDocument')

exports.uploadPolicy= async(req, res)=>{

    try {
        
        const policyDoc= req.body
        const newPolicy = new Policy({policyDoc});

        const savePolicy= await newPolicy.save();
        res.json(savePolicy)
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.GetPolicy= async(req, res)=>{
    try {
        const policydocs= await Policy.find();
        res.json(policydocs)
    } catch (error) {
            
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}