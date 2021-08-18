import type { NextApiRequest, NextApiResponse } from 'next'
import Parser from 'rss-parser';
import { PostItem } from '../../components/postList';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostItem[]>) {
    const url = String(req.query.url);

    const parser = new Parser();
    const feed = await parser.parseURL(url);

    res.json(feed.items as PostItem[]);
}
