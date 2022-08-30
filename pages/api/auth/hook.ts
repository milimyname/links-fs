import prisma from '../../../lib/prisma'
import type {NextApiRequest, NextApiResponse} from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, secret} = req.body;

    // Validates request is POST request
    if(req.method !== 'POST') return res.status(403).json({message: 'Method not allowed'});

    // Validates AUTH0_HOOK_SECRET from request body is correct
    if(secret !== process.env.AUTH0_HOOK_SECRET) return res.status(403).json({message: 'You must provide the secret'});

    // Validates that email was provided in the request body
    if(email){
        // Creates a new user record 
        await prisma.user.create({
            data: { email }
        })
        return res.status(200).json({message: `User with email: ${email} has been successfully created`});
    }
};

export default handler;

