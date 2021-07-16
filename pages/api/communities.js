import { SiteClient } from 'datocms-client'

export default async (req, res) => {
    if(req.method ==='POST'){
        const TOKEN = '2f09188895af0fd9fe6e983a14e677'
        const client = new SiteClient(TOKEN);
        
        const createdCommunity = await client.items.create({
            itemType: '971917',
            ...req.body
        })
    
        res.json({ createdCommunity: createdCommunity });

        return;
    }

    res.status(404).json({ message: `You aren't able to access this page`});
}