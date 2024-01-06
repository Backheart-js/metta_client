import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ICardItem {
    path: string;
    thumbnailUrl?: string;
    mainTitle?: string;
    subText1?: string;
    description?: string;
    subText2?: string;
}

function CardItem({
    path,
    thumbnailUrl,
    mainTitle,
    subText1,
    description,
    subText2,
}: ICardItem) {
    return (
        <Link href={path} prefetch>
            <Card>
                {thumbnailUrl && (
                    <CardMedia
                        component="img"
                        sx={{ width: '100%', paddingTop: '66.666%' }}
                        image="../../assets/image/fakethumbnail.jpg"
                        alt={mainTitle}
                    />
                )}
                <CardContent>
                    {mainTitle && (
                        <Typography gutterBottom variant="h5" component="div">
                            {mainTitle}
                        </Typography>
                    )}
                    {description && (
                        <Typography
                            variant="body2"
                            paragraph
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                    )}
                    {subText1 && (
                        <Typography variant="body2" color="#999">
                            {subText1}
                        </Typography>
                    )}
                    {subText2 && (
                        <Typography variant="body2" color="text.secondary">
                            {subText2}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

export default CardItem;
