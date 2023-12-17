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
    articleData: IData;
    noThumbnail?: boolean;
    compact?: boolean;
}

interface IData {
    thumbnailUrl: string;
    mainTitle?: string;
    author?: string;
    description?: string;
    date?: string;
}

function CardItem({
    path,
    articleData,
    noThumbnail = false,
    compact = false,
}: ICardItem) {
    const { thumbnailUrl, mainTitle, author, description, date } = articleData;

    return (
        <Link href={path}>
            <Card>
                {!noThumbnail && (
                    <CardMedia
                        component="img"
                        sx={{ width: '100%', paddingTop: '66.666%' }}
                        image={thumbnailUrl}
                        alt={mainTitle}
                    />
                )}
                {compact ? (
                    <CardContent>
                        <Typography
                            variant="body2"
                            paragraph
                            color="text.secondary"
                        >
                            {mainTitle}
                        </Typography>
                    </CardContent>
                ) : (
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {mainTitle}
                        </Typography>
                        <Typography
                            variant="body2"
                            paragraph
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                        <Typography variant="body2" color="#999">
                            {author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    </CardContent>
                )}
            </Card>
        </Link>
    );
}

export default CardItem;
