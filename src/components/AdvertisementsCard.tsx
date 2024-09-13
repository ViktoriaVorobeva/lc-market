import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';

import type { Advertisment } from "../types/index";

const AdvertisementsCard = (card: Advertisment) => {
    return (
    <Link href={`/advertisements/${card.id}`} style={{ width: '100%'}}>
        <Card sx={{ maxWidth: '100%' }}>
                    {card.imageUrl && <CardMedia
                        component="img"
                        height="194"
                        image={card.imageUrl}
                        alt="Paella dish"
                    />}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {card.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Цена: {card.price}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Количество просмотров: {card.views}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Количество лайков: {card.likes}
                        </Typography>
                    </CardContent>
        </Card>
    </Link>
    )
}

export default AdvertisementsCard;